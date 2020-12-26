ARG BUILD_FROM=homeassistant/amd64-base:latest
FROM $BUILD_FROM

ENV LANG C.UTF-8

WORKDIR /
RUN apk add --update --no-cache nodejs npm dumb-init git
RUN git clone https://github.com/TheAgentK/tuya-mqtt.git && cd tuya-mqtt && npm install

COPY start.sh /tuya-mqtt/start.sh
ENTRYPOINT ["/tuya-mqtt/start.sh"]

LABEL io.hass.version="VERSION" io.hass.type="addon" io.hass.arch="armhf|aarch64|i386|amd64"
