# README - Programme JS Quizz

## Description

Ce programme JavaScript génère un quiz interactif à partir d'un jeu de
données prédéfini.\
Il construit dynamiquement l'interface HTML, gère les interactions
utilisateur (sélection de réponses, validation, affichage des résultats)
et suit l'état du quiz en temps réel.

## Fonctionnalités principales

-   Génération automatique des questions/réponses à partir du tableau
    `quizzData`.
-   Affichage successif des questions avec gestion de l'état
    (active/inactive).
-   Validation des réponses avec affichage d'un message de succès ou
    d'erreur.
-   Système de score, comptage d'erreurs et résumé final.
-   Possibilité de recommencer le quiz.

## Structure des données

Chaque question possède : 
- `question` : l'intitulé. 
- `answers` : tableau d'objets avec `text` et `isCorrect`. 
- `correctAnswer` : valeur lisible de la bonne réponse. 
- `explanation` : explication pédagogique.

## Structure générale du code

-   Une fonction `createDomQuestionWithDatas()` génère les cartes HTML
    des questions.
-   `resetQuizz()` initialise l'état du quiz.
-   `updateQuizzHeader()` met à jour l'en-tête (numéro de question,
    score).
-   `initializeQuestionQuizz()` prépare chaque question et attache les
    écouteurs d'événements.
-   Gestion des états « succès », « erreur », et « contenu » via
    `showQuestionSuccessErrorCard()`.
-   Actions utilisateur :
    -   Sélection d'une réponse.
    -   Validation via le bouton *Soumettre*.
    -   Boutons *Continuer* ou *Réessayer*.
    -   Reset du quiz depuis l'écran final.

## Comment utiliser ce script ?

1.  Insérer le script dans un fichier `.js` lié à votre page web.
2.  Définir dans votre HTML :
    -   un conteneur `.Quizz`
    -   un header avec :
        -   `.Quizz-headers-question-number`
        -   `.Quizz-headers-question-total`
        -   `.Quizz-headers-score-amount`
        -   `.Quizz-headers-submit-btn`
    -   une carte de fin `.Quizz-finished`
3.  Ajouter les images `success.png` et `echec.png`.

## Exemple d'intégration HTML minimal

``` html
<div class="Quizz"></div>

<header class="Quizz-headers">
  <span class="Quizz-headers-question-number"></span>/<span class="Quizz-headers-question-total"></span>
  <span class="Quizz-headers-score">Score : <span class="Quizz-headers-score-amount"></span></span>
  <button class="Quizz-headers-submit-btn">Soumettre</button>
</header>

<div class="Quizz-finished">
  <p>Total questions : <span class="Quizz-finished-resume-nbQuestions"></span></p>
  <p>Erreurs : <span class="Quizz-finished-resume-mistakes"></span></p>
</div>
```

## A propos

Ce code est conçu pour des exercices pédagogiques en JavaScript, DOM et
gestion d'état. Il peut être facilement étendu pour : 
- un fonctionnement asynchrone (questions stockées en base), 
- une validation serveur, 
- un chronomètre, - un mode examen.
