const words = [
    { japanese: "こんにちは", translation: "Olá", romaji: "Konnichiwa" },
    { japanese: "ありがとう", translation: "Obrigado", romaji: "Arigatou" },
    { japanese: "さようなら", translation: "Adeus", romaji: "Sayounara" },
    { japanese: "おはよう", translation: "Bom dia", romaji: "Ohayou" },
    { japanese: "こんばんは", translation: "Boa noite", romaji: "Konbanwa" },
    { japanese: "元気ですか", translation: "Como você está?", romaji: "Genki desu ka?" },
    { japanese: "食べ物", translation: "Comida", romaji: "Tabemono" },
    { japanese: "犬", translation: "Cachorro", romaji: "Inu" },
    { japanese: "猫", translation: "Gato", romaji: "Neko" },
    { japanese: "学校", translation: "Escola", romaji: "Gakkou" },
    { japanese: "電話", translation: "Telefone", romaji: "Denwa" },
    { japanese: "家", translation: "Casa", romaji: "Ie" },
    { japanese: "本", translation: "Livro", romaji: "Hon" },
    { japanese: "車", translation: "Carro", romaji: "Kuruma" },
    { japanese: "電車", translation: "Trem", romaji: "Densha" },
    { japanese: "駅", translation: "Estação", romaji: "Eki" },
    { japanese: "空港", translation: "Aeroporto", romaji: "Kuukou" },
    { japanese: "美味しい", translation: "Delicioso", romaji: "Oishii" },
    { japanese: "飲み物", translation: "Bebida", romaji: "Nomimono" },
    { japanese: "友達", translation: "Amigo", romaji: "Tomodachi" },
    { japanese: "はい", translation: "Sim", romaji: "Hai" },
    { japanese: "いいえ", translation: "Não", romaji: "Iie" },
    { japanese: "お願いします", translation: "Por favor", romaji: "Onegaishimasu" },
    { japanese: "どうもありがとうございます", translation: "Muito obrigado", romaji: "Doumo arigatou gozaimasu" },
    { japanese: "すみません", translation: "Desculpe", romaji: "Sumimasen" },
    { japanese: "おはようございます", translation: "Bom dia (formal)", romaji: "Ohayou gozaimasu" },
    { japanese: "おやすみなさい", translation: "Boa noite (ao ir dormir)", romaji: "Oyasumi nasai" },
    { japanese: "おめでとうございます", translation: "Parabéns", romaji: "Omedetou gozaimasu" },
    { japanese: "おはしをお使いください", translation: "Por favor, use hashi (palitinhos)", romaji: "Ohashi o otsukai kudasai" },
    { japanese: "いってきます", translation: "Estou saindo (vou e volto)", romaji: "Ittekimasu" },
    { japanese: "ただいま", translation: "Cheguei (de volta)", romaji: "Tadaima" },
    { japanese: "いただきます", translation: "Vou comer (antes das refeições)", romaji: "Itadakimasu" },
    { japanese: "ごちそうさまでした", translation: "Obrigado pela refeição", romaji: "Gochisousama deshita" },
    { japanese: "かんぱい", translation: "Brinde!", romaji: "Kanpai!" },
    { japanese: "お誕生日おめでとうございます", translation: "Feliz aniversário", romaji: "Otanjoubi omedetou gozaimasu" }
];
const wordDisplay = document.getElementById('wordDisplay');
const translationInput = document.getElementById('translationInput');
const checkButton = document.getElementById('checkButton');
const nextButton = document.getElementById('nextButton');
const resultMessage = document.getElementById('resultMessage');
const correctTranslation = document.getElementById('correctTranslation');
const romajiDisplay = document.getElementById('romajiDisplay');
const speakButton = document.getElementById('speakButton');

let currentWordIndex = -1;

function getRandomWord() {
    let newIndex = currentWordIndex;
    while (newIndex === currentWordIndex) {
        newIndex = Math.floor(Math.random() * words.length);
    }
    currentWordIndex = newIndex;
    return words[currentWordIndex];
}

function speakJapanese(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    speechSynthesis.speak(utterance);
}

function displayRandomWord() {
    const { japanese, romaji } = getRandomWord();
    wordDisplay.textContent = japanese;
    romajiDisplay.textContent = `(${romaji})`; // Exibe o romaji
    translationInput.value = ''; // Limpa o campo de entrada
    resultMessage.textContent = ''; // Limpa a mensagem de resultado
    correctTranslation.textContent = ''; // Limpa a tradução correta
}

function checkAndProceed() {
    checkTranslation();
    if (resultMessage.textContent === 'Correto! A tradução está certa.') {
        const audio = new Audio('plim.mp3'); // Som de confirmação
        audio.play().then(() => {
            displayRandomWord(); // Passa para a próxima palavra/frase após a reprodução do áudio
        });
    }
}

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function checkTranslation() {
    const { translation } = words[currentWordIndex];
    const userTranslation = removeAccents(translationInput.value.trim().toLowerCase());
    const correctTranslationNormalized = removeAccents(translation.toLowerCase());
    
    if (userTranslation === '') {
        resultMessage.textContent = 'Por favor, digite a tradução em português.';
        correctTranslation.textContent = ''; // Limpa a tradução correta se o campo de entrada estiver vazio
        return;
    }
    
    if (userTranslation === correctTranslationNormalized) {
        resultMessage.textContent = 'Correto! A tradução está certa.';
        correctTranslation.textContent = ''; // Limpa a tradução correta se a tradução estiver correta
    } else {
        resultMessage.textContent = 'Incorreto. Tente novamente.';
        correctTranslation.textContent = 'A tradução correta é: ' + translation; // Exibe a tradução correta
    }
}


checkButton.addEventListener('click', checkAndProceed);
nextButton.addEventListener('click', displayRandomWord);
speakButton.addEventListener('click', () => speakJapanese(wordDisplay.textContent));

// Adiciona event listener para a tecla "Enter"
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que o formulário seja enviado
        checkAndProceed(); // Chama a função para verificar a tradução e proceder
    }
});

// Exibe uma palavra aleatória ao carregar a página
displayRandomWord();
