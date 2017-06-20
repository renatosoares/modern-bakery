<?php
(new Dotenv\Dotenv(__DIR__))->load();
$dbname = $_ENV['DB_DEVELOPMENT_HOST'];
$host = $_ENV['DB_DEVELOPMENT_DATABASE'];
$dbuser = $_ENV['DB_DEVELOPMENT_USERNAME'];
$dbpass = $_ENV['DB_DEVELOPMENT_PASSWORD'];

$dsn = "pgsql:host=$host;port=5432;dbname=$dbname;user=$dbuser;password=$dbpass";

try{
    // create a PostgreSQL database connection
    $conn = new PDO($dsn);

    // display a message if connected to the PostgreSQL successfully
    if($conn){
        echo "Connected to the <strong>$dbname</strong> database successfully!";
    }

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO orderbakery (product, queue, available, delivered)
    VALUES ('doce', true, false, false)";
    // use exec() because no results are returned
    $conn->exec($sql);
    echo "New record created successfully";
}catch (PDOException $e){
    // report error message
    echo $e->getMessage();
}