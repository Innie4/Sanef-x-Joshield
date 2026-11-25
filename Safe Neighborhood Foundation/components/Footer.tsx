import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E7E5E4] bg-white text-[#1C1917]">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Mission Blurb */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#1B4332] text-[#FAF8F5]">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M10 2.5L16.5 6.25V13.75L10 17.5L3.5 13.75V6.25L10 2.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="10" cy="10" r="2.6" fill="#C85A32" />
                </svg>
              </span>
              <span className="font-serif text-[20px] font-semibold text-[#1C1917]">
                Safe Neighborhood Foundation (SANEF)
              </span>
            </div>
            <p className="mt-4 max-w-[400px] text-[14px] leading-relaxed text-[#57534E]">
              An independent community safety NGO partnering with residents, municipal councils, and
              civic funders to build lit walkways, safe school routes, and youth mediation benches—documented
              openly through verified field evidence.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-[13px] font-medium text-[#1B4332]">
              <a
                href="https://wa.me/2348094412200"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-[#C85A32]"
              >
                WhatsApp Secretariat
              </a>
              <span className="text-[#D6D3D1]">·</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-[#C85A32]"
              >
                Facebook
              </a>
              <span className="text-[#D6D3D1]">·</span>
              <a
                href="mailto:secretariat@sanefoundation.org.ng"
                className="underline underline-offset-4 hover:text-[#C85A32]"
              >
                secretariat@sanefoundation.org.ng
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-[12px] font-semibold text-[#57534E]">
              Foundation
            </h3>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[#1C1917]">
              <li><Link href="/about" className="hover:text-[#1B4332]">About Us & Governance</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#1B4332]">Portfolio & Evidence Archive</Link></li>
              <li><Link href="/partnerships" className="hover:text-[#1B4332]">Partnerships Directory</Link></li>
              <li><Link href="/blog" className="hover:text-[#1B4332]">Field Notes & Blog</Link></li>
            </ul>
          </div>

          {/* Engagement */}
          <div className="md:col-span-4">
            <h3 className="font-sans text-[12px] font-semibold text-[#57534E]">
              Get Involved & Secretariat
            </h3>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[#1C1917]">
              <li><Link href="/donate" className="font-semibold text-[#C85A32] hover:underline">Support a Campaign (Donate)</Link></li>
              <li><Link href="/events" className="hover:text-[#1B4332]">Upcoming Townhalls & Events</Link></li>
              <li><Link href="/careers" className="hover:text-[#1B4332]">Open Roles & Field Fellowships</Link></li>
              <li><Link href="/contact" className="hover:text-[#1B4332]">Contact & Ward Enquiries</Link></li>
            </ul>
            <p className="mt-4 text-[13px] text-[#57534E]">
              14 Herbert Macaulay Way, Yaba, Lagos ·{" "}
              <span className="whitespace-nowrap font-mono">+234 809 441 2200</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#E7E5E4] pt-6 text-[13px] text-[#57534E] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Safe Neighborhood Foundation (SANEF). All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/about#governance" className="hover:text-[#1C1917]">Safeguarding Policy</Link>
            <Link href="/about#governance" className="hover:text-[#1C1917]">Privacy & Data Notice</Link>
            <Link href="/portfolio" className="hover:text-[#1C1917]">Public Audit Archive</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
