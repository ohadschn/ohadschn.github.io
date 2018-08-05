When the powershell process spawned by Start-Job is killed externally (e.g. task manager), receive job will throw `System.Management.Automation.Remoting.PSRemotingTransportException: The background process reported an error with the following message: .` (FullyQualifiedErrorId : JobFailure)

This seems to happen when PowerShell is run as a service with supplied credentials (link to MSDN).
Workarounds:
1. Replacing Invoke-Expression + & + cmd + powershell.exe with Start-Job
2. Output redirection (to file/nul)