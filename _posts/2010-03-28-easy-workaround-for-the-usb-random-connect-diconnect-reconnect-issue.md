---
id: 22
title: Easy workaround for the USB random connect / diconnect / reconnect issue
date: 2010-03-28T00:05:47+00:00
author: ohadsc
layout: post
guid: http://ohadsc.wordpress.com/?p=22
permalink: /2010/03/easy-workaround-for-the-usb-random-connect-diconnect-reconnect-issue/
categories:
  - Uncategorized
---
Symptom: your laptop makes the USB connect/disconnect sounds randomly, even when no USB devices are connected to your computer

Cause: Probably some loose innards connecting an internal USB device in the laptop

The issue has been discussed in several places, for example:
  
<a href="http://forum.notebookreview.com/showthread.php?t=178071" target="_blank"><a title="Use CTRL + click or middle-click to open in a new tab" href="void(0);">http://forum.notebookreview.com/showthread.php?t=178071</a></a>

But I haven&#8217;t seen a solution posted, not even a workaround&#8230;

I&#8217;ve encountered this phenomena with a Dell Inspiron 1520, where the USB camera would do this constantly. It was easy to tell since the camera light / indicator flashed each time it did, but in other situations it might not be trivial to tell which device is the culprit

In any case,  you&#8217;d think disabling the defective device in the device manager would stop the annoyance &#8211; well, in my case, it didn&#8217;t

Fortunately, <a href="http://www.nirsoft.net/" target="_blank">Nir Sofer</a> comes to the rescue:

  1. Download <a href="http://www.nirsoft.net/utils/usb_devices_view.html" target="_blank">USBDeview</a> and run it
  2. Sort the list by the &#8220;last plug/unplug date&#8221; column (is this guy a genius or what) &#8211; the problematic device is immediately identified
  3. Right click on it and choose &#8220;disconnect selected devices&#8221;

You&#8217;re done. Until you get the hardware fixed (if ever), you are no longer plagued by that infernal sound. I&#8217;m not sure if the disabling persists reboots (haven&#8217;t rebooted yet), but if not, USBDeview has a command line interface &#8211; so you can place a simple shortcut in your startup to disable the device every time the system starts