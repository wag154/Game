const time = document.querySelector("#Timer");
const formInput = document.querySelector("#inputSection")
const formDisplay = document.querySelector("#difficultySection")
var display = document.querySelector("#Words")
var Words = ["hello","the","end","world","word","blue"];
var correctWordCount = 0;
var TimerUp = false;
var TimeSecond = 60;
var countDown = undefined;

const turnArrToString = (words) =>{
  let temp = "";
  words.forEach((word) =>{
    temp += `${word} ` ;
  })
  return temp
}
function clock (){

  countDown = setInterval (()=>{
    TimeSecond --;
    time.textContent = `${TimeSecond} Seconds`
    if (TimeSecond == 0){
      TimerUp = true;
      time.textContent = "TIME UP!"
      clearInterval(countDown);
    }
  },1000)
}
const randomWord = () =>{
  console.log("Random called")
  clock()
  const wordList = turnArrToString(Words)
  display.textContent = wordList;
}

const easyWords = () =>{
   clock()
  Words =GetWords(`easy`)
  const wordList = turnArrToString(Words)
   display.textContent =wordList;
}
const mediumWords = () =>{
  clock()
 Words =GetWords(`medium`)
  const wordList = turnArrToString(Words)
  display.textContent =wordList;
}

const hardWords = () => {
  clock()
  Words =GetWords(`hard`)
  const wordList = turnArrToString(Words)
  display.textContent =wordList;
}

const displayWords = (words) =>{
  let temp = "";
  words.forEach((word) =>{
    temp += word
  })
  display.textContent = temp
}
const CheckWords = (words) =>{
  words += " "
  let wordsArr = [];
  let word = "";

  for (let i = 0; i < words.length;i++){
    if (words[i] != " "){
      word += words[i].toLowerCase();
    }
    
    else {
      wordsArr.push(word);
      word = "";
    }
  }
  for (let i =0 ; i < words.length;i++){
    Words.forEach((word) => {
      if (wordsArr[i] == word){
        correctWordCount ++;
      }
    })
  }
  display.textContent = `You got ${correctWordCount} correct!`;
}
    
const TimerOver = (e)=>{
  e.preventDefault()
  if (TimeSecond <= 0){
    display.textContent = "You Entered After the time was up!"
  }
  else {
    clearInterval(countDown)
    CheckWords(e.target.typing.value)
    timeTaken()
    e.target.typing.value = "";
  }

}
async function GetWords (Difficulty) {
  try {
    const resp = await fetch(`127.0.0.1:3000/${Difficulty}`)
    if (resp.ok){
      const data = await resp.json()
      return data;
    }
    else {
     const wordDis = turnArrToString(Words)
     display.textContent = wordDis;

      throw "Error status code :" + resp.status;
    }
  }
  catch{((e)=> console.log(e))}
}

 function timeTaken(){
  const taken = 60 - TimeSecond;
  time.textContent = `You Manged to do ${correctWordCount} in ${taken} seconds!`
}

formInput.addEventListener("submit",TimerOver)
formDisplay.addEventListener("easy",easyWords)
formDisplay.addEventListener("medium",mediumWords)
formDisplay.addEventListener("hard",hardWords)
formDisplay.addEventListener("random",randomWord)