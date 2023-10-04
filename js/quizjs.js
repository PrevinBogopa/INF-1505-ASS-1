//1. start the game
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restart = document.getElementById('restart-btn');
const qBox = document.getElementById('questionBox');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer-btns');
const markBoard = document.getElementById('total');
const right = document.getElementById('correctSign');
const wrong = document.getElementById('wrongSign');
const result = document.getElementsByClassName("result");
const marks = document.getElementById('disMarks');
const explanationElement = document.getElementById('explanation');
let shuffledQuestions, shuffledOptions, currentQuestionIndex;
let count = 0;
let quizEnded = false;
startButton.addEventListener('click', startGame);
restart.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQ();
})

function startGame() {
  startButton.classList.add('hide');
  result[0].classList.add('hide');
  shuffledQuestions = questionList.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  count = 0;
  markBoard.innerText = count + "/" + shuffledQuestions.length;qBox.classList.remove('hide');
  setNextQ()
}

//2. setting new question
function setNextQ() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endGame();
  }
}
function resetExplanation() {
  const explanation = document.getElementById('explanation');
  explanation.textContent = '';
}
function showQuestion(obj) {
  resetExplanation();questionElement.innerText = "Q" + (currentQuestionIndex + 1) + ". " + obj.question;

  shuffledOptions = obj.answers.sort(() => Math.random() - .5);
  for (let i = 0; i < shuffledOptions.length; i++) {
    const button = document.createElement('button');
    button.innerText = shuffledOptions[i].text;
    button.classList.add('btn');
    if (shuffledOptions[i].correct) {
      button.dataset.correct = shuffledOptions[i].correct;
    }
    button.addEventListener('click', selectAnswer);
 answerElement.appendChild(button);
  }
}
function endGame() {quizEnded = true;qBox.classList.add('hide');
  result[0].classList.remove('hide');
  marks.innerText = count + "/" + shuffledQuestions.length;
  if (count == shuffledQuestions.length) {
    result[0].innerText = "Congratulations! You scored " + count + " out of " + shuffledQuestions.length;
  } else {
    result[0].innerText = "You scored " + count + " out of " + shuffledQuestions.length + ". Better luck next time!";
  }
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerElement.firstChild) {
 answerElement.removeChild(answerElement.firstChild);
  }
  right.classList.add('hide');
  wrong.classList.add('hide');
}

//3.action after selecting the question (correct/wrong)
function selectAnswer(e) {
  const selectedButton = e.target;
  selectedButton.style.border = "2px solid black";
  const correct = selectedButton.dataset.correct;
  countMarks(correct);
  setStatusClass(document.body, correct);
  Array.from(answerElement.children).forEach(btn => {
    setStatusClass(btn, btn.dataset.correct);
  })
  block();
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    endGame();
  }

  // Display explanation for wrong answers
  const obj = shuffledQuestions[currentQuestionIndex];
  if (!correct) {
    explanationElement.innerText = "Explanation: " + obj.explanation;
  }
}


function setStatusClass(ele, correct) {
  clearStatusClass(ele);
  if (correct) {
    ele.classList.add('correct');
  } else {
    ele.classList.add('wrong');
  }
}

function clearStatusClass(ele) {
  ele.classList.remove('correct');
  ele.classList.remove('wrong');
}

//counting score
function block() {
  Array.from(answerElement.children).forEach(btn => {
    btn.disabled = true;
  })
}

function countMarks(ele) {
  if (ele) {
    count++;
    right.classList.remove('hide');
  } else {
    wrong.classList.remove('hide');
  }
  markBoard.innerText = count + "/" + shuffledQuestions.length
}

function setNextQ() {
  resetState();
  if (quizEnded) {
    return;
  }
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endGame();
  }
}

//Question list

