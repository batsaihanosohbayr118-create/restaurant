"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmOptions {
  title?: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface ConfirmState extends ConfirmOptions {
  resolve: (value: boolean) => void;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState | null>(null);

  const confirm = useCallback((options: ConfirmOptions | string) => {
    const opts = typeof options === "string" ? { description: options } : options;
    return new Promise<boolean>((resolve) => {
      setState({ ...opts, resolve });
    });
  }, []);

  const handle = useCallback(
    (result: boolean) => {
      state?.resolve(result);
      setState(null);
    },
    [state]
  );

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handle(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, handle]);

  const ConfirmDialog = state ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm animate-fade-in">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm border border-ink/10 bg-linen p-6 shadow-2xl animate-scale-in"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-red-600/20 bg-red-600/10 text-red-600">
            <AlertTriangle size={20} />
          </span>
          <div>
            <h2 className="font-display text-lg text-ink">{state.title ?? "Are you sure?"}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{state.description}</p>
          </div>
        </div>
        <div className="mt-7 flex justify-end gap-3">
          <button
            autoFocus
            onClick={() => handle(false)}
            className="border border-ink/15 px-5 py-2.5 text-sm text-ink/70 transition-colors duration-200 hover:border-ink/30 hover:text-ink"
          >
            {state.cancelLabel ?? "Cancel"}
          </button>
          <button
            onClick={() => handle(true)}
            className="bg-red-600 px-5 py-2.5 text-sm text-white transition-colors duration-200 hover:bg-red-700"
          >
            {state.confirmLabel ?? "Delete"}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { confirm, ConfirmDialog };
}
