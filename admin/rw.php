<?php
$fileData = $_POST["data"];
$file = fopen("../content/articles.html", "wb") or die("Unable to open file!");
fwrite($file, $fileData);
fclose($file);
?>
