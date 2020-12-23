<?php
session_start();
$url = 'data/person.json';
$id = $_POST["id"];
$pw = $_POST["pass"];
$fp = fopen($url, "a+");
$isLogin = false;
while (!feof($fp)) {
  $l = fgets($fp);
  $p = json_decode($l);
  if ($p->id == $id) {
    if ($p->pw == $pw) {
      $_SESSION['userid'] = $id;
      $_SESSION['name'] = $id;
      echo $id."님 로그인이 되었습니다.<br>";
      echo "<input type='button' value='비밀번호 변경' onclick='location.href=\"change_pw.html\"'>";
      $isLogin = true;
    } else {
      break;
    }
  }
}
if ($isLogin != true) {
  echo "입력하신 id가 존재하지 않거나 패스워드가 틀립니다.";
  session_unset();
}
exit;
?>