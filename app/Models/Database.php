<?php

namespace Models;
use Illuminate\Database\Capsule\Manager as Capsule;

class Database {

    function __construct() {
        $capsule = new Capsule;
        $capsule->addConnection([
            'driver' => DBDRIVER,
            'host' => DBHOST,
            'port' => '5432',
            'database' => DBNAME,
            'username' => DBUSER,
            'password' => DBPASS,
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
        ]);
        // Setup the Eloquent ORM…
//        $capsule->setAsGlobal();
        $capsule->bootEloquent();
    }

}