function StickFigure(options) {
	this.head = {
		center: new Point(0, 0),
		radius: 25,
		drawFace: false,
		eyes: {
			left: {
				radius: 3
			},
			right: {
				radius: 3
			},
			hollow: false,
			distanceBetween: 18,
			offset: new Point(0, -10)
		},
		mouth: {
			shape: ")",
			width: 15,
			offset: new Point(0, 7)
		},
		neck: 8
	};
	this.torso = {
		length: 80,
		angle: -4
	};
	this.arms = {
		left: {
			elbow: new AngLen(-80, 35),
			hand: new AngLen(-10, 50),
		},
		right: {
			elbow: new AngLen(40, 40),
			hand: new AngLen(-120, 27),
		}
	};
	this.legs = {
		left: {
			knee: new AngLen(-15, 45),
			foot: new AngLen(-20, 50)
		},
		right: {
			knee: new AngLen(50, 45),
			foot: new AngLen(-40, 50)
		}
	};

	this.options = options;

	if(!this.options.lineWidth) this.options.lineWidth = 6;
	if(!this.options.color) this.options.color = "#222";

	this.draw = function(ctx) {
		ctx.fillStyle = ctx.strokeStyle = this.options.color;
		ctx.lineWidth = this.options.lineWidth;
		ctx.lineCap = "round";

		/*|    O    |*/ drawHead(ctx);
		/*|   /|\   |*/ drawBody(ctx);
		/*|    |	|*/
		/*|   /\    |*/
	};

	var drawHead = (function(ctx) {
		ctx.beginPath();
		ctx.arc(this.center.x, this.center.y, this.radius, Math.PI*2, false);
		ctx.stroke();

		if(this.drawFace) {
			ctx.beginPath();
			ctx.arc(this.center.x+this.eyes.offset.x-this.eyes.distanceBetween/2, this.center.y+this.eyes.offset.y, this.eyes.left.radius, Math.PI*2, false);
			if(this.eyes.hollow) {
				ctx.stroke();
			} else {
				ctx.fill();
			}

			ctx.beginPath();
			ctx.arc(this.center.x+this.eyes.offset.x+this.eyes.distanceBetween/2, this.center.y+this.eyes.offset.y, this.eyes.right.radius, Math.PI*2, false);
			if(this.eyes.hollow) {
				ctx.stroke();
			} else {
				ctx.fill();
			}

			if(this.mouth.shape === "D" || this.mouth.shape === "iD" || this.mouth.shape === "|") {
				ctx.save();
				ctx.beginPath();
				ctx.moveTo(this.center.x+this.mouth.offset.x-this.mouth.width/2,
					this.center.y+this.mouth.offset.y);
				ctx.lineTo(this.center.x+this.mouth.offset.x+this.mouth.width/2,
					this.center.y+this.mouth.offset.y);
					ctx.lineWidth -= 1;
				ctx.stroke();
				ctx.restore();
			}
			if(this.mouth.shape === "D" || this.mouth.shape === ")" || this.mouth.shape === "iD" || this.mouth.shape === "(") {
				var clockwise = (this.mouth.shape === "iD" || this.mouth.shape === "(");
				ctx.beginPath();
				ctx.arc(this.center.x+this.mouth.offset.x, this.center.y+this.mouth.offset.y,
					this.mouth.width/2, 0, Math.PI, clockwise);
				ctx.stroke();
			}
		}

	}).bind(this.head);

	var drawBody = (function(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.head.center.x, this.head.center.y+this.head.radius);
		var torsoc = ahToLegs(this.torso.angle, this.torso.length);
		ctx.lineTo(this.head.center.x+torsoc.x, this.head.center.y+this.head.radius+torsoc.y);
		ctx.stroke();

		(["left", "right"]).forEach((function(side) {

			ctx.beginPath();
			ctx.moveTo(this.head.center.x+torsoc.x, this.head.center.y+this.head.radius+torsoc.y);
			var legc = ahToLegs(this.legs[side].knee.angle, this.legs[side].knee.length);
			ctx.lineTo(this.head.center.x+torsoc.x+legc.x,
				this.head.center.y+this.head.radius+torsoc.y+legc.y);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(this.head.center.x+torsoc.x+legc.x,
				this.head.center.y+this.head.radius+torsoc.y+legc.y);
			var legc2 = ahToLegs(this.legs[side].knee.angle+this.legs[side].foot.angle, this.legs[side].foot.length);
			ctx.lineTo(this.head.center.x+torsoc.x+legc.x+legc2.x,
				this.head.center.y+this.head.radius+torsoc.y+legc.y+legc2.y);
			ctx.stroke();

			/* arms below */

			var neckc = ahToLegs(this.torso.angle, this.head.neck);

			ctx.beginPath();
			ctx.moveTo(this.head.center.x+neckc.x, this.head.center.y+this.head.radius+neckc.y);
			var armc = ahToLegs(this.arms[side].elbow.angle, this.arms[side].elbow.length);
			ctx.lineTo(this.head.center.x+neckc.x+armc.x,
				this.head.center.y+this.head.radius+neckc.y+armc.y);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(this.head.center.x+neckc.x+armc.x,
				this.head.center.y+this.head.radius+neckc.y+armc.y);
			var armc2 = ahToLegs(this.arms[side].elbow.angle+this.arms[side].hand.angle, this.arms[side].hand.length);
			ctx.lineTo(this.head.center.x+neckc.x+armc.x+armc2.x,
				this.head.center.y+this.head.radius+neckc.y+armc.y+armc2.y);
			ctx.stroke();


		}).bind(this));
	}).bind(this);

	var degToRad = function(degrees) {
		return degrees*Math.PI/180;
	};

	var ahToLegs = function(angle, hyp) {
		var angleRad = degToRad(angle);
		return {
			x: hyp*Math.sin(angleRad),
			y: hyp*Math.cos(angleRad)
		};
	};
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function AngLen(angle, length) {
	this.angle = angle;
	this.length = length;
}
