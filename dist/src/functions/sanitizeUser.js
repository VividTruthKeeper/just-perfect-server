"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (user, noJson) => {
    let userJSON;
    if (!noJson)
        userJSON = user.toJSON();
    else
        userJSON = user;
    delete userJSON.password;
    delete userJSON.__v;
    delete userJSON.address;
    delete userJSON.paymentInfo;
    return userJSON;
};
//# sourceMappingURL=sanitizeUser.js.map