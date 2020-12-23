var startBtn = document.getElementById("startBtn");
var time = document.getElementById("time");
startBtn.addEventListener('click', startTimer);

var img = document.getElementById('img');
var uploadBtn = document.getElementById('uploadBtn');
var imgBox = document.getElementById("image");
var boxA  = document.getElementById("boxA");
var baxB  = document.getElementById("boxB");
uploadBtn.disabled = 'disabled';
uploadBtn.addEventListener('click', addImg);
imgBox.setAttribute("ondrop", "drop(event)");
boxA.setAttribute("ondrop", "drop(event)");
baxB.setAttribute("ondrop", "drop(event)");
imgBox.setAttribute("ondragover", "allowDrop(event)");
boxA.setAttribute("ondragover", "allowDrop(event)");
baxB.setAttribute("ondragover", "allowDrop(event)");

sessionStorage.setItem("A", 0);
sessionStorage.setItem("B", 0);

function timeCount(i) {
  i++;
  time.innerHTML = i;
  if (i == 6) {
    endAction();
  }
  return i;
}

function startTimer() {
  startBtn.disabled = 'disabled';
  uploadBtn.disabled = false;
  var i = 1;
  var timer = setInterval(timeCount, 1000);
  function timeCount() {
    time.innerHTML = i;
    i++;
    if (i >= 6) {
      endAction();
      clearInterval(timer);
    }
  }
}

function endAction() {
  setSessionStorage();
  alertCount();
}

function addImg() {
  var imgObj = findImg(img.value);
  imgBox.appendChild(imgObj);
}

function findImg(ImgSrc) {
  let fileName = /(.*?)\\(\w+)\.(jpg|jpeg|png|JPG|JPEG|PNG)$/;
  var imgObj = document.createElement("img");
  imgObj.setAttribute("src", ImgSrc.replace(fileName, './img/$2.$3'));
  imgObj.setAttribute("dragable", "true");
  imgObj.setAttribute("height", "100px");
  imgObj.setAttribute("id", ImgSrc.replace(fileName, '$2'));
  imgObj.setAttribute("ondragstart", "drag(event)");
  return imgObj
}

function setSessionStorage() {
  sessionStorage.setItem("A", boxA.children.length);
  sessionStorage.setItem("B", boxA.children.length);
}

function alertCount() {
  var msg = "A 장바구니 :" + sessionStorage.getItem("A") + " B 장바구니 :" + sessionStorage.getItem("B");
  alert(msg);
  time.innerHTML = "";
  startBtn.disabled = false;
  uploadBtn.disabled = "disabled";
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id)
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}