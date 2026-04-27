class SpendingDTO {
    constructor(spending) {
        this.code = spending.code;
        this.name = spending.name;
        this.amount = spending.amount;
        this.time = spending.time;
        this.date = spending.date;
        this.placeName = spending.placeName || null;
        this.placeLocation = spending.placeLocation || null;
        this.placeAddress = spending.placeAddress || null;
        this.note = spending.note || null;
        this.categoryID = spending.categoryID || null;
        this.id = spending.id;

    }
}
  
export default SpendingDTO;