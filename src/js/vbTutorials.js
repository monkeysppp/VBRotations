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

class VBTutorial {
  NS = 'http://www.w3.org/2000/svg'

  constructor (config, heightScaleFactor, courtScaleFactor) {
    const svgWidth = (typeof config.width === 'number') ? config.width : 900
    this.svg = {
      width: svgWidth,
      height: svgWidth * heightScaleFactor,
      scale: svgWidth * courtScaleFactor
    }
    console.log(`drawing ${this.svg.width} by ${this.svg.height}`)
    this.colours = {
      backgroundColour: (config.colours && typeof config.colours.backgroundColour === 'string') ? config.colours.backgroundColour : '#63b6e0',
      courtColour: (config.colours && typeof config.colours.courtColour === 'string') ? config.colours.courtColour : '#ffb591',
      lineColour: (config.colours && typeof config.colours.lineColour === 'string') ? config.colours.lineColour : 'white',
      playerOutlineColour: (config.colours && typeof config.colours.playerOutlineColour === 'string') ? config.colours.playerOutlineColour : '#f5f5f5',
      playerColour: (config.colours && typeof config.colours.playerColour === 'string') ? config.colours.playerColour : '#efa581',
      playerColourHighlight: (config.colours && typeof config.colours.playerColourHighlight === 'string') ? config.colours.playerColourHighlight : '#66dd66',
      tutorialColour: (config.colours && typeof config.colours.tutorialColour === 'string') ? config.colours.tutorialColour : '#7ec485',
      tutorialFade: (config.colours && typeof config.colours.tutorialFade === 'string') ? config.colours.tutorialFade : '#999999',
    }
    this.svg.svgRoot = document.createElementNS(this.NS, 'svg')
    this.svg.svgRoot.setAttribute('width', this.svg.width)
    this.svg.svgRoot.setAttribute('height', this.svg.height)
    this.svg.snapRoot = Snap(this.svg.svgRoot)
  }

  getSVG () {
    return this.svg.svgRoot
  }
}

class VBTutorialServeReceieve extends VBTutorial {
  /*
  * We want to use the same internal units as the court itself, which is 1100 units wide
  * and our tutorial will be 1700x1600 units, so we will have a scaling factor of
  * {image-width} / 1700, and we allow the court to be (11/17) of our width.
  *
  * The image itself defaults to 900px wide, with the height being set to 16/17 * {width}
  * We could use a transformation, but I'd rather have the final SVG to be "clean"
  */

