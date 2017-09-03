---
id: 465
title: 'In C++, even a thread is not thread-safe (or: why you should use tasks part 2)'
date: 2015-04-12T22:14:17+00:00
author: ohadsc
guid: https://ohadsc.wordpress.com/?p=465
permalink: /2015/04/in-c-even-a-thread-is-not-thread-safe-or-why-you-should-use-tasks-part-2/
publicize_google_plus_url:
  - https://plus.google.com/+OhadSchneider/posts/CzMCCEKMCze
publicize_facebook_url:
  - https://facebook.com/
  - https://facebook.com/
publicize_linkedin_url:
  - ""
  - ""
categories:
  - Uncategorized
---
Consider the following (contrived) code:

```cpp
using namespace std;

void work()
{
    this_thread::sleep_for(chrono::seconds(2));
}

void wait(thread* t)
{
    t-&gt;join();
}

int main()
{
    thread worker(work); 
    thread waiter1(wait, &worker); 
    thread waiter2(wait, &worker);

    waiter1.join();
    waiter2.join();

    return 0;
}
```

The intent of the code is quite clear &#8211; we spawn a worker thread and have two threads wait for it to finish. Let&#8217;s assume that the sleep is long enough so that both threads try and join while the worker is still running (otherwise the thread stops being joinable and calling _join_ throws). Even under that assumption, the code&#8217;s behavior is not defined (UB). The reason is in the [docs](http://www.cplusplus.com/reference/thread/thread/join/):

> Note that any operations on the [thread](http://www.cplusplus.com/thread) object itself are not synchronized (unlike the operations within the thread it represents).

In other words, **the std::thread object itself is not thread safe**, so we can&#8217;t call its methods concurrently (which is what we&#8217;re doing in _waiter1_ and _waiter2_). We&#8217;ll have to do something like this:

```cpp
using namespace std;

mutex m;

void work()
{
     this_thread::sleep_for(chrono::seconds(2));
}

void wait(thread* t)
{
    lock_guard&lt;std::mutex&gt; lock(m);
    if (t-&gt;joinable())
    {
        t-&gt;join();
    }
}

int _tmain()
{
    thread worker(work);
    thread waiter1(wait, &worker);
    thread waiter2(wait, &worker);

    waiter1.join();
    waiter2.join();

    return 0;
}
```

Of course, were you using _tasks_, you wouldn&#8217;t have needed to concern yourself with such trivialities:

```
using namespace std;
using namespace concurrency;

auto worker = create_task([]
{
    this_thread::sleep_for(chrono::seconds(2));
});

auto waiter1 = create_task([&worker]
{
    worker.wait();
});

auto waiter2 = create_task([&worker]
{
     worker.wait();
});

waiter1.wait(); //works
waiter2.wait(); //great
```

I hope this has taken you one step closer to ditching bare threads (if you haven&#8217;t already). If it didn&#8217;t, be sure to check out [(Not) using std::thread](https://akrzemi1.wordpress.com/2012/11/14/not-using-stdthread/) by Andrzej Krzemieński (his blog is great all around, so I recommend you check it out anyway).

Reminder:

  * On Windows, tasks are built in Visual Studio as part of the [Concurrency Runtime](https://msdn.microsoft.com/en-us/library/dd504870.aspx).
  * On other platforms, you can use the PPL tasks module in the [C++ Rest SDK (formerly Casablanca)](https://casablanca.codeplex.com/).