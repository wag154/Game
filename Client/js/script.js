const time = document.querySelector("#Timer");
const formInput = document.querySelector("#inputSection")
const formDisplay = document.querySelector("#difficultySection")
var display = document.querySelector("#Words")
var Words = ["hello","the","end","world","word","blue"];
var correctWordCount = 0;
var TimerUp = false;

var TimeSecond = 60;

const turnArrToString = (words) =>{
  let temp = "";
  words.forEach((word) =>{
    temp += `${word} ` ;
  })
  return temp
}
const randomWord = () =>{
  console.log("Random called")
  clockCall()
  const wordList = turnArrToString(Words)
  display.textContent = wordLists;
}

const easyWords = () =>{
  clockCall()
   const words = GetWords(`Easy`);
   const wordList = turnArrToString(words)
   display.textContent =wordList;
}
const mediumWords = () =>{
  clockCall()
  const words = GetWords(`medium`)
  turnArrToString(words)
  display.textContent =wordList;
}

const hardWords = () => {
  clockCall()
  const words =GetWords(`hard`)
  turnArrToString(words)
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


  const countDown = setInterval (()=>{
    TimeSecond --;
    time.textContent = `${TimeSecond} Seconds`
    if (TimeSecond == 0){
      TimerUp = true;
      time.textContent = "TIME UP!"
      clearInterval(countDown);
    }
  },1000)
  
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