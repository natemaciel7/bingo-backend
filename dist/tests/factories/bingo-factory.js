"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewGame = generateNewGame;
exports.generateFullGame = generateFullGame;
const bingo_rules_1 = __importDefault(require("../../src/config/bingo-rules"));
const database_1 = __importDefault(require("../../src/database"));
async function generateNewGame(finished = false) {
    return await database_1.default.game.create({
        data: {
            finished,
        },
    });
}
async function generateFullGame() {
    const game = await generateNewGame();
    const numbers = [];
    for (let i = 0; i < bingo_rules_1.default.max; i++) {
        numbers.push({
            value: i,
            gameId: game.id,
        });
    }
    await database_1.default.gameNumber.createMany({
        data: numbers,
    });
    return game;
}
