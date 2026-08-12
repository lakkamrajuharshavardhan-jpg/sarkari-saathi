import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

/**
 * Check deadline proximity (Closing within 3 days, or starting today)
 */
export function evaluateDeadlineStatus(dates) {
  if (!dates || !dates.applicationEndEn) return { status: 'NORMAL', daysLeft: null };

  const today = new Date();
  const endDate = new Date(dates.applicationEndEn);
  if (isNaN(endDate.getTime())) return { status: 'NORMAL', daysLeft: null };

  const diffTime = endDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysLeft <= 3 && daysLeft >= 0) {
    return { status: 'CLOSING_SOON', daysLeft, message: `Application closing in ${daysLeft === 0 ? 'today' : daysLeft + ' day(s)'}` };
  } else if (daysLeft < 0) {
    return { status: 'CLOSED', daysLeft, message: 'Application Window Closed' };
  }

  return { status: 'OPEN', daysLeft, message: `Open until ${dates.applicationEndEn}` };
}

/**
 * Format Nodemailer / SendGrid Email Dispatch Payload
 */
export function buildEmailPayload(userEmail, items) {
  return {
    to: userEmail,
    from: "alerts@sarkarisaathi.gov.in",
    subject: `🚨 SarkariSaathi Alert: ${items.length} Application Deadline(s) Closing Soon`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #FAF7F2; padding: 20px; color: #1C1917;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 16px; border: 1px solid #E7E2D8;">
          <h2 style="color: #963628; margin-top: 0;">🇮🇳 SarkariSaathi Urgent Deadline Alert</h2>
          <p style="font-size: 14px; color: #57534E;">Namaste Citizen Candidate, the following saved government welfare schemes or competitive exams have upcoming deadlines:</p>
          <hr style="border: 0; border-top: 1px solid #E7E2D8; margin: 16px 0;" />
          ${items.map(item => `
            <div style="padding: 12px; margin-bottom: 12px; background: #F4EFEB; border-radius: 8px; border-left: 4px solid #963628;">
              <h4 style="margin: 0 0 6px 0; color: #1C1917;">${item.nameEn || item.name}</h4>
              <p style="margin: 0; font-size: 12px; color: #963628; font-weight: bold;">
                ⏳ Application Deadline: ${item.keyDates?.applicationEndEn || item.applicationDeadlineEn || 'Closing Soon'}
              </p>
            </div>
          `).join('')}
          <a href="https://sarkari-saathi.web.app" style="display: inline-block; background: #963628; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 12px;">Visit SarkariSaathi Portal</a>
        </div>
      </div>
    `
  };
}

/**
 * Format Meta Cloud WhatsApp Business API / Twilio SMS Template Payload
 */
export function buildWhatsAppPayload(phoneWithCountryCode, items) {
  const itemNames = items.map(i => `• ${i.nameEn || i.name} (Deadline: ${i.keyDates?.applicationEndEn || 'Closing Soon'})`).join('\n');

  return {
    messaging_product: "whatsapp",
    to: phoneWithCountryCode,
    type: "template",
    template: {
      name: "sarkari_saathi_deadline_reminder",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: items.length.toString() },
            { type: "text", text: itemNames }
          ]
        }
      ]
    },
    rawTextMessage: `🚨 *SarkariSaathi Urgent Deadline Alert*\n\nNamaste! You have ${items.length} application deadline(s) closing soon:\n\n${itemNames}\n\nApply directly at https://sarkari-saathi.web.app`
  };
}

/**
 * Load user alert preferences from LocalStorage or Firestore
 */
export async function getUserAlertPreferences(uid) {
  const localSaved = localStorage.getItem('sarkari_saathi_alert_prefs');
  let defaults = {
    email: '',
    whatsappNumber: '',
    emailAlertsEnabled: true,
    whatsappAlertsEnabled: true,
    countryCode: '+91',
    enabledSchemes: [],
    enabledExams: []
  };

  if (localSaved) {
    try { defaults = { ...defaults, ...JSON.parse(localSaved) }; } catch (e) {}
  }

  if (uid) {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().alerts) {
        defaults = { ...defaults, ...docSnap.data().alerts };
      }
    } catch (e) {
      console.warn("Firestore alert fetch fallback:", e.message);
    }
  }

  return defaults;
}

/**
 * Save user alert preferences
 */
export async function saveUserAlertPreferences(uid, prefs) {
  try {
    localStorage.setItem('sarkari_saathi_alert_prefs', JSON.stringify(prefs));
  } catch (e) {}

  if (uid) {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, { alerts: prefs, updatedAt: new Date() }, { merge: true });
    } catch (e) {
      console.warn("Firestore alert save resilient fallback:", e.message);
    }
  }

  return prefs;
}
