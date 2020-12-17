let seconds = [];
let minutes = [];
let hours = [];
let days = [];
const arrayLength = 7;

let sec_SubStr = [];
let min_SubStr = [];
let hour_SubStr = [];

let hours_class, minutes_class, seconds_class;
let sec, min, hour, day;

function createClock() {
  sec = new Date().getSeconds();
  min = new Date().getMinutes();
  hour = new Date().getHours();
  day = new Date().getDate();
  hours_class = document.getElementsByClassName("hours");
  minutes_class = document.getElementsByClassName("minutes");
  seconds_class = document.getElementsByClassName("seconds");
  for (let i = 0; i < 60; i ++){
    seconds[i] = i;
  }
  for (let i = 0; i < 60; i ++){
    minutes[i] = i;
  }
  for (let i = 0; i < 24; i ++){
    hours[i] = i;
  }
  for (let i = 0; i < 365; i ++){
    days[i] = i;
  }

  updateClock();
}

$(document).ready(function(){
  createClock();
  loop();
  //let test = hours_class[0].childNodes;
});

var interval = setInterval(updateClock, 1000);

function setSubArrayForDate(parentArray, nowValue){
  let substring = [];
  for (let i = 0; i < arrayLength; i ++){

    let inf;
    let shiftedNow = nowValue-Math.floor(arrayLength/2);

    if (shiftedNow+i >= parentArray.length){
      inf = shiftedNow+i-parentArray.length;

    } else {
      if (shiftedNow+i < 0) {
        inf = parentArray.length+shiftedNow+i;
      } else {
        inf = shiftedNow+i;
      }
    }
    substring[i] = inf;
  }

  return substring;
}

function setHtmlContent(substr, className){
  let middle = Math.floor(substr.length/2);
  for (let i = 0; i < substr.length; i++)
  {
    var h1Tag;
    if ($(className)[0].childNodes[i] == null){
      h1Tag = document.createElement('H1');
      let opacity = (middle - Math.abs(middle - i));
      opacity = opacity==0?.1:opacity/middle;
      h1Tag.setAttribute("style", "opacity: "+opacity+"; -webkit-filter: blur(" + Math.abs(middle - i)*2 + "px);");
      $(className).prepend(h1Tag);
    } else {
      h1Tag = $(className)[0].childNodes[substr.length-1-i];
    }

    h1Tag.innerHTML = twoDig(substr[i]);
  }
}

function loop(){
  requestAnimationFrame(loop);
}

function interval() {
  updateClock();
}

function updateClock() {
  sec = new Date().getSeconds();
  min = new Date().getMinutes();
  hour = new Date().getHours();
  day = new Date().getDate();

  sec_SubStr = setSubArrayForDate(seconds, sec);
  min_SubStr = setSubArrayForDate(minutes, min);
  hour_SubStr = setSubArrayForDate(hours, hour);

  setHtmlContent(sec_SubStr, seconds_class);
  setHtmlContent(min_SubStr, minutes_class);
  setHtmlContent(hour_SubStr, hours_class);

}

function twoDig(n){
    return n > 9 ? "" + n: "0" + n;
}
