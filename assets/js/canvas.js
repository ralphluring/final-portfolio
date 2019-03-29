let key = "e090cc75be534474951105108192603";
let date = "today";
let queryURL = "";
// canvas defualts 
let canvas = document.querySelector('.canvas1');
let ctx = canvas.getContext('2d');
ctx.strokeStyle = '#FFC88F';
ctx.lineWidth = 8;
ctx.lineCap = 'round';
// convert degree to radian
function degToRad(deg){
  let factor = Math.PI/180;
  return deg * factor;
}

navigator.geolocation.getCurrentPosition(success);

function success(pos) {
  var crd = pos.coords;
  queryURL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${key}&q=${crd.latitude},${crd.longitude}&date=${date}&format=json`;
  getWeather(queryURL);
}

function getWeather(queryURL){
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.data.weather[0].astronomy[0]);
    renderData(response.data.current_condition[0].temp_F,response.data.weather[0].astronomy[0].moon_phase);
  });
}

function renderData(temp,icon){
  console.log(icon);
  let canvas = document.querySelector('.canvas2');
  let ctx = canvas.getContext('2d');

 
  if(icon === "Last Quarter"){
    let img = new Image();
    img.src = "./assets/images/lastquarter.svg";
    img.onload = function () {
      ctx.drawImage(img, 260, 70,30,30);
    }
    
  }

  ctx.font = "25px Arial";
  if(temp < 50){
    ctx.fillStyle = 'white';
  }else if(temp > 50 && temp < 80){
    ctx.fillStyle = 'blue';
  }else{
    ctx.fillStyle = 'red';
  }

  ctx.fillText(temp + " F",240,60);
  console.log(temp)
}




function renderTime(){
    let now = moment().format("h:mm:ss");
    let am = moment().format("A");
    let today = moment().format("dd");
    let day = moment().format("D");
    let dateformat = moment().day()
    let month = moment().get('month');
    let monthText = moment().format("MMM");
    let hours = moment().hour();
    let minutes = moment().minutes();
    let seconds = moment().seconds();
    let milseconds = moment().millisecond();
    let newSeconds = seconds + (milseconds/1000);
    let daysInMonth = moment().daysInMonth();

    // background
    ctx.fillStyle = '#B26009';
    ctx.fillRect(0,0,300,300);

    // hours
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.arc(150,130,80,degToRad(270),degToRad((hours*15)-90));
    ctx.stroke();

    // minutes
    ctx.beginPath();
    ctx.arc(150,130,60,degToRad(270),degToRad((minutes*6)-90));
    ctx.stroke();

    // seconds
    ctx.beginPath();
    ctx.arc(150,130,40,degToRad(270),degToRad((newSeconds*6)-90));
    ctx.stroke();
    
    // month
    let monthDistance = (260/12)  * month;
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(20,270);
    ctx.lineTo(monthDistance,270)
    ctx.stroke();
    ctx.font = "12px Arial";
    ctx.fillStyle = '#9EBBC4';
    ctx.fillText(monthText,monthDistance + 10,273);
  // day
    let dayDistance = 260/daysInMonth;
    ctx.beginPath();
    ctx.moveTo(20,290);
    ctx.lineTo((dayDistance * day),290)
    ctx.stroke();
    ctx.font = "25px Arial";
    ctx.fillStyle = '#9EBBC4';
    ctx.font = "12px Arial";
    ctx.fillText(day,(dayDistance * day +10),292);
    ctx.font = "25px Arial";
    ctx.fillStyle = '#FFBE8F';
    ctx.fillText(am,250,30);
    // date
    let dateDistance = 260/7;
    console.log(dateformat);
    ctx.beginPath();
    ctx.moveTo(20,250);
    ctx.lineTo((dateDistance * dateformat),250)
    ctx.stroke();
    ctx.font = "25px Arial";
    ctx.fillStyle = '#9EBBC4';
    ctx.font = "12px Arial";
    ctx.fillText(today,(dateDistance * dateformat +5),253);

    ctx.font = "12px Arial";
    ctx.fillText(now,130,132);
    ctx.font = "25px Arial";
    ctx.fillStyle = '#FFBE8F';
    ctx.fillText(am,250,30);
    ctx.font = "25px Arial";
    
}





setInterval(renderTime,40);



