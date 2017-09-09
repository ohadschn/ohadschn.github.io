---
id: 757
title: Tab selects text instead of indenting in Visual Studio
date: 2016-12-04T15:43:10+00:00
author: ohadsc
guid: http://www.ohadsoft.com/?p=757
permalink: /2016/12/tab-selects-text-instead-of-indenting-in-visual-studio/
categories:
  - Software-Development
  - Tips
tags:
  - Visual-Studio
  - Resharper
---
I ran into an annoying phenomena today when I tried indenting some multi-line expression I had in my code. I pressed TAB but instead of indenting, it selected some text. This was driving me mad so I started enabling and disabling extensions (binary search to the rescue) until I isolated the culprit &#8211; Resharper.

It turns out that <a href="https://blog.jetbrains.com/dotnet/2016/08/18/resharper-ultimate-2016-2-is-here/" target="_blank">Resharper Ultimate 2016.2 introduced a new <em>Structural navigation</em> feature</a> (enabled by default) that makes tab move text selections instead of indenting when pressed mid-line. I also found out that <a href="https://resharper-support.jetbrains.com/hc/en-us/community/posts/207739969-Tab-key-behaviour-overridden" target="_blank">I wasn&#8217;t the first on who complained about it</a>.

Anyway, to disable it simply turn off Structural Navigation in Resharper&#8217;s Options (_Editor_ -> _Editor Behavior_).