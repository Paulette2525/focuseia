

# Suppression des filtres "Avec RDV" / "Sans RDV"

## Contexte

Tous les prospects doivent obligatoirement reserver un rendez-vous via le formulaire. Les filtres "Avec RDV" et "Sans RDV" n'ont donc pas de raison d'etre.

## Modifications

### 1. `src/components/ProspectFilters.tsx`
- Retirer `'with_booking'` et `'without_booking'` du type `FilterType`
- Retirer ces deux entrees du tableau `filters`
- Retirer `with_booking` et `without_booking` de l'interface `counts`

### 2. `src/pages/Admin.tsx`
- Retirer le calcul de `counts.with_booking` et `counts.without_booking`
- Retirer les branches de filtrage `activeFilter === 'with_booking'` et `activeFilter === 'without_booking'`
- Retirer le compteur "Sans RDV" du dashboard en en-tete (s'il existe)

Deux fichiers modifies, aucune migration base de donnees.