const questionList=
[

  {
    "question": "VB.NET and C++ are examples of _____?",
    "answers": [
      {"text": "a. High-level language", "correct": true},
      {"text": "b. Assembly language", "correct": false},
      {"text": "c. Machine language", "correct": false},
      {"text": "d. Compiler language", "correct": false}
    ],
    "explanation": "VB.NET and C++ are both examples of high-level programming languages"
  }
  ,
  {
    "question": "In a relational database model, a _____ is a field in a relational table that matches the primary key column of another table.",
    "answers": [
      {"text": "a. Serial key", "correct": false},
      {"text": "b. Secondary key", "correct": false},
      {"text": "c. Domain key", "correct": false},
      {"text": "d. Foreign key", "correct": true}
    ],
    "explanation": "In a relational database, a foreign key is a field in a table that refers to the primary key of another table."
  }
  ,
  {
    "question": "Writing data to a hard drive is an example of a/an ________ operation.",
    "answers": [
      {"text": "a. Arithmetic", "correct": false},
      {"text": "b. Retrieval", "correct": false},
      {"text": "c. Storage", "correct": true},
      {"text": "d. Logical", "correct": false}
    ],
    "explanation": "Correct answer is c. Storage"
  }
,
{
  "question": "_____, used in object-oriented databases, refers to new objects being created faster and more easily by entering new data in attributes.",
  "answers": [
    {"text": "a. Encapsulation", "correct": false},
    {"text": "b. Inheritance", "correct": false},
    {"text": "c. Counterbalance", "correct": false},
    {"text": "d. Fragmentation", "correct": true}
  ],
  "explanation": "Correct answer is d. Fragmentation"
}
,{
  "question": "Social networking sites can reduce organizations’ costs by _____.",
  "answers": [
    {"text": "a. Giving customers more access to all sorts of organizational information", "correct": false},
    {"text": "b. Providing an inexpensive medium for targeting a large customer base", "correct": true},
    {"text": "c. Limiting buyers’ choices by offering services that make it difficult for customers to switch", "correct": false},
    {"text": "d. Customizing the organization’s Web site and offering many options to customers", "correct": false}
  ],
  "explanation": "Correct answer is b. Providing an inexpensive medium for targeting a large customer base"
}
,
{
  "question": "A petabyte is equal to _____ bytes.",
  "answers": [
    {"text": "a. 2^40", "correct": false},
    {"text": "b. 2^30", "correct": true},
    {"text": "c. 2^50", "correct": false},
    {"text": "d. 2^60", "correct": false}
  ],
  "explanation": "Correct answer is b. 2^30"
}
,
{
  "question": "In the context of segmentation of customers in database marketing, _____ is a variable that includes gender, age, income, and marital status.",
  "answers": [
    {"text": "a. Demographic information", "correct": true},
    {"text": "b. Psychographic information", "correct": false},
    {"text": "c. Strategical information", "correct": false},
    {"text": "d. Geographical information", "correct": false}
  ],
  "explanation": "Correct answer is a. Demographic information"
}
,
{
  "question": "An effective financial information system should provide timely, accurate, and integrated information about the marketing mix, or 4Ps: price, promotion, place, and product.",
  "answers": [
    {"text": "True", "correct": false},
    {"text": "False", "correct": true}
  ],
  "explanation": "Correct answer is 'False'"
}
,
{
  "question": "Which is a software component of a management information system (MIS)?",
  "answers": [
    {"text": "a. Application servers", "correct": false},
    {"text": "b. Barcode readers", "correct": false},
    {"text": "c. Memory devices", "correct": false},
    {"text": "d. Commercial programs", "correct": true}
  ],
  "explanation": "Correct answer is d. Commercial programs"
}
,
{
  "question": "Tshepitech, an international textile company, uses a database to store data on the number of products, suppliers, and sales personnel. The process component of the information system conducts analysis on the data to provide information about sales. Which can be used by Tshepitech to generate predictions for its next sales period?",
  "answers": [
    {"text": "a. Theoretical hypotheses", "correct": false},
    {"text": "b. Modeling charts", "correct": false},
    {"text": "c. Estimation graphs", "correct": false},
    {"text": "d. Forecasting models", "correct": true}
  ],
  "explanation": "Correct answer is d. Forecasting models"
}
,{
  "question": "Which is true of fourth-generation languages (4GLs)?",
  "answers": [
    {"text": "a. They use artificial intelligence technologies, such as knowledge-based systems.", "correct": false},
    {"text": "b. They contain a series of 0s and 1s representing data or instructions.", "correct": false},
    {"text": "c. They are composed of rigorous command syntaxes.", "correct": false},
    {"text": "d. They are the easiest computer languages to use.", "correct": true}
  ],
  "explanation": "Correct answer is d. They are the easiest computer languages to use."
}
,{
  "question": "For each database,",
  "answers": [
    {"text": "a. There are multiple physical views of data.", "correct": false},
    {"text": "b. There is only one physical view of data.", "correct": true},
    {"text": "c. There are only two logical views of data.", "correct": false},
    {"text": "d. There is only one logical view of data.", "correct": false}
  ],
  "explanation": "Correct answer is b. There is only one physical view of data."
}
,
{
  "question": "____ is one of the forces of the Five Forces Model created by Michael Porter.",
  "answers": [
    {"text": "a. Government regulations", "correct": false},
    {"text": "b. Taxable services", "correct": false},
    {"text": "c. Threat of new entrants", "correct": true},
    {"text": "d. Rivalry among customers", "correct": false}
  ],
  "explanation": "Correct answer is c. Threat of new entrants"
}
,{
  "question": "Which statement is true of gallium arsenide chips?",
  "answers": [
    {"text": "a. They are ideal for mass production.", "correct": false},
    {"text": "b. They were used in third-generation computers.", "correct": false},
    {"text": "c. They have low production costs.", "correct": false},
    {"text": "d. They run at higher speeds than silicon chips.", "correct": true}
  ],
  "explanation": "Correct answer is d. They run at higher speeds than silicon chips."
}
,{
  "question": "Which of the following are two popular data visualization platforms?",
  "answers": [
    {"text": "a. Apache and Cassandra", "correct": false},
    {"text": "b. OLTP and OLAP", "correct": false},
    {"text": "c. Ms Excel and PowerPoint", "correct": false},
    {"text": "d. Power BI and Tableau", "correct": true}
  ],
  "explanation": "Correct answer is d. Power BI and Tableau"
}
,

{
  "question": "Customers, competitors, and suppliers are examples of internal data sources of an information system.",
  "answers": [
    {"text": "True", "correct": false},
    {"text": "False", "correct": true}
  ],
  "explanation": "Correct answer is 'False'"
}
,
{
  "question": "In object-oriented programming, a class __________.",
  "answers": [
    {"text": "a. Is an item that contains data and the procedures that read and manipulate it", "correct": false},
    {"text": "b. Uses a series of short codes to represent data or instructions", "correct": false},
    {"text": "c. Controls and prioritizes tasks performed by the CPU", "correct": false},
    {"text": "d. Defines the format of an object", "correct": true}
  ],
  "explanation": "Correct answer is d. Defines the format of an object"
}
,{
  "question": "In the context of the types of data in a database, which is a source of external data?",
  "answers": [
    {"text": "a. Personnel records", "correct": false},
    {"text": "b. Transaction records", "correct": false},
    {"text": "c. Tax records", "correct": true},
    {"text": "d. Sales records", "correct": false}
  ],
  "explanation": "Correct answer is c. Tax records"
}
,
{
  "question": "Business intelligence (BI) uses scorecards and dashboards to support decision-making activities, whereas business analytics (BA) uses data mining tools and predictive modeling.",
  "answers": [
    {"text": "True", "correct": true},
    {"text": "False", "correct": false}
  ],
  "explanation": "Correct answer is 'True'"
}
,{
  "question": "A data _____ is a collection of data from a variety of sources used to support decision-making applications and generate business intelligence.",
  "answers": [
    {"text": "a. Mine", "correct": false},
    {"text": "b. Dictionary", "correct": false},
    {"text": "c. Pattern", "correct": false},
    {"text": "d. Warehouse", "correct": true}
  ],
  "explanation": "Correct answer is d. Warehouse"
}
,{
  "question": "In a/an _____ model, each record can have multiple parent and child records.",
  "answers": [
    {"text": "a. Network", "correct": true},
    {"text": "b. Object-oriented", "correct": false},
    {"text": "c. Relational", "correct": false},
    {"text": "d. Hierarchical", "correct": false}
  ],
  "explanation": "Correct answer is a. Network"
}
,{
  "question": "In the context of IT jobs in the information systems field, a ____ designs and maintains an organization’s Web site.",
  "answers": [
    {"text": "a. Web host provider", "correct": false},
    {"text": "b. Web developer", "correct": false},
    {"text": "c. Webmaster", "correct": true},
    {"text": "d. Web designer", "correct": false}
  ],
  "explanation": "Correct answer is c. Webmaster"
}
,
{
  "question": "In network-attached storage (NAS), as the number of users increases, its performance increases.",
  "answers": [
    {"text": "True", "correct": false},
    {"text": "False", "correct": true}
  ],
  "explanation": "Correct answer is 'False'"
}
,{
  "question": "An object code must be translated into source code for a computer to read and execute it.",
  "answers": [
    {"text": "True", "correct": false},
    {"text": "False", "correct": true}
  ],
  "explanation": "Correct answer is 'False'"
},
{
  "question": "A/an _____ is a type of server that stores computer software, which users can access from their workstations.",
  "answers": [
    {"text": "a. Application server", "correct": true},
    {"text": "b. Database server", "correct": false},
    {"text": "c. File server", "correct": false},
    {"text": "d. Web server", "correct": false}
  ],
  "explanation": "Correct answer is a. Application server"
}


]