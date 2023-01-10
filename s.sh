#!/bin/sh

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

FILENAME=$0

echo Current
echo "$SCRIPT_DIR"
echo
#echo $( ls -l "$FILENAME" )

#set variable equal to last modified date
TIME=$( ls -l "$FILENAME" | cut -d' ' -f 11 )

#compare dates and rerun on target
echo "$TIME"
TARGET="/"

while :
do
  TIME=$( date +"%H:%M" )
  if [ "$TIME" = 04:00 ] || [ "$TIME" = 16:00 ];
  then
    cd "/Users/" || exit

    pkill -x "$TARGET"
    #sudo chmod +x "$TARGET"
    open -a "$TARGET"
    echo "rebooted"
    sleep 60
  else
    echo "..."
    sleep 60
  fi
done