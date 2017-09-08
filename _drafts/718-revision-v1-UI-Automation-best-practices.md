---
id: 726
title: UI Automation best practices
date: 2016-07-09T18:40:35+00:00
author: ohadsc
layout: revision
guid: http://www.ohadsoft.com/2016/07/718-revision-v1/
permalink: /2016/07/718-revision-v1/
---
### Introduction

UI Automation tests have a pretty bad rap. They are generally thought of as slow, heavy, and unreliable. They seem more difficult to write than unit tests, and certailny more difficult to run when a complex environment must be provisioned for them as a prerequisite. Many people are skeptical as to whether they are even worth the effort.

I am not one of those people. I am a big believer in UI Automation, as they are truly end-to-end (E2E). When done right, they constitute the next best thing to a live person using your site / app and looking for flaws. When the application under test (AUT) is written properly for UI automation, writing these tests isn&#8217;t typically too hard, either. It can actually be pretty easy, not to mention fun and satisfying to watch running! Of course, I&#8217;m not saying you should stop writing unit tests and component tests, just that UI E2E tests have their place as well. 

The key phrase in the above sentence though, is _when done right_. When that isn&#8217;t the case, such tests can indeed be well deserving of their reputation, and pose very frustrating reliablilty and speed problems. I&#8217;ve been around the UI automation block and in this post, I&#8217;ll try and share my experience with writing such tests.

### Choosing your framework

The first need to do is choose your framework. 

  * If you&#8217;re testing a web site, look no further than <a href="http://www.seleniumhq.org/" target="_blank">Selenium</a>.
  * If you&#8217;re testing a Windows application (including Windows Phone), consider <a href="https://msdn.microsoft.com/en-us/library/dd286726.aspx"  target="_blank">Coded UI</a>. If you hit any of its limitations, you can always fall back to the lower level but very powerful <a href="https://msdn.microsoft.com/en-us/library/ms747327(v=vs.110).aspx"  target="_blank">UI Automation API</a>.
  * If you&#8217;re testing a mobile app, each platform supplies its own framework (<a href="https://developer.apple.com/library/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html"  target="_blank">Instruments</a> in iOS and <a href="https://developer.android.com/training/testing/ui-testing/espresso-testing.html"  target="_blank">Espresso</a> in Android). However, <a href="http://appium.io/" target="_blank">Appium </a>is a very cool solution that works for both, based on the WebDriver protocol. This is the same protocol used by Selenium, so if you have experience with the latter you&#8217;ll feel right at home.

I don&#8217;t have any experience testing other types of apps, so you&#8217;ll have to do your own research if that is your case.