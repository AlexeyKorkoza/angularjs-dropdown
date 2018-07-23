const template = `
    <div class="dropdown-wrapper" ng-class="{'-is-open': isOpen}">
    <div class="dropdown-button" ng-click="toggle()">
        <span ng-if="ddModel.length">{{title}}</span>
        <span ng-if="!ddModel.length">{{placeholder}}</span>
    </div>
    <ul class="dropdown-list">
        <li class="dropdown-list__item" ng-if="multiple">
            <a class="dropdown-list__link" ng-click="selectAll()">Select All</a>
        </li>
        <li class="dropdown-list__item" ng-if="multiple">
            <a class="dropdown-list__link" ng-click="deselectAll()">Deselect All</a>
        </li>
        <li class="dropdown-list__item" ng-repeat="item in list">
            <a class="dropdown-list__link" ng-class="{'-is-active': item.selected}" ng-click="selectItem(item)">{{item[label]}}</a>
        </li>
    </ul>
</div>
`;

const changeTitle = (data, label) =>
    data
        .map(x => x[label])
        .join(', ');

angular
    .module('angularDropdown', [])
    .directive('angularDropdown', angularDropdown);

function angularDropdown() {
    const directive = {
        template,
        replace: true,
        restrict: 'EA',
        scope: {
            ddModel: '=',
            ddData: '=',
            ddPlaceholder: '@',
            ddMultiple: '=',
            ddValue: '@',
            ddClick: '&',
            ddSelectAll: '&',
            ddDeselectAll: '&',
            ddLabel: '@'
        },
        link,
    };

    return directive;

    function link(scope, element) {
        // console.log('SCOPE', scope);
        scope.placeholder = scope.ddPlaceholder || 'Select ...';
        // console.log('placeholder', scope.placeholder)
        scope.multiple = scope.ddMultiple || false;
        scope.value = scope.ddValue || 'id';
        scope.label = scope.ddLabel || 'label';
        scope.title = '';

        if(scope.ddModel && scope.ddModel.length) {
            scope.title = changeTitle(scope.ddModel, scope.label);
        }

        scope.isOpen = false;

        scope.list = scope.ddData.map(item => {
            const result = scope.ddModel.find(x => x[scope.value] === item[scope.value]);
            item.selected = !!result;
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
            if (!scope.multiple) {
                scope.list
                    .map(x => {
                        if (x[scope.value] !== item[scope.value]) {
                            x.selected = false;
                            return x;
                        }
                        return x;
                    });
            }
            scope.ddModel = scope.list
                .filter(x => x.selected);
            scope.title = changeTitle(scope.ddModel, scope.label);
            scope.ddClick({ item: scope.ddModel });
        };

        scope.selectAll = () => {
            if (scope.multiple) {
                scope.list.map(item => {
                    item.selected = true;
                    return item;
                });
                scope.ddModel = scope.list
                    .filter(x => x.selected);
                scope.title = changeTitle(scope.ddModel, scope.label);
                scope.ddSelectAll({ item: scope.ddModel });
            }
        };

        scope.deselectAll = () => {
            if (scope.multiple) {
                scope.ddModel = [];
                scope.list.map(item => {
                    item.selected = false;
                    return item;
                });
                scope.title = changeTitle(scope.ddModel, scope.label);
                scope.ddDeselectAll({ item: scope.ddModel });
            }
        }
    }
}
