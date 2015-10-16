# StickFigure.js
A JavaScript library for creating stick figures and drawing them on &lt;canvas>

To use this library, add it to your HTML:
```html
<script src="https://raw.githubusercontent.com/TwoTau/StickFigure.js/master/StickFigure.js"></script>
```

First, you need to get your canvas' context.
```javascript
var canvas = document.getElementsById("canvas");
var ctx = canvas.getContext("2d"); // the canvas context
```

Create a stick figure:
```javascript
var options = {}; // You can have several options here
var stick = new StickFigure(options);
```

Draw the stick figure:
```javascript
stick.draw(ctx);
```

You can change the the length and angle of the stick figure's limbs.
For example:
```javascript
stick.arms.left.elbow.angle = -50;
stick.arms.left.hand.angle = 90;

stick.arms.right.elbow.angle = -5;
stick.arms.right.hand.angle = 90;

stick.legs.right.knee.angle = 30;
stick.legs.right.foot.angle = -65;

stick.head.center.y = 400;
```
