const questions = [
    {
        question: "What is the national animal of India?",
        answers: [
            {text:"Sheep", correct: false},
            {text:"Elephant", correct: false},
            {text:"Cow", correct: false},
            {text:"Bengal Tiger", correct: true},
        ]
    },
    {
        question: "Which Indian state is famous for its tea gardens and is known as the \“Tea State of India\”\?",
        answers: [
            {text:"Assam", correct: true},
            {text:"Sikkim", correct: false},
            {text:"Arunachal Pradesh", correct: false},
            {text:"West Bengal", correct: false},
        ]
    },
    {
        question: "What is the real color of the Sun?",
        answers: [
            {text:"Yellow", correct: false},
            {text:"White", correct: true},
            {text:"Orange", correct: false},
            {text:"Red", correct: false},

        ]
    },
    {
        question: "What is the largest organ in the human body?",
        answers: [
            {text:"Lungs", correct: false},
            {text:"Skin", correct: true},
            {text:"Brain", correct: false},
            {text:"Stomach", correct: false},
            
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
 
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}



function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();