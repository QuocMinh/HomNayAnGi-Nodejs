const MONGO_USER = 'cqminh1995';
const MONGO_PASS = 'quocminh1995';
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@ds153380.mlab.com:53380/homnayangi`;

module.exports = {
    DB_HOST: 'localhost',
    DB_PORT: 27017,
    mLAP_MONGO_URI: MONGO_URI,
    DB_NAME: 'homnayangi',
    FOOD: [
        {
            FOOD: {
                "_id": "trung-opla",
                "name": "Trứng opla",
                "type": "man",        // Chay, man, ca hai
                "ingredient": [             // [ Thit, ca, rau, cu ]
                    "thit"
                ],
                "format": "khong phai canh",    // Canh, khong phai canh
                "picture": "trung-opla.jpg",
                "guide": "trung-opla.pdf"
            }
        },
        {
            FOOD: {
                "_id": "thit-kho-trung",
                "name": "Thịt kho trứng",
                "type": "man",
                "ingredient": [
                    "thit"
                ],
                "format": "khong phai canh",
                "picture": "thit-kho-trung.jpg",
                "guide": ""
            }
        },
        {
            FOOD: {
                "_id": "thit-chien",
                "name": "Thịt chiên",
                "type": "man",
                "ingredient": [
                    "thit"
                ],
                "format": "khong phai canh",
                "picture": "thit-chien.jpg",
                "guide": ""
            }
        },
        {
            FOOD: {
                "_id": "thit-luoc",
                "name": "Thịt luộc",
                "type": "man",
                "ingredient": [
                    "thit"
                ],
                "format": "khong phai canh",
                "picture": "thit-luoc.jpg",
                "guide": ""
            }
        },
        {
            FOOD: {
                "_id": "ca-kho-tieu",
                "name": "Cá kho tiêu",
                "type": "man",
                "ingredient": [
                    "ca"
                ],
                "format": "khong phai canh",
                "picture": "ca-kho-tieu.jpg",
                "guide": ""
            }
        },
        {
            FOOD: {
                "_id": "canh-chua-ca-loc",
                "name": "Canh chua cá lóc",
                "type": "man",
                "ingredient": [
                    "ca",
                    "rau"
                ],
                "format": "canh",
                "picture": "canh-chua-ca-loc.jpg",
                "guide": ""
            }
        },
        {
            FOOD: {
                "_id": "goi-cuon-ngu-sac",
                "name": "Gỏi cuốn ngủ sắc",
                "type": "chay",
                "ingredient": [
                    "rau"
                ],
                "format": "khong phai canh",
                "picture": "goi-cuon-ngu-sac.jpg",
                "guide": ""
            }
        },
        {
            FOOD: {
                "_id": "dau-phu-sot-chua-cay",
                "name": "Đậu phụ sốt chua cay",
                "type": "chay",
                "ingredient": [
                    "rau"
                ],
                "format": "khong phai canh",
                "picture": "dau-phu-sot-chua-cay.jpg",
                "guide": ""
            }
        },
    ],
};