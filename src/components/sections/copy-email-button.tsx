"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type Status = "idle" | "copied" | "failed";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 2500);
    return () => window.clearTimeout(timeout);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm transition-colors hover:border-fg hover:bg-raised"
      >
        {status === "copied" ? (
          <Check aria-hidden="true" size={16} className="text-accent" />
        ) : (
          <Copy aria-hidden="true" size={16} />
        )}
        {status === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" className="sr-only">
        {status === "copied" && "Email address copied to clipboard."}
        {status === "failed" && `Copy failed. The address is ${email}.`}
      </span>
    </>
  );
}
