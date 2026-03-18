class walletDTO{
    constructor(wallet){
        this.name = wallet.name;
        this.icon = wallet.icon;
        this.amount = wallet.amount;
        this.userID = wallet.userID;
    }
}

export default walletDTO;