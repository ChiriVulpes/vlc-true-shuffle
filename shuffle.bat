set cwd=%~dp0

:: if no arguments are provided, we're here to install the shuffle context menu command
if [%1]==[] goto install

	:: otherwise, we're here to shuffle a playlist
	node "%cwd%shuffle.js" %1
	goto :eof


:: creates a shuffle.reg file and runs it
:install

	:: create shuffle.reg file
	echo Windows Registry Editor Version 5.00>> shuffle.reg

	echo.>> shuffle.reg

	echo [HKEY_CLASSES_ROOT\VLC.xspf\shell\Shuffle]>> shuffle.reg
	echo @="Shuffle Play with VLC media player">> shuffle.reg
	echo "Icon"="\"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe\",0">> shuffle.reg
	echo "MultiSelectModel"="Player">> shuffle.reg

	echo.>> shuffle.reg

	set esccwd=%cwd:\=\\%
	echo [HKEY_CLASSES_ROOT\VLC.xspf\shell\Shuffle\command]>> shuffle.reg
	echo @="\"%esccwd%shuffle.bat\" \"%%1\"">> shuffle.reg
	
	:: run shuffle.reg file
	shuffle.reg

	:: cleanup
	del shuffle.reg

	
	:: create uninstall.reg file
	echo Windows Registry Editor Version 5.00>> uninstall.reg
	
	echo.>> uninstall.reg
	
	echo [-HKEY_CLASSES_ROOT\VLC.xspf\shell\Shuffle]>> uninstall.reg
