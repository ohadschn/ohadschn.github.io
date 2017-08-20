---
id: 155
title: Introducing TvGameLauncher
date: 2014-01-12T00:02:51+00:00
author: ohadsc
layout: post
guid: http://ohadsc.wordpress.com/?p=155
permalink: /2014/01/introducing-tvgamelauncher/
categories:
  - Uncategorized
---
**EDIT** &#8211; check out [TvGameLAuncherGUI](http://www.ohadsoft.com/2014/07/tvgamelaunchergui/)!

I recently blogged about [Playing PC games on your HDMI-connected TV](http://ohadsc.wordpress.com/2014/01/04/playing-pc-games-on-your-hdmi-connected-tv/), and I mentioned a couple of programs you could use to get the job done, along with a couple of batch files you could whip up to ease the process.

Secretly though, I knew it wasn&#8217;t enough. So I wrote [TvGameLauncher](https://sourceforge.net/projects/tvgamelauncher/) to take care of everything for you (including something I forgot &#8211; preventing computer sleep). Everything is now done automatically in one fell swoop.

For example, in order to run ioquake3 on your TV, you could run a command such as _TvGameLauncher.exe -t -h 2 -s 0 -e &#8220;F:Gamesioquake3ioquake3.x86.exe&#8221;_

And in order to run Hotline Miami (through Steam): _TvGameLauncher.exe -t -h 2 -s 0 -l steam://rungameid/219150 -e HotlineGL.exe_

Again, thanks go to [Dave Amenta](http://www.daveamenta.com/) and [Michael Welter](http://mikinho.com/ "Michael Welter") for their useful utilities that made this possible (**EDIT **&#8211; TvGameLauncher now utilized [NirCmd](http://www.nirsoft.net/utils/nircmd.html) instead &#8211; thanks Nir!)

I have some ideas for improvements, but this should suffice for now.

Enjoy!

<a href="http://ohadsoft8.azurewebsites.net/wp-content/uploads/2014/01/tvgamelauncher.png" rel="lightbox[155]"><img id="i-162" class="size-full wp-image" src="http://ohadsoft8.azurewebsites.net/wp-content/uploads/2014/01/tvgamelauncher.png?w=487" alt="Image" /></a>