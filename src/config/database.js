import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:admin@localhost:5432/KiemSoatChiTieu',
//   ssl: {
//     rejectUnauthorized: false
//   }
});

export default pool;
