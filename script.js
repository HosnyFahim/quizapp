let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/right.mp3');
let AUDIO_FAIL = new Audio('audio/wrong.mp3');
let AUDIO_END = new Audio('audio/end.mp3');

/**
 * The function initializes the webpage by displaying the number of questions in an array and showing
 * the first question.
 */
function init() {
    document.getElementById('all-questions').innerHTML = questions.length; // dieser Zeile zeigt die Anzahl der Fragen im Array
    showQuestion();
}

/**
 * The function checks if the game is over and either shows the end screen or updates the progress bar
 * and moves to the next question.
 */
function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();

    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


/**
 * The function checks if the current question number is greater than or equal to the total number of
 * questions in the game.
 * @returns a boolean value indicating whether the current question number is greater than or equal to
 * the total number of questions in the game. If it is, then the game is considered over.
 */
function gameIsOver() {
    return currentQuestion >= questions.length;
}


/**
 * The function shows the end screen and updates the amount of questions and right questions displayed.
 */
function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('question-body').style = 'display: none;';
    document.getElementById('amount-of-questions').innerHTML = questions.length; 
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions; 
    AUDIO_END.play();
}


/**
 * The function updates a progress bar by calculating and displaying the percentage of completed
 * questions.
 */
function updateProgressBar() {
    //** Percent Calculator **//
    let percent = (currentQuestion + 1) / questions.length; // Prozent variante!
    percent = Math.round(percent * 100); // Procent Rechnung!
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}


/**
 * The function updates the HTML elements with the next question and its corresponding answers.
 */
function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('next-question').innerHTML = currentQuestion + 1; // dieser Zeile zeigt die Nummer von der Frage zb. 1 von 7, 2 von 7 usw...
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


/**
 * The function checks if the selected answer is correct and adds CSS styles to the corresponding
 * buttons, while also disabling the answer buttons and enabling the next button.
 * @param selection - The ID of the button that was clicked by the user to select their answer.
 */
function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { // Richtige Frage beatwortet.
        console.log('Richtige Antwort!');
        document.getElementById(selection).parentNode.classList.add('bg-success'); // ParentNode fügt ein CSS Style zu dem übergeordneten Element hinzu.
        rightQuestions++; // mit dieser Zeile erhöhen wir die Richtige antwort um 1. Die Falsche Antworten werden nicht berührt. 
        AUDIO_SUCCESS.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger'); // ParentNode fügt ein CSS Style zu dem übergeordneten Element hinzu.
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success'); // da haben wir die success beim falschen Antwort Classe hingefügt!.
        AUDIO_FAIL.play();
    }

    document.getElementById('next-button').disabled = false;
    document.getElementById('button-1').disabled = true; // dieser Zeile macht das Button anklickbar, wenn die oberre answer Function ausgeführt wird!
    document.getElementById('button-2').disabled = true; // dieser Zeile macht das Button anklickbar, wenn die oberre answer Function ausgeführt wird!
    document.getElementById('button-3').disabled = true; // dieser Zeile macht das Button anklickbar, wenn die oberre answer Function ausgeführt wird!
    document.getElementById('button-4').disabled = true; // dieser Zeile macht das Button anklickbar, wenn die oberre answer Function ausgeführt wird!
}


/**
 * The function increments the current question variable by 1, disables the next button, and enables
 * the answer buttons for the next question.
 */
function nextQuestion() {
    currentQuestion++; // Variable wird um 1 erhöht. In diesem Fall von 0 auf 1.
    document.getElementById('next-button').disabled = true; // dieser Zeile macht das Button wieder unanklickbar.
    document.getElementById('button-1').disabled = false; // dieser Zeile macht das Button anklickbar, wenn die oberre answer Function ausgeführt wird!
    document.getElementById('button-2').disabled = false; // dieser Zeile macht das Button anklickbar, wenn die oberre answer Function ausgeführt wird!
    document.getElementById('button-3').disabled = false; // dieser Zeile macht das Button anklickbar, wenn die oberre answer Function ausgeführt wird!
    document.getElementById('button-4').disabled = false; // dieser Zeile macht das Button anklickbar, wenn die oberre answer Function ausgeführt wird!
    resetAnswerButton();
    showQuestion();
}


//** CSS Tempelates **//
/**
 * The function resets the background color of four answer buttons.
 */
function resetAnswerButton() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


//** Restart Game **//
/**
 * The function restarts the game by resetting the current question and right questions variables,
 * changing the header image, hiding the end screen, and displaying the question body.
 */
function restartGame() {
    document.getElementById('header-image').src = `img/quiz.jpg`; // Image änderung!!!
    document.getElementById('end-screen').style = 'display: none;'; // EndScreen ausblenden!!
    document.getElementById('question-body').style = ''; // Question-body wieder anzeigen!!

    currentQuestion = 0;
    rightQuestions = 0;
    init();
}