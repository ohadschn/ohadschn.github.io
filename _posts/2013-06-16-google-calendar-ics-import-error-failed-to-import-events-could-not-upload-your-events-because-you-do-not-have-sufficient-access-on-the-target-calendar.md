---
id: 98
title: 'Google Calendar ICS import error: &#8220;Failed to import events: Could not upload your events because you do not have sufficient access on the target calendar&#8221;'
date: 2013-06-16T23:40:17+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=98
permalink: /2013/06/google-calendar-ics-import-error-failed-to-import-events-could-not-upload-your-events-because-you-do-not-have-sufficient-access-on-the-target-calendar/
categories:
  - Uncategorized
---
A couple of days ago I ran into the above error when I tried importing my ICS file into Google Calendar. A quick [Bing](http://www.bing.com/search?q=Failed+to+import+events%3A+Could+not+upload+your+events+because+you+do+not+have+sufficient+access+on+the+target+calendar&qs=n&form=QBLH&pq=failed+to+import+events%3A+could+not+upload+your+events+because+you+do+not+have+sufficient+access+on+the+target+calendar&sc=0-0&sp=-1&sk=) search turned up a few results, and after some digging I found the [root cause](http://productforums.google.com/d/msg/calendar/5vLrmBPXyxc/Sd76gunaaaEJ) &#8211; UID collision (thanks Nick VE!).  Basically you need to delete all UIDs from the file and let Google assign new ones. There are many ways to do this, but Nick suggests a nice simple approach:

  1. Install [Notepad++](http://notepad-plus-plus.org/)
  2. Hit _Ctrl+O_ and open the ICS file
  3. _Hit Ctrl+F_ and click the _Mark_ tab
  4. In the _Find what_ field write **UID**
  5. Tick _Bookmark line_
  6. Press _Mark All_
  7. Menu Bar -> _Search_ -> _Bookmark_ -> _Remove Bookmarked Lines_
  8. Save the file and try importing again

Of course, this is only temporary until I move my calendar to [Outlook.com](http://outlook.com).