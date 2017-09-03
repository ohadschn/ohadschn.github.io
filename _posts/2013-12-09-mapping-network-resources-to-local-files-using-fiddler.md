---
id: 130
title: Mapping network resources to local files using Fiddler
date: 2013-12-09T17:28:19+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=130
permalink: /2013/12/mapping-network-resources-to-local-files-using-fiddler/
categories:
  - Uncategorized
---
In web development, it is sometimes useful to alter files locally on the client (browser) side and test their behavior.

For example, let&#8217;s say I&#8217;m the developer of Microsoft.com and I want to test mobile compatibility. One of the scripts participating in this mechanism, at the time of writing, is apparently _http://www.microsoft.com/global/en-us/home/renderingAssets/wt_capi.js_.

Now, say I want to make some changes to this file and test them out, but I want to make them locally on my computer. Maybe I don&#8217;t have access to the server right now. Maybe I don&#8217;t have a convenient testing environment. Maybe I want to test my changes on the production environment without affecting everyone.

Whatever the reason may be, <a href="http://fiddler2.com/" target="_blank">Fiddler </a>makes the process very simple.

  1. In the right pane, click the **AutoResponder** tab and check **_Enable automatic responses_** and **_Unmatched requests pass through_**
  2. Find the network resource you wish to replace in the **Web Sessions** list (in our case, http://www.microsoft.com/global/en-us/home/renderingAssets/wt_capi.js)  and drag it to the **AutoResponder** rule
  3. Make sure the newly created rule is selected and in the **Rule Editor** at the bottom write the path of the local file you want to respond with, for example `C:\wt_capi.js` (you can also click the drop-down arrow and select _Find a file_)
  4. Click **Save** in the bottom right corner.<figure id="attachment_134" style="width: 450px" class="wp-caption alignnone">

<a href="http://ohadsoft8.azurewebsites.net/wp-content/uploads/2013/12/fiddler.png" rel="lightbox[130]"><img class="size-full wp-image-134" alt="Fiddler AutoResponder" src="http://ohadsoft8.azurewebsites.net/wp-content/uploads/2013/12/fiddler.png" width="450" height="239" srcset="https://www.ohadsoft.com/wp-content/uploads/2013/12/fiddler.png 1646w, https://www.ohadsoft.com/wp-content/uploads/2013/12/fiddler-300x159.png 300w, https://www.ohadsoft.com/wp-content/uploads/2013/12/fiddler-1024x544.png 1024w, https://www.ohadsoft.com/wp-content/uploads/2013/12/fiddler-1200x638.png 1200w" sizes="(max-width: 450px) 85vw, 450px" /></a>

All done. Whenever the browser asks for http://www.microsoft.com/global/en-us/home/renderingAssets/wt_capi.js, Fiddler will intercept that request and respond with `C:\wt_capi.js` (Fiddler will indicate this by highlighting the corresponding session in the Web Sessions list).

**HTTPS**

In order for the above to work with HTTPS, Fiddler&#8217;s certificate must be installed. **This is highly not recommended to do on any machine in which you care about security**, and ideally should only be done in a dedicated test-only VM. See the following article for instructions:

<http://fiddler2.com/documentation/Configure-Fiddler/Tasks/DecryptHTTPS>

Note that FireFox requires special handling:

<http://fiddler2.com/blog/blog/2013/04/01/configuring-firefox-for-fiddler>

For further information on Fiddler&#8217;s AutoResponder see:

<http://fiddler2.com/documentation/KnowledgeBase/AutoResponder>

**A note on Chrome**

Mapping is also supported in Chrome both natively and via extensions:

  1. <a title="Workspaces" href="http://www.html5rocks.com/en/tutorials/developertools/revolutions2013/" target="_blank">Dev tools workspaces</a>
  2. <a title="Tincr" href="http://tin.cr/" target="_blank">Tincr</a> (extension)
  3. <a href="https://github.com/NV/chrome-devtools-autosave" target="_blank">Devtools Autosave</a> (extension)

However, I was not able to get any of the above to work as reliably as Fiddler.