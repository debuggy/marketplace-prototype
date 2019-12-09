const { Pool, Client } = require("pg");
const CREATE_TABLE = `CREATE TABLE test_gin (
  tags varchar[]
) ;`;
const INSERT_DATA = `INSERT INTO test_gin(tags) VALUES (Array['test', 'test2']);`;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "openpai",
  password: "123qwe",
  port: 54321
});

let count = 0;
const interval = setInterval(() => {
  count += 1;
  pool.query(INSERT_DATA);
  if (count === 10000) {
    clearInterval(interval);
  }
}, 1);
console.log('insert complete')
