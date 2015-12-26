# NodeCG for Smash

Bundles for use with [NodeCG](http://nodecg.com/) in Super Smash Bros. Melee streams. Compatible with OBS. Xsplit may work, but I haven't tested it. This is browser-based, so it'll work on any OS.

## How to use

1. Install [Node.js](https://nodejs.org/en/).
2. Follow the [NodeCG install guide](http://nodecg.com/starter/installing.html)
3. Clone/download this repo, put the contents in the /bundles directory in the NodeCG directory
4. If you want to use the scene change bundle, set up [OBS Remote](http://www.obsremote.com/) with no password and install [OBS Remote JS](https://github.com/nodecg/obs-remote-js). If you want to use the pull from Challonge feature in the bracket bundle, get a [Challonge API key](http://api.challonge.com/v1) and replace ENTER API KEY HERE in /ssbm-bracket/node-challonge-ext.js with it.
5. Start NodeCG
6. Go to localhost:9090 in your web browser to open the dashboard.
7. Set up your stream overlay in OBS using [CLR Browser](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/) and the links to the bundle views, available in the info button for each bundle in the dashboard.
  * Alternatively, just import the default scene collection given in the `/obs` directory. Make sure CLR Browser is installed. If you want, you can also use the overlay given in the `/images` directory or make your own using the template in `/images/templates`.
8. Use.

## Overview of included bundles

### ssbm-4players

Player name/score display for 2v2 or other times where you have more than 2 players.

### ssbm-bracket

Top 8 bracket display to show on stream. Can pull the bracket from Challonge and/or the streamer can manually update the bracket.

### ssbm-crew-roster

Crew battle roster showing stocks remaining and who is knocked out. Supports up to 10 players per team.

### ssbm-lower-third

Lower third display. You can change the logo image at /ssbm-lower-third/view/img/logo.png

### ssbm-playercam

Text to display under the playercam. Currently only supports display for one playercam.

### ssbm-players

Player name/flag/character/score display for 1v1.

### ssbm-scene-change

Remotely change scenes from the NodeCG dashboard, with option to use a fancy transition animation. Require OBS Remote to use. You can change the image to use in the transition animation in `/ssbm-scene-change/view/img/logo_slices`. The image must be split into slices 240px wide.

### ssbm-top-info

Misc. info display to show at the top of the game screen. You can also send a pop-up message (e.g. stats, bracket updates, "what's next") to display in the same area for a short period of time.

### ssbm-bg-helper

Helper bundle to adjust the backgrounds for ssbm-4playres, ssbm-playercam, ssbm-players, and ssbm-top-info. Choose to use an image or a solid color with adjustable corner radius.

## Images

The `/images` directory contains images you can use on your stream, and the templates if you want to make your own. In-Game Overlay.png is a default overlay that works with the scene collection provided in the `/obs` directory. The template for this overlay is given in the `/images/template` directory. 

### Templates

The templates for the in-game overlay and the various background images used in the bundles are provided as .psd files in `/images/template`. Each .psd file contains the default image with the correct dimensions that you can edit as you please.

Listing of what each file is and where you should export it.:

* 4players tag.psd - Player tag background for ssbm-4players bundle. Export as four different files: `blue tag.png`, `green tag.png`, `red tag.png`, and `none tag.png` into `ssbm-4players/view/img/bg`. Make sure each file has the correct team color in it.
* 4players team.psd - Team background for ssbm-4players bundle. Export as four different files: `blue team.png`, `green team.png`, `red team.png`, and `none team.png` into `ssbm-4players/view/img/bg`. Make sure each file has the correct team color in it.
* In-Game Overlay.psd - In-game overlay built for NodeCG for Smash's default dimensions. Export wherever you want, just point OBS to the file and use it as an overlay.
* playercam.psd - Background for playercam label. Export as `playercam.png` into `ssbm-playercam/view/img`.
* players.psd - Player tag background for ssbm-players bundle. Export as `players.png` into `ssbm-players/view/img`.
* top-info.psd - Background for ssbm-top-info panels. Export as `top info.png` into `ssbm-top-info/view/img`.

## Credits

* [NodeCG](http://nodecg.com/)
* [OBS Remote JS](https://github.com/nodecg/obs-remote-js)
* [Node Challonge](https://github.com/Tidwell/node-challonge)
* Transition animation taken from [toth-overlay](https://github.com/TipoftheHats/toth-overlay)