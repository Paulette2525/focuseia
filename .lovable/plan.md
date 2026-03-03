

## Plan : Optimisation du formulaire + Calendrier limité à 3 jours

### Ce qui change

**1. Trois nouvelles questions dans l'étape 3 (Votre Besoin)**

Ajout de trois champs Select pour mieux qualifier le prospect :
- **Objectif du rendez-vous** : Découvrir l'IA pour mon activité / Automatiser un processus / Obtenir un audit-conseil / Lancer un projet concret
- **Urgence du projet** : Urgent (sous 2 semaines) / Moyen terme (1-3 mois) / Pas pressé (je m'informe)
- **Budget estimé** : Moins de 1 000€ / 1 000€ - 5 000€ / 5 000€ - 15 000€ / Plus de 15 000€

**2. Calendrier limité à 3 jours glissants**

Au lieu d'afficher un calendrier complet sur 60 jours, seuls les **3 prochains jours disponibles** (selon les créneaux configurés par l'admin) seront sélectionnables. Tous les autres jours seront désactivés. Cela force les prospects à prendre RDV rapidement.

### Modifications techniques

**Migration SQL** : Ajouter 3 colonnes à la table `prospects` :
```sql
ALTER TABLE prospects ADD COLUMN meeting_objective TEXT;
ALTER TABLE prospects ADD COLUMN project_urgency TEXT;
ALTER TABLE prospects ADD COLUMN estimated_budget TEXT;
```

**`src/components/BookingFormDialog.tsx`** :
- Ajouter `meetingObjective`, `projectUrgency`, `estimatedBudget` au `formData`
- Ajouter 3 nouveaux Select dans le `case 3` du `renderStep`
- Mettre à jour `validateStep(3)` pour inclure ces champs obligatoires
- Mettre à jour l'insert Supabase pour enregistrer les 3 nouvelles valeurs

**`src/hooks/useAvailability.ts`** :
- Modifier `isDateDisabled` pour ne permettre que les 3 prochains jours qui ont des créneaux actifs (au lieu de tous les jours actifs du calendrier)
- Ajouter une fonction `getNextAvailableDates(count: number)` qui calcule les 3 prochains jours disponibles à partir d'aujourd'hui

**`src/components/BookingCalendar.tsx`** :
- Passer la contrainte des 3 jours au composant Calendar via la prop `disabled`

**`src/pages/Admin.tsx`** :
- Afficher les nouvelles colonnes (objectif, urgence, budget) dans la vue prospects

