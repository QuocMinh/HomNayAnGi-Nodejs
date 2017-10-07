const express           = require('express');
const router            = express.Router();
const FoodController    = require('../controllers/FoodController');

/*
    Giải thật:
    * Lấy về loại món, số lượng và các thông tin người dùng cung cấp
    * Phân chia số lượng cho từng điều kiện của người dùng
    * -> VD: Người dùng chọn ['thit','ca','canh'], số lượng 3 -> chi đều mỗi thứ 1 món
    * Viết hàm tìm kiếm theo từng điều kiện bên trên với limit là số lượng món đã chia
    * Nối 3 kết quả thành 1 mảng ta được kết quả cuối cùng
*/
router.all('/suggest1', function (req, res) {

    let countOpt = 0;
    let flagFormat = false,
        flagIngredient = false;

    // Get type from request
    let type = req.param('type');
    if (type === 'both') type = ['man', 'chay']; // Set type for 'both' option

    // Get ingredient from request
    let ingredient = [];
    if (typeof req.param('ingredient') !== "undefined") {
        ingredient = req.param('ingredient');
        countOpt += req.param('ingredient').length;

        flagIngredient = true; // Enable flag for ingredient
    }

    // Get format from request
    let format = ['canh', 'khong phai canh'];
    if (typeof req.param('format') !== "undefined") {
        format = [req.param('format')];
        countOpt++;

        flagFormat = true; // Enable flag for format
    }

    // Get number from request
    let number = req.param('number');

    if (!(flagFormat === false && flagIngredient === false)) {
        let numDived = divNumOfFood(number, countOpt);
        let count = 0;
        // let foodArr = new Array();

        // Tìm kiếm theo type và format
        if (format && !ingredient) {
            FoodController.listFoodByFormat(type, format, number, (err, foods) => {
                if (!err) {
                    let deficit = number - foods.length; // Kiểm tra thiếu bao nhiêu kết quả
                    if (deficit > 0) {
                        FoodController.listFoodByType(type, deficit)
                    }
                }
                else console.error("Error listFoodByFormat: " + err);
            });

            count++;
        } else if (!format && ingredient) {// Tìm kiếm theo type và ingredient

            count++;
        } else if (format && ingredient) {

        }
    } else {
        FoodController.listFoodByType(type, number, (err, foods) => {
            if (!err) res.render('index', {foods: foods});
            else console.error("Error listByType: " + err);
        });
    }

});

router.all('/suggest', function (req, res) {

    // Get type from request
    let type = req.param('type');
    if (type === 'both') type = ['man', 'chay']; // Set type for 'both' option

    // Get ingredient from request
    let ingredient = null;
    if (typeof req.param('ingredient') !== "undefined") {
        ingredient = req.param('ingredient');
    }

    // Get format from request
    let format = ['canh', 'khong phai canh'];
    if (typeof req.param('format') !== "undefined") {
        format = [req.param('format')];
    }

    // Get number from request
    let number = req.param('number');


    FoodController.findFood(type, ingredient, format, number, (err, doc) => {
        if (!err) {
            if (doc[0] === null) {
                res.render('index', {
                    error: "Not found!",
                    type: type,
                    ingredient: ingredient,
                    number: number,
                    format: format,
                    numOfResult: doc.length,
                    title: 'Food suggest'
                });
            } else {
                res.render('index', {
                    foods: doc, type: type,
                    ingredient: ingredient,
                    number: number,
                    format: format,
                    numOfResult: doc.length,
                    title: 'Food suggest'
                });
            }
        } else {
            console.error(err);
            res.render('index', {error: "Khong tim thay", title: 'Food suggest'});
        }
    });
});

function divNumOfFood(numRequested, countOpt) {
    let numDived = [0, 0, 0, 0];

    // Nếu só lượng người nhập vào ít hơn số điều kiện người dùng chọn => Báo lỗi => Cho client xử lý

    // Chia : START
    while (numRequested > 0) {
        for (let i = 0; i < countOpt; i++) {
            numDived[i]++;
            numRequested--;
            if (numRequested === 0) break;
        }
        console.log(numRequested);
    }
    // Chia : END

    return numDived.slice(0, numDived.indexOf(0)); // Loại bỏ phần tử 0 trong mảng
}

