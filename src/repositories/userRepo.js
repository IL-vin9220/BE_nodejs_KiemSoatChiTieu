import pool from '../config/database.js';
import user from '../dto/request/userDTO.js';

class UserRepository{

    // add new user
    async addNewUser(userRecord){
        const query = `INSERT INTO users (
		username,
        password,
        email,
        sdt,
        name,
        avatar,
        status,
        create_at
		) 
		VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;

        let values = [
            userRecord.username,
            userRecord.password,
            userRecord.email,
            userRecord.sdt,
            userRecord.name,
            userRecord.avatar,
            userRecord.status,
            userRecord.createdAt
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    
    // block user
    async blockUser(id){
        let query = `
            update users set status = 0 where id = $1
            return *
        `;

        let result = await pool.query(query, [id]);
        return result.rows[0];
    }


    // update user
    async updateUser(user, userID){
        let query = `
            update users set
                username = $1,
                password = $2,
                email = $3
                sdt = $4,
                name = $5,
                avatar = $6
            where id = $7
        `;

        let values = [
            user.username,
            user.password,
            user.email,
            user.sdt,
            user.name,
            user.avatar,
            userID
        ];

        let result = await pool.query(query, values)
        return result.rows[0];
    }
}