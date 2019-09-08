<?php
		
	
	//接收参数
    $pid=isset($_GET['pid']) ? $_GET['pid'] : '';
    $num=isset($_GET['num']) ? $_GET['num'] : '';
    $uid=isset($_GET['uid']) ? $_GET['uid'] : '';

    include 'conn.php';
    
    $sql3 = "UPDATE gwc SET num='$num' WHERE pid='$pid' and uid='$uid'";

    $res3 = $conn->query($sql3);

    // var_dump($res3);
    // echo json_encode($content3,JSON_UNESCAPED_UNICODE);
    // echo $pid;

?>