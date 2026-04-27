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

    async updateIdTransOfTransactionDetail(idTransaction, transactionDetail){
        let query = `
            update transaction_detail td set
            id_transaction = $1,
            transaction_name = $2,
            transaction_amount = $3,
            category_id = $4,
            transaction_detail_note = $5,
            transaction_image = $6
            where td.transaction_detail_code = $7 
            returning *;
        `;
        
        let values = [
            idTransaction, 
            transactionDetail.name,
            transactionDetail.amount,
            transactionDetail.categoryId,
            transactionDetail.transactionDetailNote??null,
            transactionDetail.transactionImage??null,
            transactionDetail.code
        ];

        let result = await pool.query(query, values);
        return result.rows;
    }

    // xóa transaction detail theo code
    async softDeleteTransactionDetailByCode(transactionDetailCode, userId){
        let query = `
            update transaction_detail td set
                deleted_at = current_timestamp
            from transactions t
            where transaction_detail_code = $1 and t.user_id = $2
            returning *;
        `;

        let values = [transactionDetailCode, userId];

        let result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // xóa toàn bộ giao dịch con của transaction
    async softDeleteAllTransactionDetail(idTransaction){
        let query = `
            update transaction_detail set
                deleted_at = current_timestamp
            where id_transaction = $1
            returning *;
        `;

        let values = [idTransaction];

        let result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async searchTransactionList(itemSearch, userId){
        let query = `
            select t.transaction_code, t.transaction_total_amount, t.transaction_date, t.transaction_time,
            td.transaction_detail_code, td.transaction_name, td.transaction_amount, c.category_name
            from transaction_detail td inner join transactions t on td.id_transaction = t.id_transaction
            inner join category c on td.category_id = c.id
            where td.transaction_name ilike $1 and t.user_id = $2
        `;

        let values = [`%${itemSearch}%`, userId];

        let result = await pool.query(query, values);
        return result.rows;
    }

    // lấy ra idTransaction từ transactionDetailCode chưa bị deleted
    async getIdTransactionFromTransactionDetailCode(transactionDetailCode, userId){
        let query = `
            select td.id_transaction 
            from transaction_detail td inner join transactions t on td.id_transaction = t.id_transaction
            where td.transaction_detail_code = $1 
            and t.user_id = $2 
            and td.deleted_at is null
        `;

        let values = [transactionDetailCode, userId];

        let result = await pool.query(query, values);

        return result.rows[0];
    }
}

export default new transactionDetailRepository();