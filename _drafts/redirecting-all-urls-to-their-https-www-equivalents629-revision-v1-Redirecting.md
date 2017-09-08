---
id: 637
title: Redirecting
date: 2016-04-02T16:42:12+00:00
author: ohadsc
layout: revision
guid: http://www.ohadsoft.com/2016/04/629-revision-v1/
permalink: /2016/04/629-revision-v1/
---
<pre class="brush: xml; title: ; notranslate" title="">&lt;configuration&gt;
&lt;system.webServer&gt;
 &lt;rewrite&gt;
  &lt;rules&gt;
   &lt;rule name=&quot;Redirect to www&quot; stopProcessing=&quot;true&quot;&gt;
    &lt;match url=&quot;(.*)&quot; /&gt;
    &lt;conditions logicalGrouping=&quot;MatchAny&quot;&gt;
     &lt;add input=&quot;{HTTP_HOST}&quot; pattern=&quot;^ohadsoft\.com&quot;/&gt;
     &lt;add input=&quot;{HTTPS}&quot; pattern=&quot;off&quot; ignoreCase=&quot;true&quot;/&gt;
    &lt;/conditions&gt;
    &lt;action type=&quot;Redirect&quot; 
            url=&quot;https://www.ohadsoft.com/{R:1}&quot; 
            redirectType=&quot;Permanent&quot;/&gt;
   &lt;/rule&gt;
  &lt;/rules&gt;
 &lt;/rewrite&gt;
&lt;/system.webServer&gt;
&lt;/configuration&gt;
</pre>