<?php

namespace Controllers;

use Models\Order;

class OrderController
{
    public function store($product, $queue = false, $available = false, $delivered = false){
       Order::create(['product'=>$product,'queue'=>$queue,'available'=>$available, 'delivered'=>$delivered]);
    }

    public function listQueue(){
      return  Order::all()->toJson();
    }

    public function update($request = [], $id){
        $update = Order::find($id);
        $update->queue = $request["queue"];
        $update->available = $request["available"];
        $update->delivered = $request["delivered"];
        $update->save();
    }
    public function destroy($id){
        Order::destroy($id);
    }
}
