<?php
namespace Models;
use Illuminate\Database\Eloquent\Model as Eloquent;
class Order extends Eloquent {
    protected $table = 'order_bakery';
    protected $fillable = ['product','queue','available','delivered'];
//    protected $timestamp = false;
}

