<?php
  $id = $_POST["id"];
  $year = $_POST["year"];
  $month = $_POST["month"];
  $date = $_POST["date"];
  $time = $_POST["time"];
  $title = $_POST["title"];
  $descript = $_POST["descript"];
  $url = 'data/'.$id.'_'.$year.$month.'.json';
  $fp = fopen($url, "a");
  if(!isset($todo)) $todo = new stdClass();
  $todo->date = $year."-".$month."-".$date;
  $todo->time = $time;
  $todo->title = $title;
  $todo->descript = $descript;
  $json = json_encode($todo);
  fwrite($fp, $json."\n");
  $result['success'] = true;
  $result['msg'] = "저장되었습니다.";
  echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  fclose($fp);
?>