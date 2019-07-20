"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const common_1 = require("../common");
class Compile extends command_1.default {
    async run() {
        common_1.execCommand(`rm -rf ${common_1.projectPath('compiled')}`);
        common_1.runScript(common_1.paths.bin('tsc'));
    }
}
Compile.description = 'Compiles project using typescript';
exports.Compile = Compile;
