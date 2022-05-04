/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import sql from 'sql-tagged-template-literal';
import db from '../db';
import dbTestData from '../dbTestData';

const types = {
	//   product_target: sql`
	// 	CREATE TYPE "product_target" AS ENUM
	// 	('TEACHER', 'PUPIL');
	// `,
	//   user_type: sql`
	// 		CREATE TYPE "user_type" AS ENUM
	// 		('TEACHER', 'PUPIL');
	// 	`,
};

const tables = {
	user: sql`
	CREATE TABLE "user"
  (
    id serial NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
	  email_confirmed boolean,
	  confirmation_code text NOT NULL,
    created_at timestamp with time zone NOT NULL,
	  updated_at timestamp with time zone NOT NULL,
	  terms_accepted_at timestamp with time zone NOT NULL,
      PRIMARY KEY (id)
  )`,
};

const reportError = (error, relation) => {
	if (error.message === `relation "${relation}" already exists`) {
		console.log(`...db.${relation} initialization not required`);
	} else {
		console.log(`>>> error initializeing db.${relation}`, error);
	}
};

const cleanup = async () => {
	const reverseTablesNames = Object.keys(tables).reverse();
	for (const tableName of reverseTablesNames) {
		await db.query(`DROP TABLE IF EXISTS "${tableName}"`);
	}
	const typeNames = Object.keys(types);
	for (const typeName of typeNames) {
		await db.query(`DROP TYPE IF EXISTS "${typeName}"`);
	}
	console.log(`...dropped all tables`);
};

const maybeInjectAsString = (value: string) => {
	return value.includes('$$') ? value.replace('$$', '') : `'${value}'`;
};

const initializeDb = async () => {
	await cleanup();

	for (const typeName in types) {
		try {
			await db.query(types[typeName]);
			console.log(`...initialized type ${typeName}`);
		} catch (e) {
			reportError(e, typeName);
		}
	}

	for (const tableName in tables) {
		try {
			await db.query(tables[tableName]);
			// testData
			const testDataRows = dbTestData[tableName];
			for (const row of testDataRows) {
				const columns = Object.keys(row);
				const values = Object.values(row);
				const query = `INSERT INTO "${tableName}" (${columns.join(', ')}) VALUES (${values
					.map((val) => maybeInjectAsString(val as string))
					.join(', ')}) ON CONFLICT DO NOTHING`;
				try {
					await db.query(query);
				} catch (e) {
					throw new Error(`>>> error with query ${query} into ${tableName}: ${e}`);
				}
			}
			console.log(`...initialized table ${tableName}`);
		} catch (e) {
			reportError(e, tableName);
		}
	}
};

export default initializeDb;
