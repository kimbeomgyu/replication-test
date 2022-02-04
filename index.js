const mysql = require("mysql2");

(async function () {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 13306,
    user: "root",
    password: "password",
    database: "test_db",
  });

  connection.connect();
  connection.query("SELECT count(*) as start FROM ttt", selectQuery(0));
  for (let i = 0; i < 1000; i++) {
    connection.query("INSERT INTO test_db.ttt ( NAME ) VALUES ( 'kim' )", function (error) {
      if (error) throw error;

      //   console.log("success:", i);
    });
  }

  connection.query("SELECT count(*) as end FROM ttt", selectQuery(0));
  connection.end();
})();

(async function () {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 13307,
    user: "root",
    password: "password",
    database: "test_db",
  });

  connection.connect();
  let ms = 0;
  while (true) {
    ms += 10;
    await new Promise((r) => setTimeout(r, 10));
    connection.query("SELECT count(*) as count FROM ttt", selectQuery(ms));
  }
})();

function selectQuery(ms) {
  return (error, results) => {
    if (error) throw error;
    for (const row of results) {
      console.log("This is name: ", row, ms);
    }
  };
}
