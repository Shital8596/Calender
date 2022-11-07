<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
header("Content-Type:application/json");

$input = file_get_contents('php://input');
$obj = json_decode($input);
$dateD = $obj->date;

$flagD = 0;
$cellColor;

session_start();

$cellColor;
$temp;
if(isset($_SESSION["date$dateD"])){
    if(($_SESSION["date$dateD"]) == $dateD && ($_SESSION["flag$dateD"]) == 0){
        $cellColor = "green";
        $_SESSION["flag$dateD"] = 1;
    }else{
        $cellColor = "white";
        $_SESSION["flag$dateD"] = 0;
    }
}else{
    $_SESSION["date$dateD"] = $dateD;
    $_SESSION["flag$dateD"] = $flagD;
    if(($_SESSION["date$dateD"]) == $dateD && ($_SESSION["flag$dateD"]) == 0){
        $cellColor = "green";
        $_SESSION["flag$dateD"] = 1;
    }else{
        $cellColor = "white";
        $_SESSION["flag$dateD"] = 0;
    }
}


$res = new stdClass();
$res->color = $cellColor;
print_r(json_encode($res));

?>