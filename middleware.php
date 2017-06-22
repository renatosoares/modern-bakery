<?php
require 'start.php';

use Controllers\OrderController;
use Controllers\BreadController;

use Models\Bread;
use Models\Order;

//$order = OrderController::create_order("integral", true);
//dd(date('Y-m-d H:i:s.u'));
//$listOrder = new OrderController();
//Bread::create(["bread"=>"integral"]);


//dd($listOrder->listQueue()); // FIXME retornar o json para o html

$breadList = new BreadController();

switch ($_GET['actionbakery']){
    case "breadlist":
       $breadList = new BreadController();
       echo $breadList->getListBread();
       break;
}

