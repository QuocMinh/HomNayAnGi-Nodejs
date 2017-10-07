let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let foodSchema = new Schema({
    _id         : { type: String, required: true },
    name        : String,
    type        : String,   // Loại thức ăn: chay, man, both
    ingredient  : [String], // Thành phần: ['thit','ca','rau']
    format      : String,   // Hình thù: canh, khong phai canh
    picture     : String,
    guide       : String
});

let Food = mongoose.model('Food', foodSchema);

module.exports = Food;