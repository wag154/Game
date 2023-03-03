const time = document.querySelector("#Timer");
const DisplayWords = document.querySelector("#Words")
const form = document.querySelector("#Dis")

let TimeSecond = 60;

const countDown = setInterval (()=>{
  TimeSecond --;
  time.textContent = `${TimeSecond} Seconds`
  if (TimeSecond <= 0||TimeSecond < 1){
    clearInterval(countDown);
  }
},1000)
const TimerOver = ()=>{
  
}
async function GetWords (Difficulty) {
  try {
    const resp = await fetch(`127.0.0.1:3000/Get${Difficulty}Words`)
    if (resp.ok){
      const data = resp.json()

    }
    else {
      throw "Error status code :",resp.status;
    }
  }
  catch{((e)=> console.log(e))}
}

const ExampleWords = () =>{
  const Words = ["hello","the","end","world","word","blue"];
}

async function timeTaken(Complete){
  
}

form.addEventListener("Submit",TimerOver)