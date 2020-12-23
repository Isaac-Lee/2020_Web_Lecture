function fixName(e, lecName, node) {
  var answer = prompt("삭제는 1, 수정은 2를 입력하세요", "");
  var lecList = document.getElementById("lecture-list");
  var list = lecName;
  if (answer === '1') {
    lecList.removeChild(list);
  } else if (answer === '2') {
    var newLecName = prompt("변경할 내용을 입력하세요.", "");
    var newNode = document.createTextNode(newLecName);
    list.replaceChild(newNode, node);
    // list.removeChild(node);
    // list.appendChild(newNode);
  } else if (answer === '') {
    alert('번호를 입력하지 않으셨습니다.');
  } else if (answer === null) {
    alert('취소되었습니다.');
  } else {
    alert('번호를 잘못 입력 하셨습니다.');
  }
}

function addLec() {
  let lecName = document.getElementById("text-field");
  var list = document.createElement("li");
  var node = document.createTextNode(lecName.value);
  list.id = lecName.value;
  list.appendChild(node);
  list.addEventListener('click', function(e) {
    fixName(e, list, list.childNodes[0]); });
  
  var lecList = document.getElementById("lecture-list");
  lecList.appendChild(list);
}


window.onload = function() {
  let addBtn = document.getElementById("add-button");

  addBtn.addEventListener('click', addLec)
}