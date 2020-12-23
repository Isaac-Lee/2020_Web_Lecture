let today = new Date();
var dateReg = /(\d\d\d\d)-(\d\d)-(\d\d)/;

// html 변수 선언 부분
// 화면 좌측 상단 요소들
var addBtn = document.getElementById("add-btn");
addBtn.setAttribute('onClick', "showAddTodoPopup()");

// Add ToDo box부분 요소들
var addTodoBox = document.getElementById("add-todo-box")
var addTodoBoxForm = document.getElementById("add-todo-box-form");
var todoDate = document.getElementById("todo-date");
var todoTime = document.getElementById("todo-time");
var todoTitle = document.getElementById("todo-title");
var todoDescipt = document.getElementById("todo-description");
var todoSaveBtn = document.getElementById("todo-save-btn");
var todoUpdateBtn = document.getElementById("todo-update-btn");
var todoSubmitBtn = document.getElementById("todo-submit-btn");
var todoDeleteBtn = document.getElementById("todo-delete-btn");
var todoCancelBtn = document.getElementById("todo-cancel-btn");
todoSaveBtn.addEventListener('click', addTodo);
todoDeleteBtn.addEventListener('click', deleteTodo);
todoCancelBtn.addEventListener('click', closeAddTodoPopup);

// 화면 우측 상당 요소들
var logoutBtn = document.getElementById("logout-btn");
var joinBtn = document.getElementById("join-btn");
var userIDShow = document.getElementById("user-id-show");
logoutBtn.addEventListener('click', logout);
joinBtn.setAttribute('onClick', "showJoinPopup()");

//Join Box 부분 Element
var joinBox = document.getElementById("join-box");
var joinBoxForm = document.getElementById("join-box-form");
var userID = document.getElementById("user-id");
var userPass = document.getElementById("user-pass");
var loginBtn = document.getElementById("login-btn");
var singinBtn = document.getElementById("signin-btn");
loginBtn.addEventListener('click', login);
singinBtn.addEventListener('click', signin);

var year = document.getElementById("year");
var month = document.getElementById("month");

var sunDate = document.getElementById("Sun-date");
var monDate = document.getElementById("Mon-date");
var tueDate = document.getElementById("Tue-date");
var wedDate = document.getElementById("Wed-date");
var thuDate = document.getElementById("Thu-date");
var friDate = document.getElementById("Fri-date");
var satDate = document.getElementById("Sat-date");

var sunTodo = document.getElementById("Sun-todo");
var monTodo = document.getElementById("Mon-todo");
var tueTodo = document.getElementById("Tue-todo");
var wedTodo = document.getElementById("Wed-todo");
var thuTodo = document.getElementById("Thu-todo");
var friTodo = document.getElementById("Fri-todo");
var satTodo = document.getElementById("Sat-todo");


