// Datas potentiellement reçue d'une requete BDD
const quizzData = [
    {
      question: "Qui est considéré comme le père de l'informatique ?",
      answers: [
        { text: "Charles Babbage", isCorrect: true },
        { text: "Alan Turing", isCorrect: false },
        { text: "Bill Gates", isCorrect: false },
        { text: "Steve Jobs", isCorrect: false }
      ],
      correctAnswer: "Charles Babbage",
      explanation: "Charles Babbage est souvent appelé le 'père de l'informatique' pour ses travaux sur la conception de la machine analytique, un appareil mécanique qui aurait pu effectuer toutes les fonctions d'un ordinateur moderne."
    },
    {
      question: "Quelle machine a été conçue par Charles Babbage dans les années 1830 et est considérée comme l'un des premiers concepts d'ordinateur ?",
      answers: [
        { text: "La machine à vapeur", isCorrect: false },
        { text: "La machine analytique", isCorrect: true },
        { text: "Le looms Jacquard", isCorrect: false },
        { text: "Le calculateur de Pascal", isCorrect: false }
      ],
      correctAnswer: "La machine analytique",
      explanation: "La machine analytique de Charles Babbage, conçue dans les années 1830, est considérée comme l’un des premiers concepts d’ordinateur programmable. Elle contenait les éléments fondamentaux des ordinateurs modernes."
    },
    {
      question: "Quel est le nom de la première véritable 'programmation' réalisée sur un ordinateur mécanique par Ada Lovelace ?",
      answers: [
        { text: "Le code de Turing", isCorrect: false },
        { text: "La calculatrice", isCorrect: false },
        { text: "Le calcul du nombre de Bernoulli", isCorrect: true },
        { text: "Le programme de l'Enigma", isCorrect: false }
      ],
      correctAnswer: "Le programme de la machine analytique",
      explanation: "Ada Lovelace est souvent considérée comme la première programmeuse de l’histoire. Elle a écrit des instructions détaillées pour la machine analytique de Babbage afin de calculer les nombres de Bernoulli."
    }
  ];

// ###################################################
// #### Mise en place du Quizz ###################

// Elements du DOM où insérer les questions au format HTML
const quizzElement = document.querySelector('.Quizz');

/**
 * 
 * @param {Object} quizzCard Ensemble des datas correspondant a une question
 * @returns HTML Element containing hydrated with quizzData
 */
const createDomQuestionWithDatas = (quizzCard) => {
  const newElement = document.createElement('div');
  newElement.classList.add('Quizz-question');
  let answersHTML = "";
  quizzCard.answers.forEach(answer => {
    answersHTML += `
        <div class="Quizz-question-answers-answer">
            <h3 class="Quizz-question-answers-answer-text">${answer.text}</h3>
        </div>  
    `;
  })
  newElement.innerHTML = 
  `
  
                <div class="Quizz-question-content">
                    <h2 class="Quizz-question-label">${quizzCard.question}</h2>
                    <div class="Quizz-question-answers">
                    ${answersHTML}
                    </div>
                </div>
                <div class="Quizz-question-error">
                    <h3 class="Quizz-question-error-text">Vous avez fait une erreur, ça arrive aux meilleurs ! </h3>
                    <p>Voulez vous essayer de nouveau ?</p>
                    <!-- <p>Error message here</p> -->
                    <a href="" class="Quizz-question-error-btn BtnQuizz">Réessayer</a>
                </div>
                <div class="Quizz-question-success">
                <h3 class="Quizz-question-success-text">Bravo, c'est une excellente réponse !</h3>
                <p>Voulez vous continuer ?</p>
                    <!-- <p>Success message here</p> -->

                    <a href="" class="Quizz-question-success-btn BtnQuizz">Continuer</a>
                </div>
  `;
  return newElement;
}

// Insère dans le dom une question au format HTML par element trouvé dans quizzData
quizzData.forEach( quizzItem => {
    // console.log("current quizzItem", quizzItem);
    // console.log("current domQuestion", createDomQuestionWithDatas(quizzItem));


    quizzElement.append(createDomQuestionWithDatas(quizzItem));
})

