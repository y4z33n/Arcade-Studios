"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({
  firstName: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  theme?: "light" | "dark";
  className?: string;
}

export default function NewsletterForm({
  theme = "light",
  className,
}: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/newsletter", {
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
      console.error("Newsletter submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="First Name (optional)"
            {...register("firstName")}
            className={cn(
              "w-full px-4 py-3 rounded border transition-colors",
              isDark
                ? "bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white focus:outline-none"
                : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black focus:outline-none"
            )}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email *"
            {...register("email")}
            className={cn(
              "w-full px-4 py-3 rounded border transition-colors",
              isDark
                ? "bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white focus:outline-none"
                : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black focus:outline-none"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full px-6 py-3 rounded font-medium transition-colors disabled:opacity-50",
            isDark
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          )}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {submitStatus === "success" && (
        <p
          className={cn(
            "mt-4 text-sm",
            isDark ? "text-green-400" : "text-green-600"
          )}
        >
          Thanks for subscribing! Check your email to confirm.
        </p>
      )}

      {submitStatus === "error" && (
        <p className="mt-4 text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      <p
        className={cn(
          "mt-4 text-xs",
          isDark ? "text-white/60" : "text-gray-500"
        )}
      >
        Join our community of developers and designers building the future of
        the web.
      </p>
    </div>
  );
}






