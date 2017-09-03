---
id: 418
title: Should you use std::string, std::u16string, or std::u32string?
date: 2014-11-17T22:56:39+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=418
permalink: /2014/11/should-you-use-stdstring-stdu16string-or-stdu32string/
sharing_disabled:
  - "1"
categories:
  - Uncategorized
---
C++11 introduced a couple of new string classes on top of [std::string](http://www.cplusplus.com/reference/string/string/):

  1. [u16string](http://www.cplusplus.com/reference/string/u16string/)
  2. [u32string](http://www.cplusplus.com/reference/string/u32string/)

&#8220;Finally&#8221;, you must think, &#8220;C++ has addressed the sorry state of Unicode development in portable code! All I have to do is choose one of these classes and I&#8217;m all set!&#8221;.

Well, you&#8217;d might want to rethink that. To see why, let&#8217;s take a look at some definitions:

```cpp
typedef basic_string<char> string;
typedef basic_string<char16_t> u16string;
typedef basic_string<char32_t> u32string;
```

As you can see, they all use the same exact template class. In other words, **there is nothing Unicode-aware, or anything special at all for that matter, with the new classes**. You don&#8217;t get &#8220;Unicode for free&#8221; or anything like that. We do see however an important difference between them &#8211; each class uses a different type as an underlying &#8220;character&#8221;.

Why do I say &#8220;character&#8221; with double quotes? Well, when used correctly, these underlying data types should actually represent [code units](http://www.unicode.org/glossary/#code_unit) (minimal Unicode encoding blocks) &#8211; not characters! For example, suppose you have a UTF-8 encoded _std::string_ containing the Hebrew word &#8220;שלום&#8221;. Since Hebrew requires two bytes per character, the string will actually contain **8** _**char **_**&#8220;characters&#8221;** &#8211; not 4!

And this is not only true for variable length encoding such as UTF-8 (and indeed, UTF-16). Suppose your UTF-32 encoded _std::u32string_ contains the [grapheme cluster](http://mathias.gaunard.com/unicode/doc/html/unicode/introduction_to_unicode.html#unicode.introduction_to_unicode.grapheme_clusters) (what we normally think of as a &#8220;character&#8221;) **ў**.** **That** **cluster is actually a combination of the **Cyrillic у** character with the [Breve](http://en.wikipedia.org/wiki/Breve) diacritic (which is a [combining code point](http://mathias.gaunard.com/unicode/doc/html/unicode/introduction_to_unicode.html#unicode.introduction_to_unicode.combining_character_sequences)), so your string will actually contain **2 _char32_t_ &#8220;characters&#8221;** &#8211; not 1!

In other words, these strings should really be thought of as **sequences of bytes**, where each string type is more suitable for a different Unicode encoding:

  * _std::string_ is suitable for UTF-8
  * _std::u16string_ is suitable for UTF-16
  * _std::u32string_ is suitable for UTF-32

Unfortunately, after all this talk we&#8217;re back to square one &#8211; what string class should we use? Well, since we now understand this is a question of _encoding_, the question becomes what _encoding_ we should use. Fortunately, even though this is somewhat of a [religious war](http://programmers.stackexchange.com/questions/102205/should-utf-16-be-considered-harmful), &#8220;the internet&#8221; has all but declared UTF-8 as the [winner](http://utf8everywhere.org/). Here’s what renowned Perl/Unicode expert Tom Christiansen had to say about UTF-16 (emphasis mine):

> I yesterday just found a bug in the Java core String class’s _equalsIgnoreCase_ method (also others in the string class) that would never have been there had Java used either UTF-8 or UTF-32. There are millions of these sleeping bombshells in any code that uses UTF-16, and I am sick and tired of them. **UTF-16 is a vicious pox that plagues our software with insidious bugs forever and ever. It is clearly harmful, and should be deprecated and banned.**

Other experts, such as the author of [Boost.Locale](http://www.boost.org/doc/libs/1_51_0/libs/locale/doc/html/index.html), have a similar view. The key arguments follow (for many more see the links above):

  1. Most people who work with UTF-16 assume it is a fixed-width encoding (2 bytes per code point). [It is not](http://msdn.microsoft.com/en-us/library/windows/desktop/dd374069(v=vs.85).aspx) (and even if it were, like we already saw _code points_ are not _characters_). This can be a source of hard to find bugs that may very well creep in to production and only occur when some Korean guy uses characters outside the [Basic Multilingual Plane (BMP)](http://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) to spell his name. In UTF-8 these things will pop up far sooner, as you&#8217;ll be running into multi-byte code points very quickly (e.g. Arabic).
  2. UTF-16 is not ASCII backward-compliant. UTF-8 is, since any ASCII string can be encoded the same (i.e. have the same bytes) in UTF-8 (I say _can_ because in Unicode there may be [multiple byte sequences that define the exact same grapheme clusters](http://en.wikipedia.org/wiki/Unicode_equivalence) &#8211; I&#8217;m not actually sure if there could be different forms for the same _ASCII_ string but disclaimers such as these are usually due when dealing with Unicode:) )
  3. UTF-16 has endianness issues. UTF-8 is endianness independent.
  4. UTF-8 favors efficiency for English letters and other ASCII characters (one byte per character). Since a lot of strings are inherently English (code, xml, etc.) this tradeoff makes sense in most scenarios.
  5. The World Wide Web is [almost universally UTF-8](http://en.wikipedia.org/wiki/UTF-8).

So now that we know what string class we should use (_std::string_) and what encoding we should use with it (_UTF-8_), you may be wondering **how **we should deal with these beasts. For example &#8211; how do we count grapheme clusters?

Unfortunately, that question depends on your use case and can be [extremely complex](http://gernot-katzers-spice-pages.com/var/korean_hangul_unicode.html?redirect=1). A couple of good places to start would be [UTF8-CPP](http://utfcpp.sourceforge.net/) and [Boost.Locale](http://www.boost.org/doc/libs/1_51_0/libs/locale/doc/html/index.html). Good luck 🙂