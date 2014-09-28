Scan existing installed bower components, and export it as the dependency list.

# Installation
```
npm install bower-existing-scanner
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