import { SITE_CONFIG } from './constants';

export interface EmailAttachment {
  filename: string;
  content?: string; // base64
  contentType?: string;
  size?: number;
}

export interface EmailSignature {
  enabled: boolean;
  fullName: string;
  jobTitle: string;
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  website: string;
  logoUrl: string;
  includeSocials: boolean;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
  disclaimer: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: 'proposal' | 'meeting' | 'followup' | 'billing' | 'onboarding';
  subject: string;
  bodyHtml: string;
}

export const DEFAULT_SIGNATURE: EmailSignature = {
  enabled: true,
  fullName: 'Yazeen',
  jobTitle: 'Founder & Lead Engineer',
  companyName: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  phone: '+230 57904684',
  email: SITE_CONFIG.email,
  website: SITE_CONFIG.url,
  logoUrl: 'https://leylak.tech/leylak-new.png',
  includeSocials: true,
  socialLinks: {
    linkedin: SITE_CONFIG.social.linkedin,
    twitter: SITE_CONFIG.social.twitter,
    github: SITE_CONFIG.social.github,
    instagram: SITE_CONFIG.social.instagram,
  },
  disclaimer:
    'This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed.',
};

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'project-proposal',
    name: 'Project Proposal & Scope',
    category: 'proposal',
    description: 'Detailed proposal outline with scope, deliverables, and estimated timeline.',
    subject: 'Project Proposal & Roadmap — Leylak Tech',
    bodyHtml: `
<p>Hi there,</p>
<p>Thank you for taking the time to discuss your vision with us. Following our conversation, we have drafted the project roadmap and proposed scope of work:</p>
<h3 style="color: #9333ea; margin-top: 16px;">Key Deliverables</h3>
<ul>
  <li><strong>Phase 1: Architecture & UX Design</strong> — Wireframes, design system, and technical blueprint.</li>
  <li><strong>Phase 2: Core Engineering</strong> — Full-stack implementation, modern responsive UI, and custom APIs.</li>
  <li><strong>Phase 3: Testing & Deployment</strong> — Security audit, performance optimization, and production release.</li>
</ul>
<p>Please review the details and let us know if you have any questions or would like to schedule a quick call to finalize next steps.</p>
<p>Looking forward to collaborating on this!</p>
`,
  },
  {
    id: 'discovery-meeting',
    name: 'Discovery Call / Meeting Invite',
    category: 'meeting',
    description: 'Invitation for a discovery consultation to explore requirements.',
    subject: 'Discovery Call Invitation — Leylak Tech',
    bodyHtml: `
<p>Hi,</p>
<p>I would love to set up a quick 20-30 minute discovery session to learn more about your project goals and how we can support your technical roadmap.</p>
<p>During our call, we will cover:</p>
<ol>
  <li>Your core project requirements and timeline.</li>
  <li>Technical stack recommendations (Next.js, AI integrations, Cloud architecture).</li>
  <li>Estimated budget range and next steps.</li>
</ol>
<p>Let me know what times work best for you this week, or feel free to pick a slot directly via our calendar.</p>
`,
  },
  {
    id: 'client-followup',
    name: 'Milestone & Follow-Up Check-in',
    category: 'followup',
    description: 'Friendly follow-up regarding pending approvals or project updates.',
    subject: 'Project Update & Follow-up — Leylak Tech',
    bodyHtml: `
<p>Hi,</p>
<p>Just checking in regarding our latest milestone update. We've made great progress on the implementation and wanted to ensure everything aligns with your expectations.</p>
<blockquote style="border-left: 3px solid #9333ea; padding-left: 12px; margin: 16px 0; color: #a1a1aa; font-style: italic;">
  "Please let us know if there are any specific refinements or adjustments you would like us to prioritize."
</blockquote>
<p>Looking forward to your feedback so we can move forward with the next sprint.</p>
`,
  },
  {
    id: 'invoice-notice',
    name: 'Invoice & Payment Details',
    category: 'billing',
    description: 'Formal invoice transmission with bank details and payment schedule.',
    subject: 'Invoice for Project Milestone — Leylak Tech',
    bodyHtml: `
<p>Hi,</p>
<p>Please find attached the invoice for the completed project milestone.</p>
<table style="width: 100%; max-width: 500px; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
  <tr style="border-bottom: 1px solid #333;">
    <td style="padding: 8px 0; color: #888;">Invoice Reference:</td>
    <td style="padding: 8px 0; text-align: right; font-weight: bold;">INV-2026-001</td>
  </tr>
  <tr style="border-bottom: 1px solid #333;">
    <td style="padding: 8px 0; color: #888;">Due Date:</td>
    <td style="padding: 8px 0; text-align: right;">Within 14 Days</td>
  </tr>
</table>
<p>Kindly confirm once payment has been initiated. If you require any additional purchase order details, feel free to reach out.</p>
`,
  },
  {
    id: 'project-kickoff',
    name: 'Project Welcome & Kickoff',
    category: 'onboarding',
    description: 'Welcome onboarding package with communication channels and shared drive links.',
    subject: 'Welcome to Leylak Tech — Project Kickoff',
    bodyHtml: `
<p>Hi Team,</p>
<p>Welcome aboard! We are thrilled to officially kick off our collaboration.</p>
<p>Here is what we have prepared for you to ensure a smooth workflow:</p>
<ul>
  <li><strong>Shared Slack / Discord Channel:</strong> For day-to-day updates and async discussions.</li>
  <li><strong>Figma Workspace:</strong> Interactive UI/UX prototypes and design system tokens.</li>
  <li><strong>Staging Environment:</strong> Live staging preview links updated on every sprint release.</li>
</ul>
<p>Our team will reach out with the calendar invite for our first sprint sync.</p>
`,
  },
];

