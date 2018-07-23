describe('Test angularjs-dropdown', () => {
    let element, scope, compile, test;

    beforeEach(module('angularDropdown'));

    beforeEach(inject(($compile, $rootScope) => {
        scope = $rootScope.$new();

        scope.clubs = [
            { id: 1, label: 'Arsenal' },
            { id: 2, label: 'Liverpool' }
        ];
        scope.selectedClub = [];

        element = angular.element(
            '<angular-dropdown dd-data="clubs" dd-label="name" dd-placeholder="Select football club"' +
            'dd-click="selectClick(item)" dd-model="selectedClub" >' +
            '</angular-dropdown>');

        $compile(element)(scope);
        scope.$digest();
    }));

    it('should display custom placeholder', () => {
        expect(element.isolateScope().ddPlaceholder).toEqual('Select football club');
    });

    it('should check labels in clubs', () => {
        const items = element.isolateScope().ddData;
        const firstItemLabel = items[0].label;
        const lastItemLabel = items[1].label;
        expect(firstItemLabel).toEqual('Arsenal');
        expect(lastItemLabel).toEqual('Liverpool');
    });
});
