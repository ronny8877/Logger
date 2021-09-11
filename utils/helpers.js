"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var colors_1 = __importDefault(require("colors"));
var logger_1 = __importDefault(require("../logger"));
//a function to delete half old data of the log file
var NAMESPACE = "IN_LOGGER";
var log = new logger_1.default(NAMESPACE);
var readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
var LogUtils = /** @class */ (function () {
    function LogUtils(filePath) {
        this.filePath = filePath;
    }
    //a function to diplay all the folders in the LOG_FOLDER_PATH address
    LogUtils.prototype.displayFolders = function () {
        fs_1.default.readdir(this.filePath, function (err, files) {
            if (err) {
                log.error(err);
            }
            else {
                files.forEach(function (file) {
                    log.general(file);
                });
            }
        });
    }; //end of displayFolders
    LogUtils.prototype.thanosSnap = function (fileName) {
        //remove all the older log entires from the log file and reduce the entries to half.
        var fileData = fs_1.default.readFileSync(this.filePath + fileName, "utf8");
        var lines = fileData.split("\n");
        var halfLines = lines.slice(lines.length / 2, lines.length);
        var halfData = halfLines.join("\n");
        fs_1.default.writeFileSync(this.filePath + fileName, halfData);
    };
    //a function to delete all data of the log file
    LogUtils.prototype.deleteLogData = function (fileName) {
        fs_1.default.writeFileSync(this.filePath + fileName, "");
    }; //end of deleteLogFile
    //function to get latest logs
    LogUtils.prototype.getLastEntries = function (fileName, entries) {
        var fileData = fs_1.default.readFileSync(this.filePath + fileName, "utf8");
        var lines = fileData.split("\n");
        var lastEntries = lines.slice(lines.length - entries, lines.length);
        console.log(colors_1.default.italic.cyan(lastEntries.join("\n")));
        return lastEntries;
    }; //end of getLastEntries
    //self destruct function that delete the log folder
    LogUtils.prototype.selfDestruct = function () {
        //if file dose not exist just return,
        if (fs_1.default.existsSync(this.filePath) === false)
            return;
        fs_1.default.rmdirSync(this.filePath, { recursive: true });
        log.general("Log folder deleted");
    }; //end of selfDestruct
    //delete a backup file
    LogUtils.prototype.deleteLogFile = function (fileName) {
        try {
            fs_1.default.unlinkSync(this.filePath + fileName);
            log.warn(fileName + " Removed Successfully");
        }
        catch (error) {
            log.error(error.message);
        }
    }; //end of deleteBackupFile
    // a method to create a backup of the given file in the backup folder
    LogUtils.prototype.backupLogFile = function (fileName) {
        //creates a backup in the root folder so you i can delete backup-files without any worries.
        //it overwrites the backup file if it already exists.
        fs_1.default.copyFileSync(this.filePath + fileName, "./backup/" + fileName);
        log.success("Backup created");
    }; //end of backupFile
    //a method to create back-up of all the files in log directory
    LogUtils.prototype.backupAllLogFiles = function () {
        var _this = this;
        fs_1.default.readdir(this.filePath, function (err, files) {
            if (err) {
                log.error(err);
            }
            else {
                files.forEach(function (file) {
                    _this.backupLogFile(file);
                });
            }
        });
    }; //end of backupAllLogFiles
    return LogUtils;
}());
exports.default = LogUtils;
