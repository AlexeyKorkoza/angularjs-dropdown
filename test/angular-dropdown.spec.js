describe('Test angularjs-dropdown', () => {
    let elm, scope;

    beforeEach(module('angularDropdown'));

    beforeEach(inject(($rootScope, $compile) => {
        elm = angular.element(
            '<div>' +
            '<angular-dropdown dd-data="clubs" dd-label="name" dd-placeholder="Select football club"' +
            'dd-click="selectClick(item)" dd-model="selectedClub" >' +
            '</angular-dropdown>' +
            '</div>');

        scope = $rootScope.$new();

        scope.customMessage = '<div class="custom-message">foo</div>';
        scope.clubs = [
            { id: 1, label: 'Arsenal' },
            { id: 2, label: 'Liverpool' }
        ];
        $compile(elm)(scope);
        scope.$digest();
    }));

    it('should create items', () => {
        const items = elm.find('.dropdown-list__link');
        expect(items.length).toBe(2);

        // could be defined into a test for itself
        // avoid multiple asserts - this is only for demonstration
        expect(items.eq(0).text()).toContain('Arsenal');
        expect(items.eq(1).text()).toContain('Liverpool');
    });
});
