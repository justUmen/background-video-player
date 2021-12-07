#!/bin/bash
echo '{ "command": ["get_property_string", "time-pos"] }' | socat - /tmp/mpvsocket \
  | jq .data | tr '"' ' ' | cut -d'.' -f 1 | sed 's/[\t ]//g;/^$/d' |tr -d '\n'
