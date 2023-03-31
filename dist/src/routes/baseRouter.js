"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.baseRouter = router;
router.get("/", (req, res) => {
    res.status(200).send({
        status: "success",
        data: "ЧЕ ЗА ТЯГИ БАРХАТНЫЕ КЕФТЕМЕ",
    });
});
//# sourceMappingURL=baseRouter.js.map