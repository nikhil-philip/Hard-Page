window.onload = function(){
function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label class="block">
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} : 
              ${currentQuestion.answers[letter]} 
              </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<fieldset><legend>${currentQuestion.question}</legend>
          <div class="answers"> ${answers.join('')} </div></fieldset>`
        );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    //Disable after submit
    const allradio = (document.querySelectorAll("input[type=radio]"));
    document.getElementById("submit").setAttribute("disabled","true")
    for(var i=0;i<allradio.length;i++)
    {
        allradio[i].setAttribute("disabled","true");
    }
    // keep track of user's answers
    let numCorrect = 0;
  
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      
  
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;
  
        // color the answers green
        answerContainers[questionNumber].style.color = 'green';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });
  
    // show number of correct answers out of total
    resultsContainer.innerHTML = `<div class="block results">You Scored <strong> ${numCorrect} </strong> out of <strong> ${myQuestions.length} </strong> </div>`;
  }


const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById("start");
const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];


//timer
var hasTestEnded = false;
function start(){
var timeleft = 59;
document.getElementById("start").setAttribute("disabled","true");
//display quiz
buildQuiz();
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("timer").innerHTML = "Time Out!!";
    showResults();
  } else {
    document.getElementById("timer").innerHTML = "Time Remaining " + timeleft + " seconds";
  }

  //announced by screen reader at 5 second intervals
  if(!(timeleft%5 == 0))
  {
      document.getElementById("timer").setAttribute("aria-live","false");
  }
  else
  {
    document.getElementById("timer").setAttribute("aria-live","polite");
  }
  //pause timer if user clicks submit before timer ends.
if(!hasTestEnded)
  {timeleft -= 1;}
}, 1000);
}

//on start
startButton.addEventListener('click', start);


// on submit, show results
submitButton.addEventListener('mousedown', event => {
    showResults();
    hasTestEnded = true;
});
submitButton.addEventListener('keyup',event => {
    if (event.keyCode == 32 || event.keyCode == 13) {
     showResults();
     hasTestEnded = true;
    }
  });
}