"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const register = (req, res) => {
    res.render('client/pages/user/register', {
        pageTitle: 'Trang đăng kí'
    });
};
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield user_model_1.default.findOne({
        email: req.body.email
    });
    if (emailExist) {
        req.flash('error', 'Email đã tồn tại !');
        res.redirect('back');
        return;
    }
    req.body.password = (0, md5_1.default)(req.body.password);
    const user = new user_model_1.default(req.body);
    user.save();
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/topics");
});
exports.registerPost = registerPost;
const login = (req, res) => {
    res.render('client/pages/user/login', {
        pageTitle: 'Đăng nhập'
    });
};
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false
    });
    if (!user) {
        req.flash('error', 'Email không tồn tại !');
        res.redirect('back');
        return;
    }
    if ((0, md5_1.default)(req.body.password) != user.password) {
        req.flash('error', 'Mật khẩu không đúng !');
        res.redirect('back');
        return;
    }
    if (user.status == 'inactive') {
        req.flash('error', 'Tài khoản đã bị khóa !');
        res.redirect('back');
        return;
    }
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/topics");
});
exports.loginPost = loginPost;
const logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/topics");
};
exports.logout = logout;
