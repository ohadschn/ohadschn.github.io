---
id: 750
title: Adding reddit RSS feeds to Outlook
date: 2016-10-29T11:10:19+00:00
author: ohadsc
layout: post
guid: http://www.ohadsoft.com/?p=750
permalink: /2016/10/adding-reddit-rss-feeds-to-outlook/
categories:
  - Uncategorized
---
<a href="https://www.reddit.com/wiki/rss" target="_blank">Creating reddit RSS feeds</a> is pretty straightforward. For example, subscribing to `http://www.reddit.com/r/news/.rss` will get you all threads in the _news_ subreddit. However, attempting to add such a URL to Outlook&#8217;s RSS reader will result in the following error:

> Outlook cannot process the RSS content from `http://www.reddit.com/r/news/.rss`. The link may not point to a valid RSS source. 

Fortunately, the fix is simple &#8211; just get rid of the right-most slash (the one before `.rss`): `http://www.reddit.com/r/news.rss`. 

Outlook will now accept the URL and your subscription will work as expected.