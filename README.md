# VBRotations

VBRotations is an interactive SVG for teaching Volleyball positional play, built using [Snap](http://snapsvg.io).

It's primary use is as an aid for teaching a typical 5-1 rotation system, but you could extend it for any positional demonstrations you wish.

You can see VBRotations in action in [here](https://monkeysppp.github.io/VBRotations)

## Using it yourself

You can take a copy of the source and embed it into your own site:

1. Copy the Javascript files from the src directory and pull into your page using `<script>` tags.
2. Create a new `monkeysppp.vbRotations` Object
3. Call `createSVG()` to create an SVG object that you can attach to an element in your html
4. Call `draw()` to draw the SVG.

For example:

```html
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Volleyball Rotations</title>
    <script src="src/js/snap.svg-min.js"></script>
    <script src="src/js/vbRotations.js"></script>
    <script type="text/javascript">
      function clean(elem) {
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild)
        }
      }

      window.onload = function () {
        const courtDiv = document.getElementById('court');
        const rotations = new monkeysppp.vbRotations()
        clean(courtDiv)
        courtDiv.appendChild(rotations.createSVG())
        rotations.draw()
      }
    </script>
  </head>
  <body>
    <div id="court"></div>
  </body>
</html>
```

## Configuring

You can configure the SVG by passing a config object to the `monkeysppp.vbRotations()` constructor.  The config object has the following values, with each individual field being optional:

```
{
  svg: {
    width: 900 // A number setting the width in pixels.
               // The height will always be 8/9ths the width.
  },
  language: en // A string with one of the values en|de|es|fr|it|nl|pl
               // Defaults to en
}
```

[Demo](/Rotations.html)

## TODO

- Languages
- Instructions
- Player positions overrides from options
- Libero back court
- Add a toggle or hover that visualizes the rotation requirements - i.e. what a player has to worry about and which players they have to take notice of to stay in a valid rotation.
- Attack/Cover and defence plays

## Thanks

Thanks to the following for their help with the translations:

- [Maurizio Napolitano](https://github.com/napo) (Italian)

## License

This project is released under the [Apache 2.0 license](./LICENSE.md).