// Récupérer les Elements du DOM a partir des questions générées
const questions = document.querySelectorAll('.Quizz-question');

// Initialise quizzManager
const quizzManager = {};
/**
 * 
 * @param {Object} quizz l'objet chargé de contenir l'état du jeu/quizz en temps réel
 * @returns Effet de bord : modifie l'objet passé en paramètre
 */
const resetQuizz = (quizz) => {
    quizz.questionNumber = 0;
    quizz.score = 0;
    quizz.mistakes = 0;
    quizz.selectedAnswer = undefined;
    quizz.correctAnswer = undefined;
    quizz.totalAnswers = quizzData.length;
    console.log("Initialization : successfull",quizz);
    // Masque la card quizz is finished
    const resumeCard = document.querySelector(".Quizz-finished");
    resumeCard.style.display = "none";
}
/**
 * @returns Effet de bord : met a jour les contenus du header de quizz (nb de questioons, question en cours, score)
 */
const updateQuizzHeader = () => {
    const questionNumber = document.querySelector(".Quizz-headers-question-number");
    const score = document.querySelector(".Quizz-headers-score-amount");
    const totalQuestions = document.querySelector(".Quizz-headers-question-total");

    questionNumber.textContent = quizzManager.questionNumber + 1;
    score.textContent = quizzManager.score;
    totalQuestions.textContent = quizzManager.totalAnswers;
}


resetQuizz (quizzManager);
updateQuizzHeader();
// console.log(quizzManager);


// Initialisation du premier slide
// Déclaration globale de answers (remplie a partir du DOM lors de l'initialisation de la question active)
let answers = [];

/**
 * 
 * @param {*} answer elment HTML correspondant a la question cliquée
 * @param {*} answers élément HTML contenant le tableau d'ensemble des questions
 * @returns Effet de bord : déselectionne les réponses, stocke la reponse sélectionnée dans quizzManager
 */
const selectUniqueAnswer = (answer,answers) => {
  answers.forEach(answ => {
    answ.classList.remove('active');
    answer.classList.add('active');
    
  })
}
// Cette fonction est nécessaire pour gérer l'affichage des differents aspects de la question (succes, error, content), a cause du reste de Jeu elle doit etrr déclarée avant la fonction initializeQuestionQuizz
/**
 * 
 * @param {String} keyword "content" , "succes" , "error" permet de définir la card a afficher
 * @param {Nodelist} nodeList Contient l'ensemble des 3 cards pour une question .active
 */
const showQuestionSuccessErrorCard = (keyword,nodeList) =>{
    nodeList.forEach( node => {
        node.style.display = "none";
    })

    const questionCardToShow = Array.from(nodeList).find(node => node.className.includes(keyword));
    questionCardToShow.style.display = "block";
    console.log("Question card : ",questionCardToShow);
    console.log("Keyword : ",keyword);
}


/**
 * 
 * @param {Number} questionNumber Le numero d'index de la question en cours (quizzData)
 * @param {Array} questions l'ensemble des questions (quizzData)
 * @returns Effet de bord : attache des ecouteurs d'évenements a chaque réponse
 */
const initializeQuestionQuizz = (questionNumber,questions) => {
    // Affichage de la question : classe active => CSS
    questions[questionNumber].classList.add('active');
    //   A cause du reset de fin de jeu
    const questionCards = document.querySelectorAll(".active>div");
    showQuestionSuccessErrorCard("content",questionCards);

    // Réinitialisation des réponses dans quizzManager
    quizzManager.selectedAnswer = undefined;
    quizzManager.correctAnswer = quizzData[questionNumber].answers.findIndex(answer => answer.isCorrect === true);
    // Gestion des réponses possible pour la question en cours
    answers = document.querySelectorAll('.active .Quizz-question-answers-answer');
    answers.forEach((answer,index) => {
        // A cause du reset de fin de jeu
        answer.classList.remove('active');
        answer.addEventListener("click",()=>{
        quizzManager.selectedAnswer = index ;
        return selectUniqueAnswer(answer,answers);
        });
    });
}

initializeQuestionQuizz(0,questions);


// ###################################################
// #### Gestion des erreurs succes ###################

