"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const database_1 = __importDefault(require("../src/database"));
const bingo_factory_1 = require("./factories/bingo-factory");
const http_status_1 = __importDefault(require("http-status"));
const api = (0, supertest_1.default)(app_1.default);
beforeEach(async () => {
    await database_1.default.gameNumber.deleteMany();
    await database_1.default.game.deleteMany();
});
describe("GET /games", () => {
    it("should get game by id", async () => {
        const { id } = await (0, bingo_factory_1.generateNewGame)();
        const { status, body } = await api.get(`/games/${id}`);
        expect(status).toBe(http_status_1.default.OK);
        expect(body).toEqual({
            id,
            finished: false,
            date: expect.any(String),
            numbers: [],
        });
    });
    it("should return 404 if game not found", async () => {
        const { status, body } = await api.get(`/games/1`);
        expect(status).toBe(http_status_1.default.NOT_FOUND);
    });
    it("should return 400 if id is not valid", async () => {
        const { status, body } = await api.get(`/games/idNotValid`);
        expect(status).toBe(http_status_1.default.BAD_REQUEST);
    });
});
describe("POST /games/start", () => {
    it("should create a new game", async () => {
        const { status, body } = await api.post("/games/start");
        expect(status).toBe(http_status_1.default.CREATED);
        expect(body).toEqual({
            id: expect.any(Number),
            finished: false,
            date: expect.any(String),
        });
    });
    describe("PATCH /games/finish", () => {
        it("should finish a game", async () => {
            const { id } = await (0, bingo_factory_1.generateNewGame)();
            const { status } = await api.patch(`/games/finish/${id}`);
            expect(status).toBe(http_status_1.default.NO_CONTENT);
            const game = await database_1.default.game.findUnique({
                where: { id },
            });
            expect(game).not.toBeNull();
            expect(game.finished).toBe(true);
        });
        it("should return 404 if game is not found", async () => {
            const { status } = await api.patch(`/games/finish/1`);
            expect(status).toBe(http_status_1.default.NOT_FOUND);
        });
        it("should return 400 if game is already finished", async () => {
            const id = await (0, bingo_factory_1.generateNewGame)(true);
            const { status } = await api.patch(`/games/finish/${id}`);
            expect(status).toBe(http_status_1.default.BAD_REQUEST);
        });
    });
    describe("PATCH /games/number", () => {
        it("should generate a new number for a game", async () => {
            const { id } = await (0, bingo_factory_1.generateNewGame)();
            const { status, body } = await api.patch(`/games/number/${id}`);
            expect(status).toBe(http_status_1.default.OK);
            expect(body).toEqual({
                id: expect.any(Number),
                value: expect.any(Number),
                gameId: id,
            });
            const number = await database_1.default.gameNumber.findUnique({
                where: { id: body.id },
            });
            expect(number).not.toBe(null);
        });
        it("should return 404 if game is not found", async () => {
            const { status } = await api.patch(`/games/number/1`);
            expect(status).toBe(http_status_1.default.NOT_FOUND);
        });
        it("should return 400 if game is already finished", async () => {
            const id = await (0, bingo_factory_1.generateNewGame)(true);
            const { status } = await api.patch(`/games/number/${id}`);
            expect(status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return 400 if game already has all numbers", async () => {
            const { id } = await (0, bingo_factory_1.generateFullGame)();
            const { status } = await api.patch(`/games/number/${id}`);
            expect(status).toBe(http_status_1.default.BAD_REQUEST);
        });
    });
});
