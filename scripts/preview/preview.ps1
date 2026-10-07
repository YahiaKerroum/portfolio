# Supervised preview for this machine (a runaway `next dev` once froze it):
# build under a process/memory watchdog, serve the production build on :3100,
# optionally capture review screenshots, and ALWAYS stop the server at the end.
#   powershell -File scripts/preview/preview.ps1 -Capture
#   powershell -File scripts/preview/preview.ps1 -HoldSeconds 600   # keep it up for manual viewing
#   powershell -File scripts/preview/preview.ps1 -Extra path/to/script.py   # one-off captures against the same server
param([switch]$Capture, [int]$HoldSeconds = 0, [string]$Extra = "")
$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$server = $null
try {
  & (Join-Path $PSScriptRoot "guarded.ps1") -Cmd "npx next build" -Cwd $root -TimeoutSec 400 | Where-Object { $_ -match "exit=|rror|Failed" }
  $server = Start-Process -FilePath "cmd.exe" -ArgumentList "/c npx next start -p 3100 > preview-server.log 2>&1" -WorkingDirectory $root -PassThru -WindowStyle Hidden
  Start-Sleep -Seconds 5
  try { "server " + (Invoke-WebRequest -Uri "http://localhost:3100/" -UseBasicParsing -TimeoutSec 20).StatusCode } catch { "server ERR $_" }
  if ($Capture) { Push-Location $root; & python (Join-Path $PSScriptRoot "capture.py") .impeccable/review 2>&1 | Select-Object -Last 8; Pop-Location }
  if ($Extra) { Push-Location $root; & python $Extra .impeccable/review 2>&1 | Select-Object -Last 8; Pop-Location }
  if ($HoldSeconds -gt 0) { "holding http://localhost:3100 for $HoldSeconds s"; Start-Sleep -Seconds $HoldSeconds }
} finally {
  if ($server) { & taskkill /PID $server.Id /T /F 2>$null | Out-Null }
  Start-Sleep -Milliseconds 800
  try { Invoke-WebRequest -Uri "http://localhost:3100/" -UseBasicParsing -TimeoutSec 3 | Out-Null; "WARNING: server still up" } catch { "server stopped" }
  Remove-Item (Join-Path $root "preview-server.log") -ErrorAction SilentlyContinue
}
