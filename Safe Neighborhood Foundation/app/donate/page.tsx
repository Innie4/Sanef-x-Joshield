"use client";

import React, { useState } from "react";
import { CheckCircle2, Building2 } from "lucide-react";
import { SANEF_CAMPAIGNS } from "@/lib/data";

const PRESET_AMOUNTS = [25000, 75000, 250000, 1000000];

export default function DonatePage() {
  const [selectedCampaign, setSelectedCampaign] = useState(SANEF_CAMPAIGNS[0].id);
  const [amount, setAmount] = useState<number>(75000);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [method, setMethod] = useState<"Bank Transfer" | "Card Pledge">("Bank Transfer");
  const [submitting, setSubmitting] = useState(false);
  const [receiptRef, setReceiptRef] = useState<string | null>(null);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: selectedCampaign,
          amountNaira: amount,
          donorName,
          donorEmail,
          method,
        }),
      });
      const json = await res.json();
      setReceiptRef(json.referenceId || "SANEF-DON-2026-8412");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[720px] border-b border-[#E7E5E4] pb-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#C85A32]">
            Campaign Support & Open Ledger
          </p>
          <h1 className="mt-2 font-serif text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-[46px]">
            Support a Community Safety Campaign
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[#57534E]">
            Every contribution is ring-fenced to a named ward campaign and reconciled in our public
            annual impact reports.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Active Campaigns */}
          <div className="space-y-6 lg:col-span-6">
            <h2 className="font-serif text-[26px] font-medium text-[#1C1917]">
              Active 2026 Campaigns
            </h2>
            {SANEF_CAMPAIGNS.map((c) => {
              const pct = Math.min(100, Math.round((c.raisedNaira / c.targetNaira) * 100));
              const active = selectedCampaign === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCampaign(c.id)}
                  className={`block w-full rounded-[10px] border p-6 text-left transition-colors ${
                    active
                      ? "border-[#1B4332] bg-white"
                      : "border-[#E7E5E4] bg-white hover:border-[#1B4332]/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[12px]">
                    <span className="font-mono text-[#57534E]">{c.code}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${
                        active ? "bg-[#1B4332] text-white" : "bg-[#FAF8F5] text-[#57534E]"
                      }`}
                    >
                      {active ? "Selected" : "Select Campaign"}
                    </span>
                  </div>
                  <h3 className="mt-2.5 font-serif text-[22px] font-medium text-[#1C1917]">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#57534E]">{c.location}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#57534E]">{c.summary}</p>

                  {/* Flat 1px progress bar */}
                  <div className="mt-5">
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="font-mono font-semibold text-[#1B4332]">
                        {c.raisedFormatted} raised
                      </span>
                      <span className="font-mono text-[#57534E]">
                        Goal {c.targetFormatted} ({pct}%)
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E7E5E4]">
                      <div className="h-full bg-[#1B4332]" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-2.5 text-[12px] text-[#57534E]">{c.allocationNote}</p>
                  </div>
                </button>
              );
            })}

            {/* Direct Bank Transfer Box */}
            <div className="rounded-[10px] border border-[#E7E5E4] bg-white p-6">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1C1917]">
                <Building2 className="h-4 w-4 text-[#1B4332]" />
                Direct Institutional Bank Transfer
              </div>
              <dl className="mt-3 space-y-1.5 text-[13px] text-[#57534E]">
                <div className="flex justify-between">
                  <dt>Account Name</dt>
                  <dd className="font-medium text-[#1C1917]">Safe Neighborhood Foundation (SANEF)</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Bank</dt>
                  <dd className="font-medium text-[#1C1917]">Stanbic IBTC Bank PLC</dd>
                </div>
                <div className="flex justify-between">
                  <dt>NGN Account Number</dt>
                  <dd className="font-mono font-semibold text-[#1C1917]">0048291044</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Pledge / Donation Form */}
          <div className="lg:col-span-6">
            <div className="rounded-[10px] border border-[#E7E5E4] bg-white p-6 sm:p-8">
              <h2 className="font-serif text-[26px] font-medium text-[#1C1917]">
                Record Your Contribution
              </h2>
              <p className="mt-1 text-[14px] text-[#57534E]">
                Online card payment gateway is scheduled for Phase II; pledges logged here generate
                an official reconciliation reference for transfer or secretariat follow-up.
              </p>

              {receiptRef ? (
                <div className="mt-6 rounded-[10px] border border-[#1B4332]/25 bg-[#1B4332]/5 p-6">
                  <p className="flex items-center gap-2 text-[16px] font-semibold text-[#1B4332]">
                    <CheckCircle2 className="h-5 w-5" /> Contribution Pledge Logged
                  </p>
                  <p className="mt-2 font-mono text-[14px] font-semibold text-[#1C1917]">
                    Reference ID: {receiptRef}
                  </p>
                  <p className="mt-2 text-[14px] text-[#57534E]">
                    Include this reference ID in your bank transfer narration so our finance officer
                    can issue your official receipt and allocate it to your chosen ward campaign.
                  </p>
                  <button
                    type="button"
                    onClick={() => setReceiptRef(null)}
                    className="mt-5 rounded-full border border-[#1B4332] px-5 py-2 text-[13px] font-semibold text-[#1B4332]"
                  >
                    Record Another Pledge
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDonate} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1C1917]">
                      Contribution Amount (NGN)
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {PRESET_AMOUNTS.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAmount(val)}
                          className={`rounded-[8px] border py-2.5 font-mono text-[13px] font-semibold ${
                            amount === val
                              ? "border-[#1B4332] bg-[#1B4332] text-white"
                              : "border-[#E7E5E4] bg-[#FAF8F5] text-[#1C1917] hover:border-[#1B4332]"
                          }`}
                        >
                          ₦{(val / 1000).toLocaleString()}k
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min={5000}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="mt-2.5 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 font-mono text-[14px] text-[#1C1917] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#1C1917]">
                      Donor / Organisation Name
                    </label>
                    <input
                      required
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#1C1917]">
                      Receipt Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#1C1917]">
                      Preferred Method
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2.5">
                      {(["Bank Transfer", "Card Pledge"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMethod(m)}
                          className={`rounded-[8px] border py-2.5 text-[13px] font-semibold ${
                            method === m
                              ? "border-[#1B4332] bg-[#1B4332]/5 text-[#1B4332]"
                              : "border-[#E7E5E4] bg-white text-[#57534E]"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-[#C85A32] py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#AE4B27] disabled:opacity-60"
                  >
                    {submitting
                      ? "Generating Reference..."
                      : `Pledge ₦${amount.toLocaleString()} & Generate Reference`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
