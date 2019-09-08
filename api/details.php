<?php
	
    //接收参数
    $pid=isset($_GET['pid']) ? $_GET['pid'] : '';
    $main=isset($_GET['main']) ? $_GET['main'] :'';
    $uid=isset($_GET['uid']) ? $_GET['uid'] :'';
    // $num=isset($_GET['num']) ? $_GET['num'] : '';
    
	
	//连接数据库
    include 'conn.php';
    

	$sql = "SELECT * FROM pdt where pid='$pid' ";//渲染数据
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);


    $sql2 = "SELECT * from gwc where pid='$pid' and uid='$uid'";
    $res2 = $conn->query($sql2);
    $content2 = $res2->fetch_all(MYSQLI_ASSOC);

    $sql3 = "SELECT * from liuyan where pid='$pid'";
    $res3 = $conn->query($sql3);
    $content3 = $res3->fetch_all(MYSQLI_ASSOC);

    //插入留言
    $sql4 = "INSERT INTO liuyan (main,uid,pid) VALUES ('$main','$uid','$pid') ";
    $res4 = $conn->query($sql4);
    // $content4 = $res4->fetch_all(MYSQLI_ASSOC);

    $data=array(
        "content"=>$content,
        "content2"=>$content2,
        "content3"=>$content3,
        // "content4"=>$content4,
        // "content5"=>$content5,
        // "content6"=>$content6,
        // "ok"=>$desc_res7,
        // "to"=>$tui_num
    );
    echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>