<?php
	
    //接收参数
    $pid=isset($_GET['pid']) ? $_GET['pid'] : '';
    // $num=isset($_GET['num']) ? $_GET['num'] : '';
    $page = isset($_GET['page']) ? $_GET['page'] : '';
	$num = isset($_GET['num']) ? $_GET['num'] : '';
	
	//连接数据库
    include 'conn.php';
    

	$sql = "select * from pdt LIMIT $page,$num";//渲染数据
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);


    $sql2 = "SELECT * from gwc where pid='$pid'";
    $res2 = $conn->query($sql2);
    $content2 = $res2->fetch_all(MYSQLI_ASSOC);

    $sql3 = "select * from pdt";
    $res3 = $conn->query($sql3);


    $data=array(
        "content"=>$content,
        "content2"=>$content2,
        'data1' => $content,
        'total' => $res3->num_rows,
        'page' => $page,
        'num' => $num
    );
    echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>