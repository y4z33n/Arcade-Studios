import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Send notification email to Arcade
    await resend.emails.send({
      from: "Arcade Contact Form <hello@arcade.tech>",
      to: process.env.CONTACT_EMAIL ?? "hello@arcade.tech",
      replyTo: validatedData.email,
      subject: `New enquiry from ${validatedData.name}${validatedData.company ? ` — ${validatedData.company}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="border-bottom: 2px solid #dc2626; padding-bottom: 12px; color: #dc2626;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td>
              <td style="padding: 8px 0;">${validatedData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${validatedData.email}" style="color: #dc2626;">${validatedData.email}</a></td>
            </tr>
            ${validatedData.company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Company</td>
              <td style="padding: 8px 0;">${validatedData.company}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 24px;">
            <p style="font-weight: bold; margin-bottom: 8px;">Message</p>
            <p style="background: #f5f5f5; padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap;">${validatedData.message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #888;">Sent from the contact form at arcade.tech</p>
        </div>
      `,
    });

    // Send auto-reply to the person who submitted
    await resend.emails.send({
      from: "Arcade <hello@arcade.tech>",
      to: validatedData.email,
      subject: "We received your message — Arcade",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #dc2626;">Thanks for reaching out, ${validatedData.name.split(" ")[0]}!</h2>
          <p style="line-height: 1.6; color: #444;">
            We've received your message and will get back to you within 24 hours.
          </p>
          <p style="line-height: 1.6; color: #444;">
            In the meantime, feel free to explore our work at
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
      { message: "Message sent successfully" },
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

    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

