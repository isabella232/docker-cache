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
const shelljs_1 = require("shelljs");
const utils_1 = require("./utils");
function exec() {
    if (!shelljs_1.which("git")) {
        core.setFailed("Sorry, this script requires git");
        shelljs_1.exit(1);
    }
    let ActionType;
    (function (ActionType) {
        ActionType["UPDATE_CACHE_FILE"] = "UPDATE_CACHE_FILE";
        ActionType["UPDATE_DOCKER_FILES"] = "UPDATE_DOCKER_FILES";
    })(ActionType || (ActionType = {}));
    const actionType = core.getInput("actionType", { required: true });
    if (actionType === ActionType.UPDATE_CACHE_FILE) {
        utils_1.updateCacheFile();
    }
    else if (actionType === ActionType.UPDATE_DOCKER_FILES) {
        utils_1.updateDockerfiles();
    }
    else {
        core.setFailed(`Unrecognized action type, valid action types are: ${Object.values(ActionType)}`);
    }
}
exec();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLHFDQUFzQztBQUN0QyxtQ0FBNkQ7QUFFN0QsU0FBUyxJQUFJO0lBQ1gsSUFBSSxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDbEQsY0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1Q7SUFFRCxJQUFLLFVBR0o7SUFIRCxXQUFLLFVBQVU7UUFDYixxREFBdUMsQ0FBQTtRQUN2Qyx5REFBMkMsQ0FBQTtJQUM3QyxDQUFDLEVBSEksVUFBVSxLQUFWLFVBQVUsUUFHZDtJQUNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFFbkUsSUFBSSxVQUFVLEtBQUssVUFBVSxDQUFDLGlCQUFpQixFQUFFO1FBQy9DLHVCQUFlLEVBQUUsQ0FBQztLQUNuQjtTQUFNLElBQUksVUFBVSxLQUFLLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtRQUN4RCx5QkFBaUIsRUFBRSxDQUFDO0tBQ3JCO1NBQU07UUFDTCxJQUFJLENBQUMsU0FBUyxDQUNaLHFEQUFxRCxNQUFNLENBQUMsTUFBTSxDQUNoRSxVQUFVLENBQ1gsRUFBRSxDQUNKLENBQUM7S0FDSDtBQUNILENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSBcIkBhY3Rpb25zL2NvcmVcIjtcbmltcG9ydCB7IGV4aXQsIHdoaWNoIH0gZnJvbSBcInNoZWxsanNcIjtcbmltcG9ydCB7IHVwZGF0ZUNhY2hlRmlsZSwgdXBkYXRlRG9ja2VyZmlsZXMgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBleGVjKCkge1xuICBpZiAoIXdoaWNoKFwiZ2l0XCIpKSB7XG4gICAgY29yZS5zZXRGYWlsZWQoXCJTb3JyeSwgdGhpcyBzY3JpcHQgcmVxdWlyZXMgZ2l0XCIpO1xuICAgIGV4aXQoMSk7XG4gIH1cblxuICBlbnVtIEFjdGlvblR5cGUge1xuICAgIFVQREFURV9DQUNIRV9GSUxFID0gXCJVUERBVEVfQ0FDSEVfRklMRVwiLFxuICAgIFVQREFURV9ET0NLRVJfRklMRVMgPSBcIlVQREFURV9ET0NLRVJfRklMRVNcIixcbiAgfVxuICBjb25zdCBhY3Rpb25UeXBlID0gY29yZS5nZXRJbnB1dChcImFjdGlvblR5cGVcIiwgeyByZXF1aXJlZDogdHJ1ZSB9KTtcblxuICBpZiAoYWN0aW9uVHlwZSA9PT0gQWN0aW9uVHlwZS5VUERBVEVfQ0FDSEVfRklMRSkge1xuICAgIHVwZGF0ZUNhY2hlRmlsZSgpO1xuICB9IGVsc2UgaWYgKGFjdGlvblR5cGUgPT09IEFjdGlvblR5cGUuVVBEQVRFX0RPQ0tFUl9GSUxFUykge1xuICAgIHVwZGF0ZURvY2tlcmZpbGVzKCk7XG4gIH0gZWxzZSB7XG4gICAgY29yZS5zZXRGYWlsZWQoXG4gICAgICBgVW5yZWNvZ25pemVkIGFjdGlvbiB0eXBlLCB2YWxpZCBhY3Rpb24gdHlwZXMgYXJlOiAke09iamVjdC52YWx1ZXMoXG4gICAgICAgIEFjdGlvblR5cGVcbiAgICAgICl9YFxuICAgICk7XG4gIH1cbn1cblxuZXhlYygpO1xuIl19