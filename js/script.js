const time = document.querySelector("#Timer");
const DisplayWords = document.querySelector("#Words")
const form = document.querySelector("#Dis")
var display = document.querySelector("#TextDisplay")
var Words = ["hello","the","end","world","word","blue"];

var TimerUp = false;

var TimeSecond = 60;

const turnArrToString = (words) =>{
  let temp = "";
  words.forEach((word) =>{
    temp += word;
  })
  return temp
}

const easyWords = () =>{
   const words = GetWords(`Easy`);
   turnArrToString(words)
}
const mediumWords = () =>{
  const words = GetWords(`medium`)
  turnArrToString(words)
}

const hardWords = () => {
  const words =GetWords(`hard`)
  turnArrToString(words)
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
  let correctWordCount = 0;

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
    e.target.TextInput.value = "";
  }

}
async function GetWords (Difficulty) {
  try {
    const resp = await fetch(`127.0.0.1:3000/Get${Difficulty}Words`)
    if (resp.ok){
      const data = await resp.json()
    }
    else {
      throw "Error status code :",resp.status;
    }
  }
  catch{((e)=> console.log(e))}
}

async function timeTaken(Complete){
  
}

form.addEventListener("submit",TimerOver)
form.addEventListener("easy",easyWords)
form.addEventListener("medium",mediumWords)
form.addEventListener("hard",hardWords)