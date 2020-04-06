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
async function updateDockerfiles(cacheRepo = "smartcontract/cache") {
    const cache = await utils_1.getLatestName(cacheRepo);
    const files = getDockerFiles(cacheRepo);
    files.forEach(({ path, text }) => {
        core.info(`Updating dockerfile ${path} from ${text} to ${cache}`);
        shelljs_1.sed("-i", text, `FROM ${cache}`, [path_1.join(utils_1.getGitRoot(), path)]);
    });
}
exports.updateDockerfiles = updateDockerfiles;
/**
 * Split a string based on the first occurence of a colon
 *
 * @param s The string to split on
 */
function splitOnColon(s) {
    const i = s.indexOf(":");
    return i < 0 ? [s] : [s.substring(0, i), s.substring(i + 1)];
}
exports.splitOnColon = splitOnColon;
/**
 * Get a list of dockerfiles that are used as cache images
 * within this repository.
 */
function getDockerFiles(cacheFileName) {
    const res = shelljs_1.exec(`git grep "${cacheFileName}" -- "*Dockerfile*"`, {
        cwd: utils_1.getGitRoot()
    });
    return res
        .split("\n")
        .filter(Boolean)
        .map(splitOnColon)
        .map(([path, text]) => ({ path, text }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWRvY2tlci1maWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91cGRhdGUtZG9ja2VyLWZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG9EQUFzQztBQUN0QywrQkFBNEI7QUFDNUIscUNBQW9DO0FBQ3BDLG1DQUFvRDtBQUVwRDs7OztHQUlHO0FBQ0ksS0FBSyxVQUFVLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxxQkFBcUI7SUFDdkUsTUFBTSxLQUFLLEdBQUcsTUFBTSxxQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV4QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLFNBQVMsSUFBSSxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbEUsYUFBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxLQUFLLEVBQUUsRUFBRSxDQUFDLFdBQUksQ0FBQyxrQkFBVSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVJELDhDQVFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFlBQVksQ0FBQyxDQUFTO0lBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUpELG9DQUlDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxjQUFjLENBQUMsYUFBcUI7SUFDM0MsTUFBTSxHQUFHLEdBQUcsY0FBSSxDQUFDLGFBQWEsYUFBYSxxQkFBcUIsRUFBRTtRQUNoRSxHQUFHLEVBQUUsa0JBQVUsRUFBRTtLQUNsQixDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUc7U0FDUCxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNmLEdBQUcsQ0FBQyxZQUFZLENBQUM7U0FDakIsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JlIGZyb20gXCJAYWN0aW9ucy9jb3JlXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGV4ZWMsIHNlZCB9IGZyb20gXCJzaGVsbGpzXCI7XG5pbXBvcnQgeyBnZXRHaXRSb290LCBnZXRMYXRlc3ROYW1lIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIHJlcG8ncyBkb2NrZXJmaWxlcyB3aXRoIHRoZSBjdXJyZW50IGNhY2hlIGZpbGUuXG4gKlxuICogQHBhcmFtIGNhY2hlUmVwbyBbc21hcnRjb250cmFjdC9jYWNoZV0gVGhlIGRvY2tlcmh1YiByZXBvc2l0b3J5IG9mIHRoZSBjYWNoZSBpbWFnZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlRG9ja2VyZmlsZXMoY2FjaGVSZXBvID0gXCJzbWFydGNvbnRyYWN0L2NhY2hlXCIpIHtcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBnZXRMYXRlc3ROYW1lKGNhY2hlUmVwbyk7XG4gIGNvbnN0IGZpbGVzID0gZ2V0RG9ja2VyRmlsZXMoY2FjaGVSZXBvKTtcblxuICBmaWxlcy5mb3JFYWNoKCh7IHBhdGgsIHRleHQgfSkgPT4ge1xuICAgIGNvcmUuaW5mbyhgVXBkYXRpbmcgZG9ja2VyZmlsZSAke3BhdGh9IGZyb20gJHt0ZXh0fSB0byAke2NhY2hlfWApO1xuICAgIHNlZChcIi1pXCIsIHRleHQsIGBGUk9NICR7Y2FjaGV9YCwgW2pvaW4oZ2V0R2l0Um9vdCgpLCBwYXRoKV0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTcGxpdCBhIHN0cmluZyBiYXNlZCBvbiB0aGUgZmlyc3Qgb2NjdXJlbmNlIG9mIGEgY29sb25cbiAqXG4gKiBAcGFyYW0gcyBUaGUgc3RyaW5nIHRvIHNwbGl0IG9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdE9uQ29sb24oczogc3RyaW5nKSB7XG4gIGNvbnN0IGkgPSBzLmluZGV4T2YoXCI6XCIpO1xuXG4gIHJldHVybiBpIDwgMCA/IFtzXSA6IFtzLnN1YnN0cmluZygwLCBpKSwgcy5zdWJzdHJpbmcoaSArIDEpXTtcbn1cblxuLyoqXG4gKiBHZXQgYSBsaXN0IG9mIGRvY2tlcmZpbGVzIHRoYXQgYXJlIHVzZWQgYXMgY2FjaGUgaW1hZ2VzXG4gKiB3aXRoaW4gdGhpcyByZXBvc2l0b3J5LlxuICovXG5mdW5jdGlvbiBnZXREb2NrZXJGaWxlcyhjYWNoZUZpbGVOYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgcmVzID0gZXhlYyhgZ2l0IGdyZXAgXCIke2NhY2hlRmlsZU5hbWV9XCIgLS0gXCIqRG9ja2VyZmlsZSpcImAsIHtcbiAgICBjd2Q6IGdldEdpdFJvb3QoKVxuICB9KTtcblxuICByZXR1cm4gcmVzXG4gICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgLmZpbHRlcihCb29sZWFuKVxuICAgIC5tYXAoc3BsaXRPbkNvbG9uKVxuICAgIC5tYXAoKFtwYXRoLCB0ZXh0XSkgPT4gKHsgcGF0aCwgdGV4dCB9KSk7XG59XG4iXX0=