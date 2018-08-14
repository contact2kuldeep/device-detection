(function () {
    'use strict';
    
    var platform = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        operatingSystems: [
            { name: 'Windows Phone', version: 'OS' },
            { name: 'Windows', version: 'NT' },
            { name: 'iPhone', version: 'OS' },
            { name: 'iPad', version: 'OS' },
            { name: 'Kindle', version: 'Silk' },
            { name: 'Android', version: 'Android' },
            { name: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', version: '/' },
            { name: 'Macintosh', version: 'OS X' },
            { name: 'Linux', version: 'rv' },
            { name: 'Palm', version: 'PalmOS' }
        ],
        browsers: [
            { name: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', version: 'Firefox' },
            { name: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', version: 'MSIE' },
            { name: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', version: 'CLDC' },
            { name: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.lookup(agent, this.operatingSystems),
                browser = this.lookup(agent, this.browsers);
            
            return { os: os, browser: browser };
        },
        lookup: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;
            
            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].name, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        },
		result: function () {
			var _result = '';
            _result += '<strong>Result from this component</strong><br/>';
			_result += 'os.name = ' + e.os.name + '<br/>';
			_result += 'os.version = ' + e.os.version + '<br/>';
			_result += 'browser.name = ' + e.browser.name + '<br/>';
			_result += 'browser.version = ' + e.browser.version + '<br/>';
			
			_result += '<hr/><strong>Result from Navigator</strong><br/>';
			_result += 'navigator.userAgent = ' + navigator.userAgent + '<br/>';
			_result += 'navigator.appVersion = ' + navigator.appVersion + '<br/>';
			_result += 'navigator.platform = ' + navigator.platform + '<br/>';
			_result += 'navigator.vendor = ' + navigator.vendor + '<br/>';
			return _result;
        }
    };
    
    var e = platform.init();
	
    document.getElementById('result').innerHTML = platform.result();
	
}());