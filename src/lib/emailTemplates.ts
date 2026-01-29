import { CAL_BOOKING_URL } from "./calendarConfig";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  getContent: (vars: TemplateVariables) => string;
}

export interface TemplateVariables {
  prospect_name: string;
  company_name?: string;
  sector?: string;
  booking_url?: string;
}

const getFirstName = (fullName: string): string => {
  return fullName.split(" ")[0];
};

export const emailTemplates: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Bienvenue",
    subject: "Bienvenue chez FocuseIA - Prochaines étapes",
    getContent: (vars) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { padding: 30px; background: #f9fafb; }
    .cta-button { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 FocuseIA</h1>
  </div>
  <div class="content">
    <p>Bonjour ${getFirstName(vars.prospect_name)},</p>
    
    <p>Merci pour votre intérêt envers FocuseIA ! Nous avons bien reçu votre demande et nous sommes ravis de vous accompagner dans votre transformation digitale.</p>
    
    ${vars.company_name ? `<p>Nous avons hâte d'en apprendre plus sur <strong>${vars.company_name}</strong> et vos projets d'automatisation.</p>` : ""}
    
    <p>Pour démarrer, je vous invite à réserver une consultation gratuite de 30 minutes avec notre équipe :</p>
    
    <p style="text-align: center;">
      <a href="${vars.booking_url || CAL_BOOKING_URL}" class="cta-button">Réserver ma consultation gratuite</a>
    </p>
    
    <p>Durant cet appel, nous :</p>
    <ul>
      <li>Analyserons vos processus actuels</li>
      <li>Identifierons les opportunités d'automatisation</li>
      <li>Vous proposerons une feuille de route personnalisée</li>
    </ul>
    
    <p>À très bientôt,</p>
    <p><strong>L'équipe FocuseIA</strong></p>
  </div>
  <div class="footer">
    <p>© 2024 FocuseIA - Tous droits réservés</p>
  </div>
</body>
</html>
    `.trim(),
  },
  {
    id: "followup",
    name: "Relance douce",
    subject: "Votre projet IA nous intéresse - Avez-vous des questions ?",
    getContent: (vars) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { padding: 30px; background: #f9fafb; }
    .cta-button { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 FocuseIA</h1>
  </div>
  <div class="content">
    <p>Bonjour ${getFirstName(vars.prospect_name)},</p>
    
    <p>Je me permets de vous recontacter suite à votre demande d'information sur nos services d'automatisation IA.</p>
    
    ${vars.sector ? `<p>Nous avons accompagné de nombreuses entreprises dans le secteur <strong>${vars.sector}</strong> et nous serions ravis de partager notre expertise avec vous.</p>` : ""}
    
    <p>Avez-vous des questions ou des préoccupations que nous pourrions clarifier ?</p>
    
    <p>Si vous préférez en discuter directement, je vous invite à réserver un créneau :</p>
    
    <p style="text-align: center;">
      <a href="${vars.booking_url || CAL_BOOKING_URL}" class="cta-button">Planifier un échange</a>
    </p>
    
    <p>Je reste disponible pour tout complément d'information.</p>
    
    <p>Cordialement,</p>
    <p><strong>L'équipe FocuseIA</strong></p>
  </div>
  <div class="footer">
    <p>© 2024 FocuseIA - Tous droits réservés</p>
  </div>
</body>
</html>
    `.trim(),
  },
  {
    id: "booking",
    name: "Invitation rendez-vous",
    subject: "Réservez votre consultation gratuite - FocuseIA",
    getContent: (vars) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { padding: 30px; background: #f9fafb; }
    .highlight-box { background: white; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; }
    .cta-button { display: inline-block; background: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0; }
    .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🗓️ Votre consultation gratuite</h1>
  </div>
  <div class="content">
    <p>Bonjour ${getFirstName(vars.prospect_name)},</p>
    
    <p>Vous avez exprimé un intérêt pour optimiser vos processus avec l'intelligence artificielle. Excellent choix !</p>
    
    <div class="highlight-box">
      <strong>Ce que vous obtiendrez lors de cet appel de 30 minutes :</strong>
      <ul>
        <li>✅ Analyse personnalisée de vos besoins</li>
        <li>✅ Identification des quick-wins possibles</li>
        <li>✅ Recommandations concrètes et actionnables</li>
        <li>✅ Estimation du ROI potentiel</li>
      </ul>
    </div>
    
    <p style="text-align: center;">
      <a href="${vars.booking_url || CAL_BOOKING_URL}" class="cta-button">🚀 Réserver mon créneau maintenant</a>
    </p>
    
    <p>Les créneaux se remplissent rapidement. N'attendez pas pour bloquer votre place !</p>
    
    <p>À très vite,</p>
    <p><strong>L'équipe FocuseIA</strong></p>
  </div>
  <div class="footer">
    <p>© 2024 FocuseIA - Tous droits réservés</p>
  </div>
</body>
</html>
    `.trim(),
  },
  {
    id: "custom",
    name: "Email personnalisé",
    subject: "",
    getContent: (vars) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .content { padding: 30px; }
    .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="content">
    <p>Bonjour ${getFirstName(vars.prospect_name)},</p>
    
    <p>[Votre message personnalisé ici]</p>
    
    <p>Cordialement,</p>
    <p><strong>L'équipe FocuseIA</strong></p>
  </div>
  <div class="footer">
    <p>© 2024 FocuseIA - Tous droits réservés</p>
  </div>
</body>
</html>
    `.trim(),
  },
];

export const getTemplateById = (id: string): EmailTemplate | undefined => {
  return emailTemplates.find((t) => t.id === id);
};
