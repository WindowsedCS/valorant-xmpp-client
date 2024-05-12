"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    name;
    constructor(name) {
        this.name = name;
    }
    info(message) {
        console.log(`${this.name} [${new Date().toLocaleString()}] [INFO] ${message}`);
    }
    warn(message) {
        console.log(`${this.name} [${new Date().toLocaleString()}] [WARN] ${message}`);
    }
    error(message) {
        console.log(`${this.name} [${new Date().toLocaleString()}] [ERROR] ${message}`);
    }
    debug(message) {
        console.log(`${this.name} [${new Date().toLocaleString()}] [DEBUG] ${message}`);
    }
}
exports.default = Logger;
