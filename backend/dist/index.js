"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", async (req, res) => {
    try {
        const result = await db_1.default.query("SELECT NOW()");
        res.json({ success: true, time: result.rows[0] });
    }
    catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
