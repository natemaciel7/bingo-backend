"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = generateRandomNumber;
exports.generateRandomNumberNotUsed = generateRandomNumberNotUsed;
function generateRandomNumber(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}
function generateRandomNumberNotUsed(numbers, min, max) {
    const allNumbersAlreadyUsed = numbers.length >= max - min + 1;
    if (allNumbersAlreadyUsed)
        return null;
    let nextNumber = generateRandomNumber(min, max);
    let nextNumberFound = false;
    do {
        const numberAlreadyUsed = numbers.find(number => number === nextNumber);
        if (!numberAlreadyUsed)
            nextNumberFound = true;
        else {
            nextNumber = generateRandomNumber(min, max);
        }
    } while (!nextNumberFound);
    return nextNumber;
}
