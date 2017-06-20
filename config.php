<?php
(new Dotenv\Dotenv(__DIR__))->load();
define('DBDRIVER','pgsql');
define('DBHOST',$_ENV['DB_DEVELOPMENT_HOST']);
define('DBNAME',$_ENV['DB_DEVELOPMENT_DATABASE']);
define('DBUSER',$_ENV['DB_DEVELOPMENT_USERNAME']);
define('DBPASS',$_ENV['DB_DEVELOPMENT_PASSWORD']);