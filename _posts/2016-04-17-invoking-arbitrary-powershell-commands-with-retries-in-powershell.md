---
id: 694
title: Invoking arbitrary PowerShell commands with retries in PowerShell
date: 2016-04-17T15:25:45+00:00
author: ohadsc
guid: http://www.ohadsoft.com/?p=694
permalink: /2016/04/invoking-arbitrary-powershell-commands-with-retries-in-powershell/
categories:
  - Uncategorized
---
Yesterday <a href="https://www.ohadsoft.com/2016/04/invoking-arbitrary-shell-cmd-commands-in-powershell/" target="_blank">I blogged</a> about a function I created to execute arbitrary shell (cmd) commands in PowerShell, with retries in face of failures. But what if the command I want to execute is actually another PowerShell script (or function, or cmdlet)? The rules change a bit:

  * We need to use splatting when making the call (otherwise named parameters won&#8217;t work, see the references below).
  * In addition to splatting the call itself, we also need to format the argument hash table for printing the command (otherwise it would just print something like `Executing: Foo.ps1 System.Collections.Hashtable`).
  * `$LASTEXITCODE` is no longer (necessarily) relevant, we need to work with PowerShell&#8217;s `$?` automatic variable.
  * Parsing the error stream makes less sense, but we need to handle exceptions.

Here&#8217;s how it looks:

```powershell
<#
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
$output = Call-PSCommandWithRetries "dir" @{"Path"='C:\'}

#>
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
   $formattedArgs = $Arguments.Keys.ForEach({"-$($_):$($Arguments.$_)"}) -join ' '
   Write-Host $(if ($PrintCommand) {"Executing: $Command $formattedArgs"} else {"Executing PS command..."}) 
  
   $exceptionThrown = $false
   try
   {
    & $Command @Arguments 2&gt;&1 | tee -Variable output | Write-Host
   }
   catch
   {
    Write-Host "PS command threw exception: $($_.Exception)" -ForegroundColor Yellow
    $exceptionThrown = $true
   }
  
   if ($? -and !($exceptionThrown))
   {
    Write-Host "PS Command executed successfully"
    return $output
   }
  
   Write-Host "PS Command failed" -ForegroundColor Yellow
   if ($attempt -eq $MaxAttempts)
   {
    $ex = new-object System.Management.Automation.CmdletInvocationException "All retry attempts exhausted"
    $category = [System.Management.Automation.ErrorCategory]::LimitsExceeded
    $errRecord = new-object System.Management.Automation.ErrorRecord $ex, "CommandFailed", $category, $Path
    $psCmdlet.WriteError($errRecord)
    return $output
   }
    
   $attempt++;
   Write-Host "Retrying test execution [#$attempt/$MaxAttempts] in $RetrySleepSeconds seconds..."
   Start-Sleep -s $RetrySleepSeconds
  }
 }
}
```

References:

  * <a href="http://stackoverflow.com/questions/10666101/lastexitcode-0-but-false-in-powershell-redirecting-stderr-to-stdout-gives-n" target="_blank">http://stackoverflow.com/questions/10666101/lastexitcode-0-but-false-in-powershell-redirecting-stderr-to-stdout-gives-n</a>
  * <a href="http://stackoverflow.com/questions/36164888/using-the-powershell-call-operator-to-call-powershell-scripts-with-switch-pa" target="_blank">http://stackoverflow.com/questions/36164888/using-the-powershell-call-operator-to-call-powershell-scripts-with-switch-pa</a>