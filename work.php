<?php

require_once("lib/db_info.php");

try{	
	$pdo = new PDO($dsn, $user, $password);	
	
	$stmt = $pdo->prepare("insert into tb1 (num) values (:num)");
		
	$num1 = htmlspecialchars($_POST['sampleVal1'], ENT_QUOTES, 'UTF-8');
	$num2 = htmlspecialchars($_POST['sampleVal2'], ENT_QUOTES, 'UTF-8');
	$str2 = htmlspecialchars($_POST['sampleVal3'], ENT_QUOTES, 'UTF-8');

	$stm = $pdo->query("select version()");
	$arr = $stm->fetch();
	$array[0] = "mysql version {$arr[0]} :GNU GPLv2";

	$pdo->query("create table if not exists tb1 (num INT)");

	if(is_numeric($num1)){
		$stmt->bindValue(':num', $num1, PDO::PARAM_INT);	
		$stmt->execute();	
	}
	
	if(is_numeric($num2)){
		$stmt->bindValue(':num', $num2, PDO::PARAM_INT);
		$stmt->execute();		
	}
	
	if($str2 == "reset"){
		$pdo->query("delete from tb1");
		$stmt->bindValue(':num', 0, PDO::PARAM_INT);
		$stmt->execute();	
	}
	
	$stm = $pdo->query("select sum(num) from tb1");
	$arr = $stm->fetch();
	
	if($arr[0] >= 100000){
		$pdo->query("delete from tb1");
		$stmt->bindValue(':num', 0, PDO::PARAM_INT);
		$stmt->execute();
		$arr[0] = 0;
	}
	$array[1] = sprintf("%05d", $arr[0]);	
	
}catch(Exception $e){
		
}	
	
$pdo = null;

$phpver = phpversion();		
$array[2] = "PHP version : {$phpver} with PDO :PHP License";

echo json_encode($array);

?>
