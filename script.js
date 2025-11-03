// 1. VARIÁVEIS GLOBAIS
// Gera um número aleatório entre 1 e 100.
let randomNumber = Math.floor(Math.random() * 100) + 1;
#
// Referências aos elementos HTML
const guesses = document.getElementById('guesses');
const lastResult = document.getElementById('lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.getElementById('submitGuess');
const guessField = document.getElementById('guessField');
const container = document.querySelector('.container');

let guessCount = 1;
let resetButton; // Variável para o botão de reinício, a ser criado mais tarde

// 2. FUNÇÃO PRINCIPAL: Verifica o palpite do utilizador
function checkGuess() {
  // Converte o valor do input para um número inteiro
  const userGuess = Number(guessField.value); 

  // Se for o primeiro palpite, inicializa a lista de palpites
  if (guessCount === 1) {
    guesses.textContent = 'Palpites: ';
  }

  // Adiciona o palpite atual à lista
  guesses.textContent += userGuess + ' ';

  // Lógica principal do jogo
  if (userGuess === randomNumber) {
    // Venceu!
    lastResult.textContent = 'Parabéns! Acertou no número!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    container.classList.add('win'); // Adiciona o estilo de vitória
    setGameOver();
  } else if (guessCount === 10) {
    // Perdeu! (10 tentativas)
    lastResult.textContent = '!!! FIM DE JOGO !!!';
    lowOrHi.textContent = `O número secreto era: ${randomNumber}`;
    setGameOver();
  } else {
    // Palpite errado, dá feedback
    lastResult.textContent = 'Errado!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'O último palpite foi muito baixo!';
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = 'O último palpite foi muito alto!';
    }
  }

  // Prepara para a próxima tentativa
  guessCount++;
  guessField.value = ''; // Limpa o campo de input
  guessField.focus(); // Coloca o cursor no campo de input
}

// 3. EVENT LISTENER: Chama a função principal quando o botão é clicado
guessSubmit.addEventListener('click', checkGuess);

// 4. FUNÇÃO DE FIM DE JOGO
function setGameOver() {
  guessField.disabled = true; // Desativa o campo de input
  guessSubmit.disabled = true; // Desativa o botão de submissão

  // Cria e configura o botão de Reiniciar
  resetButton = document.createElement('button');
  resetButton.textContent = 'Iniciar Novo Jogo';
  document.querySelector('.container').appendChild(resetButton);
  
  // Liga a função de reinício ao novo botão
  resetButton.addEventListener('click', resetGame);
}

// 5. FUNÇÃO DE REINICIAR O JOGO
function resetGame() {
  guessCount = 1; // Reinicia o contador
  
  // Limpa o feedback visual
  const resetParas = document.querySelectorAll('.result-area p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }

  // Remove o botão de reiniciar e o estilo de vitória
  resetButton.parentNode.removeChild(resetButton);
  container.classList.remove('win');
  
  // Reativa os elementos
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  // Reinicia o número aleatório e o fundo do resultado
  lastResult.style.backgroundColor = 'transparent';
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
