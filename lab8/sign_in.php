<?php
$url = 'data/person.json';
$id = $_POST["id"];
$pw = $_POST["pass"];
$fp = fopen($url, "a+");
while (!feof($fp)) {
  $l = fgets($fp);
  $p = json_decode($l);
  if ($p->{"id"} == $id) {
    echo "이미 아이디가 존재합니다.";
    exit;
  }
}
if(!isset($person)) $person = new stdClass();
$person->id = $id;
$person->pw = $pw;
$json = json_encode($person);
fwrite($fp, $json."\n");
fclose($fp);
echo "회원 가입이 완료되었습니다.";
?>