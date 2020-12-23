var select = document.getElementsByName("select");
var selectTable = document.getElementById("selectTable");
select.forEach(btn => {
  btn.addEventListener('click', resetSeatColor);
});

var adult = document.getElementById("adult");
var youth = document.getElementById("youth");
adult.setAttribute('oninput', "this.value=this.value.replace(/[^0-9]/g,'');");
youth.setAttribute('oninput', "this.value=this.value.replace(/[^0-9]/g,'');");

var seats = document.getElementsByName("seats");
var bookBtn = document.getElementById("bookBtn");
var i =0; var j=1
seats.forEach(seat => {
  seat.addEventListener('click', selectSeat);
  seat.setAttribute("id", String.fromCharCode(65+i)+j);
  j++;
  if (j > 10) {
    j = 1;
    i++;
  }
});
bookBtn.addEventListener('click', bookSeat);

var cancelBtn = document.getElementById("cancelBtn");
var booked = document.getElementById("booked");
cancelBtn.addEventListener("click", deletBook);


// 선택한 영화의 이름을 반환하는 함수
function selectedMovie() { 
  var movie = "";
  for (var i = 0; i < 3; i++) {

    if (select[i].checked == true) {
      movie = select[i].value;
      break;
    }
  }
  return movie;
}

function totalCount() {
  return Number(adult.value) + Number(youth.value);
}

function totalCost() {
  return Number(adult.value)*9000 + Number(youth.value)*8000;
}

function checkCount() {
  if (totalCount() <= 0) {
    alert("인원을 1명이상 입력해 주세요.")
    return false;
  }
  return true;
}

function makeGrey(td) {
  td.style.background = "grey";
  td.removeEventListener("click", selectSeat);
  td.addEventListener("click", alertMsg);
}

function makeBlue(td) {
  td.style.background = "blue";
}

function makeRed(td) {
  td.style.background = "red";
  td.removeEventListener("click", selectSeat);
  td.addEventListener("click", alertMsg);
}

function makeGreySeat() {
  seats.forEach(seat => {
    if (seat.innerHTML == "X"){
      makeGrey(seat);
    }
  });
}

function makeAllGrey() {
  seats.forEach(seat => {
    if (!selectedSeat.includes(seat)) {
      if (!bookedSeats[selectedMovie()].includes(seat)) {
        makeGrey(seat);
      }
    }
  });
}

function resetSeatColor() {
  seats.forEach(seat => {
    if (seat.innerHTML == "X"){
      makeGrey(seat);
    } else if (bookedSeats[selectedMovie()].includes(seat)) {
      makeRed(seat);
    } else {
      seat.style.removeProperty('background');
      seat.addEventListener('click', selectSeat);
      seat.removeEventListener("click", alertMsg);
    }
  });
}

function alertMsg() {
  alert("선택할 수 없는 좌석입니다.")
}

function bookMovie() {

}

var title = ['테넷', '반도', '1917'];
var bookedSeats = [[], [], []];
var remainSeats = [50, 50, 50];

function checkRemainSeat() {
  if (totalCount() > remainSeats[Number(selectedMovie())]) {
    alert("인원을 다시 입력해주세요.")
    return false;
  }
  return true;
}

var selectedSeat = []
function selectSeat() {
  if (!checkCount()) {
    return
  }
  if (!checkRemainSeat()) {
    return
  }
  makeBlue(this);
  selectedSeat.push(this);
  this.removeEventListener("click", selectSeat);
  remainSeats[selectedMovie()]--;
  if (totalCount() == selectedSeat.length) {
    makeAllGrey();
  }
}


function bookSeat() {
  if (totalCount() < selectSeat.length) {
    alert("좌석을 모두 선택하여 주세요.")
    return
  }
  var tr = document.createElement("tr");
  var checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");

  var movieTitle = document.createElement("td"); 
  var text = document.createTextNode(title[Number(selectedMovie())]);
  movieTitle.appendChild(text);
  var numberOfSeat = document.createElement("td"); 
  text = document.createTextNode(selectSeat.length);
  numberOfSeat.appendChild(text);
  var bookSeats = document.createElement("td");
  text = "";
  
  selectedSeat.forEach(seat=> {
    makeRed(seat)
    text += seat.getAttribute('id')+" ";
    bookedSeats[selectedMovie()].push(seat);
  })
  
  
  text = document.createTextNode(text);
  bookSeats.appendChild(text);
  var cost = document.createElement("td");
  text = document.createTextNode(totalCost());
  cost.appendChild(text);
  
  tr.appendChild(checkBox);
  tr.appendChild(movieTitle);
  tr.appendChild(numberOfSeat);
  tr.appendChild(bookSeats);
  tr.appendChild(cost);

  booked.appendChild(tr);
  selectedSeat = [];
  resetSeatColor();
}

function deletBook() {
  
}


makeGreySeat();