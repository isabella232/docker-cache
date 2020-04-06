"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_docker_files_1 = require("./update-docker-files");
describe('update-docker-files tests', () => {
    describe('splitOnColon', () => {
        const cases = [
            ['split:on', ['split', 'on']],
            ['split:on:me', ['split', 'on:me']],
            ['splitonme', ['splitonme']],
        ];
        it.each(cases)('it should parse the string "%s" into [%s]', (s, expected) => {
            expect(update_docker_files_1.splitOnColon(s)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWRvY2tlci1maWxlcy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3VwZGF0ZS1kb2NrZXItZmlsZXMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUFvRDtBQUVwRCxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO1FBQzVCLE1BQU0sS0FBSyxHQUFHO1lBQ1osQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwQixDQUFBO1FBRVYsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDWiwyQ0FBMkMsRUFDM0MsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDZCxNQUFNLENBQUMsa0NBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMzQyxDQUFDLENBQ0YsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzcGxpdE9uQ29sb24gfSBmcm9tICcuL3VwZGF0ZS1kb2NrZXItZmlsZXMnXG5cbmRlc2NyaWJlKCd1cGRhdGUtZG9ja2VyLWZpbGVzIHRlc3RzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnc3BsaXRPbkNvbG9uJywgKCkgPT4ge1xuICAgIGNvbnN0IGNhc2VzID0gW1xuICAgICAgWydzcGxpdDpvbicsIFsnc3BsaXQnLCAnb24nXV0sXG4gICAgICBbJ3NwbGl0Om9uOm1lJywgWydzcGxpdCcsICdvbjptZSddXSxcbiAgICAgIFsnc3BsaXRvbm1lJywgWydzcGxpdG9ubWUnXV0sXG4gICAgXSBhcyBjb25zdFxuXG4gICAgaXQuZWFjaChjYXNlcykoXG4gICAgICAnaXQgc2hvdWxkIHBhcnNlIHRoZSBzdHJpbmcgXCIlc1wiIGludG8gWyVzXScsXG4gICAgICAocywgZXhwZWN0ZWQpID0+IHtcbiAgICAgICAgZXhwZWN0KHNwbGl0T25Db2xvbihzKSkudG9FcXVhbChleHBlY3RlZClcbiAgICAgIH0sXG4gICAgKVxuICB9KVxufSlcbiJdfQ==