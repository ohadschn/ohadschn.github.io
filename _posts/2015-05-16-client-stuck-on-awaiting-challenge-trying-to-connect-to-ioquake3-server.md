---
id: 532
title: 'Client stuck on &#8220;Awaiting Challenge&#8221; trying to connect to ioquake3 server'
date: 2015-05-16T10:55:46+00:00
author: ohadsc
layout: post
guid: http://www.ohadsoft.com/?p=532
permalink: /2015/05/client-stuck-on-awaiting-challenge-trying-to-connect-to-ioquake3-server/
categories:
  - Uncategorized
---
Every week, I meet up with a group of friends from work for a LAN party. Since the age-old Quake vs Unreal debate could not be settled (obviously Quake is better and they are wrong), we decided to alternate between Quake3 and Unreal 2004.

Last week was Quake&#8217;s turn, so I naturally set up a [dedicated server](http://www.quake3world.com/q3guide/servers.html). Alas, even though most people were able to connect and play without issue, some got stuck in the dreaded &#8220;Awaiting Challenge&#8221; stage and could not connect. The Unreal fans rejoiced, believing this spelled the end of our quake sessions.

But my resolve when it comes to Quake should not be underestimated&#8230;

After a long process of elimination and a chat conversation with one of the ioquake3 developers (DevHC &#8211; great guy), the issue was identified. It turns out that when specifying the host name (rather than the IP) of the server, the ioquake3 client resolves it to IPv6 (where available) by default. For some reason, this didn&#8217;t resonate well with the server. Once we specified the IPv4 explicitly, the issue was resolved.

You have several options to work around this issue:

  1. Specify the IPv4 address of the server explicitly
  2. Force IPv4 resolution by issuing the console (~) command **_/connect -4 hostName_**
  3. Disable IPv6 in the client by adding the following lines to your _[autoexec.cfg](http://www.quake3world.com/q3guide/configs.html)_: <pre class="brush: plain; title: ; notranslate" title="">set net_enabled 1
net_restart</pre>

Happy fragging!