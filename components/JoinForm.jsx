"use client";

import { useActionState } from "react";
import { CustomDropdown } from "./CustomDropdown";
import { sendEmail } from "../app/api/action";
const initialState = {
  success: false,
  message: "",
};

export function JoinForm() {
  // 1. Initialize the hook
  const [state, formAction, isPending] = useActionState(sendEmail, initialState);

  const dropdownValue = [
    { value: "signature-scent", label: "Bespoke Signature Scent" },
    { value: "private-label", label: "Private Label Fragrance" },
    { value: "wholesale", label: "Wholesale / Stockist" },
    { value: "home-fragrance", label: "Home & Ambient Fragrance" },
    { value: "discovery-set", label: "Discovery Set" },
    { value: "reformulation", label: "Fragrance Reformulation" },
    { value: "consultation-only", label: "Consultation Only" },
    { value: "lets-discuss", label: "Let's Discuss" },
  ];

  const dropdownValue2 = [
    { value: "2500-5000", label: "$2,500 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-25000", label: "$10,000 - $25,000" },
    { value: "25000-plus", label: "$25,000+" },
    { value: "lets-discuss", label: "Let's Discuss" },
  ];

  return (
    <section className="w-full bg-ink text-ivory snap-start flex flex-col justify-center py-12 md:py-18 px-4 sm:px-6 mb-6 mt-12">
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-8 mt-6 md:mt-1 px-4">
        <p className="eyebrow mb-5">For Perfumers &amp; Boutiques</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
          Join the Atelier
        </h2>
        {/* <p className="text-taupe text-lg max-w-3xl mx-auto mt-3">Tell us about your work and we will be in touch.</p> */}
      </div>

      <div className="max-w-6xl w-full mx-auto bg-ink-soft border border-ivory/10 p-6 sm:p-8 md:p-12 rounded-2xl">
        {/* <h3 className="text-lg sm:text-xl font-semibold mb-1">Start Your Project - We Will Contact You Very Soon</h3>
        <p className="text-gray-300 text-[13px] mb-1">Start Your Project - We Will Contact You Very Soon</p> */}

        {/* 2. Add formAction here */}
        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-taupe mb-1 block">Full Name *</label>
            <input
              name="fullName" // Added name
              required
              className="field"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-taupe mb-1 block">Email Address *</label>
            <input
              name="email" // Added name
              type="email"
              required
              className="field"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-taupe mb-1 block">Company Name</label>
            <input
              name="companyName" // Added name
              className="field"
              placeholder="Your house or boutique (optional)"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-taupe mb-1 block">Phone Number</label>
            <input
              name="phoneNumber" // Added name
              type="tel"
              className="field"
              placeholder="+1 (___) ___-____"
            />
          </div>

          {/* <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-taupe mb-1 block">Project Type *</label>

            <CustomDropdown name="projectType" dropdownValue={dropdownValue} />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-taupe mb-1 block">Budget Range *</label>
            <CustomDropdown name="budgetRange" dropdownValue={dropdownValue2} />
          </div> */}

          <div className="md:col-span-2">
            <label className="text-[11px] uppercase tracking-[0.2em] text-taupe mb-1 block">Tell Us About Your Work *</label>
            <textarea
              name="projectDetails" // Added name
              required
              rows={4}
              className="field resize-none"
              placeholder="A few lines about you, your work and what you are looking for..."
            />
          </div>

          {/* 3. Handling Submit State */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className={`btn-primary mt-4 w-full py-4 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>

            {/* 4. Display Feedback */}
            {state.message && (
              <p className={`mt-4 text-center text-sm ${state.success ? "text-champagne" : "text-[#d9917f]"}`}>
                {state.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
