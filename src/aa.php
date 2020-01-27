<?php
date_default_timezone_set('Asia/Tokyo');
$datetime1 = new DateTime('2017-08-01');
$datetime2 = new DateTime('2017-08-15');
 
$interval = $datetime1->diff($datetime2);
echo $interval->d;
$array = array(
  "date" => date("Y/m/d H:i:s"),
  "interval" => $interval->d
);
header("Content-Type: text/javascript; charset=utf-8");
echo json_encode($array);
?>