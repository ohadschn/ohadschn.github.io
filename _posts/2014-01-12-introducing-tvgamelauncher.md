---
id: 155
title: Introducing TvGameLauncher
date: 2014-01-12T00:02:51+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=155
permalink: /2014/01/introducing-tvgamelauncher/
categories:
  - Utilities
  - Gaming
tags:
  - Steam
  - HDMI
  - HTPC
tvgl_image: '/wp-content/uploads/2014/01/tvgamelauncher.png'
---
**EDIT** &#8211; check out [TvGameLAuncherGUI](https://www.ohadsoft.com/2014/07/tvgamelaunchergui/)!

I recently blogged about [Playing PC games on your HDMI-connected TV]({{ '/2014/01/playing-pc-games-on-your-hdmi-connected-tv' | absolute_url }}), and I mentioned a couple of programs you could use to get the job done, along with a couple of batch files you could whip up to ease the process.

Secretly though, I knew it wasn&#8217;t enough. So I wrote [TvGameLauncher](https://sourceforge.net/projects/tvgamelauncher/) to take care of everything for you (including something I forgot &#8211; preventing computer sleep). Everything is now done automatically in one fell swoop.

For example, in order to run ioquake3 on your TV, you could run a command such as `TvGameLauncher.exe -t -h 2 -s 0 -e "F:\Games\ioquake3\ioquake3.x86.exe"`

And in order to run Hotline Miami (through Steam): `TvGameLauncher.exe -t -h 2 -s 0 -l steam://rungameid/219150 -e HotlineGL.exe`

Again, thanks go to [Dave Amenta](http://www.daveamenta.com/) and [Michael Welter](http://mikinho.com/ "Michael Welter") for their useful utilities that made this possible (**EDIT **&#8211; TvGameLauncher now utilized [NirCmd](https://www.nirsoft.net/utils/nircmd.html) instead &#8211; thanks Nir!)

I have some ideas for improvements, but this should suffice for now.

Enjoy!

[![TvGameLauncher]({{ page.tvgl_image | absolute_url }})]({{ page.tvgl_image | absolute_url }})