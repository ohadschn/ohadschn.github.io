---
id: 408
title: Controlling the physical storage location of the Azure Storage Emulator
date: 2014-09-25T13:49:44+00:00
author: ohadsc
guid: http://ohadsc.wordpress.com/?p=408
permalink: /2014/09/controlling-the-physical-storage-location-of-the-azure-storage-emulator/
sharing_disabled:
  - "1"
categories:
  - Software-Development
tags:
  - Azure
  - Azure-Storage
---
The Azure Storage Emulator is a very convenient tool for working against mocked Azure Storage services &#8211; blobs, queues and tables. However, it appears to have no visible means of setting the physical location used for storage, or even determining it. Luckily, both are easily achieve.

**Blobs**

Blobs are stored on the file system, and that location is [very easy](http://stackoverflow.com/a/23671454/67824) to control:

  1. Navigate to _C:Users<YourUserName>AppDataLocalWAStorageEmulator_
  2. Open _WAStorageEmulator.<EmulatorVersion>.config _with the test editor of your choice
  3. Change the _PageBlobRoot _and _BlockBlobRoot _to the location you desire (the default is something like _C:Users<UserName>AppDataLocalWAStorageEmulatorPageBlobRoot_)

**Tables and queues**

Tables and queues are stored in a SQL server database ([LocalDB](http://msdn.microsoft.com/en-us/library/hh510202.aspx) by default), so in order to set the physical storage location, we simply need to set the physical storage location of the database ([mdf file](http://stackoverflow.com/questions/1175882/what-is-an-mdf-file)). We&#8217;ll use the [sqlcmd](http://msdn.microsoft.com/en-us/library/ms162773.aspx) utility to do that:

  1. Close all programs that may be using the storage emulator database (the storage emulator itself, management studio, visual studio, etc.)
  2. Run _sqlcmd -S instancePath_ 
      * By default the storage emulator uses LocalDB, so the above would be _sqlcmd -S (localdb)v11.0_
      * If you [configured a different SQL Server instance](http://msdn.microsoft.com/en-us/library/azure/gg433132.aspx) you&#8217;ll have to use that instead
      * You can always determine the instance path used by the storage emulator by examining the _SQLInstance_ element in the_ __WAStorageEmulator.<EmulatorVersion>.config_ file mentioned in the Blobs section above
  3. Type the following commands with [enter] after each line: 
      1. _SELECT name, physical\_name AS CurrentLocation, state\_desc FROM sys.master_files_
      2. _Go_
  4. You will now see the list of all database files. Pick a file you want to move and note its name and current physical location. For example, suppose you want to move the _WAStorageEmulatorDb32_ file from its current location to _E:StorageEmulatorLocalDBWAStorageEmulatorDb33.mdf_
  5. Type the following commands with [enter] after each line: 
      1. _ALTER DATABASE WAStorageEmulatorDb33 SET OFFLINE with no_wait_
      2. _Go_
  6. Move the mdf file from its current location to _E:StorageEmulatorLocalDBWAStorageEmulatorDb33.mdf_
  7. Type the following commands with [enter] after each line: 
      1. _ALTER DATABASE WAStorageEmulatorDb33 MODIFY FILE ( NAME = WAStorageEmulatorDb33, FILENAME = &#8216;E:StorageEmulatorLocalDBWAStorageEmulatorDb33.mdf&#8217;)_
      2. _ALTER DATABASE WAStorageEmulatorDb33 SET ONLINE_
      3. _Go_
  8. All done. You can verify the result of the move by re-running the commands in step (3) and observing the new file location.

Knowing where the storage emulator stores its data and how to change that location can be useful. For example, if your C: drive is a small SSD, space may be running low. Conversely, your C: drive may be a slow hard disk drive, and you wish to use a faster SSD for storage emulation.