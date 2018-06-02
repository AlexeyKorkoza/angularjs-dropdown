# angular-dropdown

A simple directive for using in your angular applications

## Install

```
npm install angular-dropdown
```

## Usage

1. Include ```angular-dropdown.css``` and ```angular-dropdown.js``` in your project from ```src``` folder

2. Import ```angularDropdown``` as a dependecy in your project

```
    angular
        .module('nameOfModule', ['angularDropdown'])
```

3. Add the directive to your html
```
<angular-dropdown
  ....
></angular-dropdown>
```

## Attributes

These attributes are available to set on the ```angular-dropdown``` directive.

##### dd-model
Chosen items in the dropdown.<br>
Type: `array of objects`<br>

##### dd-data

An array of strings or object to show in the dropdown.<br>
Type: `array of objects`<br>

##### dd-placeholder

Text that will show if items of the dropdown aren't chosen.<br>
Type: `string`<br>
Default: `Select ...`

##### dd-multiple

Allow or disallow to choose several items in the dropdown.<br>
Type: `boolean`<br>
Default: `false`

##### dd-value

Property with unique value in array of objects.<br>
Type: `string`<br>
Default: `id`

##### dd-label

Value of property that will show in the dropdown.<br>
Type: `string`<br>
Default: `label`

##### dd-click

Handler of click on item of the dropdown.<br>
Type: `function`<br>

##### dd-select-all

Handler of click on items of the dropdown.<br>
Type: `function`<br>

##### dd-deselect-all

Handler of click on items of the dropdown.<br>
Type: `function`<br>

## Demo

Demos are in ```demo``` folder. 

Open any demo file in browser and begin to use.

## License

MIT
