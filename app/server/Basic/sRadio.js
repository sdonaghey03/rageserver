const misc = require('../sMisc');

class Radio {
    constructor() {
        mp.events.add({
            "sKeys-R": (player) => {
                if (!player.loggedIn) return;

                player.call("cRadio-Open", [player.lang]);
                misc.log.debug(`${player.name} opens radio menu`);
            },

        });
    }
}
new Radio();
