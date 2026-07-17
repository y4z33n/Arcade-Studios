'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MailLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/mail/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/mail');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid password');
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-8 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">Leylak Webmail</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Mail Password"
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access Inbox'}
          </button>
        </form>
      </div>
    </div>
  );
}
