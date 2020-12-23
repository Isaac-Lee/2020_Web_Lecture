<?php
  $fileName = $_POST["fileName"];
  $word = $_POST["word"];
  $sortHigher = $_POST["higher"];
  $sortLower = $_POST["lower"];
  $fp = fopen("./data.txt", "r");

  $sort = $sortHigher == 'checked' ? "higher" : "lower";

  function searchMatch($array, $fileName, $word, $sort) {
    $rank = [];
    foreach ($array as $name => $text) {
      $fname = strtolower(explode(".", $name)[0]);
      $fileName = strtolower($fileName);
      if (strstr($fname, $fileName)) {
        $words = explode(" ", $text);
        $count = 0;
        foreach ($words as $w) {
          if (strcasecmp($w, $word)) {
            $count++;
          }
        }
        $rank[$name] = $count;
      }
    }

    if (strcmp($sort, 'higher')) {
      asort($rank);
    } else {
      arsort($rank);
    }
    
    echo "<ul>";
    foreach ($rank as $name => $rank) {
      $text = $array[$name];
      echo "<li>$name :$text</li>";
    }
    echo "</ul>";
  }

  $infoArray = [];
  while (!feof($fp)) {
    $name = fgets($fp);
    $text = fgets($fp);
    $infoArray[$name] = $text;
  }

  searchMatch($infoArray, $fileName, $word, $sort);
?>