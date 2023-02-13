"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_routes_1 = __importDefault(require("./routes/korisnik.routes"));
const firma_routes_1 = __importDefault(require("./routes/firma.routes"));
const planinari_routes_1 = __importDefault(require("./routes/planinari.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/planinski_odmor');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const router = express_1.default.Router();
router.use('/home', korisnik_routes_1.default);
router.use('/firma', firma_routes_1.default);
router.use('/planinari', planinari_routes_1.default);
router.use('/admin', admin_routes_1.default);
app.use('/', router); //prvi svi dodju na bilo koju rutu pa se onda navode po rutama za odredjenje logicke skupove
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map