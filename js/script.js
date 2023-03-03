const time = document.querySelector("#Timer");
let TimeSecond = 5;
time.textContent = `00:${TimeSecond}`;

const countDown = setInterval (()=>{
  TimeSecond --;
  time.textContent = `${TimeSecond}`
  if (TimeSecond <= 0||TimeSecond < 1){
    clearInterval(countDown);
  }
},1000)

