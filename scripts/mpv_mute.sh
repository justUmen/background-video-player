#!/bin/bash
echo '{ "command": ["set_property", "mute", true] }' | socat - /tmp/mpvsocket
