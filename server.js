const express = require('express');
const app = express();
const path = require('path');

const words = ["こんにちは", "ありがとう", "さようなら", "おはよう", "こんばんは"]; // Adicione mais palavras/frases aqui

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/random-word', (req, res) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    res.json({ word: randomWord });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

