"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";
import { SANEF_CAMPAIGNS } from "@/lib/data";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);
  const [submittedPledge, setSubmittedPledge] = useState<boolean>(false);
  const [pledgeForm, setPledgeForm] = useState({
    donorName: "",
    email: "",
    campaign: SANEF_CAMPAIGNS[0].title,
  });

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handleCopy = () => {
    navigator.clipboard.writeText("1018491028");
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handlePledge = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pledgeForm,
          amount: customAmount ? parseFloat(customAmount) : selectedAmount,
        }),
      });
      setSubmittedPledge(true);
    } catch {
      setSubmittedPledge(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
          Civic Capital & Accountability
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-slate-950">
          Fund Audited Community Safety
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Your grants and donations directly fund solar lighting along school transit corridors, youth conflict mediation academies, and emergency neighborhood watch radio networks.
        </p>
      </div>

      {/* Campaigns Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SANEF_CAMPAIGNS.map((camp) => (
          <div key={camp.id} className="monograph-surface rounded-3xl p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  {camp.category}
                </span>
                {camp.urgent && (
                  <span className="text-red-700 font-mono text-[11px] font-semibold">URGENT FOCUS</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">{camp.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{camp.description}</p>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-3">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-emerald-800">${camp.raisedAmount.toLocaleString()} Committed</span>
                  <span className="text-slate-500">Target: ${camp.targetAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="bg-[#0D4A2B] h-full rounded-full"
                    style={{ width: `${(camp.raisedAmount / camp.targetAmount) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500 font-mono flex justify-between">
                  <span>{camp.donorCount} Verified Grants</span>
                  <span>{Math.round((camp.raisedAmount / camp.targetAmount) * 100)}% Funded</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Donation Form & Direct Wire Option */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Wire Transfer Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="monograph-surface rounded-3xl p-7 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Direct Institutional Wire & Grants
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Beneficiary Account:</span>
                  <p className="text-slate-900 font-bold text-sm">Safe Neighborhood Foundation</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Bank Entity:</span>
                  <p className="text-slate-900 font-bold">First Bank of Nigeria Ltd</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Naira Account Number:</span>
                  <div className="flex items-center justify-between pt-0.5">
                    <p className="text-emerald-800 font-bold text-base">1018491028</p>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-xs font-sans text-[#0D4A2B] font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedAccount ? "COPIED" : "COPY"}</span>
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">SWIFT / Routing:</span>
                  <p className="text-slate-900 font-bold">FBNINGLAXXX</p>
                </div>
              </div>

              <div className="space-y-1 text-slate-600 text-xs leading-relaxed font-sans">
                <p className="font-semibold text-slate-800">Tax Deductibility:</p>
                <p>All contributions to SANEF are registered under Nigerian CAMA 2020 NGO provisions. A formal audited receipt with SCUML clearance certificate will be issued for tax reporting.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Online Pledge Form */}
        <div className="lg:col-span-7">
          <div className="monograph-surface rounded-3xl p-8 space-y-6">
            {!submittedPledge ? (
              <form onSubmit={handlePledge} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">Online Grant / Pledge Form</h3>
                  <p className="text-xs text-slate-500">Select target campaign and amount to receive your contribution receipt.</p>
                </div>

                {/* Amount Selectors */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-500">Select Amount (USD)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                          selectedAmount === amt && !customAmount
                            ? "bg-[#0D4A2B] text-white shadow-sm"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-500">Or Enter Custom Amount ($)</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter custom grant amount"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0D4A2B] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-500">Target Initiative</label>
                  <select
                    value={pledgeForm.campaign}
                    onChange={(e) => setPledgeForm({ ...pledgeForm, campaign: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0D4A2B]"
                  >
                    {SANEF_CAMPAIGNS.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-500">Donor Name / Trust *</label>
                    <input
                      required
                      type="text"
                      value={pledgeForm.donorName}
                      onChange={(e) => setPledgeForm({ ...pledgeForm, donorName: e.target.value })}
                      placeholder="Your name or organization"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0D4A2B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-500">Official Email *</label>
                    <input
                      required
                      type="email"
                      value={pledgeForm.email}
                      onChange={(e) => setPledgeForm({ ...pledgeForm, email: e.target.value })}
                      placeholder="donor@trust.org"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0D4A2B]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#0D4A2B] hover:bg-[#14633B] text-white text-xs font-semibold px-7 py-3.5 rounded-full shadow-sm transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Confirm Grant Pledge of ${customAmount || selectedAmount}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Grant Pledge Registered</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for supporting community public safety. A formal grant letter with remittance verification has been transmitted to your email.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmittedPledge(false)}
                    className="text-xs font-mono text-emerald-800 hover:underline"
                  >
                    Submit Another Pledge
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
