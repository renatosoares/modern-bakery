<?php
/**
 * Created by PhpStorm.
 * User: renato
 * Date: 21/06/17
 * Time: 10:31
 */

namespace Controllers;
use Models\Bread;

class BreadController
{
    public function getListBread(){
        return Bread::all()->toJson();
    }
}