const log4js = require('log4js'),
//      bent = require('bent'),
      fs = require('fs').promises,
      TuyAPI = require('tuyapi'),
      mqtt = require('mqtt');

async function main() {
    // Configure logging
    log4js.configure({
        appenders: {console: {type: 'console'}},
        categories: {default: {appenders: ['console'], level: 'debug'}}
    });
    const logger = log4js.getLogger('app');

    // Lookup Add-on config
    logger.debug(`Attempting to read local configuration from options.json`);
    const aoconfig = JSON.parse(await fs.readFile('/data/options.json', 'utf8'));

    const device = new TuyAPI({
        id: aoconfig.tuya_id,
        key: aoconfig.tuya_key
    });
    
    // Find device on network
    device.find().then(() => {
        // Connect to device
        device.connect();
    });
      
    // Add event listeners
    device.on('connected', () => {
        console.info('Connected to device!');
    });
      
    device.on('disconnected', () => {
        console.info('Disconnected from device.');
    });
      
    device.on('error', error => {
        console.error('Error: ', error);
    });
}

main();