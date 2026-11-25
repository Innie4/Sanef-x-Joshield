import React, { Suspense } from "react";
import MarketplaceWizard from "@/components/MarketplaceWizard";
import type { ServiceCategoryKey } from "@/lib/data";

function MarketplaceBody({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const raw = searchParams?.category;
  const initialCategory: ServiceCategoryKey =
    raw === "consultancy" || raw === "training" ? raw : "security";

  return <MarketplaceWizard initialCategory={initialCategory} />;
}

export default function MarketplacePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return (
    <div className="bg-[#F8FAFC] py-12 lg:py-16">
      <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E2E8F0] pb-8">
          <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
            Service Request Marketplace
          </p>
          <h1 className="mt-2 font-heading text-[36px] font-bold leading-[1.08] text-[#0F172A] sm:text-[44px]">
            Request a Security, Consultancy, or Training Engagement
          </h1>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-[#475569]">
            Select your service category below to open the tailored operational intake form. Every
            submission is logged directly in our operations console with a tracked reference number.
          </p>
        </div>

        <div className="mt-8">
          <Suspense fallback={<div className="text-[14px] text-[#475569]">Loading intake flow...</div>}>
            <MarketplaceBody searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
