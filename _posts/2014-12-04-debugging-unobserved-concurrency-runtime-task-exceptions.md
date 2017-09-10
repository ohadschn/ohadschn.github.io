---
id: 427
title: Debugging unobserved concurrency runtime task exceptions
date: 2014-12-04T21:42:19+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=427
permalink: /2014/12/debugging-unobserved-concurrency-runtime-task-exceptions/
categories:
  - Software-Development
tags:
  - C++
  - Debugging
  - Concurrency
  - LLDB
  - PPLX
---
The [C++ Concurrency runtime](https://msdn.microsoft.com/en-us/library/dd504870.aspx) (AKA PPLX) is the unmanaged answer to the [Task Parallel Library (TPL)](https://msdn.microsoft.com/en-us/library/dd460717%28v=vs.110%29.aspx), and it works surprisingly well. It is even cross platform by way of the [C++ Rest SDK](https://casablanca.codeplex.com/) (codename Casablanca).

I work at Microsoft and in our group we are making extensive use of this library (we develop an iOS application). Recently, I encountered an interesting crash due to an unobserved exception. An unobserved exception is basically an exception thrown from a task, which no other entity (be it the caller or some later continuation) observed (typically by calling _task::wait_ or _task::get_). In PPLX, such exceptions crash the process ([in .NET they used to, and still may depending on configuration](https://blogs.msdn.com/b/pfxteam/archive/2011/09/28/task-exception-handling-in-net-4-5.aspx)).

When an unobserved PPLX exception occurs, the debugger will break in the following location inside _pplxtasks.h:_

```cpp
// If you are trapped here, it means an exception thrown in task chain didn&#8217;t get handled.
// Please add task-based continuation to handle all exceptions coming from tasks.
// this->\_M\_stackTrace keeps the creation callstack of the task generates this exception.
_REPORT_PPLTASK_UNOBSERVED_EXCEPTION(); // <- debugger will break here
```

Your mileage may vary, but I wasn’t able to inspect the _\_M\_stackTrace_ variable in XCode’s debugger.

However, using the _lldb_ console (you can bring it up with ⌘+Shift+C) I was able to inspect its value:

```cpp
_(lldb) expr _M_stackTrace_
```

Here is a sample output:

```cpp
(pplx::details::_TaskCreationCallstack) $1 = {
_M_SingleFrame = 0x00c0935d
_M_frames = size=0 {}
}
```

In this case, the frame of interest is stored in _\_M\_SingleFrame_ (otherwise the list of frames would have been stored in _\_M\_frames_ and _\_M\_SingleFrame_ would have been null). Of course, “0x00c0935d” is not a terribly useful piece of data for root cause analysis, and I wasn&#8217;t even sure what that address represented! Fortunately, following macro in the same header clarified that mystery:

```cpp
#define _CAPTURE_CALLSTACK() ::pplx::details::_TaskCreationCallstack::_CaptureSingleFrameCallstack(_ReturnAddress())
```
So now we know it is a return address, pointing to the code creating the offending exception. Fortunately, _lldb_ can resolve that address to source:

```cpp
(lldb) so l -a 0x00c0935d
```

Sample output:

```cpp
/Users/ohads/Library/Developer/Xcode/DerivedData/ios-gdhrlqjldqgqktgtpdnpssahaqme/Build/Products/OurApp`pplx::task<void> pplx::task_from_exception<void, std::exception>(std::exception, pplx::task_options const&) + 62** at &#8230;
```
It’s not perfect, but it should be enough to narrow the search down (in this case, there was only one place in our code using task\_from\_exception).