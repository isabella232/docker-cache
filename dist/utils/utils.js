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
const drc = __importStar(require("docker-registry-client"));
const semver = __importStar(require("semver"));
const shelljs_1 = require("shelljs");
/**
 * Get the absolute path of the root of the repository
 */
function getGitRoot() {
    return shelljs_1.exec('git rev-parse --show-toplevel', { silent: true }).trim();
}
exports.getGitRoot = getGitRoot;
/**
 * Get the latest base image name from the docker registry.
 * Only handles valid semver tags, invalid semver tags will be ignored.
 */
async function getLatestName(repo) {
    const client = drc.createClientV2({
        name: repo,
    });
    const { tags } = await listTags(client);
    const filteredTags = tags
        .filter((t) => !!semver.valid(t))
        .sort((a, b) => semver.compare(a, b));
    const latestTag = filteredTags[filteredTags.length - 1];
    const latestName = `${repo}:${latestTag}`;
    core.info(`Fetched latest tag for repo ${repo}: ${latestTag}`);
    return { latestName, latestTag };
}
exports.getLatestName = getLatestName;
/**
 * List all tags for a repository on the official docker registry
 *
 * @param repo The repository to list tags for
 */
function listTags(client) {
    return new Promise((resolve, reject) => {
        client.listTags((err, tags) => {
            client.close();
            if (err) {
                return reject(err);
            }
            return resolve(tags);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0RBQXFDO0FBQ3JDLDREQUE2QztBQUM3QywrQ0FBZ0M7QUFDaEMscUNBQThCO0FBRTlCOztHQUVHO0FBQ0gsU0FBZ0IsVUFBVTtJQUN4QixPQUFPLGNBQUksQ0FBQywrQkFBK0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0FBQ3ZFLENBQUM7QUFGRCxnQ0FFQztBQUVEOzs7R0FHRztBQUNJLEtBQUssVUFBVSxhQUFhLENBQUMsSUFBWTtJQUM5QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDO1FBQ2hDLElBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQyxDQUFBO0lBRUYsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLE1BQU0sWUFBWSxHQUFHLElBQUk7U0FDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRXZDLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3ZELE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxDQUFBO0lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsK0JBQStCLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQyxDQUFBO0lBRTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLENBQUE7QUFDbEMsQ0FBQztBQWZELHNDQWVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsUUFBUSxDQUFDLE1BQTRCO0lBQzVDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM1QixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDZCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNuQjtZQUNELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29yZSBmcm9tICdAYWN0aW9ucy9jb3JlJ1xuaW1wb3J0ICogYXMgZHJjIGZyb20gJ2RvY2tlci1yZWdpc3RyeS1jbGllbnQnXG5pbXBvcnQgKiBhcyBzZW12ZXIgZnJvbSAnc2VtdmVyJ1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3NoZWxsanMnXG5cbi8qKlxuICogR2V0IHRoZSBhYnNvbHV0ZSBwYXRoIG9mIHRoZSByb290IG9mIHRoZSByZXBvc2l0b3J5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHaXRSb290KCkge1xuICByZXR1cm4gZXhlYygnZ2l0IHJldi1wYXJzZSAtLXNob3ctdG9wbGV2ZWwnLCB7IHNpbGVudDogdHJ1ZSB9KS50cmltKClcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGxhdGVzdCBiYXNlIGltYWdlIG5hbWUgZnJvbSB0aGUgZG9ja2VyIHJlZ2lzdHJ5LlxuICogT25seSBoYW5kbGVzIHZhbGlkIHNlbXZlciB0YWdzLCBpbnZhbGlkIHNlbXZlciB0YWdzIHdpbGwgYmUgaWdub3JlZC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExhdGVzdE5hbWUocmVwbzogc3RyaW5nKSB7XG4gIGNvbnN0IGNsaWVudCA9IGRyYy5jcmVhdGVDbGllbnRWMih7XG4gICAgbmFtZTogcmVwbyxcbiAgfSlcblxuICBjb25zdCB7IHRhZ3MgfSA9IGF3YWl0IGxpc3RUYWdzKGNsaWVudClcbiAgY29uc3QgZmlsdGVyZWRUYWdzID0gdGFnc1xuICAgIC5maWx0ZXIoKHQpID0+ICEhc2VtdmVyLnZhbGlkKHQpKVxuICAgIC5zb3J0KChhLCBiKSA9PiBzZW12ZXIuY29tcGFyZShhLCBiKSlcblxuICBjb25zdCBsYXRlc3RUYWcgPSBmaWx0ZXJlZFRhZ3NbZmlsdGVyZWRUYWdzLmxlbmd0aCAtIDFdXG4gIGNvbnN0IGxhdGVzdE5hbWUgPSBgJHtyZXBvfToke2xhdGVzdFRhZ31gXG4gIGNvcmUuaW5mbyhgRmV0Y2hlZCBsYXRlc3QgdGFnIGZvciByZXBvICR7cmVwb306ICR7bGF0ZXN0VGFnfWApXG5cbiAgcmV0dXJuIHsgbGF0ZXN0TmFtZSwgbGF0ZXN0VGFnIH1cbn1cblxuLyoqXG4gKiBMaXN0IGFsbCB0YWdzIGZvciBhIHJlcG9zaXRvcnkgb24gdGhlIG9mZmljaWFsIGRvY2tlciByZWdpc3RyeVxuICpcbiAqIEBwYXJhbSByZXBvIFRoZSByZXBvc2l0b3J5IHRvIGxpc3QgdGFncyBmb3JcbiAqL1xuZnVuY3Rpb24gbGlzdFRhZ3MoY2xpZW50OiBkcmMuUmVnaXN0cnlDbGllbnRWMik6IFByb21pc2U8ZHJjLlRhZ3M+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjbGllbnQubGlzdFRhZ3MoKGVyciwgdGFncykgPT4ge1xuICAgICAgY2xpZW50LmNsb3NlKClcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZSh0YWdzKVxuICAgIH0pXG4gIH0pXG59XG4iXX0=