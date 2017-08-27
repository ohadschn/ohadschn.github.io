---
id: 670
title: Invoking arbitrary shell (cmd) commands with retries in PowerShell
date: 2016-04-16T18:25:16+00:00
author: ohadsc
guid: http://www.ohadsoft.com/?p=670
permalink: /2016/04/invoking-arbitrary-shell-cmd-commands-in-powershell/
categories:
  - Uncategorized
---
_**EDIT**&#8211; I initially tried to support execution of PowerShell scripts, functions, and cmdlets in the code below. However, it turns out that they behave too differently so I wrote a separate post on it: <https://www.ohadsoft.com/2016/04/invoking-arbitrary-powershell-commands-with-retries-in-powershell/>._

It may sound ironic, but executing shell (cmd) commands from PowerShell is not always trivial. There are various possibilities including `Start-Process`, `[Diagnostics.Process]::Start`, the call operator (&), and others. Each has its own quirks regarding exit codes, output redirection, argument escaping, and more. For a taste of the issues you might run into, see this <a href="http://edgylogic.com/blog/powershell-and-external-commands-done-right/" target="_blank">blog post by edgylogic</a>.

Having played around with most (all?) of the options, I finally settled down on what I percieve to be the most robust, versatile, and simple way of doing it. The (advanced) function below will allow the following: 

  * Print the command before execution.
  * Inspect the exit code and error stream to determine failure.
  * Retry the command in configurable intervals upon failure.
  * Pass multiple parameters.
  * Emit the command&#8217;s output to the pipe for further processing.
  * Set the execution status ($?) to `$False` in case of failre on all retries.

<pre class="brush: powershell; title: ; notranslate" title="">&lt;#

.SYNOPSIS
Calls a shell (cmd) command with retries

.DESCRIPTION
The Call-CommandWithRetries function calls shell (cmd) commands using the provided parameters, with optional retries in configurable intervals upon failures.

.PARAMETER Command 
The command to call.

.PARAMETER Arguments
Arguments to pass when invoking the comand. 

.PARAMETER TrustExitCode
Trust the command's exit code for the purpose of determining whether it was successful or not. 
If this parameter is $False, a non-empty stderr will also be considered a failure.

.PARAMETER RetrySleepSeconds
Time in seconds to sleep between retry attempts in case of command failure.

.PARAMETER MaxAttempts
Maximum number of retry attempts in case of command failure.

.PARAMETER PrintCommand
Determines whether or not to print the full command to the host before execution.

.INPUTS 
None. You cannot pipe objects to Call-CommandWithRetries.

.OUTPUTS
The output of the last command execution.

.EXAMPLE
Use cURL for Windows to download the latest NuGet command-line client
C:\PS&gt; Call-CommandWithRetries "curl.exe" @("--fail", "-O", "https://dist.nuget.org/win-x86-commandline/latest/nuget.exe")

#&gt;
function Call-CommandWithRetries
{
 [CmdletBinding()]
 param( 
     [Parameter(Mandatory=$True)]
     [string]$Command,
     [Array]$Arguments,
     [bool]$TrustExitCode = $True,
     [int]$RetrySleepSeconds = 10,
     [int]$MaxAttempts = 10,
     [bool]$PrintCommand = $True
 )

 Process
 {
  $attempt = 0
  while ($true)
  {   
   Write-Host $(if ($PrintCommand) {"Executing: $Command $Arguments"} else {"Executing command..."}) 
   & $Command $Arguments 2&gt;&1 | tee -Variable output | Write-Host
        
   $stderr = $output | where { $_ -is [System.Management.Automation.ErrorRecord] }
   if ( ($LASTEXITCODE -eq 0) -and ($TrustExitCode -or !($stderr)) )
   {
    Write-Host "Command executed successfully"
    return $output
   }

   Write-Host "Command failed with exit code ($LASTEXITCODE) and stderr: $stderr" -ForegroundColor Yellow
   if ($attempt -eq $MaxAttempts)
   {
    $ex = new-object System.Management.Automation.CmdletInvocationException "All retry attempts exhausted"
    $category = [System.Management.Automation.ErrorCategory]::LimitsExceeded
    $errRecord = new-object System.Management.Automation.ErrorRecord $ex, "CommandFailed", $category, $Command
    $psCmdlet.WriteError($errRecord)
    return $output
   }
            
   $attempt++;
   Write-Host "Retrying test execution [#$attempt/$MaxAttempts] in $RetrySleepSeconds seconds..."
   Start-Sleep -s $RetrySleepSeconds
  }
 }
}</pre>

References:

  * <a href="http://stackoverflow.com/questions/10666035/difference-between-and-lastexitcode-in-powershell" target="_blank">http://stackoverflow.com/questions/10666035/difference-between-and-lastexitcode-in-powershell</a>
  * <a href="http://stackoverflow.com/questions/24222088/powershell-capture-program-stdout-and-stderr-to-seperate-variables" target="_blank">http://stackoverflow.com/questions/24222088/powershell-capture-program-stdout-and-stderr-to-seperate-variables</a>