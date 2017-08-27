---
id: 74
title: Working with the new SourceForge svn+ssh protocol in Windows
date: 2012-09-30T14:25:30+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=74
permalink: /2012/09/working-with-the-new-sourceforge-svnssh-protocol-in-windows/
categories:
  - Uncategorized
---
I&#8217;ve been using [TortoiseSVN](http://tortoisesvn.net/) and [AnkhSVN](http://ankhsvn.open.collab.net/) for quite some time with [SourceForge](https://sourceforge.net/). Both have been working flawlessly. However, SF recently updated their SVN system to use SVN over SSH (svn+ssh) for read/write access. For TortoiseSVN, this meant entering the password on every commit. AnkhSVN simply stopped working (something about not being able to open a tunnel to the repository). The recommended, secure fix for these problems appeared to be [SSH keys](https://sourceforge.net/apps/trac/sourceforge/wiki/SSH%20keys). However, setting up my keys did not yield consistent results. TortoiseSVN worked, but most of the time it still asked for my password, which was annoying. AnkhSVN still didn&#8217;t work (it started [plink](http://the.earth.li/~sgtatham/putty/0.53b/htmldoc/Chapter7.html) which appeared to be stuck). I also didn&#8217;t like having [Pageant](http://the.earth.li/~sgtatham/putty/0.58/htmldoc/Chapter9.html) running in the background all the time. Luckily, I&#8217;ve found [another way](https://sourceforge.net/p/mcebuddy2x/wiki/Developer%20Access%20to%20SVN%20Code%20Repository/). It may not be as secure, since you&#8217;re storing your password in plain text, but it&#8217;s good enough for me:

  1. Download plink.exe from <a href="http://the.earth.li/%7Esgtatham/putty/latest/x86/plink.exe" rel="nofollow">http://the.earth.li/~sgtatham/putty/latest/x86/plink.exe</a>
  2. Place the plink.exe in your windows installation directory (%windir%)
  3. Open the following file using Notepad _%APPDATA%Subversionconfig_
  4. Add or Replace the following line in the _[tunnels]_ section (replace login and pwd with your sourceforge login and password) _ssh = c:windowsplink.exe -batch -l <LOGIN> -pw <PWD>_ (**note** the double backslash)
  5. Save and close the file

Note that in step 4 I wasn&#8217;t able to use environment variables, even though the comments suggested it was possible. YMMV.

**UPDATE**

I&#8217;ve found a better way to do this, without storing your password in plaintext.

  1. Download  [TortoiseSVN](http://tortoisesvn.net/downloads.html) and either install it or extract its binaries to a folder using a tool such as [UniExtract](http://legroom.net/software/uniextract).
  2. Locate _TortoisePlink.exe_ among TortoiseSVN&#8217;s binaries and set an environment variable named _SVN_SSH_ to its path, using double backslashes (for example _C:UtilitiesTortoiseSVNbinTortoisePlink.exe_).
  3. Open SVN&#8217;s configuration file with your favorite text editor: _%APPDATA%Subversionconfig_
  4. If you already modified your _[tunnels]_ section as described above, revert it to: _ssh = $SVN_SSH ssh_
  5. Save and close the file

Note that I only tested this with the [command-line client](https://sourceforge.net/projects/win32svn/), so for AnkhSVN you may need to replace _$SVN_SSH_ with the actual path of _TortoisePlink.exe_ in the SVN config file (again with double backslashes). In that case, you can skip the creation of the environment variable altogether.