<?php
  $url = 'data/person.json';
  $id = $_POST["id"];
  $pw = $_POST["pw"];
  $fp = fopen($url, "r");
  try {
    $isExist = false;
    while (!feof($fp)) {
      $l = fgets($fp);
      $p = json_decode($l);
      if ($p->{"id"} == $id) {
        $isExist = true;
        if ($p->{"pw"} == $pw) {
          break;
        } else {
          throw new Exception('비밀번호가 틀렸습니다.');
        }
      }
    }
    if (!$isExist) {
      throw new Exception('존재하지 않는 아이디입니다.');
    }
    $result['success'] = true;
  } catch(Exception $e) {
    $result['success'] = false;
      $result['msg'] = $e->getMessage();
  } finally {
    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  }
  fclose($fp);
?>