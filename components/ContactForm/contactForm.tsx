"use client";

import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import SectionHeading from "@/components/ui/sectionHeading";
import type { Dict } from "@/app/i18n/dictionaries";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "mykdkojv";

const inputClass =
  "w-full px-[14px] py-2.5 rounded-full border border-ink/[0.16] bg-bg font-inherit text-sm text-ink outline-none focus-visible:border-accent transition-colors";

const ContactForm = ({ dict }: { dict: Dict }) => {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <section id="contacto" className="max-w-[700px] mx-auto px-6 py-14 text-center">
        <div className="p-10 rounded-3xl bg-surface flex flex-col items-center gap-4">
          <div className="w-14 h-14 bg-accent-2-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-accent-2-700" />
          </div>
          <h2 className="text-2xl">{dict.contactForm.title}</h2>
          <p className="text-neutral-800">{dict.contactForm.success}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="max-w-[700px] mx-auto px-6 py-14">
      <SectionHeading title={dict.contactForm.title} />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-surface rounded-[28px] p-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs text-neutral-700 mb-1.5">
              {dict.contactForm.name}
            </label>
            <input id="name" name="name" required className={inputClass} />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-xs text-red-600 mt-1"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs text-neutral-700 mb-1.5">
              {dict.contactForm.phone}
            </label>
            <input id="phone" name="phone" className={inputClass} />
            <ValidationError
              prefix="Phone"
              field="phone"
              errors={state.errors}
              className="text-xs text-red-600 mt-1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs text-neutral-700 mb-1.5">
            {dict.contactForm.email}
          </label>
          <input id="email" type="email" name="email" required className={inputClass} />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-xs text-red-600 mt-1"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs text-neutral-700 mb-1.5">
            {dict.contactForm.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-[14px] py-2.5 rounded-[20px] border border-ink/[0.16] bg-bg font-inherit text-sm text-ink outline-none focus-visible:border-accent transition-colors resize-y"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-xs text-red-600 mt-1"
          />
        </div>

        {state.errors && Object.keys(state.errors).length > 0 && (
          <div
            role="alert"
            aria-live="polite"
            className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold m-0">{dict.contactForm.errorTitle}</p>
              <p className="m-0">{dict.contactForm.errorMessage}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={state.submitting}
          className="self-start mt-1 px-7 py-3.5 bg-accent-700 hover:bg-accent-800 text-bg rounded-full text-[15px] flex items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {state.submitting ? dict.contactForm.sending : dict.contactForm.button}
          <Send className="w-4 h-4" />
        </button>
      </form>

      <p className="text-center text-sm text-neutral-700 mt-6">
        {dict.contactForm.whatsappPrompt}{" "}
        <span className="text-accent-2-700">
          {dict.contactForm.whatsappCta}{" "}
          <span className="font-mono text-xs text-neutral-700">
            {dict.contactForm.whatsappPlaceholder}
          </span>
        </span>
      </p>
    </section>
  );
};

export default ContactForm;
