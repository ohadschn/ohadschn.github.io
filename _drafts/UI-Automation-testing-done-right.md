---
id: 718
title: UI Automation testing done right
date: 2016-12-27T22:32:03+00:00
author: ohadsc
layout: post
guid: http://www.ohadsoft.com/?p=718
permalink: /?p=718
categories:
  - Uncategorized
---
### UI Automation &#8211; is it even worth it?

UI Automation tests have a pretty bad rap. They are generally thought of as slow, heavy, and unreliable. They seem more difficult to write than unit tests, and certainly seem more difficult to run. Many people are skeptical as to whether they are even worth the effort.

I am not one of those people. I am a big believer in UI Automation, as they are truly end-to-end (E2E). When done right, they constitute the next best thing to a live person using your site / app and looking for flaws. When the application under test (AUT) is written properly for UI automation, writing these tests isn&#8217;t typically too hard, either. It can actually be pretty easy, not to mention fun and satisfying to watch running! Of course, I&#8217;m not saying you should stop writing unit tests and component tests, just that UI E2E tests have their place as well. 

The key phrase in the above sentence though, is _when done right_. When that isn&#8217;t the case, such tests can indeed be well deserving of their reputation, and pose very frustrating reliablilty and speed problems. I&#8217;ve been around the UI automation block and in this post, I&#8217;ll try and share my experience with writing such tests.

### Choosing Your Framework

The first need to do is choose your framework. 

  * If you&#8217;re testing a web site, look no further than <a href="http://www.seleniumhq.org/" target="_blank">Selenium</a>.
  * If you&#8217;re testing a Windows application (including Windows Phone), consider <a href="https://msdn.microsoft.com/en-us/library/dd286726.aspx"  target="_blank">Coded UI</a>. If you hit any of its limitations, you can always fall back to the lower level but very powerful <a href="https://msdn.microsoft.com/en-us/library/ms747327(v=vs.110).aspx"  target="_blank">UI Automation API</a>.
  * If you&#8217;re testing a mobile app, each platform supplies its own framework (<a href="https://developer.apple.com/library/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html"  target="_blank">Instruments</a> in iOS and <a href="https://developer.android.com/training/testing/ui-testing/espresso-testing.html"  target="_blank">Espresso</a> in Android). However, <a href="https://appium.io/" target="_blank">Appium </a>is a very cool solution that works for both, based on the WebDriver protocol. This is the same protocol used by Selenium, so if you have experience with the latter you&#8217;ll feel right at home.

I don&#8217;t have any experience testing other types of apps, so you&#8217;ll have to do your own research if that is your case. 

### UI Automation Concepts

Regardless of the framework you choose, the basics are typically the same. You have the _UI Tree_, where each node represents a UI element (a button, a form, an image, etc.) and its children represent the elements it contains (for example, a form might have some buttons inside it). For example, an app&#8217;s UI tree may look like this:

(create from http://asciiflow.com/ &#8211; or use XML instead?)
  
+ Top Window
  
|
  
+&#8211;+ Frame
  
|
  
+&#8211;+ Status Bar
  
|
  
|
  
+&#8211;> 

Each element contains various properties. Here are some of the most common and important ones:
   
ID (AKA Accessibility or Automation ID) &#8211; this (unique identifier in the application)
   
Name (non-unique identifier),
   
Type (e.g. button),
   
Text (e.g. &#8220;hello world&#8221;). The exact properties and their values will depend on your framework of choice, as well as the technology your app is built in, and of course the manner in which you coded the UI using that technology. For example, the XAML Name attribute will translate into the UI Automation framework&#8217;s ID attribute ( elements will generally have their `Name` property mapped to the UI automation framework&#8217;s ID propery, but that could be <a href="https://msdn.microsoft.com/en-us/library/dn282439.aspx" target="_blank">overwritten using AutomationProperties.AutomationId</a>.

You care about these properties for two reasons:

  1. You need to make sure the elements you want to interact with in your tests (buttons, labels, text boxes, etc.) can be located reliably. This typically means assigning them a unique automation ID (for a website, that would typically be the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id" target="_blank">id</a> attribute).
  2. You will need to query these attributes to make your test assertions. For example, your app may change the text of a certain label to &#8220;42&#8221; once a button is pressed. You&#8217;ll want to query the _text_ property of that label element and make sure it is indeed what you expect.

### 

### Anatomy of a UI Automation Test</a3>
  
Generally speaking, all UI automation tests look the same. You always start by looking up some element:
  
`<br />
var element = driver.FindElementById("foo");<br />
` 
  
Ideally, you would be doing so using an app-wide unique ID (for example, the <a href="https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/" target="_blank">accessibility identifier</a> in iOS). However, that&#8217;s not always possible (for example, you might not own the code). If that&#8217;s the case, you&#8217;ll need to get creative and try stuff like locating some parent container using its ID and then looking for your element&#8217;s name (which might be unique in the container&#8217;s scope, if not the entire app&#8217;s):
  
`<br />
var container = driver.FindElementById("myContainer");<br />
var myElement = continer.findElementById("foo");<br />
` </p> 

Other options include filtering your search by type (for example, your element might be the only _text box_ named &#8220;foo&#8221;) or even by value (for example, if your label is the only control containing the text &#8220;42&#8221;, you might look for it directly).

Once you&#8217;ve found your element, your next step will be to interact with it somehow. For example, if it&#8217;s a button you might click it. Note that automation frameworks typically provide you with an &#8220;invocation&#8221; interface so you can write something like:
  
`<br />
var button = driver.FindElementById("myButton");<br />
button.Click();<br />
` 
  
Using such APIs is much more reliable than attempting to calculate an element&#8217;s coordinates and emulating a mouse click or a finger tap in those coordinates, since the latter can fail due to a myriad of reasons (resolution, focus, animations, overlapping elements, and others).

Now that you interacted with the element, you have presumably initiated some effect you&#8217;d like to test. For example, if the button you pressed should have popped up a dialog containing the phrase &#8220;Hello World&#8221;, you might want to test it like so:
  
`<br />
var button = driver.FindElementById("myButton");<br />
button.Click();<br />
var label = driver.FindElementById("foo");<br />
Assert.AreEqual("Hello World", label.Text);<br />
` 
  
However, the above test will not pass reliably. The reason is that UI takes time to respond and render. The most naive approach then, would be to sleep for a while before checking:
  
`</p>
<p>`

Handling popups
  
Verifying an element is on screen N times
  
looking for several elements at the same time
  
LPLWS = Log &#8211; Perform &#8211; Log &#8211; Wait &#8211; Screenshot

### Discovery and Debugging

Inspectors &#8211; Inspect.exe, Appium Inspector
  
UI tree as XML &#8211; consider XPath
  
Screenshots (before, after, and after each wait condition)