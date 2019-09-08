

<?php
	
    //接收参数


    $uid=isset($_GET['uid']) ? $_GET['uid'] : '';
	
	//连接数据库
    include 'conn.php';
    

	$sql = "SELECT * FROM gwc where uid='$uid'";//渲染数据
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);





    $data=array(
        "content"=>$content,
        // "content2"=>$content2,
        // "content3"=>$content3,
        // "content4"=>$content4,
    );
    echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>