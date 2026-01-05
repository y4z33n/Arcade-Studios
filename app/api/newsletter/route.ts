import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  firstName: z.string().optional(),
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = newsletterSchema.parse(body);

    // TODO: Integrate with your email service (Resend, SendGrid, etc.)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.contacts.create({
    //   email: validatedData.email,
    //   firstName: validatedData.firstName,
    //   audienceId: process.env.RESEND_AUDIENCE_ID!,
    // });

    // For now, just log the data and return success
    console.log("Newsletter subscription:", validatedData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        message: "Successfully subscribed to newsletter",
        data: validatedData,
      },
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

