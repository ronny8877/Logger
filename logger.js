"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var colors_1 = __importDefault(require("colors"));
var dayjs_1 = __importDefault(require("dayjs"));
dayjs_1.default.extend(require("dayjs/plugin/localizedFormat"));
//TODO: WRITE PROPER COMMENTS
var Logger = /** @class */ (function () {
    function Logger(namespace) {
        var _this = this;
        //methods
        this.getTimeStamp = function () {
            return new Date().toISOString();
        };
        //function to format date and time
        //type any because it can be a direct date or a return from a function
        this.formatTimeStamp = function (date) {
            // LT	h:mm A	8:02 PM
            // LTS	h:mm:ss A	8:02:18 PM
            // L	MM/DD/YYYY	08/16/2018
            // LL	MMMM D, YYYY	August 16, 2018
            // LLL	MMMM D, YYYY h:mm A	August 16, 2018 8:02 PM
            // LLLL	dddd, MMMM D, YYYY h:mm A	Thursday, August 16, 2018 8:02 PM
            // l	M/D/YYYY	8/16/2018
            // ll	MMM D, YYYY	Aug 16, 2018
            // lll	MMM D, YYYY h:mm A	Aug 16, 2018 8:02 PM
            // llll	ddd, MMM D, YYYY h:mm A	Thu, Aug 16, 2018 8:02 PM
            return (0, dayjs_1.default)(date).format("L LTS");
        };
        //color functions for different levels
        //todo: add some fancy formatting and features to each functions
        this.warnColor = function (message, object) {
            if (object) {
                console.warn(colors_1.default.bold.yellow(message), object);
            }
            else {
                console.warn(colors_1.default.bold.yellow(message));
            }
        };
        this.errorColor = function (message, object) {
            if (object) {
                console.error(colors_1.default.bold.red(message), object);
            }
            else {
                console.warn(colors_1.default.bold.red(message));
            }
        };
        this.successColor = function (message, object) {
            if (object) {
                console.error(colors_1.default.bold.green(message), object);
            }
            else {
                console.warn(colors_1.default.bold.green(message));
            }
        };
        this.infoColor = function (message, object) {
            if (object) {
                console.warn(colors_1.default.blue(message), object);
            }
            else {
                console.warn(colors_1.default.blue(message));
            }
        };
        this.generalColor = function (message, object) {
            if (object) {
                console.warn(colors_1.default.bgMagenta(message), object);
            }
            else {
                console.warn(colors_1.default.bgMagenta(message));
            }
        };
        this.writeToLogFile = function (level, message, object, fileName) {
            //if filename exists then use it else use levels as filename
            var logFile = fileName ? fileName : level.toLowerCase() + ".log";
            var logFilePath = "logs/";
            //checking if log folder exist if not creating one
            if (!fs_1.default.existsSync(logFilePath)) {
                fs_1.default.mkdirSync(logFilePath, {
                    recursive: true,
                });
            }
            //if the log file exist then appending the log to the file
            if (object) {
                //todo:some ERROR handling
                fs_1.default.appendFileSync(logFilePath + logFile, "[" + _this.getTimeStamp() + "] [" + level + "] [" + _this.NAMESPACE + "] " + message + " " + JSON.stringify(object) + "\n");
            }
            else {
                //todo:some ERROR handling
                fs_1.default.appendFileSync(logFilePath + logFile, "[" + _this.getTimeStamp() + "] [" + level + "] [" + _this.NAMESPACE + "] " + message + "\n");
            }
        };
        this.info = function (message, object, fileName) {
            var level = "INFO";
            fileName = fileName ? fileName : level.toLowerCase() + ".log";
            _this.log(level, message, _this.infoColor, object);
        };
        this.error = function (message, object, fileName) {
            var level = "ERROR";
            fileName = fileName ? fileName : level.toLowerCase() + ".log";
            _this.log(level, message, _this.errorColor, object);
        };
        this.success = function (message, object, fileName) {
            var level = "SUCCESS";
            fileName = fileName ? fileName : level.toLowerCase() + ".log";
            _this.log(level, message, _this.successColor, object);
        };
        this.warn = function (message, object, fileName) {
            var level = "WARN";
            fileName = fileName ? fileName : level.toLowerCase() + ".log";
            _this.log(level, message, _this.warnColor, object);
        };
        this.general = function (message, object, fileName) {
            var level = "GENERAL";
            fileName = fileName ? fileName : level.toLowerCase() + ".log";
            _this.log(level, message, _this.generalColor, object);
        };
        this.debug = function (message, level, object, fileName) {
            //if fileName is not specified then use the default
            fileName = fileName ? fileName : "debug.log";
            //workaround for the debug log
            level = !level ? "DEBUG" : level.toUpperCase();
            //if level is other than info,error,success,warn, debug then it will throw an exception
            if (level !== "INFO" &&
                level !== "ERROR" &&
                level !== "SUCCESS" &&
                level !== "WARN" &&
                level !== "DEBUG") {
                throw new Error("Invalid level");
            }
            _this.log(level, message, _this.generalColor, object, fileName);
        };
        this.NAMESPACE = namespace;
    }
    //temporary-> function to log to console
    Logger.prototype.log = function (level, message, fun, object, fileName) {
        if (object) {
            fun("[" + this.formatTimeStamp(this.getTimeStamp()) + "] [" + level + "] [" + this.NAMESPACE + "] " + message, object);
            this.writeToLogFile(level, message, object, fileName);
        }
        else {
            fun("[" + (0, dayjs_1.default)(this.getTimeStamp()).format("L LTS") + "] [" + level + "] [" + this.NAMESPACE + "] " + message);
            this.writeToLogFile(level, message, fileName);
        }
    };
    return Logger;
}());
exports.default = Logger;
