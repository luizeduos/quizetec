let quizzes = document.querySelectorAll('.quiz');
const perguntas = [
    "Você se considera uma pessoa com habilidades de liderança e organização?", // Administração
    "Você gosta de tomar decisões e resolver problemas?", // Administração
    "Você se sente confortável delegando tarefas?", // Administração
    "Você possui um espírito aventureiro e gosta de planejar roteiros? Tem facilidade em lidar com pessoas e as oferecer suporte?", // Agenciamento de Viagem
    "Você gosta de explorar novos lugares e culturas?", // Agenciamento de Viagem
    "Você se sente confortável trabalhando em um ambiente em constante mudança?", // Agenciamento de Viagem
    "Você é uma pessoa empática e cuidadosa, que se preocupa com o bem-estar dos outros?", // Enfermagem
    "Você se sente confortável em situações de emergência?", // Enfermagem
    "Você é capaz de manter a calma sob pressão?", // Enfermagem
    "Você tem habilidades organizacionais, uma mente criativa para gerenciar planejamentos e gosta de lidar com logística e coordenação de equipes?", // Eventos
    "Você gosta de planejar e coordenar atividades?", // Eventos
    "Você é capaz de pensar rapidamente e resolver problemas em tempo real?", // Eventos
    "Você é uma pessoa comunicativa, que gosta de lidar com pessoas e se interessa pelo desenvolvimento e bem-estar dos colaboradores em um ambiente de trabalho?", // Recursos Humanos
    "Você é capaz de lidar com conflitos de maneira eficaz?", // Recursos Humanos
    "Você se sente confortável dando e recebendo feedback?", // Recursos Humanos
    "Você é uma pessoa que se preocupa com a segurança e o bem-estar dos outros e tem interesse em identificar e prevenir riscos ocupacionais?", // Segurança do trabalho
    "Você é capaz de identificar potenciais riscos e perigos?", // Segurança do trabalho
    "Você se sente confortável implementando medidas de segurança?", // Segurança do trabalho
    "Você possui habilidades analíticas, gosta de estudar leis, se interessa por questões jurídicas e tem capacidade de argumentação?", // Serviços Jurídicos
    "Você é capaz de interpretar e aplicar leis e regulamentos?", // Serviços Jurídicos
    "Você se sente confortável defendendo os direitos e interesses de outras pessoas?", // Serviços Jurídicos
    "Você é uma pessoa que aprecia a cultura, as belezas naturais e as atrações turísticas, gosta de compartilhar conhecimentos e proporcionar experiências memoráveis?", // Turismo Receptivo
    "Você gosta de interagir com pessoas de diferentes culturas e origens?", // Turismo Receptivo
    "Você é capaz de fornecer informações claras e precisas sobre atrações turísticas?", // Turismo Receptivo
    "Você possui habilidades e interesse em tecnologia, programação e desenvolvimento de websites?", // Informática para Internet
    "Você é capaz de aprender novas linguagens de programação rapidamente?", // Informática para Internet
    "Você se sente confortável trabalhando em projetos de desenvolvimento de software?" // Informática para Internet
];
let disciplinas = [
    "Administração",
    "Agenciamento de Viagem",
    "Enfermagem",
    "Eventos",
    "Recursos Humanos",
    "Segurança do trabalho",
    "Serviços Jurídicos",
    "Turismo Receptivo",
    "Informática para Internet"
];
let respostasPorDisciplina = new Array(disciplinas.length).fill(0);
let disciplinaAtual = 0;
let perguntasRespondidas = 0;

quizzes.forEach((quiz, index) => {
    let btn = quiz.querySelector('.btn');
    btn.addEventListener('click', () => {
        quiz.classList.toggle('none');
        let nextQuiz = getNextQuiz(quiz);
        if (nextQuiz) {
            nextQuiz.classList.toggle('none');
            updatePergunta(nextQuiz);
        } else {
            calcularPorcentagem();
            let resultElement = document.getElementById('result');
            resultElement.textContent = `Sua área é ${disciplinas[getMaxIndex(respostasPorDisciplina)]}`;
            quizzes.forEach((quiz) => {
                quiz.classList.toggle('none');
            });
        }
    });
});

function getNextQuiz(currentQuiz) {
    let nextQuiz = currentQuiz.nextElementSibling;
    while (nextQuiz) {
        if (nextQuiz.classList.contains('quiz')) {
            return nextQuiz;
        }
        nextQuiz = nextQuiz.nextElementSibling;
    }
    return null;
}

function updatePergunta(quiz) {
    let perguntaElement = quiz.querySelector('#pergunta');
    let respostasElements = quiz.querySelectorAll('.respostas');
    
    // Verifica se perguntaElement existe antes de tentar acessar suas propriedades
    if (perguntaElement) {
        respostasElements.forEach((respostaElement, index) => {
            respostaElement.addEventListener('click', () => {
                // Armazena a resposta
                respostasPorDisciplina[disciplinaAtual] += index + 1;
                perguntasRespondidas += 1;

                // Atualiza a pergunta
                if (perguntasRespondidas % 3 !== 0) {
                    perguntaElement.textContent = perguntas[perguntasRespondidas];
                } else {
                    // Avança para a próxima disciplina
                    disciplinaAtual = (disciplinaAtual + 1) % disciplinas.length;
                    perguntaElement.textContent = perguntas[perguntasRespondidas];
                }
                
                // Verifica se todas as perguntas foram respondidas
                if (perguntasRespondidas === perguntas.length) {
                    let nextQuiz = getNextQuiz(quiz);
                    if (nextQuiz) {
                        // Ocultar a div de quiz atual
                        quiz.classList.add('none');
                
                        // Exibir a próxima div de quiz
                        nextQuiz.classList.remove('none');
                
                        // Atualizar a pergunta na próxima div de quiz
                        updatePergunta(nextQuiz);
                
                        calcularPorcentagem();
                        var resultElement = document.getElementById('result');
                        resultElement.textContent = `Sua área é ${disciplinas[getMaxIndex(respostasPorDisciplina)]}`;

                    }
                }
            });
        });

        perguntaElement.textContent = perguntas[perguntasRespondidas];
    }
}

function calcularPorcentagem() {
    let totalPerguntas = perguntas.length;
    let porcentagens = [];

    for (let i = 0; i < disciplinas.length; i++) {
        let acertos = respostasPorDisciplina[i];
        let porcentagem = (acertos / (totalPerguntas / disciplinas.length)) * 100;
        porcentagens.push(porcentagem.toFixed(2));
    }

    console.log("Porcentagens de acertos por disciplina:");
    for (let i = 0; i < disciplinas.length; i++) {
        console.log(`${disciplinas[i]}: ${porcentagens[i]}%`);
    }

    return porcentagens;
}

function getMaxIndex(array) {
    let max = array[0];
    let maxIndex = 0;

    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
            maxIndex = i;
        }
    }

    return maxIndex;
}

calcularPorcentagem();

// Adicione este código onde você define seus ouvintes de eventos
function reiniciarQuiz() {
    location.reload();
}
