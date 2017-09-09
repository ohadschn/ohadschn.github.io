---
title: Automatically renewing Azure Web App HTTPS certificates for free using letsencrypt-webapp-renewer
categories:
  - Security
tags:
  - HTTPS 
  - SSL 
  - TLS 
  - Azure 
  - WebApps
---
HTTPS is the pervasive standard for all websites, regardless of size or field. 
The Mozilla foundation has gone so far as to [announce their intent to completely phase out HTTP](https://blog.mozilla.org/security/2015/04/30/deprecating-non-secure-http/). 
Unfortunately, the procurement, maintenance, and renewal of SSL/TLS certificates has been an expensive and manual process for many.

Enter [Let's Encrypt](https://letsencrypt.org/) - a free, automated, and open Certificate Authority. Shortly after its release, Simon J.K. Pedersen created the excellent [letsencrypt-siteextension](https://github.com/sjkp/letsencrypt-siteextension) Azure Web App extension for easy integration with Azure Web Apps. However, at the time of writing it suffers from several issues:

- The extension must be installed on the same web app as your site.
  - This means you must install the extension on each and every Web App you own.
  - Worse, if you happen to publish your Web App with the "Delete Existing files", it will silently delete the WebJob created by the extension, effectively nullifying it.
- There are no e-mail notifications (you could set some basic ones with Zapier but they won't contain details on the actual renewals that took place).
- It relies on an Azure Storage account which has to be [configured in a certain way](https://github.com/sjkp/letsencrypt-siteextension/issues/148), which is an unneeded possible point of failure.
- The extension can only be run in the context of a web app. You might want to run it as a command-line tool (e.g. from your CI system).

## Solution
[`letsencrypt-webapp-renewer`](https://github.com/ohadschn/letsencrypt-webapp-renewer) is a WebJob-ready command-line executable I created that builds upon [letsencrypt.azure.core](https://www.nuget.org/packages/letsencrypt.azure.core/) (the core component behind letsencrypt-siteextension) to provide the following features:
- Install on any Web App (doesn't have to be the same web app for which you want to manage SSL certs).
  - Multiple Web App management is supported.
  - Publishing with "Delete Existing files" has no effect when the WebJob is deployed to a different (preferably dedicated) Web App.
- E-mail notifications are built in (via SendGrid).
- No external dependencies other than Let's Encrypt.
- Can be executed as a plain command-line tool from any environment.

Head on to [https://github.com/ohadschn/letsencrypt-webapp-renewer](https://github.com/ohadschn/letsencrypt-webapp-renewer) to get started!