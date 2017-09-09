---
id: 106
title: Programmatically launching Visual Studio with parameters
date: 2013-07-21T23:37:48+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=106
permalink: /2013/07/programmatically-launching-visual-studio-with-parameters/
geo_public:
  - "0"
categories:
  - Software-Development
tags:
  - Visual-Studio
---
In the group where I work, we don&#8217;t open Visual Studio (VS) solutions by double-clicking on them in Windows explorer, rather we have a special command-line launcher that takes care of that. The reasons why are unimportant, what I want to focus on in this post is the programmatic launching of Visual Studio when you want to pass it [parameters beyond the file name](http://msdn.microsoft.com/en-us/library/xee0c8y7%28v=vs.100%29.aspx).

Suppose you have the path of an SLN file in your hands, and you want to launch it in VS programatically (let&#8217;s say using C#). Assuming VS is registered as the default application for SLN files (a reasonable assumption), the solution is pretty simple: 

```cs
Process.Start("foo.sln)"
```

But what happens if you want to run it with a switch, say [/Build debug](http://msdn.microsoft.com/en-us/library/b20w810z%28v=vs.100%29.aspx)? The previous approach [won&#8217;t work](http://stackoverflow.com/questions/5017221/c-sharp-open-file-with-associated-application-passing-arguments). Instead, there are two things you need to do:

1. Find out the full path of the application registered to open SLN files &#8211; remember, you want this tool to work on any computer, regardless of where VS is installed (and which version is installed). Note that this application actually won&#8217;t be devenv.exe (VS&#8217;s executable), rather it will be **VSLauncher.exe** which analyzes the SLN file and decides which VS version to open. Finding its path is done by examining the [registry](http://msdn.microsoft.com/en-us/library/cc144148.aspx), and I posted a [function on StackOverflow that does exactly that](http://stackoverflow.com/a/17773554/67824).

2. Start VSLauncher.exe with the desired command-line:

```cs
Process.Start(vsLauncherPath, string.Format(""{0}" /Build "debug"", solutionPath));
```

(note the escaped quotes ["] - they are necessary due to the way VSLauncher passes parameters to devenv)

Another usage example is elevating VS&#8217;s process priority on startup. As professional .NET developer, we spend most of our working days in VS, and we want it to be as fast as possible. Of course, setting its process priority as &#8220;High&#8221; manually every time is easy enough, but that&#8217;s easy to forget. Enter devenv.exe&#8217;s [/Command](http://msdn.microsoft.com/en-us/library/19sf6kk3.aspx "/Command") switch, which allows you to run any VS [command](http://msdn.microsoft.com/en-us/library/kcc7tke7%28v=vs.100%29.aspx "command") on startup. A command in VS can be many thing, but we&#8217;ll use it to run a [macro](http://msdn.microsoft.com/en-us/library/b4c73967%28v=vs.100%29.aspx "macro") (VS 2012 [dropped macro support](http://social.msdn.microsoft.com/Forums/en-US/vsx/thread/d8410838-085b-4647-8c42-e31b669c9f11) so this method won&#8217;t work for it).

  1. Open Visual Studio (tested on 2010 but should work in earlier versions).
  2. Hit **Alt+F11** to get to the macros window.
  3. In the left pane, expand &#8220;Samples&#8221; -> &#8220;Utilities&#8221; and add a new function named **RaisePriority** with the following implementation: `For Each proc As System.Diagnostics.Process In System.Diagnostics.Process.GetProcessesByName("devenv") proc.PriorityClass = ProcessPriorityClass.High Next`
  4. Save

Now you can use the following code to automatically launch VS with high priority:

```cs
Process.Start(vsLauncherPath, string.Format(""{0}" /Command "Macros.Samples.Utilities.RaisePriority"", solutionFile))
```

(again,note the escaped quotes &#8211; they are necessary!)