<?php
$pg_host = 'host = 127.0.0.1';
// $pg_port = 'port = 5432';
$pg_db = 'dbname = cakeLibrary';
$pg_user = 'user = postgres';
$pg_password = 'password = 891222';
// $pg_infoAccount = 'user = postgres password = 891222';


$pg = pg_connect("$pg_host $pg_user $pg_password $pg_db");
// if (!$pg) {
//     echo "失敗\n";
// } else {
//     echo "成功\n";
// }

$_SQL = "SELECT * FROM cakeRecipe;";
$cakeRecipe = pg_query($pg, $_SQL);

$cakeData;
for ($index = 0; $index < pg_num_rows($cakeRecipe); $index++) {
    $row = pg_fetch_row($cakeRecipe);
    echo $row[0] . "\n";
}
$array0 = array('jason' => 1, 'amy' => 2, 'jj' => 3);
echo json_encode($array0);

pg_close($pg);
