"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <div className="email">
      <a className="email__address" href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" className="email__copy" onClick={copy} data-copied={copied || undefined}>
        <Icon name={copied ? "check" : "copy"} />
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
