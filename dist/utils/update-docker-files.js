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
async function updateDockerfiles(cacheRepo = 'smartcontract/cache') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWRvY2tlci1maWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91cGRhdGUtZG9ja2VyLWZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG9EQUFxQztBQUNyQywrQkFBMkI7QUFDM0IscUNBQW1DO0FBQ25DLG1DQUFtRDtBQUVuRDs7OztHQUlHO0FBQ0ksS0FBSyxVQUFVLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxxQkFBcUI7SUFDdkUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0scUJBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNyRCxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFdkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxTQUFTLElBQUksT0FBTyxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3RFLGFBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsVUFBVSxFQUFFLEVBQUUsQ0FBQyxXQUFJLENBQUMsa0JBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNuRSxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFSRCw4Q0FRQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixZQUFZLENBQUMsQ0FBUztJQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRXhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzlELENBQUM7QUFKRCxvQ0FJQztBQUVEOzs7R0FHRztBQUNILFNBQVMsY0FBYyxDQUFDLGFBQXFCO0lBQzNDLE1BQU0sR0FBRyxHQUFHLGNBQUksQ0FBQyxhQUFhLGFBQWEscUJBQXFCLEVBQUU7UUFDaEUsR0FBRyxFQUFFLGtCQUFVLEVBQUU7S0FDbEIsQ0FBQyxDQUFBO0lBRUYsT0FBTyxHQUFHO1NBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDZixHQUFHLENBQUMsWUFBWSxDQUFDO1NBQ2pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29yZSBmcm9tICdAYWN0aW9ucy9jb3JlJ1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBleGVjLCBzZWQgfSBmcm9tICdzaGVsbGpzJ1xuaW1wb3J0IHsgZ2V0R2l0Um9vdCwgZ2V0TGF0ZXN0TmFtZSB9IGZyb20gJy4vdXRpbHMnXG5cbi8qKlxuICogVXBkYXRlIHRoZSByZXBvJ3MgZG9ja2VyZmlsZXMgd2l0aCB0aGUgY3VycmVudCBjYWNoZSBmaWxlLlxuICpcbiAqIEBwYXJhbSBjYWNoZVJlcG8gW3NtYXJ0Y29udHJhY3QvY2FjaGVdIFRoZSBkb2NrZXJodWIgcmVwb3NpdG9yeSBvZiB0aGUgY2FjaGUgaW1hZ2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZURvY2tlcmZpbGVzKGNhY2hlUmVwbyA9ICdzbWFydGNvbnRyYWN0L2NhY2hlJykge1xuICBjb25zdCB7IGxhdGVzdE5hbWUgfSA9IGF3YWl0IGdldExhdGVzdE5hbWUoY2FjaGVSZXBvKVxuICBjb25zdCBmaWxlcyA9IGdldERvY2tlckZpbGVzKGNhY2hlUmVwbylcblxuICBmaWxlcy5mb3JFYWNoKCh7IHBhdGgsIHRleHQgfSkgPT4ge1xuICAgIGNvcmUuaW5mbyhgVXBkYXRpbmcgZG9ja2VyZmlsZSAke3BhdGh9IGZyb20gJHt0ZXh0fSB0byAke2xhdGVzdE5hbWV9YClcbiAgICBzZWQoJy1pJywgdGV4dCwgYEZST00gJHtsYXRlc3ROYW1lfWAsIFtqb2luKGdldEdpdFJvb3QoKSwgcGF0aCldKVxuICB9KVxufVxuXG4vKipcbiAqIFNwbGl0IGEgc3RyaW5nIGJhc2VkIG9uIHRoZSBmaXJzdCBvY2N1cmVuY2Ugb2YgYSBjb2xvblxuICpcbiAqIEBwYXJhbSBzIFRoZSBzdHJpbmcgdG8gc3BsaXQgb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T25Db2xvbihzOiBzdHJpbmcpIHtcbiAgY29uc3QgaSA9IHMuaW5kZXhPZignOicpXG5cbiAgcmV0dXJuIGkgPCAwID8gW3NdIDogW3Muc3Vic3RyaW5nKDAsIGkpLCBzLnN1YnN0cmluZyhpICsgMSldXG59XG5cbi8qKlxuICogR2V0IGEgbGlzdCBvZiBkb2NrZXJmaWxlcyB0aGF0IGFyZSB1c2VkIGFzIGNhY2hlIGltYWdlc1xuICogd2l0aGluIHRoaXMgcmVwb3NpdG9yeS5cbiAqL1xuZnVuY3Rpb24gZ2V0RG9ja2VyRmlsZXMoY2FjaGVGaWxlTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHJlcyA9IGV4ZWMoYGdpdCBncmVwIFwiJHtjYWNoZUZpbGVOYW1lfVwiIC0tIFwiKkRvY2tlcmZpbGUqXCJgLCB7XG4gICAgY3dkOiBnZXRHaXRSb290KCksXG4gIH0pXG5cbiAgcmV0dXJuIHJlc1xuICAgIC5zcGxpdCgnXFxuJylcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgLm1hcChzcGxpdE9uQ29sb24pXG4gICAgLm1hcCgoW3BhdGgsIHRleHRdKSA9PiAoeyBwYXRoLCB0ZXh0IH0pKVxufVxuIl19