function submit() {
  var answer = confirm("이벤트에 참여하겠습니까?")
  if (answer) {
    var name = prompt("성함을 입력해주세요.")
    if (name == null) {
      alert("이벤트 참여를 취소 했습니다.")
    } else if (name == "") {
      alert("다시 참여해주세요.")
    } else {
      var msg = name + "님 이벤트에 참가 해주셔서 감사합니다."
      msgP.innerHTML = msg;
    }
  } else {
    alert("이벤트 참여를 취소 했습니다.")
  }
}

var msgP = document.getElementById("msg");
var btn = document.getElementById("eventBtn");
btn.addEventListener("click", submit)