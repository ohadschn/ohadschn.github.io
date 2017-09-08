---
id: 776
title: Synchronizing native Android G Suite apps (GMail, Calendar, etc.) with Outlook.com accounts
date: 2016-12-25T18:04:40+00:00
author: ohadsc
layout: revision
guid: http://www.ohadsoft.com/2016/12/762-revision-v1/
permalink: /2016/12/762-revision-v1/
---
**TLDR &#8211; scroll to the bottom for a checklist of what you need to do**

The task at hand seemed simple enough. I had a GMail account (ohad188@gmail.com) and an Outlook.com account (also ohad188@gmail.com) and I wanted to sync both to my Android device using the _native_ apps, primarily GMail and Calendar (I usually prefer native apps to third party ones such as the <a href="https://play.google.com/store/apps/details?id=com.microsoft.office.outlook&#038;hl=en" target="_blank">Outlook app</a>).But what should have been a trivial exercise ended up as a complicated, non-user friendly ordeal. I&#8217;ll share my story here for the benefit of others (and future self).

Adding the GMail account was, naturally, easy and effortless. This is virtually the first thing everyone does when they get their phone, so no surprise there. However, when I tried adding my Outlook.com account I got _&#8220;Duplicate account &#8211; you&#8217;re already using this username for the account ohad188@gmail.com&#8221;_. It&#8217;s pretty clear what&#8217;s going on here. The GMail app is keying accounts by username only, and since my Outlook.com account happens to have the same username as my Google account, I&#8217;m locked out. I was very surprised that such a mature app would have such a trivial limitation, but what can you do. I also couldn&#8217;t find much about it on the web, so I decided I&#8217;d just work around the limitation (after reporting it to Google). The workaround was simple &#8211; I created an ohad188@**outlook.com** <a href="https://support.microsoft.com/en-us/help/12407/microsoft-account-manage-aliases" target="_blank">alias</a> for my account and made it the primary one. This resolved the duplicate account issue, but the story was not over.

While my e-mail seemed to sync fine, I couldn&#8217;t see any of my events in the calendar. I looked in every possible setting with no luck. Finally I found an <a href="https://support.office.com/en-us/article/Can-t-sync-calendar-and-contacts-with-my-phone-or-tablet-8479d764-b9f5-4fff-ba88-edd7c265df9f#ID0EACAAA=Android_Gmail_app" target="_blank">MS Office support article</a> that provided a clue for the issue. It turns out that when setting up Outlook.com accounts, you actually have to select _Exchange_ in the account type selection dialog &#8211; not Outlook! And as if that&#8217;s not bad enough, if you happen to have that account already configured somewhere else (as an Outlook account, IMAP account, or Outlook app account), you won&#8217;t be able to add it properly (you will get redirected to the Microsoft account sign-in page which is **not** what you want). So I had to delete all existing references to my Outlook.com account (and removed the Outlook app for good measure) before I could get to the actual Exchange account addition dialog. You will know you&#8217;re in the right place when you are asked to provide your password in a native Android dialog (as opposed to a redirected Microsoft sign-in page).

But my troubles did not stop there. After multiple attempts, Android kept insisting that my Outlook.com password was incorrect. Of course, I had just used it successfully when I set up the exact same account as an &#8220;Outlook&#8221; account a few minutes earlier, and presumable my short-term memory was not damaged in the process. Fortunately, I quickly realized (with no help fom Android or Outlook.com, mind you) that the problem was the 2-factor authentication configured for my account. So I issued an <a href="https://support.microsoft.com/en-us/help/12409/microsoft-account-app-passwords-two-step-verification" target="_blank">app password</a>, provided it in the Exchange account addition dialog, and finally my account was added &#8211; mail, calendar, contacts.

**So to sum up:**

  1. Make sure your Outlook.com primary alias/username is different from your GMail address.
  2. Remove the Outlook app and all references to your Outlook.com account in Android&#8217;s account settings.
  3. Add your Outlook.com as an **Exchange** account and use an **app password** if 2-factor authenticatino is enabled on your account.