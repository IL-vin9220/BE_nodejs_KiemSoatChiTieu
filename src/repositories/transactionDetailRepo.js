import pool from '../config/database.js';
import spendingFilterDTO from '../dto/response/spendingFilter.js';
import spendingAddNewRecordDTO from '../dto/request/spendingAddRecordDTO.js';

class transactionRepository {
    async addNew(transactionDetail, categoryId, userId){
        let query = `
        INSERT INTO transaction_detail (
		transaction_detail_code,
		transaction_name,
        transaction_amount,
		category_id,
		user_id
		) 
		VALUES ($1,$2,$3,$4,$5) RETURNING *;
        `;

        let values = [
            transactionDetail.code,
            transactionDetail.name,
            transactionDetail.amount,
            categoryId,
            userId,
        ];

        let result = await pool.query(query, values);
        return result.rows[0];
    }
}

export default new transactionRepository();