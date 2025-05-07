"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewBingoGame = createNewBingoGame;
exports.getBingoGameById = getBingoGameById;
exports.setNumberForBingoGame = setNumberForBingoGame;
exports.updateBingoGameStatusToFinished = updateBingoGameStatusToFinished;
exports.getAllNumbersFromBingoGame = getAllNumbersFromBingoGame;
const database_1 = __importDefault(require("../database"));
async function createNewBingoGame() {
    return await database_1.default.game.create({});
}
async function getBingoGameById(gameId, includeNumbers = false) {
    return await database_1.default.game.findUnique({
        where: {
            id: gameId
        },
        include: {
            numbers: includeNumbers
        }
    });
}
async function setNumberForBingoGame(gameId, number) {
    return await database_1.default.gameNumber.create({
        data: {
            gameId,
            value: number
        }
    });
}
async function updateBingoGameStatusToFinished(gameId) {
    return await database_1.default.game.update({
        where: {
            id: gameId
        },
        data: {
            finished: true
        }
    });
}
async function getAllNumbersFromBingoGame(gameId) {
    return await database_1.default.gameNumber.findMany({
        where: {
            gameId
        }
    });
}