  constructor (config) {
    super(config, (16/17), (1/1700))
    this.svg.rotationControlCirleRadius = this.svg.width * (24 / 1700)

    this.colours.rotationControlColour = (config.colours && typeof config.colours.rotationControlColour === 'string') ? config.colours.rotationControlColour : '#ffffff'
    this.colours.rotationControlHighlightColour = (config.colours && typeof config.colours.rotationControlHighlightColour === 'string') ? config.colours.rotationControlHighlightColour : '#dddddd'
    this.colours.rotationControlBackgroundColourA = (config.colours && typeof config.colours.rotationControlBackgroundColourA === 'string') ? config.colours.rotationControlBackgroundColourA : '#65b6df'
    this.colours.rotationControlBackgroundColourB = (config.colours && typeof config.colours.rotationControlBackgroundColourB === 'string') ? config.colours.rotationControlBackgroundColourB : '#4596bf'

    this.text = {
      'en': {
        players: { s: 'S', o: 'O', m2: 'M2', m1: 'M1', h1: 'H1', h2: 'H2', l: 'L'},
        rotationControl: { serving: 'Serving', receiving: 'Receiving', s1: 'Setter at 1', s2: 'Setter at 2', s3: 'Setter at 3', s4: 'Setter at 4', s5: 'Setter at 5', s6: 'Setter at 6' },
        actionControl: { servingBase: 'Base', serve: 'Serve', set: 'Set', switch: 'Switch', pass: 'Pass', attack: 'Attack' },
        tutorial: [
          'Tutorial',
          'Next',
          'This is a player. Click to highlight it.\n\nH=Hitter, M=Middle, S=Setter,\nO=Opposite, L=Libero',
          'This is the court, with all 6 players.\nAs you click the buttons, the players\n will move round the court',
          'This lets you select the rotations.\nClick the circle to change rotation.\nEach one is labeled with the\nsetter\'s position',
          'These are for when you are serving',
          'These are for when you are\nreceiving',
          'Moving from circle to circle makes\n you rotate like in a match',
          'This lets you select the phase of\n the rally.  The players will then\nmove around the court',
          'These show the player positions\n when your side is serving',
          'These show the player positions\n when your side is receiving',
        ]
      },
      'it': {
        players: { s: 'P', o: 'O', m2: 'C2', m1: 'C1', h1: 'S1', h2: 'S2', l: 'L'},
        rotationControl: { serving: 'Servizio', receiving: 'Ricezione', s1: 'P1', s2: 'P2', s3: 'P3', s4: 'P4', s5: 'P5', s6: 'P6' },
        actionControl: { servingBase: 'Base', serve: 'Servizio', set: 'Alzata', switch: 'Cambio', pass: 'Ricezione', attack: 'Attacco' },
        tutorial: [
          'Tutorial',
          'Avanti',
          'Questo è un giocatore.\nSi seleziona con un clic.\nS=Schiacciatore, C=Centrale,\n P=Palleggiatore, O=Opposton\nL=Libero',
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
        players: { s: 'Pa', o: 'Po', m2: 'C2', m1: 'C1', h1: 'A1', h2: 'A2', l: 'L'},
        rotationControl: { serving: 'Service', receiving: 'Récevoir', s1: 'Passeur a 1', s2: 'Passeur a 2', s3: 'Passeur a 3', s4: 'Passeur a 4', s5: 'Passeur a 5', s6: 'Passeur a 6' },
        actionControl: { servingBase: 'Base', serve: 'Service', set: 'Passe', switch: 'Switch', pass: 'Récevoir', attack: 'Attaque' },
        tutorial: [
          'Tutorial',
          'Next',
          'This is a player. Click to highlight it.\n\nA=Attaquant, C=Central,\nPa=Passeur, Po=Pointu\nL=Libero',
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
      'pl': {
        players: { s: 'R', o: 'A', m2: 'S2', m1: 'S1', h1: 'P1', h2: 'P2', l: 'L'},
        rotationControl: { serving: 'Serwis', receiving: 'Przyjęcie', s1: 'Rozgrywający\nna pozycji nr 1', s2: 'Rozgrywający\nna pozycji nr 2', s3: 'Rozgrywający\nna pozycji nr 3', s4: 'Rozgrywający\nna pozycji nr 4', s5: 'Rozgrywający\nna pozycji nr 5', s6: 'Rozgrywający\nna pozycji nr 6' },
        actionControl: { servingBase: 'Ustawienie\npoczątkowe', serve: 'Serwis', set: 'Rozegranie', switch: 'Przejście', pass: 'Przyjęcie', attack: 'Atak' },
        tutorial: [
          'Samouczek',
          'Następny',
          'This is a player. Click to highlight it.\n\nP=Przyjmujący, S=Środkowy,\nR=Rozgrywający, A=Atakujący\nL=Libero',
          'To jest boisko ze wszystkimi\nsześcioma graczami. Klikając w\nprzyciski sprawisz,że zawodnicy\nbędą poruszać się po boisku',
          'Tutaj możesz wybrać rotacje.\nNaciśnij na kółko, żeby zmienić\nrotację. nKażda jest oznaczona\nz pozycją rozgrywającego',
          'To są rotacje gdy serwujesz',
          'To są rotacje gdy odbierasz\nzagrywkę',
          'Poruszanie się od kółka do kółka,\npowoduje rotacje jak podczas meczu',
          'To pozwoli Ci wybrać fazę akcji.\nZawodnicy będą wtedy poruszać się\npo boisku',
          'To pokazuje pozycję zawdników,\ngdy serwujecie',
          'To pokazuje pozycję zawdników,\ngdy odbieracie zagrywkę'
        ]
      },
      'nl': {
        players: { s: 'S', o: 'D', m2: 'M2', m1: 'M1', h1: 'P1', h2: 'P2', l: 'L'},
        rotationControl: { serving: 'Serveren', receiving: 'Ontvangen', s1: 'Spelverdeler\nop 1', s2: 'Spelverdeler\nop 2', s3: 'Spelverdeler\nop 3', s4: 'Spelverdeler\nop 4', s5: 'Spelverdeler\nop 5', s6: 'Spelverdeler\nop 6' },
        actionControl: { servingBase: 'Basis', serve: 'Service', set: 'Set', switch: 'Wissel', pass: 'Pass', attack: 'Aanval' },
        tutorial: [
          'Instructies',
          'Volgende',
          'Dit is een speller. Klik om deze\nte selecteren.\n P=Passer/Loper, M=Midden,\nS=Spelverdeler, D=Diagonal,\nL=Libero',
          'Dit is het veld, met alle 6 de spelers.\nWanneer je op de knoppen drukt\nzullen de spelers zich verplaatsen\nover het veld',
          'Hier kun je de rotaties selecteren.\nKlik op de cirkel om the rotatie te\nveranderen. De positie van de setter\nwordt op de cirkels aangegeven',
          'Deze zijn voor wanneer je serveert',
          'Deze zijn voor wanneer je ontvangt',
          'Verplaatsen van cirkel naar cirkel\nlaat je roteren zoals in een\nwedstrijd',
          'Hier kun je de fase van de rally\nselecteren. De spelers verplaatsen\nzich dan over het veld',
          'Dit laat de positie van de spelers zien\nwanneer jouw kant serveert',
          'Dit laat de positie van de spelers zien\nwanneer jouw kant ontvangt',
        ]
      },
      'es': {
        players: { s: 'Co', o: 'O', m2: 'C2', m1: 'C1', h1: 'A1', h2: 'A2', l: 'L'},
        rotationControl: { serving: 'Servicio', receiving: 'Recepción', s1: 'Colocador\nen zona 1', s2: 'Colocador\nen zona 2', s3: 'Colocador\nen zona 3', s4: 'Colocador\nen zona 4', s5: 'Colocador\nen zona 5', s6: 'Colocador\nen zona 6' },
        actionControl: { servingBase: 'Base', serve: 'Servicio', set: 'Colocación', switch: 'Cambio', pass: 'Pase', attack: 'Ataque' },
        tutorial: [
          'Tutorial',
          'Siguiente',
          'Esto es un jugador. Haga click para\nseleccionarlo\nA=Atacante, Ce=Central\nCo=Colocadora, O=Opuesta,\nL=Libero',
          'Esta es la cancha de voleibol, con los\n6 jugadores. Los jugadores se\nmoverán sobre la cancha al hacer\nclic en los botones del diagrama',
          'Seleccione un círculo para mostrar\nuna rotación. Cada rotación está\ndesignada por la posición del\ncolocador',
          'Estos son para el servicio',
          'Estos son para la recepción',
          'Cambiar de un círculo al siguiente\nmuestra las rotaciones como en un\npartido',
          'Seleccione la fase de la jugada para\nmover a los jugadores en la cancha',
          'Estos mostrarán las posiciones de los\njugadores cuando su lado esté\nsirviendo',
          'Estos mostrarán las posiciones de los\njugadores cuando su lado esté\nrecibiendo'
        ]
      },
      'pt_br': {
        players: { s: 'L', o: 'OP', m2: 'C2', m1: 'C1', h1: 'P1', h2: 'P2', l: 'Li'},
        rotationControl: { serving: 'Sacando', receiving: 'Recebendo', s1: 'Levantador na 1', s2: 'Levantador na 2', s3: 'Levantador na 3', s4: 'Levantador na 4', s5: 'Levantador na 5', s6: 'Levantador na 6' },
        actionControl: { servingBase: 'Base', serve: 'Saque', set: 'Levantamento', switch: 'Troca', pass: 'Passe', attack: 'Ataque' },
        tutorial: [
          'Tutorial',
          'Próximo',
          'Este é o jogador. Clique para destacá-lo.\n\nP=Ponta, C=Central, L=Levantador,\nOP=Oposto, Li=Libero',
          'Esta é a quadra, com os 6 jogadores.\nClique nos botões, e os jogadores\n se moverão pela quadra.',
          'Este quadro permite selecionar as\n rotações.Clique nos circulos para\n mudar a rotação.\n Eles estão marcadas pela posição doThese show the player positionsThese show the player positionsThese show the player positions\n levantador.',
          'Estes são para quando você esta \nsacando',
          'Estes são para quando você esta \n recebendo.',
          'Mover de circulo a circulo faz\n você rotacionar como em um jogo.',
          'Este painel permite que você\n selecione a fase do rally.\n Os jogadores moverão pela quadra.',
          'Essas são as posições\n quando seu time está sacando.',
          'Essas são as posições\n quando o seu time está recebendo.',
        ]
      },
    }

    this.language = (typeof config.language === 'string' && Object.keys(this.text).includes(config.language) ) ? config.language : 'en'

    this.tutorialData = [
      {
        boxPosition: {
          left:   450 * this.svg.scale,
          right:  650 * this.svg.scale,
          top:    700 * this.svg.scale,
          bottom: 890 * this.svg.scale,
        },
        textPosition: {
          left:   700 * this.svg.scale,
          right:  1320 * this.svg.scale,
          top:    700 * this.svg.scale,
          bottom: 920 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[2],
        nextPosition: {
          left: 1080 * this.svg.scale,
          top:  950 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   112 * this.svg.scale,
          right:  988 * this.svg.scale,
          top:    112 * this.svg.scale,
          bottom: 986 * this.svg.scale,
        },
        textPosition: {
          left:   1050 * this.svg.scale,
          right:  1670 * this.svg.scale,
          top:    400 * this.svg.scale,
          bottom: 600 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[3],
        nextPosition: {
          left: 1430 * this.svg.scale,
          top:  650 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1150 * this.svg.scale,
          right:  1690 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 270 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[4],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  300 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1150 * this.svg.scale,
          right:  1330 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    150 * this.svg.scale,
          bottom: 350 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[5],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  400 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1330 * this.svg.scale,
          right:  1510 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    250 * this.svg.scale,
          bottom: 450 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[6],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  500 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1150 * this.svg.scale,
          right:  1510 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    350 * this.svg.scale,
          bottom: 550 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[7],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  600 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   10 * this.svg.scale,
          right:  1110 * this.svg.scale,
          top:    1120 * this.svg.scale,
          bottom: 1570 * this.svg.scale,
        },
        textPosition: {
          left:   90 * this.svg.scale,
          right:  710 * this.svg.scale,
          top:    880 * this.svg.scale,
          bottom: 1080 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[8],
        nextPosition: {
          left: 760 * this.svg.scale,
          top:  1000 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   10 * this.svg.scale,
          right:  1110 * this.svg.scale,
          top:    1120 * this.svg.scale,
          bottom: 1334 * this.svg.scale,
        },
        textPosition: {
          left:   140 * this.svg.scale,
          right:  760 * this.svg.scale,
          top:    880 * this.svg.scale,
          bottom: 1080 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[9],
        nextPosition: {
          left: 810 * this.svg.scale,
          top:  1000 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   10 * this.svg.scale,
          right:  1110 * this.svg.scale,
          top:    1336 * this.svg.scale,
          bottom: 1570 * this.svg.scale,
        },
        textPosition: {
          left:   190 * this.svg.scale,
          right:  810 * this.svg.scale,
          top:    880 * this.svg.scale,
          bottom: 1080 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[10],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  1000 * this.svg.scale,
        },
      },
    ]

    this.court = new VBHalfCourt({
      width: (11/17) * this.svg.width
    })

    this.svg.snapRoot.append(this.court.getSVG())
    this.court.getSVG().setAttribute('transform', 't100,0')

    this.playerPositions = {
      servingBase: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 700, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 200, y: 100 },
          h2: { x: 200, y: 600 },
          l: { x: 450, y: 700 },
          m1:  { x: -64, y: 700 }
        },
        2: {
          m1: { x: 700, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 450, y: 100 },
          m2: { x: 200, y: 100 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 },
          l:  { x: -64, y: 700 }
        },
        3: {
          h2: { x: 700, y: 600 },
          m1: { x: 700, y: 100 },
          s:  { x: 450, y: 100 },
          h1: { x: 200, y: 100 },
          l: { x: 200, y: 600 },
          o:  { x: 450, y: 700 },
          m2:  { x: -64, y: 700 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 700, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 200, y: 100 },
          h1: { x: 200, y: 600 },
          l: { x: 450, y: 700 },
          m2:  { x: -64, y: 700 }
        },
        5: {
          m2: { x: 700, y: 600 },
          o:  { x: 700, y: 100 },
          h2: { x: 450, y: 100 },
          m1: { x: 200, y: 100 },
          s:  { x: 200, y: 600 },
          h1: { x: 450, y: 700 },
          l:  { x: -64, y: 700 }
        },
        6: {
          h1: { x: 700, y: 600 },
          m2: { x: 700, y: 100 },
          o:  { x: 450, y: 100 },
          h2: { x: 200, y: 100 },
          l: { x: 200, y: 600 },
          s:  { x: 450, y: 700 },
          m1:  { x: -64, y: 700 }
        }
      },
      servingServe: {
        1: {
          s:  { x: 700, y: 940 },
          h1: { x: 580, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 320, y: 100 },
          h2: { x: 200, y: 600 },
          l: { x: 450, y: 700 },
          m1:  { x: -64, y: 700 }
        },
        2: {
          m1: { x: 700, y: 940 },
          s:  { x: 580, y: 100 },
          h1: { x: 450, y: 100 },
          m2: { x: 320, y: 100 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 },
          l:  { x: -64, y: 700 }
        },
        3: {
          h2: { x: 700, y: 940 },
          m1: { x: 580, y: 100 },
          s:  { x: 450, y: 100 },
          h1: { x: 320, y: 100 },
          l: { x: 200, y: 600 },
          o:  { x: 450, y: 700 },
          m2:  { x: -64, y: 700 }
        },
        4: {
          o:  { x: 700, y: 940 },
          h2: { x: 580, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 320, y: 100 },
          h1: { x: 200, y: 600 },
          l: { x: 450, y: 700 },
          m2:  { x: -64, y: 700 }
        },
        5: {
          m2: { x: 700, y: 940 },
          o:  { x: 580, y: 100 },
          h2: { x: 450, y: 100 },
          m1: { x: 320, y: 100 },
          s:  { x: 200, y: 600 },
          h1: { x: 450, y: 700 },
          l:  { x: -64, y: 700 }
        },
        6: {
          h1: { x: 700, y: 940 },
          m2: { x: 580, y: 100 },
          o:  { x: 450, y: 100 },
          h2: { x: 320, y: 100 },
          l: { x: 200, y: 600 },
          s:  { x: 450, y: 700 },
          m1:  { x: -64, y: 700 }
        }
      },
      servingSwitch: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 200, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 700, y: 100 },
          h2: { x: 450, y: 700 },
          l: { x: 200, y: 600 },
          m1:  { x: -64, y: 700 }
        },
        2: {
          m1: { x: 200, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 700, y: 600 },
          h2: { x: 450, y: 700 },
          l:  { x: -64, y: 700 }
        },
        3: {
          h2: { x: 450, y: 700 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          l: { x: 200, y: 600 },
          o:  { x: 700, y: 600 },
          m2:  { x: -64, y: 700 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 200, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 450, y: 700 },
          l: { x: 200, y: 600 },
          m2:  { x: -64, y: 700 }
        },
        5: {
          m2: { x: 200, y: 600 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 600 },
          h1: { x: 450, y: 700 },
          l:  { x: -64, y: 700 }
        },
        6: {
          h1: { x: 450, y: 700 },
          m2: { x: 450, y: 100 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          l: { x: 200, y: 600 },
          s:  { x: 700, y: 600 },
          m1:  { x: -64, y: 700 }
        }
      },
      receivingBase: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 700, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 200, y: 100 },
          h2: { x: 200, y: 600 },
          l:  { x: 450, y: 700 },
          m1: { x: -64, y: 700 }
        },
        2: {
          l:  { x: 700, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 450, y: 100 },
          m2: { x: 200, y: 100 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 },
          m1: { x: -64, y: 700 }
        },
        3: {
          h2: { x: 700, y: 600 },
          m1: { x: 700, y: 100 },
          s:  { x: 450, y: 100 },
          h1: { x: 200, y: 100 },
          l:  { x: 200, y: 600 },
          o:  { x: 450, y: 700 },
          m2: { x: -64, y: 700 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 700, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 200, y: 100 },
          h1: { x: 200, y: 600 },
          l:  { x: 450, y: 700 },
          m2: { x: -64, y: 700 }
        },
        5: {
          l:  { x: 700, y: 600 },
          o:  { x: 700, y: 100 },
          h2: { x: 450, y: 100 },
          m1: { x: 200, y: 100 },
          s:  { x: 200, y: 600 },
          h1: { x: 450, y: 700 },
          m2: { x: -64, y: 700 }
        },
        6: {
          h1: { x: 700, y: 600 },
          m2: { x: 700, y: 100 },
          o:  { x: 450, y: 100 },
          h2: { x: 200, y: 100 },
          l:  { x: 200, y: 600 },
          s:  { x: 450, y: 700 },
          m1: { x: -64, y: 700 }
        }
      },
      receivingPass: {
        1: {
          s:  { x: 840, y: 700 },
          h1: { x: 700, y: 600 },
          m2: { x: 150, y: 60  },
          o:  { x: 54,  y: 100 },
          h2: { x: 200, y: 600 },
          l:  { x: 450, y: 700 },
          m1: { x: -64, y: 700 }
        },
        2: {
          l: { x: 700, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 600 },
          m2:  { x: 40, y: 160 },
          o:  { x: 260, y: 840 },
          h2: { x: 450, y: 700 },
          m1: { x: -64, y: 700 }
        },
        3: {
          h2: { x: 700, y: 600 },
          m1: { x: 740, y: 140 },
          s:  { x: 600, y: 100 },
          h1: { x: 200, y: 600 },
          l:  { x: 450, y: 700 },
          o:  { x: 560, y: 820 },
          m2: { x: -64, y: 700 }
        },
        4: {
          o:  { x: 760, y: 820 },
          h2: { x: 200, y: 600 },
          m1: { x: 140, y: 140 },
          s:  { x: 60, y: 60 },
          h1: { x: 450, y: 700 },
          l:  { x: 700, y: 600 },
          m2: { x: -64, y: 700 }
        },
        5: {
          l: { x: 700, y: 600 },
          o:  { x: 840, y: 100 },
          h2: { x: 200, y: 600 },
          m1:  { x: 60, y: 60 },
          s:  { x: 350, y: 140 },
          h1: { x: 450, y: 700 },
          m2: { x: -64, y: 700 }
        },
        6: {
          h1: { x: 700, y: 600 },
          m2: { x: 700, y: 140 },
          o:  { x: 560, y: 60 },
          h2: { x: 200, y: 600 },
          l:  { x: 450, y: 700 },
          s:  { x: 510, y: 170 },
          m1: { x: -64, y: 700 }
        }
      },
      receivingSet: {
        1: {
          s:  { x: 600, y: 100 },
          h1: { x: 900, y: 300 },
          m2: { x: 450, y: 300 },
          o:  { x: 0,   y: 300 },
          h2: { x: 450, y: 600 },
          l:  { x: 400, y: 700 },
          m1: { x: -64, y: 700 }
        },
        2: {
          l: { x: 700, y: 600 },
          s:  { x: 600, y: 100 },
          h1: { x: 0,   y: 300 },
          m2:  { x: 450, y: 300 },
          o:  { x: 850, y: 600 },
          h2: { x: 430, y: 600 },
          m1: { x: -64, y: 700 }
        },
        3: {
          h2: { x: 450, y: 600 },
          m1: { x: 450, y: 300 },
          s:  { x: 600, y: 100 },
          h1: { x: 0,   y: 300 },
          l:  { x: 400, y: 700 },
          o:  { x: 850, y: 600 },
          m2: { x: -64, y: 700 }
        },
        4: {
          o:  { x: 850, y: 600 },
          h2: { x: 0,   y: 300 },
          m1: { x: 450, y: 300 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 700 },
          l:  { x: 700, y: 600 },
          m2: { x: -64, y: 700 }
        },
        5: {
          l: { x: 700, y: 600 },
          o:  { x: 900, y: 300 },
          h2: { x: 0,   y: 300 },
          m1:  { x: 450, y: 300 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 600 },
          m2: { x: -64, y: 700 }
        },
        6: {
          h1: { x: 450, y: 600 },
          m2: { x: 450, y: 300 },
          o:  { x: 900, y: 300 },
          h2: { x: 0,   y: 300 },
          l:  { x: 400, y: 700 },
          s:  { x: 600, y: 100 },
          m1: { x: -64, y: 700 }
        }
      },
      receivingAttack: {
        1: {
          s:  { x: 600, y: 100 },
          h1: { x: 800, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 100, y: 100 },
          h2: { x: 450, y: 300 },
          l:  { x: 400, y: 700 },
          m1: { x: -64, y: 700 }
        },
        2: {
          l: { x: 700, y: 600 },
          s:  { x: 600, y: 100 },
          h1: { x: 100, y: 100 },
          m2:  { x: 450, y: 100 },
          o:  { x: 840, y: 300 },
          h2: { x: 440, y: 300 },
          m1: { x: -64, y: 700 }
        },
        3: {
          h2: { x: 450, y: 300 },
          m1: { x: 450, y: 100 },
          s:  { x: 600, y: 100 },
          h1: { x: 100, y: 100 },
          l:  { x: 450, y: 700 },
          o:  { x: 840, y: 300 },
          m2: { x: -64, y: 700 }
        },
        4: {
          o:  { x: 840, y: 300 },
          h2: { x: 100, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 700 },
          l:  { x: 700, y: 600 },
          m2: { x: -64, y: 700 }
        },
        5: {
          l: { x: 700, y: 600 },
          o:  { x: 800, y: 100 },
          h2: { x: 100, y: 100 },
          m1:  { x: 450, y: 100 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 300 },
          m2: { x: -64, y: 700 }
        },
        6: {
          h1: { x: 450, y: 300 },
          m2: { x: 450, y: 100 },
          o:  { x: 800, y: 100 },
          h2: { x: 100, y: 100 },
          l:  { x: 400, y: 700 },
          s:  { x: 600, y: 100 },
          m1: { x: -64, y: 700 }
        }
      },
      receivingSwitch: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 700, y: 100 },
          m2: { x: 450, y: 100 },
          o:  { x: 200, y: 100 },
          h2: { x: 450, y: 700 },
          l:  { x: 200, y: 600 },
          m1: { x: -64, y: 700 }
        },
        2: {
          l: { x: 200, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          m2:  { x: 450, y: 100 },
          o:  { x: 700, y: 600 },
          h2: { x: 450, y: 700 },
          m1: { x: -64, y: 700 }
        },
        3: {
          h2: { x: 450, y: 700 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          l:  { x: 200, y: 600 },
          o:  { x: 700, y: 600 },
          m2: { x: -64, y: 700 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 200, y: 100 },
          m1: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 450, y: 700 },
          l:  { x: 200, y: 600 },
          m2: { x: -64, y: 700 }
        },
        5: {
          l: { x: 200, y: 600 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          m1:  { x: 450, y: 100 },
          s:  { x: 700, y: 600 },
          h1: { x: 450, y: 700 },
          m2: { x: -64, y: 700 }
        },
        6: {
          h1: { x: 450, y: 700 },
          m2: { x: 450, y: 100 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          l:  { x: 200, y: 600 },
          s:  { x: 700, y: 600 },
          m1: { x: -64, y: 700 }
        }
      },
    }
    this.players = {
      s: this.court.addPlayer(this.playerPositions.servingBase[2].s.x, this.playerPositions.servingBase[2].s.y, this.text[this.language].players.s),
      h1: this.court.addPlayer(this.playerPositions.servingBase[2].h1.x, this.playerPositions.servingBase[2].h1.y, this.text[this.language].players.h1),
      m1: this.court.addPlayer(this.playerPositions.servingBase[2].m1.x, this.playerPositions.servingBase[2].m1.y, this.text[this.language].players.m1),
      o: this.court.addPlayer(this.playerPositions.servingBase[2].o.x, this.playerPositions.servingBase[2].o.y, this.text[this.language].players.o),
      h2: this.court.addPlayer(this.playerPositions.servingBase[2].h2.x, this.playerPositions.servingBase[2].h2.y, this.text[this.language].players.h2),
      m2: this.court.addPlayer(this.playerPositions.servingBase[2].m2.x, this.playerPositions.servingBase[2].m2.y, this.text[this.language].players.m2),
      l: this.court.addPlayer(this.playerPositions.servingBase[2].l.x, this.playerPositions.servingBase[2].l.y, this.text[this.language].players.l)
    }

    this.state = {
      moving: false,
      setterAt: 2
    }

    this.showTutorial = typeof config.showTutorial === 'boolean' ? config.showTutorial : true
  }

