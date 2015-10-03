
var monkeysppp = monkeysppp || {
  vb_rotations: {}
}

monkeysppp.vb_rotations.SVGMaker = function() {
  var that = this;

  this.NS = "http://www.w3.org/2000/svg";
  this.sroot;
  this.width;
  this.height;

  this.backgroundColour      = "#85d6ff";
  this.courtColour           = "#ffb591";
  this.lineColour            = "white";
  this.playerColour          = "#efa581";
  this.playerColourHighlight = "#66dd66";
  this.rotationControlColour = "white";
  this.rotationControlHighlightColour = "#dddddd";
  this.rotationControlBackgroundColourA = "#65b6df";
  this.rotationControlBackgroundColourB = "#4596bf";
  this.rotationControlCirleRadius = 12;
  
  // Player objects
  this.setter;
  this.oppo;
  this.m1;
  this.m2;
  this.h1;
  this.h2;

  this.rotationControls;
  this.highlightedPlayer = 0;

  // Action locks;
  this.moving;
  this.serveRotation;

  this.setterAt = 2;

  this.controlTwoRcv;
  this.controlTwoSrv;
  this.controlThreeRcv;
  this.controlThreeSrv;
  this.controlFourRcv;
  this.controlFourSrv;
  this.controlFiveRcv;
  this.controlFiveSrv;
  this.controlSixRcv;
  this.controlSixSrv;
  this.controlOneRcv;
  this.controlOneSrv;

  this.controlServeBase;
  this.controlServeServe;
  this.controlServeSwitch;
  this.controlReceiveBase;
  this.controlReceiveReceive;
  this.controlReceiveSet;
  this.controlReceiveHit;
  this.controlReceiveSwitch;


  this.playerOffsetsBase = {
      '1' : {
        's'  : { 'x' : 350, 'y' : 300 },
        'h1' : { 'x' : 350, 'y' : 50 },
        'm1' : { 'x' : 225, 'y' : 50 },
        'o'  : { 'x' : 100, 'y' : 50 },
        'h2' : { 'x' : 100, 'y' : 300 },
        'm2' : { 'x' : 225, 'y' : 350 }
      },
      '2' : {
        'm2' : { 'x' : 350, 'y' : 300 },
        's'  : { 'x' : 350, 'y' : 50 },
        'h1' : { 'x' : 225, 'y' : 50 },
        'm1' : { 'x' : 100, 'y' : 50 },
        'o'  : { 'x' : 100, 'y' : 300 },
        'h2' : { 'x' : 225, 'y' : 350 }
      },
      '3' : {
        'h2' : { 'x' : 350, 'y' : 300 },
        'm2' : { 'x' : 350, 'y' : 50 },
        's'  : { 'x' : 225, 'y' : 50 },
        'h1' : { 'x' : 100, 'y' : 50 },
        'm1' : { 'x' : 100, 'y' : 300 },
        'o'  : { 'x' : 225, 'y' : 350 }
      },
      '4' : {
        'o'  : { 'x' : 350, 'y' : 300 },
        'h2' : { 'x' : 350, 'y' : 50 },
        'm2' : { 'x' : 225, 'y' : 50 },
        's'  : { 'x' : 100, 'y' : 50 },
        'h1' : { 'x' : 100, 'y' : 300 },
        'm1' : { 'x' : 225, 'y' : 350 }
      },
      '5' : {
        'm1' : { 'x' : 350, 'y' : 300 },
        'o'  : { 'x' : 350, 'y' : 50 },
        'h2' : { 'x' : 225, 'y' : 50 },
        'm2' : { 'x' : 100, 'y' : 50 },
        's'  : { 'x' : 100, 'y' : 300 },
        'h1' : { 'x' : 225, 'y' : 350 }
      },
      '6' : {
        'h1' : { 'x' : 350, 'y' : 300 },
        'm1' : { 'x' : 350, 'y' : 50 },
        'o'  : { 'x' : 225, 'y' : 50 },
        'h2' : { 'x' : 100, 'y' : 50 },
        'm2' : { 'x' : 100, 'y' : 300 },
        's'  : { 'x' : 225, 'y' : 350 }
      }
  };

  this.playerOffsetsServeServe = {
      '1' : {
        's'  : { 'x' : 350, 'y' : 475 },
        'h1' : { 'x' : 290, 'y' : 50 },
        'm1' : { 'x' : 225, 'y' : 50 },
        'o'  : { 'x' : 160, 'y' : 50 },
        'h2' : { 'x' : 100, 'y' : 300 },
        'm2' : { 'x' : 225, 'y' : 350 }
      },
      '2' : {
        'm2' : { 'x' : 350, 'y' : 475 },
        's'  : { 'x' : 290, 'y' : 50 },
        'h1' : { 'x' : 225, 'y' : 50 },
        'm1' : { 'x' : 160, 'y' : 50 },
        'o'  : { 'x' : 100, 'y' : 300 },
        'h2' : { 'x' : 225, 'y' : 350 }
      },
      '3' : {
        'h2' : { 'x' : 350, 'y' : 475 },
        'm2' : { 'x' : 290, 'y' : 50 },
        's'  : { 'x' : 225, 'y' : 50 },
        'h1' : { 'x' : 160, 'y' : 50 },
        'm1' : { 'x' : 100, 'y' : 300 },
        'o'  : { 'x' : 225, 'y' : 350 }
      },
      '4' : {
        'o'  : { 'x' : 350, 'y' : 475 },
        'h2' : { 'x' : 290, 'y' : 50 },
        'm2' : { 'x' : 225, 'y' : 50 },
        's'  : { 'x' : 160, 'y' : 50 },
        'h1' : { 'x' : 100, 'y' : 300 },
        'm1' : { 'x' : 225, 'y' : 350 }
      },
      '5' : {
        'm1' : { 'x' : 350, 'y' : 475 },
        'o'  : { 'x' : 290, 'y' : 50 },
        'h2' : { 'x' : 225, 'y' : 50 },
        'm2' : { 'x' : 160, 'y' : 50 },
        's'  : { 'x' : 100, 'y' : 300 },
        'h1' : { 'x' : 225, 'y' : 350 }
      },
      '6' : {
        'h1' : { 'x' : 350, 'y' : 475 },
        'm1' : { 'x' : 290, 'y' : 50 },
        'o'  : { 'x' : 225, 'y' : 50 },
        'h2' : { 'x' : 160, 'y' : 50 },
        'm2' : { 'x' : 100, 'y' : 300 },
        's'  : { 'x' : 225, 'y' : 350 }
      }
  };

  this.playerOffsetsSwitch = {
      '1' : {
        's'  : { 'x' : 350, 'y' : 300 },
        'h1' : { 'x' : 100, 'y' : 50 },
        'm1' : { 'x' : 225, 'y' : 50 },
        'o'  : { 'x' : 350, 'y' : 50 },
        'h2' : { 'x' : 225, 'y' : 350 },
        'm2' : { 'x' : 100, 'y' : 300 }
      },
      '2' : {
        'm2' : { 'x' : 100, 'y' : 300 },
        's'  : { 'x' : 350, 'y' : 50 },
        'h1' : { 'x' : 100, 'y' : 50 },
        'm1' : { 'x' : 225, 'y' : 50 },
        'o'  : { 'x' : 350, 'y' : 300 },
        'h2' : { 'x' : 225, 'y' : 350 }
      },
      '3' : {
        'h2' : { 'x' : 225, 'y' : 350 },
        'm2' : { 'x' : 225, 'y' : 50 },
        's'  : { 'x' : 350, 'y' : 50 },
        'h1' : { 'x' : 100, 'y' : 50 },
        'm1' : { 'x' : 100, 'y' : 300 },
        'o'  : { 'x' : 350, 'y' : 300 }
      },
      '4' : {
        'o'  : { 'x' : 350, 'y' : 300 },
        'h2' : { 'x' : 100, 'y' : 50 },
        'm2' : { 'x' : 225, 'y' : 50 },
        's'  : { 'x' : 350, 'y' : 50 },
        'h1' : { 'x' : 225, 'y' : 350 },
        'm1' : { 'x' : 100, 'y' : 300 }
      },
      '5' : {
        'm1' : { 'x' : 100, 'y' : 300 },
        'o'  : { 'x' : 350, 'y' : 50 },
        'h2' : { 'x' : 100, 'y' : 50 },
        'm2' : { 'x' : 225, 'y' : 50 },
        's'  : { 'x' : 350, 'y' : 300 },
        'h1' : { 'x' : 225, 'y' : 350 }
      },
      '6' : {
        'h1' : { 'x' : 225, 'y' : 350 },
        'm1' : { 'x' : 225, 'y' : 50 },
        'o'  : { 'x' : 350, 'y' : 50 },
        'h2' : { 'x' : 100, 'y' : 50 },
        'm2' : { 'x' : 100, 'y' : 300 },
        's'  : { 'x' : 350, 'y' : 300 }
      }
  };

  this.playerOffsetsReceiveReceive = {
      '1' : {
        's'  : { 'x' : 400, 'y' : 85 },
        'h1' : { 'x' : 420, 'y' : 30 },
        'm1' : { 'x' : 380, 'y' : 140 },
        'o'  : { 'x' : 100, 'y' : 300 },
        'h2' : { 'x' : 225, 'y' : 350 },
        'm2' : { 'x' : 350, 'y' : 300 }
      },
      '2' : {
        'm2' : { 'x' : 350, 'y' : 300 },
        's'  : { 'x' : 350, 'y' : 50 },
        'h1' : { 'x' : 100, 'y' : 300 },
        'm1' : { 'x' : 20, 'y' : 80 },
        'o'  : { 'x' : 130, 'y' : 420 },
        'h2' : { 'x' : 225, 'y' : 350 }
      },
      '3' : {
        'h2' : { 'x' : 350, 'y' : 300 },
        'm2' : { 'x' : 370, 'y' : 70 },
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 100, 'y' : 300 },
        'm1' : { 'x' : 225, 'y' : 350 },
        'o'  : { 'x' : 280, 'y' : 410 }
      },
      '4' : {
        'o'  : { 'x' : 380, 'y' : 410 },
        'h2' : { 'x' : 100, 'y' : 300 },
        'm2' : { 'x' : 70, 'y' : 70 },
        's'  : { 'x' : 30, 'y' : 30 },
        'h1' : { 'x' : 225, 'y' : 350 },
        'm1' : { 'x' : 350, 'y' : 300 }
      },
      '5' : {
        'm1' : { 'x' : 350, 'y' : 300 },
        'o'  : { 'x' : 420, 'y' : 50 },
        'h2' : { 'x' : 100, 'y' : 300 },
        'm2' : { 'x' : 30, 'y' : 30 },
        's'  : { 'x' : 120, 'y' : 70 },
        'h1' : { 'x' : 225, 'y' : 350 }
      },
      '6' : {
        'h1' : { 'x' : 350, 'y' : 300 },
        'm1' : { 'x' : 350, 'y' : 70 },
        'o'  : { 'x' : 280, 'y' : 30 },
        'h2' : { 'x' : 100, 'y' : 300 },
        'm2' : { 'x' : 225, 'y' : 350 },
        's'  : { 'x' : 255, 'y' : 85 }
      }
  };

  this.playerOffsetsReceiveSet = {
      '1' : {
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 450, 'y' : 150 },
        'm1' : { 'x' : 225, 'y' : 150 },
        'o'  : { 'x' : 0,   'y' : 150 },
        'h2' : { 'x' : 225, 'y' : 350 },
        'm2' : { 'x' : 350, 'y' : 300 }
      },
      '2' : {
        'm2' : { 'x' : 350, 'y' : 300 },
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 0,   'y' : 150 },
        'm1' : { 'x' : 225, 'y' : 150 },
        'o'  : { 'x' : 100, 'y' : 300 },
        'h2' : { 'x' : 225, 'y' : 350 }
      },
      '3' : {
        'h2' : { 'x' : 350, 'y' : 300 },
        'm2' : { 'x' : 225, 'y' : 150 },
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 0,   'y' : 150 },
        'm1' : { 'x' : 225, 'y' : 350 },
        'o'  : { 'x' : 280, 'y' : 410 }
      },
      '4' : {
        'o'  : { 'x' : 380, 'y' : 410 },
        'h2' : { 'x' : 0,   'y' : 150 },
        'm2' : { 'x' : 225, 'y' : 150 },
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 225, 'y' : 350 },
        'm1' : { 'x' : 350, 'y' : 300 }
      },
      '5' : {
        'm1' : { 'x' : 350, 'y' : 300 },
        'o'  : { 'x' : 450, 'y' : 150 },
        'h2' : { 'x' : 0,   'y' : 150 },
        'm2' : { 'x' : 225, 'y' : 150 },
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 225, 'y' : 350 }
      },
      '6' : {
        'h1' : { 'x' : 350, 'y' : 300 },
        'm1' : { 'x' : 225, 'y' : 150 },
        'o'  : { 'x' : 450, 'y' : 150 },
        'h2' : { 'x' : 0,   'y' : 150 },
        'm2' : { 'x' : 225, 'y' : 350 },
        's'  : { 'x' : 300, 'y' : 50 }
      }
  };
  
  this.playerOffsetsReceiveHit = {
      '1' : {
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 400, 'y' : 50 },
        'm1' : { 'x' : 225, 'y' : 50 },
        'o'  : { 'x' : 50, 'y' : 50 },
        'h2' : { 'x' : 225, 'y' : 350 },
        'm2' : { 'x' : 350, 'y' : 300 }
      },
      '2' : {
        'm2' : { 'x' : 350, 'y' : 300 },
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 50,  'y' : 50 },
        'm1' : { 'x' : 225, 'y' : 50 },
        'o'  : { 'x' : 100, 'y' : 300 },
        'h2' : { 'x' : 225, 'y' : 350 }
      },
      '3' : {
        'h2' : { 'x' : 350, 'y' : 300 },
        'm2' : { 'x' : 225,  'y' : 50 },
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 50, 'y' : 50 },
        'm1' : { 'x' : 225, 'y' : 350 },
        'o'  : { 'x' : 280, 'y' : 410 }
      },
      '4' : {
        'o'  : { 'x' : 380, 'y' : 410 },
        'h2' : { 'x' : 50, 'y' : 50 },
        'm2' : { 'x' : 225, 'y' : 50 },
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 225, 'y' : 350 },
        'm1' : { 'x' : 350, 'y' : 300 }
      },
      '5' : {
        'm1' : { 'x' : 350, 'y' : 300 },
        'o'  : { 'x' : 400, 'y' : 50 },
        'h2' : { 'x' : 50,  'y' : 50 },
        'm2' : { 'x' : 225, 'y' : 50 },
        's'  : { 'x' : 300, 'y' : 50 },
        'h1' : { 'x' : 225, 'y' : 350 }
      },
      '6' : {
        'h1' : { 'x' : 350, 'y' : 300 },
        'm1' : { 'x' : 225, 'y' : 50 },
        'o'  : { 'x' : 400, 'y' : 50 },
        'h2' : { 'x' : 50,  'y' : 50 },
        'm2' : { 'x' : 225, 'y' : 350 },
        's'  : { 'x' : 300, 'y' : 50 }
      }
  };
  
  // Default methods
  var reportError = function(msg) {
    // do nothing with the error message;
  }

  // Private methods
  function errorHandler(handler) {
    that.reportError = handler;
  }

  function getWidth(options) {
    return 900;
  }

  function getHeight(options) {
    return 800;
  }

  function drawCourt() {
    // Draw Court Base
    // Background
    var background = that.sroot.rect(0, 0, getWidth(), getHeight());
    background.attr({
      fill: that.backgroundColour
    });
    // Court lines
    var outerLines = that.sroot.rect(75, 50, 450, 425);
    outerLines.attr({
      fill: that.courtColour,
      stroke: that.lineColour,
      strokeWidth: 4
    });
    // Centre line
    var centreLine = that.sroot.line(60,50,540,50);
    centreLine.attr({
      stroke: that.lineColour,
      strokeWidth: 4
    });
    // Attack line and sub lines
    var attackLine = that.sroot.line(75,200,525,200);
    attackLine.attr({
      stroke: that.lineColour,
      strokeWidth: 4
    });
    var leftTicks = that.sroot.line(10,200,75,200);
    leftTicks.attr({
      stroke: that.lineColour,
      strokeWidth: 4,
      "stroke-dasharray": "9,9"
    });  
    var rightTicks = that.sroot.line(525,200,590,200);
    rightTicks.attr({
      stroke: that.lineColour,
      strokeWidth: 4,
      "stroke-dasharray": "9,9"
    });
  }

  function drawPlayers() {
    // Player markers
    var setterCircle = that.sroot.circle(75,50,27);
    setterCircle.attr({
      stroke: "#eeeeee",
      strokeWidth: 4,
      fill: that.playerColour
    });
    var setterLabel = that.sroot.text(75,50,"S");
    setterLabel.attr({
      fill: "none",
      stroke: "#eeeeee",
      strokeWidth :"4",
      "text-anchor":"middle",
      "dominant-baseline":"central",
      "font-family": "Verdana",
      "font-size":"30"
    });
    that.setter = that.sroot.group(setterCircle, setterLabel);
//    that.setter = setterCircle;
    that.setter.attr({cursor: "pointer"});

    var m1Circle = that.sroot.circle(75,50,27);
    m1Circle.attr({
      stroke: "#eeeeee",
      strokeWidth: 4,
      fill: that.playerColour
    });
    var m1Label = that.sroot.text(75,50,"M1");
    m1Label.attr({
      fill: "none",
      stroke: "#eeeeee",
      strokeWidth :"4",
      "text-anchor":"middle",
      "dominant-baseline":"central",
      "font-family": "Verdana",
      "font-size":"30"
    });
    that.m1 = that.sroot.group(m1Circle, m1Label);
    that.m1.attr({cursor: "pointer"});

    var h1Circle = that.sroot.circle(75,50,27);
    h1Circle.attr({
      stroke: "#eeeeee",
      strokeWidth: 4,
      fill: that.playerColour
    });
    var h1Label = that.sroot.text(75,50,"H1");
    h1Label.attr({
      fill: "none",
      stroke: "#eeeeee",
      strokeWidth :"4",
      "text-anchor":"middle",
      "dominant-baseline":"central",
      "font-family": "Verdana",
      "font-size":"30"
    });
    that.h1 = that.sroot.group(h1Circle, h1Label);
    that.h1.attr({cursor: "pointer"});
    
    var oppoCircle = that.sroot.circle(75,50,27);
    oppoCircle.attr({
      stroke: "#eeeeee",
      strokeWidth: 4,
      fill: that.playerColour
    });
    var oppoLabel = that.sroot.text(75,50,"O");
    oppoLabel.attr({
      fill: "none",
      stroke: "#eeeeee",
      strokeWidth :"4",
      "text-anchor":"middle",
      "dominant-baseline":"central",
      "font-family": "Verdana",
      "font-size":"30"
    });
    that.oppo = that.sroot.group(oppoCircle, oppoLabel);
    that.oppo.attr({cursor: "pointer"});

    var m2Circle = that.sroot.circle(75,50,27);
    m2Circle.attr({
      stroke: "#eeeeee",
      strokeWidth: 4,
      fill: that.playerColour
    });
    var m2Label = that.sroot.text(75,50,"M2");
    m2Label.attr({
      fill: "none",
      stroke: "#eeeeee",
      strokeWidth :"4",
      "text-anchor":"middle",
      "dominant-baseline":"central",
      "font-family": "Verdana",
      "font-size":"30"
    });
    that.m2 = that.sroot.group(m2Circle, m2Label);
    that.m2.attr({cursor: "pointer"});

    var h2Circle = that.sroot.circle(75,50,27);
    h2Circle.attr({
      stroke: "#eeeeee",
      strokeWidth: 4,
      fill: that.playerColour
    });
    var h2Label = that.sroot.text(75,50,"H2");
    h2Label.attr({
      fill: "none",
      stroke: "#eeeeee",
      strokeWidth :"4",
      "text-anchor":"middle",
      "dominant-baseline":"central",
      "font-family": "Verdana",
      "font-size":"30"
    });
    that.h2 = that.sroot.group(h2Circle, h2Label);
    that.h2.attr({cursor: "pointer"});

    that.setter.click(function() {toggleHighlightPlayer(setterCircle)});
    that.oppo.click(function() {toggleHighlightPlayer(oppoCircle)});
    that.h1.click(function() {toggleHighlightPlayer(h1Circle)});
    that.h2.click(function() {toggleHighlightPlayer(h2Circle)});
    that.m1.click(function() {toggleHighlightPlayer(m1Circle)});
    that.m2.click(function() {toggleHighlightPlayer(m2Circle)});
  }

  function drawRotationControl() {
    var vOffset1 = 10;
    var vOffset2 = 70;

    var box1 = that.sroot.rect(0,0,250,30);
    box1.attr({
      fill: that.rotationControlBackgroundColourB
    });
    var box2 = that.sroot.rect(0,30,250,80);
    box2.attr({
      fill: that.rotationControlBackgroundColourA
    });
    var box3 = that.sroot.rect(0,30 + (1*(vOffset1+vOffset2)),250,80);
    box3.attr({
      fill: that.rotationControlBackgroundColourB
    });
    var box4 = that.sroot.rect(0,30 + (2*(vOffset1+vOffset2)),250,80);
    box4.attr({
      fill: that.rotationControlBackgroundColourA
    });
    var box5 = that.sroot.rect(0,30 + (3*(vOffset1+vOffset2)),250,80);
    box5.attr({
      fill: that.rotationControlBackgroundColourB
    });
    var box6 = that.sroot.rect(0,30 + (4*(vOffset1+vOffset2)),250,80);
    box6.attr({
      fill: that.rotationControlBackgroundColourA
    });
    var box7 = that.sroot.rect(0,30 + (5*(vOffset1+vOffset2)),250,80);
    box7.attr({
      fill: that.rotationControlBackgroundColourB
    });
    var backgroundBoxes = that.sroot.group(box1, box2, box3, box4, box5, box6, box7);

    var textHeadingS = that.sroot.text(40,20,"Serving");
    textHeadingS.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var textHeadingR = that.sroot.text(140,20,"Receiving");
    textHeadingR.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var headingLabels = that.sroot.group(textHeadingS, textHeadingR);

    var textLabel2 = that.sroot.text(240,50,"Setter at 2");
    textLabel2.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"end",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var textLabel1 = that.sroot.text(240,50 + (1*(vOffset1+vOffset2)),"Setter at 1");
    textLabel1.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"end",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var textLabel6 = that.sroot.text(240,50 + (2*(vOffset1+vOffset2)),"Setter at 6");
    textLabel6.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"end",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var textLabel5 = that.sroot.text(240,50 + (3*(vOffset1+vOffset2)),"Setter at 5");
    textLabel5.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"end",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var textLabel4 = that.sroot.text(240,50 + (4*(vOffset1+vOffset2)),"Setter at 4");
    textLabel4.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"end",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var textLabel3 = that.sroot.text(240,50 + (5*(vOffset1+vOffset2)),"Setter at 3");
    textLabel3.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"end",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var rotationLabels = that.sroot.group(textLabel1, textLabel2, textLabel3, textLabel4, textLabel5, textLabel6);

    var joinLine1 = that.sroot.line(40,50,140,50 + (1*vOffset1));
    joinLine1.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine2 = that.sroot.line(140,50 + (1*vOffset1),40,50 + (1*vOffset1)+(1*vOffset2));
    joinLine2.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine3 = that.sroot.line(40,50 + (1*vOffset1)+(1*vOffset2),140,50 + (2*vOffset1)+(1*vOffset2));
    joinLine3.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine4 = that.sroot.line(140,50 + (2*vOffset1)+(1*vOffset2),40,50 + (2*vOffset1)+(2*vOffset2));
    joinLine4.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine5 = that.sroot.line(40,50 + (2*vOffset1)+(2*vOffset2),140,50 + (3*vOffset1)+(2*vOffset2));
    joinLine5.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine6 = that.sroot.line(140,50 + (3*vOffset1)+(2*vOffset2),40,50 + (3*vOffset1)+(3*vOffset2));
    joinLine6.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine7 = that.sroot.line(40,50 + (3*vOffset1)+(3*vOffset2),140,50 + (4*vOffset1)+(3*vOffset2));
    joinLine7.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine8 = that.sroot.line(140,50 + (4*vOffset1)+(3*vOffset2),40,50 + (4*vOffset1)+(4*vOffset2));
    joinLine8.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine9 = that.sroot.line(40,50 + (4*vOffset1)+(4*vOffset2),140,50 + (5*vOffset1)+(4*vOffset2));
    joinLine9.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine10 = that.sroot.line(140,50 + (5*vOffset1)+(4*vOffset2),40,50 + (5*vOffset1)+(5*vOffset2));
    joinLine10.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLine11 = that.sroot.line(40,50 + (5*vOffset1)+(5*vOffset2),140,50 + (6*vOffset1)+(5*vOffset2));
    joinLine11.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      "stroke-dasharray": "4,4"
    });
    var joinLines = that.sroot.group(joinLine1, joinLine2, joinLine3, joinLine4, joinLine5, joinLine6, joinLine7, joinLine8, joinLine9, joinLine10, joinLine11);

    var setLineS = that.sroot.line(40,50,40,50 + (5*vOffset1)+(5*vOffset2));
    setLineS.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 1,
      "stroke-dasharray": "6,6"
    });
    var setLineR = that.sroot.line(140,50,140,50 + (6*vOffset1)+(5*vOffset2));
    setLineR.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 1,
      "stroke-dasharray": "6,6"
    });
    var setLines = that.sroot.group(setLineS, setLineR);

    that.controlTwoSrv = that.sroot.circle(40,50,that.rotationControlCirleRadius);
    that.controlTwoSrv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlTwoSrv.attr({cursor: "pointer"});
    that.controlTwoRcv = that.sroot.circle(140,50 + (1*vOffset1),that.rotationControlCirleRadius);
    that.controlTwoRcv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlTwoRcv.attr({cursor: "pointer"});

    that.controlOneSrv = that.sroot.circle(40,50 + (1*vOffset1)+(1*vOffset2),that.rotationControlCirleRadius);
    that.controlOneSrv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourB
    });
    that.controlOneSrv.attr({cursor: "pointer"});
    that.controlOneRcv = that.sroot.circle(140,50 + (2*vOffset1)+(1*vOffset2),that.rotationControlCirleRadius);
    that.controlOneRcv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourB
    });
    that.controlOneRcv.attr({cursor: "pointer"});

    that.controlSixSrv = that.sroot.circle(40,50 + (2*vOffset1)+(2*vOffset2),that.rotationControlCirleRadius);
    that.controlSixSrv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlSixSrv.attr({cursor: "pointer"});
    that.controlSixRcv = that.sroot.circle(140,50 + (3*vOffset1)+(2*vOffset2),that.rotationControlCirleRadius);
    that.controlSixRcv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlSixRcv.attr({cursor: "pointer"});

    that.controlFiveSrv = that.sroot.circle(40,50 + (3*vOffset1)+(3*vOffset2),that.rotationControlCirleRadius);
    that.controlFiveSrv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourB
    });
    that.controlFiveSrv.attr({cursor: "pointer"});
    that.controlFiveRcv = that.sroot.circle(140,50 + (4*vOffset1)+(3*vOffset2),that.rotationControlCirleRadius);
    that.controlFiveRcv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourB
    });
    that.controlFiveRcv.attr({cursor: "pointer"});

    that.controlFourSrv = that.sroot.circle(40,50 + (4*vOffset1)+(4*vOffset2),that.rotationControlCirleRadius);
    that.controlFourSrv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlFourSrv.attr({cursor: "pointer"});
    that.controlFourRcv = that.sroot.circle(140,50 + (5*vOffset1)+(4*vOffset2),that.rotationControlCirleRadius);
    that.controlFourRcv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlFourRcv.attr({cursor: "pointer"});

    that.controlThreeSrv = that.sroot.circle(40,50 + (5*vOffset1)+(5*vOffset2),that.rotationControlCirleRadius);
    that.controlThreeSrv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourB
    });
    that.controlThreeSrv.attr({cursor: "pointer"});
    that.controlThreeRcv = that.sroot.circle(140,50 + (6*vOffset1)+(5*vOffset2),that.rotationControlCirleRadius);
    that.controlThreeRcv.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourB
    });
    that.controlThreeRcv.attr({cursor: "pointer"});
    var controlCircles = that.sroot.group(that.controlOneSrv, that.controlTwoSrv, that.controlThreeSrv, that.controlFourSrv, that.controlFiveSrv, that.controlSixSrv,
        that.controlOneRcv, that.controlTwoRcv, that.controlThreeRcv, that.controlFourRcv, that.controlFiveRcv, that.controlSixRcv);

    that.controlTwoRcv.click(  function() {that.setterAt = 2;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveBase)}});
    that.controlTwoSrv.click(  function() {that.setterAt = 2;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, true, that.controlServeBase)}});
    that.controlOneRcv.click(  function() {that.setterAt = 1;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveBase)}});
    that.controlOneSrv.click(  function() {that.setterAt = 1;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, true, that.controlServeBase)}});
    that.controlSixRcv.click(  function() {that.setterAt = 6;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveBase)}});
    that.controlSixSrv.click(  function() {that.setterAt = 6;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, true, that.controlServeBase)}});
    that.controlFiveRcv.click( function() {that.setterAt = 5;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveBase)}});
    that.controlFiveSrv.click( function() {that.setterAt = 5;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, true, that.controlServeBase)}});
    that.controlFourRcv.click( function() {that.setterAt = 4;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveBase)}});
    that.controlFourSrv.click( function() {that.setterAt = 4;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, true, that.controlServeBase)}});
    that.controlThreeRcv.click(function() {that.setterAt = 3;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveBase)}});
    that.controlThreeSrv.click(function() {that.setterAt = 3;if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, true, that.controlServeBase)}});
    
