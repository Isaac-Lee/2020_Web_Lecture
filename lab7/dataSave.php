<?php
  $fileName = $_POST["fileName"];
  $fileContent = $_POST["fileContent"];
  $fp = fopen("./data.txt", "a+");
  if ($fp) {
    if (validate($fp, $fileName)) {
      fwrite($fp, $fileName."\n");
      fwrite($fp, $fileContent."\n");
      fclose($fp);
      echo "저장되었습니다.</br>";
    } else {
      echo "저장되지 않았습니다.</br>";
      echo "이전에 같은 화일이름으로 저장된 정보가 있습니다.";
    }
  }

  function validate($file, $fileName) {
    $isOk = true;
    $fileText = fgets($file);
    $line = explode(" ", $fileText);
    for ($i = 0; $i < count($line); $i++) {
      if (strcmp($line[$i], $fileName)) {
        $isOk = false;
        break;
      }
    }
    return $isOk;
  }
?>