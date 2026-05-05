import pool from "../config/database.js";

class fundRepository{
    async getAllFundByUserId(userId){
        let query = `
            select * from fund where user_id = $1 and deleted_at is null
        `;

        let values = [
            userId
        ];

        let result = await pool.query(query, values);
        return result.rows;
    }

    async createNewFund(fund, userId){
        let query = `
            insert into fund(fund_name, fund_icon, amount_min, amount_max, amount, fund_color, description, amount_target, type, user_id) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            returning *;
        `;

        let values = [
            fund.fundName,
            fund.fundIcon,
            fund.amountMin,
            fund.amountMax,
            fund.amount,
            fund.fundColor,
            fund.description,
            fund.amountTarget,
            fund.type,
            userId
        ];

        let result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async updateFund(fund, userId){
        let query = `
            update fund set
                isactive = $2,
                fund_name = $3,
                fund_icon = $4,
                amount_min = $5,
                amount_max = $6,
                amount = $7,
                fund_color = $8,
                description = $9,
                amount_target = $10,
                type = $11,
                updated_at = current_timestamp
            where user_id = $12 and fund_id = $1 and deleted_at is null
        `;

        let values = [
            fund.fundId,
            fund.isActive,
            fund.fundName,
            fund.fundIcon,
            fund.amountMin,
            fund.amountMax,
            fund.amount,
            fund.fundColor,
            fund.description,
            fund.amountTarget,
            fund.type,
            userId
        ];

        let result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async softDeletedFund(fundId, userId){
        let query = `
            update fund set deleted_at = current_timestamp
            where user_id = $1 and fund_id = $2 and deleted_at is null
        `;

        let values = [
            userId,
            fundId
        ];

        let result = await pool.query(query, values);
        return result.rows[0] || null;
    }


}

export default new fundRepository();