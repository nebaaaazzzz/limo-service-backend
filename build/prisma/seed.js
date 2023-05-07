"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _db = require("../config/db");
(async ()=>{
    await _db.User.create({
        data: {
            email: "neba@gmail.com",
            lastName: "Daniel",
            firstName: "Nebiyu",
            password: "$2a$10$EZq8FjlPlFQJtctyPFfOfuYBRf1SAb57C/Kj1AzKUrgFfpSpzAQSG"
        }
    });
})();
