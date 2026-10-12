import pool from '../config/database.js';
import spendingFilterDTO from '../dto/response/spendingFilter.js';
import spendingAddNewRecordDTO from '../dto/request/spendingAddRecordDTO.js';

class transactionRepository {

	async getTransactionByPage(limit, offset, userId){
		let query = `
			select t.transaction_code as "transactionCode",
			t.transaction_total_amount as "transactionTotalAmount",
			t.transaction_date as "transactionDate",
			t.transaction_time as "transactionTime",
			td.transaction_detail_code as "transactionDetailCode",
			td.transaction_name as "transactionName",
			td.transaction_amount as "transactionAmount",
			c.category_name as "categoryName",
			c.id as "categoryId",
			td.wallet_id as "walletId"
			from transactions t inner join transaction_detail td on t.id_transaction = td.id_transaction
			inner join category c on td.category_id = c.id
			where t.user_id = $1 and td.deleted_at is null
			order by t.transaction_date desc 
			limit $2 
			offset $3
		`;

		let values = [
			userId,
			limit,
			offset
		];

		let result = pool.query(query, values);
		return (await result).rows;
	}

	// thêm mới chi tiêu
	async addNew(transactions, userId) {
		const query = `INSERT INTO transactions (
		transaction_code,
		transaction_total_amount,
		transaction_time, 
		transaction_date,
		place_name,
		place_location,
		place_address,
		transaction_note,
		user_id
		) 
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id_transaction;`;

		const values = [
			transactions.code,
			transactions.amount,
			transactions.time,
			transactions.date,
			transactions.placeName,
			transactions.placeLocation,
			transactions.placeAddress,
			transactions.note,
			userId
		];

		const result = await pool.query(query, values);
		return result.rows[0];
	}

	// tìm kiếm chi tiêu theo người dùng và tháng
	async filterByUserAndDate(userId, startDate, endDate) {
		const query = `
		SELECT code, spending_name, amount, spending_time, spending_date
		FROM spending
		WHERE user_id = $1 AND spending_date >= $2 AND spending_date < $3 AND deleted_at IS NULL
		ORDER BY spending_date DESC;
		`;

		const result = await pool.query(query, [
		userId,
		startDate,
		endDate
		]);

		return result.rows.map(row => new spendingFilterDTO(row));
	}

	// tìm kiếm chi tiêu theo người dùng và giá giao dịch
	async filterByUserAndCost(userId, minCost, maxCost) {
		const query = `
		SELECT code, spending_name, amount, spending_time, spending_date
		FROM spending
		WHERE user_id = $1 AND amount >= $2 AND amount <= $3 AND deleted_at IS NULL
		ORDER BY amount DESC;
		`;

		const result = await pool.query(query, [
			userId,
			minCost,
			maxCost
		]);

		return result.rows.map(row => new spendingFilterDTO(row));
	}

	// lọc chi tiêu theo người dùng và thời gian
	async filterByUserAndTime(userId, time) {
		const query = `
		select code, spending_name, amount, spending_time, spending_date
		from spending
		where user_id = $1 and spending_time = $2 and deleted_at is null
		order by spending_date desc;
		`;

		const result = await pool.query(query, [
			userId,
			time
		]);

		return result.rows.map(row => new spendingFilterDTO(row));
	}

	async transactionExpenseType(startTime, endTime, userId){
		let query = `
			select transaction_amount from transaction_detail td
			inner join transactions t on t.id_transaction = td.id_transaction 
			inner join category c on td.category_id = c.id
			where t.user_id = $1 and c.type = 'expense' and td.deleted_at is null and td.updated_at >= $2 and td.updated_at < $3
		`;

		let result = await pool.query(query, [userId, startTime, endTime]);
		return result.rows;
	}

	// cập nhật bản ghi chi tiêu
	async update(updateDTO, userId) {
		const query = `
		UPDATE transactions
		SET 
			code = $1,
			spending_name = $2,
			transaction_amount = $3,
			transaction_time = $4,
			transaction_date = $5,
			place_name = $6,
			place_location = $7,
			place_address = $8,
			note = $9,
			category_id = $10,
			updated_at = CURRENT_TIMESTAMP
		WHERE id_transaction = $11
		AND user_id = $12
		AND deleted_at IS NULL
		RETURNING *;
		`;

		const values = [
			updateDTO.code,
			updateDTO.name,
			updateDTO.amount,
			updateDTO.time,
			updateDTO.date,
			updateDTO.placeName,
			updateDTO.placeLocation,
			updateDTO.placeAddress,
			updateDTO.note,
			updateDTO.categoryID,
			updateDTO.id,
			userId
		];

		const result = await pool.query(query, values);

		return result.rows[0];
	}

	// lấy ra tổng số tiền của bản ghi gốc
	async getTotalAmount(idTransaction, userId){
		let query = `
			select transaction_total_amount from transactions where id_transaction = $1 and user_id = $2
		`;

		let values = [idTransaction, userId];

		let result = pool.query(query, values);
		return result.rows[0]
	}

