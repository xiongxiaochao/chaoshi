<?php
	
	
	
	//接收参数
	$name1 = isset($_POST['name']) ? $_POST['name'] : '';//账号1
	$psw1 = isset($_POST['passsword']) ? $_POST['passsword'] : '';//密码1

	//连接数据库
	include 'conn.php';
	$sql = "SELECT * FROM users WHERE name='$name1' AND password='$psw1'";
	$res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);


	if($res->num_rows) {
		echo json_encode($content,JSON_UNESCAPED_UNICODE);
    }else {
        echo 'no';
    }

?>