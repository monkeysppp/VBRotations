// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

const vbRotations = function (options = {}) {
  const _this = this

  /*
   * We have an internal coordinate system that defines the court as 900 x 900 "units",
   * which simplifies creating the player position detail as being within that (0,0)-(900,900) box.
   * This scaling means that the diagram is 1800x1600 units, with the court drawn
   * from (150,100 * this.svg.scale) top-left to (1050x1000) bottom-right.
   *
   * There is therefore a scaling factor of {width} / 1800.
   * The image itself defaults to 900 pixels wide, with the height being set to 8/9 * {width}
   * We could use a transformation, but I'd rather have the final SVG to be "clean"
   */

  const svgWidth = (options.svg && typeof options.svg.width === 'number') ? options.svg.width : 900
  this.svg = {
    NS: 'http://www.w3.org/2000/svg',
    sroot: undefined,
    width: svgWidth,
    height: svgWidth * (8 / 9),
    scale: svgWidth / 1800,
    rotationControlCirleRadius: svgWidth * (24 / 1800)
  }

  this.colours = {
    backgroundColour: (options.colours && typeof options.colours.backgroundColour === 'string') ? options.colours.backgroundColour : '#85d6ff',
    courtColour: (options.colours && typeof options.colours.courtColour === 'string') ? options.colours.courtColour : '#ffb591',
    lineColour: (options.colours && typeof options.colours.lineColour === 'string') ? options.colours.lineColour : 'white',
    playerOutlineColour: (options.colours && typeof options.colours.playerOutlineColour === 'string') ? options.colours.playerOutlineColour : '#f5f5f5',
    playerColour: (options.colours && typeof options.colours.playerColour === 'string') ? options.colours.playerColour : '#efa581',
    playerColourHighlight: (options.colours && typeof options.colours.playerColourHighlight === 'string') ? options.colours.playerColourHighlight : '#66dd66',
    rotationControlColour: (options.colours && typeof options.colours.rotationControlColour === 'string') ? options.colours.rotationControlColour : '#ffffff',
    rotationControlHighlightColour: (options.colours && typeof options.colours.rotationControlHighlightColour === 'string') ? options.colours.rotationControlHighlightColour : '#dddddd',
    rotationControlBackgroundColourA: (options.colours && typeof options.colours.rotationControlBackgroundColourA === 'string') ? options.colours.rotationControlBackgroundColourA : '#65b6df',
    rotationControlBackgroundColourB: (options.colours && typeof options.colours.rotationControlBackgroundColourB === 'string') ? options.colours.rotationControlBackgroundColourB : '#4596bf',
    tutorialColour: (options.colours && typeof options.colours.tutorialColour === 'string') ? options.colours.tutorialColour : '#44cc44',
    tutorialFade: (options.colours && typeof options.colours.tutorialFade === 'string') ? options.colours.tutorialFade : '#999999',
  }

  this.text = {
    'en': {
      players: { s: 'S', o: 'O', m1: 'M1', m2: 'M2', h1: 'H1', h2: 'H2'},
      rotationControl: { serving: 'Serving', receiving: 'Receiving', s1: 'Setter at 1', s2: 'Setter at 2', s3: 'Setter at 3', s4: 'Setter at 4', s5: 'Setter at 5', s6: 'Setter at 6' },
      actionControl: { base: 'Base', serve: 'Serve', set: 'Set', switch: 'Switch', pass: 'Pass', attack: 'Attack' },
      tutorial: [
        'Next',
        'This is a player. Click to highlight it.\n\nH=Hitter, M=Middle, S=Setter, \nO=Opposite',
        'This is the court, with all 6 players.\nAs you click the buttons, the players\n will move round the court',
        'This lets you select the rotations.\nClick the circle to change rotation.\nEach one is labelled with the\nsetter\'s position',
        'These are for when you are serving',
        'These are for when you are\nreceiving',
        'Moving from circle to circle makes\n you rotate like in a match',
        'This lets you select the phase of\n the rally.  The players will then\nmove around the court',
        'These show the player positions\n when your side is serving',
        'These show the player positions\n when your side is receiving',
      ]
    },
    'it': {
      players: { s: 'P', o: 'O', m1: 'C1', m2: 'C2', h1: 'S1', h2: 'S2'},
      rotationControl: { serving: 'Servizio', receiving: 'Ricezione', s1: 'P1', s2: 'P2', s3: 'P3', s4: 'P4', s5: 'P5', s6: 'P6' },
      actionControl: { base: 'Base', serve: 'Servizio', set: 'Alzata', switch: 'Cambio', pass: 'Ricezione', attack: 'Attacco' },
      tutorial: [
        'Avanti',
        'Questo è un giocatore.\nSi seleziona con un clic.\nS=Schiacciatore, C=Centrale,\n P=Palleggiatore, O=Opposto',
        'Questo è in campo con tutti e\n 6 i giocatori.\nAl clic sui bottoni, i giocatori\n si muoveranno intorno al campo',
        'Questo ti permette di scegliere\nla formazione di partenza.\nIl clic sul cerchio cambia la rotazione.\nOgni rotazione è etichettata con la\nposizione dell\'alzatore (P)',
        'Questo mostra la situazione in cui\nla squadra è al servizio',
        'Questo mostra la situazione in cui\nla squadra è in ricezione',
        'Spostandosi da un cerchio ad un\nsi simulano le rotazioni come\ndurante una gara',
        'Da qui si selezionano le situazioni\n di gioco.\nI giocatori si muoveranno nel campo\ndi conseguenza',
        'Qui si hanno le posizioni dei\n giocatori quando la squadra\n è al servizio',
        'Qui si hanno le posizioni dei\n giocatori quando la squadra\n è in ricezione',
      ]
    },
    'fr': {

    },
    'pl': {

    },
    'nl': {

    },
    'de': {

    },
    'es': {

    }
  }

  this.language = (typeof options.language === 'string' && Object.keys(this.text).includes(options.language) ) ? options.language : 'en'

  this.players = {
    s: { label: this.text[this.language].players.s },
    h1: { label: this.text[this.language].players.h1 },
    m2: { label: this.text[this.language].players.m2 },
    o: { label: this.text[this.language].players.o },
    h2: { label: this.text[this.language].players.h2 },
    m1: { label: this.text[this.language].players.m1 },
    highlightedPlayer: 0,
    positions: {
      base: {
        1: {
          s:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale },
          h1: { x: 700 * this.svg.scale, y: 100 * this.svg.scale },
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale },
          o:  { x: 200 * this.svg.scale, y: 100 * this.svg.scale },
          h2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale },
          m2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale }
        },
        2: {
          m2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale },
          s:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale },
          h1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale },
          m1: { x: 200 * this.svg.scale, y: 100 * this.svg.scale },
          o:  { x: 200 * this.svg.scale, y: 600 * this.svg.scale },
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale }
        },
        3: {
          h2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale },
          m2: { x: 700 * this.svg.scale, y: 100 * this.svg.scale },
          s:  { x: 450 * this.svg.scale, y: 100 * this.svg.scale },
          h1: { x: 200 * this.svg.scale, y: 100 * this.svg.scale },
          m1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale },
          o:  { x: 450 * this.svg.scale, y: 700 * this.svg.scale }
        },
        4: {
          o:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale },
          h2: { x: 700 * this.svg.scale, y: 100 * this.svg.scale },
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale },
          s:  { x: 200 * this.svg.scale, y: 100 * this.svg.scale },
          h1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale },
          m1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale }
        },
        5: {
          m1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale },
          o:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale },
          h2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale },
          m2: { x: 200 * this.svg.scale, y: 100 * this.svg.scale },
          s:  { x: 200 * this.svg.scale, y: 600 * this.svg.scale },
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale }
        },
        6: {
          h1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale },
          m1: { x: 700 * this.svg.scale, y: 100 * this.svg.scale },
          o:  { x: 450 * this.svg.scale, y: 100 * this.svg.scale },
          h2: { x: 200 * this.svg.scale, y: 100 * this.svg.scale },
          m2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale },
          s:  { x: 450 * this.svg.scale, y: 700 * this.svg.scale }
        }
      },
      serveServe: {
        1: {
          s:  { x: 700 * this.svg.scale, y: 950 * this.svg.scale},
          h1: { x: 580 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 320 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        2: {
          m2: { x: 700 * this.svg.scale, y: 950 * this.svg.scale},
          s:  { x: 580 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 320 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        3: {
          h2: { x: 700 * this.svg.scale, y: 950 * this.svg.scale},
          m2: { x: 580 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 320 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          o:  { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        4: {
          o:  { x: 700 * this.svg.scale, y: 950 * this.svg.scale},
          h2: { x: 580 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 320 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        5: {
          m1: { x: 700 * this.svg.scale, y: 950 * this.svg.scale},
          o:  { x: 580 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 320 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        6: {
          h1: { x: 700 * this.svg.scale, y: 950 * this.svg.scale},
          m1: { x: 580 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 320 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          s:  { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        }
      },
      switchServe: {
        1: {
          s:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          h1: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale}
        },
        2: {
          m2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        3: {
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          o:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        },
        4: {
          o:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale}
        },
        5: {
          m1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          o:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        6: {
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        }
      },
      switchReceive: {
        1: {
          s:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          h1: { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale}
        },
        2: {
          m2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        3: {
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          o:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        },
        4: {
          o:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale}
        },
        5: {
          m1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          o:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        6: {
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        }
      },
      receiveReceive: {
        1: {
          s:  { x: 800 * this.svg.scale, y: 170 * this.svg.scale},
          h1: { x: 840 * this.svg.scale, y: 60 * this.svg.scale},
          m1: { x: 760 * this.svg.scale, y: 280 * this.svg.scale},
          o:  { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        },
        2: {
          m2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          s:  { x: 700 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          m1: { x: 40 * this.svg.scale, y: 160 * this.svg.scale},
          o:  { x: 260 * this.svg.scale, y: 840 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        3: {
          h2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          m2: { x: 740 * this.svg.scale, y: 140 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          o:  { x: 560 * this.svg.scale, y: 820 * this.svg.scale}
        },
        4: {
          o:  { x: 760 * this.svg.scale, y: 820 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          m2: { x: 140 * this.svg.scale, y: 140 * this.svg.scale},
          s:  { x: 60 * this.svg.scale, y: 60 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        },
        5: {
          m1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          o:  { x: 840 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          m2: { x: 60 * this.svg.scale, y: 60 * this.svg.scale},
          s:  { x: 240 * this.svg.scale, y: 140 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        6: {
          h1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          m1: { x: 700 * this.svg.scale, y: 140 * this.svg.scale},
          o:  { x: 560 * this.svg.scale, y: 60 * this.svg.scale},
          h2: { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          s:  { x: 510 * this.svg.scale, y: 170 * this.svg.scale}
        }
      },
      receiveSet: {
        1: {
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 900 * this.svg.scale, y: 300 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 300 * this.svg.scale},
          o:  { x: 0,   y: 300 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        },
        2: {
          m2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 0,   y: 300 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 300 * this.svg.scale},
          o:  { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        3: {
          h2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 300 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 0,   y: 300 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          o:  { x: 560 * this.svg.scale, y: 820 * this.svg.scale}
        },
        4: {
          o:  { x: 760 * this.svg.scale, y: 820 * this.svg.scale},
          h2: { x: 0,   y: 300 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 300 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        },
        5: {
          m1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          o:  { x: 900 * this.svg.scale, y: 300 * this.svg.scale},
          h2: { x: 0,   y: 300 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 300 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        6: {
          h1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 300 * this.svg.scale},
          o:  { x: 900 * this.svg.scale, y: 300 * this.svg.scale},
          h2: { x: 0,   y: 300 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale}
        }
      },
      receiveHit: {
        1: {
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 800 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 100 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        },
        2: {
          m2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 100 * this.svg.scale,  y: 100 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 200 * this.svg.scale, y: 600 * this.svg.scale},
          h2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        3: {
          h2: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          m2: { x: 450 * this.svg.scale,  y: 100 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 100 * this.svg.scale, y: 100 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          o:  { x: 560 * this.svg.scale, y: 820 * this.svg.scale}
        },
        4: {
          o:  { x: 760 * this.svg.scale, y: 820 * this.svg.scale},
          h2: { x: 100 * this.svg.scale, y: 100 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          m1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale}
        },
        5: {
          m1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          o:  { x: 800 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 100 * this.svg.scale,  y: 100 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale},
          h1: { x: 450 * this.svg.scale, y: 700 * this.svg.scale}
        },
        6: {
          h1: { x: 700 * this.svg.scale, y: 600 * this.svg.scale},
          m1: { x: 450 * this.svg.scale, y: 100 * this.svg.scale},
          o:  { x: 800 * this.svg.scale, y: 100 * this.svg.scale},
          h2: { x: 100 * this.svg.scale,  y: 100 * this.svg.scale},
          m2: { x: 450 * this.svg.scale, y: 700 * this.svg.scale},
          s:  { x: 600 * this.svg.scale, y: 100 * this.svg.scale}
        }
      },
    }
  }

  this.tutorialData = [
    {
      boxPosition: {
        left:   500 * this.svg.scale,
        right:  700 * this.svg.scale,
        top:    700 * this.svg.scale,
        bottom: 900 * this.svg.scale,
      },
      textPosition: {
        left:   750 * this.svg.scale,
        right:  1370 * this.svg.scale,
        top:    700 * this.svg.scale,
        bottom: 900 * this.svg.scale,
      },
      text: this.text[this.language].tutorial[1],
      nextPosition: {
        left: 1170 * this.svg.scale,
        top:  950 * this.svg.scale,
      },
    },
    {
      boxPosition: {
        left:   150 * this.svg.scale,
        right:  1050 * this.svg.scale,
        top:    100 * this.svg.scale,
        bottom: 1000 * this.svg.scale,
      },
      textPosition: {
        left:   1100 * this.svg.scale,
        right:  1720 * this.svg.scale,
        top:    400 * this.svg.scale,
        bottom: 600 * this.svg.scale,
      },
      text: this.text[this.language].tutorial[2],
      nextPosition: {
        left: 1520 * this.svg.scale,
        top:  650 * this.svg.scale,
      },
    },
    {
      boxPosition: {
        left:   1260 * this.svg.scale,
        right:  1760 * this.svg.scale,
        top:    50 * this.svg.scale,
        bottom: 1070 * this.svg.scale,
      },
      textPosition: {
        left:   590 * this.svg.scale,
        right:  1210 * this.svg.scale,
        top:    50 * this.svg.scale,
        bottom: 270 * this.svg.scale,
      },
      text: this.text[this.language].tutorial[3],
      nextPosition: {
        left: 1010 * this.svg.scale,
        top:  300 * this.svg.scale,
      },
    },
    {
      boxPosition: {
        left:   1260 * this.svg.scale,
        right:  1440 * this.svg.scale,
        top:    50 * this.svg.scale,
        bottom: 1070 * this.svg.scale,
      },
      textPosition: {
        left:   590 * this.svg.scale,
        right:  1210 * this.svg.scale,
        top:    150 * this.svg.scale,
        bottom: 350 * this.svg.scale,
      },
      text: this.text[this.language].tutorial[4],
      nextPosition: {
        left: 1010 * this.svg.scale,
        top:  400 * this.svg.scale,
      },
    },
    {
      boxPosition: {
        left:   1440 * this.svg.scale,
        right:  1620 * this.svg.scale,
        top:    50 * this.svg.scale,
        bottom: 1070 * this.svg.scale,
      },
      textPosition: {
        left:   590 * this.svg.scale,
        right:  1210 * this.svg.scale,
        top:    250 * this.svg.scale,
        bottom: 450 * this.svg.scale,
      },
      text: this.text[this.language].tutorial[5],
      nextPosition: {
        left: 1010 * this.svg.scale,
        top:  500 * this.svg.scale,
      },
    },
    {
      boxPosition: {
        left:   1260 * this.svg.scale,
        right:  1620 * this.svg.scale,
        top:    50 * this.svg.scale,
        bottom: 1070 * this.svg.scale,
      },
      textPosition: {
        left:   590 * this.svg.scale,
        right:  1210 * this.svg.scale,
        top:    350 * this.svg.scale,
        bottom: 550 * this.svg.scale,
      },
      text: this.text[this.language].tutorial[6],
      nextPosition: {
        left: 1010 * this.svg.scale,
        top:  600 * this.svg.scale,
      },
    },
    {
      boxPosition: {
        left:   140 * this.svg.scale,
        right:  1076 * this.svg.scale,
        top:    1120 * this.svg.scale,
        bottom: 1510 * this.svg.scale,
      },
      textPosition: {
        left:   150 * this.svg.scale,
        right:  770 * this.svg.scale,
        top:    880 * this.svg.scale,
        bottom: 1080 * this.svg.scale,
      },
      text: this.text[this.language].tutorial[7],
      nextPosition: {
        left: 820 * this.svg.scale,
        top:  1000 * this.svg.scale,
      },
    },
    {
      boxPosition: {
        left:   140 * this.svg.scale,
        right:  1076 * this.svg.scale,
        top:    1120 * this.svg.scale,
        bottom: 1314 * this.svg.scale,
      },
      textPosition: {
        left:   200 * this.svg.scale,
        right:  820 * this.svg.scale,
        top:    880 * this.svg.scale,
        bottom: 1080 * this.svg.scale,
      },
      text: this.text[this.language].tutorial[8],
      nextPosition: {
        left: 870 * this.svg.scale,
        top:  1000 * this.svg.scale,
      },
    },
    {
      boxPosition: {
        left:   140 * this.svg.scale,
        right:  1076 * this.svg.scale,
        top:    1316 * this.svg.scale,
        bottom: 1510 * this.svg.scale,
      },
      textPosition: {
        left:   250 * this.svg.scale,
        right:  870 * this.svg.scale,
        top:    880 * this.svg.scale,
        bottom: 1080 * this.svg.scale,
      },
      text: this.text[this.language].tutorial[9],
      nextPosition: {
        left: 920 * this.svg.scale,
        top:  1000 * this.svg.scale,
      },
    },
  ]

  this.state = {
    moving: false,
    setterAt: 2
  }

  this.draw = function () {
    this.svg.sroot = Snap('#vbsvg')
    this.drawCourt()
    this.drawRotationControl()
    this.drawActionControl()
    this.drawPlayers()
    this.drawTutorialButton()
    this.initialisePlayers()
  }

  this.drawCourt = function () {
    const background = this.svg.sroot.rect(0, 0, this.svg.width, this.svg.height)
    background.attr({
      fill: this.colours.backgroundColour,
    })
    const outerLines = this.svg.sroot.rect(150 * this.svg.scale, 100 * this.svg.scale, 900 * this.svg.scale, 900 * this.svg.scale)
    outerLines.attr({
      fill: this.colours.courtColour,
      stroke: this.colours.lineColour,
      strokeWidth: 8 * this.svg.scale,
    })
    const centreLine = this.svg.sroot.line(120 * this.svg.scale, 100 * this.svg.scale, 1080 * this.svg.scale, 100 * this.svg.scale)
    centreLine.attr({
      stroke: this.colours.lineColour,
      strokeWidth: 8 * this.svg.scale,
    })
    const attackLine = this.svg.sroot.line(150 * this.svg.scale, 400 * this.svg.scale, 1050 * this.svg.scale, 400 * this.svg.scale)
    attackLine.attr({
      stroke: this.colours.lineColour,
      strokeWidth: 8 * this.svg.scale,
    })
    const leftTicks = this.svg.sroot.line(20 * this.svg.scale, 400 * this.svg.scale, 150 * this.svg.scale, 400 * this.svg.scale)
    leftTicks.attr({
      stroke: this.colours.lineColour,
      strokeWidth: 8 * this.svg.scale,
      'stroke-dasharray': (18 * this.svg.scale) + ', ' + (18 * this.svg.scale)
    })
    const rightTicks = this.svg.sroot.line(1050 * this.svg.scale, 400 * this.svg.scale, 1180 * this.svg.scale, 400 * this.svg.scale)
    rightTicks.attr({
      stroke: this.colours.lineColour,
      strokeWidth: 8 * this.svg.scale,
      'stroke-dasharray': (18 * this.svg.scale) + ', ' + (18 * this.svg.scale),
    })
  }

  this.drawRotationControl = function () {
    const vOffset1 = 20 * this.svg.scale
    const vOffset2 = 140 * this.svg.scale

    const box1 = this.svg.sroot.rect(0 * this.svg.scale, 0 * this.svg.scale, 500 * this.svg.scale, 60 * this.svg.scale)
    box1.attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box2 = this.svg.sroot.rect(0 * this.svg.scale, 60 * this.svg.scale, 500 * this.svg.scale, 160 * this.svg.scale)
    box2.attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box3 = this.svg.sroot.rect(0 * this.svg.scale, 60 * this.svg.scale + (1 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 160 * this.svg.scale)
    box3.attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box4 = this.svg.sroot.rect(0 * this.svg.scale, 60 * this.svg.scale + (2 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 160 * this.svg.scale)
    box4.attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box5 = this.svg.sroot.rect(0 * this.svg.scale, 60 * this.svg.scale + (3 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 160 * this.svg.scale)
    box5.attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box6 = this.svg.sroot.rect(0 * this.svg.scale, 60 * this.svg.scale + (4 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 160 * this.svg.scale)
    box6.attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box7 = this.svg.sroot.rect(0 * this.svg.scale, 60 * this.svg.scale + (5 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 160 * this.svg.scale)
    box7.attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const backgroundBoxes = this.svg.sroot.group(box1, box2, box3, box4, box5, box6, box7)

    const textHeadingS = this.svg.sroot.text(80 * this.svg.scale, 40 * this.svg.scale, this.text[this.language].rotationControl.serving)
    textHeadingS.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textHeadingR = this.svg.sroot.text(280 * this.svg.scale, 40 * this.svg.scale, this.text[this.language].rotationControl.receiving)
    textHeadingR.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const headingLabels = this.svg.sroot.group(textHeadingS, textHeadingR)

    const textLabel2 = this.svg.sroot.text(480 * this.svg.scale, 100 * this.svg.scale, this.text[this.language].rotationControl.s2)
    textLabel2.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel1 = this.svg.sroot.text(480 * this.svg.scale, 100 * this.svg.scale + (1 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s1)
    textLabel1.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel6 = this.svg.sroot.text(480 * this.svg.scale, 100 * this.svg.scale + (2 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s6)
    textLabel6.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel5 = this.svg.sroot.text(480 * this.svg.scale, 100 * this.svg.scale + (3 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s5)
    textLabel5.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel4 = this.svg.sroot.text(480 * this.svg.scale, 100 * this.svg.scale + (4 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s4)
    textLabel4.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel3 = this.svg.sroot.text(480 * this.svg.scale, 100 * this.svg.scale + (5 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s3)
    textLabel3.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const rotationLabels = this.svg.sroot.group(textLabel1, textLabel2, textLabel3, textLabel4, textLabel5, textLabel6)

    const joinLine1 = this.svg.sroot.line(80 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1))
    joinLine1.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
        'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine2 = this.svg.sroot.line(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), 80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2))
    joinLine2.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine3 = this.svg.sroot.line(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2))
    joinLine3.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine4 = this.svg.sroot.line(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2))
    joinLine4.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine5 = this.svg.sroot.line(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2))
    joinLine5.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine6 = this.svg.sroot.line(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2))
    joinLine6.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine7 = this.svg.sroot.line(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2))
    joinLine7.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine8 = this.svg.sroot.line(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2))
    joinLine8.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine9 = this.svg.sroot.line(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2))
    joinLine9.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine10 = this.svg.sroot.line(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2))
    joinLine10.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine11 = this.svg.sroot.line(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2))
    joinLine11.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLines = this.svg.sroot.group(joinLine1, joinLine2, joinLine3, joinLine4, joinLine5, joinLine6, joinLine7, joinLine8, joinLine9, joinLine10, joinLine11)

    const setLineS = this.svg.sroot.line(80 * this.svg.scale, 100 * this.svg.scale, 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2))
    setLineS.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale,
    })
    const setLineR = this.svg.sroot.line(280 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2))
    setLineR.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale,
    })
    const setLines = this.svg.sroot.group(setLineS, setLineR)

    this.controlTwoSrv = this.svg.sroot.circle(80 * this.svg.scale, 100 * this.svg.scale, this.svg.rotationControlCirleRadius)
    this.controlTwoSrv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
    })
    this.controlTwoSrv.attr({ cursor: 'pointer' })
    this.controlTwoRcv = this.svg.sroot.circle(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), this.svg.rotationControlCirleRadius)
    this.controlTwoRcv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
    })
    this.controlTwoRcv.attr({ cursor: 'pointer' })

    this.controlOneSrv = this.svg.sroot.circle(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlOneSrv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
    })
    this.controlOneSrv.attr({ cursor: 'pointer' })
    this.controlOneRcv = this.svg.sroot.circle(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlOneRcv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
    })
    this.controlOneRcv.attr({ cursor: 'pointer' })

    this.controlSixSrv = this.svg.sroot.circle(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlSixSrv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
    })
    this.controlSixSrv.attr({ cursor: 'pointer' })
    this.controlSixRcv = this.svg.sroot.circle(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlSixRcv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
    })
    this.controlSixRcv.attr({ cursor: 'pointer' })

    this.controlFiveSrv = this.svg.sroot.circle(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlFiveSrv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
    })
    this.controlFiveSrv.attr({ cursor: 'pointer' })
    this.controlFiveRcv = this.svg.sroot.circle(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlFiveRcv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
    })
    this.controlFiveRcv.attr({ cursor: 'pointer' })

    this.controlFourSrv = this.svg.sroot.circle(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlFourSrv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
    })
    this.controlFourSrv.attr({ cursor: 'pointer' })
    this.controlFourRcv = this.svg.sroot.circle(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlFourRcv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
    })
    this.controlFourRcv.attr({ cursor: 'pointer' })

    this.controlThreeSrv = this.svg.sroot.circle(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlThreeSrv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
    })
    this.controlThreeSrv.attr({ cursor: 'pointer' })
    this.controlThreeRcv = this.svg.sroot.circle(280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlThreeRcv.attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
    })
    this.controlThreeRcv.attr({ cursor: 'pointer' })
    const controlCircles = this.svg.sroot.group(this.controlOneSrv, this.controlTwoSrv, this.controlThreeSrv, this.controlFourSrv, this.controlFiveSrv, this.controlSixSrv,
        this.controlOneRcv, this.controlTwoRcv, this.controlThreeRcv, this.controlFourRcv, this.controlFiveRcv, this.controlSixRcv)

    this.controlTwoRcv.click(() => {_this.state.setterAt = 2;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveBase);}})
    this.controlTwoSrv.click(() => {_this.state.setterAt = 2;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, true, _this.controlServeBase);}})
    this.controlOneRcv.click(() => {_this.state.setterAt = 1;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveBase);}})
    this.controlOneSrv.click(() => {_this.state.setterAt = 1;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, true, _this.controlServeBase);}})
    this.controlSixRcv.click(() => {_this.state.setterAt = 6;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveBase);}})
    this.controlSixSrv.click(() => {_this.state.setterAt = 6;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, true, _this.controlServeBase);}})
    this.controlFiveRcv.click(() => {_this.state.setterAt = 5;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveBase);}})
    this.controlFiveSrv.click(() => {_this.state.setterAt = 5;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, true, _this.controlServeBase);}})
    this.controlFourRcv.click(() => {_this.state.setterAt = 4;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveBase);}})
    this.controlFourSrv.click(() => {_this.state.setterAt = 4;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, true, _this.controlServeBase);}})
    this.controlThreeRcv.click(() => {_this.state.setterAt = 3;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveBase);}})
    this.controlThreeSrv.click(() => {_this.state.setterAt = 3;if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 * _this.svg.scale)) {_this.controlSelect(_this.state.setterAt, true, _this.controlServeBase);}})

    this.rotationControls = this.svg.sroot.group(backgroundBoxes, headingLabels, rotationLabels, joinLines, setLines, controlCircles)

    this.rotationControls.transform('t' + 1260 * this.svg.scale + ', ' + 50 * this.svg.scale)
  }

  this.drawActionControl = function () {
    const serveBox1 = this.svg.sroot.rect(140 * this.svg.scale, 1120 * this.svg.scale, 188 * this.svg.scale, 190 * this.svg.scale)
    serveBox1.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const serveBox2 = this.svg.sroot.rect(328 * this.svg.scale, 1120 * this.svg.scale, 188 * this.svg.scale, 190 * this.svg.scale)
    serveBox2.attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const serveBox3 = this.svg.sroot.rect(516 * this.svg.scale, 1120 * this.svg.scale, 188 * this.svg.scale, 190 * this.svg.scale)
    serveBox3.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const serveBox4 = this.svg.sroot.rect(700 * this.svg.scale, 1120 * this.svg.scale, 184 * this.svg.scale, 190 * this.svg.scale)
    serveBox4.attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const serveBox5 = this.svg.sroot.rect(884 * this.svg.scale, 1120 * this.svg.scale, 192 * this.svg.scale, 190 * this.svg.scale)
    serveBox5.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })

    const receiveBox1 = this.svg.sroot.rect(140 * this.svg.scale, 1310 * this.svg.scale, 188 * this.svg.scale, 200 * this.svg.scale)
    receiveBox1.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const receiveBox2 = this.svg.sroot.rect(328 * this.svg.scale, 1310 * this.svg.scale, 188 * this.svg.scale, 200 * this.svg.scale)
    receiveBox2.attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const receiveBox3 = this.svg.sroot.rect(516 * this.svg.scale, 1310 * this.svg.scale, 188 * this.svg.scale, 200 * this.svg.scale)
    receiveBox3.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const receiveBox4 = this.svg.sroot.rect(700 * this.svg.scale, 1310 * this.svg.scale, 184 * this.svg.scale, 200 * this.svg.scale)
    receiveBox4.attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const receiveBox5 = this.svg.sroot.rect(884 * this.svg.scale, 1310 * this.svg.scale, 192 * this.svg.scale, 200 * this.svg.scale)
    receiveBox5.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })

    let setBar = this.svg.sroot.rect(1076 * this.svg.scale, 1180 * this.svg.scale, 284 * this.svg.scale, 40 * this.svg.scale)
    setBar.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    setBar = this.svg.sroot.rect(1320 * this.svg.scale, 1070 * this.svg.scale, 40 * this.svg.scale, 150 * this.svg.scale)
    setBar.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    setBar = this.svg.sroot.rect(1076 * this.svg.scale, 1380 * this.svg.scale, 484 * this.svg.scale, 40 * this.svg.scale)
    setBar.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    setBar = this.svg.sroot.rect(1520 * this.svg.scale, 1070 * this.svg.scale, 40 * this.svg.scale, 350 * this.svg.scale)
    setBar.attr({
      fill: this.colours.rotationControlBackgroundColourB
    })

    let setLine = this.svg.sroot.line(230 * this.svg.scale, 1200 * this.svg.scale, 1340 * this.svg.scale, 1200 * this.svg.scale)
    setLine.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    setLine = this.svg.sroot.line(1340 * this.svg.scale, 1200 * this.svg.scale, 1340 * this.svg.scale, 950 * this.svg.scale + this.svg.rotationControlCirleRadius)
    setLine.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    setLine = this.svg.sroot.line(230 * this.svg.scale, 1400 * this.svg.scale, 1540 * this.svg.scale, 1400 * this.svg.scale)
    setLine.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    setLine = this.svg.sroot.line(1540 * this.svg.scale, 1400 * this.svg.scale, 1540 * this.svg.scale, 970 * this.svg.scale + this.svg.rotationControlCirleRadius)
    setLine.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })

    const textHeadingS = this.svg.sroot.text(210 * this.svg.scale, 1156 * this.svg.scale, this.text[this.language].rotationControl.serving)
    textHeadingS.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale
    })
    const textHeadingR = this.svg.sroot.text(220 * this.svg.scale, 1346 * this.svg.scale, this.text[this.language].rotationControl.receiving)
    textHeadingR.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale
    })
    const headingLabels = this.svg.sroot.group(textHeadingS, textHeadingR)

    this.controlServeBase = this.svg.sroot.circle(230 * this.svg.scale, 1200 * this.svg.scale, this.svg.rotationControlCirleRadius)
    this.controlServeBase.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA
    })
    this.controlServeBase.attr({ cursor: 'pointer' })
    this.controlServeServe = this.svg.sroot.circle(600 * this.svg.scale, 1200 * this.svg.scale, this.svg.rotationControlCirleRadius)
    this.controlServeServe.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA
    })
    this.controlServeServe.attr({ cursor: 'pointer' })
    this.controlServeSwitch = this.svg.sroot.circle(970 * this.svg.scale, 1200 * this.svg.scale, this.svg.rotationControlCirleRadius)
    this.controlServeSwitch.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA
    })
    this.controlServeSwitch.attr({ cursor: 'pointer' })

    this.controlReceiveBase = this.svg.sroot.circle(230 * this.svg.scale, 1400 * this.svg.scale, this.svg.rotationControlCirleRadius)
    this.controlReceiveBase.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA
    })
    this.controlReceiveBase.attr({ cursor: 'pointer' })
    this.controlReceiveReceive = this.svg.sroot.circle(414 * this.svg.scale, 1400 * this.svg.scale, this.svg.rotationControlCirleRadius)
    this.controlReceiveReceive.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA
    })
    this.controlReceiveReceive.attr({ cursor: 'pointer' })
    this.controlReceiveSet = this.svg.sroot.circle(600 * this.svg.scale, 1400 * this.svg.scale, this.svg.rotationControlCirleRadius)
    this.controlReceiveSet.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA
    })
    this.controlReceiveSet.attr({ cursor: 'pointer' })
    this.controlReceiveHit = this.svg.sroot.circle(786 * this.svg.scale, 1400 * this.svg.scale, this.svg.rotationControlCirleRadius)
    this.controlReceiveHit.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA
    })
    this.controlReceiveHit.attr({ cursor: 'pointer' })
    this.controlReceiveSwitch = this.svg.sroot.circle(970 * this.svg.scale, 1400 * this.svg.scale, this.svg.rotationControlCirleRadius)
    this.controlReceiveSwitch.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA
    })
    this.controlReceiveSwitch.attr({ cursor: 'pointer' })

    let textLabel = this.svg.sroot.text(230 * this.svg.scale, 1280 * this.svg.scale, this.text[this.language].actionControl.base)
    textLabel.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 44 * this.svg.scale
    })
    textLabel = this.svg.sroot.text(600 * this.svg.scale, 1280 * this.svg.scale, this.text[this.language].actionControl.serve)
    textLabel.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 44 * this.svg.scale
    })
    textLabel = this.svg.sroot.text(970 * this.svg.scale, 1280 * this.svg.scale, this.text[this.language].actionControl.switch)
    textLabel.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 44 * this.svg.scale
    })

    textLabel = this.svg.sroot.text(230 * this.svg.scale, 1480 * this.svg.scale, this.text[this.language].actionControl.base)
    textLabel.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 44 * this.svg.scale
    })
    textLabel = this.svg.sroot.text(414 * this.svg.scale, 1480 * this.svg.scale, this.text[this.language].actionControl.pass)
    textLabel.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 44 * this.svg.scale
    })
    textLabel = this.svg.sroot.text(600 * this.svg.scale, 1480 * this.svg.scale, this.text[this.language].actionControl.set)
    textLabel.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 44 * this.svg.scale
    })
    textLabel = this.svg.sroot.text(786 * this.svg.scale, 1480 * this.svg.scale, this.text[this.language].actionControl.attack)
    textLabel.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 44 * this.svg.scale
    })
    textLabel = this.svg.sroot.text(970 * this.svg.scale, 1480 * this.svg.scale, this.text[this.language].actionControl.switch)
    textLabel.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 44 * this.svg.scale
    })

    this.controlServeBase.click(() => {if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 *_this.svg.scale)) {_this.controlSelect(_this.state.setterAt, true, _this.controlServeBase);}})
    this.controlServeServe.click(() => {if (_this.move(_this.players.positions.serveServe[_this.state.setterAt], 1000 *_this.svg.scale)) {_this.controlSelect(_this.state.setterAt, true, _this.controlServeServe);}})
    this.controlServeSwitch.click(() => {if (_this.move(_this.players.positions.switchServe[_this.state.setterAt], 1000 *_this.svg.scale)) {_this.controlSelect(_this.state.setterAt, true, _this.controlServeSwitch);}})
    this.controlReceiveBase.click(() => {if (_this.move(_this.players.positions.base[_this.state.setterAt], 1000 *_this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveBase);}})
    this.controlReceiveReceive.click(() => {if (_this.move(_this.players.positions.receiveReceive[_this.state.setterAt], 1000 *_this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveReceive);}})
    this.controlReceiveSet.click(() => {if (_this.move(_this.players.positions.receiveSet[_this.state.setterAt], 1000 *_this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveSet);}})
    this.controlReceiveHit.click(() => {if (_this.move(_this.players.positions.receiveHit[_this.state.setterAt], 1000 *_this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveHit);}})
    this.controlReceiveSwitch.click(() => {if (_this.move(_this.players.positions.switchReceive[_this.state.setterAt], 1000 *_this.svg.scale)) {_this.controlSelect(_this.state.setterAt, false, _this.controlReceiveSwitch);}})
  }

  this.drawPlayers = function () {
    const m1Circle = this.svg.sroot.circle(150 * this.svg.scale, 100 * this.svg.scale, 54 * this.svg.scale)
    m1Circle.attr({
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      fill: this.colours.playerColour,
    })
    const m1Label = this.svg.sroot.text(150 * this.svg.scale, 100 * this.svg.scale, this.players.m1.label)
    m1Label.attr({
      fill: this.colours.playerOutlineColour,
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size': 55 * this.svg.scale,
    })
    this.players.m1.tile = this.svg.sroot.group(m1Circle, m1Label)
    this.players.m1.tile.attr({ cursor: 'pointer' })

    const setterCircle = this.svg.sroot.circle(150 * this.svg.scale, 100 * this.svg.scale, 54 * this.svg.scale)
    setterCircle.attr({
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      fill: this.colours.playerColour,
    })
    const setterLabel = this.svg.sroot.text(150 * this.svg.scale, 100 * this.svg.scale, this.players.s.label)
    setterLabel.attr({
      fill: this.colours.playerOutlineColour,
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size': 55 * this.svg.scale,
    })
    this.players.s.tile = this.svg.sroot.group(setterCircle, setterLabel)
    this.players.s.tile.attr({ cursor: 'pointer' })

    const h1Circle = this.svg.sroot.circle(150 * this.svg.scale, 100 * this.svg.scale, 54 * this.svg.scale)
    h1Circle.attr({
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      fill: this.colours.playerColour,
    })
    const h1Label = this.svg.sroot.text(150 * this.svg.scale, 100 * this.svg.scale, this.players.h1.label)
    h1Label.attr({
      fill: this.colours.playerOutlineColour,
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size': 55 * this.svg.scale,
    })
    this.players.h1.tile = this.svg.sroot.group(h1Circle, h1Label)
    this.players.h1.tile.attr({ cursor: 'pointer' })

    const oppoCircle = this.svg.sroot.circle(150 * this.svg.scale, 100 * this.svg.scale, 54 * this.svg.scale)
    oppoCircle.attr({
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      fill: this.colours.playerColour,
    })
    const oppoLabel = this.svg.sroot.text(150 * this.svg.scale, 100 * this.svg.scale, this.players.o.label)
    oppoLabel.attr({
      fill: this.colours.playerOutlineColour,
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size': 55 * this.svg.scale,
    })
    this.players.o.tile = this.svg.sroot.group(oppoCircle, oppoLabel)
    this.players.o.tile.attr({ cursor: 'pointer' })

    const m2Circle = this.svg.sroot.circle(150 * this.svg.scale, 100 * this.svg.scale, 54 * this.svg.scale)
    m2Circle.attr({
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      fill: this.colours.playerColour,
    })
    const m2Label = this.svg.sroot.text(150 * this.svg.scale, 100 * this.svg.scale, this.players.m2.label)
    m2Label.attr({
      fill: this.colours.playerOutlineColour,
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size': 55 * this.svg.scale,
    })
    this.players.m2.tile = this.svg.sroot.group(m2Circle, m2Label)
    this.players.m2.tile.attr({ cursor: 'pointer' })

    const h2Circle = this.svg.sroot.circle(150 * this.svg.scale, 100 * this.svg.scale, 54 * this.svg.scale)
    h2Circle.attr({
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      fill: this.colours.playerColour,
    })
    const h2Label = this.svg.sroot.text(150 * this.svg.scale, 100 * this.svg.scale, this.players.h2.label)
    h2Label.attr({
      fill: this.colours.playerOutlineColour,
      stroke: this.colours.playerOutlineColour,
      strokeWidth: 5 * this.svg.scale,
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size': 55 * this.svg.scale,
    })
    this.players.h2.tile = this.svg.sroot.group(h2Circle, h2Label)
    this.players.h2.tile.attr({ cursor: 'pointer' })

    this.players.s.tile.click(() => {_this.toggleHighlightPlayer(setterCircle)})
    this.players.o.tile.click(() => {_this.toggleHighlightPlayer(oppoCircle)})
    this.players.h1.tile.click(() => {_this.toggleHighlightPlayer(h1Circle)})
    this.players.h2.tile.click(() => {_this.toggleHighlightPlayer(h2Circle)})
    this.players.m1.tile.click(() => {_this.toggleHighlightPlayer(m1Circle)})
    this.players.m2.tile.click(() => {_this.toggleHighlightPlayer(m2Circle)})
  }

  this.drawTutorialButton = function () {
    const tutorialButtonBox = this.svg.sroot.rect(1500 * this.svg.scale , 1480 * this.svg.scale, 200 * this.svg.scale, 80 * this.svg.scale)
    tutorialButtonBox.attr({
      fill: this.colours.tutorialColour
    })
    const tutorialButtonText = this.svg.sroot.text(1600 * this.svg.scale, 1536 * this.svg.scale, 'Tutorial')
    tutorialButtonText.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale,
    })

    this.tutorialButton = this.svg.sroot.group(tutorialButtonBox, tutorialButtonText)
    this.tutorialButton.attr({ cursor: 'pointer' })

    this.tutorialButton.click(() => {
      _this.drawTutorial(0)
    })
  }

  this.drawTutorial = function (index) {
    if (index >= this.tutorialData.length) {
      return
    }

    var p1 = this.svg.sroot.path("M0 0 H" + this.svg.width + "V" + this.svg.height + "H0Z " +
      "M" + this.tutorialData[index].boxPosition.right + " " + this.tutorialData[index].boxPosition.top + " " +
      "H" + this.tutorialData[index].boxPosition.left + "V" + this.tutorialData[index].boxPosition.bottom +
      "H" + this.tutorialData[index].boxPosition.right + "Z")

    this.tutorialMask = this.svg.sroot.group(p1)
    this.tutorialMask.attr({
      'fill-rule': 'evenodd',
      'fill': this.colours.tutorialFade,
      'fill-opacity': 0.8
    })

    this.tutorialMaskEdge = this.svg.sroot.rect(
      this.tutorialData[index].boxPosition.left,
      this.tutorialData[index].boxPosition.top,
      this.tutorialData[index].boxPosition.right - this.tutorialData[index].boxPosition.left,
      this.tutorialData[index].boxPosition.bottom - this.tutorialData[index].boxPosition.top
    )
    this.tutorialMaskEdge.attr({
      stroke: this.colours.tutorialColour,
      fill: 'none'
    })

    var textBox = this.svg.sroot.rect(
      this.tutorialData[index].textPosition.left,
      this.tutorialData[index].textPosition.top,
      this.tutorialData[index].textPosition.right - this.tutorialData[index].textPosition.left,
      this.tutorialData[index].textPosition.bottom - this.tutorialData[index].textPosition.top
    )
    textBox.attr({
      fill: this.colours.tutorialColour
    })

    this.tutorialTextBox = this.svg.sroot.group(textBox)

    var textChunks = this.tutorialData[index].text.split('\n')
    for(var i = 0; i < textChunks.length; i++) {
      var textLine = this.svg.sroot.text(this.tutorialData[index].textPosition.left + (10 * this.svg.scale),
        this.tutorialData[index].textPosition.top + (42 * this.svg.scale) + (i * 40 * this.svg.scale),
        textChunks[i])
      textLine.attr({
        fill: this.colours.rotationControlColour,
        stroke: this.colours.rotationControlColour,
        strokeWidth: 2  * this.svg.scale,
        'text-anchor': 'left',
        'font-family': 'Verdana',
        'font-size': 32 * this.svg.scale,
        cursor: 'pointer',
      })
      this.tutorialTextBox.add(textLine)
    }

    var nextButtonBox = this.svg.sroot.rect(
      this.tutorialData[index].nextPosition.left,
      this.tutorialData[index].nextPosition.top,
      200 * this.svg.scale,
      80 * this.svg.scale
    )
    nextButtonBox.attr({
      fill: this.colours.tutorialColour
    })
    var nextButtonText = this.svg.sroot.text(this.tutorialData[index].nextPosition.left + 100 * this.svg.scale,
      this.tutorialData[index].nextPosition.top + (56 * this.svg.scale),
      this.text[this.language].tutorial[0]
    )
    nextButtonText.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale,
      cursor: 'pointer',
    })

    this.tutorialNextButton = this.svg.sroot.group(nextButtonBox, nextButtonText)
    this.tutorialNextButton.attr({ cursor: 'pointer' })

    this.tutorialNextButton.click(() => {
      _this.tutorialMask.remove()
      _this.tutorialTextBox.remove()
      _this.tutorialNextButton.remove()
      _this.tutorialMaskEdge.remove()
      _this.drawTutorial(index+1)
    })
  }

  this.toggleHighlightPlayer = function (player) {
    if (this.players.highlightedPlayer === 0) {
      player.attr({fill: this.colours.playerColourHighlight})
      this.players.highlightedPlayer = player
    }
    else if (this.players.highlightedPlayer === player) {
      player.attr({fill: this.colours.playerColour})
      this.players.highlightedPlayer = 0
    }
    else {
      player.attr({fill: this.colours.playerColourHighlight})
      this.players.highlightedPlayer.attr({fill: this.colours.playerColour})
      this.players.highlightedPlayer = player
    }
  }

  this.initialisePlayers = function () {
    this.controlSelect(2, true, this.controlServeBase)
    this.move(this.players.positions.base[2], 1)
  }

  this.controlSelect = function (setterPos, serving, action) {
    this.controlTwoRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlTwoSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlOneRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlOneSrv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlSixRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlSixSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlFiveRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlFiveSrv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlFourRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlFourSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlThreeRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlThreeSrv.attr({fill: this.colours.rotationControlBackgroundColourB})

    let currentControl
    if (setterPos === 1) {
      currentControl = serving ? this.controlOneSrv : this.controlOneRcv
    }
    else if (setterPos === 2) {
      currentControl = serving ? this.controlTwoSrv : this.controlTwoRcv
    }
    else if (setterPos === 3) {
      currentControl = serving ? this.controlThreeSrv : this.controlThreeRcv
    }
    else if (setterPos === 4) {
      currentControl = serving ? this.controlFourSrv : this.controlFourRcv
    }
    else if (setterPos === 5) {
      currentControl = serving ? this.controlFiveSrv : this.controlFiveRcv
    }
    else if (setterPos === 6) {
      currentControl = serving ? this.controlSixSrv : this.controlSixRcv
    }

    currentControl.attr({fill: this.colours.rotationControlColour})
    this.actionSelect(action)
  }

  this.actionSelect = function (action) {
    this.controlServeBase.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlServeServe.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlServeSwitch.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveBase.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveReceive.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveSet.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveHit.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveSwitch.attr({fill: this.colours.rotationControlBackgroundColourA})
    action.attr({fill: this.colours.rotationControlColour})
  }

  this.move = function (players, time) {
    if (this.state.moving) {
      return false
    }
    this.state.moving = true

    this.players.s.tile.animate({ transform:'translate(' + players.s.x + ', ' + players.s.y + ')'}, time, null, donemove.bind(this))
    this.players.o.tile.animate({ transform:'translate(' + players.o.x + ', ' + players.o.y + ')'}, time, null, donemove.bind(this))
    this.players.m1.tile.animate({ transform:'translate(' + players.m1.x + ', ' + players.m1.y + ')'}, time, null, donemove.bind(this))
    this.players.m2.tile.animate({ transform:'translate(' + players.m2.x + ', ' + players.m2.y + ')'}, time, null, donemove.bind(this))
    this.players.h1.tile.animate({ transform:'translate(' + players.h1.x + ', ' + players.h1.y + ')'}, time, null, donemove.bind(this))
    this.players.h2.tile.animate({ transform:'translate(' + players.h2.x + ', ' + players.h2.y + ')'}, time, null, donemove.bind(this))
    return true
  }

  function donemove() {
    this.state.moving = false
  }

  this.createSVG = function () {
    this.state.moving = false
    const svgRoot = document.createElementNS(this.svg.NS, 'svg')
    svgRoot.setAttribute('width', this.svg.width)
    svgRoot.setAttribute('height', this.svg.height)
    svgRoot.setAttribute('id', 'vbsvg')
    return svgRoot
  }
}

const monkeysppp = {
  vbRotations: vbRotations
}
