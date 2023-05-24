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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccount = void 0;
const generateAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const model = {
        number: genNumberAccount(),
        agency: '0001',
        balance: 0
    };
    return model;
});
exports.generateAccount = generateAccount;
function genNumberAccount() {
    let string = '';
    createNumber();
    function genNumbers() {
        function generating() {
            const number = Math.floor(Math.random() * Math.ceil(Math.random() * 9));
            const number2 = Math.ceil(Math.random() * Math.floor(Math.random() * 9));
            return [number, number2];
        }
        let [number, number2] = generating();
        while (number === number2 || number === parseInt(string.charAt(string.length - 1)) || number2 === parseInt(string.charAt(string.length - 1))) {
            [number, number2] = generating();
        }
        return [number, number2];
    }
    function createNumber() {
        for (let index = 0; string.length < 8; index++) {
            const [number, number2] = genNumbers();
            number > number2 ? string = `${string}${number}${number2}` : string = `${string}${number2}${number}`;
        }
    }
    return string;
}
