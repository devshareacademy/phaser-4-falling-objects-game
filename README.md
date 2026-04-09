# Phaser 4 - Falling Objects

![License](https://img.shields.io/badge/license-MIT-green)

A simple falling objects game created with Phaser 4!

**Phaser Version:** `4.0.0 RC4`

## Demo

You can find a playable demo of the game here: <a href="https://scottwestover.dev/games/phaser-4-falling-objects/index.html" target="_blank">Falling Objects</a>

![Game play Screenshot](/docs/screenshot1.png?raw=true 'Screenshot 1')
![Game play Demo](/docs/demo.gif?raw=true 'Demo')

## How To Play

Move the basket left and right with the Left and Right arrow keys, and try to catch as many falling candies as possible to get the high score.

## Requirements

- A modern web browser
- A local web server

## Running Locally

You need to run a local web server to see the game running. Here are a few options:

- **Python:** If you have Python 3 installed, you can use the built-in http.server. From the root of the project, run: `python3 -m http.server 8080`. This will start a local web server on port 8080. Visit `http://localhost:8080/` in your browser to see the game.
- **Node.js:** If you have Node.js installed, you can use the `http-server` npm package. From the root of the project, run: `npx http-server`. This will start a local web server on port 8080. Visit `http://localhost:8080/` to see the game.
- **VS Code Extension:** If you use VS Code, you can install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension to run a local web server.

## Writing Code

This template is set up for a modern JavaScript development workflow without any build tools. Simply start your local web server and begin editing the files in the `src` folder. Your changes will be reflected when you refresh your browser.

The main entry point for the application is `src/main.js`.

## Deploying Code

This template includes a bundle script to gather all the necessary files for deployment into a `dist` folder.

To create a distributable bundle, run the following command from the root of the project:

```sh
bash scripts/bundle.sh
```

This will create a `dist` folder containing your game. The contents of this folder can then be uploaded to any static web hosting service. The script will exclude the `src/types` directory from the final bundle.

## Customizing Code

### VS Code Settings

The `.vscode` folder contains recommended extensions and settings for this project. You can customize or remove these as you see fit.

### Static Assets

Any static assets like images or audio files should be placed in the `assets` folder. They can then be loaded into your game.

## Issues

If you encounter any issues, please open a new [GitHub Issue](https://github.com/devshareacademy/phaser-4-falling-objects-game/issues) on your project's repository.

## Questions, Comments, and Suggestions

If you have any questions, comments, or suggestions, please feel free to open a new [GitHub Discussion](https://github.com/devshareacademy/phaser-4-falling-objects-game/discussions) on your project's repository.

## Credits

This project would not have been possible without the art provided by the following people:

| Asset         | Artist             | Source                                                                                                                                                                         |
| ------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Background    | Sirirat Changhuana | <a href="https://www.vecteezy.com/vector-art/3228081-abstract-art-fabric-background-with-grunge-texture" target="_blank">Vecteezy - Background</a>                             |
| Blue Thread   | Timplaru Emil      | <a href="https://www.vecteezy.com/png/9380294-thread-spool-clipart-design-illustration" target="_blank">Vecteezy Blue Thread Spool</a>                                         |
| Red Thread    | Timplaru Emil      | <a href="https://www.vecteezy.com/png/9379855-thread-spool-clipart-design-illustration" target="_blank">Vecteezy Red Thread Spool</a>                                          |
| Yellow Thread | Timplaru Emil      | <a href="https://www.vecteezy.com/png/9304579-thread-spool-clipart-design-illustration" target="_blank">Vecteezy Yellow Thread Spool</a>                                       |
| Green Thread  | Timplaru Emil      | <a href="https://www.vecteezy.com/png/9302635-thread-spool-clipart-design-illustration" target="_blank">Vecteezy Green Thread Spool</a>                                        |
| Needles       | Timplaru Emil      | <a href="https://www.vecteezy.com/vector-art/2006420-sewing-needles-and-pins-vector-design-illustration-set-isolated-on-white-background" target="_blank">Vecteezy Needles</a> |
| Buttons       | Timplaru Emil      | <a href="https://www.vecteezy.com/vector-art/2006103-clothing-buttons-vector-design-illustration-set-isolated-on-white-background" target="_blank">Vecteezy Buttons</a>        |
| Jar           | Timplaru Emil      | <a href="https://www.vecteezy.com/png/9304861-empty-glass-jar-clipart-design-illustration" target="_blank">Jar</a>                                                             |
