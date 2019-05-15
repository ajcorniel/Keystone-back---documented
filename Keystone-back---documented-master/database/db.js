import config from "../helpers/config";
import pgp from "pg-promise";

const db = pgp()(process.env.DB_URL || config.db_url);

export default db;
