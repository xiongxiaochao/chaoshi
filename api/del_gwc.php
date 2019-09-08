<?php
		
	
	//接收参数
    $pid=isset($_GET['pid']) ? $_GET['pid'] : '';
    $num=isset($_GET['num']) ? $_GET['num'] : '';
    $uid=isset($_GET['uid']) ? $_GET['uid'] : '';

    include 'conn.php';
    
    $sql3 = "DELETE FROM gwc WHERE uid='$uid' and pid='$pid' and num='$num'";

    $res3 = $conn->query($sql3);

    // var_dump($res3);
    // echo json_encode($content3,JSON_UNESCAPED_UNICODE);
    // echo $pid;

?>