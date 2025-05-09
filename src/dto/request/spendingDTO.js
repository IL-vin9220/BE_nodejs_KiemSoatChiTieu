// dtos/user.dto.js
class SpendingDTO {
    constructor({ name, cost, time, date, place, note }) {
        this.name = name;
        this.cost = cost;
        this.time = time;
        this.date = date;
        this.place = place;
        this.note = note;
    }
  }
  
module.exports = SpendingDTO;