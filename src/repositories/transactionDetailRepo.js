import pool from '../config/database.js';
import spendingFilterDTO from '../dto/response/spendingFilter.js';
import spendingAddNewRecordDTO from '../dto/request/spendingAddRecordDTO.js';

class transactionDetailRepository {
    async addNew(transactionDetail, idTransaction){
        let query = `
        INSERT INTO transaction_detail (
		transaction_detail_code,
		transaction_name,
        transaction_amount,
		category_id,
		id_transaction
		) 
		VALUES ($1,$2,$3,$4,$5) RETURNING *;
        `;

        let values = [
            transactionDetail.code,
            transactionDetail.name,
            transactionDetail.amount,
            transactionDetail.categoryId,
            idTransaction,
        ];

        let result = await pool.query(query, values);
        return result.rows[0];
    }

    async update(transactionDetail, transactionCode, userId){
        let query = `
            update transaction_detail td set
                td.transaction_name = $1,
                td.transaction_amount = $2,
                td.category_id = $3
            from transactions t
            where t.transaction_code = $4 and t.user_id = $5 and td.deleted_at is null
            return *;
        `;

        let values = [transactionDetail.name, transactionDetail.amount, transactionDetail.categoryId, transactionCode, userId];

        let result = pool.query(query, values);
        return result.rows
    }

    async updateIdTransOfTransactionDetail(idTransaction, transactionDetailCode){
        let query = `
            update transaction_detail td set
            id_transaction = $1
            where td.transaction_detail_code = $2 return *;
        `;
        
        let values = [idTransaction, transactionDetailCode];

        let result = pool.query(query, values);
        return result.rows[0];
    }
}

export default new transactionDetailRepository();