"use strict";
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "src"],
    transform: {
        ".+\\.ts$": "ts-jest",
    },
    testMatch: ["<rootDir>/tests/*.(test|spec).ts"],
};
