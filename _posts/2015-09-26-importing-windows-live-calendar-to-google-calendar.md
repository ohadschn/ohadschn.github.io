---
id: 582
title: Importing Windows Live Calendar to Google Calendar
date: 2015-09-26T17:00:05+00:00
author: ohadsc
layout: post
guid: http://www.ohadsoft.com/?p=582
permalink: /2015/09/importing-windows-live-calendar-to-google-calendar/
categories:
  - Uncategorized
---
Windows Live is a great calendar, but it is good to know you have the option to migrate to Google Calender, should you desire to do so. The process is quite simple:

  1. Navigate to your <a href="https://calendar.live.com" target="_blank">Windows Live Calendar account</a>
  2. Click **_Share_ **and select the calendar you want to import
  3. In the left pane, click **_get a link_ **
  4. Under _Show event details_ click **_Create_**
  5. Copy the link under _Import into other calendar applications (ICS)_
  6. Change **_webcals://_** to **_http:// _**and paste the link in your browser to download it
  7. Save the ICS file to some location on your computer as _**calendar.ics**_
  8. If you have non-ASCII characters in your events (in my case I have Hebrew characters) you must mark the ICS file as UTF: 
      1. Open _**calendar.ics **_in Notepad++
      2. In the top menu click **_Encoding -> Encode in UTF-8-BOM_**
      3. **Save** the file and exit Notepad++
  9. Navigate to your <a href="https://www.google.com/calendar" target="_blank">Google Calendar account</a>
 10. Click the dropdown next to **_My calendars_** and select _**Create new calendar**_
 11. Fill out the calendar fields for the new calendar and click **_Create Calendar_**
 12. Click the dropdown next to **_Other calendars_** and select _**Import Calendar**_
 13. Click _**Choose File**_ and select the ICS file you downloaded above (_calendar.ics**)**_
 14. In the _**Calendar**_ dropdown select the name of the calendar you just created
 15. Click _**Import**_

You&#8217;re all done!
  
Note however that event reminders are not imported 🙁