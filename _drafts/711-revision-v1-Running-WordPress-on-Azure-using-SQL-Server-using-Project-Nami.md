---
id: 712
title: Running WordPress on Azure using SQL Server using Project Nami
date: 2016-05-12T10:47:20+00:00
author: ohadsc
layout: revision
guid: http://www.ohadsoft.com/2016/05/711-revision-v1/
permalink: /2016/05/711-revision-v1/
---
1. Marketplace &#8211; bad idea. Settings are very confusing, if you get them wrong you better be a Kudu deployment expert and analyze the logs for all kinds of problems (not complex enough SQL server password, existing users etc). To top it off, you&#8217;re basically stuck on the Marketplace version.
  
2. One-click deployment button &#8211; better idea. Seems to work smoothly, but I wasn&#8217;t able to associate it with my existing (MSDN) Service plan.
  
3. Deploy from GitHub &#8211; works like a charm. Whenever an update comes out simply hit Synchronize in the &#8220;Deployment Source&#8221; section and you&#8217;re golden.