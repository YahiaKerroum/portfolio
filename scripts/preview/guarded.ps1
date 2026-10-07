# Runs a command while watching node process count and memory; kills everything
# node-related if limits are exceeded. Usage: guarded.ps1 -Cmd "npx next build" -Cwd <dir> -TimeoutSec 600
param(
  [string]$Cmd,
  [string]$Cwd,
  [int]$TimeoutSec = 600,
  [int]$MaxNode = 16,
  [int]$MaxMB = 7000
)
$baseline = @(Get-Process node -ErrorAction SilentlyContinue | ForEach-Object { $_.Id })
$p = Start-Process -FilePath "cmd.exe" -ArgumentList "/c $Cmd > guarded.log 2>&1" -WorkingDirectory $Cwd -PassThru -WindowStyle Hidden
$sw = [Diagnostics.Stopwatch]::StartNew()
$peakN = 0; $peakMB = 0; $killed = $false
try {
  while (-not $p.HasExited) {
    Start-Sleep -Milliseconds 700
    $nodes = @(Get-Process node -ErrorAction SilentlyContinue | Where-Object { $baseline -notcontains $_.Id })
    $mb = [int](($nodes | Measure-Object WorkingSet64 -Sum).Sum / 1MB)
    if ($nodes.Count -gt $peakN) { $peakN = $nodes.Count }
    if ($mb -gt $peakMB) { $peakMB = $mb }
    if ($nodes.Count -gt $MaxNode -or $mb -gt $MaxMB -or $sw.Elapsed.TotalSeconds -gt $TimeoutSec) {
      $killed = $true
      Write-Output "WATCHDOG: killing (nodes=$($nodes.Count) mb=$mb t=$([int]$sw.Elapsed.TotalSeconds))"
      break
    }
  }
} finally {
  if ($killed -or -not $p.HasExited) {
    & taskkill /PID $p.Id /T /F | Out-Null
    Get-Process node -ErrorAction SilentlyContinue | Where-Object { $baseline -notcontains $_.Id } | Stop-Process -Force -ErrorAction SilentlyContinue
  }
}
Write-Output "exit=$($p.ExitCode) peakNode=$peakN peakMB=$peakMB secs=$([int]$sw.Elapsed.TotalSeconds) killed=$killed"
Get-Content (Join-Path $Cwd "guarded.log") -Tail 60
Remove-Item (Join-Path $Cwd "guarded.log") -ErrorAction SilentlyContinue
