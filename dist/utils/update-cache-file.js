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
async function updateCacheFile(name = 'builder-cache.Dockerfile', baseRepo = 'smartcontract/builder') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNhY2hlLWZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXBkYXRlLWNhY2hlLWZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0RBQXFDO0FBQ3JDLCtCQUEyQjtBQUMzQixxQ0FBNkI7QUFDN0IsbUNBQW1EO0FBQ25EOzs7OztHQUtHO0FBQ0ksS0FBSyxVQUFVLGVBQWUsQ0FDbkMsSUFBSSxHQUFHLDBCQUEwQixFQUNqQyxRQUFRLEdBQUcsdUJBQXVCO0lBRWxDLE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25DLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEdBQUcsTUFBTSxxQkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLElBQUkseUJBQXlCLFVBQVUsS0FBSyxDQUFDLENBQUE7SUFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUUzQyxNQUFNLE9BQU8sR0FBRyxhQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUMzRSxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDO0FBWEQsMENBV0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsUUFBUSxDQUFDLENBQVMsRUFBRSxLQUFjO0lBQ2hELE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUN4QyxDQUFDO0FBRkQsNEJBRUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFZO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLFdBQUksQ0FBQyxrQkFBVSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFckMsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29yZSBmcm9tICdAYWN0aW9ucy9jb3JlJ1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBzZWQgfSBmcm9tICdzaGVsbGpzJ1xuaW1wb3J0IHsgZ2V0R2l0Um9vdCwgZ2V0TGF0ZXN0TmFtZSB9IGZyb20gJy4vdXRpbHMnXG4vKipcbiAqIFVwZGF0ZSBhIGRvY2tlciBjYWNoZSBmaWxlIHdpdGggdGhlIGxhdGVzdCBiYXNlIGZpbGUuXG4gKlxuICogQHBhcmFtIG5hbWUgW2NhY2hlLkRvY2tlcmZpbGVdIFRoZSBuYW1lIG9mIHRoZSBjYWNoZSBmaWxlIHRvIHVwZGF0ZVxuICogQHBhcmFtIGJhc2VSZXBvIFtzbWFydGNvbnRyYWN0L2J1aWxkZXJdIFRoZSBkb2NrZXIgcmVwbyBvZiB0aGUgYmFzZSBmaWxlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVDYWNoZUZpbGUoXG4gIG5hbWUgPSAnYnVpbGRlci1jYWNoZS5Eb2NrZXJmaWxlJyxcbiAgYmFzZVJlcG8gPSAnc21hcnRjb250cmFjdC9idWlsZGVyJyxcbikge1xuICBjb25zdCBwYXRoID0gZ2V0Q2FjaGVGaWxlUGF0aChuYW1lKVxuICBjb25zdCB7IGxhdGVzdE5hbWUsIGxhdGVzdFRhZyB9ID0gYXdhaXQgZ2V0TGF0ZXN0TmFtZShiYXNlUmVwbylcbiAgY29yZS5pbmZvKGBVcGRhdGluZyBjYWNoZSBmaWxlICR7cGF0aH0gd2l0aCBidWlsZGVyIHZlcnNpb24gJHtsYXRlc3ROYW1lfS4uLmApXG4gIGNvcmUuc2V0T3V0cHV0KCdidWlsZGVyVmVyc2lvbicsIGxhdGVzdFRhZylcblxuICBjb25zdCB1cGRhdGVkID0gc2VkKCctaScsIGluY2x1ZGVzKGJhc2VSZXBvKSwgYEZST00gJHtsYXRlc3ROYW1lfWAsIFtwYXRoXSlcbiAgcmV0dXJuIHVwZGF0ZWRcbn1cblxuLyoqXG4gKiBDaGVjayB0aGF0IGEgc3RyaW5nIGlzIGluY2x1ZGVkIGluIGEgbGluZSwgbWF0Y2hlcyBvbiBmaXJzdCBvY2N1cmVuY2UuXG4gKlxuICogQHBhcmFtIHMgVGhlIHN0cmluZyB0byBjaGVjayBmb3IgaW5jbHVzaW9uIGluIGEgbGluZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5jbHVkZXMoczogc3RyaW5nLCBmbGFncz86IHN0cmluZykge1xuICByZXR1cm4gbmV3IFJlZ0V4cChgXi4qJHtzfS4qJGAsIGZsYWdzKVxufVxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBkb2NrZXJmaWxlIGluIHRoZSByZXBvc2l0b3J5IHVzZWQgYXMgYSBjYWNoZSBmaWxlXG4gKlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGRvY2tlcmZpbGUgdG8gc2VhcmNoIGZvciB3aXRoaW4gdGhlIHJvb3Qgb2YgdGhlIHJlcG9zaXRvcnlcbiAqL1xuZnVuY3Rpb24gZ2V0Q2FjaGVGaWxlUGF0aChuYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgcGF0aCA9IGpvaW4oZ2V0R2l0Um9vdCgpLCBuYW1lKVxuXG4gIHJldHVybiBwYXRoXG59XG4iXX0=