/**
 * Generates an email-client safe HTML signature table
 */
export function generateSignatureHtml(sig: EmailSignature): string {
  if (!sig || !sig.enabled) return '';

  const logoSrc = sig.logoUrl || 'https://leylak.tech/leylak-new.png';

  const socialIconsHtml = sig.includeSocials
    ? `
    <div style="margin-top: 10px; font-size: 12px; color: #9333ea;">
      ${sig.socialLinks.linkedin ? `<a href="${sig.socialLinks.linkedin}" target="_blank" style="color: #9333ea; text-decoration: none; margin-right: 12px; font-weight: 500;">LinkedIn</a>` : ''}
      ${sig.socialLinks.twitter ? `<a href="${sig.socialLinks.twitter}" target="_blank" style="color: #9333ea; text-decoration: none; margin-right: 12px; font-weight: 500;">Twitter</a>` : ''}
      ${sig.socialLinks.github ? `<a href="${sig.socialLinks.github}" target="_blank" style="color: #9333ea; text-decoration: none; margin-right: 12px; font-weight: 500;">GitHub</a>` : ''}
      ${sig.socialLinks.instagram ? `<a href="${sig.socialLinks.instagram}" target="_blank" style="color: #9333ea; text-decoration: none; margin-right: 12px; font-weight: 500;">Instagram</a>` : ''}
    </div>
  `
    : '';

  const disclaimerHtml = sig.disclaimer
    ? `
    <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; line-height: 1.4; max-width: 550px;">
      ${sig.disclaimer}
    </div>
  `
    : '';

  return `
<!-- Email Signature -->
<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 24px; padding-top: 20px; border-top: 2px solid #8b5cf6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; width: 100%;">
  <tr>
    <td style="vertical-align: top; padding-right: 16px; width: 72px;">
      <img src="${logoSrc}" alt="${sig.companyName}" width="68" height="68" style="display: block; border-radius: 12px; object-fit: contain; background: #000; padding: 4px;" />
    </td>
    <td style="vertical-align: top; font-size: 13px; line-height: 1.5; color: #374151;">
      <div style="font-size: 16px; font-weight: 700; color: #111827; letter-spacing: -0.2px;">${sig.fullName}</div>
      <div style="font-size: 13px; font-weight: 500; color: #7c3aed; margin-bottom: 6px;">${sig.jobTitle} <span style="color: #d1d5db;">|</span> ${sig.companyName}</div>
      <div style="font-size: 12px; color: #6b7280;">
        ${sig.phone ? `<span>📞 <a href="tel:${sig.phone.replace(/\s+/g, '')}" style="color: #4b5563; text-decoration: none;">${sig.phone}</a></span> &nbsp;•&nbsp; ` : ''}
        ${sig.email ? `<span>✉️ <a href="mailto:${sig.email}" style="color: #4b5563; text-decoration: none;">${sig.email}</a></span>` : ''}
      </div>
      <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">
        ${sig.website ? `<span>🌐 <a href="${sig.website}" target="_blank" style="color: #7c3aed; text-decoration: none; font-weight: 500;">${sig.website.replace(/^https?:\/\//, '')}</a></span>` : ''}
      </div>
      ${socialIconsHtml}
      ${disclaimerHtml}
    </td>
  </tr>
</table>
`;
}

/**
 * Wraps email HTML body with full modern responsive document wrapper
 */
export function buildFullEmailHtml(bodyContent: string, signatureHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leylak Mail</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; background-color: #f9fafb; }
    .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
    .email-content { padding: 32px 28px; line-height: 1.6; font-size: 15px; color: #1f2937; }
    .email-content p { margin: 0 0 16px 0; }
    .email-content h1, .email-content h2, .email-content h3 { color: #111827; margin: 20px 0 10px 0; }
    .email-content ul, .email-content ol { margin: 0 0 16px 0; padding-left: 24px; }
    .email-content li { margin-bottom: 6px; }
    .email-content a { color: #7c3aed; text-decoration: underline; }
    .email-content blockquote { border-left: 4px solid #7c3aed; padding-left: 14px; margin: 16px 0; color: #4b5563; font-style: italic; }
    .email-content code { background-color: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px; }
    .email-content pre { background-color: #1f2937; color: #f9fafb; padding: 12px; border-radius: 8px; overflow-x: auto; }
    .email-footer { background-color: #f3f4f6; padding: 16px 28px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-content">
      ${bodyContent}
      ${signatureHtml ? `<div style="margin-top: 28px;">${signatureHtml}</div>` : ''}
    </div>
    <div class="email-footer">
      Sent via <strong>${SITE_CONFIG.name}</strong> • ${SITE_CONFIG.url}
    </div>
  </div>
</body>
</html>
`;
}
