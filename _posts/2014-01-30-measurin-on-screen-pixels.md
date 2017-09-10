---
id: 167
title: Measuring on-screen pixels
date: 2014-01-30T17:42:26+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=167
permalink: /2014/01/measurin-on-screen-pixels/
categories:
  - Software-Development
  - Web
tags:
  - Redline
  - Cropper
cropper_image: '/wp-content/uploads/2014/01/cropperui.png'
meazure_image: '/wp-content/uploads/2014/01/meazurefull.gif'
---
There are times when measuring pixels on-screen may be useful. This is especially true when following [redline](https://visitmix.com/writings/a-beginning-glossary-for-the-web-designer-or-developer#redlines) specifications (just make sure your browser zoom is set to 100%). There exist many **free** tools to aid in this task, and this [SuperUser thread](https://superuser.com/questions/360035/is-there-a-tool-to-measure-pixels-on-a-screen) lists many of them. Luckily for you, I&#8217;ve tested most of the utilities proposed in the thread and the winner is&#8230; [Cropper](https://cropper.codeplex.com/) !

[![Cropper]({{ page.cropper_image | absolute_url }})]({{ page.cropper_image | absolute_url }})

Even though it&#8217;s a screen capture utility, it works very well for pixel measuring. Some of its useful features (the full list appears on their site):

  * Always On Top
  * **F8** Show the main form
  * **Arrow keys** Nudge the main form one pixel (hold **Ctrl** for 10 pixels)
  * **Alt+Arrow keys** Resize the main form one pixel (hold **Ctrl** for 10 pixels)

When you need that extreme precision, you can use it in conjunction with the [Windows Magnifier](https://windows.microsoft.com/en-us/windows/make-screen-items-bigger-magnifier):

  * **Win + &#8216;+&#8217;** Magnify (will also open the magnifier if not already open)
  * **Win + &#8216;-&#8216;** Reduce
  * **Win + Esc** Close Magnifier

An honorary mention goes to [Meazure](http://www.cthing.com/Meazure.asp). It is an excellent choice if you prefer a more verbose, extremely detailed UI with many features.

[![Meazure]({{ page.meazure_image | absolute_url }})]({{ page.meazure_image | absolute_url }})

There are also various browser extensions that offer similar functionality, but a global tool is obviously better (I actually didn&#8217;t like any of the extensions I tried regardless).