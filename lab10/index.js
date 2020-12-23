var infoArray = [];

function StudentInfo(name, korean, math, english, society, history) {
  this.name = name;
  this.korean_score = Number(korean);
  this.math_score = Number(math);
  this.english_score = Number(english);
  this.society_score = Number(society);
  this.history_score = Number(history);
}

function average(checked, student) {
  var checked_lecture = checked;
  var total_score = 0;
  checked_lecture.forEach(lec => {
    if (lec == "Korean") {
      total_score += student.korean_score;
    } else if (lec == "Math") {
      total_score += student.math_score;
    } else if (lec == "English") {
      total_score += student.english_score;
    } else if (lec == "Society") {
      total_score += student.society_score;
    } else if (lec == "History") {
      total_score += student.history_score;
    }
  });
  return (total_score / checked_lecture.length);
}


StudentInfo.prototype.avg = function(checked, stuName) {
  var avg = 0;
  if (stuName == '') {
    infoArray.forEach(student => {
      avg += average(checked, student);
    });
    avg = avg / infoArray.length;
  } else {
    infoArray.forEach(student => {
      if (student.name == stuName) {
        avg = average(checked, student);
      }
    });
  }
  return avg;
}

function checkedLecture() {
  var checked = new Array();
  var lectures = document.getElementsByName("lecture");
  lectures.forEach(lec => {
    if (lec.checked == true) {
      checked.push(lec.value);
    };
  });
  return checked;
}

function readTabledata() {
  var table = document.getElementsByTagName('tr');
  for (i=0; i < table.length; i++) {
    if (i == 0) { continue }
    var row = table[i];
    var name = row.children[0].firstChild.nodeValue;
    var korean = row.children[1].firstChild.nodeValue;
    var math = row.children[2].firstChild.nodeValue;
    var english = row.children[3].firstChild.nodeValue;
    var society = row.children[4].firstChild.nodeValue;
    var history = row.children[5].firstChild.nodeValue;
    infoArray.push(new StudentInfo(name, korean, math, english, society, history));
  }
}

function deleteTable() {
  $('#student-table').empty();
}

function findStudent() {
  var name = document.getElementById("student-name").value;
  var checked = checkedLecture();
  if (checked.length == 0) {
    alert("Please select a subject or subjects");
  } else {
    var avg = 0;
    if (name == "") {
      avg = StudentInfo.prototype.avg(checked, name);
      alert("The average of all students' subject grade is + " + avg.toFixed(1))
    } else {
      var isExist = false;
      infoArray.forEach(student => {
        if (name == student.name) {
          avg = StudentInfo.prototype.avg(checked, name);
          alert("Student name is " + name + ", Average is " + avg.toFixed(1));
          isExist = true;
        }
      });
      if (!isExist) { alert("The name does not exist"); }
    }
  }
}

window.onload = function() {
  readTabledata();
  deleteTable();
  var submitBtn = document.getElementById("submit-btn");
  submitBtn.addEventListener('click', findStudent);
};