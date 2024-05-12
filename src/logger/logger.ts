class Logger {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
    info(message: string) {
        console.log(`${this.name} [${new Date().toLocaleString()}] [INFO] ${message}`);
    }
    warn(message: string) {
        console.log(`${this.name} [${new Date().toLocaleString()}] [WARN] ${message}`);
    }
    error(message: string) {
        console.log(`${this.name} [${new Date().toLocaleString()}] [ERROR] ${message}`);
    }
    debug(message: string) {
        console.log(`${this.name} [${new Date().toLocaleString()}] [DEBUG] ${message}`);
    }
}
export default Logger;