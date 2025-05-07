"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGame = getGame;
exports.createNewGame = createNewGame;
exports.generateNewNumber = generateNewNumber;
exports.finishGame = finishGame;
const bingo_repository_1 = require("../repositories/bingo-repository");
const bingo_rules_1 = __importDefault(require("../config/bingo-rules"));
const errors_1 = require("../errors");
const utils_1 = require("../utils");
async function getGame(gameId) {
    const includeNumbers = true;
    const game = await (0, bingo_repository_1.getBingoGameById)(gameId, includeNumbers);
    if (!game)
        throw (0, errors_1.notFound)(`Game with id ${gameId} not found.`);
    return game;
}
async function createNewGame() {
    return await (0, bingo_repository_1.createNewBingoGame)();
}
async function generateNewNumber(gameId) {
    await getRunningBingoGame(gameId);
    const numbers = await fetchNumbers(gameId);
    const extractedValues = extractOnlyTheValues(numbers);
    let nextNumber = (0, utils_1.generateRandomNumberNotUsed)(extractedValues, bingo_rules_1.default.min, bingo_rules_1.default.max);
    return await (0, bingo_repository_1.setNumberForBingoGame)(gameId, nextNumber);
}
async function finishGame(gameId) {
    await getRunningBingoGame(gameId);
    return await (0, bingo_repository_1.updateBingoGameStatusToFinished)(gameId);
}
async function fetchNumbers(gameId) {
    const numbers = await (0, bingo_repository_1.getAllNumbersFromBingoGame)(gameId);
    checkIfAllNumbersAlreadyBeenDrawn(numbers);
    return numbers;
}
function checkIfAllNumbersAlreadyBeenDrawn(numbers) {
    const allNumbersAlreadyDrawed = numbers.length === bingo_rules_1.default.max;
    if (allNumbersAlreadyDrawed) {
        throw (0, errors_1.badRequest)("All numbers have already been drawn.");
    }
}
async function getRunningBingoGame(gameId) {
    const game = await (0, bingo_repository_1.getBingoGameById)(gameId);
    if (!game)
        throw (0, errors_1.notFound)(`Game with id ${gameId} not found.`);
    if (game.finished)
        throw (0, errors_1.badRequest)("You can't use a already finished game.");
    return game;
}
function extractOnlyTheValues(numbers) {
    return numbers.map(({ value }) => value);
}
