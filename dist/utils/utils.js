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
    return shelljs_1.exec("git rev-parse --show-toplevel", { silent: true }).trim();
}
exports.getGitRoot = getGitRoot;
/**
 * Get the latest base image name from the docker registry.
 * Only handles valid semver tags, invalid semver tags will be ignored.
 */
async function getLatestName(repo) {
    const client = drc.createClientV2({
        name: repo
    });
    const { tags } = await listTags(client);
    const filteredTags = tags
        .filter(t => !!semver.valid(t))
        .sort((a, b) => semver.compare(a, b));
    const latestTag = filteredTags[filteredTags.length - 1];
    const latestName = `${repo}:${latestTag}`;
    core.info(`Fetched latest tag for repo ${repo}: ${latestTag}`);
    return latestName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLDREQUE4QztBQUM5QywrQ0FBaUM7QUFDakMscUNBQStCO0FBRS9COztHQUVHO0FBQ0gsU0FBZ0IsVUFBVTtJQUN4QixPQUFPLGNBQUksQ0FBQywrQkFBK0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3hFLENBQUM7QUFGRCxnQ0FFQztBQUVEOzs7R0FHRztBQUNJLEtBQUssVUFBVSxhQUFhLENBQUMsSUFBWTtJQUM5QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDO1FBQ2hDLElBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQyxDQUFDO0lBRUgsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sWUFBWSxHQUFHLElBQUk7U0FDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RCxNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsQ0FBQztJQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLCtCQUErQixJQUFJLEtBQUssU0FBUyxFQUFFLENBQUMsQ0FBQztJQUUvRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBZkQsc0NBZUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxRQUFRLENBQUMsTUFBNEI7SUFDNUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BCO1lBQ0QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JlIGZyb20gXCJAYWN0aW9ucy9jb3JlXCI7XG5pbXBvcnQgKiBhcyBkcmMgZnJvbSBcImRvY2tlci1yZWdpc3RyeS1jbGllbnRcIjtcbmltcG9ydCAqIGFzIHNlbXZlciBmcm9tIFwic2VtdmVyXCI7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSBcInNoZWxsanNcIjtcblxuLyoqXG4gKiBHZXQgdGhlIGFic29sdXRlIHBhdGggb2YgdGhlIHJvb3Qgb2YgdGhlIHJlcG9zaXRvcnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEdpdFJvb3QoKSB7XG4gIHJldHVybiBleGVjKFwiZ2l0IHJldi1wYXJzZSAtLXNob3ctdG9wbGV2ZWxcIiwgeyBzaWxlbnQ6IHRydWUgfSkudHJpbSgpO1xufVxuXG4vKipcbiAqIEdldCB0aGUgbGF0ZXN0IGJhc2UgaW1hZ2UgbmFtZSBmcm9tIHRoZSBkb2NrZXIgcmVnaXN0cnkuXG4gKiBPbmx5IGhhbmRsZXMgdmFsaWQgc2VtdmVyIHRhZ3MsIGludmFsaWQgc2VtdmVyIHRhZ3Mgd2lsbCBiZSBpZ25vcmVkLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGF0ZXN0TmFtZShyZXBvOiBzdHJpbmcpIHtcbiAgY29uc3QgY2xpZW50ID0gZHJjLmNyZWF0ZUNsaWVudFYyKHtcbiAgICBuYW1lOiByZXBvXG4gIH0pO1xuXG4gIGNvbnN0IHsgdGFncyB9ID0gYXdhaXQgbGlzdFRhZ3MoY2xpZW50KTtcbiAgY29uc3QgZmlsdGVyZWRUYWdzID0gdGFnc1xuICAgIC5maWx0ZXIodCA9PiAhIXNlbXZlci52YWxpZCh0KSlcbiAgICAuc29ydCgoYSwgYikgPT4gc2VtdmVyLmNvbXBhcmUoYSwgYikpO1xuXG4gIGNvbnN0IGxhdGVzdFRhZyA9IGZpbHRlcmVkVGFnc1tmaWx0ZXJlZFRhZ3MubGVuZ3RoIC0gMV07XG4gIGNvbnN0IGxhdGVzdE5hbWUgPSBgJHtyZXBvfToke2xhdGVzdFRhZ31gO1xuICBjb3JlLmluZm8oYEZldGNoZWQgbGF0ZXN0IHRhZyBmb3IgcmVwbyAke3JlcG99OiAke2xhdGVzdFRhZ31gKTtcblxuICByZXR1cm4gbGF0ZXN0TmFtZTtcbn1cblxuLyoqXG4gKiBMaXN0IGFsbCB0YWdzIGZvciBhIHJlcG9zaXRvcnkgb24gdGhlIG9mZmljaWFsIGRvY2tlciByZWdpc3RyeVxuICpcbiAqIEBwYXJhbSByZXBvIFRoZSByZXBvc2l0b3J5IHRvIGxpc3QgdGFncyBmb3JcbiAqL1xuZnVuY3Rpb24gbGlzdFRhZ3MoY2xpZW50OiBkcmMuUmVnaXN0cnlDbGllbnRWMik6IFByb21pc2U8ZHJjLlRhZ3M+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjbGllbnQubGlzdFRhZ3MoKGVyciwgdGFncykgPT4ge1xuICAgICAgY2xpZW50LmNsb3NlKCk7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNvbHZlKHRhZ3MpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==