---
layout: default
title: Home
nav_order: 1
description: "VBRotations is a teaching aid for a standard 5-1 rotation system in Volleyball."
permalink: /
---

# VBRotations

VBRotations is a teaching aid for a standard 5-1 rotation system in Volleyball.

# Demo

[Demo](/Rotations.html)

# Using

## Embedding

To use VBRotations:

1. Take a copy of the src directory
2. include the two js files in your page
3. Create a new `monkeysppp.vbRotations` object
4. Call `createSVG()` to create an SVG object that you can attach to an element in your html
5. Call `draw()` to draw the SVG.

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
    width: 'A number setting the width in pixels.  The height will always be 8/9ths the width'
  },
  language: 'A string with one of the values en(default)|de|es|fr|it|nl|pl'
}
```
