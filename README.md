# static testing tools

original repo https://github.com/kentcdodds/static-testing-tools made by Kent C. Dodds, author of
[react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

## agenda

## step 00

- eslint, prettier plugins should be disabled

### step 01

- yarn add -D eslint
- npx eslint .
- fix error by adding the config to .eslintrc

```json
{
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

- no errors popped anymore, but we don't get rules violations, so we need to configure the rules

```json
{
  "rules": {
    "valid-typeof": "error | warn"
  }
}
```

- later

```json
{
  "rules": {
    "strict": ["error | warn | off", "never"]
    "no-unsafe-negation": "error",
    "no-unused-vars": "error",
    "no-unexpected-multiline": "error",
    "no-undef": "error"
  }
}
```

- fix `'console' is not defined`

```json
{
  "env": {
    "browser": true
  }
}
```

### step 02

- install and enable eslint plugin to VS code
- fixing errors with `cmd + .`
- not to run `npx eslint . --fix`
- disabling rules for particular line

### step 03

- use prebuild eslint configuration, order in array matters

```json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "strict": ["error", "never"]
  }
}
```

- run `npx eslint . --fix`

### step 04

- add script to lint

```json
{
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint ."
  }
}
```

- it lint good, but after the 'yarn build' it gives the errors
- add `.eslintignore`, show that works
- remove that file and use the flag

```json
{
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore ."
  }
}
```

### step 05

- install prettier `yarn add -D prettier`
- add script format

```json
{
  "format": "prettier --write \"**/*.+(js|json)\""
}
```

- show that we do not need to format dist dir

```json
{
  "format": "prettier --write --ignore-path .gitignore \"**/*.+(js|json)\""
}
```

### step 07

- enable prettier ext
- add settings

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

- `cmd + shift + p` -> format

### step 08

- sometime eslint and prettier has conflict config, to make it nice goint together we install pakage
- `yarn add -D eslint-config-prettier`
- open .eslinrs and update 'extend` array

```json
{
  "extends": ["eslint:recommended", "eslint-config-prettier"]
}
```

### step 09

- add check-format, why we need it
- add validate script and run it

```json
{
  "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
  "format": "yarn run prettier --write",
  "check-format": "yarn run prettier --list-different",
  "validate": "yarn check-format && yarn lint && yarn build"
}
```

### step 10

- start using typescript
- switch to branch 10
- show file ts-example.js and its ts version
- show that VS code has built in TS support
- `yarn add -D typescript`
- try to run `npx tsc`
- populate tsconfig

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "noEmit": true
  }
}
```

- add script `check-types` to validate
- update prettier to run accross the TS files "prettier": "prettier --ignore-path .gitignore
  \"\*_/_.+(js|json|ts|tsx)\"",
- update build script "build": "babel src --extensions .js,.ts,.tsx --out-dir dist",
- we got BABEL_PARSER_ERROR
- `yarn add -D @babel/preset-typescript`
- add @babel/preset-typescript to babelrc presets section

### step 11

- make eslint linting ts files
- `yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser`
- update lint script `"lint": "eslint --ignore-path .gitignore --ext .js,.ts,.tsx ."`
- run `yern lint` and get `1:15 error Parsing error: Unexpected token :`
- update .eslintrc

```json
{
  "overrides": [
    {
      "files": "**/*.+(ts|tsx)",
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      },
      "plugins": ["@typescript-eslint/eslint-plugin"],
      "extends": [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ]
    }
  ]
}
```

### step 12

- install husky https://typicode.github.io/husky/#/?id=automatic-recommended
- try to commit and show how husky triggers pre-commit hook
- change something and demonstrate husky does not allow to commit changes
- `--no-verify`

### step 13 lint staged

- `yarn add -D lint-staged`
- create file `.lintstagegrc`

```json
{
  "*.+(js|ts|tsx)": ["eslint --cache --fix"],
  "*.+(js|json|ts|tsx)": ["prettier --write", "git add"]
}
```

- change pre-commit hook `yarn check-types && npx lint-staged && yarn build`

### step 14

- `yarn add -D npm-run-alll`
- update validate script `"validate": "npm-run-all --parallel check-types check-format lint build",`
