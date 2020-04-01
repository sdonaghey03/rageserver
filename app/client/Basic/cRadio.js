const misc = require('../cMisc');

mp.events.add({
	"cRadio-Open" : (lang) => {
		misc.prepareToCef(0);
		misc.openCef("package://RP/Browsers/Radio/Radio.html", lang);
	},
    "cRadio-Close": () => {
        misc.closeCef();
    },
});