import React, { useState, useEffect } from 'react';
import { X, Bell, Mail, MessageSquare, Check, Sparkles, Phone, Send, CheckCircle2 } from 'lucide-react';
import { getUserAlertPreferences, saveUserAlertPreferences, buildEmailPayload, buildWhatsAppPayload } from '../services/notificationEngine';
import { translations } from '../data/translations';

export default function AlertSettingsModal({
  isOpen,
  onClose,
  lang = 'en',
  user,
  savedSchemes = [],
  savedExams = []
}) {
  const t = translations[lang] || translations.en;

  const [email, setEmail] = useState(user?.email || '');
  const [countryCode, setCountryCode] = useState('+91');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [whatsappAlertsEnabled, setWhatsappAlertsEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testAlertSent, setTestAlertSent] = useState(false);
  const [previewPayload, setPreviewPayload] = useState(null);

  // Load user alert preferences
  useEffect(() => {
    async function load() {
      const prefs = await getUserAlertPreferences(user?.uid);
      if (prefs.email) setEmail(prefs.email);
      if (prefs.whatsappNumber) setWhatsappNumber(prefs.whatsappNumber);
      if (prefs.countryCode) setCountryCode(prefs.countryCode);
      if (typeof prefs.emailAlertsEnabled === 'boolean') setEmailAlertsEnabled(prefs.emailAlertsEnabled);
      if (typeof prefs.whatsappAlertsEnabled === 'boolean') setWhatsappAlertsEnabled(prefs.whatsappAlertsEnabled);
    }
    if (isOpen) {
      load();
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const prefs = {
      email,
      countryCode,
      whatsappNumber,
      emailAlertsEnabled,
      whatsappAlertsEnabled,
      savedSchemesCount: savedSchemes.length,
      savedExamsCount: savedExams.length
    };

    await saveUserAlertPreferences(user?.uid, prefs);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Simulate Instant Dispatch Test Alert
  const handleSendTestAlert = () => {
    const sampleItems = [...savedSchemes, ...savedExams].slice(0, 2);
    if (sampleItems.length === 0) {
      sampleItems.push(
        { nameEn: "UPSC Civil Services Examination 2026", keyDates: { applicationEndEn: "Mar 05, 2026" } },
        { nameEn: "PM Kisan Samman Nidhi Yojana", keyDates: { applicationEndEn: "Closing in 3 days" } }
      );
    }

    const fullPhone = `${countryCode}${whatsappNumber.replace(/\D/g, '')}`;
    const emailPayload = buildEmailPayload(email || 'citizen@portal.gov.in', sampleItems);
    const whatsappPayload = buildWhatsAppPayload(fullPhone || '+919876543210', sampleItems);

    setPreviewPayload({ emailPayload, whatsappPayload, fullPhone });
    setTestAlertSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      
      {/* Click Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container - Warm Paper Cream Theme (#FAF7F2 & #F4EFEB) */}
      <div className="relative w-full max-w-xl bg-[#FAF7F2] text-[#1C1917] rounded-3xl shadow-2xl border-2 border-[#E7E2D8] p-6 sm:p-8 space-y-6 z-10 font-sans">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] text-[10px] font-mono font-bold text-[#963628] uppercase tracking-widest">
              <Bell className="w-3.5 h-3.5 text-[#963628]" />
              AUTOMATED DEADLINE ALERT SYSTEM
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1C1917] pt-1">
              Notification & Deadline Alerts
            </h3>
            <p className="text-xs text-[#57534E]">
              Daily 08:00 AM IST Cron Engine • WhatsApp Business API & Nodemailer Email Dispatch
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] hover:bg-[#E7E2D8] text-[#57534E] hover:text-[#1C1917] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Save Confirmation Toast */}
        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-[#2D5A43]/10 border border-[#2D5A43]/30 text-[#2D5A43] text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
            <span>Notification preferences updated successfully! Daily alerts will run at 08:00 AM IST.</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-5">
          
          {/* Channel 1: Email Settings */}
          <div className="p-4 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white border border-[#E7E2D8] text-[#963628]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917]">Email Deadline Alerts</h4>
                  <p className="text-[11px] text-[#57534E]">Receive HTML alerts for upcoming application end dates</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setEmailAlertsEnabled(!emailAlertsEnabled)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  emailAlertsEnabled ? 'bg-[#963628] justify-end' : 'bg-[#D4CDC1] justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            {emailAlertsEnabled && (
              <div className="pt-2 animate-fadeIn">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E2D8] text-xs text-[#1C1917] placeholder-[#57534E] focus:outline-none focus:border-[#963628] font-mono"
                />
              </div>
            )}
          </div>

          {/* Channel 2: WhatsApp Settings */}
          <div className="p-4 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white border border-[#E7E2D8] text-[#2D5A43]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917]">WhatsApp Application Alerts</h4>
                  <p className="text-[11px] text-[#57534E]">Meta Cloud WhatsApp API direct mobile messaging</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setWhatsappAlertsEnabled(!whatsappAlertsEnabled)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  whatsappAlertsEnabled ? 'bg-[#2D5A43] justify-end' : 'bg-[#D4CDC1] justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            {whatsappAlertsEnabled && (
              <div className="pt-2 flex items-center gap-2 animate-fadeIn">
                {/* Country Code Picker */}
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-white border border-[#E7E2D8] text-xs text-[#963628] font-mono focus:outline-none"
                >
                  <option value="+91">🇮🇳 +91 (India)</option>
                  <option value="+1">🇺🇸 +1 (US)</option>
                  <option value="+44">🇬🇧 +44 (UK)</option>
                  <option value="+971">🇦🇪 +971 (UAE)</option>
                </select>

                {/* WhatsApp Phone Input */}
                <div className="relative flex-1">
                  <Phone className="w-3.5 h-3.5 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E7E2D8] text-xs text-[#1C1917] placeholder-[#57534E] focus:outline-none focus:border-[#963628] font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Saved Items Summary */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] flex items-center justify-between text-xs text-[#57534E] font-mono">
            <span>Subscribed Items ({savedSchemes.length + savedExams.length})</span>
            <span className="text-[#963628] font-bold">{savedSchemes.length} Schemes • {savedExams.length} Exams</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3.5 px-4 rounded-xl bg-[#963628] hover:bg-[#7D2C1F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Saving Preferences...' : 'Save Alert Settings'}</span>
            </button>

            <button
              type="button"
              onClick={handleSendTestAlert}
              className="py-3.5 px-4 rounded-xl bg-white hover:bg-[#F4EFEB] border border-[#D4CDC1] text-[#963628] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Test Dispatch</span>
            </button>
          </div>

        </form>

        {/* Live Payload Preview Drawer */}
        {testAlertSent && previewPayload && (
          <div className="p-4 rounded-2xl bg-white border border-[#E7E2D8] shadow-md space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-2">
              <span className="text-xs font-mono font-bold text-[#963628] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#963628]" />
                AUTOMATED DISPATCH SIMULATION COMPLETE
              </span>
              <button
                onClick={() => setTestAlertSent(false)}
                className="text-xs text-[#57534E] hover:text-[#963628]"
              >
                Close Preview
              </button>
            </div>

            <div className="space-y-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E7E2D8] text-[#1C1917]">
                <strong className="text-[#2D5A43]">Nodemailer Dispatch:</strong> Sent HTML notification to <code>{previewPayload.emailPayload.to}</code>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E7E2D8] text-[#1C1917]">
                <strong className="text-[#2D5A43]">Meta WhatsApp Cloud API Payload:</strong> Dispatched template <code>sarkari_saathi_deadline_reminder</code> to <code>{previewPayload.fullPhone}</code>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
