---
id: 629
title: Redirecting all URLs to their HTTPS WWW equivalents
date: 2016-04-02T17:54:02+00:00
author: ohadsc
guid: http://www.ohadsoft.com/?p=629
permalink: /2016/04/redirecting-all-urls-to-their-https-www-equivalents/
categories:
  - Software-Development
  - Web
tags:
  - IIS
  - URL-Rewrite
  - WWW
  - HSTS
  - HTTPS
---
Whether you&#8217;re a <a href="http://no-www.org/" target="_blank">no-www</a> or a <a href="http://www.yes-www.org/" target="_blank">yes-www</a> person (you can guess which one I am based on the URL currently present on your address bar 🙂<span>)</span>, one thing is certain &#8211; you need to be consistent. This means that if you like _www_, then _yourdomain.com_ should redirect (301 permanent) to _www.yourdomain.com_, and if you don&#8217;t like it then the redirection needs to go the other way around. Either way, you can&#8217;t have people browsing the same page from different domain (with _www_ and without it), it&#8217;s just confusing.

In addition, you really should be using <a href="https://blog.mozilla.org/security/2015/04/30/deprecating-non-secure-http/" target="_blank">SSL everywhere, all the time</a>. Certificates <a href="https://letsencrypt.org/" target="_blank">are</a> <a href="https://www.startssl.com/Support?v=1" target="_blank">free</a>, and even if your hosting plan doesn&#8217;t support them (as is the case with Azure&#8217;s free tier), you can <a href="http://www.troyhunt.com/2015/04/how-to-get-your-ssl-for-free-on-shared.html" target="_blank">have CloudFlare take care of that for you</a> (and enjoy improved performance and security as a bonus). Once you have SSL up and running, you&#8217;d want to redirect all HTTP traffic to HTTPS and enable <a href="https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security" target="_blank">HSTS</a> for increased security.

To recap &#8211; once you&#8217;ve decided whether you like _www_ or not, and finished setting up SSL, you want your redirections to look like this (assuming _yes-www_):

  * _HTTP://yourdomain.com_ -> _HTTPS://www.yourdomain.com_
  * _HTTP://www.yourdomain.com_ -> _HTTPS://www.yourdomain.com_
  * _HTTPS://yourdomain.com_ -> _HTTPS://www.yourdomain.com_

In addition, you want HSTS headers (_Strict\_Transport\_Security_) in place. Fortunately, using the <a href="http://www.iis.net/learn/extensions/url-rewrite-module/url-rewrite-module-20-configuration-reference" target="_blank">IIS Rewrite module</a> (installed by default on Azure deployments), accomplishing all of the above is a breeze:

```xml
<system.webServer>
 <rewrite>
  <rules>
   <rule name="Redirect to www" stopProcessing="true">
    <match url="(.*)" />
    <conditions logicalGrouping="MatchAny">
     <add input="{HTTP_HOST}" pattern="^yourdomain\.com"/>
     <add input="{HTTPS}" pattern="off" ignoreCase="true"/>
    </conditions>
    <action type="Redirect" 
            url="https://www.yourdomain.com/{R:1}" 
            redirectType="Permanent"/>
   </rule>
  </rules>
  <outboundRules>
   <rule name="HSTS" enabled="true">
    <match 
       serverVariable="RESPONSE_Strict_Transport_Security" 
       pattern=".*" />
    <conditions>
     <add input="{HTTPS}" pattern="on" ignoreCase="true" />
    </conditions>
    <action type="Rewrite" value="max-age=31536000" />
   </rule>
  </outboundRules>
 </rewrite>
</system.webServer>
</configuration>
```
Happy rewriting 😉