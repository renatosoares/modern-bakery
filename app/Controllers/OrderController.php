<?php

namespace Controllers;

use Models\Order;

class OrderController
{
    public static function create_order($product, $queue = false, $available = false, $delivered = false){
        $order = Order::create(['product'=>$product,'queue'=>$queue,'available'=>$available, 'delivered'=>$delivered]);
//        $order = new Order();
//        $order = $order->fill(['product'=>$product,'queue'=>$queue,'available'=>$available, 'delivered'=>$delivered]);
        return $order;
    }

    public function listQueue(){
      return  Order::all()->toJson();
    }
}
