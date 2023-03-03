
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const jsonData = require("./data.json");
const internal = require("stream");

const addLettersToEmptyString = (indexOfSpaceBeforeWord, indexOfSpaceAfterWord, newWordArr, wordArr) => {
    let pushCounter = indexOfSpaceBeforeWord+1;
    while (pushCounter != indexOfSpaceAfterWord-1) {
        newWordArr += wordArr[0][pushCounter];
        pushCounter += 1;
    }
    newWordArr += " ";
    return newWordArr;
}

const getRandomWords = (difficultyNumber, wordArr, newWordArr) => {
    let randomNumber = Math.floor(Math.random()*difficultyNumber)+1;
    let indexOfSpaceBeforeWord;
    let indexOfSpaceAfterWord;
    if (randomNumber == 1) {
        indexOfSpaceBeforeWord = -1;
    }

    for (let iterator = 0; iterator < difficultyNumber; iterator++) {
        let spacesCounter = 0;
        for (let letterIndex = 0; letterIndex < wordArr[0].length; letterIndex++) {
            if (wordArr[0][letterIndex] == " ") {
                spacesCounter += 1;
                if (spacesCounter == randomNumber) {
                    indexOfSpaceBeforeWord = letterIndex;
                    letterIndex += 1
                } 
            }
            else if (spacesCounter == randomNumber+1) {
                indexOfSpaceAfterWord = letterIndex;
                break;
            }
        }
        randomNumber = Math.floor(Math.random()*difficultyNumber)+1;

        newWordArr = addLettersToEmptyString(indexOfSpaceBeforeWord, indexOfSpaceAfterWord, newWordArr, wordArr);
    }
    return newWordArr;
}

const getWords = (difficultyNumber, res) => {
    let wordArr = [];
    wordArr.push(jsonData[0].text)
    let newWord = "";
    let newWordArr = [];

    newWord = getRandomWords(difficultyNumber, wordArr, newWord);
    newWordArr.push(newWord);

    res.send(newWordArr)
}

app.get('/easy', (req, res) => {
    getWords(5, res)
})

app.get('/medium', (req, res) => {
    getWords(10, res)
})

app.get('/hard', (req, res) => {
    getWords(15, res)
})

module.exports = app;
