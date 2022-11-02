let questions = [
  {
    qText: "3 x 3 = __",
    qChoices: ["6", "18", "33", "9"],
    qAnswer: 3,
  },
  {
    qText: "2 - 8 = __",
    qChoices: ["-6", "6", "10", "0"],
    qAnswer: 0,
  },
  {
    qText: "In JavaScript, which of these is an example of a global variable?",
    qChoices: [
      "'let b = 10' inside a function",
      "'let b = 10' in an if block",
      "'const b = 10' outside of all the functions",
      "'var b = 10' inside a function",
    ],
    qAnswer: 2,
  },
  {
    qText:
      "In JavaScript, which of the following is NOT true regarding hoisting?",
    qChoices: [
      "Whereas function and variable declarations can be hoisted, their initializations cannot.",
      "If 'let x = 10' is declared as a global variable after 'console.log(x)', it will result in a 'ReferenceError'.",
      "Arrow functions create closure when they are hoisted.",
      "If 'var x = 10' is declared as a global variable after 'console.log(x)', it will result in 'undefined'.",
    ],
    qAnswer: 2,
  },
  {
    qText: "____ in ____ house over ____.",
    qChoices: [
      "Their, they're, there",
      "They're, their, there",
      "There, they're, their",
      "They're, there, their",
    ],
    qAnswer: 1,
  },
];
//========================================================
let app = {
  start: function () {
    this.currPosition = 0;
    // will create a setting in future for 2 modes: quiz vs. flashcard
    // score will only be used in quiz mode
    this.score = 0;

    // get question options
    let questChoices = document.querySelectorAll(".questChoices");

    questChoices.forEach((element, index) => {
      element.addEventListener("click", () => {
        // check correct answer
        this.checkAnswer(index);
      });
    });

    // sets and updates the score
    this.updateStats();
    startOverBtn.style.visibility = "hidden";

    // show first question
    this.showQuestion(questions[this.currPosition]);

    document
      .getElementById("showAnswerBtn")
      .addEventListener("click", () => this.displayAnswer());

    document
      .getElementById("hideAnswerBtn")
      .addEventListener("click", () => this.hideAnswer());
  },

  // +++++++++++++++++++++++++++++++++

  checkIfEnd: function () {
    // compare score to arr length
    let isEnd = false;
    let endMsg = document.getElementById("endMsg");
    endMsg.innerText = "";
    let startOverBtn = document.getElementById("startOverBtn");
    startOverBtn.style.visibility = "hidden";

    // TODO change value to remove "-3"
    if (this.score === questions.length - 4) {
      isEnd = true;
      console.log("isEnd: " + isEnd);

      // let startOverBtn = document.createElement("button");
      startOverBtn.style.visibility = "visible";
      endMsg.innerText = "Congratulations, you've reached the end!";
    }
  },

  startOver: function () {
    app.start();
    endMsg = "";
    resultsMsg = "";
    startOverBtn.style.visibility = "hidden";
    console.log("starting over");
    location.reload();
  },

  showQuestion: function (arr) {
    // show question
    let questTextDiv = document.getElementById("questText");
    questTextDiv.textContent = arr.qText;
    let currQuestion = questions[this.currPosition];
    console.log("currQuestion.qAnswer (index): " + currQuestion.qAnswer);

    // construction begin
    endMsg.innerText = "";
    startOverBtn.style.visibility = "hidden";
    resultsMsg = "";
    console.log(resultsMsg);
    // construction end

    // show question options
    let questChoices = document.querySelectorAll(".questChoices");

    questChoices.forEach(function (element, index) {
      element.textContent = arr.qChoices[index];
    });

    this.hideAnswer();

    // showAnswerBtn.hidden = false;
    hideAnswerBtn.hidden = true;
  },

  // +++++++++++++++++++++++++++++++++
  checkAnswer: function (userSelection) {
    let currQuestion = questions[this.currPosition];

    // replace
    // showAnswerBtn.hidden = false;
    // hideAnswerBtn.hidden = true;

    // if CORRECT answer
    // answers are considered correct if "true" arg in checkAnswer method: showResult(true)
    if (currQuestion.qAnswer == userSelection) {
      this.score++;
      this.showResult(true);

      this.increasePosition(); // intentionally here

      // else INCORRECT answer
      // answers are considered incorrect if "false" arg in checkAnswer method: showResult(false)
    } else {
      console.log(
        "correct answer index for the question you just tried answering: " +
          currQuestion.qAnswer
      );
      this.showResult(false);
    }

    this.updateStats();

    // show current question (which is next question if answered correctly)
    this.showQuestion(questions[this.currPosition]);

    this.checkIfEnd();

    // Can toggle this on to ensure current displayed answer is always updated
    // Don't leave on though
    // this.displayAnswer();
  },

  // +++++++++++++++++++++++++++++++++
  increasePosition: function () {
    this.currPosition++;

    // when reaches end of array, goes back to the beginning
    if (this.currPosition == questions.length) {
      this.currPosition = 0;
    }
  },

  // +++++++++++++++++++++++++++++++++
  updateStats: function () {
    let scoreDiv = document.getElementById("score");
    scoreDiv.textContent = `Your score: ${this.score}`;
  },

  // +++++++++++++++++++++++++++++++++
  getAnswer: function () {
    let answerMsg = "";
    let answerDiv = document.getElementById("answer");

    // get the current question
    let currQuestion = questions[this.currPosition];

    // get correct choice index (index of correct answer)
    let currAnswerIndex = currQuestion.qAnswer;

    // get text of correct answer (based on correct choice index)
    let currAnswerText = currQuestion.qChoices[currAnswerIndex];

    // This is what's displayed on the screen
    answerMsg = `Answer: ${currAnswerText}`;

    console.log("answerMsg: " + answerMsg);
    console.log("currAnswerText: " + currAnswerText);

    answerDiv.textContent = answerMsg;

    return currAnswerText;
  },

  // +++++++++++++++++++++++++++++++++
  displayAnswer: function () {
    let answerMsg = "";

    console.log("this.getAnswer(): " + this.getAnswer());

    answerMsg.hidden = false;

    hideAnswerBtn.hidden = false;
    showAnswerBtn.hidden = true;
  },

  // +++++++++++++++++++++++++++++++++
  hideAnswer: function () {
    let answerDiv = document.getElementById("answer");
    let answerMsg = "";

    answerMsg = ``;

    answerDiv.textContent = answerMsg;

    hideAnswerBtn.hidden = true;
    showAnswerBtn.hidden = false;
  },

  // +++++++++++++++++++++++++++++++++

  showResult: function (isCorrect) {
    let resultsDiv = document.getElementById("results");
    let resultsMsg = "";

    // if "true" is passed as the arg, it's considered isCorrect
    if (isCorrect) {
      resultsMsg = "Correct!";
    } else {
      resultsMsg = "Sorry...try again";
    }

    resultsDiv.textContent = resultsMsg;
  },

  // +++++++++++++++++++++++++++++++++
};

app.start();
