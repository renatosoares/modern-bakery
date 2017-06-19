<?php
namespace Models;
use \Illuminate\Database\Eloquent\Model;
class Order extends Model {
    protected $table = 'orderbakery';
    protected $fillable = ['product','queue','available','delivered'];
//    protected $timestamp = false;
}

