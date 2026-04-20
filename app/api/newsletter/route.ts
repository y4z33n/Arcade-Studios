import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const newsletterSchema = z.object({
  firstName: z.string().optional(),
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = newsletterSchema.parse(body);

    // Notify the team about the new subscriber
    await resend.emails.send({
      from: "Arcade <hello@arcade.tech>",
      to: process.env.CONTACT_EMAIL ?? "hello@arcade.tech",
      subject: `New newsletter subscriber: ${validatedData.email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #dc2626;">New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          ${validatedData.firstName ? `<p><strong>Name:</strong> ${validatedData.firstName}</p>` : ""}
          <p style="font-size: 12px; color: #888;">Subscribed via arcade.tech</p>
        </div>
      `,
    });

    // Send a welcome email to the subscriber
    await resend.emails.send({
      from: "Arcade <hello@arcade.tech>",
      to: validatedData.email,
      subject: "You're on the list — Arcade",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #dc2626;">Welcome${validatedData.firstName ? `, ${validatedData.firstName}` : ""}!</h2>
          <p style="line-height: 1.6; color: #444;">
            You're now subscribed to updates from Arcade. We'll keep you in the loop on new projects, insights, and studio news.
          </p>
          <p style="line-height: 1.6; color: #444;">
            In the meantime, explore our latest work at
            <a href="https://arcade.tech/work" style="color: #dc2626;">arcade.tech/work</a>.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 13px; color: #888;">
            The Arcade Team<br />
            <a href="mailto:hello@arcade.tech" style="color: #dc2626;">hello@arcade.tech</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("Newsletter API error:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


