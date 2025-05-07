"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandlingMiddleware;
const http_status_1 = __importDefault(require("http-status"));
const errorStatusMap = {
    NotFound: http_status_1.default.NOT_FOUND,
    Conflict: http_status_1.default.CONFLICT,
    BadRequest: http_status_1.default.BAD_REQUEST,
    UnprocessableEntity: http_status_1.default.UNPROCESSABLE_ENTITY,
    Forbidden: http_status_1.default.FORBIDDEN,
};
function errorHandlingMiddleware(error, req, res, next) {
    console.log(error);
    const { name, message } = error;
    const status = errorStatusMap[name] || http_status_1.default.INTERNAL_SERVER_ERROR;
    return res.status(status).send(message);
}
