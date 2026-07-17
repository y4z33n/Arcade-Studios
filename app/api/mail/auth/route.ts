import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password === process.env.MAIL_PASSWORD) {
      // Set the authentication cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'mail_auth',
        value: 'true',
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
