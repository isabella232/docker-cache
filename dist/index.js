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
    if (!shelljs_1.which('git')) {
        core.setFailed('Sorry, this script requires git');
        shelljs_1.exit(1);
    }
    let ActionType;
    (function (ActionType) {
        ActionType["UPDATE_CACHE_FILE"] = "UPDATE_CACHE_FILE";
        ActionType["UPDATE_DOCKER_FILES"] = "UPDATE_DOCKER_FILES";
    })(ActionType || (ActionType = {}));
    const actionType = core.getInput('type', { required: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0RBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxtQ0FBNEQ7QUFFNUQsU0FBUyxJQUFJO0lBQ1gsSUFBSSxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7UUFDakQsY0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ1I7SUFFRCxJQUFLLFVBR0o7SUFIRCxXQUFLLFVBQVU7UUFDYixxREFBdUMsQ0FBQTtRQUN2Qyx5REFBMkMsQ0FBQTtJQUM3QyxDQUFDLEVBSEksVUFBVSxLQUFWLFVBQVUsUUFHZDtJQUNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFFNUQsSUFBSSxVQUFVLEtBQUssVUFBVSxDQUFDLGlCQUFpQixFQUFFO1FBQy9DLHVCQUFlLEVBQUUsQ0FBQTtLQUNsQjtTQUFNLElBQUksVUFBVSxLQUFLLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtRQUN4RCx5QkFBaUIsRUFBRSxDQUFBO0tBQ3BCO1NBQU07UUFDTCxJQUFJLENBQUMsU0FBUyxDQUNaLHFEQUFxRCxNQUFNLENBQUMsTUFBTSxDQUNoRSxVQUFVLENBQ1gsRUFBRSxDQUNKLENBQUE7S0FDRjtBQUNILENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGFjdGlvbnMvY29yZSdcbmltcG9ydCB7IGV4aXQsIHdoaWNoIH0gZnJvbSAnc2hlbGxqcydcbmltcG9ydCB7IHVwZGF0ZUNhY2hlRmlsZSwgdXBkYXRlRG9ja2VyZmlsZXMgfSBmcm9tICcuL3V0aWxzJ1xuXG5mdW5jdGlvbiBleGVjKCkge1xuICBpZiAoIXdoaWNoKCdnaXQnKSkge1xuICAgIGNvcmUuc2V0RmFpbGVkKCdTb3JyeSwgdGhpcyBzY3JpcHQgcmVxdWlyZXMgZ2l0JylcbiAgICBleGl0KDEpXG4gIH1cblxuICBlbnVtIEFjdGlvblR5cGUge1xuICAgIFVQREFURV9DQUNIRV9GSUxFID0gJ1VQREFURV9DQUNIRV9GSUxFJyxcbiAgICBVUERBVEVfRE9DS0VSX0ZJTEVTID0gJ1VQREFURV9ET0NLRVJfRklMRVMnLFxuICB9XG4gIGNvbnN0IGFjdGlvblR5cGUgPSBjb3JlLmdldElucHV0KCd0eXBlJywgeyByZXF1aXJlZDogdHJ1ZSB9KVxuXG4gIGlmIChhY3Rpb25UeXBlID09PSBBY3Rpb25UeXBlLlVQREFURV9DQUNIRV9GSUxFKSB7XG4gICAgdXBkYXRlQ2FjaGVGaWxlKClcbiAgfSBlbHNlIGlmIChhY3Rpb25UeXBlID09PSBBY3Rpb25UeXBlLlVQREFURV9ET0NLRVJfRklMRVMpIHtcbiAgICB1cGRhdGVEb2NrZXJmaWxlcygpXG4gIH0gZWxzZSB7XG4gICAgY29yZS5zZXRGYWlsZWQoXG4gICAgICBgVW5yZWNvZ25pemVkIGFjdGlvbiB0eXBlLCB2YWxpZCBhY3Rpb24gdHlwZXMgYXJlOiAke09iamVjdC52YWx1ZXMoXG4gICAgICAgIEFjdGlvblR5cGUsXG4gICAgICApfWAsXG4gICAgKVxuICB9XG59XG5cbmV4ZWMoKVxuIl19