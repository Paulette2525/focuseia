
# Plan d'Implementation: Emails + Calendrier Cal.com

## Resume

Ce plan couvre l'implementation de deux fonctionnalites majeures:
1. **Envoi d'emails via Resend** - Modal de composition d'email avec templates pre-definis
2. **Integration Cal.com** - Lien de reservation integre dans les emails et l'interface

---

## Phase 1: Configuration des Secrets

### Secrets a ajouter
| Secret | Valeur | Usage |
|--------|--------|-------|
| `RESEND_API_KEY` | (fourni par l'utilisateur) | Envoi d'emails |
| `CAL_API_KEY` | `cal_live_098444a7070f735f84d3696cbbcb21e1` | Integration Cal.com |

---

## Phase 2: Systeme d'Envoi d'Emails

### 2.1 Edge Function `send-email`

Creation d'une edge function pour envoyer des emails via l'API Resend.

**Fichier:** `supabase/functions/send-email/index.ts`

**Fonctionnalites:**
- Reception des parametres (destinataire, sujet, contenu HTML)
- Validation des donnees
- Envoi via Resend API
- Gestion des erreurs et CORS

```text
Request Body:
{
  "to": "prospect@email.com",
  "subject": "Votre consultation gratuite FocuseIA",
  "html": "<p>Contenu de l'email...</p>",
  "prospect_name": "Jean Dupont"
}
```

### 2.2 Table `email_logs` (Historique)

**Schema:**
```text
email_logs
- id: UUID (PK)
- prospect_id: UUID (FK -> prospects.id)
- subject: TEXT
- template_type: TEXT (welcome, followup, booking, custom)
- sent_at: TIMESTAMP
- status: TEXT (sent, failed)
- sent_by: UUID (FK -> auth.users.id)
```

**RLS:** Lecture/Ecriture pour utilisateurs authentifies uniquement.

### 2.3 Composant `EmailComposerModal`

**Fichier:** `src/components/EmailComposerModal.tsx`

**Fonctionnalites:**
- Modal avec formulaire de composition
- Templates pre-definis selectionnables:
  - **Bienvenue**: Premier contact apres soumission
  - **Relance**: Rappel amical avec proposition de RDV
  - **Invitation Cal.com**: Lien direct vers le calendrier
- Personnalisation automatique avec les donnees du prospect (nom, entreprise)
- Bouton d'envoi avec feedback (succes/erreur)

```text
Interface utilisateur:
+------------------------------------------+
|  Envoyer un email a [Nom Prospect]       |
+------------------------------------------+
|  Template: [Dropdown - Bienvenue/Relance]|
|                                          |
|  Sujet: [________________________]       |
|                                          |
|  Contenu:                                |
|  +------------------------------------+  |
|  | Bonjour {prenom},                  |  |
|  |                                    |  |
|  | Suite a votre demande...           |  |
|  +------------------------------------+  |
|                                          |
|  [ Annuler ]            [ Envoyer ]      |
+------------------------------------------+
```

### 2.4 Integration dans la page Admin

**Modifications de `src/pages/Admin.tsx`:**
- Ajout d'un bouton "Envoyer email" sur chaque carte prospect
- Ajout d'un bouton "Envoyer email" dans la modal de details
- Gestion de l'etat pour ouvrir/fermer le modal email

---

## Phase 3: Integration Cal.com

### 3.1 Configuration Cal.com

**Prerequis utilisateur:**
1. Creer un compte sur cal.com
2. Connecter Google Calendar dans les parametres Cal.com
3. Creer un type d'evenement "Consultation Gratuite FocuseIA" (30min)
4. Recuperer le lien de reservation (ex: `https://cal.com/votreequipe/consultation`)

### 3.2 Constante de configuration

**Fichier:** `src/lib/calendarConfig.ts`

```text
export const CAL_BOOKING_URL = "https://cal.com/VOTRE_USERNAME/consultation";
```

### 3.3 Integration dans les Templates d'Emails

Chaque template inclura automatiquement un lien vers Cal.com:

```text
Template "Invitation RDV":
---
Bonjour {prenom},

Reservez votre consultation gratuite de 30 minutes 
avec notre equipe FocuseIA:

[Bouton: Reserver mon creneau] -> lien Cal.com

A tres bientot!
```

### 3.4 Bouton d'action rapide (Optionnel)

Ajout d'un bouton "Inviter a reserver" sur chaque carte prospect qui:
1. Ouvre le modal email
2. Pre-selectionne le template "Invitation Cal.com"

---

## Fichiers a creer/modifier

### Nouveaux fichiers
| Fichier | Description |
|---------|-------------|
| `supabase/functions/send-email/index.ts` | Edge function Resend |
| `src/components/EmailComposerModal.tsx` | Modal de composition |
| `src/lib/emailTemplates.ts` | Templates d'emails |
| `src/lib/calendarConfig.ts` | Configuration Cal.com |

### Fichiers modifies
| Fichier | Modifications |
|---------|---------------|
| `src/pages/Admin.tsx` | Ajout boutons email, integration modal |
| `supabase/config.toml` | Configuration edge function |

### Migration base de donnees
- Creation table `email_logs` avec RLS

---

## Details techniques

### Edge Function send-email

```text
Endpoint: POST /functions/v1/send-email
Headers: Authorization: Bearer {user_token}

Validation:
- to: email valide
- subject: non vide
- html: non vide

Reponse succes: { success: true, id: "email_id" }
Reponse erreur: { success: false, error: "message" }
```

### Templates d'emails disponibles

| Template | Sujet | Contenu |
|----------|-------|---------|
| welcome | Bienvenue chez FocuseIA | Remerciement + presentation |
| followup | Votre projet IA nous interesse | Rappel + proposition RDV |
| booking | Reservez votre consultation | Lien Cal.com direct |
| custom | (personnalise) | (personnalise) |

### Variables de personnalisation

```text
{prospect_name} -> Nom complet
{company_name} -> Nom entreprise
{sector} -> Secteur d'activite
{booking_url} -> Lien Cal.com
```

---

## Ordre d'implementation

1. **Ajouter les secrets** RESEND_API_KEY et CAL_API_KEY
2. **Creer la table email_logs** avec migration
3. **Creer l'edge function send-email**
4. **Creer le fichier de configuration Cal.com**
5. **Creer les templates d'emails**
6. **Creer le composant EmailComposerModal**
7. **Integrer dans la page Admin**
8. **Tester l'envoi d'email**

---

## Remarque importante

Pour que Resend fonctionne, vous devez avoir un domaine verifie (ex: `@focuseia.com`). 
Si vous n'en avez pas encore, vous pouvez utiliser le domaine de test Resend pour commencer: `onboarding@resend.dev` (limite a votre propre adresse email).

