var monkeysppp = monkeysppp || { vbRotations: {} };

monkeysppp.vbRotations.SVGMaker = function() {
  var _this = this;

  this.NS = 'http://www.w3.org/2000/svg';
  this.sroot = null;
  this.width = null;
  this.height = null;

  this.backgroundColour      = '#85d6ff';
  this.courtColour           = '#ffb591';
  this.lineColour            = 'white';
  this.playerColour          = '#efa581';
  this.playerColourHighlight = '#66dd66';
  this.rotationControlColour = 'white';
  this.rotationControlHighlightColour = '#dddddd';
  this.rotationControlBackgroundColourA = '#65b6df';
  this.rotationControlBackgroundColourB = '#4596bf';
  this.rotationControlCirleRadius = 12;
  this.tutorialColour        = '#44cc44';
  this.tutorialFade          = '#999999';

  // Player objects
  this.setter = null;
  this.oppo = null;
  this.m1 = null;
  this.m2 = null;
  this.h1 = null;
  this.h2 = null;

  this.rotationControls = null;
  this.highlightedPlayer = 0;

  // Action locks;
  this.moving = null;
  this.serveRotation = null;

  this.setterAt = 2;

  this.controlTwoRcv = null;
  this.controlTwoSrv = null;
  this.controlThreeRcv = null;
  this.controlThreeSrv = null;
  this.controlFourRcv = null;
  this.controlFourSrv = null;
  this.controlFiveRcv = null;
  this.controlFiveSrv = null;
  this.controlSixRcv = null;
  this.controlSixSrv = null;
  this.controlOneRcv = null;
  this.controlOneSrv = null;

  this.playerOffsetsBase = {
    1: {
        s:  { x: 350, y: 300 },
        h1: { x: 350, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 100, y: 50 },
        h2: { x: 100, y: 300 },
        m2: { x: 225, y: 350 },
      },
    2: {
        m2: { x: 350, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 225, y: 50 },
        m1: { x: 100, y: 50 },
        o:  { x: 100, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 300 },
        m2: { x: 350, y: 50 },
        s:  { x: 225, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 225, y: 350 },
      },
    4: {
        o:  { x: 350, y: 300 },
        h2: { x: 350, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 100, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 225, y: 350 },
      },
    5: {
        m1: { x: 350, y: 300 },
        o:  { x: 350, y: 50 },
        h2: { x: 225, y: 50 },
        m2: { x: 100, y: 50 },
        s:  { x: 100, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 300 },
        m1: { x: 350, y: 50 },
        o:  { x: 225, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 225, y: 350 },
      },
  };

  this.playerOffsetsServeServe = {
    1: {
        s:  { x: 350, y: 475 },
        h1: { x: 290, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 160, y: 50 },
        h2: { x: 100, y: 300 },
        m2: { x: 225, y: 350 },
      },
    2: {
        m2: { x: 350, y: 475 },
        s:  { x: 290, y: 50 },
        h1: { x: 225, y: 50 },
        m1: { x: 160, y: 50 },
        o:  { x: 100, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 475 },
        m2: { x: 290, y: 50 },
        s:  { x: 225, y: 50 },
        h1: { x: 160, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 225, y: 350 },
      },
    4: {
        o:  { x: 350, y: 475 },
        h2: { x: 290, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 160, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 225, y: 350 },
      },
    5: {
        m1: { x: 350, y: 475 },
        o:  { x: 290, y: 50 },
        h2: { x: 225, y: 50 },
        m2: { x: 160, y: 50 },
        s:  { x: 100, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 475 },
        m1: { x: 290, y: 50 },
        o:  { x: 225, y: 50 },
        h2: { x: 160, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 225, y: 350 },
      },
  };

  this.playerOffsetsSwitchServe = {
    1: {
        s:  { x: 350, y: 300 },
        h1: { x: 100, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 50 },
        h2: { x: 225, y: 350 },
        m2: { x: 100, y: 300 },
      },
    2: {
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 225, y: 350 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 300 },
      },
    4: {
        o:  { x: 350, y: 300 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 225, y: 350 },
        m1: { x: 100, y: 300 },
      },
    5: {
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 225, y: 350 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 300 },
      },
  };

  this.playerOffsetsSwitchReceive = {
    1: {
        s:  { x: 350, y: 300 },
        h1: { x: 350, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 100, y: 50 },
        h2: { x: 225, y: 350 },
        m2: { x: 100, y: 300 },
      },
    2: {
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 225, y: 350 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 300 },
      },
    4: {
        o:  { x: 350, y: 300 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 225, y: 350 },
        m1: { x: 100, y: 300 },
      },
    5: {
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 225, y: 350 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 300 },
      },
  };

  this.playerOffsetsReceiveReceive = {
    1: {
        s:  { x: 400, y: 85 },
        h1: { x: 420, y: 30 },
        m1: { x: 380, y: 140 },
        o:  { x: 100, y: 300 },
        h2: { x: 225, y: 350 },
        m2: { x: 350, y: 300 },
      },
    2: {
        m2: { x: 350, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 20, y: 80 },
        o:  { x: 130, y: 420 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 300 },
        m2: { x: 370, y: 70 },
        s:  { x: 300, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 225, y: 350 },
        o:  { x: 280, y: 410 },
      },
    4: {
        o:  { x: 380, y: 410 },
        h2: { x: 100, y: 300 },
        m2: { x: 70, y: 70 },
        s:  { x: 30, y: 30 },
        h1: { x: 225, y: 350 },
        m1: { x: 350, y: 300 },
      },
    5: {
        m1: { x: 350, y: 300 },
        o:  { x: 420, y: 50 },
        h2: { x: 100, y: 300 },
        m2: { x: 30, y: 30 },
        s:  { x: 120, y: 70 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 300 },
        m1: { x: 350, y: 70 },
        o:  { x: 280, y: 30 },
        h2: { x: 100, y: 300 },
        m2: { x: 225, y: 350 },
        s:  { x: 255, y: 85 },
      },
  };

  this.playerOffsetsReceiveSet = {
    1: {
        s:  { x: 300, y: 50 },
        h1: { x: 450, y: 150 },
        m1: { x: 225, y: 150 },
        o:  { x: 0,   y: 150 },
        h2: { x: 225, y: 350 },
        m2: { x: 350, y: 300 },
      },
    2: {
        m2: { x: 350, y: 300 },
        s:  { x: 300, y: 50 },
        h1: { x: 0,   y: 150 },
        m1: { x: 225, y: 150 },
        o:  { x: 100, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 300 },
        m2: { x: 225, y: 150 },
        s:  { x: 300, y: 50 },
        h1: { x: 0,   y: 150 },
        m1: { x: 225, y: 350 },
        o:  { x: 280, y: 410 },
      },
    4: {
        o:  { x: 380, y: 410 },
        h2: { x: 0,   y: 150 },
        m2: { x: 225, y: 150 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 350 },
        m1: { x: 350, y: 300 },
      },
    5: {
        m1: { x: 350, y: 300 },
        o:  { x: 450, y: 150 },
        h2: { x: 0,   y: 150 },
        m2: { x: 225, y: 150 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 300 },
        m1: { x: 225, y: 150 },
        o:  { x: 450, y: 150 },
        h2: { x: 0,   y: 150 },
        m2: { x: 225, y: 350 },
        s:  { x: 300, y: 50 },
      },
  };

  this.playerOffsetsReceiveHit = {
    1: {
        s:  { x: 300, y: 50 },
        h1: { x: 400, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 50, y: 50 },
        h2: { x: 225, y: 350 },
        m2: { x: 350, y: 300 },
      },
    2: {
        m2: { x: 350, y: 300 },
        s:  { x: 300, y: 50 },
        h1: { x: 50,  y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 100, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 300 },
        m2: { x: 225,  y: 50 },
        s:  { x: 300, y: 50 },
        h1: { x: 50, y: 50 },
        m1: { x: 225, y: 350 },
        o:  { x: 280, y: 410 },
      },
    4: {
        o:  { x: 380, y: 410 },
        h2: { x: 50, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 350 },
        m1: { x: 350, y: 300 },
      },
    5: {
        m1: { x: 350, y: 300 },
        o:  { x: 400, y: 50 },
        h2: { x: 50,  y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 300 },
        m1: { x: 225, y: 50 },
        o:  { x: 400, y: 50 },
        h2: { x: 50,  y: 50 },
        m2: { x: 225, y: 350 },
        s:  { x: 300, y: 50 },
      },
  };

  this.tutorialData = [
    {
      boxPosition: {
        left:   250,
        right:  350,
        top:    350,
        bottom: 450,
      },
      textPosition: {
        left:   375,
        right:  685,
        top:    350,
        bottom: 450,
      },
      text: 'This is a player. Click to highlight it.\n\nH=Hitter, M=Middle, S=Setter, \nO=Opposite',
      nextPosition: {
        left: 585,
        top:  475,
      },
    },
    {
      boxPosition: {
        left:   72,
        right:  528,
        top:    48,
        bottom: 480,
      },
      textPosition: {
        left:   550,
        right:  860,
        top:    200,
        bottom: 300,
      },
      text: 'This is the court, with all 6 players.\nAs you click the buttons, the players\n will move round the court',
      nextPosition: {
        left: 760,
        top:  325,
      },
    },
    {
      boxPosition: {
        left:   630,
        right:  880,
        top:    25,
        bottom: 535,
      },
      textPosition: {
        left:   295,
        right:  605,
        top:    25,
        bottom: 125,
      },
      text: 'This lets you select the rotations.\nClick the circle to change rotation.\nEach one is labelled with the\nsetter\'s position.',
      nextPosition: {
        left: 505,
        top:  150,
      },
    },
    {
      boxPosition: {
        left:   630,
        right:  720,
        top:    25,
        bottom: 535,
      },
      textPosition: {
        left:   295,
        right:  605,
        top:    75,
        bottom: 175,
      },
      text: 'These are for when you are serving.',
      nextPosition: {
        left: 505,
        top:  200,
      },
    },
    {
      boxPosition: {
        left:   720,
        right:  810,
        top:    25,
        bottom: 535,
      },
      textPosition: {
        left:   295,
        right:  605,
        top:    125,
        bottom: 225,
      },
      text: 'These are for when you are\nreceiving.',
      nextPosition: {
        left: 505,
        top:  250,
      },
    },
    {
      boxPosition: {
        left:   630,
        right:  810,
        top:    25,
        bottom: 535,
      },
      textPosition: {
        left:   295,
        right:  605,
        top:    175,
        bottom: 275,
      },
      text: 'Moving from circle to circle makes\n you rotate like in a match.',
      nextPosition: {
        left: 505,
        top:  300,
      },
    },
    {
      boxPosition: {
        left:   70,
        right:  538,
        top:    560,
        bottom: 755,
      },
      textPosition: {
        left:   75,
        right:  385,
        top:    440,
        bottom: 540,
      },
      text: 'This lets you select the phase of\n the rally.  The players will then\nmove around the court.',
      nextPosition: {
        left: 410,
        top:  500,
      },
    },
    {
      boxPosition: {
        left:   70,
        right:  538,
        top:    560,
        bottom: 657,
      },
      textPosition: {
        left:   100,
        right:  410,
        top:    440,
        bottom: 540,
      },
      text: 'These show the player positions\n when your side is serving.',
      nextPosition: {
        left: 435,
        top:  500,
      },
    },
    {
      boxPosition: {
        left:   70,
        right:  538,
        top:    658,
        bottom: 755,
      },
      textPosition: {
        left:   125,
        right:  435,
        top:    440,
        bottom: 540,
      },
      text: 'These show the player positions\n when your side is receiving.',
      nextPosition: {
        left: 460,
        top:  500,
      },
    },
  ];

  // Default methods
  var reportError = function(msg) {
    // do nothing with the error message;
  };

  // Private methods
  function errorHandler(handler) {
    _this.reportError = handler;
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
    var background = _this.sroot.rect(0, 0, getWidth(), getHeight());
    background.attr({
      fill: _this.backgroundColour,
    });

    // Court lines
    var outerLines = _this.sroot.rect(75, 50, 450, 425);
    outerLines.attr({
      fill: _this.courtColour,
      stroke: _this.lineColour,
      strokeWidth: 4,
    });

    // Centre line
    var centreLine = _this.sroot.line(60, 50, 540, 50);
    centreLine.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
    });

    // Attack line and sub lines
    var attackLine = _this.sroot.line(75, 200, 525, 200);
    attackLine.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
    });
    var leftTicks = _this.sroot.line(10, 200, 75, 200);
    leftTicks.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
      'stroke-dasharray': '9, 9',
    });
    var rightTicks = _this.sroot.line(525, 200, 590, 200);
    rightTicks.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
      'stroke-dasharray': '9, 9',
    });
  }

  function drawPlayers() {
    // Player markers
    var setterCircle = _this.sroot.circle(75, 50, 27);
    setterCircle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var setterLabel = _this.sroot.text(75, 50, 'S');
    setterLabel.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.setter = _this.sroot.group(setterCircle, setterLabel);
    _this.setter.attr({ cursor: 'pointer' });

    var m1Circle = _this.sroot.circle(75, 50, 27);
    m1Circle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var m1Label = _this.sroot.text(75, 50, 'M1');
    m1Label.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.m1 = _this.sroot.group(m1Circle, m1Label);
    _this.m1.attr({ cursor: 'pointer' });

    var h1Circle = _this.sroot.circle(75, 50, 27);
    h1Circle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var h1Label = _this.sroot.text(75, 50, 'H1');
    h1Label.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.h1 = _this.sroot.group(h1Circle, h1Label);
    _this.h1.attr({ cursor: 'pointer' });

    var oppoCircle = _this.sroot.circle(75, 50, 27);
    oppoCircle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var oppoLabel = _this.sroot.text(75, 50, 'O');
    oppoLabel.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.oppo = _this.sroot.group(oppoCircle, oppoLabel);
    _this.oppo.attr({ cursor: 'pointer' });

    var m2Circle = _this.sroot.circle(75, 50, 27);
    m2Circle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var m2Label = _this.sroot.text(75, 50, 'M2');
    m2Label.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.m2 = _this.sroot.group(m2Circle, m2Label);
    _this.m2.attr({ cursor: 'pointer' });

    var h2Circle = _this.sroot.circle(75, 50, 27);
    h2Circle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var h2Label = _this.sroot.text(75, 50, 'H2');
    h2Label.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.h2 = _this.sroot.group(h2Circle, h2Label);
    _this.h2.attr({ cursor: 'pointer' });

    _this.setter.click(function() {toggleHighlightPlayer(setterCircle);});
    _this.oppo.click(function() {toggleHighlightPlayer(oppoCircle);});
    _this.h1.click(function() {toggleHighlightPlayer(h1Circle);});
    _this.h2.click(function() {toggleHighlightPlayer(h2Circle);});
    _this.m1.click(function() {toggleHighlightPlayer(m1Circle);});
    _this.m2.click(function() {toggleHighlightPlayer(m2Circle);});
  }

  function drawRotationControl() {
    var vOffset1 = 10;
    var vOffset2 = 70;

    var box1 = _this.sroot.rect(0, 0, 250, 30);
    box1.attr({
      fill: _this.rotationControlBackgroundColourB,
    });
    var box2 = _this.sroot.rect(0, 30, 250, 80);
    box2.attr({
      fill: _this.rotationControlBackgroundColourA,
    });
    var box3 = _this.sroot.rect(0, 30 + (1 * (vOffset1 + vOffset2)), 250, 80);
    box3.attr({
      fill: _this.rotationControlBackgroundColourB,
    });
    var box4 = _this.sroot.rect(0, 30 + (2 * (vOffset1 + vOffset2)), 250, 80);
    box4.attr({
      fill: _this.rotationControlBackgroundColourA,
    });
    var box5 = _this.sroot.rect(0, 30 + (3 * (vOffset1 + vOffset2)), 250, 80);
    box5.attr({
      fill: _this.rotationControlBackgroundColourB,
    });
    var box6 = _this.sroot.rect(0, 30 + (4 * (vOffset1 + vOffset2)), 250, 80);
    box6.attr({
      fill: _this.rotationControlBackgroundColourA,
    });
    var box7 = _this.sroot.rect(0, 30 + (5 * (vOffset1 + vOffset2)), 250, 80);
    box7.attr({
      fill: _this.rotationControlBackgroundColourB,
    });
    var backgroundBoxes = _this.sroot.group(box1, box2, box3, box4, box5, box6, box7);

    var textHeadingS = _this.sroot.text(40, 20, 'Serving');
    textHeadingS.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'14',
    });
    var textHeadingR = _this.sroot.text(140, 20, 'Receiving');
    textHeadingR.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'14',
    });
    var headingLabels = _this.sroot.group(textHeadingS, textHeadingR);

    var textLabel2 = _this.sroot.text(240, 50, 'Setter at 2');
    textLabel2.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size':'14',
    });
    var textLabel1 = _this.sroot.text(240, 50 + (1 * (vOffset1 + vOffset2)), 'Setter at 1');
    textLabel1.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size':'14',
    });
    var textLabel6 = _this.sroot.text(240, 50 + (2 * (vOffset1 + vOffset2)), 'Setter at 6');
    textLabel6.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size':'14',
    });
    var textLabel5 = _this.sroot.text(240, 50 + (3 * (vOffset1 + vOffset2)), 'Setter at 5');
    textLabel5.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size':'14',
    });
    var textLabel4 = _this.sroot.text(240, 50 + (4 * (vOffset1 + vOffset2)), 'Setter at 4');
    textLabel4.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size':'14',
    });
    var textLabel3 = _this.sroot.text(240, 50 + (5 * (vOffset1 + vOffset2)), 'Setter at 3');
    textLabel3.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size':'14',
    });
    var rotationLabels = _this.sroot.group(textLabel1, textLabel2, textLabel3, textLabel4, textLabel5, textLabel6);

    var joinLine1 = _this.sroot.line(40, 50, 140, 50 + (1 * vOffset1));
    joinLine1.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine2 = _this.sroot.line(140, 50 + (1 * vOffset1), 40, 50 + (1 * vOffset1) + (1 * vOffset2));
    joinLine2.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine3 = _this.sroot.line(40, 50 + (1 * vOffset1) + (1 * vOffset2), 140, 50 + (2 * vOffset1) + (1 * vOffset2));
    joinLine3.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine4 = _this.sroot.line(140, 50 + (2 * vOffset1) + (1 * vOffset2), 40, 50 + (2 * vOffset1) + (2 * vOffset2));
    joinLine4.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine5 = _this.sroot.line(40, 50 + (2 * vOffset1) + (2 * vOffset2), 140, 50 + (3 * vOffset1) + (2 * vOffset2));
    joinLine5.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine6 = _this.sroot.line(140, 50 + (3 * vOffset1) + (2 * vOffset2), 40, 50 + (3 * vOffset1) + (3 * vOffset2));
    joinLine6.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine7 = _this.sroot.line(40, 50 + (3 * vOffset1) + (3 * vOffset2), 140, 50 + (4 * vOffset1) + (3 * vOffset2));
    joinLine7.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine8 = _this.sroot.line(140, 50 + (4 * vOffset1) + (3 * vOffset2), 40, 50 + (4 * vOffset1) + (4 * vOffset2));
    joinLine8.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine9 = _this.sroot.line(40, 50 + (4 * vOffset1) + (4 * vOffset2), 140, 50 + (5 * vOffset1) + (4 * vOffset2));
    joinLine9.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine10 = _this.sroot.line(140, 50 + (5 * vOffset1) + (4 * vOffset2), 40, 50 + (5 * vOffset1) + (5 * vOffset2));
    joinLine10.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLine11 = _this.sroot.line(40, 50 + (5 * vOffset1) + (5 * vOffset2), 140, 50 + (6 * vOffset1) + (5 * vOffset2));
    joinLine11.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      'stroke-dasharray': '4, 4',
    });
    var joinLines = _this.sroot.group(joinLine1, joinLine2, joinLine3, joinLine4, joinLine5, joinLine6, joinLine7, joinLine8, joinLine9, joinLine10, joinLine11);

    var setLineS = _this.sroot.line(40, 50, 40, 50 + (5 * vOffset1) + (5 * vOffset2));
    setLineS.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6',
    });
    var setLineR = _this.sroot.line(140, 50, 140, 50 + (6 * vOffset1) + (5 * vOffset2));
    setLineR.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6',
    });
    var setLines = _this.sroot.group(setLineS, setLineR);

    _this.controlTwoSrv = _this.sroot.circle(40, 50, _this.rotationControlCirleRadius);
    _this.controlTwoSrv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA,
    });
    _this.controlTwoSrv.attr({ cursor: 'pointer' });
    _this.controlTwoRcv = _this.sroot.circle(140, 50 + (1 * vOffset1), _this.rotationControlCirleRadius);
    _this.controlTwoRcv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA,
    });
    _this.controlTwoRcv.attr({ cursor: 'pointer' });

    _this.controlOneSrv = _this.sroot.circle(40, 50 + (1 * vOffset1) + (1 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlOneSrv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourB,
    });
    _this.controlOneSrv.attr({ cursor: 'pointer' });
    _this.controlOneRcv = _this.sroot.circle(140, 50 + (2 * vOffset1) + (1 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlOneRcv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourB,
    });
    _this.controlOneRcv.attr({ cursor: 'pointer' });

    _this.controlSixSrv = _this.sroot.circle(40, 50 + (2 * vOffset1) + (2 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlSixSrv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA,
    });
    _this.controlSixSrv.attr({ cursor: 'pointer' });
    _this.controlSixRcv = _this.sroot.circle(140, 50 + (3 * vOffset1) + (2 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlSixRcv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA,
    });
    _this.controlSixRcv.attr({ cursor: 'pointer' });

    _this.controlFiveSrv = _this.sroot.circle(40, 50 + (3 * vOffset1) + (3 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlFiveSrv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourB,
    });
    _this.controlFiveSrv.attr({ cursor: 'pointer' });
    _this.controlFiveRcv = _this.sroot.circle(140, 50 + (4 * vOffset1) + (3 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlFiveRcv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourB,
    });
    _this.controlFiveRcv.attr({ cursor: 'pointer' });

    _this.controlFourSrv = _this.sroot.circle(40, 50 + (4 * vOffset1) + (4 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlFourSrv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA,
    });
    _this.controlFourSrv.attr({ cursor: 'pointer' });
    _this.controlFourRcv = _this.sroot.circle(140, 50 + (5 * vOffset1) + (4 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlFourRcv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA,
    });
    _this.controlFourRcv.attr({ cursor: 'pointer' });

    _this.controlThreeSrv = _this.sroot.circle(40, 50 + (5 * vOffset1) + (5 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlThreeSrv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourB,
    });
    _this.controlThreeSrv.attr({ cursor: 'pointer' });
    _this.controlThreeRcv = _this.sroot.circle(140, 50 + (6 * vOffset1) + (5 * vOffset2), _this.rotationControlCirleRadius);
    _this.controlThreeRcv.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourB,
    });
    _this.controlThreeRcv.attr({ cursor: 'pointer' });
    var controlCircles = _this.sroot.group(_this.controlOneSrv, _this.controlTwoSrv, _this.controlThreeSrv, _this.controlFourSrv, _this.controlFiveSrv, _this.controlSixSrv,
        _this.controlOneRcv, _this.controlTwoRcv, _this.controlThreeRcv, _this.controlFourRcv, _this.controlFiveRcv, _this.controlSixRcv);

    _this.controlTwoRcv.click(function() {_this.setterAt = 2;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveBase);}});
    _this.controlTwoSrv.click(function() {_this.setterAt = 2;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeBase);}});
    _this.controlOneRcv.click(function() {_this.setterAt = 1;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveBase);}});
    _this.controlOneSrv.click(function() {_this.setterAt = 1;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeBase);}});
    _this.controlSixRcv.click(function() {_this.setterAt = 6;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveBase);}});
    _this.controlSixSrv.click(function() {_this.setterAt = 6;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeBase);}});
    _this.controlFiveRcv.click(function() {_this.setterAt = 5;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveBase);}});
    _this.controlFiveSrv.click( function() {_this.setterAt = 5;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeBase);}});
    _this.controlFourRcv.click( function() {_this.setterAt = 4;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveBase);}});
    _this.controlFourSrv.click( function() {_this.setterAt = 4;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeBase);}});
    _this.controlThreeRcv.click(function() {_this.setterAt = 3;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveBase);}});
    _this.controlThreeSrv.click(function() {_this.setterAt = 3;if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeBase);}});

    _this.rotationControls = _this.sroot.group(backgroundBoxes, headingLabels, rotationLabels, joinLines, setLines, controlCircles);

    _this.rotationControls.transform('t630, 25');
  }

  function drawActionControl() {
    var serveBox1 = _this.sroot.rect(70, 560, 94, 95);
    serveBox1.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    var serveBox2 = _this.sroot.rect(164, 560, 94, 95);
    serveBox2.attr({
      fill: _this.rotationControlBackgroundColourA
    });
    var serveBox3 = _this.sroot.rect(258, 560, 94, 95);
    serveBox3.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    var serveBox4 = _this.sroot.rect(350, 560, 92, 95);
    serveBox4.attr({
      fill: _this.rotationControlBackgroundColourA
    });
    var serveBox5 = _this.sroot.rect(442, 560, 96, 95);
    serveBox5.attr({
      fill: _this.rotationControlBackgroundColourB
    });

    var receiveBox1 = _this.sroot.rect(70, 655, 94, 100);
    receiveBox1.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    var receiveBox2 = _this.sroot.rect(164, 655, 94, 100);
    receiveBox2.attr({
      fill: _this.rotationControlBackgroundColourA
    });
    var receiveBox3 = _this.sroot.rect(258, 655, 94, 100);
    receiveBox3.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    var receiveBox4 = _this.sroot.rect(350, 655, 92, 100);
    receiveBox4.attr({
      fill: _this.rotationControlBackgroundColourA
    });
    var receiveBox5 = _this.sroot.rect(442, 655, 96, 100);
    receiveBox5.attr({
      fill: _this.rotationControlBackgroundColourB
    });

    var setBar = _this.sroot.rect(538, 590, 142, 20);
    setBar.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    setBar = _this.sroot.rect(660, 535, 20, 75);
    setBar.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    setBar = _this.sroot.rect(538, 690, 242, 20);
    setBar.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    setBar = _this.sroot.rect(760, 535, 20, 175);
    setBar.attr({
      fill: _this.rotationControlBackgroundColourB
    });

    var setLine = _this.sroot.line(115, 600, 670, 600);
    setLine.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6'
    });
    setLine = _this.sroot.line(670, 600, 670, 475 + _this.rotationControlCirleRadius);
    setLine.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6'
    });
    setLine = _this.sroot.line(115, 700, 770, 700);
    setLine.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6'
    });
    setLine = _this.sroot.line(770, 700, 770, 485 + _this.rotationControlCirleRadius);
    setLine.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6'
    });

    var textHeadingS = _this.sroot.text(105, 578, 'Serving');
    textHeadingS.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'14'
    });
    var textHeadingR = _this.sroot.text(110, 673, 'Receiving');
    textHeadingR.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'14'
    });
    var headingLabels = _this.sroot.group(textHeadingS, textHeadingR);

    _this.controlServeBase = _this.sroot.circle(115, 600, _this.rotationControlCirleRadius);
    _this.controlServeBase.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlServeBase.attr({ cursor: 'pointer' });
    _this.controlServeServe = _this.sroot.circle(300, 600, _this.rotationControlCirleRadius);
    _this.controlServeServe.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlServeServe.attr({ cursor: 'pointer' });
    _this.controlServeSwitch = _this.sroot.circle(485, 600, _this.rotationControlCirleRadius);
    _this.controlServeSwitch.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlServeSwitch.attr({ cursor: 'pointer' });

    _this.controlReceiveBase = _this.sroot.circle(115, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveBase.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveBase.attr({ cursor: 'pointer' });
    _this.controlReceiveReceive = _this.sroot.circle(207, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveReceive.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveReceive.attr({ cursor: 'pointer' });
    _this.controlReceiveSet = _this.sroot.circle(300, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveSet.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveSet.attr({ cursor: 'pointer' });
    _this.controlReceiveHit = _this.sroot.circle(393, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveHit.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveHit.attr({ cursor: 'pointer' });
    _this.controlReceiveSwitch = _this.sroot.circle(485, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveSwitch.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveSwitch.attr({ cursor: 'pointer' });

    var textLabel = _this.sroot.text(115, 640, 'Base');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(300, 640, 'Serve');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(485, 640, 'Switch');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });

    textLabel = _this.sroot.text(115, 740, 'Base');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(207, 740, 'Pass');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(300, 740, 'Set');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(393, 740, 'Attack');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(485, 740, 'Switch');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });

    _this.controlServeBase.click(function() {if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeBase);}});
    _this.controlServeServe.click(function() {if (move(_this.playerOffsetsServeServe[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeServe);}});
    _this.controlServeSwitch.click(function() {if (move(_this.playerOffsetsSwitchServe[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeSwitch);}});
    _this.controlReceiveBase.click(function() {if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveBase);}});
    _this.controlReceiveReceive.click(function() {if (move(_this.playerOffsetsReceiveReceive[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveReceive);}});
    _this.controlReceiveSet.click(function() {if (move(_this.playerOffsetsReceiveSet[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveSet);}});
    _this.controlReceiveHit.click(function() {if (move(_this.playerOffsetsReceiveHit[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveHit);}});
    _this.controlReceiveSwitch.click(function() {if (move(_this.playerOffsetsSwitchReceive[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveSwitch);}});
  }

  function drawTutorialButton() {
    var tutorialButtonBox = _this.sroot.rect(750, 740, 100, 40);
    tutorialButtonBox.attr({
      fill: _this.tutorialColour
    });
    var tutorialButtonText = _this.sroot.text(800, 768, 'Tutorial');
    tutorialButtonText.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22',
      cursor: 'pointer',
    });

    _this.tutorialButton = _this.sroot.group(tutorialButtonBox, tutorialButtonText);
    _this.tutorialButton.attr({ cursor: 'pointer' });

    _this.tutorialButton.click(function() {errorHandler("foo"); drawTutorial(0);});
  }

  function drawTutorial(index) {
    errorHandler("start");
    if (index >= _this.tutorialData.length) {
      errorHandler("done");
      return;
    }

    var p1 = _this.sroot.path("M0 0 H" + _this.width + "V" + _this.height + "H0Z " +
      "M" + _this.tutorialData[index].boxPosition.right + " " + _this.tutorialData[index].boxPosition.top + " " +
      "H" + _this.tutorialData[index].boxPosition.left + "V" + _this.tutorialData[index].boxPosition.bottom +
      "H" + _this.tutorialData[index].boxPosition.right + "Z");

    _this.tutorialMask = _this.sroot.group(p1);
    _this.tutorialMask.attr({
      'fill-rule': 'evenodd',
      'fill': _this.tutorialFade,
      'fill-opacity': 0.8
    });

    _this.tutorialMaskEdge = _this.sroot.rect(
      _this.tutorialData[index].boxPosition.left,
      _this.tutorialData[index].boxPosition.top,
      _this.tutorialData[index].boxPosition.right - _this.tutorialData[index].boxPosition.left,
      _this.tutorialData[index].boxPosition.bottom - _this.tutorialData[index].boxPosition.top
    );
    _this.tutorialMaskEdge.attr({
      stroke: _this.tutorialColour,
      fill: 'none'
    });

    var textBox = _this.sroot.rect(
      _this.tutorialData[index].textPosition.left,
      _this.tutorialData[index].textPosition.top,
      _this.tutorialData[index].textPosition.right - _this.tutorialData[index].textPosition.left,
      _this.tutorialData[index].textPosition.bottom - _this.tutorialData[index].textPosition.top
    );
    textBox.attr({
      fill: _this.tutorialColour
    });

    _this.tutorialTextBox = _this.sroot.group(textBox);

    var textChunks = _this.tutorialData[index].text.split('\n');
    for(var i = 0; i < textChunks.length; i++) {
      var textLine = _this.sroot.text(_this.tutorialData[index].textPosition.left + 10,
        _this.tutorialData[index].textPosition.top + 26 + (i * 20),
        textChunks[i]);
      textLine.attr({
        fill: _this.rotationControlColour,
        stroke: _this.rotationControlColour,
        strokeWidth: '1',
        'text-anchor':'left',
        'font-family': 'Verdana',
        'font-size':'16',
        cursor: 'pointer',
      });
      _this.tutorialTextBox.add(textLine);
    }

    var nextButtonBox = _this.sroot.rect(
      _this.tutorialData[index].nextPosition.left,
      _this.tutorialData[index].nextPosition.top,
      100,
      40
    );
    nextButtonBox.attr({
      fill: _this.tutorialColour
    });
    var nextButtonText = _this.sroot.text(_this.tutorialData[index].nextPosition.left + 50,
      _this.tutorialData[index].nextPosition.top + 28,
      'Next'
    );
    nextButtonText.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22',
      cursor: 'pointer',
    });

    _this.tutorialNextButton = _this.sroot.group(nextButtonBox, nextButtonText);
    _this.tutorialNextButton.attr({ cursor: 'pointer' });

    _this.tutorialNextButton.click(function() {
      _this.tutorialMask.remove();
      _this.tutorialTextBox.remove();
      _this.tutorialNextButton.remove();
      _this.tutorialMaskEdge.remove();
        drawTutorial(index+1);
    });
  }

  function createSVGDocRoot(width, height) {
    _this.moving = false;
    var svgRoot = document.createElementNS(_this.NS, 'svg');
    svgRoot.setAttribute('width', width);
    svgRoot.setAttribute('height', height);
    svgRoot.setAttribute('id', 'vbsvg');
    return svgRoot;
  }

  function createSVGDoc(options) {

    _this.width = getWidth(options);
    _this.height = getHeight(options);
    var svgRoot = createSVGDocRoot(_this.width, _this.height);

    return svgRoot;
  }

  function draw() {
    _this.sroot = Snap('#vbsvg');
    drawCourt();
    drawRotationControl();
    drawActionControl();
    drawPlayers();
    drawTutorialButton();
    initialisePlayers();
  }

  function initialisePlayers() {
    controlSelect(2, true, _this.controlServeBase);
    move(_this.playerOffsetsBase[2], 1);
    serveRotation = true;
  }

  function controlSelect(setterPos, serving, action) {
    _this.controlTwoRcv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlTwoSrv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlOneRcv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlOneSrv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlSixRcv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlSixSrv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlFiveRcv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlFiveSrv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlFourRcv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlFourSrv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlThreeRcv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlThreeSrv.attr({fill: _this.rotationControlBackgroundColourB});

    var currentControl;
    if (setterPos === 1) {
      currentControl = serving ? _this.controlOneSrv : _this.controlOneRcv;
    }
    else if (setterPos === 2) {
      currentControl = serving ? _this.controlTwoSrv : _this.controlTwoRcv;
    }
    else if (setterPos === 3) {
      currentControl = serving ? _this.controlThreeSrv : _this.controlThreeRcv;
    }
    else if (setterPos === 4) {
      currentControl = serving ? _this.controlFourSrv : _this.controlFourRcv;
    }
    else if (setterPos === 5) {
      currentControl = serving ? _this.controlFiveSrv : _this.controlFiveRcv;
    }
    else if (setterPos === 6) {
      currentControl = serving ? _this.controlSixSrv : _this.controlSixRcv;
    }

    currentControl.attr({fill: _this.rotationControlColour});
    actionSelect(action);
  }

  function actionSelect(action) {
    _this.controlServeBase.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlServeServe.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlServeSwitch.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveBase.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveReceive.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveSet.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveHit.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveSwitch.attr({fill: _this.rotationControlBackgroundColourA});
    action.attr({fill: _this.rotationControlColour});
  }

  function toggleHighlightPlayer(player) {
    if (_this.highlightedPlayer === 0) {
      _this.highlightedPlayer = player;
      _this.highlightedPlayer.attr({fill: _this.playerColourHighlight});
    }
    else if (_this.highlightedPlayer === player) {
      _this.highlightedPlayer = 0;
      player.attr({fill: _this.playerColour});
    }
    else {
      _this.highlightedPlayer.attr({
        fill: _this.playerColour
      });
      _this.highlightedPlayer = player;
      player.attr({fill: _this.playerColourHighlight});
    }
  }

  function move(players, time) {
    if (_this.moving) {
      return false;
    }
    _this.moving = true;

    _this.setter.animate({ transform:'translate(' + players.s.x + ', ' + players.s.y + ')'}, time, null, donemove);
    _this.oppo.animate({ transform:'translate(' + players.o.x + ', ' + players.o.y + ')'}, time, null, donemove);
    _this.m1.animate({ transform:'translate(' + players.m1.x + ', ' + players.m1.y + ')'}, time, null, donemove);
    _this.m2.animate({ transform:'translate(' + players.m2.x + ', ' + players.m2.y + ')'}, time, null, donemove);
    _this.h1.animate({ transform:'translate(' + players.h1.x + ', ' + players.h1.y + ')'}, time, null, donemove);
    _this.h2.animate({ transform:'translate(' + players.h2.x + ', ' + players.h2.y + ')'}, time, null, donemove);
    return true;
  }
//  function goback() {
//    _this.setter.animate({ transform:'translate(0, 0)'}, 1000, null, donemove);
//  }
  function donemove() {
    _this.moving = false;
  }

  // Privileged methods
  this.setErrorHandler = function(handler) {
    errorHandler.call(this, handler);
  };

  this.createSVG = function(options) {
    return createSVGDoc.call(this, options);
  };

  this.draw = function() {
    return draw.call(this);
  };
}
