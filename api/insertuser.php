<?php
	
	
	
	//接收参数
    $name=isset($_GET['name']) ? $_GET['name'] : '';
    $name1=isset($_POST['name']) ? $_POST['name'] : '';
    $psd=isset($_POST['psd']) ? $_POST['psd'] : '';
    $a=isset($_POST['a']) ? $_POST['a'] : '';

    include 'conn.php';

    $sql = "SELECT * FROM users where name='$name'";
    $res = $conn->query($sql);
    
    if($res->num_rows){
        // echo 'no';
        $content = '1';
    }else{
        $content ='0';
    }
    if($a=='2'){
        $sql3 = "insert into users(name,password) values ('$name1','$psd')";
        $res3 = $conn->query($sql3);
        $content2 = $res3; 

        $sql4 = "SELECT * FROM users where name='$name1'";
        $res4 = $conn->query($sql4);
        $content4 = $res4->fetch_all(MYSQLI_ASSOC);
    }else{
        $content2 = '注册失败,信息有误请重新填写';
        $content4 ='注册失败,信息有误请重新填写';
    }
    

    $data=array(
        "content"=>$content,
        "content2"=>$content2,
        // "content3"=>$content3,
        "content4"=>$content4,
        // "content5"=>$content5,
        // "content6"=>$content6,
    );
    echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>