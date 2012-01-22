<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$o = '<pre>';
$o .= date('Y-m-d H:i:s');
$o .= "\n";

//sleep(2);

$o .= date('Y-m-d H:i:s');
$o .= "\n";


$context = new ZMQContext(100);

//  Socket to talk to clients
$responder = new ZMQSocket($context, ZMQ::SOCKET_PULL);
$responder->connect("tcp://localhost:5555");

//  Wait for next request from client
$guid = $responder->recv();
header('X-guid: ' . $guid);

echo $o;
echo date('Y-m-d H:i:s');
echo "\n".$guid."</pre>";
