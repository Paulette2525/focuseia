

# Refonte globale de la page d'accueil FocuseIA

## Vision

Repositionner FocuseIA comme **la meilleure agence d'automatisation et d'implémentation IA en France**, avec une landing page qui convertit immédiatement les visiteurs en prospects qualifiés.

---

## Structure de la page (ordre des sections)

```text
1. Header (existant, inchangé)
2. Hero — refonte complète
3. Logos/Clients — nouvelle section "Ils nous font confiance"
4. Services — refonte avec 6 services détaillés
5. Résultats — nouvelle section chiffres clés
6. Process — existant, textes mis à jour
7. Études de cas — refonte de Projects
8. Témoignages — existant, enrichi
9. FAQ — nouvelle section
10. CTA Final — refonte de Contact
11. Footer — mis à jour
```

---

## Détails par section

### 1. Hero — Refonte complète

- **Titre** : "La meilleure agence d'automatisation IA en France" avec "automatisation IA" en gradient
- **Sous-titre** : "Nous créons des SaaS sur mesure, des systèmes d'automatisation et des plateformes centralisées qui remplacent vos 10 outils et font le travail de 10 personnes."
- **CTA principal** : "Réserver un appel stratégique" (ouvre le formulaire)
- **CTA secondaire** : "Découvrir nos services" (scroll vers services)
- **Preuve sociale rapide** : Bandeau avec "50+ entreprises accompagnées · 200+ automatisations déployées · 95% de satisfaction"
- Les animations neural/synapse existantes sont conservées

### 2. Logos clients (nouvelle section)

Bandeau défilant "Ils nous font confiance" avec logos de technologies/partenaires (OpenAI, Make, Zapier, n8n, Supabase, etc.) — déplacé depuis Process et enrichi

### 3. Services — 6 cartes détaillées

Remplacer les 3 services actuels par 6 :
1. **SaaS sur mesure** — Création de plateformes personnalisées pour remplacer vos abonnements multiples
2. **Automatisation avancée** — Systèmes qui font le travail de 10 personnes, sans recruter
3. **Centralisation de données** — Une plateforme unique au lieu de mille outils
4. **Création & optimisation web** — Sites performants et optimisés pour la conversion
5. **Audit & Conseil IA** — Analyse de vos processus et plan d'action personnalisé
6. **Remplacement de postes** — Outils IA qui remplacent des tâches humaines répétitives

Chaque carte : icone, titre, description détaillée, liste de 3 bénéfices clés

### 4. Résultats en chiffres (nouvelle section)

Compteurs animés : "50+ clients", "300h économisées/mois en moyenne", "10x ROI moyen", "200+ automatisations"

### 5. Process — Textes mis à jour

Garder la structure visuelle, mettre à jour les descriptions pour refléter le positionnement premium

### 6. Études de cas — Enrichies

Ajouter 1-2 projets supplémentaires avec des résultats concrets (SaaS créé, automatisation déployée)

### 7. FAQ (nouvelle section)

5-6 questions fréquentes en accordéon : "Combien ça coûte ?", "Combien de temps pour un projet ?", "C'est quoi un SaaS sur mesure ?", etc.

### 8. CTA Final — Plus impactant

Titre : "Arrêtez de perdre du temps et de l'argent" + sous-titre convaincant + bouton "Réserver votre appel stratégique gratuit"

---

## Formulaire de réservation — Nouvelles questions

### Ajouts à l'étape 2 (Votre Entreprise)

- **Site internet** (Input, optionnel) : "Avez-vous un site internet ? (URL)" — placeholder "https://www.monsite.com"
- **Chiffre d'affaires annuel** (Select) : "Moins de 100K€", "100K€ – 500K€", "500K€ – 1M€", "1M€ – 5M€", "Plus de 5M€"

### Ajouts à l'étape 3 (Votre Besoin)

- **Outils actuels** (Textarea, optionnel) : "Quels outils/logiciels utilisez-vous actuellement ?" — placeholder "Ex: Excel, Salesforce, Notion, Zapier..."
- **Nombre d'heures perdues** (Select) : "Combien d'heures/semaine perdez-vous sur des tâches répétitives ?" — "Moins de 5h", "5-15h", "15-30h", "Plus de 30h"
- **Comment nous avez-vous connu ?** (Select) : "Réseaux sociaux", "Bouche à oreille", "Recherche Google", "Autre"

### Migration DB

Ajout de 4 colonnes à la table `prospects` :
- `website_url` (text, nullable)
- `annual_revenue` (text, nullable)
- `current_tools` (text, nullable)  
- `hours_wasted_weekly` (text, nullable)
- `referral_source` (text, nullable)

---

## Fichiers modifiés

| Fichier | Action |
|---------|--------|
| `src/components/Hero.tsx` | Refonte titre, sous-titre, CTAs, preuve sociale |
| `src/components/Services.tsx` | 6 services détaillés au lieu de 3 |
| `src/components/Projects.tsx` | Ajout d'études de cas |
| `src/components/Process.tsx` | Textes mis à jour, logos déplacés |
| `src/components/Testimonials.tsx` | Inchangé ou légèrement enrichi |
| `src/components/Contact.tsx` | CTA plus impactant |
| `src/components/Footer.tsx` | Copyright 2026 |
| `src/components/BookingFormDialog.tsx` | 5 nouveaux champs |
| `src/pages/Index.tsx` | Ajout sections LogoBanner, Stats, FAQ |
| `src/components/LogoBanner.tsx` | Nouveau — bandeau logos |
| `src/components/Stats.tsx` | Nouveau — compteurs animés |
| `src/components/FAQ.tsx` | Nouveau — accordéon |
| `src/lib/prospectScoring.ts` | Mise à jour scoring |
| `src/pages/Admin.tsx` | Afficher nouvelles colonnes |
| Migration SQL | 5 nouvelles colonnes prospects |

