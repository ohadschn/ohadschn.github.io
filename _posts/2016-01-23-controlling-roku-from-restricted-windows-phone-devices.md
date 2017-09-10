---
id: 591
title: Controlling Roku devices from restricted Windows Phone Devices
date: 2016-01-23T17:23:24+00:00
author: ohadsc
guid: http://www.ohadsoft.com/?p=591
permalink: /2016/01/controlling-roku-from-restricted-windows-phone-devices/
categories:
  - Multimedia
tags:
  - Roku
  - Remote-Control
  - Windows-Phone
  - DD-WRT
  - DNS
---
**Scroll to the bottom if you want the TLDR version of controlling Roku devices from restricted Windows Phone devices**

I recently purchased a Roku Streaming Stick after reading some great reviews online, and verifying it comes with [Windows Phone support](https://support.roku.com/hc/en-us/articles/208755018-Roku-Mobile-App-Help-Android-iOS-Windows-Mobile-and-8-x-). Hooking it up to the TV was easy enough, and I was quickly able to enjoy streaming content using the included remote.

However, to my dismay I soon realized the remote was defective, intermittently entering a non-responsive state where all key presses would be ignored. I was peeved, of course, but I thought to myself &#8211; no big deal, I&#8217;ll just use the WP remote app, right?

Wrong. I tried the Roku official app, as well as literally every other Roku remote app on the WP store, to no avail. Most of the apps wouldn&#8217;t recognize my Roku device, with the official app saying &#8220;no Roku devices were found on your network&#8221; and &#8220;could not access the information of your Roku device(s)&#8221;. When I tried manually connecting to the Roku&#8217;s IP (as indicated in the Roku&#8217;s network settings page), the official app said it &#8220;Failed to connect to the specified device&#8221;. The few apps that did seem to &#8220;connect&#8221; to it could not control it &#8211; I would press a button and nothing would happen.

In my despair, I contacted Roku support. The representative quickly determined it was due to my location (Israel), which is not officially supported by Roku. Say _what_? The device work, its remote (mostly) works, but an app that merely simulates a remote suddenly cares about your location and deliberately fails just for spite? I didn&#8217;t buy it.

So I went to the Windows Store on my PC and installed the Roku Windows Store app. It immediately recognized my device and lo and behold &#8211; it was able to control it effortlessly. Motivated by my discovery, I powered on an old Android device and Installed a Roku remote app. Again, it worked right out of the box.

At this point I became very curious. Why were the WP apps failing? It can&#8217;t be a coincidence, especially considering the fact that many reviewers confirmed those apps did in fact deliver on their promise and controlled the device. To satisfy my curiosity, I referred to Roku&#8217;s [REST API documentation](https://sdkdocs.roku.com/display/sdkdoc/External+Control+Guide). It literally could not be any simpler. Want to press the _Home_ key? This is all you need to do:

```bash
curl -d '' http://192.168.1.134:8060/keypress/home
```

There&#8217;s no way all the Roku apps in the WP store got something as simple as this wrong. But seeing how simple the API was, I realized it would be a matter of hours to create a simple WP app that sends these commands and be done with it. I even had a name for my app &#8211; _RemoRoku_. It would be the savior of all Windows Phone Roku users, and I would be forever renowned as the hero of the community.

In reality, I quickly realized why all the other apps were failing. A few XAML tags and a single [HttpClient](https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx) call later, my app revealed curious behavior. The app would work fine on the emulator, but the device itself kept blocking the HTTP requests with 404 _Not Found_ errors.

After a bit of searching on the web I ran into [this thread](https://social.msdn.microsoft.com/Forums/en-US/b4fda36c-5497-42bb-99e8-170a8de871e0/ip-addresses-not-allowed-with-httpclientgetasync?forum=winappswithcsharp). It mentions a similar phenomena, explaining how &#8220;regular&#8221; domain requests (e.g. _microsoft.com_) would work whereas IP requests (e.g. _192.168.1.134_) would fail. The author ended up figuring out the root cause of the issue &#8211; a missing [app capability](https://msdn.microsoft.com/en-us/library/windows/apps/br211423.aspx) by the name of _privateNetworkClientServer_. Unfortunately, setting it in my app&#8217;s manifest had no effect (which is not surprising, considering that the docs state it is equivalent on WP to _internetClientServer _which was already enabled_)._

At this point I had to assume something was blocked specifically on my phone. Maybe it was the specific hardware/software combination (Lumia 920, WP Denim), or more probably some enterprise Mobile Device Management (MDM) policy set by my workplace (I do work for Microsoft, after all ). Out of curiosity, I looked for such a policy in the [WP MDM docs](https://www.microsoft.com/en-us/download/details.aspx?id=42508) and couldn&#8217;t find one, but perhaps it is an implicit side effect of some other policy. It&#8217;s possible that the upcoming Windows 10 update will change things, but at this point in time it doesn&#8217;t seem like there&#8217;s anything I can do about it on my end.

I was undeterred, however. As the saying goes &#8211; If the mountain won&#8217;t come to Muhammad, then Muhammad must go to the mountain. Windows Phone wants a &#8220;real&#8221; domain and not and IP? I&#8217;ll give him one, by [rewiring the DNSMasq rules](https://coolaj86.com/articles/redirect-domains-and-dns-using-dd-wrt.html) in my DD-WRT router to redirect a made-up domain of my choice to the Roku&#8217;s IP. Using a rule as simple as

<pre class="brush: plain; title: ; notranslate" title="">address=/ohadroku.com/192.168.1.134</pre>

I was able to trick the HttpClient by sending my requests to ohadroku.com, and it worked from the device as well. I then went back to [one of the Roku apps](https://www.microsoft.com/en-us/store/apps/remote-4-roku-free/9nblggh08xlw) that allows you to use a domain name to identify the Roku device (the official one forces you to use an IP address) and typed in my made-up domain. Brimming in anticipation, I clicked the _Home_ button on the WP remote app and sure enough &#8211; the call went through to the Roku device, which executed the command flawlessly.

If your router doesn&#8217;t support domain redirection, you can use a domain you own to do a similar trick. For example, I could have simply added a DNS _A record_ mapping _roku.ohadsoft.com_ to the router&#8217;s IP and it would have worked the same. This might be confusing since the router&#8217;s IP is not an internet-accessible address, but inside your private network it doesn&#8217;t matter. The app would resolve _roku.ohadsoft.com_ (using an actual DNS server) to the router&#8217;s (internal) IP address, and since the app is working from inside the network as well, the requests would work.

This spelled the end of _RemoRoku_ before it was even born, and with it my inevitable rise to fame and fortune. I guess you can&#8217;t win them all!

The DNSMasq rule did have one unfortunate side effect though &#8211; it seems that Plex secure connections require [additional configuration](https://support.plex.tv/hc/en-us/articles/206225077) in order to work alongside it, and that configuration is [not supported on DD-WRT without compromising security or switching a DNS provider](https://www.dd-wrt.com/phpBB2/viewtopic.php?p=974492&sid=b4aa2b93493a2952712709e8247e900d#974492) (which I did not feel like doing at 4 AM). So I just approved insecure Plex connections inside my private network &#8211; I trust my WPA2 protection so I won&#8217;t lose much sleep over this.

TLDR

  1. Redirect a made-up domain of your choice to your Roku&#8217;s IP address (you can find it in its network settings). This must be done at the router / DNS level, so look for instructions depending on your setup. In DD-WRT you add something like this to the _Services_ -> _Additional DNSMasq Options_ box: _address=/ohadroku.com/192.168.1.134._ For more information see this [article](https://coolaj86.com/articles/redirect-domains-and-dns-using-dd-wrt.html).
  2. Go to the Windows Phone Store and download a Roku remote app that allows you to specify the Roku&#8217;s address using a domain name and use your made-up domain. I used [Remote 4 Roku Free](https://www.microsoft.com/en-us/store/apps/remote-4-roku-free/9nblggh08xlw).
  3. Enjoy your functioning WP Roku Remote!