const changeTitle = (data, label) =>
    data
        .map(x => x[label])
        .join(',');

angular
    .module('angularDropdown', [])
    .directive('angularDropdown', angularDropdown);

function angularDropdown() {
    const directive = {
        templateUrl: './angular-dropdown.html',
        replace: true,
        restrict: 'EA',
        scope: {
            ddModel: '=',
            ddData: '=',
            ddPlaceholder: '@',
            ddMultiple: '=',
            ddValue: '@',
            ddFilter: '=',
            ddLabel: '@'
        },
        link,
    };

    return directive;

    function link(scope, element) {
        scope.placeholder = scope.ddPlaceholder || 'Select ...';
        scope.multiple = scope.ddMultiple || false;
        scope.value = scope.ddValue || 'id';
        scope.label = scope.ddLabel || 'label';
        scope.isOpen = false;
        scope.title = '';
        scope.list = scope.ddData.map(item => {
            item.selected = false;
            return item;
        });

        scope.toggle = () => {
            scope.isOpen = !scope.isOpen;
        };

        const handler = event => {
            const wrapper = event.target.closest('.dropdown-wrapper');
            if (!wrapper || (wrapper !== element[0])) {
                scope.$apply(() => {
                    scope.isOpen = false;
                });
            }
        };

        document.addEventListener('click', handler);
        scope.$on('$destroy', () => {
            document.removeEventListener('click', handler);
        });

        const cleanup = scope.$watch(
            () => scope.ddModel,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    scope.title = changeTitle(scope.ddModel, scope.label);
                }
            });

        scope.$on('$destroy', cleanup);

        scope.addItem = item => {
            scope.list
                .filter(e => e[scope.value] === item[scope.value])
                .filter(e => e.selected = true);
        };

        scope.removeItem = item => {
            const index = scope.list.findIndex(x => x[scope.value] === item[scope.value]);
            scope.list[index].selected = false;
        };

        scope.selectItem = item => {
            scope.list
                .filter(x => x[scope.value] === item[scope.value])
                .filter(x => x.selected === false ? scope.addItem(item) : scope.removeItem(item));
            scope.ddModel = scope.list.filter(x => x.selected);
            changeTitle(scope.ddModel, scope.label);
            if (scope.ddFilter) {
                scope.ddFilter(scope.ddModel);
            }
        };

        scope.selectAll = () => {
            scope.list.map(item => {
                item.selected = true;
                return item;
            });
            scope.ddModel = scope.list.filter(x => x.selected);
            changeTitle(scope.ddModel, scope.label);
            if (scope.ddFilter) {
                scope.ddFilter(scope.ddModel);
            }
        };

        scope.deselectAll = () => {
            scope.ddModel = [];
            scope.list.map(item => {
                item.selected = false;
                return item;
            });
            changeTitle(scope.ddModel, scope.label);
            if (scope.ddFilter) {
                scope.ddFilter(scope.ddModel);
            }
        }
    }
}
