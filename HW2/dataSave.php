<?php
  $url = 'data/person.json';
  $id = $_POST["id"];
  $pw = $_POST["pw"];
  $fp = fopen($url, "a+");
  try {
    while (!feof($fp)) {
      $l = fgets($fp);
      $p = json_decode($l);
      if ($p->{"id"} == $id) {
        throw new Exception('이미 아이디가 존재합니다.');
      }
      if(!isset($person)) $person = new stdClass();
      $person->id = $id;
      $person->pw = $pw;
      $json = json_encode($person);
      fwrite($fp, $json."\n");

      $result['success'] = true;
      $result['msg'] = "회원 가입이 완료되었습니다.";
    }
  } catch(Exception $e) {
    $result['success'] = false;
      $result['msg'] = $e->getMessage();
  } finally {
    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  }
  fclose($fp);
?>