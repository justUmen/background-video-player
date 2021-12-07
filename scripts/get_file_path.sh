#!/bin/bash
echo '{ "command": ["get_property_string", "path"] }' | socat - /tmp/mpvsocket | jq .data | tr -d '"' | tr -d '\n'
