<?php

namespace Controllers;

use Models\Order;

class OrderController
{
    public function createOrder($product, $queue = false, $available = false, $delivered = false){
       Order::create(['product'=>$product,'queue'=>$queue,'available'=>$available, 'delivered'=>$delivered]);
    }

    public function listQueue(){
      return  Order::all()->toJson();
    }
}
