"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBingoGame = getBingoGame;
exports.startNewBingoGame = startNewBingoGame;
exports.getNextNumberForBingoGame = getNextNumberForBingoGame;
exports.finishBingoGame = finishBingoGame;
const http_status_1 = __importDefault(require("http-status"));
const bingo_service_1 = require("../services/bingo-service");
const errors_1 = require("../errors");
async function getBingoGame(req, res) {
    const gameId = getValidGameIdFromRequest(req);
    const game = await (0, bingo_service_1.getGame)(gameId);
    return res.send(game);
}
async function startNewBingoGame(req, res) {
    const game = await (0, bingo_service_1.createNewGame)();
    return res.status(http_status_1.default.CREATED).send(game);
}
async function getNextNumberForBingoGame(req, res) {
    const gameId = getValidGameIdFromRequest(req);
    const number = await (0, bingo_service_1.generateNewNumber)(gameId);
    return res.send(number);
}
async function finishBingoGame(req, res) {
    const gameId = getValidGameIdFromRequest(req);
    await (0, bingo_service_1.finishGame)(gameId);
    return res.sendStatus(http_status_1.default.NO_CONTENT);
}
function getValidGameIdFromRequest(req) {
    const gameId = Number(req.params.id);
    if (isNaN(gameId) || gameId <= 0) {
        throw (0, errors_1.badRequest)(`Game id ${req.params.id} is not valid`);
    }
    return gameId;
}
