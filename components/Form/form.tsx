"use client";

import { useForm, ValidationError } from "@formspree/react";
import { motion } from "motion/react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";

interface ContactFormProps {
  dict: {
    contactForm: {
      title: string;
      name: string;
      phone: string;
      email: string;
      message: string;
      button: string;
      sending: string;
      success: string;
      errorTitle: string;
      errorMessage: string;
    };
  };
}

const ContactForm = ({ dict }: ContactFormProps) => {
  const [state, handleSubmit] = useForm("mykdkojv");

  if (state.succeeded) {
    return (
      <section
        id="contact"
        className="w-full max-w-2xl mx-auto py-20 px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 rounded-3xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif text-black">
            {dict.contactForm.title}
          </h2>
          <p className="text-lg text-black/70 font-light max-w-md">
            {dict.contactForm.success}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="w-full max-w-4xl mx-auto pt-12 md:pt-20 pb-4 md:pb-6 px-8"
    >
      {/* Header with lines */}
      <div className="flex items-center justify-center gap-8 mb-16">
        <div className="flex-1 h-[1px] bg-black/10 hidden sm:block" />
        <h2 className="text-3xl md:text-4xl font-serif text-black/80 tracking-tight">
          {dict.contactForm.title}
        </h2>
        <div className="flex-1 h-[1px] bg-black/10 hidden sm:block" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative p-8 md:p-12 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl overflow-hidden"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-serif text-black/60 px-1"
              >
                {dict.contactForm.name}
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full px-5 py-3.5 rounded-xl bg-white/50 border border-white/40 focus:border-black/20 focus:bg-white/80 transition-all outline-none text-black font-light text-base"
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-sm font-serif text-black/60 px-1"
              >
                {dict.contactForm.phone}
              </label>
              <input
                id="phone"
                name="phone"
                className="w-full px-5 py-3.5 rounded-xl bg-white/50 border border-white/40 focus:border-black/20 focus:bg-white/80 transition-all outline-none text-black font-light text-base"
              />
              <ValidationError
                prefix="Phone"
                field="phone"
                errors={state.errors}
                className="text-xs text-red-500 mt-1"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-serif text-black/60 px-1"
            >
              {dict.contactForm.email}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-5 py-3.5 rounded-xl bg-white/50 border border-white/40 focus:border-black/20 focus:bg-white/80 transition-all outline-none text-black font-light text-base"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-xs text-red-500 mt-1"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-serif text-black/60 px-1"
            >
              {dict.contactForm.message}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-5 py-3.5 rounded-xl bg-white/50 border border-white/40 focus:border-black/20 focus:bg-white/80 transition-all outline-none text-black font-light text-base resize-none"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-xs text-red-500 mt-1"
            />
          </div>

          {/* Error Message */}
          {state.errors && Object.keys(state.errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 mb-2"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold">{dict.contactForm.errorTitle}</p>
                <p>{dict.contactForm.errorMessage}</p>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={state.submitting}
            className="group mt-2 px-8 py-4 bg-black/80 hover:bg-black border border-black/10 rounded-2xl text-white font-serif text-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-black/20 active:scale-95 overflow-hidden relative"
          >
            <span className="relative z-10">
              {state.submitting
                ? dict.contactForm.sending
                : dict.contactForm.button}
            </span>
            <Send
              className={`w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 ${state.submitting ? "animate-pulse" : ""}`}
            />

            {/* Button highlight effect */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        </form>

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      </motion.div>
    </section>
  );
};

export default ContactForm;
