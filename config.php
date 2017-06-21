<?php
(new Dotenv\Dotenv(__DIR__))->load();
switch ($_ENV['DB_ENV']){
    case "development":
        define('DBDRIVER','pgsql');
        define('DBHOST',$_ENV['DB_DEVELOPMENT_HOST']);
        define('DBNAME',$_ENV['DB_DEVELOPMENT_DATABASE']);
        define('DBUSER',$_ENV['DB_DEVELOPMENT_USERNAME']);
        define('DBPASS',$_ENV['DB_DEVELOPMENT_PASSWORD']);
        break;
    case "production":
        define('DBDRIVER','pgsql');
        define('DBHOST',$_ENV['DB_PRODUCTION_HOST']);
        define('DBNAME',$_ENV['DB_PRODUCTION_DATABASE']);
        define('DBUSER',$_ENV['DB_PRODUCTION_USERNAME']);
        define('DBPASS',$_ENV['DB_PRODUCTION_PASSWORD']);
        break;
}