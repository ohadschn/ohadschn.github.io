---
id: 55
title: 'Zotero &#8211; exporting Unicode and LaTeX constructs to BibTeX'
date: 2012-06-20T00:16:11+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=55
permalink: /2012/06/zotero-exporting-unicode-and-latex-constructs-to-bibtex/
categories:
  - Tips
tags:
  - Unicode
  - LaTeX
  - BibTeX
---
[Zotero](https://www.zotero.org/ "Zotero") is a great reference manager, especially if you&#8217;re using Firefox. Its BibTeX export is invaluable for LaTeX / LyX users. However, it has a couple of sticking points whose solutions are not well documented. These issues can be especially annoying for researchers working in exact sciences (math, physics, etc.)

**Problem 1:** Article info contains special Unicode characters (such as é). As BibTeX doesn&#8217;t support Unicode, LaTeX compilation fails.

**Solution:** 

  1. _Zotero Preferences -> Export ->_ check _[Display character encoding option on export](https://www.zotero.org/support/preferences/export "Display character encoding option on export")_
  2. Whenever you export your database, pick a non-Unicode character encoding such as **ISO-8859-1**

Zotero will now convert the Unicode characters to their native LaTeX equivalents (for example, `é` will be converted into `&#8216;{e}`).

**Note:** You could also solve this on the LaTeX side by using [Biblatex](ftp://www.ctan.org/ctan/macros/latex/exptl/biblatex/doc/biblatex.pdf "Biblatex") and [biber](http://biblatex-biber.sourceforge.net/ "Biber"). However, I wasn&#8217;t able to make them [work under LyX](https://wiki.lyx.org/BibTeX/Biblatex#using-biber "work with LyX").

**Problem 2**:Article info contains Latex constructs (e.g. `$O_{3}$`). Zotero escapes these and so they appear verbatim in the reference (e.g. `$O_{3}$` instead of `O₃`)

**Solution**:

  1. Locate your [Zotero data directory](https://www.zotero.org/support/zotero_data "Zotero data directory") and open _translatorsBibTeX.js _with your favorite text editor
  2. Find the following : `var alwaysMap = { "|":"{\textbar}",  "&lt;":"{\textless}",  "&gt;":"{\textgreater}",  "~":"{\textasciitilde}",  "^":"{\textasciicircum}",  "\":"{\textbackslash}" };`
  3. Change it to the following: `var alwaysMap = {  "|":"{\textbar}",  "&lt;":"{\textless}",  "&gt;":"{\textgreater}"`
  3. Find the following:  `value = value.replace(/[|&lt;&gt;~^\]/g, mapEscape).replace(/([#$%&_])/g, "\$1");`
  4. Change it to the following: `value = value.replace(/[|&lt;&gt;]/g, mapEscape).replace(/([#%&])/g, "\$1");`
  4. Save the file.

Escaping of **~**, **^**, ****,**$**,**_** is now disabled, preserving your LaTeX constructs.

**References and further reading:**

[https://forums.zotero.org/discussion/5324/bibtex-and-greek-characters/](https://forums.zotero.org/discussion/5324/bibtex-and-greek-characters/ "https://forums.zotero.org/discussion/5324/bibtex-and-greek-characters/")

[https://groups.google.com/forum/?fromgroups#!topic/zotero-dev/U9fGc1f3TO8](https://groups.google.com/forum/?fromgroups#!topic/zotero-dev/U9fGc1f3TO8 "https://groups.google.com/forum/?fromgroups#!topic/zotero-dev/U9fGc1f3TO8")

[https://gist.github.com/956623](https://gist.github.com/956623 "https://gist.github.com/956623")

[https://www.rtwilson.com/academic/autozotbib](https://www.rtwilson.com/academic/autozotbib "https://www.rtwilson.com/academic/autozotbib")