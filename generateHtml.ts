const template = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>No JS Tracker</title>
  </head>
  <body>
    <div id="app">
        <!--REPLACE-->
    </div>
    <style>
    * {
    margin: 0;
    padding: 0;
  }
  #app {
    display: grid;
    grid-template-columns: repeat(SIZE, 1fr);
    grid-template-rows: repeat(SIZE, 1fr);
    height: 100vh;
  }
  .tile {
    width: 100%;
    height: 100%;
}
.tile:hover {
    background-image: var(--image);
    background-color: green;
  }
    </style>
  </body>
</html>
`;

const size = 30;

const replace = new Array(size * size)
  .fill("")
  .map((_, i) => `<div class="tile" style="--image: url(./images/${i})"></div>`)
  .join("\n");

const html = template.replace("<!--REPLACE-->", replace).replaceAll("SIZE", size.toString());

Bun.write("index.html", html);