//    that.controlTwoRcv.mouseover( function() {that.controlTwoRcv.attr});

    that.rotationControls = that.sroot.group(backgroundBoxes, headingLabels, rotationLabels, joinLines, setLines, controlCircles);

    that.rotationControls.transform("t630,25");
  }

  function drawActionControl() {
    var serveBox1 = that.sroot.rect(70,560,94,95);
    serveBox1.attr({
      fill: that.rotationControlBackgroundColourB
    });
    var serveBox2 = that.sroot.rect(164,560,94,95);
    serveBox2.attr({
      fill: that.rotationControlBackgroundColourA
    });
    var serveBox3 = that.sroot.rect(258,560,94,95);
    serveBox3.attr({
      fill: that.rotationControlBackgroundColourB
    });
    var serveBox4 = that.sroot.rect(350,560,92,95);
    serveBox4.attr({
      fill: that.rotationControlBackgroundColourA
    });
    var serveBox5 = that.sroot.rect(442,560,96,95);
    serveBox5.attr({
      fill: that.rotationControlBackgroundColourB
    });

    var receiveBox1 = that.sroot.rect(70,655,94,100);
    receiveBox1.attr({
      fill: that.rotationControlBackgroundColourB
    });
    var receiveBox2 = that.sroot.rect(164,655,94,100);
    receiveBox2.attr({
      fill: that.rotationControlBackgroundColourA
    });
    var receiveBox3 = that.sroot.rect(258,655,94,100);
    receiveBox3.attr({
      fill: that.rotationControlBackgroundColourB
    });
    var receiveBox4 = that.sroot.rect(350,655,92,100);
    receiveBox4.attr({
      fill: that.rotationControlBackgroundColourA
    });
    var receiveBox5 = that.sroot.rect(442,655,96,100);
    receiveBox5.attr({
      fill: that.rotationControlBackgroundColourB
    });

    var setBar = that.sroot.rect(538,590,142,20);
    setBar.attr({
      fill: that.rotationControlBackgroundColourB
    });
    setBar = that.sroot.rect(660,535,20,75);
    setBar.attr({
      fill: that.rotationControlBackgroundColourB
    });
    setBar = that.sroot.rect(538,690,242,20);
    setBar.attr({
      fill: that.rotationControlBackgroundColourB
    });
    setBar = that.sroot.rect(760,535,20,175);
    setBar.attr({
      fill: that.rotationControlBackgroundColourB
    });

    var setLine = that.sroot.line(115,600,670,600);
    setLine.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 1,
      "stroke-dasharray": "6,6"
    });
    setLine = that.sroot.line(670,600,670,475 + that.rotationControlCirleRadius);
    setLine.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 1,
      "stroke-dasharray": "6,6"
    });
    setLine = that.sroot.line(115,700,770,700);
    setLine.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 1,
      "stroke-dasharray": "6,6"
    });
    setLine = that.sroot.line(770,700,770,485 + that.rotationControlCirleRadius);
    setLine.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 1,
      "stroke-dasharray": "6,6"
    });

    var textHeadingS = that.sroot.text(105,578,"Serving");
    textHeadingS.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var textHeadingR = that.sroot.text(110,673,"Receiving");
    textHeadingR.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"14"
    });
    var headingLabels = that.sroot.group(textHeadingS, textHeadingR);

    that.controlServeBase = that.sroot.circle(115,600,that.rotationControlCirleRadius);
    that.controlServeBase.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlServeBase.attr({cursor: "pointer"});
    that.controlServeServe = that.sroot.circle(300,600,that.rotationControlCirleRadius);
    that.controlServeServe.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlServeServe.attr({cursor: "pointer"});
    that.controlServeSwitch = that.sroot.circle(485,600,that.rotationControlCirleRadius);
    that.controlServeSwitch.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlServeSwitch.attr({cursor: "pointer"});

    that.controlReceiveBase = that.sroot.circle(115,700,that.rotationControlCirleRadius);
    that.controlReceiveBase.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlReceiveBase.attr({cursor: "pointer"});
    that.controlReceiveReceive = that.sroot.circle(207,700,that.rotationControlCirleRadius);
    that.controlReceiveReceive.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlReceiveReceive.attr({cursor: "pointer"});
    that.controlReceiveSet = that.sroot.circle(300,700,that.rotationControlCirleRadius);
    that.controlReceiveSet.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlReceiveSet.attr({cursor: "pointer"});
    that.controlReceiveHit = that.sroot.circle(393,700,that.rotationControlCirleRadius);
    that.controlReceiveHit.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlReceiveHit.attr({cursor: "pointer"});
    that.controlReceiveSwitch = that.sroot.circle(485,700,that.rotationControlCirleRadius);
    that.controlReceiveSwitch.attr({
      stroke: that.rotationControlColour,
      strokeWidth: 2,
      fill: that.rotationControlBackgroundColourA
    });
    that.controlReceiveSwitch.attr({cursor: "pointer"});

    var textLabel = that.sroot.text(115,640,"Base");
    textLabel.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"22"
    });
    textLabel = that.sroot.text(300,640,"Serve");
    textLabel.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"22"
    });
    textLabel = that.sroot.text(485,640,"Switch");
    textLabel.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"22"
    });

    textLabel = that.sroot.text(115,740,"Base");
    textLabel.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"22"
    });
    textLabel = that.sroot.text(207,740,"Pass");
    textLabel.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"22"
    });
    textLabel = that.sroot.text(300,740,"Set");
    textLabel.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"22"
    });
    textLabel = that.sroot.text(393,740,"Attack");
    textLabel.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"22"
    });
    textLabel = that.sroot.text(485,740,"Switch");
    textLabel.attr({
      fill: that.rotationControlColour,
      stroke: that.rotationControlColour,
      strokeWidth :"1",
      "text-anchor":"middle",
      "font-family": "Verdana",
      "font-size":"22"
    });

    that.controlServeBase.click(function() {if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, true, that.controlServeBase)}});
    that.controlServeServe.click(function() {if (move(that.playerOffsetsServeServe[that.setterAt], 500)) {controlSelect(that.setterAt, true, that.controlServeServe)}});
    that.controlServeSwitch.click(function() {if (move(that.playerOffsetsSwitch[that.setterAt], 500)) {controlSelect(that.setterAt, true, that.controlServeSwitch)}});
    that.controlReceiveBase.click(function() {if (move(that.playerOffsetsBase[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveBase)}});
    that.controlReceiveReceive.click(function() {if (move(that.playerOffsetsReceiveReceive[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveReceive)}});
    that.controlReceiveSet.click(function() {if (move(that.playerOffsetsReceiveSet[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveSet)}});
    that.controlReceiveHit.click(function() {if (move(that.playerOffsetsReceiveHit[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveHit)}});
    that.controlReceiveSwitch.click(function() {if (move(that.playerOffsetsSwitch[that.setterAt], 500)) {controlSelect(that.setterAt, false, that.controlReceiveSwitch)}});
  }

  function createSVGDocRoot(width, height) {
    that.moving = false;
    var svgRoot = document.createElementNS(that.NS, "svg");
    svgRoot.setAttribute("width", width);
    svgRoot.setAttribute("height", height);
    svgRoot.setAttribute("id", "vbsvg");
    return svgRoot;
  }

  function createSVGDoc(options) {
    
    that.width = getWidth(options);
    that.height = getHeight(options);
    var svgRoot = createSVGDocRoot(that.width, that.height);

    return svgRoot;
  }

  function draw() {
    that.sroot = Snap("#vbsvg");
    drawCourt();
    drawRotationControl();
    drawActionControl();
    drawPlayers();
    initialisePlayers();
  }
  
  function initialisePlayers() {
    controlSelect(2, true, that.controlServeBase);
    move(that.playerOffsetsBase[2], 1);
    serveRotation = true;
  }

  function controlSelect(setterPos, serving, action) {
    that.controlTwoRcv.attr({fill: that.rotationControlBackgroundColourA});
    that.controlTwoSrv.attr({fill: that.rotationControlBackgroundColourA});
    that.controlOneRcv.attr({fill: that.rotationControlBackgroundColourB});
    that.controlOneSrv.attr({fill: that.rotationControlBackgroundColourB});
    that.controlSixRcv.attr({fill: that.rotationControlBackgroundColourA});
    that.controlSixSrv.attr({fill: that.rotationControlBackgroundColourA});
    that.controlFiveRcv.attr({fill: that.rotationControlBackgroundColourB});
    that.controlFiveSrv.attr({fill: that.rotationControlBackgroundColourB});
    that.controlFourRcv.attr({fill: that.rotationControlBackgroundColourA});
    that.controlFourSrv.attr({fill: that.rotationControlBackgroundColourA});
    that.controlThreeRcv.attr({fill: that.rotationControlBackgroundColourB});
    that.controlThreeSrv.attr({fill: that.rotationControlBackgroundColourB});
    
    var currentControl;
    if (setterPos === 1) {
      currentControl = serving ? that.controlOneSrv : that.controlOneRcv;
    }
    else if (setterPos === 2) {
      currentControl = serving ? that.controlTwoSrv : that.controlTwoRcv;
    }
    else if (setterPos === 3) {
      currentControl = serving ? that.controlThreeSrv : that.controlThreeRcv;
    }
    else if (setterPos === 4) {
      currentControl = serving ? that.controlFourSrv : that.controlFourRcv;
    }
    else if (setterPos === 5) {
      currentControl = serving ? that.controlFiveSrv : that.controlFiveRcv;
    }
    else if (setterPos === 6) {
      currentControl = serving ? that.controlSixSrv : that.controlSixRcv;
    }
    
    currentControl.attr({fill: that.rotationControlColour});
    actionSelect(action);
  }

  function actionSelect(action) {
    that.controlServeBase.attr({fill: that.rotationControlBackgroundColourA});
    that.controlServeServe.attr({fill: that.rotationControlBackgroundColourA});
    that.controlServeSwitch.attr({fill: that.rotationControlBackgroundColourA});
    that.controlReceiveBase.attr({fill: that.rotationControlBackgroundColourA});
    that.controlReceiveReceive.attr({fill: that.rotationControlBackgroundColourA});
    that.controlReceiveSet.attr({fill: that.rotationControlBackgroundColourA});
    that.controlReceiveHit.attr({fill: that.rotationControlBackgroundColourA});
    that.controlReceiveSwitch.attr({fill: that.rotationControlBackgroundColourA});
    action.attr({fill: that.rotationControlColour});
  }

  function toggleHighlightPlayer(player) {
    if (that.highlightedPlayer == 0) {
      that.highlightedPlayer = player;
      that.highlightedPlayer.attr({fill: that.playerColourHighlight});
    }
    else if (that.highlightedPlayer == player) {
      that.highlightedPlayer = 0;
      player.attr({fill: that.playerColour});
    }
    else {
      that.highlightedPlayer.attr({
        fill: that.playerColour
      });
      that.highlightedPlayer = player;
      player.attr({fill: that.playerColourHighlight});
    }
  }

  function move(players, time) {
    if (that.moving) {
      return false;
    }
    that.moving = true;

    that.setter.animate({ transform:'translate(' + players.s.x + ',' + players.s.y + ')'}, time, null, donemove);
    that.oppo.animate({ transform:'translate(' + players.o.x + ',' + players.o.y + ')'}, time, null, donemove);
    that.m1.animate({ transform:'translate(' + players.m1.x + ',' + players.m1.y + ')'}, time, null, donemove);
    that.m2.animate({ transform:'translate(' + players.m2.x + ',' + players.m2.y + ')'}, time, null, donemove);
    that.h1.animate({ transform:'translate(' + players.h1.x + ',' + players.h1.y + ')'}, time, null, donemove);
    that.h2.animate({ transform:'translate(' + players.h2.x + ',' + players.h2.y + ')'}, time, null, donemove);
    return true;
  }
//  function goback() {
//    that.setter.animate({ transform:'translate(0,0)'}, 1000, null, donemove);
//  }
  function donemove() {
    that.moving = false;
  }

  // Privileged methods
  this.setErrorHandler = function(handler) {
    errorHandler.call(this, handler);
  }
  
  this.createSVG = function(options) {
    return createSVGDoc.call(this, options);
  }

  this.draw = function() {
    return draw.call(this);
  }
}


