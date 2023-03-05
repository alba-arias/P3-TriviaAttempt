//Nada más abrir la página, hacemos la petición a la API
window.onload = sendApiRequest();

//Aquí extraemos ya nuestros elementos por medio del DOM
//Estos tres serán obtenidos de la API
const _question = document.getElementById("question");
const _answers = document.querySelector(".respuestas");
const _category = document.getElementById("category");
//Este será creado por nosotros
const _result = document.getElementById("resultado");
//Estos son nuestros botones
let _playAgain = document.getElementById("play-again");
let _newQuestion = document.getElementById("new-question");

//Nos permitirá actualizar nuestra puntuacion
let _correctScore = document.getElementById("correctas");

//Contador: número de intentos
let contador = 0;
//Score: Puntuación correcta
let score = 0;

//EVENT LISTENERS a nuestros botones de newQuestion y playAgain
_newQuestion.addEventListener("click", newQuestion);
_playAgain.addEventListener("click", playAgain);

//Peticion asincrona a la API
async function sendApiRequest() {
  //Llamamos a la API
  const APIaddress = `https://opentdb.com/api.php?amount=1`;
  let response = await fetch(`${APIaddress}`);
  //console.log(response);
  //Respuesta de nuestra api
  let info = await response.json();
  console.log(info);

  //La informacion está en RESULTS[0], un array
  //Generamos nuestro "outline" con esta información

  generateTrivia(info.results[0]);
}

function generateTrivia(info) {
  //En estas variables ponemos nuestro correctAnswer
  correctAnswer = info.correct_answer;
  //Aquí las incorrectas
  incorrectAnswer = info.incorrect_answers;
  //Creamos un array
  let answersArray = incorrectAnswer;

  //Disponemos las preguntas de manera aleatoria para que la correcta no esté siempre en el mismo sitio
  answersArray.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)),0, correctAnswer);

  //Ponemos la categoría de la pregunta queremos
  _category.innerHTML = `${info.category}`;
  //Ponemos la pregunta
  _question.innerHTML = `${info.question}`;

  //Ponemos las respuestas en botones clickables
  //MAP: recorremos nuestro array, llamando a cada elemento OPTION y a su índice INDEX
  //El ID del botón será su opción para después evaluar si es correcto o no

  //Al pulsar el botón llamamos a MARKANSWER, pasándol la opción como argumento
  _answers.innerHTML = `${answersArray.map((option, index) =>
        `<button id="${option}" onclick='markAnswer("${option}")'> ${
          index + 1}. ${option} </button> </div> <br>`).join("")}`;
}

//Para seleccionar el botón poniéndole estilo. Una vez seleccionado, verificaremos si es correcta
function markAnswer(option) {
  let markedAnswer = document.getElementById(option);
  markedAnswer.style.backgroundColor = "darkblue";

  //A la función de verificación CHECKANSWER le pasamos el argumento "option"
  checkAnswer(option);
}

function checkAnswer(mensaje) {
  //Si el botón seleccionado es el correcto
  if (mensaje === correctAnswer) {
    //Actualizamos nuestro resultado
    _result.innerHTML = `<h4> <strong> This is CORRECT! </strong> </h4>`;
    //Incrementamos puntuación correcta e intentos
    score++;
    contador++;
  } else {
    _result.innerHTML = `<h4> <strong>This is INCORRECT. </strong> </h4>
        <p> <strong> <i>The correct answer is ${correctAnswer} </i></strong> </p>`;
    //Incrementamos el número de intentos hasta el momento
    contador++;
  }
}

//Función al pulsar el botón NEWQUESTION
function newQuestion() {
  //Si superamos el número de intentos permitidos
  if (contador >= 5) {
    _result.innerHTML = `<h5> <i> Your score is ${score} out of 5. </h5> <h5> Click <strong> PLAY AGAIN </strong> to start over </i></h5>`;
    //Reiniciamos las cuentas
    score = 0;
    contador = 0;
  } else {
    //Hacemos nueva petición a la API, tenemos nueva pregunta
    sendApiRequest();
    _correctScore.innerHTML = `${score}`;
    //Eliminamos el resultado
    _result.innerHTML = ``;
  }
}

//Función al pulsar el botón PLAYAGAIN
function playAgain() {
  //Inicializamos nuestros valores
  score = 0;
  contador = 0;
  //Llamada a la API
  sendApiRequest();
  _correctScore.innerHTML = `${score}`;
  _result.innerHTML = ``;
}
