<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
header("Content-Type:application/json");

$input = file_get_contents('php://input');
$obj = json_decode($input);
$month = $obj->month;
$year = $obj->year;


$fd;
$date = strtotime("$year-$month-1");
$var = date("l", $date);

switch($var){
    case "Monday":
        $fd = 0;
    break;
    case "Tuesday":
        $fd = 1;
    break;
    case "Wednesday":
        $fd = 2;
    break;
    case "Thursday":
        $fd = 3;
    break;
    case "Friday":
        $fd = 4;
    break;
    case "Saturday":
        $fd = 5;
    break;
    case "Sunday":
        $fd = 6;
    break;
    default ;
}

$totalDays =(int) date("t", $date);
$date2 = strtotime("$year-$month-$totalDays");
$var2 = (int) date("w", $date2);
 
$res = new stdClass();
$res->firstDay = $fd;
$res->daysInMonth = $totalDays;
$res->lastDay = $var2;

print_r(json_encode($res))



?>