	// tìm kiếm giao dịch theo date và time
	async filterTransactionByDateAndTime(startDate, endDate, time, userId){
		let query = `
			select * from transactions t inner join transaction_detail td on t.id_transaction = td.id_transaction
			where t.transaction_date >= $1 
			and t.transaction_date <= ($2::date + INTERVAL '1 day') 
			and t.transaction_time = $3 
			and t.user_id = $4
			and td.deleted_at is null
		`;

		let values = [startDate, endDate, time, userId];

		let result = await pool.query(query, values);
		return result.rows[0];
	}

	async updateTotalAmountOfTransactionByTransactionDetailCode(totalAmount, idTransaction){
		let query = `
			update transactions set
			transaction_total_amount = $1
			where id_transaction = $2
			returning *;
		`;

		let values = [totalAmount, idTransaction];

		let result = await pool.query(query, values);
		return result.rows[0];
	}

	async updateInDay(transactionUpdate, userId){
		let query = `
			update transactions set
			transaction_total_amount = $1
			where user_id = $2 and id_transaction = $3 and deleted_at is null
		`;

		let values = [transactionUpdate.amount, userId, transactionUpdate.idTransaction];

		let result = await pool.query(query, values);
		return result.rows[0];
	}

	async getDateExist(transaction, userId){
		let query = `
			select td.transaction_detail_code as transactionDetailCode, td.id_transaction as transactionId from transaction_detail td join transactions t on td.id_transaction = t.id_transaction
			where t.transaction_date = $1 
			and t.transaction_time = $2
			and t.place_name = $3 
			and t.user_id = $4
		`;

		let values = [transaction.date, transaction.time, transaction.placeName, userId];

		let result = await pool.query(query, values);
		return result.rows;
	}

	// soft delete giao dịch
	async softDelete(idTransaction) {
		const query = `
		UPDATE transactions SET deleted_at = CURRENT_TIMESTAMP
		WHERE id_transaction = $1 RETURNING *;`;

		let values = [idTransaction];

		let result = await pool.query(query, values);
		return result.rows[0];
	}

	// lấy ra idTransaction từ transactionCode của 1 giao dịch
	async getITransactionFromTransactionCode(transactionCode, userId){
		let query = `
			select t.id_transaction from transactions t 
			where t.transaction_code = $1 
			and t.user_id = $2
		`;

		let values = [transactionCode, userId];

		let result = await pool.query(query, values);
		return result.rows[0];
	}

	// lấy ra danh sách giao dịch con chưa bị xóa của 1 giao dịch
	async getAllRecordChildActiveByTransactionId(transaction, userId){
		let query = `
			select td.transaction_detail_code from transaction_detail td inner join transactions t on td.id_transaction = t.id_transaction
			where td.id_transaction = $1 and t.user_id = $2
		`;

		let values = [transaction.id_transaction, userId];

		let result = await pool.query(query, values);

		return result.rows;
	}


	// lấy ra toàn danh sách bản ghi chi tiêu theo số lượng của trang
	async getDataByPage(userId, page, pageSize) {
		const offset = (page - 1) * pageSize;
		const query = `
		SELECT *
		FROM spending
		WHERE user_id = $1 AND deleted_at IS NULL
		ORDER BY spending_date DESC
		LIMIT $2 OFFSET $3;
		`;

		const result = await pool.query(query, [userId, pageSize, offset]);
		return result.rows;
	}

	// tìm kiếm chi tiêu theo người dùng và tên chi tiêu hoặc mã chi tiêu
	async searchByUserAndNameOrCode(userId, searchTerm) {
		const query = `
		SELECT *
		FROM spending
		WHERE user_id = $1 AND (spending_name ILIKE $2 OR code ILIKE $2) AND deleted_at IS NULL
		ORDER BY spending_date DESC;
		`;

		const result = await pool.query(query, [userId, `%${searchTerm}%`]);
		return result.rows;
	}

	// lấy ra danh sách địa điểm mua hàng theo tên địa điểm
	async getListPlaceBought(placeName) {
		const query = `
		SELECT DISTINCT place_name
		FROM spending
		WHERE place_name ILIKE $1 AND deleted_at IS NULL;
		`;

		const result = await pool.query(query, [`%${placeName}%`]);
		return result.rows;
	}

	async settingTransaction(userId){
		let query = `
			select transaction_prefix, transaction_number, transaction_detail_prefix, transaction_detail_number
			from setting
			where user_id = $1
		`;

		let values = [userId];

		let result = await pool.query(query, values);
		return result.rows[0];
	}

	async updateNumberTrans(trans_number, trans_detail_number, userId){
		let query = `
		INSERT INTO setting (
			user_id,
			transaction_number,
			transaction_detail_number
		)
		VALUES ($1, $2, $3)
		ON CONFLICT (user_id)
		DO UPDATE SET
			transaction_number = EXCLUDED.transaction_number,
			transaction_detail_number = EXCLUDED.transaction_detail_number
		RETURNING *;
		`;


		let values = [userId, trans_number, trans_detail_number];

		let result = await pool.query(query, values);
		return result.rows[0];
	}

}

export default new transactionRepository();
