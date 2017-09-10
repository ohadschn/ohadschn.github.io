---
id: 651
title: Redirecting all URLs to their HTTPS WWW equivalents
date: 2016-04-04T07:33:43+00:00
author: ohadsc
layout: revision
guid: http://www.ohadsoft.com/2016/04/629-revision-v1/
permalink: /2016/04/629-revision-v1/
---
Whether you&#8217;re a <a href="http://no-www.org/" target="_blank">no-www</a> or a <a href="http://www.yes-www.org/" target="_blank">yes-www</a> person (you can guess which one I am based on the URL currently present on your address bar 🙂<span>)</span>, one thing is certain &#8211; you need to be consistent. This means that if you like _www_, then _yourdomain.com_ should redirect (301 permanent) to _www.yourdomain.com_, and if you don&#8217;t like it then the redirection needs to go the other way around. Either way, you can&#8217;t have people browsing the same page from different domain (with _www_ and without it), it&#8217;s just confusing.

In addition, you really should be using <a href="https://blog.mozilla.org/security/2015/04/30/deprecating-non-secure-http/" target="_blank">SSL everywhere, all the time</a>. Certificates <a href="https://letsencrypt.org/" target="_blank">are</a> <a href="https://www.startssl.com/Support?v=1" target="_blank">free</a>, and even if your hosting plan doesn&#8217;t support them (as is the case with Azure&#8217;s free tier), you can <a href="https://www.troyhunt.com/2015/04/how-to-get-your-ssl-for-free-on-shared.html" target="_blank">have CloudFlare take care of that for you</a> (and enjoy improved performance and security as a bonus). Once you have SSL up and running, you&#8217;d want to redirect all HTTP traffic to HTTPS and enable <a href="https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security" target="_blank">HTS</a> for increased security.

To recap &#8211; once you&#8217;ve decided whether you like _www_ or not, and finished setting up SSL, you want your redirections to look like this (assuming _yes-www_):

  * _HTTP://yourdomain.com_ -> _HTTPS://www.yourdomain.com_
  * _HTTP://www.yourdomain.com_ -> _HTTPS://www.yourdomain.com_
  * _HTTPS://yourdomain.com_ -> _HTTPS://www.yourdomain.com_

In addition, you want HTS headers (_Strict\_Transport\_Security_) in place. Fortunately, using the <a href="https://www.iis.net/learn/extensions/url-rewrite-module/url-rewrite-module-20-configuration-reference" target="_blank">IIS Rewrite module</a> (installed by default on Azure deployments), accomplishing all of the above is a breeze:

<pre class="brush: xml; title: ; notranslate" title="">&lt;configuration&gt;
&lt;system.webServer&gt;
 &lt;rewrite&gt;
  &lt;rules&gt;
   &lt;rule name=&quot;Redirect to www&quot; stopProcessing=&quot;true&quot;&gt;
    &lt;match url=&quot;(.*)&quot; /&gt;
    &lt;conditions logicalGrouping=&quot;MatchAny&quot;&gt;
     &lt;add input=&quot;{HTTP_HOST}&quot; pattern=&quot;^yourdomain\.com&quot;/&gt;
     &lt;add input=&quot;{HTTPS}&quot; pattern=&quot;off&quot; ignoreCase=&quot;true&quot;/&gt;
    &lt;/conditions&gt;
    &lt;action type=&quot;Redirect&quot; 
            url=&quot;https://www.yourdomain.com/{R:1}&quot; 
            redirectType=&quot;Permanent&quot;/&gt;
   &lt;/rule&gt;
  &lt;/rules&gt;
  &lt;outboundRules&gt;
   &lt;rule name=&quot;HSTS&quot; enabled=&quot;true&quot;&gt;
    &lt;match 
       serverVariable=&quot;RESPONSE_Strict_Transport_Security&quot; 
       pattern=&quot;.*&quot; /&gt;
    &lt;conditions&gt;
     &lt;add input=&quot;{HTTPS}&quot; pattern=&quot;on&quot; ignoreCase=&quot;true&quot; /&gt;
    &lt;/conditions&gt;
    &lt;action type=&quot;Rewrite&quot; value=&quot;max-age=31536000&quot; /&gt;
   &lt;/rule&gt;
  &lt;/outboundRules&gt;
 &lt;/rewrite&gt;
&lt;/system.webServer&gt;
&lt;/configuration&gt;
</pre>

Happy rewriting 😉