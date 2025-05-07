"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.badRequest = badRequest;
function notFound(message = "Not found.") {
    return {
        name: "NotFound",
        message
    };
}
function badRequest(message = "Bad Request.") {
    return {
        name: "BadRequest",
        message
    };
}
