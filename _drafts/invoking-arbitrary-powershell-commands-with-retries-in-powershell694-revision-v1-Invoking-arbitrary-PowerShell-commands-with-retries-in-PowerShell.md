---
id: 704
title: Invoking arbitrary PowerShell commands with retries in PowerShell
date: 2016-04-27T09:02:56+00:00
author: ohadsc
layout: revision
guid: http://www.ohadsoft.com/2016/04/694-revision-v1/
permalink: /2016/04/694-revision-v1/
---
Yesterday <a href="https://www.ohadsoft.com/2016/04/invoking-arbitrary-shell-cmd-commands-in-powershell/" target="_blank">I blogged</a> about a function I created to execute arbitrary shell (cmd) commands in PowerShell, with retries in face of failures. But what if the command I want to execute is actually another PowerShell script (or function, or cmdlet)? The rules change a bit:

  * We need to use splatting when making the call (otherwise named parameters won&#8217;t work, see the references below).
  * In addition to splatting the call itself, we also need to format the argument hash table for printing the command (otherwise it would just print something like `Executing: Foo.ps1 System.Collections.Hashtable`).
  * `$LASTEXITCODE` is no longer (necessarily) relevant, we need to work with PowerShell&#8217;s `$?` automatic variable.
  * Parsing the error stream makes less sense, but we need to handle exceptions.

Here&#8217;s how it looks:

<pre class="brush: powershell; title: ; notranslate" title="">&lt;#

.SYNOPSIS
Invokes a command with retries.

.DESCRIPTION
The Call-PSCommandWithRetries function invokes PowerShell scripts, functions, or Cmdlets using the provided parameters, with optional retries in configurable intervals upon failures.

.PARAMETER Command 
The command to invoke. Can be any PowerShell script, function, or Cmdlet.

.PARAMETER Arguments
Arguments to pass when invoking the comand (using splatting). 

.PARAMETER RetrySleepSeconds
Time in seconds to sleep between retry attempts in case of command failure.

.PARAMETER MaxAttempts
Maximum number of retry attempts in case of command failure.

.PARAMETER PrintCommand
Determines whether or not to print the full command to the host before execution.

.INPUTS 
None. You cannot pipe objects to Call-PSCommandWithRetries.

.OUTPUTS
The output of the last command execution.

.EXAMPLE
$output = Call-PSCommandWithRetries &quot;dir&quot; @{&quot;Path&quot;='C:\'}

#&gt;
function Call-PSCommandWithRetries
{
 [CmdletBinding()]
 Param( 
    [Parameter(Mandatory=$True)]
    [string]$Command,
    [hashtable]$Arguments,
    [int]$RetrySleepSeconds = 10,
    [int]$MaxAttempts = 10,
    [bool]$PrintCommand = $True
 )

 Process
 {
  $attempt = 0
  while ($true)
  {
   $formattedArgs = $Arguments.Keys.ForEach({&quot;-$($_):$($Arguments.$_)&quot;}) -join ' '
   Write-Host $(if ($PrintCommand) {&quot;Executing: $Command $formattedArgs&quot;} else {&quot;Executing PS command...&quot;}) 
  
   $exceptionThrown = $false
   try
   {
    &amp; $Command @Arguments 2&gt;&amp;1 | tee -Variable output | Write-Host
   }
   catch
   {
    Write-Host &quot;PS command threw exception: $($_.Exception)&quot; -ForegroundColor Yellow
    $exceptionThrown = $true
   }
  
   if ($? -and !($exceptionThrown))
   {
    Write-Host &quot;PS Command executed successfully&quot;
    return $output
   }
  
   Write-Host &quot;PS Command failed&quot; -ForegroundColor Yellow
   if ($attempt -eq $MaxAttempts)
   {
    $ex = new-object System.Management.Automation.CmdletInvocationException &quot;All retry attempts exhausted&quot;
    $category = [System.Management.Automation.ErrorCategory]::LimitsExceeded
    $errRecord = new-object System.Management.Automation.ErrorRecord $ex, &quot;CommandFailed&quot;, $category, $Path
    $psCmdlet.WriteError($errRecord)
    return $output
   }
    
   $attempt++;
   Write-Host &quot;Retrying test execution [#$attempt/$MaxAttempts] in $RetrySleepSeconds seconds...&quot;
   Start-Sleep -s $RetrySleepSeconds
  }
 }
}
</pre>

References:

  * <a href="https://stackoverflow.com/questions/10666101/lastexitcode-0-but-false-in-powershell-redirecting-stderr-to-stdout-gives-n" target="_blank">https://stackoverflow.com/questions/10666101/lastexitcode-0-but-false-in-powershell-redirecting-stderr-to-stdout-gives-n</a>
  * <a href="https://stackoverflow.com/questions/36164888/using-the-powershell-call-operator-to-call-powershell-scripts-with-switch-pa" target="_blank">https://stackoverflow.com/questions/36164888/using-the-powershell-call-operator-to-call-powershell-scripts-with-switch-pa</a>