# NodeCG for Smash

Bundles for use with [NodeCG](http://nodecg.com/) in Super Smash Bros. streams. (Melee for now, other games soon)

## How to use

1. Install [Node.js](https://nodejs.org/en/).
2. Follow the [NodeCG install guide](http://nodecg.com/starter/installing.html)
3. Clone/download this repo, put the contents in the /bundles directory in the NodeCG directory
4. If you want to use the scene change bundle, set up [OBS Remote](http://www.obsremote.com/) with no password and install [OBS Remote JS](https://github.com/nodecg/obs-remote-js). If you want to use the pull from Challonge feature in the bracket bundle, get a [Challonge API key](http://api.challonge.com/v1) and replace ENTER API KEY HERE in /ssbm-bracket/node-challonge-ext.js with it.
5. Start NodeCG
6. Set up your stream overlay in OBS using [CLR Browser](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/) and the links to the bundle views, available in the info button for each bundle in the dashboard.
7. Use.

## Overview of included bundles

### ssbm-4players

Player name/score display for 2v2 or other times where you have more than 2 players.

### ssbm-alert

Pop-in alert for text updates you want to show on the stream. One use is to keep the stream updated on bracket results.

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

Remotely change scenes from the NodeCG dashboard, with option to use a fancy transition animation. Require OBS Remote to use.

### ssbm-top-info

Misc. info display to show at the top of the game screen. Customizable widths and spacing. 

## Credits

* [NodeCG](http://nodecg.com/)
* [OBS Remote JS](https://github.com/nodecg/obs-remote-js)
* [Node Challonge](https://github.com/Tidwell/node-challonge)
* Transition animation taken from [toth-overlay](https://github.com/TipoftheHats/toth-overlay)