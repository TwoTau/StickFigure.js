# StickFigure.js
A JavaScript library for creating stick figures and drawing them on &lt;canvas&gt;

To use this library, download it to your scripts folder and add a link to it in your HTML:
```html
<script src="scripts/StickFigure.js"></script>
```

First, you need to get your canvas' context.
```javascript
var canvas = document.getElementById("demo");
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

![StickFigure.js example](http://twotau.github.io/img/stickfigurejsexample.png)

[View a demo here!](http://twotau.github.io/demo/stickfigure.html)

[View the demo source](https://github.com/TwoTau/twotau.github.io/blob/master/demo/stickDemo.js)
