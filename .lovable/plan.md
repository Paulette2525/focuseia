
# Plan: Systeme de filtrage des prospects non qualifies

## Analyse des criteres de qualification

En analysant votre formulaire de prospects, j'ai identifie plusieurs criteres cles qui peuvent determiner si un prospect est qualifie ou non:

| Critere | Valeurs qualifiantes | Valeurs non qualifiantes |
|---------|---------------------|--------------------------|
| Decisionnaire | "Oui, entierement" | "Non, je dois consulter" |
| Priorite projet | "Elevee" ou "Critique" | "Faible" |
| Pret au changement | "Oui, absolument" | "Non, optimisations mineures" |

## Options proposees

### Option 1: Filtrage simple par statut
Ajouter un systeme de filtre avec des boutons ou un menu deroulant permettant de basculer entre:
- **Tous les prospects** - Vue complete
- **Qualifies** - Prospects repondant aux criteres positifs
- **Non qualifies** - Prospects ne repondant pas aux criteres
- **A evaluer** - Prospects avec des reponses intermediaires

### Option 2: Filtrage multi-criteres avance
Interface avec plusieurs filtres combinables:
- Filtre par decisionnaire (Oui / Partiel / Non)
- Filtre par priorite projet (Faible / Moyenne / Elevee / Critique)
- Filtre par niveau d'engagement (Pret / Peut-etre / Non)
- Filtre par date de soumission

### Option 3: Systeme de scoring automatique
Calculer un "score de qualification" base sur les reponses:
- +3 points si decisionnaire = "yes"
- +2 points si priorite = "high" ou "critical"
- +2 points si pret au changement = "yes"
- +1 point si investissements precedents = "yes"

Affichage d'un badge de score (0-8) sur chaque carte prospect avec code couleur:
- Vert (6-8): Tres qualifie
- Orange (3-5): A evaluer
- Rouge (0-2): Non qualifie

### Option 4: Systeme de statut manuel avec colonnes
Permettre de marquer manuellement les prospects comme:
- "Nouveau" (par defaut)
- "Qualifie"
- "Non qualifie"
- "Contact effectue"
- "Converti"

Cela necessite d'ajouter une colonne `status` dans la base de donnees.

## Recommandation

Je recommande de combiner **l'Option 3 (scoring automatique)** avec **l'Option 1 (filtrage simple)**:
- Le scoring automatique donne une premiere evaluation objective
- Le filtrage simple permet de naviguer rapidement entre les categories
- Interface intuitive sans surcharge d'options

---

## Details techniques (pour reference)

### Modifications de l'interface (Admin.tsx)
1. Ajouter une barre de filtres au-dessus de la liste des prospects
2. Creer une fonction `calculateQualificationScore()` pour le scoring
3. Ajouter des badges visuels de qualification sur chaque carte
4. Implementer le filtrage cote client (pas de modification base de donnees)

### Composants a creer/modifier
- Nouveau composant `ProspectFilters` pour la barre de filtres
- Modification du composant de carte prospect pour afficher le score
- Fonction utilitaire pour calculer le score de qualification

### Logique de scoring proposee

```text
Score de qualification (0-10 points):
- is_decision_maker = "yes": +3 pts / "partial": +1 pt / "no": 0 pt
- project_priority = "critical": +3 pts / "high": +2 pts / "medium": +1 pt / "low": 0 pt
- ready_to_change = "yes": +2 pts / "maybe": +1 pt / "no": 0 pt
- current_ai_tools != "no": +1 pt
- previous_investments = "yes": +1 pt
```

Categorisation:
- 7-10: Tres qualifie (vert)
- 4-6: A evaluer (orange)
- 0-3: Non qualifie (rouge)
