let Food = require('../models/food');
let cons = require('../util/const');

let FoodController = function () {
    // empty constructor
};

FoodController.addDefaultFood = function (callback) {
    for(let food of cons.FOOD) {
        let newFood = food.FOOD;

        Food.findOneAndUpdate({_id: newFood._id}, newFood, {upsert: true, new: true}, function (err, doc) {
            if(!err) {
                return callback(null, doc);
            } else {
                console.error(err);
            }
        });
    }
};

FoodController.addFood = function (data, callback) {
    Food.findOneAndUpdate({_id: data._id}, data, {upsert: true, new: true}, function (err, doc) {
        if(!err) {
            return callback(null, doc);
        } else {
            return console.error(err);
        }
    });
};

FoodController.findFoodById = (_id, callback) => {
    Food.find({_id: _id}, (err, food) => {
        return err ? callback(err, null) : callback(null, food);
    });
};

FoodController.findFood = (type, ingredient, format, number, callback) => {

    console.log("type: " + type);
    console.log("ingredient: " + ingredient);
    console.log("typeof ingredient: " + typeof ingredient);
    console.log("format: " + format);
    console.log("number: " + number);

    if (ingredient === null) {
        console.log("ingredient[0] === null");

        Food.find({type: type, format: {$in: format}}, (err, foods) => {
            return err ? callback(err, null) : callback(null, foods);
        }).limit(Number(number));
    } else {
        console.log("ingredient[0] !== null");

        Food.find({type: type, format: format, ingredient: ingredient}, (err, foods) => {
            return err ? callback(err, null) : callback(null, foods);
        }).limit(Number(number));
    }

};

FoodController.listAllFoods = function (callback) {
    Food.find({}, function (err, foods) {
        if (err) {
            console.error("listAllFoods: " + err);
            return callback(err, null);
        } else {
            return callback(null, foods);
        }
    });
};

FoodController.listFoodByType = function (type, number, callback) {
    Food.find({type: type}, (err, foods) => {

        return err ? callback(err, null) : callback(null, foods);

    }).limit(Number(number));
};

FoodController.listFoodByFormat = function (type, format, number, callback) {
    Food.find({type: type, format: format}, (err, foods) => {

        return err ? callback(err, null) : callback(null, foods);

    }).limit(Number(number));
};

FoodController.delete = function (_id, callback) {
    Food.deleteOne({_id: _id}, (err, result) => { // result: WriteOpResult: {ops, connection, result}
        return !err ? callback(err, null) : callback(null, result);
    })
};

module.exports = FoodController;

