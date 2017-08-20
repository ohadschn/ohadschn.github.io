---
id: 430
title: Static definitions in header files may cause malloc errors on application teardown
date: 2014-12-12T17:50:47+00:00
author: ohadsc
layout: post
guid: http://ohadsc.wordpress.com/?p=430
permalink: /2014/12/static-definitions-in-header-files-may-cause-malloc-errors-on-application-teardown/
sharing_disabled:
  - "1"
categories:
  - Uncategorized
---
I recently encountered the following error in the shutdown procedure of XCTest (we&#8217;re using Kiwi which is based on it):

> Malloc Error: pointer being freed was not allocated

Here&#8217;s how the stack looked like (truncated to section of interest):

> **(lldb) bt**
  
> …
> 
> frame #4: 0x00e12ae7 OurProduct\`std::\_\_1::basic\_string<char16\_t, std::\_\_1::char\_traits<char16\_t>, std::_\_1::allocator<char16\_t> >::~basic_string(this=0x042a2058) + 103 at string:2093
> 
> frame #5: 0x00e10cb7 OurProductI\`std::\_\_1::basic\_string<char16\_t, std::\_\_1::char\_traits<char16\_t>, std::_\_1::allocator<char16\_t> >::~basic_string(this=0x042a2058) + 23 at string:2090
> 
> frame #6: 0x0c94a7ac libsystem\_sim\_c.dylib\`_\_cxa\_finalize_ranges + 315
> 
> frame #7: 0x0c94a832 libsystem\_sim\_c.dylib\`_\_cxa\_finalize + 59
> 
> frame #8: 0x0c94ab55 libsystem\_sim\_c.dylib\`exit + 57
> 
> frame #9: 0x20117684 XCTest\`+[XCTestProbe exitTests:] + 57
  
> …

As you can see, XCTest was executing its shutdown procedure, and during this finalization phase the destructors of static instances were executed. It was somewhat vexing that a static destructor would try to free up a pointer that was never allocated &#8211; after all, statics are allocated only once when the process starts up. And if some static was not defined (or defined multiple times), a linker error should have been thrown. How could this situation come to be?

Failing to answer that question armed with the data above alone, I proceeded to attempt and locate the faulty string in our code. I had hoped I could spot something unusual about it, that would hopefully hint me at the root cause of the failure.

> **(lldb) frame select 4**
  
> **(lldb) frame variable *this**
> 
> (std::\_\_1::basic\_string<char16\_t, std::\_\_1::char\_traits<char16\_t>, std::_\_1::allocator<char16\_t> >) *this = {
> 
> _\_r\_ = {
> 
> std::\_\_1::\_\_libcpp\_compressed\_pair\_imp<std::\\_\_1::basic\_string<char16\_t, std::\_\_1::char\_traits<char16\_t>, std::\_\_1::allocator<char16\_t> >::\\_\_rep, std::_\_1::allocator<char16\_t> > = {
> 
> _\_first\_ = {
> 
> = {
> 
> \_\_l = (\_\_cap_ = 17, \_\_size_ = 14, \_\_data_ = u&#8221;**Helvetica Neue**&#8220;)
  
> __s = {

The string looked innocent enough. However, upon finding it in our code (thankfully the literal appeared as is, and only once), I noticed it was **defined** (initialized) in the header. Statics should be **declared** in the header &#8211; never defined. Code such as  _Bar::foo = &#8220;Helvetica Neue&#8221;_ belongs in the _cpp_ file. For more information see <http://stackoverflow.com/questions/185844/initializing-private-static-members>.

And indeed, moving the definition to the _cpp_ resolved the issue. Now, the keen reader will notice that a **linker** error should have been thrown, rather than the runtime exception I encountered. I&#8217;m not exactly clear on why the former was not the case, but the prevailing theory entails a linker optimization that allocated only once for multiple compilation units, which backfired when the shutdown sequence tried to free all occurrences separately (or one occurrence that happened to not be the one that was initialized).

If you have a better explanation, I&#8217;ll be happy to hear it.
  
In the meantime, mind your statics 🙂