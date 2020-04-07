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
 * Update the repo's dockerfiles with the current cache file.
 *
 * @param cacheRepo [smartcontract/cache] The dockerhub repository of the cache image
 */
async function updateDockerfiles(cacheRepo = 'smartcontract/builder-cache') {
    const { latestName } = await utils_1.getLatestName(cacheRepo);
    const files = getDockerFiles(cacheRepo);
    files.forEach(({ path, text }) => {
        core.info(`Updating dockerfile ${path} from ${text} to ${latestName}`);
        shelljs_1.sed('-i', text, `FROM ${latestName}`, [path_1.join(utils_1.getGitRoot(), path)]);
    });
}
exports.updateDockerfiles = updateDockerfiles;
/**
 * Split a string based on the first occurence of a colon
 *
 * @param s The string to split on
 */
function splitOnColon(s) {
    const i = s.indexOf(':');
    return i < 0 ? [s] : [s.substring(0, i), s.substring(i + 1)];
}
exports.splitOnColon = splitOnColon;
/**
 * Get a list of dockerfiles that are used as cache images
 * within this repository.
 */
function getDockerFiles(cacheFileName) {
    const res = shelljs_1.exec(`git grep "${cacheFileName}" -- "*Dockerfile*"`, {
        cwd: utils_1.getGitRoot(),
    });
    return res
        .split('\n')
        .filter(Boolean)
        .map(splitOnColon)
        .map(([path, text]) => ({ path, text }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWRvY2tlci1maWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91cGRhdGUtZG9ja2VyLWZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG9EQUFxQztBQUNyQywrQkFBMkI7QUFDM0IscUNBQW1DO0FBQ25DLG1DQUFtRDtBQUVuRDs7OztHQUlHO0FBQ0ksS0FBSyxVQUFVLGlCQUFpQixDQUNyQyxTQUFTLEdBQUcsNkJBQTZCO0lBRXpDLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLHFCQUFhLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDckQsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRXZDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLElBQUksU0FBUyxJQUFJLE9BQU8sVUFBVSxFQUFFLENBQUMsQ0FBQTtRQUN0RSxhQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLFVBQVUsRUFBRSxFQUFFLENBQUMsV0FBSSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkUsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBVkQsOENBVUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsWUFBWSxDQUFDLENBQVM7SUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM5RCxDQUFDO0FBSkQsb0NBSUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLGNBQWMsQ0FBQyxhQUFxQjtJQUMzQyxNQUFNLEdBQUcsR0FBRyxjQUFJLENBQUMsYUFBYSxhQUFhLHFCQUFxQixFQUFFO1FBQ2hFLEdBQUcsRUFBRSxrQkFBVSxFQUFFO0tBQ2xCLENBQUMsQ0FBQTtJQUVGLE9BQU8sR0FBRztTQUNQLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2YsR0FBRyxDQUFDLFlBQVksQ0FBQztTQUNqQixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGFjdGlvbnMvY29yZSdcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZXhlYywgc2VkIH0gZnJvbSAnc2hlbGxqcydcbmltcG9ydCB7IGdldEdpdFJvb3QsIGdldExhdGVzdE5hbWUgfSBmcm9tICcuL3V0aWxzJ1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgcmVwbydzIGRvY2tlcmZpbGVzIHdpdGggdGhlIGN1cnJlbnQgY2FjaGUgZmlsZS5cbiAqXG4gKiBAcGFyYW0gY2FjaGVSZXBvIFtzbWFydGNvbnRyYWN0L2NhY2hlXSBUaGUgZG9ja2VyaHViIHJlcG9zaXRvcnkgb2YgdGhlIGNhY2hlIGltYWdlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVEb2NrZXJmaWxlcyhcbiAgY2FjaGVSZXBvID0gJ3NtYXJ0Y29udHJhY3QvYnVpbGRlci1jYWNoZScsXG4pIHtcbiAgY29uc3QgeyBsYXRlc3ROYW1lIH0gPSBhd2FpdCBnZXRMYXRlc3ROYW1lKGNhY2hlUmVwbylcbiAgY29uc3QgZmlsZXMgPSBnZXREb2NrZXJGaWxlcyhjYWNoZVJlcG8pXG5cbiAgZmlsZXMuZm9yRWFjaCgoeyBwYXRoLCB0ZXh0IH0pID0+IHtcbiAgICBjb3JlLmluZm8oYFVwZGF0aW5nIGRvY2tlcmZpbGUgJHtwYXRofSBmcm9tICR7dGV4dH0gdG8gJHtsYXRlc3ROYW1lfWApXG4gICAgc2VkKCctaScsIHRleHQsIGBGUk9NICR7bGF0ZXN0TmFtZX1gLCBbam9pbihnZXRHaXRSb290KCksIHBhdGgpXSlcbiAgfSlcbn1cblxuLyoqXG4gKiBTcGxpdCBhIHN0cmluZyBiYXNlZCBvbiB0aGUgZmlyc3Qgb2NjdXJlbmNlIG9mIGEgY29sb25cbiAqXG4gKiBAcGFyYW0gcyBUaGUgc3RyaW5nIHRvIHNwbGl0IG9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdE9uQ29sb24oczogc3RyaW5nKSB7XG4gIGNvbnN0IGkgPSBzLmluZGV4T2YoJzonKVxuXG4gIHJldHVybiBpIDwgMCA/IFtzXSA6IFtzLnN1YnN0cmluZygwLCBpKSwgcy5zdWJzdHJpbmcoaSArIDEpXVxufVxuXG4vKipcbiAqIEdldCBhIGxpc3Qgb2YgZG9ja2VyZmlsZXMgdGhhdCBhcmUgdXNlZCBhcyBjYWNoZSBpbWFnZXNcbiAqIHdpdGhpbiB0aGlzIHJlcG9zaXRvcnkuXG4gKi9cbmZ1bmN0aW9uIGdldERvY2tlckZpbGVzKGNhY2hlRmlsZU5hbWU6IHN0cmluZykge1xuICBjb25zdCByZXMgPSBleGVjKGBnaXQgZ3JlcCBcIiR7Y2FjaGVGaWxlTmFtZX1cIiAtLSBcIipEb2NrZXJmaWxlKlwiYCwge1xuICAgIGN3ZDogZ2V0R2l0Um9vdCgpLFxuICB9KVxuXG4gIHJldHVybiByZXNcbiAgICAuc3BsaXQoJ1xcbicpXG4gICAgLmZpbHRlcihCb29sZWFuKVxuICAgIC5tYXAoc3BsaXRPbkNvbG9uKVxuICAgIC5tYXAoKFtwYXRoLCB0ZXh0XSkgPT4gKHsgcGF0aCwgdGV4dCB9KSlcbn1cbiJdfQ==