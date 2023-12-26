import pg from "pg";
const { Pool } = pg;
// Configure the connection to your PostgreSQL database

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "servicy",
  password: "aezakmi123",
  port: 5000,
});
pool.connect();
export default pool;
