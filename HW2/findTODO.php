<?php
  $id = $_POST["id"];
  $year = $_POST["year"];
  $month = $_POST["month"];
  $url = 'data/'.$id.'_'.$year.$month.'.json';
  $todos = [];
  $fp = fopen($url, "r");
  if ($fp == NULL) {
    $result['success'] = false;
    $result['msg'] = "등록된 일정이 없습니다.";
  } else {
    while (!feof($fp)) {
      $l = fgets($fp);
      $todo = json_decode($l);
      array_push($todos, $todo);
    }
    $result['success'] = true;
    $result['todo'] = $todos;
  }
  echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  fclose($fp);
?>