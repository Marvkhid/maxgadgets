"use client";

import { useState } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";
import type { EnquiryType } from "@/lib/enquiry";
import { cn } from "@/lib/cn";

const tabs: { type: EnquiryType; label: string }[] = [
  { type: "general", label: "General" },
  { type: "iphone", label: "iPhone" },
  { type: "bulk", label: "Bulk order" },
  { type: "repair", label: "Repair" },
];

export function EnquiryTabs() {
  const [type, setType] = useState<EnquiryType>("general");
  return (
    <div>
      <div role="tablist" aria-label="Enquiry type" className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.type}
            type="button"
            role="tab"
            id={`tab-${tab.type}`}
            aria-selected={type === tab.type}
            aria-controls="enquiry-panel"
            onClick={() => setType(tab.type)}
            className={cn(
              "min-h-11 rounded-full border-[1.5px] px-5 text-sm font-semibold transition",
              type === tab.type ? "border-brand bg-brand text-white" : "border-white/40 text-white hover:border-white",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="enquiry-panel" aria-labelledby={`tab-${type}`}>
        <EnquiryForm key={type} type={type} />
      </div>
    </div>
  );
}
