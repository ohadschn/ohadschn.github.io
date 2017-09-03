---
id: 606
title: 'Gtk-WARNING **: Locale not supported by C library'
date: 2016-02-20T17:05:16+00:00
author: ohadsc
guid: http://www.ohadsoft.com/?p=606
permalink: /2016/02/gtk-warning-locale-not-supported-by-c-library/
categories:
  - Uncategorized
---
I was recently writing a mono application for OSX in MonoDevelop, using [Gtk#](http://www.mono-project.com/docs/gui/gtksharp/) as the GUI framework. The app seemed to work fine, but it would throw the following error each time it started:

<pre class="brush: plain; title: ; notranslate" title="">Gtk-WARNING **: Locale not supported by C library</pre>

Since I don&#8217;t like errors, even if I don&#8217;t understand their immediate effect, I did a bit of searching. My search led me to this [StackOverflow post](http://stackoverflow.com/questions/7165108/in-osx-lion-lang-is-not-set-to-utf8-how-fix), whose answers suggested defining the following environment variables in the terminal:

```bash
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
```

Indeed, setting those variables in a bash script, prior to the execution of my application, resolved the issue 🙂