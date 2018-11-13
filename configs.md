---
layout: page
title: Configs
permalink: /configs/
---
## .bashrc
~~~ bash
alias ls='ls -h --color'
alias ll="ls -l"
alias la="ls -la"
alias npp=$"\"/c/Program Files (x86)/Notepad++/notepad++.exe\""
alias posh='powershell'
alias psc='posh -c'
alias python2='/c/Python27/python.exe'
alias python3='/c/python35/python.exe'
alias http-serve2='python2 -m SimpleHTTPServer 8001 > /dev/null 2>&1'
alias http-serve='python3 -m http.server 8000 > /dev/null 2>&1'
alias bash-replace='exec "$BASH"'
alias bashrc-reload='. ~/.bashrc'
~~~

## .gitconfig
~~~
[alias]
	co = checkout
	st = status
	br = branch
	hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
	type = cat-file -t
	dump = cat-file -p
	ahead = cherry -v origin/master
	meld = difftool -y
	unstage = reset HEAD --
	discard = checkout --
	st-commit = diff-tree --name-status -r
~~~

## profile.ps1
~~~ powershell
if ($host.Name -eq 'ConsoleHost')
{
	# Set up environment
    Import-Module PSGet
	
	function Load-PSReadline() {
		if ($PSVersionTable.PSVersion.Major -gt 2) {
			Import-Module PSReadline
		}
		else {
			Write-Host "profile.ps1 - Didn't load module PSReadline since the module requires powershell version > 2.x!" -Foreground Yellow
		}
	}
	
	function Load-PSColor() {
		if ($PSVersionTable.PSVersion.Major -gt 2) {
			Import-Module PSColor
		}
		else {
			Write-Host "profile.ps1 - Didn't load module PSColor since the module requires powershell version > 2.x!" -Foreground Yellow
		}
	}
	
	Load-PSColor
	Load-PSReadline
	
	# Somewhat useful functions
	function Show-Colors( ) {
		$colors = [Enum]::GetValues([ConsoleColor])
		$max = ($colors | foreach { "$_ ".Length } | Measure-Object -Maximum).Maximum
		foreach($color in $colors) {
			Write-Host (" {0,2} {1,$max} " -f [int]$color,$color) -NoNewline
			Write-Host "$color" -Foreground $color
		}
	}
	
	function Show-ColorTable() {
		for ($bg = 0; $bg -lt 0x10; $bg++) {
			for ($fg = 0; $fg -lt 0x10; $fg++) {
				Write-Host -nonewline -background $bg -foreground $fg (" {0:X}{1:X} " -f $bg,$fg)
			}
			Write-Host
		}
	}
}
~~~
