<?php
require 'start.php';

use Controllers\OrderController;
use Models\Order;
//$order = OrderController::create_order("integral", true);

//dd(Order::all()->toJson()); // FIXME criar seeds e retornar o json para o html, conf var yml