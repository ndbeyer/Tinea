import sql from "sql-tagged-template-literal";

import db from "../db";
import { formatSQLDate } from "../utils/time";

const baseQuery = sql`SELECT 
		id, 
		first_name as "firstName", 
		last_name as "lastName", 
		email, 
		type, 
		school_name as "schoolName", 
		user_name as "userName", 
		created_at as "createdAt" 
	FROM "user"`;

type Role = "USER" | "ROOT";
class User {
  id!: string;
  email!: string;
  createdAt!: string;

  constructor(data) {
    Object.assign(this, data);
  }

  static async gen({ id }: { id?: string }) {
    const res = await db.query(`${baseQuery} WHERE id = $1`, [id]);
    const result = res.rows[0];
    if (!result) {
      return null;
    } else {
      const user = new User(result);
      return {
        ...user,
      };
    }
  }

  static async genMult({ ids }: { ids?: string[] }) {
    const res = await db.query(
      `${baseQuery} ${ids ? `WHERE id = ANY($1)` : ""}`,
      ids ? [ids] : undefined
    );
    const users = res.rows.map((result) => {
      const user = new User(result);
      return {
        ...user,
        createdAt: formatSQLDate(user.createdAt),
      };
    });
    return users;
  }

  roles: () => Promise<Role[]> = async () => {
    const res = await db.query(
      `SELECT role FROM "user_role" WHERE user_id = $1`,
      [this.id]
    );
    const roles = res.rows.map(({ role }) => role);
    return roles;
  };
}

export default User;
