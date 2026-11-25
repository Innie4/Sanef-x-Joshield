"use client";

import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";

export type EntityType = "project" | "partner" | "event" | "service" | "vacancy" | "testimonial";

export interface ModalConfig {
  type: EntityType;
  mode: "create" | "edit";
  item?: any;
}

interface EntityEditModalProps {
  isOpen: boolean;
  config: ModalConfig | null;
  onClose: () => void;
  onSave: (type: EntityType, mode: "create" | "edit", formData: any) => Promise<void> | void;
}

export default function EntityEditModal({
  isOpen,
  config,
  onClose,
  onSave,
}: EntityEditModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (config?.item) {
      setFormData({ ...config.item });
    } else if (config) {
      // Default initial states by entity type
      if (config.type === "project") {
        setFormData({
          title: "",
          category: "Solar Corridors",
          location: "Lagos, Nigeria",
          summary: "",
          status: "Audited & Verified",
        });
      } else if (config.type === "partner") {
        setFormData({
          partnerName: "",
          partnershipType: "Technical Partner",
          partnershipPeriod: "2026 – Present",
          contributions: "",
          status: "Active",
        });
      } else if (config.type === "event") {
        setFormData({
          title: "",
          location: "Lagos, Nigeria",
          date: new Date().toISOString().slice(0, 10),
          type: "Upcoming",
          status: "Published",
        });
      } else if (config.type === "service") {
        setFormData({
          name: "",
          pillar: "Security Services",
          slaStandard: "98.4% Check-In SLA",
          activeClients: 1,
          status: "Published",
        });
      } else if (config.type === "vacancy") {
        setFormData({
          title: "",
          department: "Field Security Operations",
          location: "Lagos Command",
          type: "Full-Time",
          deadline: "2026-12-31",
          status: "Open",
        });
      } else if (config.type === "testimonial") {
        setFormData({
          clientName: "",
          organisation: "",
          category: "Security Services",
          quote: "",
          status: "Approved",
        });
      }
    }
    setError(null);
  }, [config]);

  if (!isOpen || !config) return null;

  const handleChange = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSave(config.type, config.mode, formData);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save record");
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<EntityType, string> = {
    project: "SANEF Project & Evidence Record",
    partner: "SANEF Partner Profile",
    event: "Public Community Event",
    service: "JossyShield Service Offering",
    vacancy: "JossyShield Career Vacancy",
    testimonial: "Client Endorsement / Testimonial",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[560px] rounded-[6px] border border-[#E4E4E7] bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E4E4E7] px-6 py-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              {config.mode === "create" ? "Add New" : "Edit Existing"} · {config.type}
            </span>
            <h2 className="text-[17px] font-semibold text-[#09090B]">
              {config.mode === "create" ? "Create " : "Update "}
              {titles[config.type]}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[4px] p-1 text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#09090B]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-[4px] border border-red-200 bg-red-50 p-3 text-[13px] text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* PROJECT FIELDS */}
          {config.type === "project" && (
            <>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="e.g. Surulere Safe School Transit Corridor"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Category</label>
                  <select
                    value={formData.category || "Solar Corridors"}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  >
                    <option value="Solar Corridors">Solar Corridors</option>
                    <option value="Youth Mediation">Youth Mediation</option>
                    <option value="School Safety">School Safety</option>
                    <option value="Community Watch">Community Watch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Status</label>
                  <select
                    value={formData.status || "Audited & Verified"}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  >
                    <option value="Audited & Verified">Audited & Verified</option>
                    <option value="Field Implementation">Field Implementation</option>
                    <option value="Planning">Planning</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="e.g. Surulere, Lagos"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Field Summary & Scope</label>
                <textarea
                  rows={3}
                  required
                  value={formData.summary || ""}
                  onChange={(e) => handleChange("summary", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="Detailed documentary summary of the project..."
                />
              </div>
            </>
          )}

          {/* PARTNER FIELDS */}
          {config.type === "partner" && (
            <>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Partner Name</label>
                <input
                  type="text"
                  required
                  value={formData.partnerName || ""}
                  onChange={(e) => handleChange("partnerName", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="e.g. MacArthur Foundation West Africa"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Partner Type</label>
                  <select
                    value={formData.partnershipType || "Technical Partner"}
                    onChange={(e) => handleChange("partnershipType", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  >
                    <option value="Technical Partner">Technical Partner</option>
                    <option value="Funding Partner">Funding Partner</option>
                    <option value="Municipal Agency">Municipal Agency</option>
                    <option value="Community Coalition">Community Coalition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Period</label>
                  <input
                    type="text"
                    value={formData.partnershipPeriod || "2026 – Present"}
                    onChange={(e) => handleChange("partnershipPeriod", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Contributions & Role</label>
                <textarea
                  rows={3}
                  value={formData.contributions || ""}
                  onChange={(e) => handleChange("contributions", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="Institutional grant, technical spec, or community facilitation..."
                />
              </div>
            </>
          )}

          {/* EVENT FIELDS */}
          {config.type === "event" && (
            <>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="e.g. Ward Safety Townhall & Radio Demonstration"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date || ""}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Type / Status</label>
                  <select
                    value={formData.type || "Upcoming"}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="e.g. Surulere Civic Centre, Lagos"
                />
              </div>
            </>
          )}

          {/* SERVICE FIELDS (JossyShield) */}
          {config.type === "service" && (
            <>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Service Name</label>
                <input
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="e.g. Static Commercial Facility Guarding"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Service Pillar</label>
                  <select
                    value={formData.pillar || "Security Services"}
                    onChange={(e) => handleChange("pillar", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  >
                    <option value="Security Services">Security Services</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Training">Training</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">SLA Standard / Specification</label>
                  <input
                    type="text"
                    required
                    value={formData.slaStandard || ""}
                    onChange={(e) => handleChange("slaStandard", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                    placeholder="e.g. 98.4% Check-In SLA"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Active Commercial Clients</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.activeClients ?? 1}
                    onChange={(e) => handleChange("activeClients", parseInt(e.target.value) || 0)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Status</label>
                  <select
                    value={formData.status || "Published"}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* VACANCY FIELDS (JossyShield) */}
          {config.type === "vacancy" && (
            <>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Role Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="e.g. CCTV Control Room Dispatch Officer"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Department</label>
                  <input
                    type="text"
                    required
                    value={formData.department || "Field Security Operations"}
                    onChange={(e) => handleChange("department", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location || "Victoria Island, Lagos"}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Contract Type</label>
                  <select
                    value={formData.type || "Full-Time"}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Shift Roster">Shift Roster</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Application Deadline</label>
                  <input
                    type="date"
                    required
                    value={formData.deadline || "2026-12-31"}
                    onChange={(e) => handleChange("deadline", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* TESTIMONIAL FIELDS (JossyShield) */}
          {config.type === "testimonial" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Client Name</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName || ""}
                    onChange={(e) => handleChange("clientName", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                    placeholder="e.g. Bankole Coker"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#71717A]">Client Organisation / Title</label>
                  <input
                    type="text"
                    required
                    value={formData.organisation || ""}
                    onChange={(e) => handleChange("organisation", e.target.value)}
                    className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                    placeholder="e.g. Meridian Towers, VI"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Service Category</label>
                <select
                  value={formData.category || "Security Services"}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                >
                  <option value="Security Services">Security Services</option>
                  <option value="Consultancy">Consultancy</option>
                  <option value="Training">Training</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#71717A]">Testimonial Quote</label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote || ""}
                  onChange={(e) => handleChange("quote", e.target.value)}
                  className="mt-1 w-full rounded-[4px] border border-[#E4E4E7] px-3 py-2 text-[13px] text-[#09090B] focus:border-[#2563EB] focus:outline-none"
                  placeholder="Direct feedback from the client..."
                />
              </div>
            </>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-end gap-2 border-t border-[#E4E4E7] pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-[4px] border border-[#E4E4E7] bg-white px-4 py-2 text-[13px] font-medium text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#09090B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#09090B] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#27272A] disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {loading ? "Saving..." : config.mode === "create" ? "Create Record" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
