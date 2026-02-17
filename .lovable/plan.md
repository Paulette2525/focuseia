

# Optimisation de la page Admin

## Probleme

La page admin affiche encore la structure de l'ancien formulaire a 7 etapes (25 champs). Le formulaire actuel n'a que 3 etapes + calendrier avec 10 champs. Resultat :
- La modal "Voir plus" contient 7 sections dont 5 sont pratiquement vides (Vision, Organisation, IA, Decision, Seance Gratuite)
- Le lien entre un prospect et son rendez-vous n'est pas visible
- Le scoring de qualification reste correct mais le resume du prospect utilise des champs souvent vides (`sector`, `team_size`, `project_priority`)

## Modifications proposees

### 1. Simplifier la modal de details du prospect

Remplacer les 7 sections par 3 sections correspondant aux etapes actuelles du formulaire :

- **Coordonnees** : Nom, Email, Telephone, Date de soumission
- **Entreprise** : Nom entreprise, Secteur, Taille equipe, Role
- **Besoin** : Defi principal, Experience IA, Description du projet

Supprimer les sections vides : Vision & Ambition, Organisation, IA & Automatisation, Decision & Engagement, Seance Gratuite.

### 2. Afficher le rendez-vous lie au prospect

Dans la modal de details et dans la liste des prospects :
- Charger les bookings associes a chaque prospect
- Afficher une icone/badge "RDV confirme" ou "Pas de RDV" sur chaque carte prospect
- Dans la modal, ajouter une section "Rendez-vous" montrant la date et l'heure du RDV s'il existe

### 3. Ameliorer la liste des prospects

- Modifier le resume (`getSummary`) pour utiliser les champs remplis : entreprise, defi principal, experience IA
- Ajouter un indicateur visuel (badge ou icone) montrant si le prospect a reserve un creneau ou non
- Permettre de filtrer par "Avec RDV" / "Sans RDV"

### 4. Ameliorer l'onglet Rendez-vous

- Afficher plus de details sur chaque rendez-vous : defi principal du prospect, entreprise
- Ajouter un lien rapide pour voir les details complets du prospect depuis un rendez-vous

### 5. Dashboard rapide (en-tete)

Ajouter des compteurs visuels en haut de la page :
- Nombre de prospects total / cette semaine
- Nombre de RDV a venir
- Nombre de prospects sans RDV (a relancer)

## Details techniques

### Fichiers modifies

**`src/pages/Admin.tsx`** :
- Simplifier la modal de details (3 sections au lieu de 7)
- Charger les bookings en parallele des prospects
- Ajouter les compteurs en haut de page
- Ajouter le filtre "Avec/Sans RDV"
- Modifier `getSummary()` pour utiliser `company_name`, `main_challenges`, `ai_tools_usage`
- Afficher le statut de RDV sur chaque carte prospect
- Ajouter la section "Rendez-vous" dans la modal de details

**`src/components/AdminBookings.tsx`** :
- Ajouter les infos du prospect (defi, entreprise) dans chaque carte de RDV
- Ajouter un bouton "Voir le prospect" pour naviguer vers les details

**`src/components/ProspectFilters.tsx`** :
- Ajouter un filtre "Avec RDV" / "Sans RDV"

### Aucune migration base de donnees necessaire

Toutes les donnees sont deja disponibles dans les tables existantes. La jointure `bookings.prospect_id -> prospects.id` permet de recuperer les RDV lies a chaque prospect.

