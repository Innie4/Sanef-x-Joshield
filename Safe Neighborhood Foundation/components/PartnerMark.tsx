import React from "react";

export default function PartnerMark({ monogram, size = "md" }: { monogram: string; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const stroke = "#1B4332";

  return (
    <span
      className={`flex ${box} shrink-0 items-center justify-center rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5]`}
      aria-label={monogram}
    >
      {monogram === "LULT" && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8.5" r="3.5" stroke={stroke} strokeWidth="1.5" />
          <path d="M12 2.5V4M12 12V20.5M7 20.5H17M6.5 8.5H5M19 8.5H17.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {monogram === "WACF" && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="3.5" ry="8" stroke={stroke} strokeWidth="1.5" />
          <path d="M4.5 12H19.5" stroke={stroke} strokeWidth="1.5" />
        </svg>
      )}
      {monogram === "AIWC" && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 19.5H20M6 19.5V10.5M10 19.5V10.5M14 19.5V10.5M18 19.5V10.5M4.5 10.5L12 5L19.5 10.5H4.5Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )}
      {monogram === "LCHI" && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 15.5C6 13.8 8 13.8 10 15.5C12 17.2 14 17.2 16 15.5C17.5 14.2 18.8 14.2 20 15.2" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 5.5V11.5M9 8.5H15" stroke="#C85A32" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
