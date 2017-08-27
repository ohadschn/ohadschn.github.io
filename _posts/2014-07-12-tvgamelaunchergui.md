---
id: 382
title: TvGameLauncherGUI
date: 2014-07-12T18:38:51+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/2014/07/12/tvgamelaunchergui/
permalink: /2014/07/tvgamelaunchergui/
sharing_disabled:
  - "1"
geo_public:
  - "0"
categories:
  - Uncategorized
---
A couple of months ago I blogged about [TvGameLauncher](http://ohadsc.wordpress.com/2014/01/12/introducing-tvgamelauncher/), a command line tool to help you launch your favorite games on your HDMI-connected TV (or any other connected display) with all the necessary steps carried out for you (change primary display, change default audio endpoint, prevent sleep).

The tool works great (at least for me 🙂 ), but its command-line nature leaves is inaccessible to users who aren&#8217;t comfortable with the command line and the entire experience isn&#8217;t that much fun.

Enter [TvGameLauncherGUI](https://sourceforge.net/projects/tvgamelauncher/). I&#8217;ve created a nice(?) WPF GUI front-end for TvGameLauncher, and also improved the latter for good measure:

  1. There is now a useful &#8220;darken non-primary displays&#8221; that will darken all displays except the one where the game takes place for improved gaming immersion atmosphere.
  2. TvGameLauncher now employs the excellent [NirCmd](http://www.nirsoft.net/utils/nircmd.html) instead of the previous relatively unknown (and less reliable and updated) tools.
  3. Improved logging, error handling, and more.

Get it at [SourceForge](https://sourceforge.net/projects/tvgamelauncher/), and be sure to check out the 5 minute tutorial on [Youtube](https://www.youtube.com/watch?v=z8N5RPswlH0).

<a href="http://ohadsoft8.azurewebsites.net/wp-content/uploads/2014/07/tvgamelauncher.png" target="_blank" rel="lightbox[382]"><img class="alignnone wp-image-381 size-medium" src="http://ohadsoft8.azurewebsites.net/wp-content/uploads/2014/07/tvgamelauncher.png?w=300" alt="TvGameLauncher" width="300" height="155" srcset="https://www.ohadsoft.com/wp-content/uploads/2014/07/tvgamelauncher.png 773w, https://www.ohadsoft.com/wp-content/uploads/2014/07/tvgamelauncher-300x156.png 300w" sizes="(max-width: 300px) 85vw, 300px" /></a>

&nbsp;