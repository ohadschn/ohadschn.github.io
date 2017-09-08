---
id: 705
title: Killing processes properly
date: 2016-05-11T17:00:48+00:00
author: ohadsc
layout: post
guid: http://www.ohadsoft.com/?p=705
permalink: /?p=705
categories:
  - Uncategorized
---
<pre class="brush: plain; title: ; notranslate" title="">echo Attempting to kill leftover vstest.console.exe processes...
taskkill /IM vstest.console.exe

IF %ERRORLEVEL% EQU 128 (
    echo No vstest.console.exe processes found
    exit /b 0
)

IF %ERRORLEVEL% EQU 0 (
    echo Sent termination signal to vstest.console.exe process(es) - waiting for them to shut down...
    timeout 10
)

echo Terminating remaining vstest.console.exe processes forcefully...
taskkill /IM vstest.console.exe /F

IF %ERRORLEVEL% EQU 128 (
    echo vstest.console.exe process(es) successfully terminated (cleanly)
    exit /b 0
)

IF %ERRORLEVEL% EQU 0 (
    echo vstest.console.exe process(es) successfully terminated (forcefully)
    exit /b 0
)

echo Could not terminate vstest.console.exe
exit 1
</pre>