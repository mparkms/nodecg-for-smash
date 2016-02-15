# NodeCG for Smash

Bundles for use with [NodeCG](http://nodecg.com/) in Super Smash Bros. Melee streams. Compatible with OBS. Xsplit may work, but I haven't tested it. This is browser-based, so it'll work on any OS. Recommended that you use the dashboard in Chrome because web-components takes a long time to load in other browsers.

## How to use

1. Install [git](https://git-scm.com/). Make sure to select 'Use Git from the Windows Command Prompt' if you're on Windows.
2. Install NodeCG as shown in the instructions on the [NodeCG website.](http://nodecg.com/) If it tells you `bower` is not recognized, type in `npm install -g bower`.
3. From this point on, all commands should be in the regular command line, not Node.js. Exit Node.js by hitting ctrl-C twice if you're in Node.js.
4. Install nodecg-cli as shown [here.](https://github.com/nodecg/nodecg-cli)
5. In the command line in the folder you installed NodeCG, enter `nodecg install mparkms/nodecg-for-smash`
6. Start NodeCG by entering `nodecg start` into command prompt in the folder where NodeCG is installed and go to `localhost:9090` in your browser.
7. Install [CLR Browser](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/) if you haven't done so already.
8. In OBS, click Scene Collections > New then Scene Collection > Import then select the scene collection `/obs/scene.xconfig` to import into OBS or use the links in the Graphics page on the dashboard to make your own scene layout.
9. If you want to use the Scene Transition panel, install OBS Remote and turn off the password for it.
10. If you want to use the Bracket panel's Challonge integration, put in your Challonge API key into `extension/node-challonge-ext.js` where it says `ENTER API KEY HERE`.

[Installation instruction video - if you're confused about any of the above I suggest watching this.](https://youtu.be/MweCH70GGY4)

[Having problems with installation? Check here.](https://github.com/mparkms/nodecg-for-smash/wiki/Troubleshooting-installation) If that doesn't help, post an issue here or tweet at me @kaabistar

## Use with OBS Multiplatform
The installation instructions for OBS multiplatform are exactly the same as above with the exception that you will have to use [Browser Plugin](https://obsproject.com/forum/resources/browser-plugin.115/) instead of CLR Browser. Also you will have to create your own scene, and manually set the required urls for browser import elements. The required elements can be found by searching the html directory under nodecg/bundles/nodecg-for-smash.

Scene transitions will NOT work with OBS MP as it is not currently supported by OBS Remote.

Also, elements can sometimes display scroll bars in OBS MP when rendered. To fix this behaviour enter the following in the CSS box for each element you setup in OBS MP:

body {
    overflow: hidden;
}

## Overview of included dashboard panels

### Players & Score

Player tag, scores, characters, and countries. Can toggle between 2 player and 4 player mode for doubles. After toggling just hit update again to change the layout. Can also swap players.

Associated graphic: players.html

### Top Info, Playercam, Lower Third

Text for top info panels, playercam, and lower third. You can also send a message to display in the top info area for a short period of time.

Associated graphics: top-info.html, playercam.html, lower-third.html

### Bracket

Top 8 bracket display to show on stream. Can pull the bracket from Challonge and/or the streamer can manually update the bracket. Make sure you've put in your Challonge API key into `extension/node-challonge-ext.js` if you want to use that feature.

Associated graphics: bracket.html

### Scene Transition

Remotely change scenes from the NodeCG dashboard, with option to use a fancy transition animation. Requires OBS Remote to use. You can change the image to use in the transition animation in `/graphics/img/logo_slices`. The image must be split into slices 240px wide.

Associated graphics: scene-change.html

### Crew Battle Rosters

Crew battle roster showing stocks remaining and who is knocked out. Supports up to 10 players per team.

Associated graphics: crew-roster.html

## Images

The `/images` directory contains images you can use on your stream, and the templates if you want to make your own. In-Game Overlay.png is a default overlay that works with the scene collection provided in the `/obs` directory. The template for this overlay is given in the `/images/template` directory. 

### Templates

The templates for the in-game overlay and the various background images used in the bundles are provided as .psd files in `/images/template`. Each .psd file contains the default image with the correct dimensions that you can edit as you please. Export each .psd as a .png into `/graphics/img/backgrounds`.

Listing of what each file is:

* 4players tag.psd - Player tag background for 4 player layout. Export as four different files: `blue tag.png`, `green tag.png`, `red tag.png`, and `none tag.png`. Make sure each file has the correct team color in it.
* 4players team.psd - Team background for 4 player layout. Export as four different files: `blue team.png`, `green team.png`, `red team.png`, and `none team.png`. Make sure each file has the correct team color in it.
* In-Game Overlay.psd - In-game overlay built for NodeCG for Smash's default dimensions. Export wherever you want, just point OBS to the file and use it as an overlay.
* playercam.psd - Background for playercam label. Export as `playercam.png`.
* players.psd - Player tag background for 2 player layout. Export as `players.png`.
* top info.psd - Background for top info panels. Export as `top info.png`.
* top message.psd - Background for message in top-info area. Export as `top message.png`.

## Credits

* [NodeCG](http://nodecg.com/)
* [OBS Remote JS](https://github.com/nodecg/obs-remote-js)
* [Node Challonge](https://github.com/Tidwell/node-challonge)
* Transition animation taken from [toth-overlay](https://github.com/TipoftheHats/toth-overlay)