// Elements du DOM (bouton soumettre, div.error, div.succes)
const submitElt = document.querySelector('.Quizz-headers-submit-btn');
submitElt.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("selected answer : ",quizzManager.selectedAnswer);
    if(quizzManager.selectedAnswer === quizzManager.correctAnswer){
        // Réponse correcte
       // Gestion des différents aspects d'une question (error, succes, question)
        const questionCards = document.querySelectorAll(".active>div");
        showQuestionSuccessErrorCard("succes",questionCards);
        // Actions sur le bouton poursuivre
        const followBtn = document.querySelector('.active .Quizz-question-success-btn');
        followBtn.addEventListener("click",handleSuccessBtnClick);  
    }else if(quizzManager.selectedAnswer === undefined){
        // Réponse non choisie
        alert("Merci de sélectionner une réponse avant de poursuivre")
    }  else{
        // Réponse incorrecte 
        // Gestion des différents aspects d'une question (error, succes, question)
        const questionCards = document.querySelectorAll(".active>div");
        showQuestionSuccessErrorCard("error",questionCards);
        // Actions sur le bouton ré-essayer
        const retryBtn = document.querySelector('.active .Quizz-question-error-btn')
        retryBtn.addEventListener("click",handleErrorBtnClick);
    }
})

// Functions
// Comportement du bouton
const handleSuccessBtnClick = (event) => {
     // Désactive le comportement natif du lien
     event.preventDefault();
     if (quizzManager.questionNumber < quizzManager.totalAnswers - 1){
     // La question en cours n'est pas la dernière
         // Gestion affichage question suivante (jeu de classes sur question en cours et question suivante)
         questions[quizzManager.questionNumber].classList.remove("active");
         questions[quizzManager.questionNumber + 1].classList.add("active");
         // Update des datas du quizzManager
         quizzManager.questionNumber++;
         quizzManager.score++;
         // Execution des fonctions d'initialisation (question suivante, update du header)
         initializeQuestionQuizz(quizzManager.questionNumber,questions);
         updateQuizzHeader();
        //  Evite la multiplication d'eventListener a cause d'erreurs successives
         const followBtn = document.querySelector('.active .Quizz-question-success-btn');
         followBtn.removeEventListener("click",handleSuccessBtnClick);
     }else{
     // La question en cours est la dernière
         // Masquer les questions
         questions[quizzManager.questionNumber].classList.remove("active");
         // Mise a jour du header
         quizzManager.score++;
         updateQuizzHeader();
         // Afficher le résumé
         const resumeCard = document.querySelector(".Quizz-finished");
         const nbQuestions = document.querySelector(".Quizz-finished-resume-nbQuestions");
         const mistakes = document.querySelector(".Quizz-finished-resume-mistakes");
         const score = document.querySelector(".Quizz-finished-resume-score");
         const resetBtn = document.querySelector(".Quizz-finished-resetBtn");
        //  Evite la multiplication d'eventListener a cause d'erreurs successives
         const followBtn = document.querySelector('.Quizz-question:last-child .Quizz-question-success-btn');
         followBtn.removeEventListener("click",handleSuccessBtnClick);
         // Affiche la card "finished"
         resumeCard.style.display = "block";

         // Hydrate les valeurs de quizzManager dans le texte résumé 
         nbQuestions.textContent = quizzManager.totalAnswers;  
         mistakes.textContent = quizzManager.mistakes;  
         score.textContent = quizzManager.score;  

         // Définit l'action du bouton
         resetBtn.addEventListener("click",(e)=>{
             e.preventDefault();
             resetQuizz(quizzManager);
             initializeQuestionQuizz(0,questions);
             updateQuizzHeader();
         })
     }
}

const handleErrorBtnClick = (event) => {
    event.preventDefault();
    const questionCards = document.querySelectorAll(".active>div");
    showQuestionSuccessErrorCard("question",questionCards);
    quizzManager.score--;
    quizzManager.mistakes++;
    updateQuizzHeader();
    console.log(quizzManager);
    // Nécessaire pour ne pas multiplier les ecouteurs de click en cas d'erreurs successives
    const retryBtn = document.querySelector('.active .Quizz-question-error-btn');
    retryBtn.removeEventListener("click",handleErrorBtnClick);
}












