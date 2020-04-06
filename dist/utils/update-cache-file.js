"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const path_1 = require("path");
const shelljs_1 = require("shelljs");
const utils_1 = require("./utils");
/**
 * Update a docker cache file with the latest base file.
 *
 * @param name [cache.Dockerfile] The name of the cache file to update
 * @param baseRepo [smartcontract/builder] The docker repo of the base file
 */
async function updateCacheFile(name = "cache.Dockerfile", baseRepo = "smartcontract/builder") {
    const path = getCacheFilePath(name);
    const latestBuilder = await utils_1.getLatestName(baseRepo);
    core.info(`Updating cache file ${path} with builder version ${latestBuilder}...`);
    const updated = shelljs_1.sed("-i", includes(baseRepo), `FROM ${latestBuilder}`, [
        path
    ]);
    return updated;
}
exports.updateCacheFile = updateCacheFile;
/**
 * Check that a string is included in a line, matches on first occurence.
 *
 * @param s The string to check for inclusion in a line
 */
function includes(s, flags) {
    return new RegExp(`^.*${s}.*$`, flags);
}
exports.includes = includes;
/**
 * Get the current dockerfile in the repository used as a cache file
 *
 * @param name The name of the dockerfile to search for within the root of the repository
 */
function getCacheFilePath(name) {
    const path = path_1.join(utils_1.getGitRoot(), name);
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNhY2hlLWZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXBkYXRlLWNhY2hlLWZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLCtCQUE0QjtBQUM1QixxQ0FBOEI7QUFDOUIsbUNBQW9EO0FBQ3BEOzs7OztHQUtHO0FBQ0ksS0FBSyxVQUFVLGVBQWUsQ0FDbkMsSUFBSSxHQUFHLGtCQUFrQixFQUN6QixRQUFRLEdBQUcsdUJBQXVCO0lBRWxDLE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sYUFBYSxHQUFHLE1BQU0scUJBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsSUFBSSxDQUNQLHVCQUF1QixJQUFJLHlCQUF5QixhQUFhLEtBQUssQ0FDdkUsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLGFBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsYUFBYSxFQUFFLEVBQUU7UUFDckUsSUFBSTtLQUNMLENBQUMsQ0FBQztJQUNILE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFkRCwwQ0FjQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixRQUFRLENBQUMsQ0FBUyxFQUFFLEtBQWM7SUFDaEQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFGRCw0QkFFQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLGdCQUFnQixDQUFDLElBQVk7SUFDcEMsTUFBTSxJQUFJLEdBQUcsV0FBSSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV0QyxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JlIGZyb20gXCJAYWN0aW9ucy9jb3JlXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IHNlZCB9IGZyb20gXCJzaGVsbGpzXCI7XG5pbXBvcnQgeyBnZXRHaXRSb290LCBnZXRMYXRlc3ROYW1lIH0gZnJvbSBcIi4vdXRpbHNcIjtcbi8qKlxuICogVXBkYXRlIGEgZG9ja2VyIGNhY2hlIGZpbGUgd2l0aCB0aGUgbGF0ZXN0IGJhc2UgZmlsZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBbY2FjaGUuRG9ja2VyZmlsZV0gVGhlIG5hbWUgb2YgdGhlIGNhY2hlIGZpbGUgdG8gdXBkYXRlXG4gKiBAcGFyYW0gYmFzZVJlcG8gW3NtYXJ0Y29udHJhY3QvYnVpbGRlcl0gVGhlIGRvY2tlciByZXBvIG9mIHRoZSBiYXNlIGZpbGVcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNhY2hlRmlsZShcbiAgbmFtZSA9IFwiY2FjaGUuRG9ja2VyZmlsZVwiLFxuICBiYXNlUmVwbyA9IFwic21hcnRjb250cmFjdC9idWlsZGVyXCJcbikge1xuICBjb25zdCBwYXRoID0gZ2V0Q2FjaGVGaWxlUGF0aChuYW1lKTtcbiAgY29uc3QgbGF0ZXN0QnVpbGRlciA9IGF3YWl0IGdldExhdGVzdE5hbWUoYmFzZVJlcG8pO1xuICBjb3JlLmluZm8oXG4gICAgYFVwZGF0aW5nIGNhY2hlIGZpbGUgJHtwYXRofSB3aXRoIGJ1aWxkZXIgdmVyc2lvbiAke2xhdGVzdEJ1aWxkZXJ9Li4uYFxuICApO1xuXG4gIGNvbnN0IHVwZGF0ZWQgPSBzZWQoXCItaVwiLCBpbmNsdWRlcyhiYXNlUmVwbyksIGBGUk9NICR7bGF0ZXN0QnVpbGRlcn1gLCBbXG4gICAgcGF0aFxuICBdKTtcbiAgcmV0dXJuIHVwZGF0ZWQ7XG59XG5cbi8qKlxuICogQ2hlY2sgdGhhdCBhIHN0cmluZyBpcyBpbmNsdWRlZCBpbiBhIGxpbmUsIG1hdGNoZXMgb24gZmlyc3Qgb2NjdXJlbmNlLlxuICpcbiAqIEBwYXJhbSBzIFRoZSBzdHJpbmcgdG8gY2hlY2sgZm9yIGluY2x1c2lvbiBpbiBhIGxpbmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluY2x1ZGVzKHM6IHN0cmluZywgZmxhZ3M/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoYF4uKiR7c30uKiRgLCBmbGFncyk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IGRvY2tlcmZpbGUgaW4gdGhlIHJlcG9zaXRvcnkgdXNlZCBhcyBhIGNhY2hlIGZpbGVcbiAqXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZG9ja2VyZmlsZSB0byBzZWFyY2ggZm9yIHdpdGhpbiB0aGUgcm9vdCBvZiB0aGUgcmVwb3NpdG9yeVxuICovXG5mdW5jdGlvbiBnZXRDYWNoZUZpbGVQYXRoKG5hbWU6IHN0cmluZykge1xuICBjb25zdCBwYXRoID0gam9pbihnZXRHaXRSb290KCksIG5hbWUpO1xuXG4gIHJldHVybiBwYXRoO1xufVxuIl19