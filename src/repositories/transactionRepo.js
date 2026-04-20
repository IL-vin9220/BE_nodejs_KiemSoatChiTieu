import pool from '../config/database.js';
import spendingFilterDTO from '../dto/response/spendingFilter.js';
import spendingAddNewRecordDTO from '../dto/request/spendingAddRecordDTO.js';

class transactionRepository {

	async getTransactionByPage(limit, offset, userId){
		let query = `
			select * from transactions where user_id = $1 order by transaction_date desc limit $2 offset $3
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
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;`;

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
		UPDATE spending
		SET 
			code = $1,
			spending_name = $2,
			amount = $3,
			spending_time = $4,
			spending_date = $5,
			place_name = $6,
			place_location = $7,
			place_address = $8,
			note = $9,
			category_id = $10,
			updated_at = CURRENT_TIMESTAMP
		WHERE id = $11
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

	// gán thẻ chi tiêu bị xóa
	async softDelete(id) {
		const query = `
		UPDATE spending SET deleted_at = CURRENT_TIMESTAMP
		WHERE id = $1 RETURNING *;`;

		const result = await pool.query(query, [id]);
			return result.rows[0];
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

}

export default new transactionRepository();
