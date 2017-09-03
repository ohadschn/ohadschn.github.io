---
id: 42
title: Adding syntax highlighting for new languages to Eclipse with the Colorer library
date: 2012-05-26T12:52:11+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=42
permalink: /2012/05/adding-syntax-highlighting-for-new-languages-to-eclipse-with-the-colorer-library/
categories:
  - Uncategorized
---
Say you have an [HRC](http://colorer.sourceforge.net/hrc-ref/index.html) file containing the syntax and lexical structure of some programming language Eclipse does not support (for example [D](http://thecybershadow.net/d/colorer/)).

Using the [EclipseColorer](http://colorer.sourceforge.net/eclipsecolorer/) plugin, you can easily add support for it. For this tutorial I&#8217;ll be using _Eclipse Classic 3.7.2 32-bit_.

  1. Go to _Help -> Install New Software_ and click _Add.._
  2. In the _Name_ field write **Colorer** and in the _Location_ field write **http://colorer.sf.net/eclipsecolorer/**
  
_ 
  3. Select the entry you&#8217;ve just added in the _work with:_ combo box, wait for the component list to populate and click _Select All_
  4. Click _Next_ and follow the instructions
  5. Once the plugin is installed, close Eclipse
  6. Copy your HRC file to `[EclipseFolder]\plugins\net.sf.colorer\0.9.9\colorer\hrc\auto\types`
  7. Use your favorite text editor to open `[EclipseFolder]\plugins\net.sf.colorer\0.9.9\colorer\hrc\auto\empty.hrc`
  8. Add the appropriate **prototype** element. For example, if your HRC file is _d.hrc_, _empty.hrc_  will look like this:  
  
   ```xml 
   <?xml version="1.0" encoding='Windows-1251'?>
    <!DOCTYPE hrc PUBLIC
    "-//Cail Lomecb//DTD Colorer HRC take5//EN"
    "http://colorer.sf.net/2003/hrc.dtd"
    >
    <hrc version="take5" xmlns="http://colorer.sf.net/2003/hrc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://colorer.sf.net/2003/hrc http://colorer.sf.net/2003/hrc.xsd"
    ><annotation><documentation>
    'auto' is a place for include
    to colorer your own HRCs
   </documentation></annotation>
   <prototype name="d" group="main" description="D">
    <location link="types/d.hrc"/>
    <filename>/.(d)$/i</filename>
    </prototype>
   </hrc> 
   ```
 
 1. Save the changes and close the text editor
 1. Open Eclipse and go to _Window -> Preferences -> General -> Editors -> File Associations_
 1. In the _file types_ section, click _Add.._ and fill in the appropriate filetype (for example _.d_)
 1. Click OK and click your newly added entry in the list
 1. In the _associated editors_ section, click _Add.._, select _Colorer Editor_ and press OK

All done! Now you can open your new language files in Eclipse and enjoy syntax highlighting and parsing.

Adding new language support to [FAR manager](http://www.farmanager.com/) ([plugin](http://colorer.sourceforge.net/farplugin.html)) and [Midnight Commander](http://www.gnu.org/software/mc/) ([plugin](http://colorer.sourceforge.net/mc.html)) is similar.[
  
](http://colorer.sourceforge.net/farplugin.html) 

**References**

<http://colorer.sourceforge.net>

<http://colorer.sourceforge.net/eclipsecolorer/>

<http://colorer.sourceforge.net/other/Color5Eclipse_Newlanguagedoc.html>

<http://thecybershadow.net/d/colorer/>

<http://mcnptips.blogspot.com/2011/08/mcnp-input-file-syntax-for-farcolorer.html>

<http://help.eclipse.org/helios/index.jsp?topic=%2Forg.eclipse.platform.doc.user%2Ftasks%2Ftasks-124.htm>