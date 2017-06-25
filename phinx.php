<?php

// load our environment files - used to store credentials & configuration
(new Dotenv\Dotenv(__DIR__))->load();
return
    [
        'paths' => [
            'migrations' => 'app/db/migrations',
            'seeds' => 'app/db/seeds',
        ],
        'environments' =>
            [
                'default_database' => 'development',
                'default_migration_table' => 'phinxlog',
                'development'      =>
                    [
                        'adapter' => 'pgsql',
                        'host' => $_ENV['DB_DEVELOPMENT_HOST'],
                        'name' => $_ENV['DB_DEVELOPMENT_DATABASE'],
                        'user' => $_ENV['DB_DEVELOPMENT_USERNAME'],
                        'pass' => $_ENV['DB_DEVELOPMENT_PASSWORD'],
                        'port' => 5432,
                        'charset' => 'utf8',
                        'collation' => 'utf8_unicode_ci',
                    ],
                'production' =>
                    [
                        'adapter' => 'pgsql',
                        'host' => $_ENV['DB_PRODUCTION_HOST'],
                        'name' => $_ENV['DB_PRODUCTION_DATABASE'],
                        'user' => $_ENV['DB_PRODUCTION_USERNAME'],
                        'pass' => $_ENV['DB_PRODUCTION_PASSWORD'],
                        'port' => 5432,
                        'charset' => 'utf8',
                        'collation' => 'utf8_unicode_ci',
                    ],
            ],
    ];