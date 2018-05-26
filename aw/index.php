<?php

ini_set("display_errors", 1);

function pre_dump($v) {
	echo "<pre>";
	print_r($v);
	echo "</pre>";
}

function get_mode() {
	$keys = array_keys($_GET);
	if(count($keys) == 0) {
		return -1;
	}
	return $keys[0];
}

function seed_random_matrix($r, $c) {
	$m = [];
	for($row = 0; $row < $r; ++$row) {
		$mr = [];
		for($col = 0; $col < $c; ++$col) {
			$mr[] = rand(0, 10);
		}
		$m[] = $mr;
	}
	return $m;
}

function pretty_print_matrix($m) {
	foreach($m as $row) {
		$str = "";
		foreach($row as $i) {
			$str .= sprintf("%3d ", $i);
		}
		echo $str . "<br>";
	}
}

function do_fake_calculation($r, $c, $print= true) {
	$m1 = seed_random_matrix($r, $c);
	$m2 = seed_random_matrix($c, $r);
	$m3 = [];
	for($row = 0; $row < $r; ++$row) {
		$m3[] = [];
		for($col = 0; $col < $r; ++$col) {
			$sum = 0;
			for($s = 0; $s < $c; ++$s) {
				$sum += $m1[$row][$s] * $m2[$s][$col];
			}
			$m3[$row][$col] = $sum;
		}
	}
	
	if($print) {
		pretty_print_matrix($m1);
		echo "<br>";
		pretty_print_matrix($m2);
		echo "<br>";
		pretty_print_matrix($m3);
	}
}

$ws = get_unsynced_timestamp();

$worker_id = $_SERVER["HTTP_LB_WORKER_ID"];
$complexity = $_SERVER["HTTP_LB_REQUEST_COMPLEXITY"];
$proxy_start_time = $_SERVER["HTTP_LB_START"];



$mode = get_mode();

if($mode > 0) {
	do_fake_calculation($mode * 20, $mode * 20, false);
}

header("Lb-Start: ${proxy_start_time}");
header("Lb-Worker-Start: ${ws}");
header("Lb-Worker-Id: ${worker_id}");
header("Lb-Request-Complexity: ${complexity}");


$we = get_usynced_timestamp();
header("Lb-Worker-End: ${we}");

?>


<html>
<head>
<title>Thesis</title>
</head>
<body>
<h1>Welcome</h1>
<p>
<?php
	echo "<pre>";
	print_r($_SERVER);
	echo "</pre>";
	echo "usec elapsed: {$process_time_taken}";
?>
</p>
</body>
</html>

