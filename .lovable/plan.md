
# Calendrier de Reservation Sur-Mesure

## Objectif

Construire un systeme de prise de rendez-vous integre directement dans l'application, sans dependre d'un outil externe. Apres avoir soumis le formulaire en 3 etapes, le prospect accede a une 4eme etape ou il choisit un creneau disponible.

## Comment ca marche

1. **L'admin definit ses disponibilites** dans une page dediee (jours de la semaine + horaires)
2. **Le prospect remplit le formulaire** (3 etapes actuelles)
3. **Etape 4 - Choix du creneau** : un calendrier affiche les jours disponibles, puis les horaires libres pour le jour selectionne
4. **Confirmation** : le rendez-vous est enregistre et le prospect voit un recapitulatif

## Architecture de la base de donnees

Deux nouvelles tables :

**`availability_slots`** - Les disponibilites recurrentes de l'admin
| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid | Identifiant |
| day_of_week | integer | 0=Dimanche, 1=Lundi... 6=Samedi |
| start_time | time | Heure de debut (ex: 09:00) |
| end_time | time | Heure de fin (ex: 17:00) |
| is_active | boolean | Actif ou non |
| slot_duration | integer | Duree d'un creneau en minutes (defaut: 30) |

**`bookings`** - Les rendez-vous reserves
| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid | Identifiant |
| prospect_id | uuid | Lien vers le prospect |
| booking_date | date | Date du rendez-vous |
| start_time | time | Heure de debut |
| end_time | time | Heure de fin |
| status | text | "confirmed", "cancelled" |
| created_at | timestamptz | Date de creation |

## Parcours utilisateur (prospect)

```text
Etape 1          Etape 2          Etape 3          Etape 4
Coordonnees  --> Entreprise  -->  Besoin  -->  Choix du creneau
                                                    |
                                              [Calendrier]
                                              Choisir un jour
                                                    |
                                              [Creneaux horaires]
                                              Choisir une heure
                                                    |
                                              [Confirmation]
                                              Recapitulatif RDV
```

## Parcours admin

Sur la page `/admin-prospects`, un nouvel onglet ou section permettra de :
- Definir les jours et horaires de disponibilite (ex: Lundi-Vendredi, 9h-17h)
- Voir la liste des rendez-vous a venir
- Annuler un rendez-vous si necessaire

## Fichiers a creer ou modifier

### Nouveaux fichiers
- **`src/components/BookingCalendar.tsx`** : Composant calendrier avec selection de jour + creneaux horaires. Utilise le composant `Calendar` existant de shadcn/ui
- **`src/components/AdminAvailability.tsx`** : Interface admin pour gerer les disponibilites (jours, horaires, duree des creneaux)
- **`src/components/AdminBookings.tsx`** : Liste des rendez-vous a venir dans l'admin
- **`src/hooks/useAvailability.ts`** : Hook pour charger les disponibilites et calculer les creneaux libres
- **`src/hooks/useBookings.ts`** : Hook pour charger et gerer les rendez-vous

### Fichiers modifies
- **`src/components/BookingFormDialog.tsx`** : Ajouter l'etape 4 (calendrier) apres la soumission du formulaire. Le formulaire enregistre d'abord le prospect, puis affiche le calendrier pour choisir un creneau
- **`src/pages/Admin.tsx`** : Ajouter des onglets pour "Disponibilites" et "Rendez-vous" en plus de la liste des prospects
- **`src/lib/calendarConfig.ts`** : Remplacer la config Cal.com par la configuration du calendrier natif (duree par defaut, delai min de reservation, etc.)

### Migration base de donnees
- Creer les tables `availability_slots` et `bookings`
- Ajouter les politiques RLS : insertion publique pour `bookings`, lecture/ecriture authentifiee pour `availability_slots`
- Inserer des disponibilites par defaut (Lundi-Vendredi, 9h-17h, creneaux de 30 min)

## Details techniques

### Calcul des creneaux disponibles
Pour un jour donne :
1. Recuperer les disponibilites recurrentes pour ce jour de la semaine
2. Generer tous les creneaux possibles (ex: 9h00, 9h30, 10h00...)
3. Retirer les creneaux deja reserves (via la table `bookings`)
4. Ne pas afficher les creneaux passes (pour le jour meme)
5. Ne pas afficher les jours avant aujourd'hui dans le calendrier

### Securite (RLS)
- `availability_slots` : lecture publique (les prospects doivent voir les dispos), ecriture reservee aux utilisateurs authentifies (admin)
- `bookings` : insertion publique (le prospect reserve), lecture pour les utilisateurs authentifies (admin voit les RDV), mise a jour par les authentifies (annulation)

### UX du calendrier prospect
- Le composant `Calendar` de shadcn/ui est deja installe et sera reutilise
- Les jours sans disponibilite sont grises/desactives
- Les creneaux s'affichent sous forme de boutons cliquables sous le calendrier
- Un creneau selectionne est mis en surbrillance
- Un bouton "Confirmer" finalise la reservation
