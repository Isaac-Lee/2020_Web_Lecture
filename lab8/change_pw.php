<?php
session_start();
$url = 'data/person.json';
$id = $_SESSION["userid"];
$pw = $_POST["pw"];

$fp = fopen($url, "r");
$buffer= "";
while (!feof($fp)) {
  $l = fgets($fp);
  $p = json_decode($l);
  if(!isset($person)) $person = new stdClass();
  if ($p->{"id"} == $id) {
    $person->id = $id;
    $person->pw = $pw;
    $json = json_encode($person);
    $buffer .= $json."\n";
  } else {
    $buffer .= $l."\n";
  }
}
fclose($fp);
$fp = fopen($url, "w+");
fwrite($fp, $buffer);
fclose($fp);
echo "비밀번호 변경이 성공적으로 완료 되었습니다."
?>