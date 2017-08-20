---
id: 411
title: 'Getting started with ETW using .NET&#8217;s EventSource'
date: 2014-10-13T13:26:18+00:00
author: ohadsc
layout: post
guid: http://ohadsc.wordpress.com/?p=411
permalink: /2014/10/getting-started-with-etw-using-nets-eventsource/
sharing_disabled:
  - "1"
categories:
  - Uncategorized
---
.NET 4.5 introduced the [EventSource](http://msdn.microsoft.com/en-us/library/system.diagnostics.tracing.eventsource(v=vs.110).aspx) class, allowing convenient access to [Event Tracing for Windows (ETW)](http://msdn.microsoft.com/en-us/library/windows/desktop/bb968803(v=vs.85).aspx) from managed code. This is a boon for enterprise developers, and I encourage you to go read up on it at [MSDN](http://msdn.microsoft.com/en-us/library/system.diagnostics.tracing.eventsource(v=vs.110).aspx). Also, be sure sure to check out [Vance Morrison’s EventSource blog entries](http://blogs.msdn.com/b/vancem/archive/tags/eventsource/). Another useful blog by MS MVP Kathleen Dollard is [Leaning into Windows](http://blogs.msmvps.com/kathleen/), and [Muhammad Shujaat Siddiqi&#8217;s blog](http://www.shujaat.net/) is worth checking out as well.

Once you&#8217;ve got the hang of EventSource, take it to the next level with the Enterprise Library [Semantic Logging Application Block (SLAB)](https://slab.codeplex.com/). You can do some pretty cool stuff with it, including verification of your EventSource class validity, and automatic routing of ETW events to different storage platforms (such as databases, Azure tables, and text files). Start with the [developer&#8217;s guide](http://msdn.microsoft.com/en-us/library/dn440729(v=pandp.60).aspx).

Finally, if you take a close look at the documentation of the [EventSource](http://msdn.microsoft.com/en-us/library/system.diagnostics.tracing.eventsource(v=vs.110).aspx) class, you&#8217;ll notice the following note:

> There is a NuGet version of the EventSource class that provides more features. For more information, see [Microsoft EventSource Library 1.0.16](https://www.nuget.org/packages/Microsoft.Diagnostics.Tracing.EventSource).

I couldn&#8217;t find any documentation for this mysterious NuGet package, but I did find its [samples package](https://www.nuget.org/packages/Microsoft.Diagnostics.Tracing.EventSource.Samples). Once you install it you can take a look at the extensively documented code as well as debug and step into the parts you&#8217;re interested in. Be sure to read the guides that accompany the samples: __EventRegisterUsersGuide.docx_ and __EventSourceUsersGuide.docx_ &#8211; they pertain to the vanilla library that comes with .NET as well (not just the NuGet package).

One thing I couldn&#8217;t find is a list of differences between the vanilla .NET EventSource and the NuGet package. Going by the signatures, I only saw a couple more _WriteEvent_ overloads. If you&#8217;ve read the [documentation](http://msdn.microsoft.com/en-us/library/hh393360(v=vs.110).aspx), you should know by now that that&#8217;s a [good thing](http://msdn.microsoft.com/en-us/library/system.diagnostics.tracing.eventsource.writeeventcore(v=vs.110).aspx), however digging a little into the code I found another important difference &#8211; event type support.

The .NET version currently supports the following types (taken from ManifestBuilder.GetTypeName):

  1. _Enum_
  2. _Boolean_
  3. _SByte_
  4. _Byte_
  5. _Int16_
  6. _UInt16_
  7. _Int32_
  8. _UInt32_
  9. _Int64_
 10. _UInt64_
 11. _Single_
 12. _Double_
 13. _DateTime_
 14. _String_
 15. _Guid_

The NuGet package adds support for the following:

  1. Char
  2. IntPtr
  3. Byte*
  4. Byte[]

Finally, the [beta pre-relase](https://www.nuget.org/packages/Microsoft.Diagnostics.Tracing.EventSource/1.1.7-beta) includes a very interesting overload: _public void Write<T>(string eventName, T data). _The _data _parameter is documented as follows:

> The object containing the event payload data. The type T must be an anonymous type or a type with an [EventData] attribute. The public instance properties of data will be written recursively to create the fields of the event.

In other words, we should be able to use annotated custom types (in a similar fashion to WCF DataContract-annotated objects). But even better than that, we should be able to say:

<pre class="brush: csharp; title: ; notranslate" title="">[Event(1)]
public void Bar(int i, string s, DateTime d)
{
    Write(null, new {I = i, S = s, D = d});
}
</pre>

Notice I said _should,_ because I could make neither work (beta after all). But why do we even need this when we already have the _WriteEvent(int eventId, params Object[])_ overload? Well, let&#8217;s look at the [documentation](http://msdn.microsoft.com/en-us/library/hh393360(v=vs.110).aspx) of the latter:

> By default, the compiler calls this overload if the parameters for the call do not match one of the other method overloads. This overload is much slower than the other overloads, because it does the following:
> 
>   1. It allocates an array to hold the variable argument.
>   2. It casts each parameter to an object (which causes allocations for primitive types).
>   3. It assigns these objects to the array.
>   4. It calls the function, which then determines the type of each argument so it can be serialized for ETW.

Using an anonymous types, we save the boxing (bullet 2) and unboxing (post bullet 4). I&#8217;m not sure how big of a benefit that is, so we may still be forced to use the _WriteEventCore _method, but I suppose every little bit helps!