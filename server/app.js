
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const jsonData = require("./data.json");
const internal = require("stream");

const getWords = (difficultyNumber, res) => {
    let wordArr = [];
    wordArr.push(jsonData[0].text)
    let newWordArr;

    let randomNumber = Math.floor(Math.random()*difficultyNumber)+1;
    randomNumber = 2
    if (randomNumber == 1) {
        indexOfSpaceBeforeWord = -1;
    }
    let indexOfSpaceBeforeWord;
    let indexOfSpaceAfterWord;
    console.log(randomNumber)

    for (let iterator = 0; iterator < difficultyNumber; iterator++) {
        console.log("iterator", iterator)
        for (let letterIndex = 0; letterIndex < wordArr.length; letterIndex++) {
            let counter = 0;
            if (letterIndex == " ") {
                counter += 1;
            }
            if (counter == difficultyNumber-1) {
                indexOfSpaceBeforeWord = letterIndex;
                console.log("count before", counter)
            }
            if (counter == difficultyNumber) {
                indexOfSpaceAfterWord = letterIndex;
                console.log("count after", counter)
                break;
            }
        }
        newWordArr = wordArr.slice(indexOfSpaceBeforeWord+1, indexOfSpaceAfterWord);
        randomNumber = Math.floor(Math.random()*difficultyNumber);
        randomNumber = 2
        console.log("r:", randomNumber)
        console.log("indexes", indexOfSpaceBeforeWord+1, indexOfSpaceAfterWord)
        console.log();
    }
    console.log(newWordArr)
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
