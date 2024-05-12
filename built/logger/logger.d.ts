declare class Logger {
    name: string;
    constructor(name: string);
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
}
export default Logger;
