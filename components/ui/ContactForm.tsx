"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={cn(
              "w-full px-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl transition-all",
              "text-white placeholder:text-white/40",
              "focus:outline-none focus:border-red-400 focus:bg-white/10",
              errors.name ? "border-red-500" : "border-white/10"
            )}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={cn(
              "w-full px-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl transition-all",
              "text-white placeholder:text-white/40",
              "focus:outline-none focus:border-red-400 focus:bg-white/10",
              errors.email ? "border-red-500" : "border-white/10"
            )}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Company Field */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            {...register("company")}
            className="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all text-white placeholder:text-white/40 focus:outline-none focus:border-red-400 focus:bg-white/10"
            placeholder="Your company (optional)"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider"
          >
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            {...register("message")}
            className={cn(
              "w-full px-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl transition-all resize-vertical",
              "text-white placeholder:text-white/40",
              "focus:outline-none focus:border-red-400 focus:bg-white/10",
              errors.message ? "border-red-500" : "border-white/10"
            )}
            placeholder="Tell us about your project..."
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-base md:text-lg"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="mt-6 p-6 bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-xl">
          <p className="text-green-400 font-medium text-lg">
            Message sent successfully!
          </p>
          <p className="text-green-300/80 text-sm mt-1">
            We'll get back to you as soon as possible.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="mt-6 p-6 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl">
          <p className="text-red-400 font-medium text-lg">
            Something went wrong.
          </p>
          <p className="text-red-300/80 text-sm mt-1">
            Please try again or email us directly.
          </p>
        </div>
      )}
    </div>
  );
}






