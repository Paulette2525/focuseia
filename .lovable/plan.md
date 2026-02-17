

# Correction des politiques RLS et verification de la page Admin

## Probleme identifie

Les tables `availability_slots` et `bookings` ont toutes leurs politiques RLS configurees en mode **RESTRICTIVE** au lieu de **PERMISSIVE**. En PostgreSQL, s'il n'y a aucune politique permissive, l'acces est refuse par defaut -- meme si les conditions des politiques restrictives sont remplies. Resultat : l'admin connecte ne peut ni lire ni modifier les disponibilites, et le prospect ne peut ni voir les creneaux ni creer de reservation.

## Solution

Supprimer toutes les politiques RLS existantes sur les deux tables et les recreer en mode **PERMISSIVE** (le mode par defaut de PostgreSQL).

## Details techniques

### Migration base de donnees

Une seule migration SQL qui :

1. Supprime les 7 politiques RLS existantes (4 sur `availability_slots`, 3 sur `bookings`)
2. Recree les memes politiques en mode PERMISSIVE :

**Table `availability_slots`** :
- SELECT : lecture publique (tout le monde peut voir les dispos)
- INSERT : reserve aux utilisateurs authentifies
- UPDATE : reserve aux utilisateurs authentifies
- DELETE : reserve aux utilisateurs authentifies

**Table `bookings`** :
- SELECT : reserve aux utilisateurs authentifies (admin)
- INSERT : public (les prospects peuvent reserver)
- UPDATE : reserve aux utilisateurs authentifies (annulation)

### Aucune modification de code

Les composants `AdminAvailability.tsx`, `AdminBookings.tsx`, et `BookingCalendar.tsx` sont deja correctement implementes. Le probleme est uniquement au niveau des politiques de la base de donnees.

### Verification apres correction

Une fois la migration appliquee :
- L'onglet "Disponibilites" dans l'admin affichera les 5 creneaux par defaut (Lundi-Vendredi, 9h-17h)
- L'admin pourra activer/desactiver, ajouter ou supprimer des disponibilites
- L'onglet "Rendez-vous" affichera les reservations existantes
- Les prospects pourront voir les creneaux disponibles dans le calendrier (etape 4 du formulaire)

