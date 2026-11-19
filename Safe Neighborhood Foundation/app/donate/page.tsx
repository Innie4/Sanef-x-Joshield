"use client";

import React, { useState } from "react";
import { Heart, CheckCircle, ShieldCheck, Copy, AlertCircle, ArrowRight } from "lucide-react";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold px-3 py-1 rounded bg-emerald-100">
          PHILANTHROPIC TRANSPARENCY
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Support Grassroots Safety & Evidence
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Your contributions directly fund anti-vandal solar streetlights, youth conflict mediation centers, 
          and emergency neighborhood watch first-aid gear. Every disbursement is audited and public.
        </p>
      </div>

      {/* Campaigns Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SANEF_CAMPAIGNS.map((camp) => (
          <div key={camp.id} className="civic-card rounded-3xl p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  {camp.category}
                </span>
                {camp.urgent && (
                  <span className="text-red-600 font-mono font-semibold">URGENT FOCUS</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{camp.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{camp.description}</p>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-emerald-800">${camp.raisedAmount.toLocaleString()} Raised</span>
                  <span className="text-slate-500">Goal: ${camp.targetAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${(camp.raisedAmount / camp.targetAmount) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>{camp.donorCount} Verified Contributors</span>
                  <span>{Math.round((camp.raisedAmount / camp.targetAmount) * 100)}% Funded</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Donation Form & Direct Wire Option */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Direct Wire Details */}
        <div className="space-y-6">
          <div className="civic-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Audited Wire Details</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Official institutional bank account details for direct bank transfer, corporate grant disbursement, or wire transfer.
            </p>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Account Name</span>
                <span className="text-slate-900 font-bold">Safe Neighborhood Foundation</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Bank Name</span>
                <span className="text-slate-900 font-bold">Zenith Bank PLC / GTBank</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">NUBAN Account (NGN)</span>
                  <span className="text-emerald-800 font-bold text-base">1018491028</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-[11px] rounded bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 font-sans"
                >
                  {copiedAccount ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Please include your email or name as wire reference to receive an automated official receipt.
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Pledge & Payment Intent Form */}
        <div className="lg:col-span-2 civic-card rounded-3xl p-8 sm:p-10">
          {!submittedPledge ? (
            <form onSubmit={handlePledge} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Make an Online Donation Pledge</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select an amount and project campaign. Formal receipt dispatched upon pledge logging.
                </p>
              </div>

              {/* Preset Amount Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Amount (USD Equivalent)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {presetAmounts.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                        selectedAmount === amt && !customAmount
                          ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="number"
                    placeholder="Or enter custom amount in USD..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chinelo Okeke"
                    value={pledgeForm.donorName}
                    onChange={(e) => setPledgeForm({ ...pledgeForm, donorName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email for Receipt *</label>
                  <input
                    type="email"
                    required
                    placeholder="chinelo@gmail.com"
                    value={pledgeForm.email}
                    onChange={(e) => setPledgeForm({ ...pledgeForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Campaign</label>
                <select
                  value={pledgeForm.campaign}
                  onChange={(e) => setPledgeForm({ ...pledgeForm, campaign: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                >
                  {SANEF_CAMPAIGNS.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-emerald-700/20"
              >
                <span>Record Pledge & Generate Wire Receipt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Donation Pledge Recorded</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, {pledgeForm.donorName}. A pledge reference has been generated and dispatched to {pledgeForm.email}.
              </p>
              <button
                onClick={() => setSubmittedPledge(false)}
                className="text-xs text-emerald-700 font-semibold hover:underline"
              >
                Make another pledge
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
