## STATUS
```sql
SHOW MASTER STATUS;
SHOW SLAVE STATUS\G;
```

## SETTING
```sql
CREATE DATABASE test_db;

USE test_db; 

CREATE TABLE ttt ( name VARCHAR(255) NOT NULL );

SELECT COUNT(*) FROM test_db.ttt;

```

## TEST
```sql
INSERT INTO test_db.ttt ( NAME ) VALUES ( 'kim' );
```

## REPLICATION
```sql
-- master
CREATE USER 'repl'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

```

```sql
-- slave
CHANGE MASTER TO MASTER_HOST='mysqlMaster', MASTER_LOG_FILE='mysql-bin.000003', MASTER_USER='repl', MASTER_PASSWORD='password', MASTER_LOG_POS=1941, MASTER_PORT=3306;

```

GRANT INSERT,SELECT,UPDATE,DELETE ON `test_db`.* TO `user`@`%`;