  draw () {
    if (this.drawn) {
      return
    }
    this.drawn = true
    this.court.draw()
    this.drawRotationControl()
    this.drawActionControl()
    if (this.showTutorial) {
      this.drawTutorialButton()
    }
  }

  multilineText (text, lineHeight, style) {
    let textGroup
    text.split('\n').forEach((textChunks, i) => {
      let textLine = this.svg.snapRoot.text(0, 0 + (i * lineHeight * this.svg.scale), textChunks).attr(style)
      if (textGroup) {
        textGroup.add(textLine)
      } else {
        textGroup = this.svg.snapRoot.group(textLine)
      }
    })
    return textGroup
  }

  drawRotationControl () {
    const vOffset1 = 20 * this.svg.scale
    const vOffset2 = 140 * this.svg.scale

    const box1 = this.svg.snapRoot.rect(0, 0 * this.svg.scale, 540 * this.svg.scale, 60 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box2 = this.svg.snapRoot.rect(0, 60 * this.svg.scale, 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box3 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (1 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box4 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (2 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box5 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (3 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box6 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (4 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box7 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (5 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 161 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const backgroundBoxes = this.svg.snapRoot.group(box1, box2, box3, box4, box5, box6, box7)

    const textHeadingS = this.svg.snapRoot.text(80 * this.svg.scale, 40 * this.svg.scale, this.text[this.language].rotationControl.serving).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textHeadingR = this.svg.snapRoot.text(280 * this.svg.scale, 40 * this.svg.scale, this.text[this.language].rotationControl.receiving).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const headingLabels = this.svg.snapRoot.group(textHeadingS, textHeadingR)

    const textLabel2 = this.multilineText(this.text[this.language].rotationControl.s2, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale}`)
    const textLabel1 = this.multilineText(this.text[this.language].rotationControl.s1, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (1 * (vOffset1 + vOffset2))}`)
    const textLabel6 = this.multilineText(this.text[this.language].rotationControl.s6, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (2 * (vOffset1 + vOffset2))}`)
    const textLabel5 = this.multilineText(this.text[this.language].rotationControl.s5, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (3 * (vOffset1 + vOffset2))}`)
    const textLabel4 = this.multilineText(this.text[this.language].rotationControl.s4, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (4 * (vOffset1 + vOffset2))}`)
    const textLabel3 = this.multilineText(this.text[this.language].rotationControl.s3, 28, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor': 'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale,
    }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + (5 * (vOffset1 + vOffset2))}`)
    const rotationLabels = this.svg.snapRoot.group(textLabel1, textLabel2, textLabel3, textLabel4, textLabel5, textLabel6)

    const joinLine1 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
        'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine2 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), 80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine3 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine4 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine5 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine6 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine7 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine8 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine9 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine10 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine11 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLines = this.svg.snapRoot.group(joinLine1, joinLine2, joinLine3, joinLine4, joinLine5, joinLine6, joinLine7, joinLine8, joinLine9, joinLine10, joinLine11)

    const setLineS = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale, 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale,
    })
    const setLineR = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale,
    })
    const setLines = this.svg.snapRoot.group(setLineS, setLineR)

    this.controlTwoSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlColour,
      cursor: 'pointer',
    })
    this.controlTwoRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })

    this.controlOneSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    this.controlOneRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })

    this.controlSixSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })
    this.controlSixRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })

    this.controlFiveSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlFiveSrv.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    this.controlFiveRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })

    this.controlFourSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })
    this.controlFourRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })

    this.controlThreeSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    this.controlThreeRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    const controlCircles = this.svg.snapRoot.group(this.controlOneSrv, this.controlTwoSrv, this.controlThreeSrv, this.controlFourSrv, this.controlFiveSrv, this.controlSixSrv,
        this.controlOneRcv, this.controlTwoRcv, this.controlThreeRcv, this.controlFourRcv, this.controlFiveRcv, this.controlSixRcv)

    this.controlTwoRcv.click(() => {this.state.setterAt = 2;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);  this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlTwoSrv.click(() => {this.state.setterAt = 2;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlOneRcv.click(() => {this.state.setterAt = 1;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);  this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlOneSrv.click(() => {this.state.setterAt = 1;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlSixRcv.click(() => {this.state.setterAt = 6;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);  this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlSixSrv.click(() => {this.state.setterAt = 6;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFiveRcv.click(() => {this.state.setterAt = 5;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFiveSrv.click(() => {this.state.setterAt = 5;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFourRcv.click(() => {this.state.setterAt = 4;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFourSrv.click(() => {this.state.setterAt = 4;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlThreeRcv.click(() => {this.state.setterAt = 3;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlThreeSrv.click(() => {this.state.setterAt = 3;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.rotationControls = this.svg.snapRoot.group(backgroundBoxes, headingLabels, rotationLabels, joinLines, setLines, controlCircles)

    this.rotationControls.transform(`t${1150 * this.svg.scale}, ${50 * this.svg.scale}`)
  }

  drawActionControl () {
    const xOffSet = 220
    const actionBox1 = this.svg.snapRoot.rect(0, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const actionBox2 = this.svg.snapRoot.rect(xOffSet * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const actionBox3 = this.svg.snapRoot.rect((2 * xOffSet) * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const actionBox4 = this.svg.snapRoot.rect((3 * xOffSet) * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const actionBox5 = this.svg.snapRoot.rect((4 * xOffSet) * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const actionBoxes = this.svg.snapRoot.group(actionBox1, actionBox2, actionBox3, actionBox4, actionBox5)
// 990
// 1240
    const linkBar1 = this.svg.snapRoot.rect((4.5 * xOffSet) * this.svg.scale, 230 * this.svg.scale, (1240 - (4.5 * xOffSet)) * this.svg.scale, 40 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkBar2 = this.svg.snapRoot.rect(1200 * this.svg.scale, 120 * this.svg.scale, 40 * this.svg.scale, 150 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkBar3 = this.svg.snapRoot.rect((4.5 * xOffSet) * this.svg.scale, 450 * this.svg.scale, (1440 - (4.5 * xOffSet)) * this.svg.scale, 40 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkBar4 = this.svg.snapRoot.rect(1400 * this.svg.scale, 120 * this.svg.scale, 40 * this.svg.scale, 370 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkLine1 = this.svg.snapRoot.line((xOffSet/2) * this.svg.scale, 250 * this.svg.scale, 1220 * this.svg.scale, 250 * this.svg.scale).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const linkLine2 = this.svg.snapRoot.line(1220 * this.svg.scale, 250 * this.svg.scale, 1220 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const linkLine3 = this.svg.snapRoot.line((xOffSet/2) * this.svg.scale, 470 * this.svg.scale, 1420 * this.svg.scale, 470 * this.svg.scale).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const linkLine4 = this.svg.snapRoot.line(1420 * this.svg.scale, 470 * this.svg.scale, 1420 * this.svg.scale, 20 * this.svg.scale + this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const links = this.svg.snapRoot.group(linkBar1, linkBar2, linkBar3, linkBar4, linkLine1, linkLine2, linkLine3, linkLine4)

    const textHeadingS = this.svg.snapRoot.text(70 * this.svg.scale, 206 * this.svg.scale, this.text[this.language].rotationControl.serving)
    textHeadingS.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale
    })
    const textHeadingR = this.svg.snapRoot.text(80 * this.svg.scale, 416 * this.svg.scale, this.text[this.language].rotationControl.receiving)
    textHeadingR.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale
    })
    const headingLabels = this.svg.snapRoot.group(textHeadingS, textHeadingR)

    this.controlServeBase = this.svg.snapRoot.circle((0.5 * xOffSet) * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlColour,
      cursor: 'pointer'
    })
    this.controlServeServe = this.svg.snapRoot.circle((2.5 * xOffSet) * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlServeSwitch = this.svg.snapRoot.circle((4.5 * xOffSet) * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    const controlServe = this.svg.snapRoot.group(this.controlServeBase, this.controlServeServe, this.controlServeSwitch)

    this.controlReceiveBase = this.svg.snapRoot.circle((0.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveReceive = this.svg.snapRoot.circle((1.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveSet = this.svg.snapRoot.circle((2.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveHit = this.svg.snapRoot.circle((3.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveSwitch = this.svg.snapRoot.circle((4.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    const controlReceive = this.svg.snapRoot.group(this.controlReceiveBase, this.controlReceiveReceive, this.controlReceiveSet, this.controlReceiveHit, this.controlReceiveSwitch)

    const textLabelS1 = this.multilineText(this.text[this.language].actionControl.servingBase, 36, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    }).transform(`t${(0.5 * xOffSet) * this.svg.scale},${330 * this.svg.scale}`)
    const textLabelS2 = this.svg.snapRoot.text((2.5 * xOffSet) * this.svg.scale, 330 * this.svg.scale, this.text[this.language].actionControl.serve).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelS3 = this.svg.snapRoot.text((4.5 * xOffSet) * this.svg.scale, 330 * this.svg.scale, this.text[this.language].actionControl.switch).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelS = this.svg.snapRoot.group(textLabelS1, textLabelS2, textLabelS3)

    const textLabelR1 = this.multilineText(this.text[this.language].actionControl.servingBase, 36, {
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    }).transform(`t${(0.5 * xOffSet) * this.svg.scale}, ${550 * this.svg.scale}`)
    const textLabelR2 = this.svg.snapRoot.text((1.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text[this.language].actionControl.pass).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelR3 = this.svg.snapRoot.text((2.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text[this.language].actionControl.set).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelR4 = this.svg.snapRoot.text((3.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text[this.language].actionControl.attack).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelR5 = this.svg.snapRoot.text((4.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text[this.language].actionControl.switch).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 36 * this.svg.scale
    })
    const textLabelR = this.svg.snapRoot.group(textLabelR1, textLabelR2, textLabelR3, textLabelR4, textLabelR5)

    this.controlServeBase.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlServeServe.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeServe); this.move(this.playerPositions.servingServe[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlServeSwitch.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeSwitch); this.move(this.playerPositions.servingSwitch[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveBase.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveReceive.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveReceive); this.move(this.playerPositions.receivingPass[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveSet.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveSet); this.move(this.playerPositions.receivingSet[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveHit.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveHit); this.move(this.playerPositions.receivingAttack[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveSwitch.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveSwitch); this.move(this.playerPositions.receivingSwitch[this.state.setterAt], 600).then(() => this.state.moving = false)}})

    this.actionControls = this.svg.snapRoot.group(actionBoxes, links, headingLabels, controlServe, controlReceive, textLabelS, textLabelR)

    this.actionControls.transform(`t${10 * this.svg.scale}, ${950 * this.svg.scale}`)
  }

  controlSelect (setterPos, serving, action) {
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

  actionSelect (action) {
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

  drawTutorialButton () {
    const tutorialButtonBox = this.svg.snapRoot.rect(1410 * this.svg.scale , 1480 * this.svg.scale, 280 * this.svg.scale, 80 * this.svg.scale)
    tutorialButtonBox.attr({
      fill: this.colours.tutorialColour
    })
    const tutorialButtonText = this.svg.snapRoot.text(1550 * this.svg.scale, 1536 * this.svg.scale, this.text[this.language].tutorial[0])
    tutorialButtonText.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale,
    })

    this.tutorialButton = this.svg.snapRoot.group(tutorialButtonBox, tutorialButtonText)
    this.tutorialButton.attr({ cursor: 'pointer' })

    this.tutorialButton.click(() => {
      this.drawTutorial(0)
    })
  }

  drawTutorial (index) {
    if (index >= this.tutorialData.length) {
      return
    }

    const p1 = this.svg.snapRoot.path("M0 0 H" + this.svg.width + "V" + this.svg.height + "H0Z " +
      "M" + this.tutorialData[index].boxPosition.right + " " + this.tutorialData[index].boxPosition.top + " " +
      "H" + this.tutorialData[index].boxPosition.left + "V" + this.tutorialData[index].boxPosition.bottom +
      "H" + this.tutorialData[index].boxPosition.right + "Z")

    this.tutorialMask = this.svg.snapRoot.group(p1)
    this.tutorialMask.attr({
      'fill-rule': 'evenodd',
      'fill': this.colours.tutorialFade,
      'fill-opacity': 0.8
    })

    this.tutorialMaskEdge = this.svg.snapRoot.rect(
      this.tutorialData[index].boxPosition.left,
      this.tutorialData[index].boxPosition.top,
      this.tutorialData[index].boxPosition.right - this.tutorialData[index].boxPosition.left,
      this.tutorialData[index].boxPosition.bottom - this.tutorialData[index].boxPosition.top
    )
    this.tutorialMaskEdge.attr({
      stroke: this.colours.tutorialColour,
      fill: 'none'
    })

    const textBox = this.svg.snapRoot.rect(
      this.tutorialData[index].textPosition.left,
      this.tutorialData[index].textPosition.top,
      this.tutorialData[index].textPosition.right - this.tutorialData[index].textPosition.left,
      this.tutorialData[index].textPosition.bottom - this.tutorialData[index].textPosition.top
    )
    textBox.attr({
      fill: this.colours.tutorialColour
    })

    this.tutorialTextBox = this.svg.snapRoot.group(textBox)

    const textChunks = this.tutorialData[index].text.split('\n')
    for(var i = 0; i < textChunks.length; i++) {
      const textLine = this.svg.snapRoot.text(this.tutorialData[index].textPosition.left + (10 * this.svg.scale),
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

    const nextButtonBox = this.svg.snapRoot.rect(
      this.tutorialData[index].nextPosition.left,
      this.tutorialData[index].nextPosition.top,
      240 * this.svg.scale,
      80 * this.svg.scale
    )
    nextButtonBox.attr({
      fill: this.colours.tutorialColour
    })
    const nextButtonText = this.svg.snapRoot.text(this.tutorialData[index].nextPosition.left + 120 * this.svg.scale,
      this.tutorialData[index].nextPosition.top + (56 * this.svg.scale),
      this.text[this.language].tutorial[1]
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

    this.tutorialNextButton = this.svg.snapRoot.group(nextButtonBox, nextButtonText)
    this.tutorialNextButton.attr({ cursor: 'pointer' })

    this.tutorialNextButton.click(() => {
      this.tutorialMask.remove()
      this.tutorialTextBox.remove()
      this.tutorialNextButton.remove()
      this.tutorialMaskEdge.remove()
      this.drawTutorial(index+1)
    })
  }

  move (players, time) {
    this.state.moving = true

    this.players.s.setPosition(players.s.x, players.s.y)
    this.players.o.setPosition(players.o.x, players.o.y)
    this.players.m2.setPosition(players.m2.x, players.m2.y)
    this.players.m1.setPosition(players.m1.x, players.m1.y)
    this.players.h1.setPosition(players.h1.x, players.h1.y)
    this.players.h2.setPosition(players.h2.x, players.h2.y)
    this.players.l.setPosition(players.l.x, players.l.y)

    return this.court.draw()
  }
}
