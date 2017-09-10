---
id: 70
title: 'WinRABCDAsm &#8211; Flash ABC (ActionScript Bytecode) disassembly and reassembly made easy'
date: 2012-09-30T13:54:05+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=70
permalink: /2012/09/winrabcdasm-flash-abc-actionscript-bytecode-disassembly-and-reassembly-made-easy/
categories:
  - Reverse-Engineering
tags:
  - Flash
  - RABCDAsm
wrabcdasm_image: '/wp-content/uploads/2012/09/winrabcdasm.png'
---
[RABCDAsm](https://github.com/CyberShadow/RABCDAsm) is an excellent collection of utilities for assembling and disassembling actionscript 3 flash (SWF) files. Since using it requires a bit of work in the command line, and I&#8217;m very lazy, I&#8217;ve created a GUI front-end for it: [WinRABCDasm](https://sourceforge.net/projects/winrabcdasm/). Once you enter your RABCDasm path in the settings window, the workflow is very easy:

  1. Drag the SWF file to WinRABCDasm to disassemble it.
  2. Navigate the disassembly tree and find the file you wish to modify.
  3. Double click to open it in your favorite editor, and make your changes (for syntax highlighting use [asasm.hrc](https://github.com/CyberShadow/RABCDAsm/blob/master/asasm.hrc) in [Eclipse]({{ '/2012/05/adding-syntax-highlighting-for-new-languages-to-eclipse-with-the-colorer-library' | absolute_url }}))
  4. Repeat steps 2-3 for all the files you wish to modify.
  5. Hit Reassemble (alt+R) to rebuild the SWF file. **Backup your original SWF file before this step as it will overwrite it!**

[![WinRABCDasm]({{ page.wrabcdasm_image | absolute_url }})]({{ page.wrabcdasm_image | absolute_url }})