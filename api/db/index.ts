import nodePostgres from 'pg';
import CONSTS from '../consts';
const { Pool } = nodePostgres;

const productionConfig = {
	connectionString: CONSTS.API_DB_CONNECTION_STRING,
	ssl: {
		require: true,
		rejectUnauthorized: false,
	},
};

const developmentConfig = {
	port: CONSTS.API_DB_PORT,
	host: CONSTS.API_DB_HOST,
	database: CONSTS.API_DB_DATABASE,
	user: CONSTS.API_DB_USER,
	password: CONSTS.API_DB_PASSWORD,
};

const pool = new Pool(CONSTS.DEVELOPMENT ? developmentConfig : productionConfig);

const dbAdapter = {
	query: async (sql: string, args?: unknown[]) => {
		return await pool.query(sql, args);
	},
	end: pool.end,
};

export default dbAdapter;
