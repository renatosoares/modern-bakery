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


//dd($listOrder->listQueue());


switch ($_GET['actionbakery']){
    case "breadlist":
       $breadList = new BreadController();
       echo $breadList->getListBread();
       break;
    case "sendqueue":
        $breadSendValue = $_REQUEST["breadSendValue"];
        $breadOrder = new OrderController();
        $breadOrder->createOrder($breadSendValue, true);
        echo $breadOrder->listQueue();
        break;
    case "listqueue":
        $breadOrder = new OrderController();
        echo $breadOrder->listQueue();
        break;

}

