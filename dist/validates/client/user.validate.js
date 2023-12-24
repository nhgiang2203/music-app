"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordPost = exports.forgotPasswordPost = exports.loginPost = exports.registerPost = void 0;
const registerPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Vui lòng nhập họ tên!');
        res.redirect('back');
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect('back');
        return;
    }
    next();
};
exports.registerPost = registerPost;
const loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect('back');
        return;
    }
    next();
};
exports.loginPost = loginPost;
const forgotPasswordPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect('back');
        return;
    }
    next();
};
exports.forgotPasswordPost = forgotPasswordPost;
const resetPasswordPost = (req, res, next) => {
    if (!req.body.password) {
        req.flash('error', 'Vui lòng nhập mật khẩu !');
        res.redirect('back');
        return;
    }
    if (!req.body.confirmPassword) {
        req.flash('error', 'Vui lòng xác nhận mật khẩu !');
        res.redirect('back');
        return;
    }
    if (req.body.password != req.body.confirmPassword) {
        req.flash('error', 'Mật khẩu không khớp !');
        res.redirect('back');
        return;
    }
    next();
};
exports.resetPasswordPost = resetPasswordPost;
