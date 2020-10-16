# vue-admin-template
高山仰止,景行行止.虽不能至,心向往之
```
/**
 *                      江城子 . 程序员之歌
 *
 *                  十年生死两茫茫，写程序，到天亮。
 *                      千行代码，Bug何处藏。
 *                  纵使上线又怎样，朝令改，夕断肠。
 *
 *                  领导每天新想法，天天改，日日忙。
 *                      相顾无言，惟有泪千行。
 *                  每晚灯火阑珊处，夜难寐，加班狂。
*/
```

```json
{
    "code": 200,
    "msg": "success",
    "data": [
        {
            "productId": 1,
            "name": "新疆葡萄",
            "explain": "特色新疆美味葡萄巴拉巴拉",
            "shopPrice": 35.2,
            "price": 23.5,
            "hot": null,
            "recommended": null,
            "productStatus": 0,
            "defaultImg": null,
            "updateTime": null,
            "updateUserId": null,
            "createTime": null,
            "createUserId": null,
            "productCategory": {
                "productCategoryId": 11001,
                "name": "新疆葡萄",
                "sortOrder": null,
                "description": "葡萄类哦",
                "image": null,
                "updateTime": null,
                "updateUserId": null
            },
            "spec": [
                {
                    "specId": 12100,
                    "productId": 1,
                    "specName": "小果",
                    "price": 23.5,
                    "quantity": 30,
                    "sku": {
                        "skuId": 101,
                        "attrbute": "斤"
                    }
                }
            ],
            "discounts": [
                {
                    "discountsId": 2,
                    "discountsExplain": "特色新疆美味葡萄巴拉巴拉",
                    "conditions": 22,
                    "conditionsExplain": "满22元才能享受优惠",
                    "discounts": "2",
                    "members": true,
                    "discountsCategory": {
                        "discountsCategoryId": 2001,
                        "discountsType": "满减",
                        "discountsFlag": 0,
                        "discountsDescription": "满减呀呀呀"
                    }
                }
            ],
            "productInfoImages": [
                {
                    "productId": 1,
                    "sort": null,
                    "url": null
                }
            ],
            "productBannerImages": [
                {
                    "productId": 1,
                    "type": null,
                    "url": null
                }
            ],
            "tags": [
                {
                    "tagId": 13100,
                    "name": "产地直销"
                },
                {
                    "tagId": 13101,
                    "name": "会员优惠"
                }
            ],
            "comments": [
                {
                    "commentsId": 25001,
                    "user": {
                        "userId": 10001,
                        "username": "teenyda",
                        "password": "12345",
                        "nickname": "智取棋",
                        "email": null,
                        "image": null,
                        "qq": null,
                        "mobile": null,
                        "lastLoginTime": null,
                        "registerTime": null
                    },
                    "productId": 1,
                    "content": "酸甜爽口，好评！",
                    "img1": null,
                    "img2": null,
                    "img3": null,
                    "audit": 0,
                    "reply": null,
                    "createTime": null
                },
                {
                    "commentsId": 25002,
                    "user": {
                        "userId": 10002,
                        "username": "poorld",
                        "password": "12345",
                        "nickname": "忍乳妇重",
                        "email": null,
                        "image": null,
                        "qq": null,
                        "mobile": null,
                        "lastLoginTime": null,
                        "registerTime": null
                    },
                    "productId": 1,
                    "content": "还行吧！",
                    "img1": null,
                    "img2": null,
                    "img3": null,
                    "audit": 0,
                    "reply": null,
                    "createTime": null
                }
            ]
        }
    ]
}
```

```json
{
    "name":"宁夏青苹果",
    "productCategory":{
        "productCategoryId":11003
    },
    "explain":"宁夏青苹果宁夏青苹果",
    "shopPrice":"23",
    "price":"19",
    "spec":[
        {
            "specName":"小果",
            "price":"18",
            "quantity":30,
            "sku":{
                "skuId":101,
                "attrbute":"斤"
            }
        },
        {
            "specName":"中果",
            "price":"21.3",
            "quantity":30,
            "sku":{
                "skuId":101,
                "attrbute":"斤"
            }
        },
        {
            "specName":"大果",
            "price":"25",
            "quantity":30,
            "sku":{
                "skuId":101,
                "attrbute":"斤"
            }
        }
    ],
    "defaultImg":"http://localhost:9000/api/app/file/downloadFile/3c37cd03902c480399aaa7388d56be92.jpg",
    "productBannerImages":[
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/e80a7d7b14654cbb97e1d70b66e8db77.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/76288c0ecd1b456aa4a3be977aaba039.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/b9ece73bf7c245b7af24b15c02d3f0b8.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/f68b32f037334e068f70b7fbdc729d18.jpg"
        },
        {
            "discountsId":2
        },
        {
            "discountsId":4
        },
        {
            "discountsId":7
        },
        {
            "discountsId":8
        },
        {
            "tagId":13100
        },
        {
            "tagId":13101
        }
    ],
    "productInfoImages":[
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/e80a7d7b14654cbb97e1d70b66e8db77.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/76288c0ecd1b456aa4a3be977aaba039.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/b9ece73bf7c245b7af24b15c02d3f0b8.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/f68b32f037334e068f70b7fbdc729d18.jpg"
        },
        {
            "discountsId":2
        },
        {
            "discountsId":4
        },
        {
            "discountsId":7
        },
        {
            "discountsId":8
        },
        {
            "tagId":13100
        },
        {
            "tagId":13101
        }
    ],
    "discounts":[
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/e80a7d7b14654cbb97e1d70b66e8db77.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/76288c0ecd1b456aa4a3be977aaba039.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/b9ece73bf7c245b7af24b15c02d3f0b8.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/f68b32f037334e068f70b7fbdc729d18.jpg"
        },
        {
            "discountsId":2
        },
        {
            "discountsId":4
        },
        {
            "discountsId":7
        },
        {
            "discountsId":8
        },
        {
            "tagId":13100
        },
        {
            "tagId":13101
        }
    ],
    "tags":[
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/e80a7d7b14654cbb97e1d70b66e8db77.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/76288c0ecd1b456aa4a3be977aaba039.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/b9ece73bf7c245b7af24b15c02d3f0b8.jpg"
        },
        {
            "url":"http://localhost:9000/api/app/file/downloadFile/f68b32f037334e068f70b7fbdc729d18.jpg"
        },
        {
            "discountsId":2
        },
        {
            "discountsId":4
        },
        {
            "discountsId":7
        },
        {
            "discountsId":8
        },
        {
            "tagId":13100
        },
        {
            "tagId":13101
        }
    ]
}
```

Copyright (c) 2017-present 智取棋