router.get('/new-food', (req, res) => {
    res.render('new-food', {title: 'Create Food'});
});

router.all('/create', function (req, res) {
    // Get all params requested
    let _id         = req.param('_id');
    let name        = req.param('name');
    let type        = req.param('type');
    let ingredient  = req.param('ingredient');
    let format      = req.param('format');
    let picture     = "";
    let guide       = "";

    // Get file
    if(req.files) {
        let pictureUploaded = req.files.pictureToUpload;
        let guideUploaded   = req.files.guideToUpload;

        const linkImg = "./public/images/";
        const linkPdf = "./public/pdf/";

        picture = pictureUploaded.name;
        guide   = guideUploaded.name;

        pictureUploaded.mv(linkImg + picture, function (err) {
            if(err) console.error(err);
        });

        guideUploaded.mv(linkPdf + guide, function (err) {
            if(err) console.error(err);
        });
    }

    // Save to MongoDB
    let food;
    food = {
        _id: _id,
        name: name,
        type: type,
        ingredient: ingredient,
        format: format,
        picture: picture,
        guide: guide
    };

    FoodController.addFood(food, function (err) {
        if(!err) res.render('new-food', {title: 'Create Food Successfully!', result: 'Create Food Successfully!'});
        else {
            res.render('new-food', {title: 'Failed to Create Food!', result: 'Failed to Create Food!'});
            console.log(err);
        }
    });

});

router.get('/update-food', function (req, res) {
    let _id = req.param('_id');
    let food;

    FoodController.findFoodById(_id, function (err, doc) {
       if(!err) {
           food = doc;
           console.log("Khong: ");
           res.render('update-food', {title: 'Update Food', food: food[0]});
       }
       else {
           console.log("Loi: ");
           console.error("Loi: " + err);
           res.render('update-food',{title: 'Update Food'});
       }
    });
});

router.all('/update', function (req, res) {
    // Get all params requested
    let _id         = req.param('_id');
    let name        = req.param('name');
    let type        = req.param('type');
    let ingredient  = req.param('ingredient');
    let format      = req.param('format');
    let picture     = "";
    let guide       = "";
    let food;

    // Get file
    let pictureUploaded = req.files.pictureToUpload;
    let guideUploaded   = req.files.guideToUpload;

    if(req.files === "undefined") {
        const linkImg = "./public/images/";
        const linkPdf = "./public/pdf/";

        picture = pictureUploaded.name;
        guide   = guideUploaded.name;

        pictureUploaded.mv(linkImg + picture, function (err) {
            if(err) console.error(err);
        });

        guideUploaded.mv(linkPdf + guide, function (err) {
            if(err) console.error(err);
        });

        food = {
            _id: _id,
            name: name,
            type: type,
            ingredient: ingredient,
            format: format,
            picture: picture,
            guide: guide
        };
    } else {
        food = {
            _id: _id,
            name: name,
            type: type,
            ingredient: ingredient,
            format: format,
        };
    }

    // Save to MongoDB
    FoodController.addFood(food, function (err, newFood) {
        if(!err)
            res.render('update-food', {
                title: 'Update Food Successfully!',
                result: 'Update Food Successfully!',
                food: newFood
            });
        else {
            res.render('update-food', {
                title: 'Failed to Update Food!',
                result: 'Failed to Update Food!',
                food: food
            });
            console.log(err);
        }
    });
});

router.all('/delete', (req, res) => {
    let _id = req.param('_id');

    FoodController.delete(_id, (err, result) => {
        if(!err) console.log(result);
        else console.error(err);
    });

    res.render('index', {
        title: "Hom nay an gi?",
        deleted: "deleted"
    });
});

module.exports = router;