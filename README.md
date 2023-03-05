# P3-TriviaAttempt
Este es un intento de hacer un juego de trivia a partir de la API REST de OpenTrivia DB.

## Llamadas a la API
La API genera las preguntas de una en una, de manera que cada vez que se actualiza la pregunta en pantalla es por medio de una nueva llamada a la API. <br>
Los parámetros elegidos para generar la API han sido:
- Número de preguntas: 1
- Dificultad: Todas
- Categoría: Todas
- Tipo: Multiple choice
- Encoding: Default encoding

## Display
Se tiene la puntuación obtenida hasta el momento, junto con la categoría de la pregunta y la pregunta en sí. <br>
Luego se tiene el display de posibles opciones. <br>
En la zona inferior se tienen dos botones: Next Question (para pasar a la siguiente pregunta) y Play Again (para reiniciar el juego).

## COMPROBACIÓN
La comprobación de la repuesta se realiza cuando el usuario hace click sobre uno de los botones de respuesta. <br>
El botón elegido se marca de color azul oscuro, para dejar constancia de cuál ha sido la respuesta elegida. <br>
Si la respuesta elegida ha sido correcta nos salta un mensaje: "This is CORRECT!". <br>
Si la respuesta elegida ha sido incorrecta, nos salta el mensaje: "This is INCORRECT. The correct answer is _correctAnswer_". <br>
Al hacer click sobre "Next Question" se actualiza el contador de puntos.
 
### PROBLEMAS
Los siguientes problemas son cuestiones que **no se han abordado por el momento**:
Al hacer click sobre un botón no se desactivan los demás, por lo que el usuario podrá seleccionar la respuesta correcta una vez que el mensaje le haya indicado cuál es.<br> Además, si se pulsa más de un botón los demás también se marcarán de azul oscuro.
