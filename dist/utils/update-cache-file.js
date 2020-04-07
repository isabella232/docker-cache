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
    core.setOutput("builderVersion", latestBuilder);
    const updated = shelljs_1.sed("-i", includes(baseRepo), `FROM ${latestBuilder}`, [
        path,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNhY2hlLWZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXBkYXRlLWNhY2hlLWZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLCtCQUE0QjtBQUM1QixxQ0FBOEI7QUFDOUIsbUNBQW9EO0FBQ3BEOzs7OztHQUtHO0FBQ0ksS0FBSyxVQUFVLGVBQWUsQ0FDbkMsSUFBSSxHQUFHLGtCQUFrQixFQUN6QixRQUFRLEdBQUcsdUJBQXVCO0lBRWxDLE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sYUFBYSxHQUFHLE1BQU0scUJBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsSUFBSSxDQUNQLHVCQUF1QixJQUFJLHlCQUF5QixhQUFhLEtBQUssQ0FDdkUsQ0FBQztJQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFaEQsTUFBTSxPQUFPLEdBQUcsYUFBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxhQUFhLEVBQUUsRUFBRTtRQUNyRSxJQUFJO0tBQ0wsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQWZELDBDQWVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxDQUFTLEVBQUUsS0FBYztJQUNoRCxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUZELDRCQUVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsSUFBWTtJQUNwQyxNQUFNLElBQUksR0FBRyxXQUFJLENBQUMsa0JBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXRDLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSBcIkBhY3Rpb25zL2NvcmVcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgc2VkIH0gZnJvbSBcInNoZWxsanNcIjtcbmltcG9ydCB7IGdldEdpdFJvb3QsIGdldExhdGVzdE5hbWUgfSBmcm9tIFwiLi91dGlsc1wiO1xuLyoqXG4gKiBVcGRhdGUgYSBkb2NrZXIgY2FjaGUgZmlsZSB3aXRoIHRoZSBsYXRlc3QgYmFzZSBmaWxlLlxuICpcbiAqIEBwYXJhbSBuYW1lIFtjYWNoZS5Eb2NrZXJmaWxlXSBUaGUgbmFtZSBvZiB0aGUgY2FjaGUgZmlsZSB0byB1cGRhdGVcbiAqIEBwYXJhbSBiYXNlUmVwbyBbc21hcnRjb250cmFjdC9idWlsZGVyXSBUaGUgZG9ja2VyIHJlcG8gb2YgdGhlIGJhc2UgZmlsZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlQ2FjaGVGaWxlKFxuICBuYW1lID0gXCJjYWNoZS5Eb2NrZXJmaWxlXCIsXG4gIGJhc2VSZXBvID0gXCJzbWFydGNvbnRyYWN0L2J1aWxkZXJcIlxuKSB7XG4gIGNvbnN0IHBhdGggPSBnZXRDYWNoZUZpbGVQYXRoKG5hbWUpO1xuICBjb25zdCBsYXRlc3RCdWlsZGVyID0gYXdhaXQgZ2V0TGF0ZXN0TmFtZShiYXNlUmVwbyk7XG4gIGNvcmUuaW5mbyhcbiAgICBgVXBkYXRpbmcgY2FjaGUgZmlsZSAke3BhdGh9IHdpdGggYnVpbGRlciB2ZXJzaW9uICR7bGF0ZXN0QnVpbGRlcn0uLi5gXG4gICk7XG4gIGNvcmUuc2V0T3V0cHV0KFwiYnVpbGRlclZlcnNpb25cIiwgbGF0ZXN0QnVpbGRlcik7XG5cbiAgY29uc3QgdXBkYXRlZCA9IHNlZChcIi1pXCIsIGluY2x1ZGVzKGJhc2VSZXBvKSwgYEZST00gJHtsYXRlc3RCdWlsZGVyfWAsIFtcbiAgICBwYXRoLFxuICBdKTtcbiAgcmV0dXJuIHVwZGF0ZWQ7XG59XG5cbi8qKlxuICogQ2hlY2sgdGhhdCBhIHN0cmluZyBpcyBpbmNsdWRlZCBpbiBhIGxpbmUsIG1hdGNoZXMgb24gZmlyc3Qgb2NjdXJlbmNlLlxuICpcbiAqIEBwYXJhbSBzIFRoZSBzdHJpbmcgdG8gY2hlY2sgZm9yIGluY2x1c2lvbiBpbiBhIGxpbmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluY2x1ZGVzKHM6IHN0cmluZywgZmxhZ3M/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoYF4uKiR7c30uKiRgLCBmbGFncyk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IGRvY2tlcmZpbGUgaW4gdGhlIHJlcG9zaXRvcnkgdXNlZCBhcyBhIGNhY2hlIGZpbGVcbiAqXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZG9ja2VyZmlsZSB0byBzZWFyY2ggZm9yIHdpdGhpbiB0aGUgcm9vdCBvZiB0aGUgcmVwb3NpdG9yeVxuICovXG5mdW5jdGlvbiBnZXRDYWNoZUZpbGVQYXRoKG5hbWU6IHN0cmluZykge1xuICBjb25zdCBwYXRoID0gam9pbihnZXRHaXRSb290KCksIG5hbWUpO1xuXG4gIHJldHVybiBwYXRoO1xufVxuIl19