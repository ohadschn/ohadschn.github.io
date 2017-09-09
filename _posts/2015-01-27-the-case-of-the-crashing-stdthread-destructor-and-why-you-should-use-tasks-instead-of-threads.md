---
id: 458
title: The case of the crashing std::thread destructor and why you should use tasks instead of threads
date: 2015-01-27T23:36:21+00:00
author: ohadsc
guid: https://ohadsc.wordpress.com/?p=458
permalink: /2015/01/the-case-of-the-crashing-stdthread-destructor-and-why-you-should-use-tasks-instead-of-threads/
publicize_facebook_url:
  - https://facebook.com/10153062325093249
publicize_google_plus_url:
  - ""
publicize_linkedin_url:
  - ""
categories:
  - Software-Development
tags:
  - C++
  - Standard-Library
  - Concurrency
  - Tasks
  - PPLX
---
I recently encountered an interesting crash in our iOS application at work. Here’s the relevant stack trace section:

```cpp
…
libc++abi.dylib std::terminate()
libc++.1.dylib std::__1::thread::~thread()
…
```

Luckily, the documentation for [std::~thread](http://en.cppreference.com/w/cpp/thread/thread/~thread) provides us with the root cause:
  
_**If *this has an associated thread (joinable() == true), std::terminate() is called.**_

Specifically, the [joinable() documentation](http://en.cppreference.com/w/cpp/thread/thread/joinable) states:
  
_**A thread that has finished executing code, but has not yet been joined is still considered an active thread of execution and is therefore joinable.**_

Seeing as the thread in question was indeed never joined (or detached) we were hit by this error. Now, this issue can be solved by joining with or detaching from the thread, but I think that would be the wrong lesson to learn here.

This is just one example of how things are more difficult with threads than they are with _tasks_. Practically any imaginable scenario is made easier and less error-prone with tasks. Just as tasks were a paradigm shift in .NET, they should be in C++11 &#8211; only manipulate threads directly if you must!

  * On Windows, tasks are built in Visual Studio as part of the [Concurrency Runtime](https://msdn.microsoft.com/en-us/library/dd504870.aspx)
  * On other platforms, you can use the PPL tasks module in the [C++ Rest SDK (formerly Casablanca)](https://casablanca.codeplex.com/)

  Both of the above are known as PPLX.