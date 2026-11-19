import React from "react";
import Link from "next/link";
import { Users, Briefcase, MapPin, ArrowRight } from "lucide-react";

export default function CareersPage() {
  const jobs = [
    {
      title: "Community Field Safety Coordinator",
      location: "Ajegunle, Lagos",
      type: "Full-Time",
      deadline: "December 15, 2026",
      desc: "Liaising with ward elders, monitoring solar lighting telemetry, and organizing local safety townhall dialogues."
    },
    {
      title: "Youth Restorative Justice Facilitator",
      location: "Kafanchan, Kaduna",
      type: "Full-Time",
      deadline: "December 20, 2026",
      desc: "Guiding peer mediation circles, trauma de-escalation workshops, and tracking youth participant desistance metrics."
    },
    {
      title: "Monitoring & Evaluation Field Auditor (M&E)",
      location: "National Traveling",
      type: "Contract",
      deadline: "December 30, 2026",
      desc: "Conducting rigorous pre- and post-intervention community surveys, verified statistical data entry, and PDF audit drafting."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold px-3 py-1 rounded bg-emerald-100">
          VACANCIES & VOLUNTEER ROSTER
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Work with SANEF to Protect Communities
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Join our multidisciplinary team of field officers, restorative mediators, urban researchers, and civic technicians.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job, idx) => (
          <div key={idx} className="civic-card rounded-3xl p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">{job.type}</span>
                <span>Due: {job.deadline}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {job.location}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                {job.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href={`/contact?subject=Job%20Application:%20${encodeURIComponent(job.title)}`}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                <span>Apply for Position</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
