"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface SlideOverDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  refBadge?: string;
  widthClass?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function SlideOverDrawer({
  open,
  onClose,
  title,
  subtitle,
  refBadge,
  widthClass = "max-w-[620px]",
  footer,
  children,
}: SlideOverDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Subtle flat backdrop */}
      <div
        className="fixed inset-0 bg-[#09090B]/30 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`relative z-10 flex h-full w-full ${widthClass} flex-col border-l border-[#E4E4E7] bg-white`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E4E4E7] px-6 py-4">
          <div className="min-w-0">
            {refBadge && (
              <span className="mb-1 inline-block rounded-[4px] border border-[#E4E4E7] bg-[#FAFAFA] px-2 py-0.5 font-mono text-[11px] font-medium text-[#52525B]">
                {refBadge}
              </span>
            )}
            <h2 className="truncate text-[17px] font-semibold tracking-[-0.015em] text-[#09090B]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 truncate text-[13px] text-[#71717A]">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#FAFAFA] hover:text-[#09090B]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 pt-5 pb-10">{children}</div>

        {/* Optional Sticky Footer */}
        {footer && (
          <div className="border-t border-[#E4E4E7] bg-[#FAFAFA] px-6 py-3.5">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}
