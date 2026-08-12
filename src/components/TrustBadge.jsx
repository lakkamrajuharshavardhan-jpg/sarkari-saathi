import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, Info } from 'lucide-react';

/**
 * Domain Verification Logic
 * Checks if URL host belongs to official Indian Government domains (.gov.in, .nic.in, .edu.in, .ac.in, etc.)
 * or trusted national institutions/banks (sbi.co.in, rbi.org.in, etc.).
 */
export function verifyDomainTrust(url) {
  if (!url) return { isOfficial: false, domain: '', label: 'Unverified' };

  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    const host = parsed.hostname.toLowerCase();

    // 1. Official Government TLDs & Domain Suffixes
    const officialGovSuffixes = [
      '.gov.in',
      '.nic.in',
      '.edu.in',
      '.ac.in',
      '.org.in',
      '.gov',
      '.mil.in'
    ];

    const isGovTLD = officialGovSuffixes.some(suffix => host.endsWith(suffix));

    // 2. Specific Approved Institutional & Banking Domains
    const trustedDomains = [
      'upsc.gov.in',
      'ssc.gov.in',
      'nta.ac.in',
      'ibps.in',
      'sbi.co.in',
      'rbi.org.in',
      'icicibank.com',
      'hdfcbank.com',
      'nabard.org',
      'pmkisan.gov.in',
      'nha.gov.in',
      'ncs.gov.in',
      'uidai.gov.in',
      'incometax.gov.in'
    ];

    const isTrustedDomain = trustedDomains.some(domain => host === domain || host.endsWith('.' + domain));

    if (isGovTLD || isTrustedDomain) {
      return {
        isOfficial: true,
        domain: host,
        label: 'Verified Official Domain',
        badgeColor: 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300',
        iconColor: 'text-emerald-400',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,0.25)]'
      };
    }

    return {
      isOfficial: false,
      domain: host,
      label: 'Third-Party Resource',
      badgeColor: 'bg-amber-950/80 border-amber-700/60 text-amber-300',
      iconColor: 'text-amber-400',
      glow: ''
    };
  } catch (e) {
    return { isOfficial: false, domain: url, label: 'External Resource', badgeColor: 'bg-slate-900 border-slate-700 text-slate-400', iconColor: 'text-slate-400', glow: '' };
  }
}

export default function TrustBadge({ url, className = '', showTooltip = true, compact = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const trust = verifyDomainTrust(url);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono font-medium transition-all duration-300 cursor-help ${trust.badgeColor} ${trust.glow} ${className}`}
      >
        {trust.isOfficial ? (
          <ShieldCheck className={`w-3.5 h-3.5 ${trust.iconColor} shrink-0 animate-pulse`} />
        ) : (
          <ShieldAlert className={`w-3.5 h-3.5 ${trust.iconColor} shrink-0`} />
        )}

        <span>{compact ? (trust.isOfficial ? 'Official .gov.in' : 'Third-Party') : trust.label}</span>
      </div>

      {/* Interactive Tooltip */}
      {showTooltip && isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-950 text-slate-200 text-xs rounded-xl shadow-2xl border border-slate-800 z-50 animate-fadeIn pointer-events-none">
          <div className="flex items-center gap-2 font-bold mb-1 border-b border-slate-800 pb-1.5">
            {trust.isOfficial ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Authentic Official Portal</span>
              </>
            ) : (
              <>
                <Info className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400">External Informational Link</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            {trust.isOfficial
              ? `Domain (${trust.domain}) is an officially authenticated Indian Government (.gov.in / .nic.in) or verified banking portal.`
              : `Domain (${trust.domain}) is an external resource. Always verify credentials before submitting personal documents.`}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950" />
        </div>
      )}
    </div>
  );
}
