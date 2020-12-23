<!DOCTYPE html>
<html>
<body>
<h2>숫자 맞추기 게임</h2>
당신이 생각한 숫자를 컴퓨터가 맞추는 게임입니다.<br><br>

<?php
static $userNumber = 7;
$oppertunity = 0;
$isPlaying = true;

function numgame() {
  global $isPlaying;
  global $userNumber;
  global $oppertunity;
  $pickedNumber = array();
  while ($isPlaying) {
    $number = rand(1, 15);
    while (array_key_exists($number, $pickedNumber)) {
      $number = rand(1, 15);
    }
    array_push($pickedNumber, $number);
    $playerNumber = $number;
    echo "The Number is $playerNumber";
    echo "\n";
    if ($playerNumber != $userNumber) {
      echo "fail.<br>";
      echo "\n";
      $oppertunity++;
    } else {
      echo "correct!!!";
      echo "\n";
      echo "\n";
      echo "\nGame oppertunity : $oppertunity times";
      $isPlaying = false;
    }
  }
}

numgame();
?>
</body>
</html>
