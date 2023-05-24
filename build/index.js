"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Base Imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_path_1 = __importDefault(require("node:path"));
// Other's
const db_1 = require("./config/db");
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config/config");
(0, db_1.databaseConnect)().then(() => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ credentials: true, origin: 'http://127.0.0.1:5173' }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use('/api', routes_1.default);
    app.use('/uploads', express_1.default.static(node_path_1.default.join(__dirname, '/uploads')));
    app.listen(config_1.config.port);
}).catch((err) => console.log(err));
