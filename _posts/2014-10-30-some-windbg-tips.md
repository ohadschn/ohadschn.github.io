---
id: 415
title: Some WinDbg tips
date: 2014-10-30T00:20:51+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=415
permalink: /2014/10/some-windbg-tips/
sharing_disabled:
  - "1"
categories:
  - Software-Development
tags:
  - Debugging
  - Production-Debugging
  - WinDbg
---
I&#8217;ve gathered some WinDbg tips over time (mostly for managed dump analysis) and this seems like as good a place as any to share them, so here you go.

**Preparation (one time)**

  * Install the latest debugging tools from the [Dev Center](http://msdn.microsoft.com/en-us/windows/hardware/hh852365.aspx) 
      * Let’s assume you install them to _c:debuggers_
  * Download [_sosex.dll_](http://www.stevestechspot.com/default.aspx) and place it in _c:debuggers_
  * Create an environment variable named **\_NT\_SYMBOL_PATH** with the value _C:Symbols;srv\*C:symbols\*http://msdl.microsoft.com/download/symbols_ 
      * Most Microsoft symbols should be found in the symbol server and will be cached in C:Symbols
      * You can copy any other symbols (PDBs) you have to the _C:Symbols_ folder as well
  * Create an environment variable named **\_NT\_SOURCE_PATH** with the value _srv* _ 
      * This will enable source serving (when source indexing was included in the build) &#8211; simply double-click the relevant line in the Call Stack (calls) window and you should jump straight to the relevant line in the source code.
      * You might wonder how that&#8217;s possible when no server was specified. The answer is a bit surprising &#8211; strictly speaking, there is no such thing as a source server! The name is a bit misleading. What actually happens is that the source-indexed PDB contains the proper command(s) to retrieve the relevant source files. By default this &#8220;command&#8221; would be something like _C:srcfoo.cs,_ and it would only work if the file in the correct version is actually there. However, if source-indexing was enabled in TFS build, it would look something like _tf get MyClass.cs /version:C8_ (i.e. the file will be retrieved directly from source, with the correct version).

**Preparation (per debugging session)**

  * Open the dump file in WinDbg 
      * be sure to match the architecture to the analyzed process &#8211; use WinDbg x86 for 32-bit processes and WinDbg x64 for 64-bit processes
  * Enable Debugger Markup Language (DML) by issuing _.prefer_dml 1_ 
      * This will make the output of some commands contain convenient hyperlinks
  * Load the SOSEX extension by issuing the command _.load sosex.dll_ 
      * Don&#8217;t load _SOS.dll_ manually &#8211; the first command below (_analyze -v_) will load it with the correct version automatically

**Debugging**

  * Automatic exception analysis: _!analyze -v_ 
      * In many cases this will suffice to find the root cause!
  * Threads 
      * !Threads &#8211; lists all the managed threads in the process
  * Stack commands 
      * _!clrstack_ &#8211; provides a true stack trace for managed code only
      * _!dumpstack_ &#8211; provides a verbose stack trace
      * _!eestac_ &#8211; runs _!dumpStack_ on all threads in the process
      * _!dso_ &#8211; displays any managed objects within the bounds of the current stack
      * _!sosex.mk_ &#8211; produces and displays a merged stack trace of managed and unmanaged frames. Note that in addition to the native offset, a managed (IL) offset is specified &#8211; this is extremely useful for debugging _NullReferenceException&#8217;_s in that the exact offending IL instruction is indicated (actually it will be one instruction before the offending one in the specific case of _NullReferenceException_)
      * _!sosex.mdso_ &#8211; dumps object references on the stack and in CPU registers in the current context
      * _!sosex.mdv_ &#8211; displays argument and local variable information for the current frame
      * _!sosex.mframe_ &#8211; displays or sets the current managed frame for the _!mdt_ and _!mdv_ commands
  * Heap commands 
      * _!eeheap_ &#8211; enumerates process memory consumed by internal CLR data structures
      * _!DumpHeap_ &#8211; traverses the garbage collected heap
  * Object commands 
      * _!do_ &#8211; allows you to examine the fields of an object, as well as learn important properties of the object
      * _!dumparray_ &#8211; examines elements of an array object
      * _!dumpvc_ &#8211; examines the fields of a value class
      * _!sosex.mdt_ &#8211; displays the fields of the specified object or type
  * Method commands 
      * _!dumpmt_ &#8211; examines a MethodTable
      * _!DumpIL_ &#8211; prints the IL code associated with a managed method
      * _!U_ &#8211; presents an annotated disassembly of a managed method
      * _!sosex.muf_ &#8211; disassembles the method specified by the given MD or code address with interleaved source, IL, and assembly code
  * Exception commands 
      * _!pe exceptionAddress _&#8211; formats fields of any object derived from _System.Exception_
  * GC commands 
      * _!GCRoot_ &#8211; looks for references (or roots) to an object
  * SOS Help 
      * _!sos.help_
      * _!sos.help FAQ_
  * SOSEX Help 
      * _!sosexhelp_ or _!sosex.help_

**Mismatched SOS.dll versions**

_!analyze -v_  should get the correct _SOS.dll_ version for you. Even if for some reason it doesn’t, _SOS.dll_ warnings can be ignored most of the time, so long as the _mscordacwks.dll_ version is correct (see the next section if that&#8217;s not the case). However there may be cases where the correct _SOS.dll_ version is needed (or perhaps you just want to get rid of the warning). Here are some places to look for it (once you find it, copy it to your debugger folder and issue _.load sos.dll_):

  * Your best bet is the machine on which the dump was taken. Provided that it&#8217;s accessible and wasn&#8217;t patched since the time the dump was taken, the correct version should be found at _C:WindowsMicrosoft.NETFramework64v4.0.30319SOS.dll_. Of course it should be there on your machine as well, and your local version may happen to match (or be close enough).
  * You may find the version you&#8217;re looking for [here](http://www.mskbfiles.com/sos.dll.php) (you should be able to extract the file from the update package itself using 7-zip).
  * You may also want to try _Psscor4.dll_ instead of _SOS.dll_ (_Psscor_ is a superset of _SOS_) &#8211; its version need not match the dump (aside of being .NET 4.0). Note that it is less maintained than SOS.
  * For more information see <http://stackoverflow.com/a/23244429/67824>

**Mismatched mscordacwks.dll versions**

WinDBG should find the correct _mscordacwks.dll_ automatically and download it from the symbol server. If that doesn&#8217;t happen, try and do it explicitly by running _.cordll -ve -u -l_ (you&#8217;d might want to first run _!sym noisy_ and/or _!symfix_ in order to troubleshoot better &#8211; see the next section for details). Failing that, try and get the correct version from the following places, and run _.cordll -u -ve -lp PathToFolderContainingMscorDAC_ once you have it.

  * Again, your best bet is the machine on which the dump was taken (under the same caveats as above). It should be found at _C:WindowsMicrosoft.NETFramework64v4.0.30319mscordacwks.dll._ As before, it will be there on your machine so you could luck out.
  * The following [post](http://blogs.msdn.com/b/dougste/archive/2011/09/30/version-history-of-the-clr-4-0.aspx) lists many versions of CLR 4.0, you may be able to extract the correct version with the same method as above (use 7-zip to open the cab files inside the archive).
  * For more information see <http://stackoverflow.com/a/23244429/67824>

**Troubleshooting missing symbols and sources**

  * _!sym noisy_ &#8211; increases symbol verbosity (always enable this when troubleshooting symbol issues)
  * _.srcnoisy 3_ &#8211; increases source resolution vebosity (use it when double-clicking lines in the callstack window doesn&#8217;t bring up the correct sources)
  * _lm_ &#8211; displays the specified loaded modules 
      * _lme_ displays only modules that have a symbol problem (very useful)
  * _.reload /f_ &#8211; forces the reloading of all symbols 
      * _.reload /f SomeAssembly.dll_ &#8211; forces the reloading of a specified DLL

For further reading try to hit F1 inside WinDbg &#8211; the documentation is very good !