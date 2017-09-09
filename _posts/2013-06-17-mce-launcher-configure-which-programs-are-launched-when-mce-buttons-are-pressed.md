---
id: 101
title: 'MCE Launcher &#8211; Configure which programs are launched when MCE buttons are pressed'
date: 2013-06-17T00:23:19+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=101
permalink: /2013/06/mce-launcher-configure-which-programs-are-launched-when-mce-buttons-are-pressed/
categories:
  - Utilities
  - Multimedia
tags:
  - XBMC
  - MCE
---
I&#8217;ve been using XBMC for some time as my HTPC driver. Having an MCE remote though, its buttons are configured to run Windows Media Center. I ran into the following [blog post](http://inchoatethoughts.com/launching-xbmc-with-a-windows-media-center-remote) that offers a way to change this, but I didn&#8217;t like the implementation:

  1. It replaces the wrong file (_ehshell.exe_ instead of  _ehtray.exe)_ which caused me some issues
  2. It uses hard-coded locations and is specific to XBMC
  3. The code is not green in [Resharper](http://www.jetbrains.com/resharper/) 🙂

So I took the code and generalized it to a small program that lets you configure exactly which program will be launched by which MCE button. The result: [MCE Launcher](http://sourceforge.net/projects/mcelauncher/) (see the Readme file for installation and configuration).

&nbsp;

&nbsp;