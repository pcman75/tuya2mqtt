#!/usr/bin/dumb-init bashio
set -e

bashio::log.info "==> Starting application"

export DEBUG=tuya-mqtt:*

cp /data/options.json tuya-mqtt/config.json
jq -r .tuya_devices /data/options.json | tee /tuya-mqtt/devices.conf
cd /tuya-mqtt/

exec node tuya-mqtt.js