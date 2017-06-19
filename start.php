<?php
require 'config.php';
require __DIR__ . '/vendor/autoload.php';
use Models\Database;
use Whoops\Run as Run;
use Whoops\Handler\PrettyPageHandler as PrettyPageHandler;

//Initialize Illuminate Database Connection
new Database();

$whoops = new Run;
$whoops->pushHandler(new PrettyPageHandler);
$whoops->register();