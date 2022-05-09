import sql from 'sql-tagged-template-literal';

import db from '../db';
import { formatSQLDate } from '../utils/time';

const baseQuery = sql`SELECT 
	id,  
    created_at as "createdAt",
  	updated_at as "updatedAt",
	pzn,
    title,
    image,
    info_text as "infoText",
    price_in_cents as "priceInCents",
    application_area as "applicationArea",
    dosage_form as "dosageForm",
    application_interval as "applicationInterval",
    application_duration as "applicationDuration",
    manufacturer,
    amount
	FROM "pharmaceutical"`;

class Pharmaceutical {
	id!: string;
	createdAt!: string;
	updatedAt!: string;
	pzn!: string;
	title!: string;
	image!: string;
	infoText!: string;
	priceInCents!: string;
	applicationArea!: 'FOOT_FUNGUS' | 'NAIL_FUNGUS';
	dosageForm!: string;
	applicationInterval!: string;
	applicationDuration!: string;
	manufacturer!: string;
	amount!: string;

	constructor(data) {
		Object.assign(this, data);
	}

	static async gen({ id }: { id?: string }) {
		const res = await db.query(`${baseQuery} WHERE id = $1`, [id]);
		const result = res.rows[0];
		if (!result) {
			return null;
		} else {
			const pharmaceutical = new Pharmaceutical(result);
			return {
				...pharmaceutical,
				createdAt: formatSQLDate(pharmaceutical.createdAt),
				updatedAt: formatSQLDate(pharmaceutical.updatedAt),
			};
		}
	}

	static async genMult({ ids }: { ids?: string[] }) {
		const res = await db.query(
			`${baseQuery} ${ids ? `WHERE id = ANY($1)` : ''}`,
			ids ? [ids] : undefined
		);
		const pharmaceuticals = res.rows.map((result) => {
			const pharmaceutical = new Pharmaceutical(result);
			return {
				...pharmaceutical,
				createdAt: formatSQLDate(pharmaceutical.createdAt),
				updatedAt: formatSQLDate(pharmaceutical.updatedAt),
			};
		});
		return pharmaceuticals;
	}
}

export default Pharmaceutical;
