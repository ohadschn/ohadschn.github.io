---
id: 748
title: 'ET4W &#8211; generate C# ETW classes from JSON event specifications using T4'
date: 2016-10-21T15:33:04+00:00
author: ohadsc
layout: revision
guid: http://www.ohadsoft.com/2016/10/734-revision-v1/
permalink: /2016/10/734-revision-v1/
---
<a href="https://github.com/ohadschn/ET4W" target="_blank"><img src="https://raw.githubusercontent.com/ohadschn/ET4W/master/docs/Transformation.png" width="777" height="406" alt="ET4W" class="aligncenter size-medium" /></a>

<a href="https://msdn.microsoft.com/en-us/library/dn774985(v=pandp.20).aspx" target="_blank">Event Tracing for Windows (ETW)</a> is the best tracing solution for the Windows platform, period. It is unmatched in performance and reliability. More and more tools are built to analyze its events to amazing depth. Microsoft explicitly recommends it for almost any logging purpose.

Unfortunately, writing proper ETW classes is a bit <a href="https://msdn.microsoft.com/en-us/library/dn774985(v=pandp.20).aspx" target="_blank">tricky</a>. It used to be <a href="https://blogs.msdn.microsoft.com/seealso/2011/06/08/use-this-not-this-logging-event-tracing/" target="_blank">much worse</a> (before the advent of automatic manifest generation), but there&#8217;s still a lot of code that has to be written manually in a very specific way. Not only is it tedious, it also leaves plenty of room for user error.

  * You have to decorate each event method with <a href="https://msdn.microsoft.com/en-us/library/system.diagnostics.tracing.eventattribute(v=vs.110).aspx" target="_blank"><code>EventAttribute</code></a> (theoretically optional, but in practice you&#8217;ll do this for every single method).
  * You then have to call <a href="https://msdn.microsoft.com/en-us/library/hh393412(v=vs.110).aspx" target="_blank"><code>WriteEvent</code></a> in a very specific manner &#8211; the event ID and parameters must match exactly and in order.
  * Tasks and keywords should be specified using nested classes with a very specific structure.
  * You are encouraged to expose the class in a very specific singleton pattern.
  * You must be aware of the exact types supported by ETW (not documented anywhere, so you have to reflect it off `ManifestBuilder.GetTypeName`).
  * If you want to log types that aren&#8217;t supported, it&#8217;s your responsibility to invoke the appropriate conversions (typically via manually created wrapper classes).
  * If you want some common parameters to be present in every event, you have to add them manually to each method, and provide them manually in each call.

Enter <a href="https://github.com/ohadschn/ET4W" target="_blank">ET4W</a>.

This <a href="https://msdn.microsoft.com/en-us/library/bb126445.aspx" target="_blank">T4 Text Templete</a> based NuGet package will solve all these issues for you. All you have to do is write a JSON file specifying the events you want, as well as the custom types you want to support and the common parameters you want present. There&#8217;s even a JSON schema for in-editor validation and auto-completion (supported in Visual Studio and other editors). 

ET4W will take care of the rest, creating full-fledged <a href="https://msdn.microsoft.com/en-us/library/system.diagnostics.tracing.eventsource(v=vs.110).aspx" target="_blank"><code>EventSource</code></a> classes according to all the <a href="http://blogs.msmvps.com/kathleen/2014/01/24/how-are-event-parameters-best-used-to-create-an-intuitive-custom-evnetsourcetrace/" target="_blank">best practices</a> (both <a href="https://msdn.microsoft.com/en-us/library/system.diagnostics.tracing(v=vs.110).aspx" target="_blank">System.Diagnostics.Tracing</a> and <a href="https://www.nuget.org/packages/Microsoft.Diagnostics.Tracing.EventSource" target="_blank">Microsoft.Diagnostics.Tracing</a> are supported). In addition, wrapper classes are created to support common parameters and custom types. Finally, a few extra validations are thrown into the mix.

Check it out!
  
<a href="https://github.com/ohadschn/ET4W" target="_blank">https://github.com/ohadschn/ET4W</a> (Apache 2.0)

P.S. one of the nice thing about this approach is that it lends itself well to cross-platform event consistency. By building similar generation scripts for other languages (VB, C++, etc), you could leverage the same event JSON to maintain a &#8220;single source of truth&#8221; for your events across various platforms (critical for telemetry measurements, for example).