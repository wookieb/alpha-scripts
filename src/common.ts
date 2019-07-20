import {spawnSync, execSync, ExecSyncOptions} from 'child_process'
import {resolve} from 'path';

export function runScript(path: string, args: string[] = []) {
    const result = spawnSync(path, args, {
        stdio: 'inherit',
        cwd: PROJECT_ROOT_DIR
    });

    if (result.signal) {
        if (result.signal === 'SIGKILL') {
            console.log(
                'The script failed because the process exited too early. ' +
                'This probably means the system ran out of memory or someone called ' +
                '`kill -9` on the process.'
            );
        } else if (result.signal === 'SIGTERM') {
            console.log(
                'The script failed because the process exited too early. ' +
                'Someone might have called `kill` or `killall`, or the system could ' +
                'be shutting down.'
            );
        }
        process.exit(1);
    }
    return result;
}

export function execCommand(command: string, options?: ExecSyncOptions) {
    return execSync(command, {
        stdio: 'inherit',
        ...(options || {})
    });
}

export const ROOT_DIR = resolve(__dirname, '../');

export namespace paths {
    export function template(name: string) {
        return resolve(ROOT_DIR, 'templates', name);
    }

    export function bin(name: string) {
        return resolve(ROOT_DIR, 'node_modules', '.bin', name);
    }
}

export const PROJECT_ROOT_DIR = process.cwd();

export function projectPath(path: string) {
    return resolve(PROJECT_ROOT_DIR, path);
}