import { Pool } from 'pg';

const pool = new Pool({
	connectionString: 'postgresql://neondb_owner:npg_JU7KgBceH1so@ep-proud-field-a15boirh-pooler.ap-southeast-1.aws.neon.tech/finora?sslmode=verify-full&channel_binding=require',
	// connectionString: 'postgresql://postgres:admin@localhost:5433/finora_local'
});

export default pool;
