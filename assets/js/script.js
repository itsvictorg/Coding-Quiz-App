var startButton = document.getElementById('start-button');
var quizContainer = document.getElementById('quiz-container');
var choiceList = document.getElementById('choices');
var initPage = document.getElementById('init-page');
var hasBegun;
var timer = document.getElementById('time');
var quizPage = document.getElementById('quiz-page');
var scoreDisplay = document.getElementById('score');
var score = 0;
var winText = "Congratulations, you finished!";
var loseText = "YOU LOSE!"
var saveElement = document.getElementById('save');
var savedUsers = document.getElementById('saved-users');
var hasWon;
var hasLost;

var questions = [
    {
        title: "Which of the following is a data type?",
        choices: ['integer', 'boolean', 'string', 'all of the above'],
        answer: 'all of the above'
    },

    {
        title: "Function definitions must be open and closed with___",
        choices: ['curly brackets', 'parenthesis', 'hyphens', 'square brackets'],
        answer: 'curly brackets'

    },

    {
        title: "A for loop will continue to loop how many times?",
        choices: ['1 time', 'infinite amout of times', 'until a condition is met', '2 times'],
        answer: 'until a condition is met'

    },

    {
        title: "Variables are used to___",
        choices: ['store data', 'style html', 'structure html', 'none of the above'],
        answer: 'store data'

    },
];



