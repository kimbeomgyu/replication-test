CREATE USER 'repl'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

FLUSH PRIVILEGES;

CREATE DATABASE test_db; 

USE test_db; 

CREATE TABLE ttt ( name VARCHAR(255) NOT NULL );