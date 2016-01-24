if (!UserCare) {
    var UserCare = {};
}
UserCare.Util = {
    sslAssetHost: "https://sado.usercare.info",
    assetHost: "http://sado.usercare.info",
    getAssetHost: function() {
        return ("https:" == document.location.protocol) ? this.sslAssetHost : this.assetHost;
    },
    render: function(template, params) {
        return template.replace(/\#{([^{}]*)}/g, function(a, b) {
            var r = params[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        })
    },
    toQueryString: function(params) {
        var pairs = [];
        for (key in params) {
            if (params[key] != null && params[key] != '') {
                pairs.push([key, params[key]].join('='));
            }
        }
        return pairs.join('&');
    },
    isIE: function(test) {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            if (typeof test === "function") {
                return test(new Number(RegExp.$1));
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    isQuirksMode: function() {
        return document.compatMode && document.compatMode == "BackCompat";
    },
    includeCss: function(css) {
        var styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        styleElement.setAttribute('media', 'screen');
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css;
        } else {
            styleElement.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
};
UserCare.Page = {
    getDimensions: function() {
        var de = document.documentElement;
        var width = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
        var height = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
        return {
            width: width,
            height: height
        };
    }
};
UserCare.Dialog = {
    preload: function(id_or_html) {
        if (!this.preloaded) {
            var element = document.getElementById(id_or_html);
            var html = (element == null) ? id_or_html : element.innerHTML;
            this.setContent(html);
            this.preloaded = true;
        }
    },
    show: function(id_or_html) {
        if (!this.preloaded) {
            this.preload(id_or_html);
        }
        this.Overlay.show();
        //this.setPosition();
        UserCare.Element.addClassName(this.htmlElement(), 'dialog-open');
        this.element().style.display = 'block';
        this.preloaded = false;
        this.element().focus();
    },
    close: function() {
        var change = UserCare.needsConfirm;
        if (change) {
            var answer = confirm(change);
            if (!answer) {
                return
            }
        }
        this.element().style.display = 'none';
        UserCare.Element.removeClassName(this.htmlElement(), 'dialog-open');
        this.Overlay.hide();
        UserCare.onClose();
    },
    id: 'UserCare-dialog',
    css_template: "\
    #UserCare-dialog {\
      z-index: 100003;\
      display: block;\
      text-align: left;\
      margin: -2em auto 0 auto;\
      position: fixed; \
    }\
    \
    #UserCare-overlay {\
      position: fixed;\
      z-index:100002;\
      width: 100%;\
      height: 100%;\
      left: 0;\
      top: 0;\
      background-color: #000;\
      opacity: 0.7;\
    }\
    \
    #UserCare-overlay p {\
      padding: 5px;\
      color: #ddd;\
      font: bold 14px arial, sans-serif;\
      margin: 0;\
      letter-spacing: -1px;\
    }\
    \
    html.dialog-open object,\
    html.dialog-open embed {\
      visibility: hidden;\
    }\
    a#UserCare-dialog-close { background-image: url(#{background_image_url}); }" + (UserCare.Util.isIE() ? "\
    #UserCare-overlay {\
      filter: alpha(opacity=70);\
    }" : "") + ((UserCare.Util.isIE() && (UserCare.Util.isIE(function(v) {
        return v < 7
    }) || (UserCare.Util.isIE(function(v) {
        return v >= 7
    }) && UserCare.Util.isQuirksMode()))) ? "\
    #UserCare-overlay,\
    #UserCare-dialog {\
      position: absolute;\
    }\
    \
    .dialog-open,\
    .dialog-open body {\
      overflow: hidden;\
    }\
    \
    .dialog-open body {\
      height: 100%;\
    }\
    #UserCare-overlay {\
      width: 100%;\
    }\
    \
    #UserCare-dialog #UserCare-dialog-close {\
      background: none;\
      filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://usercare.info/pkg/icons/close.png');\
    }\
    .dialog-open select {\
      visibility: hidden;\
    }\
    .dialog-open #UserCare-dialog select {\
      visibility: visible;\
    }" : ""),
    element: function() {
        if (!document.getElementById(this.id)) {
            var dummy = document.createElement('div');
            dummy.innerHTML = '<div id="' + this.id + '" class="UserCare-component" style="display:none;"><div id="' + this.id + '-content"></div></div>';
            if (document.getElementById('UserCare-feedback')) {
                document.getElementById('UserCare-feedback').insertBefore(dummy.firstChild, document.getElementById('UserCare-feedback').firstChild.nextSibling);
            } else {
                document.body.insertBefore(dummy.firstChild, document.body.firstChild);
            }
        }
        return document.getElementById(this.id);
    },
    setContent: function(html) {
        this.element()
        if (typeof(Prototype) != 'undefined') {
            document.getElementById(this.id + "-content").innerHTML = html.stripScripts();
            setTimeout(function() {
                html.evalScripts()
            }, 100);
        } else {
            document.getElementById(this.id + "-content").innerHTML = html;
        }
    },
    htmlElement: function() {
        return document.getElementsByTagName('html')[0];
    }
};
UserCare.Dialog.Overlay = {
    show: function() {
        this.element().style.display = 'block';
    },
    hide: function() {
        this.element().style.display = 'none';
    },
    id: 'UserCare-overlay',
    element: function() {
        if (!document.getElementById(this.id)) {
            var dummy = document.createElement('div');
            dummy.innerHTML = '<div id="' + this.id + '" class="UserCare-component"  style="display:none;"></div>';
            document.body.insertBefore(dummy.firstChild, document.body.firstChild);
        }
        return document.getElementById(this.id);
    }
};
UserCare.Element = {
    getDimensions: function(element) {
        var display = element.display;
        if (display != 'none' && display != null) {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            };
        }
        var els = element.style;
        var originalVisibility = els.visibility;
        var originalPosition = els.position;
        var originalDisplay = els.display;
        els.visibility = 'hidden';
        els.position = 'absolute';
        els.display = 'block';
        var originalWidth = element.clientWidth;
        var originalHeight = element.clientHeight;
        els.display = originalDisplay;
        els.position = originalPosition;
        els.visibility = originalVisibility;
        return {
            width: originalWidth,
            height: originalHeight
        };
    },
    hasClassName: function(element, className) {
        var elementClassName = element.className;
        return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
    },
    addClassName: function(element, className) {
        if (!this.hasClassName(element, className)) {
            element.className += (element.className ? ' ' : '') + className;
        }
        return element;
    },
    removeClassName: function(element, className) {
        element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ');
        return element;
    }
}
UserCare.needsConfirm = false;
UserCare.onClose = function() {};
UserCare.Util.includeCss(UserCare.Util.render(UserCare.Dialog.css_template, {
    background_image_url: UserCare.Util.getAssetHost() + '/images/widgets/close.png'
}));
if (!UserCare) {
    var UserCare = {};
}
if (!UserCare.JSON) {
    UserCare.JSON = {};
}
(function() {
    function f(n) {
        return n < 10 ? '0' + n : n;
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' +
            f(this.getUTCMonth() + 1) + '-' +
            f(this.getUTCDate()) + 'T' +
            f(this.getUTCHours()) + ':' +
            f(this.getUTCMinutes()) + ':' +
            f(this.getUTCSeconds()) + 'Z' : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null';
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap +
                    partial.join(',\n' + gap) + '\n' +
                    mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }
    if (typeof UserCare.JSON.stringify !== 'function') {
        UserCare.JSON.stringify = function(value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {
                '': value
            });
        };
    }
    if (typeof UserCare.JSON.parse !== 'function') {
        UserCare.JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());
if (!UserCare) {
    var UserCare = {};
}
UserCare.Logger = {
    _log: function(message) {
        if (typeof console !== "undefined" && typeof console.log !== "undefined") {
            try {
                console.log(message);
            } catch (e) {}
        }
    },
    warning: function(message) {
        this._log("UserCare WARNING: " + message);
    },
    error: function(message) {
        this._log("UserCare ERROR: " + message);
        alert("UserCare ERROR: " + message);
    }
};
UserCare.Util = {
    sslAssetHost: "https://assets.uvcdn.com",
    assetHost: "http://assets.uvcdn.com",
    getAssetHost: function() {
        return ("https:" == document.location.protocol) ? this.sslAssetHost : this.assetHost;
    },
    render: function(template, params) {
        return template.replace(/\#\{([^{}]*)\}/g, function(a, b) {
            var r = params[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        });
    },
    toQueryString: function(params) {
        var pairs = [];
        for (key in params) {
            if (params[key] != null && params[key] != '' && typeof params[key] != 'function') {
                pairs.push([key, params[key]].join('='));
            }
        }
        return pairs.join('&');
    },
    isIE: function(test) {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            if (typeof test === "function") {
                return test(new Number(RegExp.$1));
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    isQuirksMode: function() {
        return document.compatMode && document.compatMode == "BackCompat";
    },
    includeCss: function(css) {
        var styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        styleElement.setAttribute('media', 'screen');
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css;
        } else {
            styleElement.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
};
UserCare.Popin = {
    content_template: '<iframe id="UserCare_dialog_iframe" src="#{url}/widgets/#{dialog}.html?#{query}"  allowtransparency="true"  style="border: 0px none; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: transparent; width: 100%; height: 100%;" ></iframe>',
    opened_url_template: '#{url}/widgets/#{dialog}.html?#{query}#opened',
    setup: function(options) {
        this.setupOptions(options);
    },
    setupOptions: function(options) {
        if (typeof(options) === 'undefined') {
            return;
        }
        if (options.key == null && options.host == null) {
            UserCare.Logger.error("'host' must be set.");
            UserCare.Logger.error("'key' must be set.");
        } else if (options.key == null) {
            UserCare.Logger.warning("'key' must be set for the widget to work with SSL.");
        }
        if (options.forum == null) {
            UserCare.Logger.error("'forum' must be set.");
        }
        if (!options.params) {
            options.params = {};
        }
        this.options = options;
    },
    preload: function(options) {
        this.setupOptions(options);
        UserCare.Dialog.preload(UserCare.Util.render(this.content_template, this.getContext()));
    },
    show: function(options) {
        this.setupOptions(options);
        UserCare.Dialog.show(UserCare.Util.render(this.content_template, this.getContext()));
        try {
            var iframeElement = document.getElementById("UserCare_dialog_iframe").contentWindow;
            iframeElement.location = UserCare.Util.render(this.opened_url_template, this.getContext());
        } catch (e) {
            UserCare.Logger.warning("Error sending the 'open' notification");
            UserCare.Logger.warning(e);
        }
    },
    getContext: function() {
        var context = {
            dialog: 'popin',
            width: '100%',
            height: '100%',
            lang: 'en'
        };
        for (attr in this.options) {
            context[attr] = this.options[attr];
        };
        context.url = this.url();
        context.params.lang = this.options.lang;
        if (context.params.custom_fields && (typeof context.params.custom_fields == "object")) {
            context.params.custom_fields = encodeURIComponent(UserCare.JSON.stringify(context.params.custom_fields));
        }
        context.query = UserCare.Util.toQueryString(context.params);
        return context;
    },
    getReferer: function() {
        var referer = window.location.href;
        if (referer.indexOf('?') != -1) {
            referer = referer.substring(0, referer.indexOf('?'));
        }
        if (referer.indexOf('#') != -1) {
            referer = referer.substring(0, referer.indexOf('#'));
        }
        return encodeURIComponent(referer);
    },
    url: function() {
        var url;
        if ("https:" == document.location.protocol && this.options.key != null) {
            url = 'https://' + this.options.key + '.UserCare.com/forum' ;
        } else {
            url = 'http://' + this.options.host + '/forum' ;
        }
        return url;
    }
};
UserCare.Tab = {
    id: "UserCare-feedback-tab",
    css_template: "\
    body a#UserCare-feedback-tab,\
    body a#UserCare-feedback-tab:link {\
      background-position: 2px 50% !important;\
      position: fixed !important;\
      top: 45% !important;\
      display: block !important;\
      width: 25px !important;\
      height: 138px !important;\
      margin: -45px 0 0 0 !important;\
      padding: 0 !important;\
      z-index: 100001 !important;\
      background-position: 2px 50% !important;\
      background-repeat: no-repeat !important;\
      text-indent: -9000px;\
    }\
    \
    body a#UserCare-feedback-tab:hover {\
      cursor: pointer;\
    }\
    \
    a##{id} { \
      #{alignment}: 0; \
      background-repeat: no-repeat; \
      background-color: #{background_color}; \
      background-image: url(#{text_url}); \
      border: outset 1px #{background_color}; \
      border-#{alignment}: none; \
    }\
    \
    a##{id}:hover { \
      background-color: #{hover_color}; \
      border: outset 1px #{hover_color}; \
      border-#{alignment}: none; \
    }" + ((UserCare.Util.isIE() && (UserCare.Util.isIE(function(v) {
        return v < 7;
    }) || (UserCare.Util.isIE(function(v) {
        return v >= 7;
    }) && UserCare.Util.isQuirksMode()))) ? "\
    body a#UserCare-feedback-tab,\
    body a#UserCare-feedback-tab:link {\
      position: absolute !important;\
      background-image: none !important;\
    }\
    a##{id} { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='#{text_url}'); }" : ""),
    show: function(options) {
        this.setupOptions(options || {});
        UserCare.Popin.setup(options);
        var html = '<a id="' + this.id + '"';
        if (!this.options.no_dialog) {
            html += '" onclick="UserCare.Popin.show(); return false;"';
            if (this.options.preload) {
                html += '" onmouseover="UserCare.Popin.preload();"';
            }
        }
        html += ' href="' + UserCare.Popin.url() + '?' + UserCare.Popin.getContext().query + '">' + (this.options.tab_string[this.options.lang] ? this.options.tab_string[this.options.lang] : 'Open Feedback Dialog') + '</a>';
        var tab = document.createElement('div');
        tab.setAttribute('id', 'UserCare-feedback');
        tab.innerHTML = html;
        document.body.insertBefore(tab, document.body.firstChild);
        if (!this.options.no_styles) {
            UserCare.Util.includeCss(UserCare.Util.render(this.css_template, this.options));
        }
    },
    onKeyDown: function(e) {
        if (!e) e = window.event;
        key = e.keycode ? e.keycode : e.which;
        if (key == 13) {
            UserCare.Popin.show();
            return false;
        }
    },
    setupOptions: function(options) {
        this.options = {
            alignment: 'left',
            background_color: '#f00',
            text_color: 'white',
            hover_color: '#06C',
            lang: 'en',
            no_styles: false,
            no_dialog: false,
            preload: true
        };
        for (attr in options) {
            this.options[attr] = options[attr];
        }
        this.options.tab_string = {
            cn: "??",
            de: "Feedback",
            es: "Sugerencias",
            fi: "Palaute",
            fr: "Commentaires",
            ja: "???????",
            nl: "Feedback",
            no_NB: "Feedback",
            pt_BR: "Coment?rio",
            tr: "Geribildirim"
        };
        this.options.text_url = UserCare.Util.getAssetHost() + '/images/widgets/' + (this.options.tab_string[this.options.lang] ? this.options.lang : 'en') + '/feedback_tab_' + this.options.text_color + '.png';
        this.options.id = this.id;
    }
};
if (typeof(userCareOpt) !== 'undefined' && userCareOpt.showTab == true) {
    UserCare.Tab.show(userCareOpt);
}

// Here "addEventListener" is for standards-compliant web browsers and "attachEvent" is for IE Browsers.
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];

// Now...
// if
//    "attachEvent", then we need to select "onmessage" as the event.
// if
//    "addEventListener", then we need to select "message" as the event

var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child IFrame window
eventer(messageEvent, function (e) {
    //alert(e.data);
    UserCare.Dialog.close();
    // Do whatever you want to do with the data got from IFrame in Parent form.
}, false);