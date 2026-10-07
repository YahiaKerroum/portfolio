"use client";

import dynamic from "next/dynamic";

const AvatarCanvas = dynamic(() => import("./AvatarCanvas"), { ssr: false });

export default function Avatar({ trigger = "landed", className = "" }: { trigger?: "landed" | "visible"; className?: string }) {
  return (
    <div className={`avatar ${className}`} role="img" aria-label="A clay version of Yahia, watching your cursor">
      <AvatarCanvas trigger={trigger} />
    </div>
  );
}
