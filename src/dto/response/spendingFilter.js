class spendingDTO{
    constructor(spending){
        this.code = spending.code;
        this.spending_name = spending.spending_name;
        this.amount = spending.amount;
        this.spending_time = spending.spending_time;
        this.spending_date = spending.spending_date;
    }
}

export default spendingDTO;