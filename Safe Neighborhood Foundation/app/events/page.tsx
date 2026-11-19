import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { SANEF_EVENTS } from "@/lib/data";

export default function EventsPage() {
  const upcoming = SANEF_EVENTS.filter((e) => e.isUpcoming);
  const past = SANEF_EVENTS.filter((e) => !e.isUpcoming);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold px-3 py-1 rounded bg-emerald-100">
          COMMUNITY ENGAGEMENT & DIALOGUE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Events, Townhalls & Workshops
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Participate in our open townhall assemblies, restorative mediation sessions, and volunteer emergency first-aid trainings.
        </p>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Upcoming Assemblies</h2>
          <p className="text-xs text-slate-500">Free open attendance for community members and leaders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcoming.map((evt) => (
            <div key={evt.id} className="civic-card rounded-3xl p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {evt.category}
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-700">
                    {evt.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>

                <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">Free Registration</span>
                <Link
                  href={`/contact?subject=Event%20RSVP:%20${encodeURIComponent(evt.title)}`}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Reserve Your Seat
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Past Completed Events & Archives</h2>
          <p className="text-xs text-slate-500">Documentary outcomes and assembly summaries.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {past.map((evt) => (
            <div key={evt.id} className="p-6 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono">{evt.date}</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700">Concluded</span>
              </div>
              <h4 className="text-base font-bold text-slate-800">{evt.title}</h4>
              <p className="text-xs text-slate-600">{evt.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
