---
id: 433
title: Posting forms with Knockout to dynamic Sammy routes
date: 2014-12-27T15:03:02+00:00
author: ohadsc
layout: post
guid: http://ohadsc.wordpress.com/?p=433
permalink: /2014/12/posting-forms-with-knockout-to-dynamic-sammy-routes/
sharing_disabled:
  - "1"
categories:
  - Uncategorized
---
Single-page applications (SPAs) are the standard these days, and two aspects are typically considered for their development:

  1. Data binding the view (HTML) with the model (Javascript)
  2. Navigating between logical &#8220;pages&#8221; without reloading.

There are many libraries that handle both needs, and I went with Knockout for (1) and Sammy for (2) &#8211; mostly because I was already familiar with them (they are both excellent).

The way Sammy works is by defining &#8220;routes&#8221; (typically hash tag routes for SPAs), which are basically URLs that trigger JS methods. For example, you might define the following route:

<pre class="brush: jscript; title: ; notranslate" title="">get('#/:name', function() {
    alert(this.params['name']);
});
</pre>

When the URL changes to _mysite.com/#/Ohad_, an alert will pop up saying _&#8220;Ohad&#8221;_. Now, suppose we have a form we want to &#8220;submit&#8221; to the route above Sammy route:

<pre class="brush: xml; title: ; notranslate" title="">&lt;form
data-bind="submit:function(){window.location='#/'+name();}"&gt;
 &lt;input type="text" data-bind="value: name"&gt;&lt;/input&gt;
 &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
</pre>

The input&#8217;s _data-bind _attribute binds the input&#8217;s value to our view model&#8217;s _name_ observable. The form&#8217;s _data-bind_ attribute binds the form submission event to a URL redirection for the desired Sammy route. For more information about Knockout bindings, visit <http://learn.knockoutjs.com>.

The code above works, but not exactly as expected. See, when no _action_ attribute is specified on the form element, the browser assumes the **current URL without hashtags** is the submission URL, and so right after the URL is redirected to _mysite.com/#/MyName_ it is reverted to just _mysite.com_ by the browser.

This messed up my hash tag navigation model, and nothing I tried prevented the browser from reverting the address (canceling the form submission event, returning false from the handler method, etc). And then it hit me &#8211; why fight the browser?

<pre class="brush: xml; title: ; notranslate" title="">&lt;form
data-bind="attr: { action: '#/'+name() }"&gt;
 &lt;input type="text" data-bind="value: name"&gt;&lt;/input&gt;
 &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
</pre>

See what we did there? Instead of using knockout to circumvent the normal form submission flow, I go with it. Whereas Knockout&#8217;s _submit_ binding tries to cancel the browser&#8217;s submission event and replace it with the supplied method, here the submission flow is completely standard. We just need to make sure the _action_ attribute points to the right place, and voila &#8211; hash tag history is preserved.

BTW, you may wonder why I insisted to go with a form, where in truth no &#8220;real&#8221; submission takes place here. Indeed, a regular _div_ with a regular _button_ would not have had this issue to begin with!

Well, the answer is a bit silly. I could not find any reliable cross-browser method to intercept the [enter] key on the input in order to trigger submission (everything is either deprecated or not globally supported). And frankly, even if I did, it would be a hack &#8211; the browser should handle such logic. Plus, I enjoyed the challenge 🙂