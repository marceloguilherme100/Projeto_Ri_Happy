const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 30, 
        lives: 3,
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    },
};

function countDown() {
    if (state.values.currentTime > 0) {
        state.values.currentTime--; // Diminui o tempo
        state.view.timeLeft.textContent = state.values.currentTime;
    }

    if (state.values.currentTime <= 0 && state.values.lives > 0) {
        // Reduz uma vida quando o tempo chega a 0
        state.values.lives--;
        state.view.lives.textContent = `x${state.values.lives}`; // Atualiza a quantidade de vidas na tela

        // Se ainda houver vidas, reinicia o tempo
        if (state.values.lives > 0) {
            state.values.currentTime = 30; // Resetando o tempo para 60 segundos
        } else {
            // Se não houver mais vidas, finaliza o jogo
            clearInterval(state.actions.timerId);
            clearInterval(state.actions.countDownTimerId);
            alert("Game Over! O seu resultado foi: " + state.values.result);
            playSound("gameover");
        }
    }
}

function playSound(audioName) {
    let audio = new Audio(`./audios/${audioName}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("pontos");
            }
        });
    });
}

function initialize() {
    addListenerHitBox();
    state.view.lives.textContent = `x${state.values.lives}`; // Exibe o número inicial de vidas
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity); // Gera o quadrado aleatório
    state.actions.countDownTimerId = setInterval(countDown, 1000); // Chama o contador a cada 1 segundo
}

initialize();
