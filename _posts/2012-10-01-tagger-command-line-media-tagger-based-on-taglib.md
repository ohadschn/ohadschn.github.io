---
id: 83
title: 'Tagger# &#8211; command-line media tagger based on TagLib#'
date: 2012-10-01T14:52:00+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=83
permalink: /2012/10/tagger-command-line-media-tagger-based-on-taglib/
categories:
  - Uncategorized
---
Like I mentioned a [couple](http://ohadsc.wordpress.com/2010/03/26/streamrecorder-net/) of [times](http://ohadsc.wordpress.com/2012/09/30/recording-internet-radio/), I like listening to and recording internet radio. Sometimes the radio shows I record are streamed in WMA format. Using [Streamrecorder.NET](https://sourceforge.net/projects/streamrecnet/), I&#8217;ve scheduled a weekly recording and so I have a folder filled with them. Now, the file names are timestamped, which means I can easily tell the date of each show. However, this radio station (and I suspect many others) has the nasty habit of changing the _Title_ and _Artist_ tags to the station&#8217;s name. This means that when I open this folder in my [favorite audio player](http://www.foobar2000.org/), all the files display as _Some station &#8211; Some station _which is pretty annoying. The solution appeared simple enough, just strip the WMA tag information from the file, right? Sure, but the only problem is that to the best of my knowledge, **for around [10 years](http://www.un4seen.com/forum/?topic=1963.0) there hasn&#8217;t been a single windows command-line tool that is able to edit (or even display) WMA metadata.** I haven&#8217;t seen anything for Linux and Mac as well, though I was less thorough in my search there. In any case, there is one now:

<https://sourceforge.net/projects/taggersharp/>

It&#8217;s basically a [command-line](http://www.ndesk.org/Options) wrapper over [TagLib#](https://github.com/mono/taglib-sharp), supporting most of its cross-format tagging options. To use it as a post processor in Streamrecorder.NET for the purpose I mentioned above, enter **{in} -e** in its arguments field. Check it out !

<a href="http://ohadsoft8.azurewebsites.net/wp-content/uploads/2012/10/taggersharp4.png" rel="lightbox[83]"><img class="alignnone size-full wp-image-91" title="TaggerSharp" src="http://ohadsoft8.azurewebsites.net/wp-content/uploads/2012/10/taggersharp4.png" alt="TaggerSharp" width="450" height="427" srcset="https://www.ohadsoft.com/wp-content/uploads/2012/10/taggersharp4.png 628w, https://www.ohadsoft.com/wp-content/uploads/2012/10/taggersharp4-300x285.png 300w" sizes="(max-width: 450px) 85vw, 450px" /></a>