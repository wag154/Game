const time = document.querySelector("#Timer");
const DisplayWords = document.querySelector("#Words")
const form = document.querySelector("#Dis")
var display = document.querySelector("#TextDisplay")
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

const easyWords = () =>{
   const words = GetWords(`Easy`);
   const wordList = turnArrToString(words)
   display.textContent =wordList;
}
const mediumWords = () =>{
  const words = GetWords(`medium`)
  turnArrToString(words)
  display.textContent =wordList;
}

const hardWords = () => {
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
      console.log(word)
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
    CheckWords(e.target.TextInput.value)
    timeTaken()
    e.target.TextInput.value = "";
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

form.addEventListener("submit",TimerOver)
form.addEventListener("easy",easyWords)
form.addEventListener("medium",mediumWords)
form.addEventListener("hard",hardWords)