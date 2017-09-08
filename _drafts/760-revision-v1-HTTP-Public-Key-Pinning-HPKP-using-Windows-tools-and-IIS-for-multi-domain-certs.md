---
id: 761
title: HTTP Public Key Pinning (HPKP) using Windows tools and IIS for multi domain certs
date: 2016-12-19T08:06:00+00:00
author: ohadsc
layout: revision
guid: http://www.ohadsoft.com/2016/12/760-revision-v1/
permalink: /2016/12/760-revision-v1/
---
Note that the public key pinning can be done against the private keys direclty without creating a CSR (details in https://scotthelme.co.uk/hpkp-http-public-key-pinning/)

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-
  
&#8211;Get fingerprint from existing cert &#8212;
  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-
  
\*\* Get binary cert fingerprint \*\*
  
openssl x509 -pubkey < 2_ohadsoft.com.crt | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary > fingerprint.bin

\*\* Encode binary fingerprint to base64 \*\*
  
certutil -encode fingerprint.bin fingerprint.txt

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;
  
&#8211;Generate backup CSR1 and get its fingerprint &#8212;
  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;
  
\*\* Generate Private key \*\*
  
openssl genrsa -out ohadsoft.1.key 4096

\*\* Generate CSR \*\*
  
openssl req -new -key ohadsoft.1.key -sha256 -out ohadsoft.1.csr -subj &#8220;/C=IL/ST=NA/L=Tel Aviv/O=OhadSoft/OU=IT/CN=www.ohadsoft.com/emailAddress=contact@ohadsoft.com/subjectAltName=DNS.1=www.ohadsoft.com,DNS.2=ohadsoft.com,DNS.3=www.howlongtobeatsteam.com,DNS.4=howlongtobeatsteam.com&#8221;

\*\* Get CSR fingerprint \*\*
  
openssl req -pubkey < ohadsoft.1.csr | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary > fingerprint.bin

\*\* Encode binary fingerprint to base64 \*\*
  
certutil -encode fingerprint.bin fingerprint.txt

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;
  
&#8211;Generate backup CSR2 and get its fingerprint &#8212;
  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

\*\* Generate Private key \*\*
  
openssl genrsa -out ohadsoft.2.key 4096

\*\* Generate CSR \*\*
  
openssl req -new -key ohadsoft.2.key -sha256 -out ohadsoft.2.csr -subj &#8220;/C=IL/ST=NA/L=Tel Aviv/O=OhadSoft/OU=IT/CN=www.ohadsoft.com/emailAddress=contact@ohadsoft.com/subjectAltName=DNS.1=www.ohadsoft.com,DNS.2=ohadsoft.com,DNS.3=www.howlongtobeatsteam.com,DNS.4=howlongtobeatsteam.com&#8221;

\*\* Get CSR fingerprint \*\*
  
openssl req -pubkey < ohadsoft.2.csr | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary > fingerprint.bin

\*\* Encode binary fingerprint to base64 \*\*
  
certutil -encode fingerprint.bin fingerprint.txt

IIS configuration:
  
<add name="Public-Key-Pins-Report-Only" value="pin-sha256="9dNiZZueNZmyaf3pTkXxDgOzLkjKvI+Nza0ACF5IDwg="; pin-sha256="f7IIOp8KoTwnZUhemu8S8a50w9SizMmxfiiGhNXW7Hw="; pin-sha256="dG3sXN0rMrcx+56LLY2E2fp+LulPGoBM3NAqU5243Ck="; includeSubDomains; max-age=60; report-uri="https://ohadsoft.report-uri.io/r/default/hpkp/reportOnly"" />