//Function that begins the quiz
startButton.addEventListener('click', function(event){
    
   


    var secondsLeft = 60;


    function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function() {
          secondsLeft--;
          timer.textContent = secondsLeft + " seconds left.";
      
          //when user has lost, clear the page, create lose text, create try again button, and save user name and score information.
          if(secondsLeft <= 0 && !hasWon) {
                // Stops execution of action at set interval and clears page
                clearInterval(timerInterval);
               
                while (choiceList.firstChild) {
                choiceList.removeChild(choiceList.lastChild);
                }
                //Creates new text and creates 'try again' button
                quizContainer.textContent = loseText;
                timer.textContent = '';
                
                var tryAgain = document.createElement('button');
                tryAgain.classList.add('try-again')
                tryAgain.textContent = 'Try Again';
                choiceList.appendChild(tryAgain);
                
                var input = document.createElement("input");
                input.type = "text";
                input.className = "input-class"
                input.placeholder = "Enter your name"
                saveElement.appendChild(input);
                
                var saveButton = document.createElement('button');
                saveButton.textContent = 'Save Your Score'
                saveButton.className = "save-button"
                saveElement.appendChild(saveButton);

                localStorage.setItem("currentScore", JSON.stringify(currentScore));
                
                //creates function to restart quiz
                tryAgain.addEventListener('click', function(){
                window.location.reload();
                })
                
                //function to save and render users
                saveButton.addEventListener('click', function(){
                    var userScore = {
                        userName: input.value,
                        userScore:currentScore
                    }

                    localStorage.setItem("userNameScore", JSON.stringify(userScore));
                    
                   
                    
                    //gets user from local storage and displays to screen
                    var savedUserContainer = document.createElement('p');
                    var savedUserScore = JSON.parse(localStorage.getItem("userNameScore"));
                    savedUserContainer.textContent = savedUserScore.userName + ' Score: ' + savedUserScore.userScore
                    quizPage.appendChild(savedUserContainer);


                });

             //when user has won, clear the page, create win text, create try again button, and save user name and score information. 
            }else if(hasWon === true){
                clearInterval(timerInterval);
                quizContainer.textContent = winText;
                timer.textContent = '';
                
                var tryAgain = document.createElement('button');
                tryAgain.classList.add('try-again')
                tryAgain.textContent = 'Try Again';
                choiceList.appendChild(tryAgain);
                
                var input = document.createElement("input");
                input.type = "text";
                input.className = "input-class"
                input.placeholder = "Enter your name"
                saveElement.appendChild(input);

                var saveButton = document.createElement('button');
                saveButton.textContent = 'Save Your Score';
                saveButton.className = "save-button";
                saveElement.appendChild(saveButton);


                localStorage.setItem("currentScore", JSON.stringify(currentScore));
                
                //creates function to restart quiz
                tryAgain.addEventListener('click', function(){
                window.location.reload();
                })


                //saves user info and displays info
                saveButton.addEventListener('click', function(){
                    var userScore = {
                        userName: input.value,
                        userScore:currentScore
                    }

                    localStorage.setItem("userNameScore", JSON.stringify(userScore));
                    
                   
                    
                    //gets user from local storage and displays to screen
                    var savedUserContainer = document.createElement('p');
                    var savedUserScore = JSON.parse(localStorage.getItem("userNameScore"));
                    savedUserContainer.textContent = savedUserScore.userName + ' Score: ' + savedUserScore.userScore
                    quizPage.appendChild(savedUserContainer);


                });

            }
      
        }, 1000);
    }
    
    //Sets variables to check later in the code
    event.preventDefault(); 
    hasBegun = true;

    //Function clears the page
    function clear(){
    event.preventDefault()
    initPage.textContent = ''
    }

    //Checks if quiz has begun
    if(hasBegun){
    clear()
    setTime();
    
    //sets current score and creates function to display current score
    var currentScore = 0;
    function displayScore(){
        scoreDisplay.textContent = '';
        scoreDisplay.textContent = 'Current Score: ' + currentScore;
    }
    
    displayScore();

    console.log(displayScore.textContent)
    //if quiz has begun, then create question text and choices
    var hasBegun = true;
    quizContainer.textContent = questions[0].title;
    for(var i = 0; i < questions[0].choices.length; i++){
        var choice = questions[0].choices[i];
        var answrBtns = document.createElement('li');
        answrBtns.classList.add('answers');
        answrBtns.setAttribute('data-choice', questions[0].choices[i]);
        choiceList.appendChild(answrBtns);
        answrBtns.textContent = choice;
    }

    
    } else{
    return;
    };
    //Event listener grabs user selection and stores it in a variable
    choiceList.addEventListener('click',  function(event){
    
    var selection = event.target;


    
   

    //if choice is correct, move on to next question
    if(selection.textContent === questions[0].answer) {

        currentScore = currentScore + 25;
        displayScore()
        //removes current choices
        while (choiceList.firstChild) {
            choiceList.removeChild(choiceList.lastChild);
        }
        //creates new question and choices
        quizContainer.textContent = questions[1].title;
        for(var i = 0; i < questions[1].choices.length; i++){
            var choice = questions[1].choices[i];
            answrBtns = document.createElement('li');
            answrBtns.classList.add('answers');
            answrBtns.setAttribute('data-choice', questions[1].choices[i]);
            choiceList.appendChild(answrBtns);
            answrBtns.textContent = choice;
        
        }


    } else{
     
        secondsLeft =  secondsLeft - 5; 
        selection.style.backgroundColor = 'red';
        


        };

    });
    //sets click target(answer selected) as a variable
    choiceList.addEventListener('click',  function(event){
       
        var selection = event.target;


   
  

        //if choice is correct, move on to next question
        if(selection.textContent === questions[1].answer) {

            currentScore = currentScore + 25;
            displayScore();
            //removes current choices
            while (choiceList.firstChild) {
            choiceList.removeChild(choiceList.lastChild);
            }
            //creates new question and choices
            quizContainer.textContent = questions[2].title;
            for(var i = 0; i < questions[2].choices.length; i++){
           var choice = questions[2].choices[i];
           answrBtns = document.createElement('li');
           answrBtns.classList.add('answers');
           answrBtns.setAttribute('data-choice', questions[2].choices[i]);
           choiceList.appendChild(answrBtns);
           answrBtns.textContent = choice;
          
       
            }
        }else{
            
        }
    })

    choiceList.addEventListener('click',  function(event){
    
        var selection = event.target;


    
   

        //if choice is correct, move on to next question
        if(selection.textContent === questions[2].answer) {
            currentScore = currentScore + 25;
            displayScore();

        //removes current choices
        while (choiceList.firstChild) {
            choiceList.removeChild(choiceList.lastChild);
        }
        //creates new question and choices
        quizContainer.textContent = questions[3].title;
        for(var i = 0; i < questions[3].choices.length; i++){
            var choice = questions[3].choices[i];
            answrBtns = document.createElement('li');
            answrBtns.classList.add('answers');
            answrBtns.setAttribute('data-choice', questions[3].choices[i]);
            choiceList.appendChild(answrBtns);
            answrBtns.textContent = choice;
        
        }


        } else{
        //add code to remove time from timer and try again
        //return for now until code completed.
        return;
        }
    });

    choiceList.addEventListener('click',  function(event){
    
        var selection = event.target;


    
   

        //if choice is correct, move on to next question
        if(selection.textContent === questions[3].answer) {
            currentScore = currentScore + 25;
            displayScore();

        //removes current choices
        while (choiceList.firstChild) {
            choiceList.removeChild(choiceList.lastChild);
        }
        //creates new question and choices
        
        
       
       hasWon = true;
        


        } else{
        //add code to remove time from timer and try again
        //return for now until code completed.
        //return;
        }
    });
    


});
