# Electron Web App

This is a Electron app used to browse any website in a desktop app

## Installation

Use the npm package manager to install.

```bash
npm install
```

## Usage

```
npm run start
```

## Packaging the app

```
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

## Creating a distributable

```
npm run make
```

## Important

If you are publishing, make sure to code sign your app. [Read more](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging#important-signing-your-code)
Since this is a personal project, this step is skipped

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)