function showJoinPopup() {
  joinBox.style.display = 'block';
  joinBtn.setAttribute('onClick', "closeJoinPopup()");
}
function closeJoinPopup() {
  resetJoinPopup();
  joinBox.style.display = 'none';
  joinBtn.setAttribute('onClick', "showJoinPopup()");
}
function resetJoinPopup() {
  joinBoxForm.reset();
}
function login() {
  var id = userID.value;
  var pw = userPass.value;
  $.ajax({
    url: './loginConfirm.php',
    type: 'POST',
    data: {
      id : id,
      pw : pw
    },
    dataType: 'json',
    success : function(result) {
      if (result.success == false){
        alert(result.msg);
      } else {
        findTODO(id, getThisYear(), getThisMonth());
        closeJoinPopup();
        activateAddBtn();
        showID(id);
        showDate();
        showYear();
        showMonth();
      }
    }
  });
}
// 회원가입 함수
function signin() {
  var id = userID.value;
  var pw = userPass.value;
  if (validation(id, pw)) {
    sendData(id, pw);
  }
  closeJoinPopup();
}
// 아이디 비밀번호 검증 함수
function validation(id, pw) {
  var idReg = /^([A-Za-z0-9]){6,15}/g;
  var pwReg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*/g;
  if (idReg.test(id)) {
    if (pwReg.test(pw)) {
      return true;
    }
  }
  alert("아이디 또는 패스워드가 입력 양식에 맞지 않습니다.")
  return false;
}
// 서버로 사용자 정보 전송하는 함수
// 아이디가 존재하면 아이디가 존재한다고 출력
// 없으면 회원가입 완료
function sendData(id, pass) {
  $.ajax({
    url: './dataSave.php',
    type: 'POST',
    data: {
      id : id,
      pw : pass
    },
    dataType: 'json',
    success : function(result) {
      alert(result.msg);
    }
  });
}
//로그아웃 함수
function logout() {
  alert('로그아웃이 되었습니다.');
  disableAddBtn();
  deleteID();
  clearDate();
  clearTODO();
}
function clearDate() {
  year.innerHTML = "";
  month.innerHTML = "";
  sunDate.innerHTML = "";
  monDate.innerHTML = "";
  tueDate.innerHTML = "";
  wedDate.innerHTML = "";
  thuDate.innerHTML = "";
  friDate.innerHTML = "";
  satDate.innerHTML = "";
}
function clearTODO() {
  $("#Sun-todo").eq(0).empty();
  $("#Mon-todo").eq(0).empty();
  $("#Tue-todo").eq(0).empty();
  $("#Wed-todo").eq(0).empty();
  $("#Thu-todo").eq(0).empty();
  $("#Fri-todo").eq(0).empty();
  $("#Sat-todo").eq(0).empty();
}
// 아이디 보여주고 지우는 함수
function showID(id) { userIDShow.innerHTML = id; }
function deleteID() { userIDShow.innerHTML = ""; }
// 할일 목록이 있는지 체크하는 함수
function findTODO(id, year, month) {
  $.ajax({
    url: './findTODO.php',
    type: 'POST',
    data: {
      id : id,
      year : year,
      month : month
    },
    dataType: 'json',
    success : function(result) {
      if (result.success == false) {
        alert(result.msg);
      } else {
        console.log(result.todo);
        showTodo(result.todo);
      }
    }
  });
}

function activateAddBtn() { addBtn.disabled = false; }
function disableAddBtn() { addBtn.disabled = "disabled"; }

function setMinMaxDate() {
  var thisYear = Number(getThisYear());
  var thisMonth = Number(getThisMonth());
  var todayDate = Number(getThisDate());
  var todayDay = Number(getThisDay());
  var startDate = todayDate-todayDay;
  var minDate = correctDate(startDate, thisYear, thisMonth);
  var maxdate = todayDate + (6-todayDay);
  var maxMonth = correctMaxMonth(thisMonth, maxdate);
  maxdate = correctMaxDate(thisYear, thisMonth, maxdate);
  var minYear = correctYear(thisYear, thisMonth, startDate);
  var minMonth = correctMonth(thisMonth, startDate);
  if ((maxMonth+"").length == 1) {
    maxMonth = "0"+maxMonth;
  }
  if ((maxdate+"").length == 1) {
    maxdate = "0"+maxdate;
  }
  if ((minMonth+"").length == 1) {
    minMonth = "0"+minMonth;
  }
  if ((minDate+"").length == 1) {
    minDate = "0"+minDate;
  }
  todoDate.setAttribute('min', minYear+"-"+minMonth+"-"+minDate);
  todoDate.setAttribute('max', thisYear+"-"+maxMonth+"-"+maxdate);
}
function showAddTodoPopup() {
  setMinMaxDate();
  todoUpdateBtn.disabled = 'disabled';
  todoSubmitBtn.disabled = 'disabled';
  todoDeleteBtn.disabled = 'disabled';
  addTodoBox.style.display = 'block';
  addBtn.setAttribute('onClick', "closeAddTodoPopup()");
}
function closeAddTodoPopup() {
  resetAddTodoForm();
  addTodoBox.style.display = 'none';
  addBtn.setAttribute('onClick', " showAddTodoPopup()");
}
function resetAddTodoForm() {
  addTodoBoxForm.reset();
}

function addTodo() {
  var id = userIDShow.innerHTML;
  var date = todoDate.value;
  console.log(date);
  date = todoDate_(date);
  console.log(date);
  var time = todoTime.value;
  var title = todoTitle.value;
  var description = todoDescipt.value;
  $.ajax({
    url: './addTODO.php',
    type: 'POST',
    data: {
      id : id,
      year : date[1],
      month : date[2],
      date : date[3],
      time : time,
      title : title,
      descript : description
    },
    dataType: 'json',
    success : function(result) {
      alert(result.msg);
      findTODO(id, date[1], date[2]);
      closeAddTodoPopup();
    }
  });
}
function showTodoBox(title) {
  console.log(title);
  showAddTodoPopup();
  todoDate.setAttribute('min', "");
  todoDate.setAttribute('max', "");
  todoSaveBtn.disabled = 'disabled';
  todoUpdateBtn.disabled = false;
  todoDeleteBtn.disabled = false;
  todoTitle.value = title;
}

