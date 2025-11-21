<!-- NB: ctrl + SHIFT + V => aperçu markdown -->
# Quizz JS : Méthode de travail et conseils

## Approche générale:
> Exploitez les fonctions et le paradygme fonctionnel de Javascript :
> Décomposez les actions attendues du programme
> Créez des fonctions isolées qui renvoient le résultat attendu
> Mettez en lien les fonctions pour qu'elles s'appellent l'une l'autre => créez un code modulable
> Pensez à rendre disponible vos variables à l'intérieur d'une fonction ou bloc (scope de variable, choix judicieux de let ou const) **déclaration** dans le scénario principal, **inititalisation** dans les blocs de fonction concernés 

## Logique générale:
> Un array **quizzData** permet de stocker l'ensemble des données du quizz sous forme d'1 *objet* par question
> un objet **quizzManager** contient l'état du jeu en cours de déruolement pour connaitre la question en cours, la réponse sélectionnée, la bonne réponse le nb total de questions (pour calculer la fin du quizz)
>Il faudra successivement créer des fonctions s'appelant les unes les autres, utilisez des noms explicites ex:
> * **initQuizz**
> * **createDomQuestionWithDatas** (afin de générer le contenu HTML des questions à partir de quizzDatas)
> * **resetQuizz** (met a zéro le quizz a la fin de ce dernier)
> * **initQuestion** (chargée de préparer la question en cours affichage, identification de la bonne réponse,...)
> * **updateQuizzHeader** (chargée de mettre a jour les données du quizz dans le HTML en fonction de quizzManager)
> * Fonctions utilitaires pour les interactions du quizz
>   * **selectUniqueAnswer** (masque toutes les questions d'une liste avant d'afficher celle sur laquelle on a cliqué passée en paramètre)
>   * **showQuestionSuccessErrorCard** (chargée d'afficher l'une des 3 facettes de la question en cours : question, error, succes, utilise un mot clé présent dans la classe de ces cards)
>   * **handleSuccessBtnClic**k (cette fonction définissant le comportement du bouton est nécessaire pour pouvoir ajouter / supprimer l'écouteur d'évenement)
>   * **handleSuccessBtnClick** (idem que ci dessus)

## Mise en place:
### Remplir le DOM a partir des datas
1. Préparez les éléments de DOM a modifier (insertions a venir)
2. Créer une fonction qui génère et **renvoie** un éléments du DOM a partir d'un objet quizzCard
3. Parcourrir les datas (quizzData) et insère un élément HTML dans le Dom a partir de chaque question du Quizz --> utiliser la fonction précédente


### Initialiser le quizzManager (reset)
* Le quizzManager est un objet qui stocke l'état du jeu / quizz ... réfléchissez aux données importantes a connaitre au fil du jeu (nb de questions totales, question en cours, reponse selectionnée, reponse correcte, ...)
* Définir les valeurs de départ du quizzManager
* envisager une fonction reset qui réinitialisera avec les valeurs par default le quizzManager (bonus)


### Inititaliser la question dans le DOM en cours
* Créer une fonction pour reproduire l'action avec les questions a venir
* Ajout de classe 'active' à la question (suppresson de la classe aux autres)
* commentaire succes / erreur personnalisé (bonus)
* update quizzManager (question index)


#### Initialiser les réponses
* Créer une fonction Qui initialise les réponses pour chaque question (parametres: index de question, tableau des questions) 
* parcourrir les elements du DOM en quete des réponses appartenant a la question .active
* Attacher un event listener sur le clic de la réponse
    * Prévoir l'appel a une fonction a 2 parametres (tableau des réponses DOM, réponse en cours DOM)
        * Supprime la classe active de chaque réponse
        * Ajoute la classe active seulement à la réponse sélectionnée  
* Update du quizzManager (selectedQuestion = question number)

### Initialiser le quizzManager (newQuestion)
* 


