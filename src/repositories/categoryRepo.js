import pool from '../config/database.js';

class categoryRepository{
    async createNew(category, userId){
        try{
            let query = `
                insert into category(category_name, icon, parent_id, type, description, user_id) values($1, $2, $3, $4, $5, $6) returning *;
            `;

            let values = [
                category.name,
                category.icon,
                category.parentId,
                category.type,
                category.description,
                userId
            ];

            let result = await pool.query(query, values);
            return result.rows[0];
        }
        catch(error){
            console.error("Lỗi thêm danh mục repo: ", error);
        }
    }

    async updateCategory(category, userId){
        try{
            let query = `
                update category set
                    category_name = $1,
                    icon = $2,
                    parent_id = $3,
                    type = $4,
                    status = $5,
                    description = $6
                    updated_at = current_timestamp
                where user_id = $7 and category_code = $8 and deleted_at is not null
                returning *;
            `;

            let values = [
                category.name,
                category.icon,
                category.parentId,
                category.type,
                category.status,
                category.description,
                userId,
                category.code
            ];

            let result = await pool.query(query, values);
            console.log("result: ", result);
            return result.rows[0] || null;
        }
        catch(error){
            console.error(error);
        }
    }

    async softDeleteCategory(categoryId, userId){
        let query = `
            update category set
                deleted_at = current_timestamp
            where user_id = $1 and id = $2 and deleted_at is null
            returning *;
        `;

        let values = [
            userId,
            categoryId
        ];

        let result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async searchCategory(categoryItem, userId){
        try{
            let query = `
                select * from category where user_id = $1 and category_name ilike $2
            `;

            let values = [userId, `%${categoryItem.name.trim()}%`];

            let result = await pool.query(query, values);
            return result.rows;
        }
        catch(error){
            console.error(error);
        }
    }

    async getAllCategory(userId){
        try{
            let query = `
                select category_name, icon, parent_id, type, status, description from category where user_id = $1 and deleted_at is null
            `;

            let values = [userId];

            let result = await pool.query(query, values);
            return result.rows;
        }
        catch(error){
            console.error(error);
        }
    }

    async listCategoryExpense(userId){
        let query = `
            select sum(transaction_amount) as "totalAmount"
            from transaction_detail td
            inner join category c on td.category_id = c.id
            inner join transactions t on td.transaction_id = t.transaction_id
            where t.user_id = $1 and c.type = 0
        `;

        let values = [
            userId
        ];

        let result = await pool.query(query, values);
        return result.rows[0];
    }
}

export default new categoryRepository();