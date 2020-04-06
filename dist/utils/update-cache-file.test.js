"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_cache_file_1 = require("./update-cache-file");
describe('update-cache-file tests', () => {
    describe('includes', () => {
        // we use the multiline flag here
        // to simulate 'sed' which will use this regex per line
        const regex = update_cache_file_1.includes('matchme', 'm');
        const cases = [
            [`asdfmatchmeasd`, true],
            [
                `
        heyooo
        matchme asdfsdf
        `,
                true,
            ],
            ['foobar', false],
            [`dontmatchm`, false],
            [
                `
        yomatchme
        andmatchmetoo
        asdfasd`,
                true,
            ],
        ];
        it.each(cases)('%s should be matched? %s', (s, expected) => {
            const actual = s.match(regex);
            console.log(actual);
            expect(!!actual).toEqual(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNhY2hlLWZpbGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91cGRhdGUtY2FjaGUtZmlsZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQThDO0FBRTlDLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDeEIsaUNBQWlDO1FBQ2pDLHVEQUF1RDtRQUN2RCxNQUFNLEtBQUssR0FBRyw0QkFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN0QyxNQUFNLEtBQUssR0FBRztZQUNaLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO1lBQ3hCO2dCQUNFOzs7U0FHQztnQkFDRCxJQUFJO2FBQ0w7WUFDRCxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7WUFDakIsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDO1lBQ3JCO2dCQUNFOzs7Z0JBR1E7Z0JBQ1IsSUFBSTthQUNMO1NBQ08sQ0FBQTtRQUVWLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDekQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3BDLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluY2x1ZGVzIH0gZnJvbSAnLi91cGRhdGUtY2FjaGUtZmlsZSdcblxuZGVzY3JpYmUoJ3VwZGF0ZS1jYWNoZS1maWxlIHRlc3RzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnaW5jbHVkZXMnLCAoKSA9PiB7XG4gICAgLy8gd2UgdXNlIHRoZSBtdWx0aWxpbmUgZmxhZyBoZXJlXG4gICAgLy8gdG8gc2ltdWxhdGUgJ3NlZCcgd2hpY2ggd2lsbCB1c2UgdGhpcyByZWdleCBwZXIgbGluZVxuICAgIGNvbnN0IHJlZ2V4ID0gaW5jbHVkZXMoJ21hdGNobWUnLCAnbScpXG4gICAgY29uc3QgY2FzZXMgPSBbXG4gICAgICBbYGFzZGZtYXRjaG1lYXNkYCwgdHJ1ZV0sXG4gICAgICBbXG4gICAgICAgIGBcbiAgICAgICAgaGV5b29vXG4gICAgICAgIG1hdGNobWUgYXNkZnNkZlxuICAgICAgICBgLFxuICAgICAgICB0cnVlLFxuICAgICAgXSxcbiAgICAgIFsnZm9vYmFyJywgZmFsc2VdLFxuICAgICAgW2Bkb250bWF0Y2htYCwgZmFsc2VdLFxuICAgICAgW1xuICAgICAgICBgXG4gICAgICAgIHlvbWF0Y2htZVxuICAgICAgICBhbmRtYXRjaG1ldG9vXG4gICAgICAgIGFzZGZhc2RgLFxuICAgICAgICB0cnVlLFxuICAgICAgXSxcbiAgICBdIGFzIGNvbnN0XG5cbiAgICBpdC5lYWNoKGNhc2VzKSgnJXMgc2hvdWxkIGJlIG1hdGNoZWQ/ICVzJywgKHMsIGV4cGVjdGVkKSA9PiB7XG4gICAgICBjb25zdCBhY3R1YWwgPSBzLm1hdGNoKHJlZ2V4KVxuICAgICAgY29uc29sZS5sb2coYWN0dWFsKVxuICAgICAgZXhwZWN0KCEhYWN0dWFsKS50b0VxdWFsKGV4cGVjdGVkKVxuICAgIH0pXG4gIH0pXG59KVxuIl19