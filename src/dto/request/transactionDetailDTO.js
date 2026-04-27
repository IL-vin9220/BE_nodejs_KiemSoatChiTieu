class transactionDetailDTO {
    constructor(transactionDetail) {
        this.code = transactionDetail.code;
        this.name = transactionDetail.name;
        this.amount = transactionDetail.amount;
        this.time = transactionDetail.time;
        this.date = transactionDetail.date;
        this.placeName = transactionDetail.placeName || null;
        this.placeLocation = transactionDetail.placeLocation || null;
        this.placeAddress = transactionDetail.placeAddress || null;
        this.note = transactionDetail.note || null;
        this.categoryID = transactionDetail.categoryID || null;
    }
}
  
export default transactionDetailDTO;