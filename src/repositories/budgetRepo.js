import pool from '../config/database.js';

class budgetRepository{
    async getAllBudget(userId){
        let query = `
            select budget_name as "budgetName",
            description,
            amount_limit::int as "amountLimit",
            current_amount::int as "currentAmount",
            to_char(start_date, 'DD/MM/YYYY') as "startDate",
            to_char(end_date, 'DD/MM/YYYY') as "endDate",
            status
            from budget
            where user_id = $1 and deleted_at is null
            order by created_at desc
        `;

        let values = [
            userId
        ];

        let result = await pool.query(query, values);
        return result.rows;
    }

    async create(budget, userId){
        let query = `
            insert into budget(budget_name, description, amount_limit, current_amount, start_date, end_date, alert_budget, user_id)
            values($1, $2, $3, $4, $5, $6, $7, $8) returning *;
        `;

        let values = [
            budget.budgetName,
            budget.description,
            budget.amountLimit,
            budget.currentAmount,
            budget.startDate,
            budget.endDate,
            budget.alertBudget,
            userId
        ];

        let result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async updateBudget(budget, userId){
        let query = `
            update budget set
                budget_name = $2,
                description = $3,
                amount_limit = $4,
                current_amount = $5,
                start_date = $6,
                end_date = $7,
                status = $8,
                alert_budget = $9,
                updated_at = now()
            where user_id = $10 and budget_id = $1 and deleted_at is null
            return *;
        `;

        let values = [
            budget.budgetId,
            budget.budgetName,
            budget.description,
            budget.amountLimit,
            budget.currentAmount,
            budget.startDate,
            budget.endDate,
            budget.status,
            budget.alertBudget,
            userId
        ];

        let result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async softdeletedBudget(budgetId, userId){
        let query = `
            update budget set
                deleted_at = now();
            where user_id = $1 and budget_id = $2 and deleted_at is null
            returning *;
        `;

        let values = [
            userId,
            budgetId
        ];

        let result = await pool.query(query, values);
        return result.rows[0] || null;
    }
    
}

export default new budgetRepository();