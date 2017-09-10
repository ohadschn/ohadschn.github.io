---
id: 248
title: Creating managed wrappers for COM interfaces
date: 2014-05-31T21:11:35+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=248
permalink: /2014/05/creating-managed-wrappers-for-com-interfaces/
categories:
  - Software-Development
tags:
  - .NET
  - COM
  - Interop
---
<p style="text-align:left;">
  <a href="https://msdn.microsoft.com/en-us/library/aa645736(v=vs.71).aspx">COM interop</a> can be a very useful tool, but it requires the definitions of the unmanaged interfaces one wants to use. This may be a little tricky, so here&#8217;s a small guide to help you out. Note that much of the advice below is applicable to P/Invoke as well.
</p>

<p style="text-align:left;">
  <strong>Make sure it&#8217;s necessary</strong>
</p>

<p style="text-align:left;">
  Many COM APIs have managed counterparts, so make sure you don&#8217;t waste your time doing what the BCL team already did for you. A quick search would usually lead you to the right StackOverflow / MSDN page. Make sure you check the <a href="{{ '/2014/06/the-windows-api-code-pack-the-case-of-the-missing-samples/' | absolute_url }}">Windows API Code Pack</a> too.
</p>

<p style="text-align:left;">
  <strong>See if it&#8217;s been done</strong>
</p>

<p style="direction:ltr;text-align:left;">
  Many times, the interface you want to use has already been written in managed form. For example, <a href="https://msdn.microsoft.com/en-us/library/system.runtime.interopservices.comtypes.ipersistfile(v=vs.110).aspx"><em>IPersistFile </em></a>is already defined in <em>mscorlib.dll</em> (hint: you already have this referenced in your project by default) under the <em>System.Runtime.InteropServices.ComTypes </em>namespace<em>. </em>
</p>

<p style="direction:ltr;text-align:left;">
  A quick <a href="https://www.google.com/search?q=site:msdn.microsoft.com+IUniformResourceLocator#q=site%3Amsdn.microsoft.com+intitle%3A%22IPersistFile+interface%22">MSDN search</a> should start you off in the right direction &#8211; you&#8217;d be surprised where you find some of them&#8230; For example, <em>Microsoft.VisualStudio.TestTools.UITest.Extension </em>contains <em><a href="https://msdn.microsoft.com/en-us/library/microsoft.visualstudio.testtools.uitest.extension.iuniformresourcelocator.aspx">IUniformResourceLocator</a><a href="https://msdn.microsoft.com/en-us/library/microsoft.visualstudio.testtools.uitest.extension.iuniformresourcelocator.aspx">,</a> </em>and <em>Microsoft.VisualStudio.OLE.Interop</em> contains <em><a href="https://msdn.microsoft.com/en-us/library/microsoft.visualstudio.ole.interop.ipropertystorage.aspx">IPropertyStorage</a></em>. Searches <a href="https://stackoverflow.com/questions/16798407/windows-structured-storage-32-bit-vs-64-bit-com-interop#comment36935736_16798407">beyond MSDN</a> could be worthwhile as well, especially note <a href="http://www.pinvoke.net/">PInvoke.net</a>. Another useful source is <a href="https://code.ohloh.net/">Ohloh code search</a> (note that you can filter by language, e.g. C#).
</p>

<p style="direction:ltr;text-align:left;">
  If you don&#8217;t want to take a dependency on the assembly that has the definition you want, you can always copy the definitions you need to your source (e.g. from Reflector).
</p>

<p style="direction:ltr;text-align:left;">
  Another repository of managed code definitions is embedded in the <a href="https://clrinterop.codeplex.com/releases/view/14120">P/Invoke Interop Assistant</a> (more on this tool later).
</p>

<p style="direction:ltr;text-align:left;">
  <strong>Use TlbImp</strong>
</p>

<p style="direction:ltr;text-align:left;">
  Sometimes you won&#8217;t find the interface you want defined anywhere. Fortunately,<em> <a href="https://msdn.microsoft.com/en-us/library/tt0cf3sx(v=vs.110).aspx">TlbImp</a> </em>can automatically create the needed managed COM definitions for you, provided that you can feed it with the appropriate <em><a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa366757(v=vs.85).aspx">type library</a></em> (.tlb) files (note that these could be embedded in EXE and DLL files as resource) .
