const mysql = require("mysql2");

let endCount = Infinity;

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
    connection.query(
      "INSERT INTO test_db.ttt ( NAME ) VALUES ( 'kim' )",
      function (error) {
        if (error) throw error;

        //   console.log("success:", i);
      }
    );
  }

  connection.query("SELECT count(*) as end FROM ttt", (error, results) => {
    const logQuery = selectQuery(0);
    logQuery(error, results);
    const [row] = results;
    endCount = row.count;
  });
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
  let count = 0;
  while (endCount > count) {
    ms += 10;
    await new Promise((r) => setTimeout(r, 10));
    connection.query("SELECT count(*) as count FROM ttt", (error, results) => {
      const logQuery = selectQuery(ms);
      logQuery(error, results);
      const [row] = results;
      count = row.count;
    });
  }
  connection.end();
})();

function selectQuery(ms) {
  return (error, results) => {
    if (error) throw error;
    const [row] = results;
    console.log("This is name: ", row, ms);
  };
}
