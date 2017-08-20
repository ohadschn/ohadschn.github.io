---
id: 334
title: 'The Windows API Code Pack &#8211; the case of the missing samples'
date: 2014-06-13T15:35:55+00:00
author: ohadsc
layout: post
guid: http://ohadsc.wordpress.com/?p=334
permalink: /2014/06/the-windows-api-code-pack-the-case-of-the-missing-samples/
geo_public:
  - "0"
categories:
  - Uncategorized
---
The [Windows API Code Pack](http://msdn.microsoft.com/en-us/library/ff356173(v=vs.110).aspx) can be a boon for managed code developers wanting to access Windows functionality such as the TaskBar, Windows Shell, DirectX, Aero, Sensors, and more (see the article for a more complete list).

Unfortunately, the [original link](http://go.microsoft.com/fwlink/?LinkId=182523) is dead (as is the entire MSDN Archive Gallery, may it rest in peace) &#8211; you can try the [wayback machine](https://web.archive.org/web/20100926081207/http://code.msdn.microsoft.com/WindowsAPICodePack/Release/ProjectReleases.aspx?ReleaseId=4906) but the download link won&#8217;t work. As it turns out, the code pack has found a new home in the Nuget repository:

  * [Windows 7 API Code Pack w/ XML Documentation &#8211; Core 1.1.0.2](http://www.nuget.org/packages/Microsoft.WindowsAPICodePack-Core/)
  * [Windows 7 API Code Pack w/ XML Documentation &#8211; Shell 1.1.0](http://www.nuget.org/packages/Microsoft.WindowsAPICodePack-Shell/)
  * [Windows API Code Pack &#8211; Sensors 1.1.0](http://www.nuget.org/packages/WindowsAPICodePack-Sensors/)
  * [Windows API Code Pack &#8211; Extended Linguistic Services 1.1.0](http://www.nuget.org/packages/WindowsAPICodePack-ExtendedLinguisticServices/)

This is all well and good, but these are just the binaries &#8211; where are the original code samples? The documentation comprises of thin XML API coverage, not nearly enough for a developer wanting to get started with development quickly. The original download contained many useful samples and these don&#8217;t seem to be available anymore.

Fortunately, a quick web search revealed quite a few mirrors of the original package (in its latest 1.1 version) :

  * [whipstaff](https://github.com/dpvreony/whipstaff/tree/master/ThirdParty/Windows%20API%20Code%20Pack)
  * [TimeTrack](https://github.com/geselle-jan/TimeTrack/tree/master/Windows%20API%20Code%20Pack%201.1)
  * [neith](https://code.google.com/p/neith/source/browse/externals/WindowsAPICodePack/?name=2ea76a5624&r=94d6818df0ea24aa5c5009b379d1af045e2638d3)
  * [psd-thumbnail-codec](https://code.google.com/p/psd-thumbnail-codec/source/browse/trunk/Windows+API+Code+Pack+1.1/?r=2#Windows%20API%20Code%20Pack%201.1%2Fsource)

And just because I&#8217;m paranoid, I&#8217;ve uploaded a copy to my [OneDrive.](https://onedrive.live.com/redir?resid=DED6DB63D5309C3D!3235&authkey=!AIZB5s5MTGgfh4A&ithint=folder%2c)

But wait, there&#8217;s more! The [Windows 7 Training Kit For Developers](http://www.microsoft.com/en-us/download/confirmation.aspx?id=6450) contains yet additional samples using the Windows API Code Pack!

Happy coding 🙂

&nbsp;