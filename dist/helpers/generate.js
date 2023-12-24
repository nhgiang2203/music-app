"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.generateRandomString = void 0;
const generateRandomString = (length) => {
    const charecters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charecters.charAt(Math.floor(Math.random() * charecters.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const generateRandomNumber = (length) => {
    const charecters = "0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charecters.charAt(Math.floor(Math.random() * charecters.length));
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
