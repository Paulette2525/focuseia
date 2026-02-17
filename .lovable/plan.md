

# Optimisation du Formulaire de Prise de RDV

## Le probleme

Le formulaire actuel comporte **7 etapes et 25 champs obligatoires**. C'est un interrogatoire, pas un formulaire de contact. Les visiteurs abandonnent avant de finir.

## La solution : formulaire en 3 etapes

Passer de 7 etapes a **3 etapes courtes** avec seulement **8 a 10 champs**, dont certains sont des choix rapides (boutons radio, menus deroulants) plutot que des champs texte libre.

### Etape 1 - Vos coordonnees (3 champs - identique)
- Nom et prenom (texte)
- Email (texte)
- Telephone (texte)

### Etape 2 - Votre entreprise (4 champs - simplifie)
- Nom de l'entreprise (texte)
- Secteur d'activite (menu deroulant avec options pre-definies : E-commerce, Sante, Finance, Immobilier, Services, Industrie, Autre)
- Taille de l'equipe (menu deroulant : 1-5, 6-20, 21-50, 51-200, 200+)
- Votre role (menu deroulant : CEO/Fondateur, Directeur, Manager, Autre)

### Etape 3 - Votre besoin (2-3 champs - l'essentiel)
- Quel est votre principal defi aujourd'hui ? (menu deroulant : Automatiser des taches repetitives, Ameliorer le service client, Optimiser les processus internes, Analyser mes donnees, Autre)
- Avez-vous deja utilise des outils d'IA ? (radio : Oui / Non / Un peu)
- Un mot sur votre projet (textarea optionnel, court)

## Ce qu'on gagne

| Avant | Apres |
|-------|-------|
| 7 etapes | 3 etapes |
| 25 champs obligatoires | 8-10 champs (dont 1 optionnel) |
| Beaucoup de texte libre | Menus deroulants rapides |
| 5-10 min pour remplir | 1-2 min pour remplir |

## Les questions supprimees ne sont pas perdues

Les questions detaillees (vision, frustrations, priorites, engagement) seront posees **pendant la consultation gratuite** - quand le prospect est deja engage. C'est bien plus efficace.

## Details techniques

### Fichier modifie
- `src/components/BookingFormDialog.tsx` : refonte complete du formulaire

### Changements principaux
1. Reduire les `steps` de 7 a 3
2. Reduire le `formData` a 8-10 champs
3. Remplacer les `Textarea` par des `Select` (menus deroulants) pour les reponses structurees
4. Mettre le champ "description du projet" en optionnel
5. Adapter la validation (`validateStep`) aux nouvelles etapes
6. Adapter le `handleSubmit` pour envoyer les bons champs vers la base de donnees
7. Mettre a jour le scoring dans `src/lib/prospectScoring.ts` car certains champs de qualification disparaissent

### Base de donnees
- Aucune migration necessaire : les colonnes existantes acceptent des valeurs `null`, donc les anciens champs non remplis seront simplement vides pour les nouveaux prospects

