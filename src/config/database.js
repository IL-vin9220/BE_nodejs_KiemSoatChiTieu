import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_JU7KgBceH1so@ep-proud-field-a15boirh-pooler.ap-southeast-1.aws.neon.tech/finora?sslmode=require&channel_binding=require',
//   ssl: {
//     rejectUnauthorized: false
//   }
});

export default pool;