</p>

<p style="direction:ltr;text-align:left;">
  That would have been straightforward had the OS / SDK actually come with tlb files for the entire Win32 COM API, but <a href="https://stackoverflow.com/questions/24034316/given-a-win32-com-interface-locate-its-typelib">that is not always the case</a>. Instead, you can <em>usually</em> find an <em>interface definition</em> (.idl) file containing the interface you desire (use <a href="https://technet.microsoft.com/en-us/library/bb490907.aspx">findstr </a>or something like <em>find in files</em> in Notepad++).
</p>

<p style="direction:ltr;text-align:left;">
  Once you find the relevant IDL file, you will need to compile it into a TLB file, which in turn could be fed to TlbImp. The <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa367300(v=vs.85).aspx">midl</a> compiler does just that, but <a href="https://msdn.microsoft.com/en-us/library/cwhhsx92(v=vs.110).aspx">it will only produce <em>tlb</em> files for Library definitions</a>, which may not be present. Fortunately, we can simply inject some Library definition with the interfaces we want into the IDL file and thus &#8220;trick&#8221; midl into producing the tlb.
</p>

<p style="direction:ltr;text-align:left;">
  For example, suppose you want to get the managed definition of the <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa379840(v=vs.85).aspx"><em>IPropertySetStorage </em></a>interace, which resides in <em>[SDKFolder]IncludeumPropIdl.Idl. </em>
</p>

<li style="text-align:left;">
  Open <em>PropIdl.Idl </em>in your favorite text editor
</li>
<li style="text-align:left;">
  Add the following after the definition of <em>IPropertySetStorage:<br /> [ uuid( 03383777-9430-4A45-9417-38B4B5CB4143 )] // (use guidgen.exe to generate this guid)<br /> </em>library TempLib {<br /> interface IPropertySetStorage;<br /> }
</li>
<li style="text-align:left;">
  Run <em>midl <em>PropIdl.Idl</em></em>
</li>
<li style="text-align:left;">
  Run tlbimp <em><em>PropIdl.tlb</em></em>
</li>
<li style="text-align:left;">
  Don&#8217;t forget to undo your changes to <em><em>PropIdl.Idl !</em></em>
</li>

You will now have _TempLib.dll_ containing all the required definitions for the interface.

**Use the P/Invoke Interop Assistant**

Sometimes you can&#8217;t even find IDL definitions for the interfaces you want, and in those cases you have to go hardcore and define them yourself. Note that you should look at the unmanaged definitions in the header (.h) file itself (again find it in the SDK folder with _findstr_ or a similar tool) rather than the MSDN documentation, as [definition order is very important](https://stackoverflow.com/questions/23974617/reordering-methods-in-comimport-interfaces-throws-comexception-0x80041001) and the docs don&#8217;t preserve it. MSDN may also present the signatures of the ANSI interface, whereas you&#8217;d likely want the Unicode variety (in the header file, they will be defined as InterfaceA for ANSI and InterfaceW for Unicode).

As for the signature conversion itself, the CLR Interop team has released the [P/Invoke Interop Assistant](https://clrinterop.codeplex.com/releases/view/14120) to, well, assist you with that. Basically, you paste in the unmanaged signature of the interface / struct you want to use (grab them from [MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/aa379965(v=vs.85).aspx)), and it generates the managed definitions for you. Note that it may need your help sometimes for typedefs it doesn&#8217;t know (in these cases you need to &#8220;unwrap&#8221; the typedefs until you reach something it knows,  usually a basic type) so browsing the actual header files in Visual Studio may be more convenient (simply start a new Win32 project and include the desired header).

For more information on marshaling data between managed and unmanaged code see [Marshaling Data with Platform Invoke](https://msdn.microsoft.com/en-us/library/fzhhdwae(v=vs.110).aspx). The [P/Invoke Data Types table](https://msdn.microsoft.com/en-us/library/ac7ay120(v=vs.110).aspx) and the [COM Data Types table](https://msdn.microsoft.com/en-us/library/sak564ww(v=vs.110).aspx) are great cheat-sheets to have handy, too.