import { Pool } from "pg";

const getPool = (connectionString, schema) => {
  const pool = new Pool({
    connectionString,
  });
  pool.on("connect", (client) => {
    client.query(`SET search_path TO "${schema}", public`);
    console.info(
      `${new Date()} Connected to pool ${schema}, ${connectionString} ...`
    );
  });

  pool.on("error", (err) => {
    console.error("An idle client has experienced an error", err.stack);
  });
  return pool;
};

const dbPool = getPool(process.env.BASE_DATABASE_URL, "public");
const dbPoolStripe = getPool(process.env.BASE_DATABASE_URL, process.env.SCHEMA);

const createQueryRunner =
  (pool) =>
  async ({
    sql,

    values,
    callback,
  }: RunRawQueryInput): Promise<RawQueryResult> => {
    try {
      const { rows, rowCount } = await pool.query(sql, values, callback);
      return {
        items: rows,
        item: rows[0],
        success: rowCount > 0,
      };
    } catch (err) {
      console.log("Simple query error", err);
      return {
        items: [],
        item: {},
        success: false,
        error: err,
      };
    }
  };

export interface RawQueryResult {
  item: object;
  items: object[];
  success: boolean;
  error?: any;
}
export interface RunRawQueryInput {
  sql: string;
  values?: (string | number)[];
  callback?: () => void;
}

const publicQueryRunner = createQueryRunner(dbPool);
const stripeQueryRunner = createQueryRunner(dbPoolStripe);

export default {
  publicQueryRunner,
  stripeQueryRunner,
};
