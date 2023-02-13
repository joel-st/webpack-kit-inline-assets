# Webpack Kit – Inline Assets – Babel, Preact JSX, SCSS

Webpack setup which outputs an `index.html` in the root dir with all assets inlined.

### Usage
- Download the repository and run `npm install`
- `npm run prod` to run a production build
- `npm run dev` to run webpack watch development


### Source Files

###### src/App.jsx
Script entry point

###### src/style.scss
Style entry point which gets importet in `src/App.jsx`.

###### src/index.html
HTML template file. Use the comments `<!-- Buildstyle -->` and `<!-- Buildscript -->` to place your assets.

### Build Files
Webkit outputs an `index.html`, `main.js` and `main.css` file.
After compilation of the build files, the content from `main.js` and `main.css` get inserted into `index.html`, where `<!-- Buildstyle -->` and `<!-- Buildscript -->` is placed.
