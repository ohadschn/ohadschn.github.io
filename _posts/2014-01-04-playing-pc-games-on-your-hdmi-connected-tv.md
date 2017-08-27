---
id: 151
title: Playing PC games on your HDMI-connected TV
date: 2014-01-04T02:57:17+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=151
permalink: /2014/01/playing-pc-games-on-your-hdmi-connected-tv/
categories:
  - Uncategorized
---
Many people have a TV connected to their computer via HDMI as their secondary monitor. It is very convenient for HTPC usages, but playing games on the TV can be nice as well (especially when you have a gamepad connected).

The trouble is, most games will only run on the primary monitor, and the only way to get them to run on the TV is to make it the primary monitor. Windows makes this rather easy, but still, doing it manually each and every time before playing can be cumbersome. Fortunately, [Michael Welter](http://mikinho.com/ "Michael Welter") comes to the rescue with [W7ToggleDisplay](http://mikinho.com/w7/toggle-display/), a simple command-line tool that does the switching (don&#8217;t worry about the name, it works on Windows 8.1 as well). Simply run _**w7toggledisplay.exe /primary**_ to make the switch.

Another annoyance is in the audio department. Presumably, when you play a game on the TV, you want the audio to come out of it as well (be it through its speakers or through some audio system connected to it). Since HDMI can carry audio, the easiest thing to do is switch the default _playback device _to the HDMI audio device. Again, this is easy enough to do but a nuisance to do every time. Fortunately, [Dave Amenta](http://www.daveamenta.com/) created [AudioEndPointController](http://www.daveamenta.com/2011-05/programmatically-or-command-line-change-the-default-sound-playback-device-in-windows-7/), a command-line tool that switches playback devices (even though the post mentions Windows 7, I&#8217;ve used it on Windows 8.1 without a hitch). First run **_EndPointController.exe_** and note the number identifiers for your regular and HDMI audio devices (the _X_ in _Audio Device X:_). Then Run **_EndPointController.exe X_** where X is the number of the device you want to switch to.

**Putting it all together**

Now that we have all the prerequisites, we can create the following batch file to switch primary monitors, switch to HDMI audio output, run the game, and finally when the game is over switch everything back:

<pre class="brush: bash; title: ; notranslate" title="">EndPointController.exe X
w7toggledisplay.exe /primary
Game.exe
EndPointController.exe Y
w7toggledisplay.exe /primary
</pre>

Where _X_ is the ID of your HDMI audio device,_ Y_ is the ID of your regular audio device, and _Game.exe_ is the executable of your game.

**Steam**

Unfortunately, the above won&#8217;t work for Steam games, since they are not launched directly via their executable. Instead, they are launched via a special protocol that looks like _steam://rungameid/219150._ You can replace _Game.exe_ above with _start _steam://rungameid/X __where _X_ is the steam ID of your game (as it appears in the original shortcut). This will launch the game, but the trouble is it won&#8217;t wait for the game to quit, switching the audio and display immediately back (the _/wait_ switch doesn&#8217;t help). I haven&#8217;t found a way around that (if anyone is aware of one I&#8217;d be happy to hear), so for Steam games I use two batch files. One to switch primary display and audio, and run the game:

<pre class="brush: bash; title: ; notranslate" title="">EndPointController.exe IdOfHdmiAudioDevice
w7toggledisplay.exe /primary
start steam://rungameid/SteamId
</pre>

And then another script to toggle everything back (I give it a [shortcut](http://www.wikihow.com/Create-Keyboard-Shortcuts-for-Programs-in-Windows-XP) so I don&#8217;t have to find the icon on the TV every time):

<pre class="brush: bash; title: ; notranslate" title="">EndPointController.exe IdOfRegularAudioDevice
w7toggledisplay.exe /primary
</pre>

Happy gaming !