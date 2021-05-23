const quizzesBtn = document.getElementById("chatQuizzes");
const chatWindow = document.getElementById("chatWindow");

const getQuizBtn = document.querySelector("#getQuizBtn");
const quizFormDiv = document.getElementById("quizFormDiv");
const form = document.querySelector("#questionsForm");

const submitBtn = document.getElementById("submitBtn");


quizzesBtn.addEventListener('click', () => {

    chatWindow.innerHTML = "";
    chatWindow.innerHTML += `<p class="quizesMessage">Choose a Quiz</p>
    <hr class="chat-js-hr">`;

    chatWindow.innerHTML += `<button id="webDevelopmentQuiz" class="btn">Web Development Quiz</button>

    <button id="webDesignQuiz" class="btn" >Web Design Quiz</button>
    <button id="gameDesignQuiz" class="btn" >Game Design Quiz</button>
    <button id="graphicDesignQuiz" class="btn" >Graphic Design Quiz</button>
    <button id="softwareTestingQuiz" class="btn" >Software Testing Quiz</button>`;

    chatWindow.scrollIntoView({ block: 'end', behavior: 'smooth' });
})


chatWindow.addEventListener('click', (event) => {
    
    if (event.target.matches(".btn")) {

        let quizName = event.target.id;

        chatWindow.innerHTML = "";
        chatWindow.style.padding = "2rem";

        getQuestions()
            .then((data) => {
               
                let array = '';

                if (quizName === "webDevelopmentQuiz") {
                    array = data.webDevelopmentQuiz;

                } else if (quizName === "graphicDesignQuiz") {
                    array = data.graphicDesignQuiz;

                } else if(quizName === "webDesignQuiz") {
                    array = data.webDesignQuiz;

                } else if(quizName === "gameDesignQuiz") {
                    array = data.gameDesignQuiz;
                }

                //let array = data + '.' + `${quizName}`;
                console.log(array);
            
                chooseRandomQuestions(array);
                renderQuestions(array);
                    //nextQuestion(array);
                checkRightAnswers(array);
            } );
        
    }
   
});


// const getQuestions = () => {
//     fetch(`https://raw.githubusercontent.com/OlgaBrova/ChatBot-Quiz/master/quizDB.json`)
//         .then((response) => response.json())
//         .then((result) => {

//             // OVIE TRI UKLUCETE GI KOGA KE PROBUVATE SO TEST JSON - dbMoana.json
//             // let randomArray = chooseRandomQuestions(result);
//             // renderQuestions(randomArray);
//             // checkRightAnswers(randomArray);


//             //OVIE TRI UKLUCETE GI KOGA KE PROBUVATE SO VISTINSKIOT JSON - quizDB.json
//             let array = chooseRandomQuestions(result.webDevelopmentQuiz);
//             renderQuestions(array);
//             //nextQuestion(array);
//             checkRightAnswers(array);
//         })    
// }

const getQuestions = async () => {
    let response = await fetch(`https://raw.githubusercontent.com/OlgaBrova/ChatBot-Quiz/master/quizDB.json`);
    return await response.json();
    // console.log(data);

    // return data;
}


const renderQuestions = (questions) => {
    let inner = '';
    inner += `<form class="quiz-form px-4" id="questionsForm">`;

    for( let i = 0; i < questions.length; i++) {
        inner += `
        <div class="quizQuestion my-5">
            <p class="lead font-weight-normal">${questions[i].question}</p>
            <div class="form-check my-2 py-1">
                <input type="radio" class="radio" name="q${i+1}" value="A">
                <label class="form-check-label">${questions[i].answer1}</label>
            </div>
            <div class="form-check my-2 py-1">
                <input type="radio" class="radio" name="q${i+1}" value="B">
                <label class="form-check-label">${questions[i].answer2}</label>
            </div>
            <div class="form-check my-2 py-1">
                <input type="radio" class="radio" name="q${i+1}" value="C">
                <label class="form-check-label">${questions[i].answer3}</label>
            </div>
            <div class="form-check my-2 py-1">
                <input type="radio" class="radio" name="q${i+1}" value="D">
                <label class="form-check-label">${questions[i].answer4}</label>
            </div>
        </div>

        <hr class="quiz-hr">
        `;
    }
    
    inner += `<div class="text-center">
                <input type="submit" class="btn btn-light" id="submitBtn">
            </div>
            </form>`;

    chatWindow.innerHTML += inner;

}


const chooseRandomQuestions = (questions) => {

    let randomQuestions = [];

    for(let i = 0; i < 15; i++ ) {
        let index = Math.floor(Math.random() * questions.length);
        randomQuestions.push(questions[index]);
        questions.splice(index, 1);
    }

    console.log(randomQuestions);
    return randomQuestions;
}


