import pool from '../config/database.js';
import walletDTO from '../dto/request/walletDTO.js';

class wallet{

    async getWallet(userID){
        let query = `
            select * from wallet where user_id = $1
            return *;
        `;

        let result = await pool.query(query, userID);
        return result.rows[0];
    }

    async addWallet(wallet){
        let query = `
            insert into wallet(wallet_name, icon, amount, user_id) values($1, $2, $3, $4)
            return *;
        `;

        let values = [
            wallet.name,
            wallet.icon,
            wallet.amount,
            wallet.userID
        ];

        let result = await pool.query(query, values);
        return result.rows[0];
    }


    async updateWallet(wallet, userID){
        let query = `
            update wallet set
                wallet_name = $1,
                icon = $2,
                amount = $3
            where user_id = $4
            return *;
        `;

        let values = [
            wallet.name,
            wallet.icon,
            wallet.amount,
            userID
        ];

        let result = await pool.query(query, values);
        return result.rows[0];
    }

    async deleteWallet(walletID){
        let query = `
            delete from wallet where wallet_id = $1
            return *;
        `;

        let result = await pool.query(query, walletID);
        return result.rows[0];
    }

    
    // chuyển tiền giữa các ví
    async tranferMoneyWallet(wallet){}


    // cập nhật số dư các ví sau khi có giao dịch
    async updateBalanceWallet(wallet){}


    // giới hạn chi tiêu của ví
    async setLimitSpendingWallet(wallet){}


    // cảnh báo ví sắp hết tiền
    async alertWalletMin(wallet){}


    // cảnh báo vượt quá số tiền của ví, cần chuyển qua ví khác hoặc tăng giới hạn
    async alertWalletMax(wallet){}


    // phân quyền ví(coming soon - giành cho gia đình)
    async setRolesUserForWallet(wallet){}


}