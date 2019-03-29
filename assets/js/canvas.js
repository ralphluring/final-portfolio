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
    console.log(response.data.current_condition[0].weatherIconUrl[0].value);
    renderData(response.data.current_condition[0].temp_F,response.data.current_condition[0].weatherIconUrl[0].value);
  });
}

function renderData(temp,icon){
  let canvas = document.querySelector('.canvas2');
  let ctx = canvas.getContext('2d');
  make_base();

  function make_base()
  {
    base_image = new Image();
    base_image.src = icon;
    base_image.id = "icon-class";
    base_image.onload = function(){
      ctx.drawImage(base_image, 0, 50);
    }

    console.log(base_image);
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
    let now = moment().format("H:mm");
    let am = moment().format("A");
    let today = moment().format("dd");
    let day = moment().format("D");
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
    ctx.arc(150,150,100,degToRad(270),degToRad((hours*15)-90));
    ctx.stroke();

    // minutes
    ctx.beginPath();
    ctx.arc(150,150,80,degToRad(270),degToRad((minutes*6)-90));
    ctx.stroke();

    // seconds
    ctx.beginPath();
    ctx.arc(150,150,60,degToRad(270),degToRad((newSeconds*6)-90));
    ctx.stroke();
    
    // month
    let monthDistance = (260/12)  * month;
    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.lineTo(monthDistance,20)
    ctx.stroke();
    ctx.font = "25px Arial";
    ctx.fillStyle = '#9EBBC4';
    ctx.fillText(monthText,monthDistance + 10,30);
  // day
    let dayDistance = 260/daysInMonth;
    ctx.beginPath();
    ctx.moveTo(10,270);
    ctx.lineTo((dayDistance * day),270)
    ctx.stroke();
    ctx.font = "25px Arial";
    ctx.fillStyle = '#9EBBC4';
    ctx.fillText(day,(dayDistance * day +10),275);

    ctx.font = "12px Arial";
    ctx.fillText(seconds,145,130);
    ctx.fillText(now,140,180);
    ctx.font = "25px Arial";
    ctx.fillStyle = '#FFBE8F';
    ctx.fillText(am,250,30);
    // date
    ctx.font = "25px Arial";
    ctx.fillStyle = '#9EBBC4';
    ctx.fillText(today,135,160);
}





setInterval(renderTime,40);



