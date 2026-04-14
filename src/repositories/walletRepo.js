import pool from '../config/database.js';
import walletDTO from '../dto/request/walletDTO.js';

class walletRepository{

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


    // not fund: 
    //     - tạo 1 giao dịch trong wallet detail trừ ở ví chuyển
    //     - tạo 1 giao dịch trong wallet detail thêm ở ví nhận
    //     - cập nhận amount ở ví chuyển = 0, ví nhận = amount của ví nhận

    // fund with hard wallet:
    //     - tạo 1 giao dịch trong wallet detail trừ ở ví chuyển
    //     - tạo 1 giao dịch trong wallet detail thêm ở ví nhận
    //     - cập nhận amount ở ví chuyển = 0, ví nhận = amount của ví nhận
    //     - fund ở wallet chuyển về 0
    //     - nếu wallet nhận có hard fund thì tăng thêm ở fund đó, còn không thì sẽ tăng hết các fund

    // fund with wallet(not hard wallet)
    //     - tạo 1 giao dịch trong wallet detail trừ ở ví chuyển
    //     - tạo 1 giao dịch trong wallet detail thêm ở ví nhận
    //     - cập nhận amount ở ví chuyển = 0, ví nhận = amount của ví nhận
    //     - các fund sẽ được tính lại các amount trong đó, nếu wallet nhận ko hard fund thì sẽ chia theo % của các fund

    
    // chuyển tiền giữa các ví không có quỹ
    async tranferMoneyWalletNotFund(wallet){

    }


    // chuyển tiền giữa các ví có quỹ
    async tranferMoneyWalletInFund(wallet){}

    
    // tính tổng số tiền trong hiện có  
    async BalanceOfWallet(walletID, userID){
        let query = `
            select top 1 wd.balance from wallet_detail as wd
            inner join wallet as wa on wd.wallet_id = wa.id
            where wa.user_id = $1 and wd.wallet_id = $2
            return *;
        `;

        values = [userID, walletID];

        let result = await pool.query(query, values);
        return result.rows[0];
    }

    // cập nhật số dư các ví sau khi có giao dịch
    async updateBalanceWallet(wallet){}


    // giới hạn chi tiêu của ví
    async setLimitSpendingWallet(wallet){}


    // cảnh báo ví sắp hết tiền
    async alertWalletMin(wallet){
        // cảnh báo sắp hết tiền trong ví: (nếu bật quản lý min max)
	    //     - amount <= amount(min)
    }


    // cảnh báo vượt quá số tiền của ví, cần chuyển qua ví khác hoặc tăng giới hạn
    async alertWalletMax(wallet){}


    // phân quyền ví(coming soon - giành cho gia đình)
    async setRolesUserForWallet(wallet){}


    // đóng băng ví chi tiêu(coming soon - giành cho gia đình)
    async freezeWallet(walletID, userID){}


    // tính toán lại số dư của ví khi có phát sinh giao dịch
    // async caculateBalanceWallet(wallet){}

    async calculateAmountWalletsActiveByUserId(userId){
        let query = `
            select amount from wallet where user_id = $1 and status_active = 1
        `;

        let result = await pool.query(query, userId);
        return result.rows[0];
    }


}

export default walletRepository