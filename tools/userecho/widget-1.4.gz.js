if (!UE) {
    var UE = {}
}
if (!UE.Util) {
    UE.Util = {
        easyxdm_loaded: false,
        is_css_loaded: false,
        start_time: null,
        tab_add_attempts_count: 0,
        log: function(a) {
            return
        },
        render: function(a, b) {
            return a.replace(/\#{([^{}]*)}/g, function(d, c) {
                var e = b[c];
                return typeof e === "string" || typeof e === "number" ? e : d
            })
        },
        toQueryString: function(b) {
            var a = [];
            for (key in b) {
                if (b[key] != null && b[key] != "") {
                    a.push([key, b[key]].join("="))
                }
            }
            return a.join("&")
        },
        ue_get_height: function() {
            return "100"
        },
        init_css: function() {
            if (UE.Util.is_css_loaded) {
                return
            }
            var a = document.createElement("span");
            a.innerHTML = '<span style="display:none;">fix</span><style type="text/css">' + UE.Util.render(UE.Dialog.css_template, {}) + "</style>";
            try {
                document.body.insertBefore(a, document.body.firstChild);
                UE.Util.is_css_loaded = true
            } catch (b) {}
        },
        isMobile: function(a) {
            if (a === true && /(iPhone|iPod|iPad|BlackBerry|Android|Windows Phone)/.test(navigator.userAgent)) {
                return true
            } else {
                if (/(iPhone|iPod|BlackBerry|Android|Windows Phone)/.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        },
        getPageDims: function() {
            var c = document.documentElement;
            var a = window.innerWidth || self.innerWidth || (c && c.clientWidth) || document.body.clientWidth;
            var b = window.innerHeight || self.innerHeight || (c && c.clientHeight) || document.body.clientHeight;
            return {
                width: a,
                height: b
            }
        },
        getCDN: function() {
            var a = (("https:" == document.location.protocol) ? "https://" : "http://");
            return a + "cdn.userecho.com"
        },
        trim: function(a) {
            return a.replace(/^\s+|\s+$/gm, "")
        },
        getIEVersion: function() {
            var c = -1;
            if (navigator.appName == "Microsoft Internet Explorer") {
                var a = navigator.userAgent;
                var b = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                if (b.exec(a) != null) {
                    c = parseFloat(RegExp.$1)
                }
            }
            return c
        },
        loadScript: function(a, d) {
            var b = document.getElementsByTagName("head")[0];
            var c = document.createElement("script");
            c.type = "text/javascript";
            c.src = a;
            c.onreadystatechange = function() {
                if (this.readyState == "complete" || this.readyState == "loaded") {
                    d()
                }
            };
            c.onload = d;
            b.appendChild(c)
        },
        handleLoad: function() {
            var a = document.getElementById("ue-loading-indicator");
            a.style.display = "none";
            a = document.getElementById("ue-dlg-content");
            a.style.display = "block";
            document.getElementById("ue-iframe-mask").innerHTML = "";
            UE.Util.log("handleLoad")
        },
        handleChatLoad: function() {
            var a = document.getElementById("uec-loading-indicator").style.display = "none"
        },
        add: function(c, a, b) {
            if (c.addEventListener) {
                c.addEventListener(a, b, false)
            } else {
                if (c.attachEvent) {
                    c.attachEvent("on" + a, b)
                }
            }
        }
    }
}
UE.Chat = {
    id: "uec-dlg",
    loaded: false,
    socket: null,
    uechat_mode: 0,
    site_pages_count: 0,
    site_first_time: 0,
    last_chat_time: 0,
    active_invite_activated: false,
    online: null,
    easyXDM_chat_mode: null,
    easyXDM_trigger_id: null,
    css_template: "  #uec-dlg {  position: absolute;  position: fixed;  bottom: 0px;  right: 40px;  height: 300px;  z-index: 100001 !important;  }    #uec-dlg-content {  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.6);  border-radius: 5px 5px 0px 0px;  }  #uec-iframe-container {  height:300px;  }  #uec-iframe-container iframe {  height:300px;  }  * html #uec-dlg {        position: absolute !important;  }  #uec-iframe-drag {    position: absolute;    height: 50px;    width: 100%;  }  #uec-iframe-drag button.close {      background: none repeat scroll 0 0 transparent;      border: 0 none;      cursor: pointer;      padding: 0;      display: block;      font-size: 18px;      margin: 6px 10px 10px 10px;      color: #000000;      float: right;      font-size: 20px;      font-weight: bold;      line-height: 18px;      opacity: 0.2;      text-shadow: 0 1px 0 #FFFFFF;  }  #uec-iframe-drag button.close:hover {      opacity: 0.4;  }  #uec-loading-indicator {    background-color:white;    border-radius: 5px 5px 0 0;    text-align: center;    width:100%;    height:300px;    padding-top:140px;  }  #uec-iframe-drag .drag-line {    background-color: #FAFAFA;    border-radius: 1px 1px 1px 1px;    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);    display: block;    height: 2px;    width: 100px;    margin: 1px 0px 0px 100px;    cursor: move;    float: left;  }  ",
    content_template: '<div id="uec-iframe-drag"><div class="drag-line"></div><div class="drag-line"></div><button class="close" type="button" onclick="UE.Chat.setmode(2);">×</button></div><div id="uec-iframe-container"><div id="uec-loading-indicator"><img width="24" height="24" title="loading ..." src="' + UE.Util.getCDN() + '/images/spinner.gif"/></div></div>',
    setmode: function(b) {
        var a = document.getElementById("uec-dlg");
        a.style.right = (a.style.right == "") ? "50px" : a.style.right;
        if (b == 1 || b == 3 || b == 4) {
            a.style.display = "";
            UE.Chat.uechat_mode = b;
            this.socket.postMessage("resize")
        } else {
            if (b == 2) {
                a.style.display = "none";
                if (UE.Chat.uechat_mode == 1) {
                    UE.Chat.uechat_mode = 2
                } else {
                    if (UE.Chat.uechat_mode == 3 || UE.Chat.uechat_mode == 4) {
                        UE.Chat.uechat_mode = 0
                    }
                }
            }
        }
        if (b == 1 || b == 2 || b == 3) {
            UE.Chat.setCookie("last_time", (new Date()).getTime(), 60)
        }
    },
    initDrag: function() {
        document.getElementById("uec-iframe-drag").onmousedown = function(h) {
            var f = UE.Util.getPageDims();
            var g = f.width - 310;
            var i = f.height;
            var d = this.parentNode;
            var j = d.offsetHeight;
            var a = parseInt(d.parentNode.style.right);
            var c = h.pageX;
            var b = h.pageY;
            this.style.cursor = "move";
            document.onmouseup = function(k) {
                document.onmouseup = null;
                document.onmousemove = null;
                document.getElementById("uec-iframe-drag").style.cursor = "default"
            };
            document.onmousemove = function(l) {
                var m = (l.pageY - b);
                var k = j - m;
                k = k < 300 ? 300 : (i < k) ? i : k;
                d.style.height = k + "px";
                d.childNodes[1].childNodes[0].style.height = k + "px";
                d.childNodes[1].childNodes[1].style.height = k + "px";
                d.parentNode.style.height = k + "px";
                var n = (l.pageX - c);
                var e = a - n;
                e = e < 0 ? 0 : (g < e) ? g : e;
                d.parentNode.style.right = e + "px"
            }
        }
    },
    showActiveInvite: function(a) {
        if (!UE.Chat.active_invite_activated && UE.Chat.uechat_mode != 1 && UE.Chat.uechat_mode != 4) {
            UE.Chat.active_invite_activated = true;
            UE.Chat.show(3, a)
        }
    },
    is_online: function() {
        return UE.Chat.online
    },
    open: function() {
        UE.Chat.show(4)
    },
    show: function(b, a) {
        if (b === true) {
            b = 4
        } else {
            if (!b) {
                b = 0
            }
        }
        if (b == 4 && (UE.Chat.uechat_mode == 1 || UE.Chat.uechat_mode == 2)) {
            b = 1
        }
        if (UE.Chat.loaded == false || a) {
            if (UE.Util.easyxdm_loaded) {
                UE.Chat.loadChatWindow(b, a)
            } else {
                UE.Chat.easyXDM_chat_mode = b;
                UE.Chat.easyXDM_trigger_id = a;
                UE.Util.loadScript(UE.Util.getCDN() + "/js/easyXDM.min.js", UE.Chat.easyXDM_loaded)
            }
        } else {
            this.setmode(b)
        }
    },
    easyXDM_loaded: function() {
        UE.Util.easyxdm_loaded = true;
        UE.Chat.show(UE.Chat.easyXDM_chat_mode, UE.Chat.easyXDM_trigger_id)
    },
    loadChatWindow: function(e, c) {
        UE.Util.easyxdm_loaded = true;
        var d = UE.Util.render(UE.Chat.content_template, UE.Chat.options) + '<span style="display:none;">fix</span><style type="text/css">' + UE.Util.render(UE.Chat.css_template, {}) + "</style>";
        var a = document.getElementById(d);
        var b = (a == null) ? d : a.innerHTML;
        UE.Chat.setContent(b);
        UE.Chat.initDrag();
        remote_url = UE.Popin.options.url + "/chat/proxy/" + UE.Chat.options.forum + "/?" + UE.Popin.options.query;
        if (e == 1 || e == 2) {
            remote_url += "&autoconnect=true"
        }
        if (c) {
            remote_url += "&trigger_id=" + c
        }
        if (UE.Chat.socket) {
            return true
        }
        UE.Chat.socket = new easyXDM.Socket({
            remote: remote_url,
            lazy: false,
            container: "uec-iframe-container",
            onMessage: function(g, f) {
                if (g == "chat_connected") {
                    if (UE.Chat.uechat_mode == 3 || UE.Chat.uechat_mode == 4) {
                        UE.Chat.setmode(1)
                    }
                } else {
                    if (g == "chat_loaded") {
                        UE.Util.handleChatLoad()
                    } else {
                        if (g.substring(0, 9) == "setcookie") {
                            data = JSON.parse(g.substring(9));
                            UE.Chat.setCookie(data.name, data.value, 60)
                        } else {
                            if (g.substring(0, 18) == "PrepareChatConnect") {
                                data = JSON.parse(g.substring(18));
                                cookie_jid = UE.Chat.getCookie(data.ucn + "_JID");
                                cookie_sid = UE.Chat.getCookie(data.ucn + "_SID");
                                cookie_rid = UE.Chat.getCookie(data.ucn + "_RID");
                                cookie_nick = UE.Chat.getCookie(data.ucn + "_NICK");
                                cookie_email = UE.Chat.getCookie(data.ucn + "_EMAIL");
                                data = {
                                    jid: cookie_jid,
                                    sid: cookie_sid,
                                    rid: cookie_rid,
                                    nick: cookie_nick,
                                    email: cookie_email
                                };
                                UE.Chat.socket.postMessage("chatConnect " + UE.Chat.json2string(data))
                            } else {
                                if (g == "chat_session_closed") {
                                    UE.Chat.uechat_mode = 0;
                                    UE.Chat.setCookie("last_time", (new Date()).getTime(), 60)
                                } else {
                                    if (g == "chat_show") {
                                        if (UE.Chat.uechat_mode != 1 && UE.Chat.uechat_mode != 3) {
                                            UE.Chat.setmode(1)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        UE.Chat.loaded = true;
        UE.Chat.setmode(e)
    },
    setContent: function(a) {
        this.element();
        if (typeof(Prototype) != "undefined") {
            document.getElementById(this.id + "-content").innerHTML = a.stripScripts();
            setTimeout(function() {
                a.evalScripts()
            }, 100)
        } else {
            document.getElementById(this.id + "-content").innerHTML = a
        }
    },
    element: function() {
        if (!document.getElementById(this.id)) {
            var a = document.createElement("div");
            a.innerHTML = '<div id="' + this.id + '" class="uec-component" style="display:none;"><div id="' + this.id + '-content">xxx</div></div>';
            document.body.appendChild(a.firstChild)
        }
        return document.getElementById(this.id)
    },
    json2string: function(b) {
        result = "{";
        for (var a in b) {
            result += '"' + a + '":"' + (b[a] == null ? "" : ("" + b[a])).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n") + '",'
        }
        if (result[result.length - 1] == ",") {
            result = result.substring(0, result.length - 1)
        }
        result += "}";
        return result
    },
    setCookie: function(b, e, c) {
        if (c) {
            var a = new Date();
            a.setTime(a.getTime() + (c * 60 * 1000));
            var d = "; expires=" + a.toGMTString()
        } else {
            var d = ""
        }
        b = "uechat_" + UE.Chat.options.forum + "_" + b;
        document.cookie = b + "=" + e + d + "; path=/"
    },
    getCookie: function(a) {
        a = "uechat_" + UE.Chat.options.forum + "_" + a;
        return (document.cookie.match("(^|; )" + a + "=([^;]*)") || 0)[2]
    },
    createCORSRequest: function(b, a) {
        var c = new XMLHttpRequest();
        if ("withCredentials" in c) {
            c.open(b, a, true)
        } else {
            if (typeof XDomainRequest != "undefined") {
                c = new XDomainRequest();
                c.open(b, a)
            } else {
                c = null
            }
        }
        return c
    },
    init: function(b) {
        this.setupOptions(b);
        window.onunload = function() {
            UE.Chat.setCookie("mode", UE.Chat.uechat_mode, 1)
        };
        UE.Chat.uechat_mode = this.getCookie("mode");
        UE.Chat.site_pages_count = this.getCookie("pages_count");
        if (UE.Chat.site_pages_count == undefined) {
            UE.Chat.site_pages_count = 0
        }
        UE.Chat.setCookie("pages_count", parseInt(UE.Chat.site_pages_count) + 1, 60);
        UE.Chat.site_first_time = this.getCookie("first_time");
        if (UE.Chat.site_first_time == undefined) {
            UE.Chat.site_first_time = (new Date()).getTime();
            UE.Chat.setCookie("first_time", UE.Chat.site_first_time, 60)
        }
        UE.Chat.last_chat_time = this.getCookie("last_time");
        if (UE.Chat.last_chat_time == undefined) {
            UE.Chat.last_chat_time = 0
        }
        if (UE.Chat.uechat_mode == 1 || UE.Chat.uechat_mode == 2) {
            this.show(UE.Chat.uechat_mode)
        } else {
            UE.Chat.uechat_mode = 0
        }
        var c = (("https:" == document.location.protocol) ? "https://" : "http://");
        var a = c + "userecho.com/uechat/cfg/" + this.options.host + "/?rnd=" + Math.random();
        var d = this.createCORSRequest("GET", a);
        d.onload = function() {
            n = d.responseText;
            if (n == 0) {
                UE.Chat.online = false
            } else {
                if (parseInt(n) == n) {
                    UE.Element.removeClassName(document.getElementById("ueChatButton"), "ue-hidden");
                    UE.Chat.online = true
                } else {
                    UE.Element.removeClassName(document.getElementById("ueChatButton"), "ue-hidden");
                    UE.Chat.online = true;
                    var n = JSON.parse(n);
                    if (!n) {
                        return false
                    }
                    var x = window.location.pathname + window.location.search.toLowerCase();
                    try {
                        var g = b.lang.toLowerCase()
                    } catch (t) {
                        var g = "en"
                    }
                    var p = (new Date()).getTime();
                    for (var m = 0; m < n.triggers.length; m++) {
                        var r = n.triggers[m];
                        var k = 1;
                        var u = false;
                        for (var l = 0; l < r.conditions.length; l++) {
                            var o = r.conditions[l];
                            var w = o[0];
                            var h = o[1];
                            var y = o[2].toLowerCase();
                            var s = 0;
                            var f = (h.substring(0, 1) == "!");
                            if (f) {
                                h = h.substring(1)
                            }
                            switch (w) {
                                case "visitor_page_url":
                                    if (h == "icontains") {
                                        u = (x.indexOf(y) == -1)
                                    } else {
                                        if (h == "eq") {
                                            if (x != y) {
                                                u = true
                                            }
                                        } else {
                                            if (h == "iregex") {
                                                try {
                                                    u = !((new RegExp(y)).test(x))
                                                } catch (v) {
                                                    u = true
                                                }
                                            }
                                        }
                                    }
                                    break;
                                case "visitor_language":
                                    if (h == "icontains") {
                                        u = (g.indexOf(y) == -1)
                                    } else {
                                        if (h == "eq") {
                                            if (g != y) {
                                                u = true
                                            }
                                        } else {
                                            if (h == "iregex") {
                                                try {
                                                    u = !((new RegExp(y)).test(g))
                                                } catch (v) {
                                                    u = true
                                                }
                                            }
                                        }
                                    }
                                    break;
                                case "viewed_pages_count":
                                    y = parseInt(y);
                                    if ((h == "gt" && UE.Chat.site_pages_count < y) || (h == "lt" && UE.Chat.site_pages_count >= y) || (h == "eq" && UE.Chat.site_pages_count != y)) {
                                        u = true
                                    }
                                    break;
                                case "visitor_time_on_site":
                                    s = parseInt(y) - (p - UE.Chat.site_first_time) / 1000;
                                    break;
                                case "visitor_time_on_page":
                                    s = parseInt(y);
                                    break;
                                case "time_from_last_chat":
                                    s = parseInt(y) - (p - UE.Chat.last_chat_time) / 1000;
                                    break;
                                default:
                                    break
                            }
                            if (f) {
                                u = !u
                            }
                            if (u) {
                                break
                            }
                            if (s > k) {
                                k = s
                            }
                        }
                        if (!u) {
                            setTimeout("UE.Chat.showActiveInvite(" + r.id + ");", k * 1000)
                        } else {}
                    }
                }
            }
        };
        d.send()
    },
    makeHttpObject: function() {
        try {
            return new XMLHttpRequest()
        } catch (a) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (a) {}
        try {
            return new ActiveXObject("Microsoft.XMLHTTP")
        } catch (a) {}
        throw new Error("Could not create HTTP request object.")
    },
    setupOptions: function(a) {
        this.options = {
            lang: "en",
            params: {}
        };
        for (attr in a) {
            this.options[attr] = a[attr]
        }
        this.options.url = this.url();
        this.options.params.lang = this.options.lang
    },
    getHeight: function() {
        var a = UE.Util.getPageDims();
        return a.height
    },
    url: function() {
        url = ((("https:" == document.location.protocol) && !this.options.no_dialog) ? "https://" + this.options.host : "http://" + this.options.host)
    }
};
UE.Dialog = {
    preload: function(a) {
        if (!this.preloaded) {
            var b = function() {
                UE.Util.log("loadCommunityPopup start");
                UE.Util.easyxdm_loaded = true;
                var e = "#{url}/widget/forum/#{forum}-/?" + (UE.Popin.options.is_embedded ? "is_embedded=true&" : "") + "#{query}";
                if (UE.Popin.options.is_embedded) {
                    var d = UE.Popin.options.container_id;
                    var c = {
                        allowTransparency: "true",
                        style: {
                            border: 0,
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: "100%",
                            height: "100%",
                            "background-color": "transparent"
                        }
                    }
                } else {
                    var d = "ue-dlg-content";
                    var c = {
                        allowTransparency: "true",
                        style: {
                            border: 0,
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: "100%",
                            height: "100%",
                            "background-color": "transparent"
                        }
                    }
                }
                remote = UE.Util.render("#{url}/s/interframe.html?url=", UE.Popin.options) + encodeURIComponent(UE.Util.render(e, UE.Popin.options));
                UE.Util.log("UE: widget remote url: " + remote);
                if (!UE.Dialog.socket) {
                    UE.Dialog.setContent("");
                    UE.Dialog.socket = new easyXDM.Socket({
                        remote: remote,
                        props: c,
                        lazy: false,
                        container: d,
                        onReady: function() {
                            UE.Util.log("easyXDM.onReady")
                        },
                        onMessage: function(h, g) {
                            if (h == "popup_hide") {
                                UE.Dialog.close()
                            } else {
                                if (h == "widget_loaded") {
                                    UE.Util.handleLoad()
                                } else {
                                    if (h.substring(0, 10) == "reload_xdm") {
                                        var f = h.substring(11);
                                        UE.Util.log("UE: reload_xdm: " + f);
                                        UE.Popin.options.url = f;
                                        UE.Dialog.preloaded = false;
                                        UE.Dialog.socket = null;
                                        UE.Dialog.preload()
                                    } else {
                                        if (h.substring(0, 20) == "widget_change_height") {
                                            if (UE.Popin.options.is_embedded) {
                                                var i = parseInt(h.substring(21));
                                                document.getElementById(UE.Popin.options.container_id).getElementsByTagName("iframe")[0].style.height = i + "px"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })
                }
                UE.Dialog.preloaded = true;
                UE.Util.log("loadCommunityPopup end")
            };
            if (UE.Util.easyxdm_loaded) {
                b()
            } else {
                UE.Util.log("easyXDM script load start");
                UE.Util.loadScript(UE.Util.getCDN() + "/js/easyXDM.min.js", b);
                UE.Util.log("easyXDM script load end")
            }
        }
    },
    show: function(a) {
        UE.Util.log("show");
        UE.Util.init_css();
        if (!this.preloaded) {
            this.preload(a)
        }
        if (!UE.Popin.options.is_embedded) {
            this.Overlay.show();
            this.setPosition();
            UE.Element.addClassName(this.htmlElement(), "dlg-open");
            this.element().style.display = "block"
        } else {}
        this.preloaded = false
    },
    close: function() {
        this.element().style.display = "none";
        UE.Element.removeClassName(this.htmlElement(), "dlg-open");
        this.Overlay.hide()
    },
    id: "ue-dlg",
    socket: null,
    css_template: "    #ue-dlg {      z-index: 100003;      display: block;      text-align: left;      margin: -2em auto 0 auto;      position: absolute;       background-color: transparent;      border:0;      }        #ue-dlg-content {      border:0;      background:0;      display: none;    }    #ue-loading-indicator {      background-color:white;      border: 7px solid #BBB;      border: 7px solid rgba(150, 150, 150, 0.38);      -moz-border-radius: 15px;      -webkit-border-radius: 15px;      border-radius: 15px;      -webkit-box-shadow: 0 10px 50px rgba(0, 0, 0, .35);      -moz-box-shadow: 0 10px 50px rgba(0,0,0,.35);      box-shadow: 0 10px 50px rgba(0, 0, 0, .35);      padding: 10px;      margin-left: 330px;      margin-top: 250px;    }        #ue-overlay {      position: absolute;      z-index:100002;      width: 100%;      height: 100%;      left: 0;      top: 0;      background-color: #000;      filter: alpha(opacity=10);      -ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=10)';      opacity: .1;    }        #ue-dlg[id],    #ue-overlay[id] {     position:fixed;    }        #ue-overlay p {      padding: 5px;      color: #ddd;      font: bold 14px arial, sans-serif;      margin: 0;      letter-spacing: -1px;    }        * html.dlg-open body {      height: 100%;    }        * html.dlg-open,    * html.dlg-open body {      overflow: hidden;    }        html.dlg-open object,    html.dlg-open embed,    * html.dlg-open select {      visibility: hidden;    }        * html #ue-overlay {      width: 110%;    }        * html #ue-dlg #ue-dlg-close {      background: none;    }",
    element: function() {
        if (!document.getElementById(this.id)) {
            var a = document.createElement("div");
            a.innerHTML = '<div id="' + this.id + '" class="ue-component" style="display:none;"><div id="ue-loading-indicator"><img width="24" height="24" src="' + UE.Util.getCDN() + '/images/spinner.gif"/></div><div id="ue-iframe-mask"><style>#ue-dlg-content iframe{visibility:hidden}</style></div><div id="' + this.id + '-content">xxx</div></div>';
            document.body.appendChild(a.firstChild)
        }
        return document.getElementById(this.id)
    },
    setContent: function(a) {
        this.element();
        if (typeof(Prototype) != "undefined") {
            document.getElementById(this.id + "-content").innerHTML = a.stripScripts();
            setTimeout(function() {
                a.evalScripts()
            }, 100)
        } else {
            document.getElementById(this.id + "-content").innerHTML = a
        }
    },
    setPosition: function() {
        var c = UE.Element.getDims(this.element());
        c.width = 740;
        c.height = 1000;
        var b = UE.Util.getPageDims();
        var a = this.element().style;
        a.width = "auto";
        a.height = "auto";
        a.left = ((b.width - c.width) / 2) + "px";
        a.top = ((b.height - c.height) < 80 ? 40 : ((b.height - c.height) / 2)) + "px"
    },
    htmlElement: function() {
        return document.getElementsByTagName("html")[0]
    }
};
UE.Dialog.Overlay = {
    show: function() {
        this.element().style.display = "block"
    },
    hide: function() {
        this.element().style.display = "none"
    },
    id: "ue-overlay",
    element: function() {
        if (!document.getElementById(this.id)) {
            var a = document.createElement("div");
            a.innerHTML = '<div id="' + this.id + '" class="ue-component" onclick="UE.Dialog.close(); return false;" style="display:none;"></div>';
            document.body.appendChild(a.firstChild)
        }
        return document.getElementById(this.id)
    }
};
UE.Element = {
    getDims: function(c) {
        var g = c.display;
        if (g != "none" && g != null) {
            return {
                width: c.offsetWidth,
                height: c.offsetHeight
            }
        }
        var e = c.style;
        var a = e.visibility;
        var b = e.position;
        var d = e.display;
        e.visibility = "hidden";
        e.position = "absolute";
        e.display = "block";
        var h = c.clientWidth;
        var f = c.clientHeight;
        e.display = d;
        e.position = b;
        e.visibility = a;
        return {
            width: h,
            height: f
        }
    },
    hasClassName: function(b, a) {
        var c = b.className;
        return (c && c.length > 0 && (c == a || new RegExp("(^|\\s)" + a + "(\\s|$)").test(c)))
    },
    addClassName: function(b, a) {
        if (b && !this.hasClassName(b, a)) {
            b.className += (b.className ? " " : "") + a
        }
        return b
    },
    removeClassName: function(b, a) {
        if (b && this.hasClassName(b, a)) {
            b.className = b.className.replace(new RegExp("(^|\\s+)" + a + "(\\s+|$)"), " ")
        }
        return b
    }
};
UE.Popin = {
    setup: function(a) {
        this.setupOptions(a || {})
    },
    preload: function() {
        UE.Dialog.preload()
    },
    show: function() {
        UE.Dialog.show()
    },
    setupOptions: function(a) {
        if (a.mode == "simple") {
            this.options = {
                dialog: "popin",
                width: "420px",
                height: "600px",
                lang: "en",
                params: {}
            }
        } else {
            this.options = {
                dialog: "popin_extended",
                width: "100%",
                height: "100%",
                lang: "en",
                params: {}
            }
        }
        for (attr in a) {
            this.options[attr] = a[attr]
        }
        this.options.is_embedded = ("container_id" in this.options) ? true : false;
        this.options.url = this.url();
        this.options.params.lang = this.options.lang;
        if (this.options.category) {
            this.options.params.category = this.options.category
        }
        this.options.params.referer = this.getReferer();
        this.options.query = UE.Util.toQueryString(this.options.params)
    },
    getReferer: function() {
        var a = window.location.href;
        if (a.indexOf("?") != -1) {
            a = a.substring(0, a.indexOf("?"))
        }
        return a
    },
    getHeight: function() {
        var a = UE.Util.getPageDims();
        return a.height
    },
    urlOpen: function() {
        q = UE.Util.toQueryString(this.options.params);
        url = UE.Popin.url() + (this.options.forum ? "/" + (this.options.category ? "list" : "forum") + "/" + this.options.forum + "-/" : "") + (q ? ("?" + q) : "");
        window.open(url)
    },
    url: function() {
        if (this.options.host == "community.anturis.com") {
            this.options.host = "anturis.userecho.com";
            UE.Util.log("UE: Anturis widget - host replaced (in url) to " + this.options.host)
        }
        return ((("https:" == document.location.protocol) && (!this.options.no_dialog || UE.Popin.options.is_embedded)) ? "https://" + this.options.host : "http://" + this.options.host)
    }
};
UE.Widget = {
    id: "ue-feedback-tab",
    css_template: "    .ue-tab-container {z-index: 100001 !important;position: fixed;#{tab_alignment}: 0px;#{tab_margin}}        * html .ue-tab-container {        position: absolute !important;    }    .ue-button {      border: 1px solid #fff;       box-shadow: rgba(255, 255, 255, 0.247059) 1px 1px 1px inset, rgba(0, 0, 0, 0.498039) 0px 1px 3px;       font:bold 14px Arial, sans-serif;       line-height: 1em;       overflow: hidden;       cursor:pointer;      top: 0%;       z-index: 9999;       display: block;       background-position: center 0px;       background-repeat: no-repeat;      background-color: #{tab_bg_color};      float: #{tab_alignment};      -webkit-transition:0.3s ease-out background-color,0.1s ease-out padding-#{tab_alignment};      -moz-transition:0.3s ease-out background-color,0.1s ease-out padding-#{tab_alignment};    }         .ue-button:hover {        background-color: #{tab_hover_color};        padding-#{tab_alignment}:3px;    }        .ue-right {        border-right-width: 0px;        border-style: solid none solid solid;         border-radius: #{tab_corner_radius}px 0px 0px #{tab_corner_radius}px;     }    .ue-bottom {        float: left;        border-bottom-width: 0px;        border-style: solid solid solid solid;        border-radius: #{tab_corner_radius}px #{tab_corner_radius}px 0px 0px;    }    .ue-top {        float: left;        border-top-width: 0px;        border-style: solid solid solid solid;         border-radius: 0px 0px #{tab_corner_radius}px #{tab_corner_radius}px;     }    .ue-left.ue-button {        left: 0px;        border-left-width: 0px;         border-style: solid solid solid none;         border-radius: 0 #{tab_corner_radius}px #{tab_corner_radius}px 0;     }        .ue-left.ue-button #ueTabLabel {        padding:0px 0px 0px 0px !important;        border-radius: 0 #{tab_corner_radius}px #{tab_corner_radius}px 0;     }    .ue-right.ue-button #ueTabLabel {        padding:10px 0px 0px 0px !important;    }    .ue-button.ue-chat.ue-bottom, .ue-button.ue-chat.ue-top{        float:left;         margin-right:5px    }    .ue-button.ue-chat.ue-left, .ue-button.ue-chat.ue-right{        margin-bottom:5px    }        .ue-button.ue-hidden {        opacity: 0;         filter: alpha(opacity=0);         display: none;     }    ",
    init: function(d) {
        this.setupOptions(d || {});
        UE.Popin.setup(d);
        var c = '<div href="#" onclick="return false;" class="ue-tab-container" style="' + this.options.dim + '">';
        if (this.options.chat_tab_show) {
            var c = c + '<div id="ueChatButton" class="ue-button ue-#{tab_alignment} ue-chat';
            if (!(this.options.chat_tab_show === true)) {
                var c = c + " ue-hidden"
            }
            var c = c + '" onclick="UE.Chat.open();">        <img class="ueLabel" src="' + this.options.tab_chat_src + '" style="' + this.options.dim + 'vertical-align:top; border:0; background-color: transparent; padding:0; margin:0;">        </div>'
        }
        if (this.options.tab_show && !UE.Popin.options.is_embedded) {
            var c = c + '<div id="ueButton" class="ue-button ue-#{tab_alignment} ue-feedback" ' + (this.options.no_dialog ? 'onclick="UE.Popin.urlOpen(); return false;"' : 'onclick="UE.Popin.show(); return false;"') + (this.options.preload ? 'onmouseover="UE.Popin.preload();"' : "") + '>        <img class="ueLabel" src="' + this.options.tab_img_src + '" style="' + this.options.dim + 'vertical-align:top; border:0; background-color: transparent; padding:0; margin:0;">        </div>'
        }
        var c = c + "</div>";
        if (UE.Popin.options.is_embedded) {
            UE.Popin.show()
        }
        if (this.options.tab_show || this.options.chat_tab_show) {
            var h = document.createElement("span");
            var b = "";
            if (!this.options.no_styles) {
                b = '<span style="display:none;">fix</span><style type="text/css">' + UE.Util.render(this.css_template, this.options) + "</style>"
            }
            h.innerHTML = b + UE.Util.render(c, this.options);
            var g = false;
            while (g == false && UE.Util.tab_add_attempts_count < 10) {
                UE.Util.tab_add_attempts_count += 1;
                try {
                    document.body.insertBefore(h, document.body.firstChild);
                    g = true
                } catch (i) {
                    setTimeout(function() {
                        UE.Widget.init(_ues)
                    }, 1000);
                    return
                }
            }
            if (UE.Util.getIEVersion() == 6) {
                var f = document.getElementById("ue-feedback-tab");
                var a = f.firstChild;
                f.style.padding = "4px";
                a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a.src + "')";
                a.src = UE.Util.getCDN() + "/images/x.gif"
            }
        }
        UE.Chat.init(_ues);
        UE.Util.init_css()
    },
    setupOptions: function(b) {
        this.options = {
            lang: "en",
            category: 0,
            no_styles: false,
            no_dialog: false,
            preload: false,
            tab_show: true,
            chat_tab_show: "auto",
            tab_alignment: "left",
            tab_bg_color: "#f00",
            tab_text_color: "#FFFFFF",
            tab_text_shadow_color: "#00000055",
            tab_hover_color: "#06C",
            tab_top: "35%",
            tab_left_margin: "",
            tab_right_margin: "",
            tab_label: "",
            tab_image_hash: "ZmVlZGJhY2s%3D",
            tab_chat_hash: "Y2hhdA%3D%3D",
            tab_icon_show: true,
            tab_corner_radius: 5,
            tab_font_size: 17,
            tab_img_src: "",
            tab_chat_src: "",
            dim: "width:27px;",
            mode: "advanced",
            tab_margin: ""
        };
        for (attr in b) {
            this.options[attr] = b[attr]
        }
        if (this.options.forum == "15500") {
            UE.Util.log("UE: Anturis widget")
        }
        if (this.options.host == "community.anturis.com") {
            this.options.host = "anturis.userecho.com";
            UE.Util.log("UE: Anturis widget - host replaced to " + this.options.host)
        }
        if (!("chat_tab_show" in b) && ("tab_show" in b)) {
            this.options.chat_tab_show = this.options.tab_show ? "auto" : false
        }
        if (this.options.tab_show || this.options.chat_tab_show) {
            if (this.options.tab_alignment == "left" || this.options.tab_alignment == "right") {
                this.options.dim = "width:27px;max-width:27px;"
            } else {
                this.options.dim = "height:27px;max-height:27px;"
            }
            if (!this.options.tab_img_src) {
                if (this.options.tab_text_color == "white") {
                    this.options.tab_text_color = "#FFFFFF"
                } else {
                    if (this.options.tab_text_color == "#fff") {
                        this.options.tab_text_color = "#FFFFFF"
                    } else {
                        if (this.options.tab_text_color == "black" || this.options.tab_text_color == "#000") {
                            this.options.tab_text_color = "#000000"
                        }
                    }
                }
                if (this.options.tab_font_size < 10 || this.options.tab_font_size > 30) {
                    this.options.tab_font_size = 16
                }
                if (this.options.tab_image_hash == "") {
                    word_hash_arr = {
                        ru: "0J7RgdGC0LDQstC40YLRjCDQvtGC0LfRi9Cy",
                        de: "RmVlZGJhY2s%3D",
                        es: "Q29tZW50YXJpb3M%3D",
                        is: "VmnDsGJyw7Znw7A%3D"
                    };
                    this.options.tab_image_hash = word_hash_arr[this.options.lang] ? word_hash_arr[this.options.lang] : "RmVlZGJhY2s%3D"
                }
                if (this.options.tab_chat_hash == "") {
                    this.options.tab_chat_hash = "Y2hhdA%3D%3D"
                }
                var c = (this.options.tab_icon_show ? "1" : "0") + this.options.tab_font_size + (this.options.tab_text_color.substring(0, 1) == "#" ? this.options.tab_text_color.substring(1) : this.options.tab_text_color);
                var d = ("0") + this.options.tab_font_size + (this.options.tab_text_color.substring(0, 1) == "#" ? this.options.tab_text_color.substring(1) : this.options.tab_text_color);
                var a = "0";
                switch (this.options.tab_alignment) {
                    case "left":
                        a = "0";
                        this.options.tab_margin = "top:" + this.options.tab_top + ";";
                        break;
                    case "right":
                        a = "1";
                        this.options.tab_margin = "top:" + this.options.tab_top + ";";
                        break;
                    case "top":
                        a = "2";
                        this.options.tab_margin = "right:40px;";
                        if (this.options.tab_right_margin != "") {
                            this.options.tab_margin = "right:" + this.options.tab_right_margin + ";"
                        }
                        if (this.options.tab_left_margin != "") {
                            this.options.tab_margin = "left:" + this.options.tab_left_margin + ";"
                        }
                        break;
                    case "bottom":
                        a = "3";
                        this.options.tab_margin = "right:40px;";
                        if (this.options.tab_right_margin != "") {
                            this.options.tab_margin = "right:" + this.options.tab_right_margin + ";"
                        }
                        if (this.options.tab_left_margin != "") {
                            this.options.tab_margin = "left:" + this.options.tab_left_margin + ";"
                        }
                        break
                }
                this.options.tab_img_src = UE.Util.getCDN() + "/tabs/" + UE.Util.trim(c) + a + UE.Util.trim(this.options.tab_text_shadow_color.substring(1)) + "/" + this.options.tab_image_hash;
                this.options.tab_chat_src = UE.Util.getCDN() + "/tabs/" + UE.Util.trim(d) + a + UE.Util.trim(this.options.tab_text_shadow_color.substring(1)) + "/" + this.options.tab_chat_hash;
                if (this.options.tab_img_src.charAt(this.options.tab_img_src.length - 1) == "/") {
                    this.options.tab_img_src = this.options.tab_img_src + "===="
                }
                if (this.options.tab_chat_src.charAt(this.options.tab_chat_src.length - 1) == "/") {
                    this.options.tab_chat_src = this.options.tab_chat_src + "===="
                }
            }
        }
        this.options.id = this.id
    }
};
UE.Widget.init(_ues);
if (typeof JSON !== "object") {
    JSON = {}
}(function() {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());