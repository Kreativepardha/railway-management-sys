"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const dbUrl = process.env.MONGO_URL;
//middlewares
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
mongoose_1.default.connect(dbUrl)
    .then(() => console.log(`Database connected ${dbUrl}`))
    .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`serve started at ${PORT}`));
