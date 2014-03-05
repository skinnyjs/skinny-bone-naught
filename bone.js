module.exports = function attachNaughtBone(skinny) {
    "use strict";

    skinny.once('start', function sendOnlineOnStart() {
        process.send('online');
    });

    skinny.once('error', function sendOfflineOnError() {
        process.send('offline')
    });

    if (skinny.lifecycle) {
        process.on('message', function shutdownOnMessageFromNaught(message) {
            if (message === 'shutdown') {
                skinny.lifecycle.shutdown();
            }
        });
    }
};