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
async function updateCacheFile(name = 'cache.Dockerfile', baseRepo = 'smartcontract/builder') {
    const path = getCacheFilePath(name);
    const { latestName, latestTag } = await utils_1.getLatestName(baseRepo);
    core.info(`Updating cache file ${path} with builder version ${latestName}...`);
    core.setOutput('builderVersion', latestTag);
    const updated = shelljs_1.sed('-i', includes(baseRepo), `FROM ${latestName}`, [path]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNhY2hlLWZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXBkYXRlLWNhY2hlLWZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0RBQXFDO0FBQ3JDLCtCQUEyQjtBQUMzQixxQ0FBNkI7QUFDN0IsbUNBQW1EO0FBQ25EOzs7OztHQUtHO0FBQ0ksS0FBSyxVQUFVLGVBQWUsQ0FDbkMsSUFBSSxHQUFHLGtCQUFrQixFQUN6QixRQUFRLEdBQUcsdUJBQXVCO0lBRWxDLE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25DLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEdBQUcsTUFBTSxxQkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLElBQUkseUJBQXlCLFVBQVUsS0FBSyxDQUFDLENBQUE7SUFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUUzQyxNQUFNLE9BQU8sR0FBRyxhQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUMzRSxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDO0FBWEQsMENBV0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsUUFBUSxDQUFDLENBQVMsRUFBRSxLQUFjO0lBQ2hELE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUN4QyxDQUFDO0FBRkQsNEJBRUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFZO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLFdBQUksQ0FBQyxrQkFBVSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFckMsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29yZSBmcm9tICdAYWN0aW9ucy9jb3JlJ1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBzZWQgfSBmcm9tICdzaGVsbGpzJ1xuaW1wb3J0IHsgZ2V0R2l0Um9vdCwgZ2V0TGF0ZXN0TmFtZSB9IGZyb20gJy4vdXRpbHMnXG4vKipcbiAqIFVwZGF0ZSBhIGRvY2tlciBjYWNoZSBmaWxlIHdpdGggdGhlIGxhdGVzdCBiYXNlIGZpbGUuXG4gKlxuICogQHBhcmFtIG5hbWUgW2NhY2hlLkRvY2tlcmZpbGVdIFRoZSBuYW1lIG9mIHRoZSBjYWNoZSBmaWxlIHRvIHVwZGF0ZVxuICogQHBhcmFtIGJhc2VSZXBvIFtzbWFydGNvbnRyYWN0L2J1aWxkZXJdIFRoZSBkb2NrZXIgcmVwbyBvZiB0aGUgYmFzZSBmaWxlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVDYWNoZUZpbGUoXG4gIG5hbWUgPSAnY2FjaGUuRG9ja2VyZmlsZScsXG4gIGJhc2VSZXBvID0gJ3NtYXJ0Y29udHJhY3QvYnVpbGRlcicsXG4pIHtcbiAgY29uc3QgcGF0aCA9IGdldENhY2hlRmlsZVBhdGgobmFtZSlcbiAgY29uc3QgeyBsYXRlc3ROYW1lLCBsYXRlc3RUYWcgfSA9IGF3YWl0IGdldExhdGVzdE5hbWUoYmFzZVJlcG8pXG4gIGNvcmUuaW5mbyhgVXBkYXRpbmcgY2FjaGUgZmlsZSAke3BhdGh9IHdpdGggYnVpbGRlciB2ZXJzaW9uICR7bGF0ZXN0TmFtZX0uLi5gKVxuICBjb3JlLnNldE91dHB1dCgnYnVpbGRlclZlcnNpb24nLCBsYXRlc3RUYWcpXG5cbiAgY29uc3QgdXBkYXRlZCA9IHNlZCgnLWknLCBpbmNsdWRlcyhiYXNlUmVwbyksIGBGUk9NICR7bGF0ZXN0TmFtZX1gLCBbcGF0aF0pXG4gIHJldHVybiB1cGRhdGVkXG59XG5cbi8qKlxuICogQ2hlY2sgdGhhdCBhIHN0cmluZyBpcyBpbmNsdWRlZCBpbiBhIGxpbmUsIG1hdGNoZXMgb24gZmlyc3Qgb2NjdXJlbmNlLlxuICpcbiAqIEBwYXJhbSBzIFRoZSBzdHJpbmcgdG8gY2hlY2sgZm9yIGluY2x1c2lvbiBpbiBhIGxpbmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluY2x1ZGVzKHM6IHN0cmluZywgZmxhZ3M/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoYF4uKiR7c30uKiRgLCBmbGFncylcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnQgZG9ja2VyZmlsZSBpbiB0aGUgcmVwb3NpdG9yeSB1c2VkIGFzIGEgY2FjaGUgZmlsZVxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBkb2NrZXJmaWxlIHRvIHNlYXJjaCBmb3Igd2l0aGluIHRoZSByb290IG9mIHRoZSByZXBvc2l0b3J5XG4gKi9cbmZ1bmN0aW9uIGdldENhY2hlRmlsZVBhdGgobmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHBhdGggPSBqb2luKGdldEdpdFJvb3QoKSwgbmFtZSlcblxuICByZXR1cm4gcGF0aFxufVxuIl19