const checkRightAnswers = (questions) => {
    return new Promise((resolve, reject) => {
        if (!questions || questions.length === 0) {
            reject("Something went wrong!");
        }

        let correctAnswers = [];

        for( let i = 0; i < questions.length; i++) {
            correctAnswers.push(questions[i].correctAnswer);
        }
        console.log(correctAnswers);

        resolve(correctAnswers);


        form.addEventListener('submit', e => {
            e.preventDefault();
        
            let userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value, form.q6.value, form.q7.value, form.q8.value, form.q9.value, form.q10.value, form.q11.value, form.q12.value, form.q13.value, form.q14.value, form.q15.value];
        
            console.log(userAnswers); 
               
            
            let score = 0;
        
            userAnswers.forEach((answer, i) => {
        
                if (answer === correctAnswers[i]) {
                    score += 6.66666;
                }
            });
        
            window.scrollTo(0, 0);
            chatWindow.innerHTML = "";
            chatWindow.innerHTML += `<p>You got <span class="display-4 p-3" >${Math.ceil(score)}%</span>of the questions right!</p>`;
            //result.style.display = "block";
            //result.querySelector('span').textContent = `${Math.ceil(score)}%`;
        
        });
        
    });
};



///// OVAA FUNKCIJA NE E ZAVRSHENA - NEXT QUESTION
const nextQuestion = (questions) => {
    
    const questionEnd = () => {
        let currentQuestion = 0;
        let questionIndex = -1;
  
    
        const renderQuestion = () => {
           
            form.innerHTML =  ``;

            form.innerHTML += `<p>Question ${currentQuestion + 1} of ${questions.length}</p>
                            <hr>`;
        
            form.innerHTML +=  
            `<div class="my-4">
                    <p class="lead font-weight-normal">${questions[questionIndex].question}</p>
                    <div class="form-check my-2 py-1">
                        <input type="radio" class="radio" name="q${currentQuestion + 1}" value="A">
                        <label class="form-check-label">${questions[questionIndex].answer1}</label>
                    </div>
                    <div class="form-check my-2 py-1">
                        <input type="radio" class="radio" name="q${currentQuestion + 1}" value="B">
                        <label class="form-check-label">${questions[questionIndex].answer2}</label>
                    </div>
                    <div class="form-check my-2 py-1">
                        <input type="radio" class="radio" name="q${currentQuestion + 1}" value="C">
                        <label class="form-check-label">${questions[questionIndex].answer3}</label>
                    </div>
                    <div class="form-check my-2 py-1">
                        <input type="radio" class="radio" name="q${currentQuestion + 1}" value="D">
                        <label class="form-check-label">${questions[questionIndex].answer4}</label>
                    </div>
                </div>
                <hr>`;

            form.innerHTML += `<button type="button" id="nextQuestion" class="btn btn-outline-primary">Next question</button>`;

        }
      

        //renderQuestion();



        if (questionIndex < questions.length - 1) {
            //currentQuestion++;
            
            questionIndex++;
            renderQuestion();
            
            
            document.getElementById("nextQuestion").addEventListener('click', renderQuestion());
            
            } else {
            alert("You've reached the last question.");
        }
    }

    questionEnd ();
};



// const nextQuestion = (questions) => {


//     let currentQuestion = 0;
//     let questionIndex = -1;
//     let submitted = false;

//     const renderQuestion = (questions) => {
//         submitted = false;

//         // Clean-up since we are removing the DOM
//         removeClickListener(form.querySelector('#nextQuestion'), handleNext);
//         //removeClickListener(form.querySelector('#submit'), handleSubmit);

//         const isLast = questionIndex === questions.length - 1;

//         //form.innerHTML =  ``;

//         form.innerHTML += `<p>Question ${currentQuestion + 1} of ${questions.length}</p>
//                         <hr>`;

//         form.innerHTML +=  
//         `<div class="my-4">
//             <p class="lead font-weight-normal">${questions[questionIndex].question}</p>
//             <div class="form-check my-2 py-1">
//                 <input type="radio" class="radio" name="q${currentQuestion + 1}" value="A">
//                 <label class="form-check-label">${questions[questionIndex].answer1}</label>
//             </div>
//             <div class="form-check my-2 py-1">
//                 <input type="radio" class="radio" name="q${currentQuestion + 1}" value="B">
//                 <label class="form-check-label">${questions[questionIndex].answer2}</label>
//             </div>
//             <div class="form-check my-2 py-1">
//                 <input type="radio" class="radio" name="q${currentQuestion + 1}" value="C">
//                 <label class="form-check-label">${questions[questionIndex].answer3}</label>
//             </div>
//             <div class="form-check my-2 py-1">
//                 <input type="radio" class="radio" name="q${currentQuestion + 1}" value="D">
//                 <label class="form-check-label">${questions[questionIndex].answer4}</label>
//             </div>
//         </div>
//         <hr>
//         <p id="message"></p>

//         <button id="submit">Submit</button>
//         <button type="button" id="nextQuestion" class="btn btn-outline-primary">${!isLast ? 'Next' : 'Finish'}</button>`;


//     // Re-associate the listener
//     addClickListener(form.querySelector('#nextQuestion'), handleNext);
//     //addClickListener(form.querySelector('#submit'), handleSubmit);
//     }

//     const addClickListener = (btn, listener) => {
//     if (btn) btn.addEventListener('click', listener);
//     };

//     const removeClickListener = (btn, listener) => {
//     if (btn) btn.removeEventListener('click', listener);
//     };

//     const handleNext = e => {
//         e.preventDefault();


//         if (questionIndex < questions.length - 1) {
//             questionIndex++;
//             renderQuestion(questions);
//         } else {
//             alert("You've reached the last question.");
//         }
//     };


//     //renderQuestion(questions);
// }



   
