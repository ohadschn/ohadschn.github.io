---
id: 714
title: Saving crash dumps on process crashes
date: 2016-05-18T20:58:05+00:00
author: ohadsc
layout: post
guid: http://www.ohadsoft.com/?p=714
permalink: /?p=714
categories:
  - Uncategorized
---
This is useful for two reasons
  
1. In continuous integration scenarios, you don&#8217;t want your tasks stuck on some IT dialog waiting for user input
  
2. Dump analysis is invaluable in tracking down issues (for some WinDbg tips see this post)

<pre class="brush: plain; title: ; notranslate" title="">Windows Registry Editor Version 5.00
 
;This reg file installs WER and just-in-time debuggers to capture a dump of all process crashes for the machine:
;
; https://msdn.microsoft.com/en-us/library/windows/desktop/bb787181(v=vs.85).aspx
; https://blogs.msdn.com/b/dotnet/archive/2009/10/15/automatically-capturing-a-dump-when-a-process-crashes.aspx
;
;Assumes 32-bit debugger is cdb.exe and is installed to c:\debuggers\x86\.
;Assumes 64-bit debugger is cdb.exe and is installed to c:\debuggers\x64\.
;Get the debuggers from the latest Windows SDK (you only need to install "Debugging Tools for Windows")
;
;Assumes crash dumps can be written to d:\dumps - make sure all users have write access to this directory!
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Windows Error Reporting]
"DontShowUI"=dword:00000001

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Windows Error Reporting\localdumps]
"dumpfolder"="d:\\dumps"
"dumpcount"=dword:00000064
"dumptype"=dword:00000002

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AeDebug]
"Debugger"="\"c:\\debuggers\\x64\\cdb.exe\" -pv -p %ld -c \".dump /u /ma d:\\dumps\\crash.dmp;.kill;qd\""
"Auto"="1"

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\.NETFramework]
"DbgManagedDebugger"="\"c:\\debuggers\\x64\\cdb.exe\" -pv -p %ld -c \".dump /u /ma d:\\dumps\\crash.dmp;.kill;qd\""
"DbgJITDebugLaunchSetting"=dword:00000002
 
;The following keys are only used on 64-bit versions of Windows (note Wow6432Node).
;They can be safely created with no side-effects on 32-bit versions of Windows.

[HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Windows\Windows Error Reporting]
"DontShowUI"=dword:00000001

[HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Windows\Windows Error Reporting\localDumps]
"dumpfolder"="d:\\dumps"
"dumpcount"=dword:00000064
"dumptype"=dword:00000002

[HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Windows NT\CurrentVersion\AeDebug]
"Debugger"="\"c:\\debuggers\\x86\\cdb.exe\" -pv -p %ld -c \".dump /u /ma d:\\dumps\\crash.dmp;.kill;qd\""
"Auto"="1"
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\.NETFramework]
"DbgManagedDebugger"="\"c:\\debuggers\\x86\\cdb.exe\" -pv -p %ld -c \".dump /u /ma d:\\dumps\\crash.dmp;.kill;qd\""
"DbgJITDebugLaunchSetting"=dword:00000002
</pre>