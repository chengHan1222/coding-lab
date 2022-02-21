<?php
session_start();
$a = $_GET['a'];
echo "document.write('".$a."');";  
$link = mysqli_connect('localhost', 'root', '12345678');

if(!$link) {

        echo 'MySQL 伺服器連結失敗';}

else {

        echo 'MySQL 伺服器連結成功'; }

mysqli_close($link);
?>