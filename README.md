Scan the existed installed bower components, and export it as the dependency list.

# Installation
```
npm install bower-existed-scanner
```

# Usage
```
node . option1 [option2]
```
- **option1**: Location of bower components
- **option2**: Export location, default: `./_bower.json`

# Example
```
node . /works/js/components
```

# What the output looks like?
It looks like:
```
{
  "dependencies": {
    "AngularJS-Toaster": "0.4.7",
    "angular-cookies": "1.2.21",
    "angular-bindonce": "0.3.1",
    "angular-sanitize": "1.2.21",
    "angular": "1.2.21",
    "angular-animate": "1.2.21",
    "angular-mocks": "1.2.21",
    "angular-route": "1.2.21",
    "angular-ui-router": "0.2.10",
    "bootstrap": "3.2.0",
    "angular-toastr": "0.3.0",
    "ionic": "1.0.0-beta.9",
    "angularLocalStorage": "0.1.7",
    "ngToast": "1.0.0",
    "jquery": "2.1.1",
    "underscore": "1.6.0"
  }
}
```
And you can just simply copy and combine the dependency by yourself.