function deleteTodo() {
  alert('삭제 되었습니다.');
  var title = todoTitle.value;
  $("#"+title).remove();
  closeAddTodoPopup();
}
function todoDate_(date) {
  var dateArray = dateReg.exec(date);
  return dateArray;
}

function getThisYear() { return today.getFullYear(); }
function getThisMonth() { return (today.getMonth()+1); }
function getThisDate() { return today.getDate(); }
function getThisDay() { return today.getDay(); }

function showYear() { year.innerHTML = getThisYear(); }
function showMonth() {
  var thisMonth = Number(getThisMonth());
  var todayDate = Number(getThisDate());
  var todayDay = Number(getThisDay());
  var startDate = todayDate-todayDay;
  var minMonth = correctMonth(thisMonth, startDate);
  var maxMonth = correctMaxMonth(thisMonth, todayDate+todayDay);
  if (maxMonth == minMonth) {
    month.innerHTML = getThisMonth();
  } else {
    month.innerHTML = minMonth+","+maxMonth;
  }
}
function showDate() {
  var todayDate = getThisDate();
  var todayDay = getThisDay();
  var thisYear = getThisYear();
  var thisMonth = getThisMonth();
  var startDate = todayDate-todayDay;
  for (var i=0; i < 7; i++) {
    numToDay(i, correctDate(startDate+i, Number(thisYear), Number(thisMonth)));
  }
}
function numToDay(i, date) {
  if (i == 0) {
    sunDate.innerHTML = date;
  } else if (i == 1) {
    monDate.innerHTML = date;
  } else if (i == 2) {
    tueDate.innerHTML = date;
  } else if (i == 3) {
    wedDate.innerHTML = date;
  } else if (i == 4) {
    thuDate.innerHTML = date;
  } else if (i == 5) {
    friDate.innerHTML = date;
  } else if (i == 6) {
    satDate.innerHTML = date;
  }
}
function correctYear(year, month, date) {
  if (date <= 0) {
    if (month-1 <= 0) {
      return year-1;
    }
  }
  return year;
}
function correctMaxMonth(month, date) {
  let lastDate = new Date(year, month, date);
  if (date > lastDate.getDate()) {
    if (month+1 > 12) {
      return 1;
    } else {
      return month+1;
    }
  }
  return month;
}
function correctMonth(month, date) {
  if (date <= 0) {
    if (month-1 <= 0) {
      return 12;
    } else {
      return month-1;
    }
  }
  return month;
}
function correctMaxDate(year, month, date) {
  let lastDate = new Date(year, month, date);
  if (date > lastDate.getDate()) {
    return lastDate.getDate()-date;
  }
  return date;
}
function correctDate(date, year, month) {
  let lastDate = ""
  if (date <= 0) {
    if (month-1 <= 0) {
      lastDate = new Date(year-1, 12, date);
    } else {
      lastDate = new Date(year, month-1, date);
    }
    return lastDate.getDate();
  } else {
    return date;
  }
}

function showTodo(todoList) {
  clearTODO();
  var startDate = getThisDate()-getThisDay();
  startDate = correctDate(startDate);
  var startMonth = getThisMonth();
  startMonth = correctMonth(startMonth, startDate);
  var maxDate = getThisDate() + (6-getThisDay());
  var maxMonth = getThisMonth();
  todoList.forEach(ToDo => {
    if (ToDo != null) {
      console.log(ToDo);
      var title = ToDo.title;
      var todo = document.createElement('div');
      var titleText = document.createTextNode(title);
      todo.setAttribute('class', 'todo');
      todo.setAttribute('id', title);
      todo.appendChild(titleText);
      todo.addEventListener('click', function(e) {
        showTodoBox(title);
      });
      console.log(todo);
      var todoDate = todoDate_(ToDo.date);
      var aTagArray = document.getElementsByClassName('date');
      var tdTagArray = document.getElementsByClassName('day');
      console.log(todoDate[3]);
      for (var i = 0; i < aTagArray.length; i++) {
        var a = aTagArray[i];
        if (Number(a.innerHTML) == Number(todoDate[3])) {
          tdTagArray[i].appendChild(todo);
        }
      }
    }
   });
}
