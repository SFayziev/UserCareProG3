if (!jQuery) throw new Error("Bootstrap requires jQuery"); + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            }
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one(a.support.transition.end, function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b()
    })
}(window.jQuery), + function(a) {
    "use strict";
    var b = '[data-dismiss="alert"]',
        c = function(c) {
            a(c).on("click", b, this.close)
        };
    c.prototype.close = function(b) {
        function c() {
            f.trigger("closed.bs.alert").remove()
        }
        var d = a(this),
            e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
    };
    var d = a.fn.alert;
    a.fn.alert = function(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function() {
        return a.fn.alert = d, this
    }, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(window.jQuery), + function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d)
    };
    b.DEFAULTS = {
        loadingText: "loading..."
    }, b.prototype.setState = function(a) {
        var b = "disabled",
            c = this.$element,
            d = c.is("input") ? "val" : "html",
            e = c.data();
        a += "Text", e.resetText || c.data("resetText", c[d]()), c[d](e[a] || this.options[a]), setTimeout(function() {
            "loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
        }, 0)
    }, b.prototype.toggle = function() {
        var a = this.$element.closest('[data-toggle="buttons"]');
        if (a.length) {
            var b = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
            "radio" === b.prop("type") && a.find(".active").removeClass("active")
        }
        this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof c && c;
            e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.Constructor = b, a.fn.button.noConflict = function() {
        return a.fn.button = c, this
    }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
    })
}(window.jQuery), + function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, b.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, b.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, b.prototype.to = function(b) {
        var c = this,
            d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid", function() {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, b.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, b.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, b.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, b.prototype.slide = function(b, c) {
        var d = this.$element.find(".item.active"),
            e = c || d[b](),
            f = this.interval,
            g = "next" == b ? "left" : "right",
            h = "next" == b ? "first" : "last",
            i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]()
        }
        this.sliding = !0, f && this.pause();
        var j = a.Event("slide.bs.carousel", {
            relatedTarget: e[0],
            direction: g
        });
        if (!e.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                    var b = a(i.$indicators.children()[i.getActiveIndex()]);
                    b && b.addClass("active")
                })), a.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function() {
                    e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function() {
                        i.$element.trigger("slid")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else {
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return f && this.cycle(), this
        }
    };
    var c = a.fn.carousel;
    a.fn.carousel = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c),
                g = "string" == typeof c ? c : f.slide;
            e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = c, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(b) {
        var c, d = a(this),
            e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
            f = a.extend({}, e.data(), d.data()),
            g = d.attr("data-slide-to");
        g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
    }), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var b = a(this);
            b.carousel(b.data())
        })
    })
}(window.jQuery), + function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.DEFAULTS = {
        toggle: !0
    }, b.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, b.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b = a.Event("show.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.$parent && this.$parent.find("> .panel > .in");
                if (c && c.length) {
                    var d = c.data("bs.collapse");
                    if (d && d.transitioning) return;
                    c.collapse("hide"), d || c.data("bs.collapse", null)
                }
                var e = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
                var f = function() {
                    this.$element.removeClass("collapsing").addClass("in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition) return f.call(this);
                var g = a.camelCase(["scroll", e].join("-"));
                this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
            }
        }
    }, b.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? (this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350), void 0) : d.call(this)
            }
        }
    }, b.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var c = a.fn.collapse;
    a.fn.collapse = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.collapse"),
                f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
            e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = c, this
    }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(b) {
        var c, d = a(this),
            e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""),
            f = a(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : d.data(),
            i = d.attr("data-parent"),
            j = i && a(i);
        g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
    })
}(window.jQuery), + function(a) {
    "use strict";

    function b() {
        a(d).remove(), a(e).each(function(b) {
            var d = c(a(this));
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown")), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }
    var d = ".dropdown-backdrop",
        e = "[data-toggle=dropdown]",
        f = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    f.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                if ("ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b), f.trigger(d = a.Event("show.bs.dropdown")), d.isDefaultPrevented()) return;
                f.toggleClass("open").trigger("shown.bs.dropdown"), e.focus()
            }
            return !1
        }
    }, f.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var f = c(d),
                    g = f.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click();
                var h = a("[role=menu] li:not(.divider):visible a", f);
                if (h.length) {
                    var i = h.index(h.filter(":focus"));
                    38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).focus()
                }
            }
        }
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("dropdown");
            d || c.data("dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = g, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown)
}(window.jQuery), + function(a) {
    "use strict";
    var b = function(b, c) {
        this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
    };
    b.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, b.prototype.toggle = function(a) {
        return this[this.isShown ? "hide" : "show"](a)
    }, b.prototype.show = function(b) {
        var c = this,
            d = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function() {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function() {
                c.$element.focus().trigger(e)
            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
        }))
    }, b.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, b.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
        }, this))
    }, b.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, b.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
        })
    }, b.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, b.prototype.backdrop = function(b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", a.proxy(function(a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
    };
    var c = a.fn.modal;
    a.fn.modal = function(c, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
            f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d)
        })
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function() {
        return a.fn.modal = c, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(b) {
        var c = a(this),
            d = c.attr("href"),
            e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")),
            f = e.data("modal") ? "toggle" : a.extend({
                remote: !/#/.test(d) && d
            }, e.data(), c.data());
        b.preventDefault(), e.modal(f, this).one("hide", function() {
            c.is(":visible") && c.focus()
        })
    }), a(document).on("show.bs.modal", ".modal", function() {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        a(document.body).removeClass("modal-open")
    })
}(window.jQuery), + function(a) {
    "use strict";
    var b = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, b.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focus",
                    i = "hover" == g ? "mouseleave" : "blur";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, b.prototype.getDefaults = function() {
        return b.DEFAULTS
    }, b.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, b.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, b.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? (c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show), void 0) : c.show()
    }, b.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? (c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide), void 0) : c.hide()
    }, b.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(b), b.isDefaultPrevented()) return;
            var c = this.tip();
            this.setContent(), this.options.animation && c.addClass("fade");
            var d = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement,
                e = /\s?auto?\s?/i,
                f = e.test(d);
            f && (d = d.replace(e, "") || "top"), c.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
            var g = this.getPosition(),
                h = c[0].offsetWidth,
                i = c[0].offsetHeight;
            if (f) {
                var j = this.$element.parent(),
                    k = d,
                    l = document.documentElement.scrollTop || document.body.scrollTop,
                    m = "body" == this.options.container ? window.innerWidth : j.outerWidth(),
                    n = "body" == this.options.container ? window.innerHeight : j.outerHeight(),
                    o = "body" == this.options.container ? 0 : j.offset().left;
                d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, c.removeClass(k).addClass(d)
            }
            var p = this.getCalculatedOffset(d, g, h, i);
            this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type)
        }
    }, b.prototype.applyPlacement = function(a, b) {
        var c, d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset(a).addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        if ("top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test(b)) {
            var k = 0;
            a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow(k - e + i, i, "left")
        } else this.replaceArrow(j - f, j, "top");
        c && d.offset(a)
    }, b.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, b.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, b.prototype.hide = function() {
        function b() {
            "in" != c.hoverState && d.detach()
        }
        var c = this,
            d = this.tip(),
            e = a.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.$element.trigger("hidden.bs." + this.type), this)
    }, b.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, b.prototype.hasContent = function() {
        return this.getTitle()
    }, b.prototype.getPosition = function() {
        var b = this.$element[0];
        return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        }, this.$element.offset())
    }, b.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, b.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, b.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, b.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, b.prototype.enable = function() {
        this.enabled = !0
    }, b.prototype.disable = function() {
        this.enabled = !1
    }, b.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, b.prototype.toggle = function(b) {
        var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, b.prototype.destroy = function() {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof c && c;
            e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = c, this
    }
}(window.jQuery), + function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function() {
        return b.DEFAULTS
    }, b.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, b.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, b.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, b.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var c = a.fn.popover;
    a.fn.popover = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof c && c;
            e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function() {
        return a.fn.popover = c, this
    }
}(window.jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        var e, f = a.proxy(this.process, this);
        this.$element = a(c).is("body") ? a(window) : a(c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
    }
    b.DEFAULTS = {
        offset: 10
    }, b.prototype.refresh = function() {
        var b = this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]), this.targets = a([]);
        var c = this;
        this.$body.find(this.selector).map(function() {
            var d = a(this),
                e = d.data("target") || d.attr("href"),
                f = /^#\w/.test(e) && a(e);
            return f && f.length && [
                    [f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]
                ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            c.offsets.push(this[0]), c.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
            d = c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (b >= d) return g != (a = f.last()[0]) && this.activate(a);
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, a(this.selector).parents(".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate")
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = c, this
    }, a(window).on("load", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(window.jQuery), + function(a) {
    "use strict";
    var b = function(b) {
        this.element = a(b)
    };
    b.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.attr("data-target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0],
                f = a.Event("show.bs.tab", {
                    relatedTarget: e
                });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.parent("li"), c), this.activate(g, g.parent(), function() {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    })
                })
            }
        }
    }, b.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }
        var f = c.find("> .active"),
            g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var c = a.fn.tab;
    a.fn.tab = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]()
        })
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function() {
        return a.fn.tab = c, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(b) {
        b.preventDefault(), a(this).tab("show")
    })
}(window.jQuery), + function(a) {
    "use strict";
    var b = function(c, d) {
        this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = null, this.checkPosition()
    };
    b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {
        offset: 0
    }, b.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, b.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var c = a(document).height(),
                d = this.$window.scrollTop(),
                e = this.$element.offset(),
                f = this.options.offset,
                g = f.top,
                h = f.bottom;
            "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top()), "function" == typeof h && (h = f.bottom());
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
            this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? e.top - d : null, this.$element.removeClass(b.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({
                top: document.body.offsetHeight - h - this.$element.height()
            }))
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof c && c;
            e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function() {
        return a.fn.affix = c, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var b = a(this),
                c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
        })
    })
}(window.jQuery);
(function() {
    $(document).ready(function() {
        var body, click_event, content, nav, nav_toggler;
        nav_toggler = $("header .toggle-nav");
        nav = $("#main-nav");
        content = $("#content");
        body = $("body");
        click_event = (jQuery.support.touch ? "tap" : "click");
        $("#main-nav .dropdown-collapse").on(click_event, function(e) {
            var link, list;
            e.preventDefault();
            link = $(this);
            list = link.parent().find("> ul");
            if (list.is(":visible")) {
                if (body.hasClass("main-nav-closed") && link.parents("li").length === 1) {
                    false;
                } else {
                    link.removeClass("in");
                    list.slideUp(300, function() {
                        return $(this).removeClass("in");
                    });
                }
            } else {
                if (list.parents("ul.nav.nav-stacked").length === 1) {
                    $(document).trigger("nav-open");
                }
                link.addClass("in");
                list.slideDown(300, function() {
                    return $(this).addClass("in");
                });
            }
            return false;
        });
        if (jQuery.support.touch) {
            nav.on("swiperight", function(e) {
                return $(document).trigger("nav-open");
            });
            nav.on("swipeleft", function(e) {
                return $(document).trigger("nav-close");
            });
        }
        nav_toggler.on(click_event, function() {
            if (nav_open()) {
                $(document).trigger("nav-close");
            } else {
                $(document).trigger("nav-open");
            }
            return false;
        });
        $(document).bind("nav-close", function(event, params) {
            var nav_open;
            body.removeClass("main-nav-opened").addClass("main-nav-closed");
            return nav_open = false;
        });
        return $(document).bind("nav-open", function(event, params) {
            var nav_open;
            body.addClass("main-nav-opened").removeClass("main-nav-closed");
            return nav_open = true;
        });
    });
    this.nav_open = function() {
        return $("body").hasClass("main-nav-opened") || $("#main-nav").width() > 50;
    };
    $(document).ready(function() {
        var touch;
        setTimeAgo();
        setScrollable();
        setSelect2();
        setAutoSize();
        setCharCounter();
        setMaxLength();
        setValidateForm();
        $(".box .box-remove").live("click", function(e) {
            $(this).parents(".box").first().remove();
            e.preventDefault();
            return false;
        });
        $(".box .box-collapse").live("click", function(e) {
            var box;
            box = $(this).parents(".box").first();
            box.toggleClass("box-collapsed");
            e.preventDefault();
            return false;
        });
        if (jQuery().pwstrength) {
            $('.pwstrength').pwstrength({
                showVerdicts: false
            });
        }
        $(".check-all").live("click", function(e) {
            return $(this).parents("table:eq(0)").find(".only-checkbox :checkbox").attr("checked", this.checked);
        });
        if (jQuery().tabdrop) {
            $('.nav-responsive.nav-pills, .nav-responsive.nav-tabs').tabdrop();
        }
        setDataTable($(".data-table"));
        setDataTable($(".data-table-column-filter"));
        if (jQuery().wysihtml5) {
            $('.wysihtml5').wysihtml5();
        }
        if (jQuery().nestable) {
            $('.dd-nestable').nestable();
        }
        if (!$("body").hasClass("fixed-header")) {
            if (jQuery().affix) {
                $('#main-nav.main-nav-fixed').affix({
                    offset: 40
                });
            }
        }
        touch = false;
        if (window.Modernizr) {
            touch = Modernizr.touch;
        }
        if (!touch) {
            $("body").on("mouseenter", ".has-popover", function() {
                var el;
                el = $(this);
                if (el.data("popover") === undefined) {
                    el.popover({
                        placement: el.data("placement") || "top",
                        container: "body"
                    });
                }
                return el.popover("show");
            });
            $("body").on("mouseleave", ".has-popover", function() {
                return $(this).popover("hide");
            });
        }
        touch = false;
        if (window.Modernizr) {
            touch = Modernizr.touch;
        }
        if (!touch) {
            $("body").on("mouseenter", ".has-tooltip", function() {
                var el;
                el = $(this);
                if (el.data("tooltip") === undefined) {
                    el.tooltip({
                        placement: el.data("placement") || "top",
                        container: "body"
                    });
                }
                return el.tooltip("show");
            });
            $("body").on("mouseleave", ".has-tooltip", function() {
                return $(this).tooltip("hide");
            });
        }
        if (window.Modernizr && Modernizr.svg === false) {
            $("img[src*=\"svg\"]").attr("src", function() {
                return $(this).attr("src").replace(".svg", ".png");
            });
        }
        if (jQuery().colorpicker) {
            $(".colorpicker-hex").colorpicker({
                format: "hex"
            });
            $(".colorpicker-rgb").colorpicker({
                format: "rgb"
            });
        }
        if (jQuery().bootstrapFileInput) {
            $('input[type=file]').bootstrapFileInput();
        }
        if (window.Modernizr) {
            if (!Modernizr.input.placeholder) {
                $("[placeholder]").focus(function() {
                    var input;
                    input = $(this);
                    if (input.val() === input.attr("placeholder")) {
                        input.val("");
                        return input.removeClass("placeholder");
                    }
                }).blur(function() {
                    var input;
                    input = $(this);
                    if (input.val() === "" || input.val() === input.attr("placeholder")) {
                        input.addClass("placeholder");
                        return input.val(input.attr("placeholder"));
                    }
                }).blur();
                return $("[placeholder]").parents("form").submit(function() {
                    return $(this).find("[placeholder]").each(function() {
                        var input;
                        input = $(this);
                        if (input.val() === input.attr("placeholder")) {
                            return input.val("");
                        }
                    });
                });
            }
        }
    });
    this.setMaxLength = function(selector) {
        if (selector == null) {
            selector = $(".char-max-length");
        }
        if (jQuery().maxlength) {
            return selector.maxlength();
        }
    };
    this.setCharCounter = function(selector) {
        if (selector == null) {
            selector = $(".char-counter");
        }
        if (jQuery().charCount) {
            return selector.charCount({
                allowed: selector.data("char-allowed"),
                warning: selector.data("char-warning"),
                cssWarning: "text-warning",
                cssExceeded: "text-error"
            });
        }
    };
    this.setAutoSize = function(selector) {
        if (selector == null) {
            selector = $(".autosize");
        }
        if (jQuery().autosize) {
            return selector.autosize();
        }
    };
    this.setTimeAgo = function(selector) {
        if (selector == null) {
            selector = $(".timeago");
        }
        if (jQuery().timeago) {
            jQuery.timeago.settings.allowFuture = true;
            jQuery.timeago.settings.refreshMillis = 60000;
            selector.timeago();
            return selector.addClass("in");
        }
    };
    this.setScrollable = function(selector) {
        if (selector == null) {
            selector = $(".scrollable");
        }
        if (jQuery().slimScroll) {
            return selector.each(function(i, elem) {
                return $(elem).slimScroll({
                    height: $(elem).data("scrollable-height"),
                    start: $(elem).data("scrollable-start") || "top"
                });
            });
        }
    };
    this.setSelect2 = function(selector) {
        if (selector == null) {
            selector = $(".select2");
        }
        if (jQuery().select2) {
            return selector.each(function(i, elem) {
                return $(elem).select2();
            });
        }
    };
    this.setDataTable = function(selector) {
        if (jQuery().dataTable) {
            return selector.each(function(i, elem) {
                var dt, sdom;
                if ($(elem).data("pagination-top-bottom") === true) {
                    sdom = "<'row datatables-top'<'col-sm-6'l><'col-sm-6 text-right'pf>r>t<'row datatables-bottom'<'col-sm-6'i><'col-sm-6 text-right'p>>";
                } else if ($(elem).data("pagination-top") === true) {
                    sdom = "<'row datatables-top'<'col-sm-6'l><'col-sm-6 text-right'pf>r>t<'row datatables-bottom'<'col-sm-6'i><'col-sm-6 text-right'>>";
                } else {
                    sdom = "<'row datatables-top'<'col-sm-6'l><'col-sm-6 text-right'f>r>t<'row datatables-bottom'<'col-sm-6'i><'col-sm-6 text-right'p>>";
                }
                dt = $(elem).dataTable({
                    sDom: sdom,
                    sPaginationType: "bootstrap",
                    "iDisplayLength": $(elem).data("pagination-records") || 10,
                    oLanguage: {
                        sLengthMenu: "_MENU_ records per page"
                    }
                });
                if ($(elem).hasClass("data-table-column-filter")) {
                    dt.columnFilter();
                }
                dt.closest('.dataTables_wrapper').find('div[id$=_filter] input').css("width", "200px");
                return dt.closest('.dataTables_wrapper').find('input').addClass("form-control input-sm").attr('placeholder', 'Search');
            });
        }
    };
    this.setValidateForm = function(selector) {
        if (selector == null) {
            selector = $(".validate-form");
        }
        if (jQuery().validate) {
            return selector.each(function(i, elem) {
                return $(elem).validate({
                    errorElement: "span",
                    errorClass: "help-block has-error",
                    errorPlacement: function(e, t) {
                        return t.parents(".controls").first().append(e);
                    },
                    highlight: function(e) {
                        return $(e).closest('.form-group').removeClass("has-error has-success").addClass('has-error');
                    },
                    success: function(e) {
                        return e.closest(".form-group").removeClass("has-error");
                    }
                });
            });
        }
    };
}).call(this);
(function($, undefined) {
    var Wizard = function(element, options) {
        var kids;
        this.$element = $(element);
        this.options = $.extend({}, $.fn.wizard.defaults, options);
        this.currentStep = 1;
        this.numSteps = this.$element.find('li').length;
        this.$prevBtn = this.$element.find('button.btn-prev');
        this.$nextBtn = this.$element.find('button.btn-next');
        kids = this.$nextBtn.children().detach();
        this.nextText = $.trim(this.$nextBtn.text());
        this.$nextBtn.append(kids);
        this.$prevBtn.on('click', $.proxy(this.previous, this));
        this.$nextBtn.on('click', $.proxy(this.next, this));
        this.$element.on('click', 'li.complete', $.proxy(this.stepclicked, this));
    };
    Wizard.prototype = {
        constructor: Wizard,
        setState: function() {
            var canMovePrev = (this.currentStep > 1);
            var firstStep = (this.currentStep === 1);
            var lastStep = (this.currentStep === this.numSteps);
            this.$prevBtn.attr('disabled', (firstStep === true || canMovePrev === false));
            var data = this.$nextBtn.data();
            if (data && data.last) {
                this.lastText = data.last;
                if (typeof this.lastText !== 'undefined') {
                    var text = (lastStep !== true) ? this.nextText : this.lastText;
                    var kids = this.$nextBtn.children().detach();
                    this.$nextBtn.text(text).append(kids);
                }
            }
            var $steps = this.$element.find('li');
            $steps.removeClass('active').removeClass('complete');
            $steps.find('span.badge').removeClass('badge-info').removeClass('badge-success');
            var prevSelector = 'li:lt(' + (this.currentStep - 1) + ')';
            var $prevSteps = this.$element.find(prevSelector);
            $prevSteps.addClass('complete');
            $prevSteps.find('span.badge').addClass('badge-success');
            var currentSelector = 'li:eq(' + (this.currentStep - 1) + ')';
            var $currentStep = this.$element.find(currentSelector);
            $currentStep.addClass('active');
            $currentStep.find('span.badge').addClass('badge-info');
            var target = $currentStep.data().target;
            $('.step-pane').removeClass('active');
            $(target).addClass('active');
            this.$element.trigger('changed');
        },
        stepclicked: function(e) {
            var li = $(e.currentTarget);
            var index = $('.steps li').index(li);
            var evt = $.Event('stepclick');
            this.$element.trigger(evt, {
                step: index + 1
            });
            if (evt.isDefaultPrevented()) return;
            this.currentStep = (index + 1);
            this.setState();
        },
        previous: function() {
            var canMovePrev = (this.currentStep > 1);
            if (canMovePrev) {
                var e = $.Event('change');
                this.$element.trigger(e, {
                    step: this.currentStep,
                    direction: 'previous'
                });
                if (e.isDefaultPrevented()) return;
                this.currentStep -= 1;
                this.setState();
            }
        },
        next: function() {
            var canMoveNext = (this.currentStep + 1 <= this.numSteps);
            var lastStep = (this.currentStep === this.numSteps);
            if (canMoveNext) {
                var e = $.Event('change');
                this.$element.trigger(e, {
                    step: this.currentStep,
                    direction: 'next'
                });
                if (e.isDefaultPrevented()) return;
                this.currentStep += 1;
                this.setState();
            } else if (lastStep) {
                this.$element.trigger('finished');
            }
        },
        selectedItem: function(val) {
            return {
                step: this.currentStep
            };
        }
    };
    $.fn.wizard = function(option, value) {
        var methodReturn;
        var $set = this.each(function() {
            var $this = $(this);
            var data = $this.data('wizard');
            var options = typeof option === 'object' && option;
            if (!data) $this.data('wizard', (data = new Wizard(this, options)));
            if (typeof option === 'string') methodReturn = data[option](value);
        });
        return (methodReturn === undefined) ? $set : methodReturn;
    };
    $.fn.wizard.defaults = {};
    $.fn.wizard.Constructor = Wizard;
    $(function() {
        $('body').on('mousedown.wizard.data-api', '.wizard', function() {
            var $this = $(this);
            if ($this.data('wizard')) return;
            $this.wizard($this.data());
        });
    });
})(jQuery);
(function(e) {
    var t = function() {
        return !1 === e.support.boxModel && e.support.objectAll && e.support.leadingWhitespace
    }();
    e.jGrowl = function(t, i) {
        0 == e("#jGrowl").size() && e('<div id="jGrowl"></div>').addClass(i && i.position ? i.position : e.jGrowl.defaults.position).appendTo("body"), e("#jGrowl").jGrowl(t, i)
    }, e.fn.jGrowl = function(t, i) {
        if (e.isFunction(this.each)) {
            var o = arguments;
            return this.each(function() {
                void 0 == e(this).data("jGrowl.instance") && (e(this).data("jGrowl.instance", e.extend(new e.fn.jGrowl, {
                    notifications: [],
                    element: null,
                    interval: null
                })), e(this).data("jGrowl.instance").startup(this)), e.isFunction(e(this).data("jGrowl.instance")[t]) ? e(this).data("jGrowl.instance")[t].apply(e(this).data("jGrowl.instance"), e.makeArray(o).slice(1)) : e(this).data("jGrowl.instance").create(t, i)
            })
        }
    }, e.extend(e.fn.jGrowl.prototype, {
        defaults: {
            pool: 0,
            header: "",
            group: "",
            sticky: !1,
            position: "top-right",
            glue: "after",
            theme: "default",
            themeState: "highlight",
            corners: "10px",
            check: 250,
            life: 3e3,
            closeDuration: "normal",
            openDuration: "normal",
            easing: "swing",
            closer: !0,
            closeTemplate: "&times;",
            closerTemplate: "<div>[ close all ]</div>",
            log: function() {},
            beforeOpen: function() {},
            afterOpen: function() {},
            open: function() {},
            beforeClose: function() {},
            close: function() {},
            animateOpen: {
                opacity: "show"
            },
            animateClose: {
                opacity: "hide"
            }
        },
        notifications: [],
        element: null,
        interval: null,
        create: function(t, i) {
            var i = e.extend({}, this.defaults, i);
            i.speed !== void 0 && (i.openDuration = i.speed, i.closeDuration = i.speed), this.notifications.push({
                message: t,
                options: i
            }), i.log.apply(this.element, [this.element, t, i])
        },
        render: function(t) {
            var i = this,
                o = t.message,
                n = t.options;
            n.themeState = "" == n.themeState ? "" : "ui-state-" + n.themeState;
            var t = e("<div/>").addClass("jGrowl-notification " + n.themeState + " ui-corner-all" + (void 0 != n.group && "" != n.group ? " " + n.group : "")).append(e("<div/>").addClass("jGrowl-close").html(n.closeTemplate)).append(e("<div/>").addClass("jGrowl-header").html(n.header)).append(e("<div/>").addClass("jGrowl-message").html(o)).data("jGrowl", n).addClass(n.theme).children("div.jGrowl-close").bind("click.jGrowl", function() {
                e(this).parent().trigger("jGrowl.beforeClose")
            }).parent();
            e(t).bind("mouseover.jGrowl", function() {
                e("div.jGrowl-notification", i.element).data("jGrowl.pause", !0)
            }).bind("mouseout.jGrowl", function() {
                e("div.jGrowl-notification", i.element).data("jGrowl.pause", !1)
            }).bind("jGrowl.beforeOpen", function() {
                n.beforeOpen.apply(t, [t, o, n, i.element]) !== !1 && e(this).trigger("jGrowl.open")
            }).bind("jGrowl.open", function() {
                n.open.apply(t, [t, o, n, i.element]) !== !1 && ("after" == n.glue ? e("div.jGrowl-notification:last", i.element).after(t) : e("div.jGrowl-notification:first", i.element).before(t), e(this).animate(n.animateOpen, n.openDuration, n.easing, function() {
                    e.support.opacity === !1 && this.style.removeAttribute("filter"), null !== e(this).data("jGrowl") && (e(this).data("jGrowl").created = new Date), e(this).trigger("jGrowl.afterOpen")
                }))
            }).bind("jGrowl.afterOpen", function() {
                n.afterOpen.apply(t, [t, o, n, i.element])
            }).bind("jGrowl.beforeClose", function() {
                n.beforeClose.apply(t, [t, o, n, i.element]) !== !1 && e(this).trigger("jGrowl.close")
            }).bind("jGrowl.close", function() {
                e(this).data("jGrowl.pause", !0), e(this).animate(n.animateClose, n.closeDuration, n.easing, function() {
                    e.isFunction(n.close) ? n.close.apply(t, [t, o, n, i.element]) !== !1 && e(this).remove() : e(this).remove()
                })
            }).trigger("jGrowl.beforeOpen"), "" != n.corners && void 0 != e.fn.corner && e(t).corner(n.corners), e("div.jGrowl-notification:parent", i.element).size() > 1 && 0 == e("div.jGrowl-closer", i.element).size() && this.defaults.closer !== !1 && e(this.defaults.closerTemplate).addClass("jGrowl-closer " + this.defaults.themeState + " ui-corner-all").addClass(this.defaults.theme).appendTo(i.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function() {
                e(this).siblings().trigger("jGrowl.beforeClose"), e.isFunction(i.defaults.closer) && i.defaults.closer.apply(e(this).parent()[0], [e(this).parent()[0]])
            })
        },
        update: function() {
            e(this.element).find("div.jGrowl-notification:parent").each(function() {
                void 0 != e(this).data("jGrowl") && void 0 !== e(this).data("jGrowl").created && e(this).data("jGrowl").created.getTime() + parseInt(e(this).data("jGrowl").life) < (new Date).getTime() && e(this).data("jGrowl").sticky !== !0 && (void 0 == e(this).data("jGrowl.pause") || e(this).data("jGrowl.pause") !== !0) && e(this).trigger("jGrowl.beforeClose")
            }), this.notifications.length > 0 && (0 == this.defaults.pool || e(this.element).find("div.jGrowl-notification:parent").size() < this.defaults.pool) && this.render(this.notifications.shift()), 2 > e(this.element).find("div.jGrowl-notification:parent").size() && e(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
                e(this).remove()
            })
        },
        startup: function(i) {
            this.element = e(i).addClass("jGrowl").append('<div class="jGrowl-notification"></div>'), this.interval = setInterval(function() {
                e(i).data("jGrowl.instance").update()
            }, parseInt(this.defaults.check)), t && e(this.element).addClass("ie6")
        },
        shutdown: function() {
            e(this.element).removeClass("jGrowl").find("div.jGrowl-notification").trigger("jGrowl.close").parent().empty(), clearInterval(this.interval)
        },
        close: function() {
            e(this.element).find("div.jGrowl-notification").each(function() {
                e(this).trigger("jGrowl.beforeClose")
            })
        }
    }), e.jGrowl.defaults = e.fn.jGrowl.prototype.defaults
})(jQuery);
(function(t) {
    t.extend(t.fn, {
        validate: function(e) {
            if (!this.length) return e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
            var i = t.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.submit(function(e) {
                function s() {
                    var s;
                    return i.settings.submitHandler ? (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && s.remove(), !1) : !0
                }
                return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            if (t(this[0]).is("form")) return this.validate().form();
            var e = !0,
                i = t(this[0].form).validate();
            return this.each(function() {
                e = e && i.element(this)
            }), e
        },
        removeAttrs: function(e) {
            var i = {},
                s = this;
            return t.each(e.split(/\s/), function(t, e) {
                i[e] = s.attr(e), s.removeAttr(e)
            }), i
        },
        rules: function(e, i) {
            var s = this[0];
            if (e) {
                var r = t.data(s.form, "validator").settings,
                    n = r.rules,
                    a = t.validator.staticRules(s);
                switch (e) {
                    case "add":
                        t.extend(a, t.validator.normalizeRule(i)), delete a.messages, n[s.name] = a, i.messages && (r.messages[s.name] = t.extend(r.messages[s.name], i.messages));
                        break;
                    case "remove":
                        if (!i) return delete n[s.name], a;
                        var u = {};
                        return t.each(i.split(/\s/), function(t, e) {
                            u[e] = a[e], delete a[e]
                        }), u
                }
            }
            var o = t.validator.normalizeRules(t.extend({}, t.validator.classRules(s), t.validator.attributeRules(s), t.validator.dataRules(s), t.validator.staticRules(s)), s);
            if (o.required) {
                var l = o.required;
                delete o.required, o = t.extend({
                    required: l
                }, o)
            }
            return o
        }
    }), t.extend(t.expr[":"], {
        blank: function(e) {
            return !t.trim("" + t(e).val())
        },
        filled: function(e) {
            return !!t.trim("" + t(e).val())
        },
        unchecked: function(e) {
            return !t(e).prop("checked")
        }
    }), t.validator = function(e, i) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
    }, t.validator.format = function(e, i) {
        return 1 === arguments.length ? function() {
            var i = t.makeArray(arguments);
            return i.unshift(e), t.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function(t, i) {
            e = e.replace(RegExp("\\{" + t + "\\}", "g"), function() {
                return i
            })
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(t) {
                this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
            },
            onfocusout: function(t) {
                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            },
            onkeyup: function(t, e) {
                (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
            },
            onclick: function(t) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            },
            highlight: function(e, i, s) {
                "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s)
            },
            unhighlight: function(e, i, s) {
                "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s)
            }
        },
        setDefaults: function(e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: t.validator.format("Please enter no more than {0} characters."),
            minlength: t.validator.format("Please enter at least {0} characters."),
            rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            range: t.validator.format("Please enter a value between {0} and {1}."),
            max: t.validator.format("Please enter a value less than or equal to {0}."),
            min: t.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function e(e) {
                    var i = t.data(this[0].form, "validator"),
                        s = "on" + e.type.replace(/^validate/, "");
                    i.settings[s] && i.settings[s].call(i, this[0], e)
                }
                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i = this.groups = {};
                t.each(this.settings.groups, function(e, s) {
                    "string" == typeof s && (s = s.split(/\s/)), t.each(s, function(t, s) {
                        i[s] = e
                    })
                });
                var s = this.settings.rules;
                t.each(s, function(e, i) {
                    s[e] = t.validator.normalizeRule(i)
                }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                return this.valid()
            },
            element: function(e) {
                e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                var i = this.check(e) !== !1;
                return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
            },
            showErrors: function(e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var i in e) this.errorList.push({
                        message: e[i],
                        element: this.findByName(i)[0]
                    });
                    this.successList = t.grep(this.successList, function(t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(t) {
                var e = 0;
                for (var i in t) e++;
                return e
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {}
            },
            findLastActive: function() {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function(t) {
                        return t.element.name === e.name
                    }).length && e
            },
            elements: function() {
                var e = this,
                    i = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            },
            clean: function(e) {
                return t(e)[0]
            },
            errors: function() {
                var e = this.settings.errorClass.replace(" ", ".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(t) {
                this.reset(), this.toHide = this.errorsFor(t)
            },
            elementValue: function(e) {
                var i = t(e).attr("type"),
                    s = t(e).val();
                return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof s ? s.replace(/\r/g, "") : s
            },
            check: function(e) {
                e = this.validationTargetFor(this.clean(e));
                var i, s = t(e).rules(),
                    r = !1,
                    n = this.elementValue(e);
                for (var a in s) {
                    var u = {
                        method: a,
                        parameters: s[a]
                    };
                    try {
                        if (i = t.validator.methods[a].call(this, n, e, u.parameters), "dependency-mismatch" === i) {
                            r = !0;
                            continue
                        }
                        if (r = !1, "pending" === i) return this.toHide = this.toHide.not(this.errorsFor(e)), void 0;
                        if (!i) return this.formatAndAdd(e, u), !1
                    } catch (o) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + u.method + "' method.", o), o
                    }
                }
                return r ? void 0 : (this.objectLength(s) && this.successList.push(e), !0)
            },
            customDataMessage: function(e, i) {
                return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase())
            },
            customMessage: function(t, e) {
                var i = this.settings.messages[t];
                return i && (i.constructor === String ? i : i[e])
            },
            findDefined: function() {
                for (var t = 0; arguments.length > t; t++)
                    if (void 0 !== arguments[t]) return arguments[t];
                return void 0
            },
            defaultMessage: function(e, i) {
                return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
            },
            formatAndAdd: function(e, i) {
                var s = this.defaultMessage(e, i.method),
                    r = /\$?\{(\d+)\}/g;
                "function" == typeof s ? s = s.call(this, i.parameters, e) : r.test(s) && (s = t.validator.format(s.replace(r, "{$1}"), i.parameters)), this.errorList.push({
                    message: s,
                    element: e
                }), this.errorMap[e.name] = s, this.submitted[e.name] = s
            },
            addWrapper: function(t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            },
            defaultShowErrors: function() {
                var t, e;
                for (t = 0; this.errorList[t]; t++) {
                    var i = this.errorList[t];
                    this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                if (this.settings.unhighlight)
                    for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return t(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(e, i) {
                var s = this.errorsFor(e);
                s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(i)) : (s = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (s = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(s).length || (this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e))), !i && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s)
            },
            errorsFor: function(e) {
                var i = this.idOrName(e);
                return this.errors().filter(function() {
                    return t(this).attr("for") === i
                })
            },
            idOrName: function(t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
            },
            checkable: function(t) {
                return /radio|checkbox/i.test(t.type)
            },
            findByName: function(e) {
                return t(this.currentForm).find("[name='" + e + "']")
            },
            getLength: function(e, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return t("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return e.length
            },
            depend: function(t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            },
            dependTypes: {
                "boolean": function(t) {
                    return t
                },
                string: function(e, i) {
                    return !!t(e, i.form).length
                },
                "function": function(t, e) {
                    return t(e)
                }
            },
            optional: function(e) {
                var i = this.elementValue(e);
                return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
            },
            startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            },
            stopRequest: function(e, i) {
                this.pendingRequest--, 0 > this.pendingRequest && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, "remote")
                    })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(e, i) {
            e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
        },
        classRules: function(e) {
            var i = {},
                s = t(e).attr("class");
            return s && t.each(s.split(" "), function() {
                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
            }), i
        },
        attributeRules: function(e) {
            var i = {},
                s = t(e),
                r = s[0].getAttribute("type");
            for (var n in t.validator.methods) {
                var a;
                "required" === n ? (a = s.get(0).getAttribute(n), "" === a && (a = !0), a = !!a) : a = s.attr(n), /min|max/.test(n) && (null === r || /number|range|text/.test(r)) && (a = Number(a)), a ? i[n] = a : r === n && "range" !== r && (i[n] = !0)
            }
            return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
        },
        dataRules: function(e) {
            var i, s, r = {},
                n = t(e);
            for (i in t.validator.methods) s = n.data("rule-" + i.toLowerCase()), void 0 !== s && (r[i] = s);
            return r
        },
        staticRules: function(e) {
            var i = {},
                s = t.data(e.form, "validator");
            return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i
        },
        normalizeRules: function(e, i) {
            return t.each(e, function(s, r) {
                if (r === !1) return delete e[s], void 0;
                if (r.param || r.depends) {
                    var n = !0;
                    switch (typeof r.depends) {
                        case "string":
                            n = !!t(r.depends, i.form).length;
                            break;
                        case "function":
                            n = r.depends.call(i, i)
                    }
                    n ? e[s] = void 0 !== r.param ? r.param : !0 : delete e[s]
                }
            }), t.each(e, function(s, r) {
                e[s] = t.isFunction(r) ? r(i) : r
            }), t.each(["minlength", "maxlength"], function() {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function() {
                var i;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
            }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        },
        normalizeRule: function(e) {
            if ("string" == typeof e) {
                var i = {};
                t.each(e.split(/\s/), function() {
                    i[this] = !0
                }), e = i
            }
            return e
        },
        addMethod: function(e, i, s) {
            t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e], 3 > i.length && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function(e, i, s) {
                if (!this.depend(s, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var r = t(i).val();
                    return r && r.length > 0
                }
                return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
            },
            email: function(t, e) {
                return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
            },
            url: function(t, e) {
                return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
            },
            date: function(t, e) {
                return this.optional(e) || !/Invalid|NaN/.test("" + new Date(t))
            },
            dateISO: function(t, e) {
                return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
            },
            number: function(t, e) {
                return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            },
            digits: function(t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            },
            creditcard: function(t, e) {
                if (this.optional(e)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(t)) return !1;
                var i = 0,
                    s = 0,
                    r = !1;
                t = t.replace(/\D/g, "");
                for (var n = t.length - 1; n >= 0; n--) {
                    var a = t.charAt(n);
                    s = parseInt(a, 10), r && (s *= 2) > 9 && (s -= 9), i += s, r = !r
                }
                return 0 === i % 10
            },
            minlength: function(e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                return this.optional(i) || r >= s
            },
            maxlength: function(e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                return this.optional(i) || s >= r
            },
            rangelength: function(e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                return this.optional(i) || r >= s[0] && s[1] >= r
            },
            min: function(t, e, i) {
                return this.optional(e) || t >= i
            },
            max: function(t, e, i) {
                return this.optional(e) || i >= t
            },
            range: function(t, e, i) {
                return this.optional(e) || t >= i[0] && i[1] >= t
            },
            equalTo: function(e, i, s) {
                var r = t(s);
                return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    t(i).valid()
                }), e === r.val()
            },
            remote: function(e, i, s) {
                if (this.optional(i)) return "dependency-mismatch";
                var r = this.previousValue(i);
                if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), r.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = r.message, s = "string" == typeof s && {
                            url: s
                        } || s, r.old === e) return r.valid;
                r.old = e;
                var n = this;
                this.startRequest(i);
                var a = {};
                return a[i.name] = e, t.ajax(t.extend(!0, {
                    url: s,
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: a,
                    success: function(s) {
                        n.settings.messages[i.name].remote = r.originalMessage;
                        var a = s === !0 || "true" === s;
                        if (a) {
                            var u = n.formSubmitted;
                            n.prepareElement(i), n.formSubmitted = u, n.successList.push(i), delete n.invalid[i.name], n.showErrors()
                        } else {
                            var o = {},
                                l = s || n.defaultMessage(i, "remote");
                            o[i.name] = r.message = t.isFunction(l) ? l(e) : l, n.invalid[i.name] = !0, n.showErrors(o)
                        }
                        r.valid = a, n.stopRequest(i, a)
                    }
                }, s)), "pending"
            }
        }
    }), t.format = t.validator.format
})(jQuery),
    function(t) {
        var e = {};
        if (t.ajaxPrefilter) t.ajaxPrefilter(function(t, i, s) {
            var r = t.port;
            "abort" === t.mode && (e[r] && e[r].abort(), e[r] = s)
        });
        else {
            var i = t.ajax;
            t.ajax = function(s) {
                var r = ("mode" in s ? s : t.ajaxSettings).mode,
                    n = ("port" in s ? s : t.ajaxSettings).port;
                return "abort" === r ? (e[n] && e[n].abort(), e[n] = i.apply(this, arguments), e[n]) : i.apply(this, arguments)
            }
        }
    }(jQuery),
    function(t) {
        t.extend(t.fn, {
            validateDelegate: function(e, i, s) {
                return this.bind(i, function(i) {
                    var r = t(i.target);
                    return r.is(e) ? s.apply(r, arguments) : void 0
                })
            }
        })
    }(jQuery);
(function() {
    var b, d, c;
    b = jQuery;
    c = (function() {
        function b() {
            this.fadeDuration = 300;
            this.fitImagesInViewport = true;
            this.resizeDuration = 0;
            this.showImageNumberLabel = true;
            this.wrapAround = false
        }
        b.prototype.albumLabel = function(b, c) {
            return "Image " + b + " of " + c
        };
        return b
    })();
    d = (function() {
        function c(b) {
            this.options = b;
            this.album = [];
            this.currentImageIndex = void 0;
            this.init()
        }
        c.prototype.init = function() {
            this.enable();
            return this.build()
        };
        c.prototype.enable = function() {
            var c = this;
            return b('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(d) {
                c.start(b(d.currentTarget));
                return false
            })
        };
        c.prototype.build = function() {
            var c = this;
            b("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo(b('body'));
            this.$lightbox = b('#lightbox');
            this.$overlay = b('#lightboxOverlay');
            this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
            this.$container = this.$lightbox.find('.lb-container');
            this.containerTopPadding = parseInt(this.$container.css('padding-top'), 10);
            this.containerRightPadding = parseInt(this.$container.css('padding-right'), 10);
            this.containerBottomPadding = parseInt(this.$container.css('padding-bottom'), 10);
            this.containerLeftPadding = parseInt(this.$container.css('padding-left'), 10);
            this.$overlay.hide().on('click', function() {
                c.end();
                return false
            });
            this.$lightbox.hide().on('click', function(d) {
                if (b(d.target).attr('id') === 'lightbox') {
                    c.end()
                }
                return false
            });
            this.$outerContainer.on('click', function(d) {
                if (b(d.target).attr('id') === 'lightbox') {
                    c.end()
                }
                return false
            });
            this.$lightbox.find('.lb-prev').on('click', function() {
                if (c.currentImageIndex === 0) {
                    c.changeImage(c.album.length - 1)
                } else {
                    c.changeImage(c.currentImageIndex - 1)
                }
                return false
            });
            this.$lightbox.find('.lb-next').on('click', function() {
                if (c.currentImageIndex === c.album.length - 1) {
                    c.changeImage(0)
                } else {
                    c.changeImage(c.currentImageIndex + 1)
                }
                return false
            });
            return this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
                c.end();
                return false
            })
        };
        c.prototype.start = function(c) {
            var f, e, j, d, g, n, o, k, l, m, p, h, i;
            b(window).on("resize", this.sizeOverlay);
            b('select, object, embed').css({
                visibility: "hidden"
            });
            this.$overlay.width(b(document).width()).height(b(document).height()).fadeIn(this.options.fadeDuration);
            this.album = [];
            g = 0;
            j = c.attr('data-lightbox');
            if (j) {
                h = b(c.prop("tagName") + '[data-lightbox="' + j + '"]');
                for (d = k = 0, m = h.length; k < m; d = ++k) {
                    e = h[d];
                    this.album.push({
                        link: b(e).attr('href'),
                        title: b(e).attr('title')
                    });
                    if (b(e).attr('href') === c.attr('href')) {
                        g = d
                    }
                }
            } else {
                if (c.attr('rel') === 'lightbox') {
                    this.album.push({
                        link: c.attr('href'),
                        title: c.attr('title')
                    })
                } else {
                    i = b(c.prop("tagName") + '[rel="' + c.attr('rel') + '"]');
                    for (d = l = 0, p = i.length; l < p; d = ++l) {
                        e = i[d];
                        this.album.push({
                            link: b(e).attr('href'),
                            title: b(e).attr('title')
                        });
                        if (b(e).attr('href') === c.attr('href')) {
                            g = d
                        }
                    }
                }
            }
            f = b(window);
            o = f.scrollTop() + f.height() / 10;
            n = f.scrollLeft();
            this.$lightbox.css({
                top: o + 'px',
                left: n + 'px'
            }).fadeIn(this.options.fadeDuration);
            this.changeImage(g)
        };
        c.prototype.changeImage = function(f) {
            var d, c, e = this;
            this.disableKeyboardNav();
            d = this.$lightbox.find('.lb-image');
            this.sizeOverlay();
            this.$overlay.fadeIn(this.options.fadeDuration);
            b('.lb-loader').fadeIn('slow');
            this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();
            this.$outerContainer.addClass('animating');
            c = new Image();
            c.onload = function() {
                var m, g, h, i, j, k, l;
                d.attr('src', e.album[f].link);
                m = b(c);
                d.width(c.width);
                d.height(c.height);
                if (e.options.fitImagesInViewport) {
                    l = b(window).width();
                    k = b(window).height();
                    j = l - e.containerLeftPadding - e.containerRightPadding - 20;
                    i = k - e.containerTopPadding - e.containerBottomPadding - 110;
                    if ((c.width > j) || (c.height > i)) {
                        if ((c.width / j) > (c.height / i)) {
                            h = j;
                            g = parseInt(c.height / (c.width / h), 10);
                            d.width(h);
                            d.height(g)
                        } else {
                            g = i;
                            h = parseInt(c.width / (c.height / g), 10);
                            d.width(h);
                            d.height(g)
                        }
                    }
                }
                return e.sizeContainer(d.width(), d.height())
            };
            c.src = this.album[f].link;
            this.currentImageIndex = f
        };
        c.prototype.sizeOverlay = function() {
            return b('#lightboxOverlay').width(b(document).width()).height(b(document).height())
        };
        c.prototype.sizeContainer = function(f, g) {
            var b, d, e, h, c = this;
            h = this.$outerContainer.outerWidth();
            e = this.$outerContainer.outerHeight();
            d = f + this.containerLeftPadding + this.containerRightPadding;
            b = g + this.containerTopPadding + this.containerBottomPadding;
            this.$outerContainer.animate({
                width: d,
                height: b
            }, this.options.resizeDuration, 'swing');
            setTimeout(function() {
                c.$lightbox.find('.lb-dataContainer').width(d);
                c.$lightbox.find('.lb-prevLink').height(b);
                c.$lightbox.find('.lb-nextLink').height(b);
                c.showImage()
            }, this.options.resizeDuration)
        };
        c.prototype.showImage = function() {
            this.$lightbox.find('.lb-loader').hide();
            this.$lightbox.find('.lb-image').fadeIn('slow');
            this.updateNav();
            this.updateDetails();
            this.preloadNeighboringImages();
            this.enableKeyboardNav()
        };
        c.prototype.updateNav = function() {
            this.$lightbox.find('.lb-nav').show();
            if (this.album.length > 1) {
                if (this.options.wrapAround) {
                    this.$lightbox.find('.lb-prev, .lb-next').show()
                } else {
                    if (this.currentImageIndex > 0) {
                        this.$lightbox.find('.lb-prev').show()
                    }
                    if (this.currentImageIndex < this.album.length - 1) {
                        this.$lightbox.find('.lb-next').show()
                    }
                }
            }
        };
        c.prototype.updateDetails = function() {
            var b = this;
            if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {
                this.$lightbox.find('.lb-caption').html(this.album[this.currentImageIndex].title).fadeIn('fast')
            }
            if (this.album.length > 1 && this.options.showImageNumberLabel) {
                this.$lightbox.find('.lb-number').text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn('fast')
            } else {
                this.$lightbox.find('.lb-number').hide()
            }
            this.$outerContainer.removeClass('animating');
            this.$lightbox.find('.lb-dataContainer').fadeIn(this.resizeDuration, function() {
                return b.sizeOverlay()
            })
        };
        c.prototype.preloadNeighboringImages = function() {
            var c, b;
            if (this.album.length > this.currentImageIndex + 1) {
                c = new Image();
                c.src = this.album[this.currentImageIndex + 1].link
            }
            if (this.currentImageIndex > 0) {
                b = new Image();
                b.src = this.album[this.currentImageIndex - 1].link
            }
        };
        c.prototype.enableKeyboardNav = function() {
            b(document).on('keyup.keyboard', b.proxy(this.keyboardAction, this))
        };
        c.prototype.disableKeyboardNav = function() {
            b(document).off('.keyboard')
        };
        c.prototype.keyboardAction = function(g) {
            var d, e, f, c, b;
            d = 27;
            e = 37;
            f = 39;
            b = g.keyCode;
            c = String.fromCharCode(b).toLowerCase();
            if (b === d || c.match(/x|o|c/)) {
                this.end()
            } else if (c === 'p' || b === e) {
                if (this.currentImageIndex !== 0) {
                    this.changeImage(this.currentImageIndex - 1)
                }
            } else if (c === 'n' || b === f) {
                if (this.currentImageIndex !== this.album.length - 1) {
                    this.changeImage(this.currentImageIndex + 1)
                }
            }
        };
        c.prototype.end = function() {
            this.disableKeyboardNav();
            b(window).off("resize", this.sizeOverlay);
            this.$lightbox.fadeOut(this.options.fadeDuration);
            this.$overlay.fadeOut(this.options.fadeDuration);
            return b('select, object, embed').css({
                visibility: "visible"
            })
        };
        return c
    })();
    b(function() {
        var e, b;
        b = new c();
        return e = new d(b)
    })
}).call(this);
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a, b) {
    function c() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function d() {
        var a = new Date;
        return c(a.getFullYear(), a.getMonth(), a.getDate())
    }

    function e(a, b) {
        return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate()
    }

    function f(a) {
        return function() {
            return this[a].apply(this, arguments)
        }
    }

    function g(a) {
        return a && !isNaN(a.getTime())
    }

    function h(b, c) {
        function d(a, b) {
            return b.toLowerCase()
        }
        var e, f = a(b).data(),
            g = {},
            h = new RegExp("^" + c.toLowerCase() + "([A-Z])");
        c = new RegExp("^" + c.toLowerCase());
        for (var i in f) c.test(i) && (e = i.replace(h, d), g[e] = f[i]);
        return g
    }

    function i(b) {
        var c = {};
        if (q[b] || (b = b.split("-")[0], q[b])) {
            var d = q[b];
            return a.each(p, function(a, b) {
                b in d && (c[b] = d[b])
            }), c
        }
    }
    var j = function() {
            var b = {
                get: function(a) {
                    return this.slice(a)[0]
                },
                contains: function(a) {
                    for (var b = a && a.valueOf(), c = 0, d = this.length; d > c; c++)
                        if (this[c].valueOf() === b) return c;
                    return -1
                },
                remove: function(a) {
                    this.splice(a, 1)
                },
                replace: function(b) {
                    b && (a.isArray(b) || (b = [b]), this.clear(), this.push.apply(this, b))
                },
                clear: function() {
                    this.length = 0
                },
                copy: function() {
                    var a = new j;
                    return a.replace(this), a
                }
            };
            return function() {
                var c = [];
                return c.push.apply(c, arguments), a.extend(c, b), c
            }
        }(),
        k = function(b, c) {
            this._process_options(c), this.dates = new j, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = a(b), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = a(r.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot .today, tfoot .clear").attr("colspan", function(a, b) {
                return parseInt(b) + 1
            }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted), this.setDatesDisabled(this.o.datesDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
        };
    k.prototype = {
        constructor: k,
        _process_options: function(e) {
            this._o = a.extend({}, this._o, e);
            var f = this.o = a.extend({}, this._o),
                g = f.language;
            switch (q[g] || (g = g.split("-")[0], q[g] || (g = o.language)), f.language = g, f.startView) {
                case 2:
                case "decade":
                    f.startView = 2;
                    break;
                case 1:
                case "year":
                    f.startView = 1;
                    break;
                default:
                    f.startView = 0
            }
            switch (f.minViewMode) {
                case 1:
                case "months":
                    f.minViewMode = 1;
                    break;
                case 2:
                case "years":
                    f.minViewMode = 2;
                    break;
                default:
                    f.minViewMode = 0
            }
            switch (f.maxViewMode) {
                case 0:
                case "days":
                    f.maxViewMode = 0;
                    break;
                case 1:
                case "months":
                    f.maxViewMode = 1;
                    break;
                default:
                    f.maxViewMode = 2
            }
            f.startView = Math.min(f.startView, f.maxViewMode), f.startView = Math.max(f.startView, f.minViewMode), f.multidate !== !0 && (f.multidate = Number(f.multidate) || !1, f.multidate !== !1 && (f.multidate = Math.max(0, f.multidate))), f.multidateSeparator = String(f.multidateSeparator), f.weekStart %= 7, f.weekEnd = (f.weekStart + 6) % 7;
            var h = r.parseFormat(f.format);
            if (f.startDate !== -(1 / 0) && (f.startDate ? f.startDate instanceof Date ? f.startDate = this._local_to_utc(this._zero_time(f.startDate)) : f.startDate = r.parseDate(f.startDate, h, f.language) : f.startDate = -(1 / 0)), f.endDate !== 1 / 0 && (f.endDate ? f.endDate instanceof Date ? f.endDate = this._local_to_utc(this._zero_time(f.endDate)) : f.endDate = r.parseDate(f.endDate, h, f.language) : f.endDate = 1 / 0), f.daysOfWeekDisabled = f.daysOfWeekDisabled || [], a.isArray(f.daysOfWeekDisabled) || (f.daysOfWeekDisabled = f.daysOfWeekDisabled.split(/[,\s]*/)), f.daysOfWeekDisabled = a.map(f.daysOfWeekDisabled, function(a) {
                    return parseInt(a, 10)
                }), f.daysOfWeekHighlighted = f.daysOfWeekHighlighted || [], a.isArray(f.daysOfWeekHighlighted) || (f.daysOfWeekHighlighted = f.daysOfWeekHighlighted.split(/[,\s]*/)), f.daysOfWeekHighlighted = a.map(f.daysOfWeekHighlighted, function(a) {
                    return parseInt(a, 10)
                }), f.datesDisabled = f.datesDisabled || [], !a.isArray(f.datesDisabled)) {
                var i = [];
                i.push(r.parseDate(f.datesDisabled, h, f.language)), f.datesDisabled = i
            }
            f.datesDisabled = a.map(f.datesDisabled, function(a) {
                return r.parseDate(a, h, f.language)
            });
            var j = String(f.orientation).toLowerCase().split(/\s+/g),
                k = f.orientation.toLowerCase();
            if (j = a.grep(j, function(a) {
                    return /^auto|left|right|top|bottom$/.test(a)
                }), f.orientation = {
                    x: "auto",
                    y: "auto"
                }, k && "auto" !== k)
                if (1 === j.length) switch (j[0]) {
                    case "top":
                    case "bottom":
                        f.orientation.y = j[0];
                        break;
                    case "left":
                    case "right":
                        f.orientation.x = j[0]
                } else k = a.grep(j, function(a) {
                    return /^left|right$/.test(a)
                }), f.orientation.x = k[0] || "auto", k = a.grep(j, function(a) {
                    return /^top|bottom$/.test(a)
                }), f.orientation.y = k[0] || "auto";
            else;
            if (f.defaultViewDate) {
                var l = f.defaultViewDate.year || (new Date).getFullYear(),
                    m = f.defaultViewDate.month || 0,
                    n = f.defaultViewDate.day || 1;
                f.defaultViewDate = c(l, m, n)
            } else f.defaultViewDate = d();
            f.showOnFocus = f.showOnFocus !== b ? f.showOnFocus : !0, f.zIndexOffset = f.zIndexOffset !== b ? f.zIndexOffset : 10
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(a) {
            for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (d = b, e = a[f][1]) : 3 === a[f].length && (d = a[f][1], e = a[f][2]), c.on(e, d)
        },
        _unapplyEvents: function(a) {
            for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (e = b, d = a[f][1]) : 3 === a[f].length && (e = a[f][1], d = a[f][2]), c.off(d, e)
        },
        _buildEvents: function() {
            var b = {
                keyup: a.proxy(function(b) {
                    -1 === a.inArray(b.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                }, this),
                keydown: a.proxy(this.keydown, this),
                paste: a.proxy(this.paste, this)
            };
            this.o.showOnFocus === !0 && (b.focus = a.proxy(this.show, this)), this.isInput ? this._events = [
                [this.element, b]
            ] : this.component && this.hasInput ? this._events = [
                [this.element.find("input"), b],
                [this.component, {
                    click: a.proxy(this.show, this)
                }]
            ] : this.element.is("div") ? this.isInline = !0 : this._events = [
                [this.element, {
                    click: a.proxy(this.show, this)
                }]
            ], this._events.push([this.element, "*", {
                blur: a.proxy(function(a) {
                    this._focused_from = a.target
                }, this)
            }], [this.element, {
                blur: a.proxy(function(a) {
                    this._focused_from = a.target
                }, this)
            }]), this.o.immediateUpdates && this._events.push([this.element, {
                "changeYear changeMonth": a.proxy(function(a) {
                    this.update(a.date)
                }, this)
            }]), this._secondaryEvents = [
                [this.picker, {
                    click: a.proxy(this.click, this)
                }],
                [a(window), {
                    resize: a.proxy(this.place, this)
                }],
                [a(document), {
                    mousedown: a.proxy(function(a) {
                        this.element.is(a.target) || this.element.find(a.target).length || this.picker.is(a.target) || this.picker.find(a.target).length || this.picker.hasClass("datepicker-inline") || this.hide()
                    }, this)
                }]
            ]
        },
        _attachEvents: function() {
            this._detachEvents(), this._applyEvents(this._events)
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function(b, c) {
            var d = c || this.dates.get(-1),
                e = this._utc_to_local(d);
            this.element.trigger({
                type: b,
                date: e,
                dates: a.map(this.dates, this._utc_to_local),
                format: a.proxy(function(a, b) {
                    0 === arguments.length ? (a = this.dates.length - 1, b = this.o.format) : "string" == typeof a && (b = a, a = this.dates.length - 1), b = b || this.o.format;
                    var c = this.dates.get(a);
                    return r.formatDate(c, b, this.o.language)
                }, this)
            })
        },
        show: function() {
            return this.element.attr("readonly") && this.o.enableOnReadonly === !1 ? void 0 : (this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && a(this.element).blur(), this)
        },
        hide: function() {
            return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"), this) : this
        },
        remove: function() {
            return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
        },
        paste: function(b) {
            var c;
            if (b.originalEvent.clipboardData && b.originalEvent.clipboardData.types && -1 !== a.inArray("text/plain", b.originalEvent.clipboardData.types)) c = b.originalEvent.clipboardData.getData("text/plain");
            else {
                if (!window.clipboardData) return;
                c = window.clipboardData.getData("Text")
            }
            this.setDate(c), this.update(), b.preventDefault()
        },
        _utc_to_local: function(a) {
            return a && new Date(a.getTime() + 6e4 * a.getTimezoneOffset())
        },
        _local_to_utc: function(a) {
            return a && new Date(a.getTime() - 6e4 * a.getTimezoneOffset())
        },
        _zero_time: function(a) {
            return a && new Date(a.getFullYear(), a.getMonth(), a.getDate())
        },
        _zero_utc_time: function(a) {
            return a && new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()))
        },
        getDates: function() {
            return a.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function() {
            return a.map(this.dates, function(a) {
                return new Date(a)
            })
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function() {
            var a = this.dates.get(-1);
            return "undefined" != typeof a ? new Date(a) : null
        },
        clearDates: function() {
            var a;
            this.isInput ? a = this.element : this.component && (a = this.element.find("input")), a && a.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
        },
        setDates: function() {
            var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, b), this._trigger("changeDate"), this.setValue(), this
        },
        setUTCDates: function() {
            var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, a.map(b, this._utc_to_local)), this._trigger("changeDate"), this.setValue(), this
        },
        setDate: f("setDates"),
        setUTCDate: f("setUTCDates"),
        setValue: function() {
            var a = this.getFormattedDate();
            return this.isInput ? this.element.val(a) : this.component && this.element.find("input").val(a), this
        },
        getFormattedDate: function(c) {
            c === b && (c = this.o.format);
            var d = this.o.language;
            return a.map(this.dates, function(a) {
                return r.formatDate(a, c, d)
            }).join(this.o.multidateSeparator)
        },
        setStartDate: function(a) {
            return this._process_options({
                startDate: a
            }), this.update(), this.updateNavArrows(), this
        },
        setEndDate: function(a) {
            return this._process_options({
                endDate: a
            }), this.update(), this.updateNavArrows(), this
        },
        setDaysOfWeekDisabled: function(a) {
            return this._process_options({
                daysOfWeekDisabled: a
            }), this.update(), this.updateNavArrows(), this
        },
        setDaysOfWeekHighlighted: function(a) {
            return this._process_options({
                daysOfWeekHighlighted: a
            }), this.update(), this
        },
        setDatesDisabled: function(a) {
            this._process_options({
                datesDisabled: a
            }), this.update(), this.updateNavArrows()
        },
        place: function() {
            if (this.isInline) return this;
            var b = this.picker.outerWidth(),
                c = this.picker.outerHeight(),
                d = 10,
                e = a(this.o.container),
                f = e.width(),
                g = e.scrollTop(),
                h = e.offset(),
                i = [];
            this.element.parents().each(function() {
                var b = a(this).css("z-index");
                "auto" !== b && 0 !== b && i.push(parseInt(b))
            });
            var j = Math.max.apply(Math, i) + this.o.zIndexOffset,
                k = this.component ? this.component.parent().offset() : this.element.offset(),
                l = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                m = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                n = k.left - h.left,
                o = k.top - h.top;
            this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (n -= b - m)) : k.left < 0 ? (this.picker.addClass("datepicker-orient-left"), n -= k.left - d) : n + b > f ? (this.picker.addClass("datepicker-orient-right"), n = k.left + m - b) : this.picker.addClass("datepicker-orient-left");
            var p, q = this.o.orientation.y;
            if ("auto" === q && (p = -g + o - c, q = 0 > p ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + q), "top" === q ? o -= c + parseInt(this.picker.css("padding-top")) : o += l, this.o.rtl) {
                var r = f - (n + m);
                this.picker.css({
                    top: o,
                    right: r,
                    zIndex: j
                })
            } else this.picker.css({
                top: o,
                left: n,
                zIndex: j
            });
            return this
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update) return this;
            var b = this.dates.copy(),
                c = [],
                d = !1;
            return arguments.length ? (a.each(arguments, a.proxy(function(a, b) {
                b instanceof Date && (b = this._local_to_utc(b)), c.push(b)
            }, this)), d = !0) : (c = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), c = c && this.o.multidate ? c.split(this.o.multidateSeparator) : [c], delete this.element.data().date), c = a.map(c, a.proxy(function(a) {
                return r.parseDate(a, this.o.format, this.o.language)
            }, this)), c = a.grep(c, a.proxy(function(a) {
                return a < this.o.startDate || a > this.o.endDate || !a
            }, this), !0), this.dates.replace(c), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate, d ? this.setValue() : c.length && String(b) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && b.length && this._trigger("clearDate"), this.fill(), this.element.change(), this
        },
        fillDow: function() {
            var a = this.o.weekStart,
                b = "<tr>";
            for (this.o.calendarWeeks && (this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", function(a, b) {
                return parseInt(b) + 1
            }), b += '<th class="cw">&#160;</th>'); a < this.o.weekStart + 7;) b += '<th class="dow">' + q[this.o.language].daysMin[a++ % 7] + "</th>";
            b += "</tr>", this.picker.find(".datepicker-days thead").append(b)
        },
        fillMonths: function() {
            for (var a = "", b = 0; 12 > b;) a += '<span class="month">' + q[this.o.language].monthsShort[b++] + "</span>";
            this.picker.find(".datepicker-months td").html(a)
        },
        setRange: function(b) {
            b && b.length ? this.range = a.map(b, function(a) {
                return a.valueOf()
            }) : delete this.range, this.fill()
        },
        getClassNames: function(b) {
            var c = [],
                d = this.viewDate.getUTCFullYear(),
                f = this.viewDate.getUTCMonth(),
                g = new Date;
            return b.getUTCFullYear() < d || b.getUTCFullYear() === d && b.getUTCMonth() < f ? c.push("old") : (b.getUTCFullYear() > d || b.getUTCFullYear() === d && b.getUTCMonth() > f) && c.push("new"), this.focusDate && b.valueOf() === this.focusDate.valueOf() && c.push("focused"), this.o.todayHighlight && b.getUTCFullYear() === g.getFullYear() && b.getUTCMonth() === g.getMonth() && b.getUTCDate() === g.getDate() && c.push("today"), -1 !== this.dates.contains(b) && c.push("active"), (b.valueOf() < this.o.startDate || b.valueOf() > this.o.endDate || -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekDisabled)) && c.push("disabled"), -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekHighlighted) && c.push("highlighted"), this.o.datesDisabled.length > 0 && a.grep(this.o.datesDisabled, function(a) {
                return e(b, a)
            }).length > 0 && c.push("disabled", "disabled-date"), this.range && (b > this.range[0] && b < this.range[this.range.length - 1] && c.push("range"), -1 !== a.inArray(b.valueOf(), this.range) && c.push("selected"), b.valueOf() === this.range[0] && c.push("range-start"), b.valueOf() === this.range[this.range.length - 1] && c.push("range-end")), c
        },
        fill: function() {
            var d, e = new Date(this.viewDate),
                f = e.getUTCFullYear(),
                g = e.getUTCMonth(),
                h = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0),
                i = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0),
                j = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                k = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                l = q[this.o.language].today || q.en.today || "",
                m = q[this.o.language].clear || q.en.clear || "",
                n = q[this.o.language].titleFormat || q.en.titleFormat;
            if (!isNaN(f) && !isNaN(g)) {
                this.picker.find(".datepicker-days thead .datepicker-switch").text(r.formatDate(new c(f, g), n, this.o.language)), this.picker.find("tfoot .today").text(l).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot .clear").text(m).toggle(this.o.clearBtn !== !1), this.picker.find("thead .datepicker-title").text(this.o.title).toggle("" !== this.o.title), this.updateNavArrows(), this.fillMonths();
                var o = c(f, g - 1, 28),
                    p = r.getDaysInMonth(o.getUTCFullYear(), o.getUTCMonth());
                o.setUTCDate(p), o.setUTCDate(p - (o.getUTCDay() - this.o.weekStart + 7) % 7);
                var s = new Date(o);
                o.getUTCFullYear() < 100 && s.setUTCFullYear(o.getUTCFullYear()), s.setUTCDate(s.getUTCDate() + 42), s = s.valueOf();
                for (var t, u = []; o.valueOf() < s;) {
                    if (o.getUTCDay() === this.o.weekStart && (u.push("<tr>"), this.o.calendarWeeks)) {
                        var v = new Date(+o + (this.o.weekStart - o.getUTCDay() - 7) % 7 * 864e5),
                            w = new Date(Number(v) + (11 - v.getUTCDay()) % 7 * 864e5),
                            x = new Date(Number(x = c(w.getUTCFullYear(), 0, 1)) + (11 - x.getUTCDay()) % 7 * 864e5),
                            y = (w - x) / 864e5 / 7 + 1;
                        u.push('<td class="cw">' + y + "</td>")
                    }
                    if (t = this.getClassNames(o), t.push("day"), this.o.beforeShowDay !== a.noop) {
                        var z = this.o.beforeShowDay(this._utc_to_local(o));
                        z === b ? z = {} : "boolean" == typeof z ? z = {
                            enabled: z
                        } : "string" == typeof z && (z = {
                            classes: z
                        }), z.enabled === !1 && t.push("disabled"), z.classes && (t = t.concat(z.classes.split(/\s+/))), z.tooltip && (d = z.tooltip)
                    }
                    t = a.unique(t), u.push('<td class="' + t.join(" ") + '"' + (d ? ' title="' + d + '"' : "") + ">" + o.getUTCDate() + "</td>"), d = null, o.getUTCDay() === this.o.weekEnd && u.push("</tr>"), o.setUTCDate(o.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").empty().append(u.join(""));
                var A = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? "Months" : f).end().find("span").removeClass("active");
                if (a.each(this.dates, function(a, b) {
                        b.getUTCFullYear() === f && A.eq(b.getUTCMonth()).addClass("active")
                    }), (h > f || f > j) && A.addClass("disabled"), f === h && A.slice(0, i).addClass("disabled"), f === j && A.slice(k + 1).addClass("disabled"), this.o.beforeShowMonth !== a.noop) {
                    var B = this;
                    a.each(A, function(b, c) {
                        if (!a(c).hasClass("disabled")) {
                            var d = new Date(f, b, 1),
                                e = B.o.beforeShowMonth(d);
                            e === !1 && a(c).addClass("disabled")
                        }
                    })
                }
                u = "", f = 10 * parseInt(f / 10, 10);
                var C = this.picker.find(".datepicker-years").find(".datepicker-switch").text(f + "-" + (f + 9)).end().find("td");
                f -= 1;
                for (var D, E = a.map(this.dates, function(a) {
                    return a.getUTCFullYear()
                }), F = -1; 11 > F; F++) {
                    if (D = ["year"], d = null, -1 === F ? D.push("old") : 10 === F && D.push("new"), -1 !== a.inArray(f, E) && D.push("active"), (h > f || f > j) && D.push("disabled"), this.o.beforeShowYear !== a.noop) {
                        var G = this.o.beforeShowYear(new Date(f, 0, 1));
                        G === b ? G = {} : "boolean" == typeof G ? G = {
                            enabled: G
                        } : "string" == typeof G && (G = {
                            classes: G
                        }), G.enabled === !1 && D.push("disabled"), G.classes && (D = D.concat(G.classes.split(/\s+/))), G.tooltip && (d = G.tooltip)
                    }
                    u += '<span class="' + D.join(" ") + '"' + (d ? ' title="' + d + '"' : "") + ">" + f + "</span>", f += 1
                }
                C.html(u)
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var a = new Date(this.viewDate),
                    b = a.getUTCFullYear(),
                    c = a.getUTCMonth();
                switch (this.viewMode) {
                    case 0:
                        this.o.startDate !== -(1 / 0) && b <= this.o.startDate.getUTCFullYear() && c <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                            visibility: "hidden"
                        }) : this.picker.find(".prev").css({
                            visibility: "visible"
                        }), this.o.endDate !== 1 / 0 && b >= this.o.endDate.getUTCFullYear() && c >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
                            visibility: "hidden"
                        }) : this.picker.find(".next").css({
                            visibility: "visible"
                        });
                        break;
                    case 1:
                    case 2:
                        this.o.startDate !== -(1 / 0) && b <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".prev").css({
                            visibility: "hidden"
                        }) : this.picker.find(".prev").css({
                            visibility: "visible"
                        }), this.o.endDate !== 1 / 0 && b >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".next").css({
                            visibility: "hidden"
                        }) : this.picker.find(".next").css({
                            visibility: "visible"
                        })
                }
            }
        },
        click: function(b) {
            b.preventDefault(), b.stopPropagation();
            var d, e, f, g = a(b.target).closest("span, td, th");
            if (1 === g.length) switch (g[0].nodeName.toLowerCase()) {
                case "th":
                    switch (g[0].className) {
                        case "datepicker-switch":
                            this.showMode(1);
                            break;
                        case "prev":
                        case "next":
                            var h = r.modes[this.viewMode].navStep * ("prev" === g[0].className ? -1 : 1);
                            switch (this.viewMode) {
                                case 0:
                                    this.viewDate = this.moveMonth(this.viewDate, h), this._trigger("changeMonth", this.viewDate);
                                    break;
                                case 1:
                                case 2:
                                    this.viewDate = this.moveYear(this.viewDate, h), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                            }
                            this.fill();
                            break;
                        case "today":
                            var i = new Date;
                            i = c(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0), this.showMode(-2);
                            var j = "linked" === this.o.todayBtn ? null : "view";
                            this._setDate(i, j);
                            break;
                        case "clear":
                            this.clearDates()
                    }
                    break;
                case "span":
                    g.hasClass("disabled") || (this.viewDate.setUTCDate(1), g.hasClass("month") ? (f = 1, e = g.parent().find("span").index(g), d = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(e), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode ? (this._setDate(c(d, e, f)), this.showMode()) : this.showMode(-1)) : (f = 1, e = 0, d = parseInt(g.text(), 10) || 0, this.viewDate.setUTCFullYear(d), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(c(d, e, f)), this.showMode(-1)), this.fill());
                    break;
                case "td":
                    g.hasClass("day") && !g.hasClass("disabled") && (f = parseInt(g.text(), 10) || 1, d = this.viewDate.getUTCFullYear(), e = this.viewDate.getUTCMonth(), g.hasClass("old") ? 0 === e ? (e = 11, d -= 1) : e -= 1 : g.hasClass("new") && (11 === e ? (e = 0, d += 1) : e += 1), this._setDate(c(d, e, f)))
            }
            this.picker.is(":visible") && this._focused_from && a(this._focused_from).focus(), delete this._focused_from
        },
        _toggle_multidate: function(a) {
            var b = this.dates.contains(a);
            if (a || this.dates.clear(), -1 !== b ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(b) : this.o.multidate === !1 ? (this.dates.clear(), this.dates.push(a)) : this.dates.push(a), "number" == typeof this.o.multidate)
                for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
        },
        _setDate: function(a, b) {
            b && "date" !== b || this._toggle_multidate(a && new Date(a)), b && "view" !== b || (this.viewDate = a && new Date(a)), this.fill(), this.setValue(), b && "view" === b || this._trigger("changeDate");
            var c;
            this.isInput ? c = this.element : this.component && (c = this.element.find("input")), c && c.change(), !this.o.autoclose || b && "date" !== b || this.hide()
        },
        moveMonth: function(a, b) {
            if (!g(a)) return this.o.defaultViewDate;
            if (!b) return a;
            var c, d, e = new Date(a.valueOf()),
                f = e.getUTCDate(),
                h = e.getUTCMonth(),
                i = Math.abs(b);
            if (b = b > 0 ? 1 : -1, 1 === i) d = -1 === b ? function() {
                return e.getUTCMonth() === h
            } : function() {
                return e.getUTCMonth() !== c
            }, c = h + b, e.setUTCMonth(c), (0 > c || c > 11) && (c = (c + 12) % 12);
            else {
                for (var j = 0; i > j; j++) e = this.moveMonth(e, b);
                c = e.getUTCMonth(), e.setUTCDate(f), d = function() {
                    return c !== e.getUTCMonth()
                }
            }
            for (; d();) e.setUTCDate(--f), e.setUTCMonth(c);
            return e
        },
        moveYear: function(a, b) {
            return this.moveMonth(a, 12 * b)
        },
        dateWithinRange: function(a) {
            return a >= this.o.startDate && a <= this.o.endDate
        },
        keydown: function(a) {
            if (!this.picker.is(":visible")) return void((40 === a.keyCode || 27 === a.keyCode) && (this.show(), a.stopPropagation()));
            var b, c, e, f = !1,
                g = this.focusDate || this.viewDate;
            switch (a.keyCode) {
                case 27:
                    this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), a.preventDefault(), a.stopPropagation();
                    break;
                case 37:
                case 39:
                    if (!this.o.keyboardNavigation) break;
                    b = 37 === a.keyCode ? -1 : 1, a.ctrlKey ? (c = this.moveYear(this.dates.get(-1) || d(), b), e = this.moveYear(g, b), this._trigger("changeYear", this.viewDate)) : a.shiftKey ? (c = this.moveMonth(this.dates.get(-1) || d(), b), e = this.moveMonth(g, b), this._trigger("changeMonth", this.viewDate)) : (c = new Date(this.dates.get(-1) || d()), c.setUTCDate(c.getUTCDate() + b), e = new Date(g), e.setUTCDate(g.getUTCDate() + b)), this.dateWithinRange(e) && (this.focusDate = this.viewDate = e, this.setValue(), this.fill(), a.preventDefault());
                    break;
                case 38:
                case 40:
                    if (!this.o.keyboardNavigation) break;
                    b = 38 === a.keyCode ? -1 : 1, a.ctrlKey ? (c = this.moveYear(this.dates.get(-1) || d(), b), e = this.moveYear(g, b), this._trigger("changeYear", this.viewDate)) : a.shiftKey ? (c = this.moveMonth(this.dates.get(-1) || d(), b), e = this.moveMonth(g, b), this._trigger("changeMonth", this.viewDate)) : (c = new Date(this.dates.get(-1) || d()), c.setUTCDate(c.getUTCDate() + 7 * b), e = new Date(g), e.setUTCDate(g.getUTCDate() + 7 * b)), this.dateWithinRange(e) && (this.focusDate = this.viewDate = e, this.setValue(), this.fill(), a.preventDefault());
                    break;
                case 32:
                    break;
                case 13:
                    if (!this.o.forceParse) break;
                    g = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(g), f = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (a.preventDefault(), "function" == typeof a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0, this.o.autoclose && this.hide());
                    break;
                case 9:
                    this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
            }
            if (f) {
                this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
                var h;
                this.isInput ? h = this.element : this.component && (h = this.element.find("input")), h && h.change()
            }
        },
        showMode: function(a) {
            a && (this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + a))), this.picker.children("div").hide().filter(".datepicker-" + r.modes[this.viewMode].clsName).show(), this.updateNavArrows()
        }
    };
    var l = function(b, c) {
        this.element = a(b), this.inputs = a.map(c.inputs, function(a) {
            return a.jquery ? a[0] : a
        }), delete c.inputs, n.call(a(this.inputs), c).on("changeDate", a.proxy(this.dateUpdated, this)), this.pickers = a.map(this.inputs, function(b) {
            return a(b).data("datepicker")
        }), this.updateDates()
    };
    l.prototype = {
        updateDates: function() {
            this.dates = a.map(this.pickers, function(a) {
                return a.getUTCDate()
            }), this.updateRanges()
        },
        updateRanges: function() {
            var b = a.map(this.dates, function(a) {
                return a.valueOf()
            });
            a.each(this.pickers, function(a, c) {
                c.setRange(b)
            })
        },
        dateUpdated: function(b) {
            if (!this.updating) {
                this.updating = !0;
                var c = a(b.target).data("datepicker");
                if ("undefined" != typeof c) {
                    var d = c.getUTCDate(),
                        e = a.inArray(b.target, this.inputs),
                        f = e - 1,
                        g = e + 1,
                        h = this.inputs.length;
                    if (-1 !== e) {
                        if (a.each(this.pickers, function(a, b) {
                                b.getUTCDate() || b.setUTCDate(d)
                            }), d < this.dates[f])
                            for (; f >= 0 && d < this.dates[f];) this.pickers[f--].setUTCDate(d);
                        else if (d > this.dates[g])
                            for (; h > g && d > this.dates[g];) this.pickers[g++].setUTCDate(d);
                        this.updateDates(), delete this.updating
                    }
                }
            }
        },
        remove: function() {
            a.map(this.pickers, function(a) {
                a.remove()
            }), delete this.element.data().datepicker
        }
    };
    var m = a.fn.datepicker,
        n = function(c) {
            var d = Array.apply(null, arguments);
            d.shift();
            var e;
            if (this.each(function() {
                    var b = a(this),
                        f = b.data("datepicker"),
                        g = "object" == typeof c && c;
                    if (!f) {
                        var j = h(this, "date"),
                            m = a.extend({}, o, j, g),
                            n = i(m.language),
                            p = a.extend({}, o, n, j, g);
                        if (b.hasClass("input-daterange") || p.inputs) {
                            var q = {
                                inputs: p.inputs || b.find("input").toArray()
                            };
                            b.data("datepicker", f = new l(this, a.extend(p, q)))
                        } else b.data("datepicker", f = new k(this, p))
                    }
                    "string" == typeof c && "function" == typeof f[c] && (e = f[c].apply(f, d))
                }), e === b || e instanceof k || e instanceof l) return this;
            if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + c + " function)");
            return e
        };
    a.fn.datepicker = n;
    var o = a.fn.datepicker.defaults = {
            autoclose: !1,
            beforeShowDay: a.noop,
            beforeShowMonth: a.noop,
            beforeShowYear: a.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            toggleActive: !1,
            daysOfWeekDisabled: [],
            daysOfWeekHighlighted: [],
            datesDisabled: [],
            endDate: 1 / 0,
            forceParse: !0,
            format: "mm/dd/yyyy",
            keyboardNavigation: !0,
            language: "en",
            minViewMode: 0,
            maxViewMode: 2,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -(1 / 0),
            startView: 0,
            todayBtn: !1,
            todayHighlight: !1,
            weekStart: 0,
            disableTouchKeyboard: !1,
            enableOnReadonly: !0,
            container: "body",
            immediateUpdates: !1,
            title: ""
        },
        p = a.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    a.fn.datepicker.Constructor = k;
    var q = a.fn.datepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear",
                titleFormat: "MM yyyy"
            }
        },
        r = {
            modes: [{
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            }, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            }],
            isLeapYear: function(a) {
                return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
            },
            getDaysInMonth: function(a, b) {
                return [31, r.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
            },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
            parseFormat: function(a) {
                if ("function" == typeof a.toValue && "function" == typeof a.toDisplay) return a;
                var b = a.replace(this.validParts, "\x00").split("\x00"),
                    c = a.match(this.validParts);
                if (!b || !b.length || !c || 0 === c.length) throw new Error("Invalid date format.");
                return {
                    separators: b,
                    parts: c
                }
            },
            parseDate: function(d, e, f) {
                function g() {
                    var a = this.slice(0, m[j].length),
                        b = m[j].slice(0, a.length);
                    return a.toLowerCase() === b.toLowerCase()
                }
                if (!d) return b;
                if (d instanceof Date) return d;
                if ("string" == typeof e && (e = r.parseFormat(e)), e.toValue) return e.toValue(d, e, f);
                var h, i, j, l = /([\-+]\d+)([dmwy])/,
                    m = d.match(/([\-+]\d+)([dmwy])/g);
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(d)) {
                    for (d = new Date, j = 0; j < m.length; j++) switch (h = l.exec(m[j]), i = parseInt(h[1]), h[2]) {
                        case "d":
                            d.setUTCDate(d.getUTCDate() + i);
                            break;
                        case "m":
                            d = k.prototype.moveMonth.call(k.prototype, d, i);
                            break;
                        case "w":
                            d.setUTCDate(d.getUTCDate() + 7 * i);
                            break;
                        case "y":
                            d = k.prototype.moveYear.call(k.prototype, d, i)
                    }
                    return c(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0)
                }
                m = d && d.match(this.nonpunctuation) || [], d = new Date;
                var n, o, p = {},
                    s = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                    t = {
                        yyyy: function(a, b) {
                            return a.setUTCFullYear(b)
                        },
                        yy: function(a, b) {
                            return a.setUTCFullYear(2e3 + b)
                        },
                        m: function(a, b) {
                            if (isNaN(a)) return a;
                            for (b -= 1; 0 > b;) b += 12;
                            for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() !== b;) a.setUTCDate(a.getUTCDate() - 1);
                            return a
                        },
                        d: function(a, b) {
                            return a.setUTCDate(b)
                        }
                    };
                t.M = t.MM = t.mm = t.m, t.dd = t.d, d = c(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
                var u = e.parts.slice();
                if (m.length !== u.length && (u = a(u).filter(function(b, c) {
                        return -1 !== a.inArray(c, s)
                    }).toArray()), m.length === u.length) {
                    var v;
                    for (j = 0, v = u.length; v > j; j++) {
                        if (n = parseInt(m[j], 10), h = u[j], isNaN(n)) switch (h) {
                            case "MM":
                                o = a(q[f].months).filter(g), n = a.inArray(o[0], q[f].months) + 1;
                                break;
                            case "M":
                                o = a(q[f].monthsShort).filter(g), n = a.inArray(o[0], q[f].monthsShort) + 1
                        }
                        p[h] = n
                    }
                    var w, x;
                    for (j = 0; j < s.length; j++) x = s[j], x in p && !isNaN(p[x]) && (w = new Date(d), t[x](w, p[x]), isNaN(w) || (d = w))
                }
                return d
            },
            formatDate: function(b, c, d) {
                if (!b) return "";
                if ("string" == typeof c && (c = r.parseFormat(c)), c.toDisplay) return c.toDisplay(b, c, d);
                var e = {
                    d: b.getUTCDate(),
                    D: q[d].daysShort[b.getUTCDay()],
                    DD: q[d].days[b.getUTCDay()],
                    m: b.getUTCMonth() + 1,
                    M: q[d].monthsShort[b.getUTCMonth()],
                    MM: q[d].months[b.getUTCMonth()],
                    yy: b.getUTCFullYear().toString().substring(2),
                    yyyy: b.getUTCFullYear()
                };
                e.dd = (e.d < 10 ? "0" : "") + e.d, e.mm = (e.m < 10 ? "0" : "") + e.m, b = [];
                for (var f = a.extend([], c.separators), g = 0, h = c.parts.length; h >= g; g++) f.length && b.push(f.shift()), b.push(e[c.parts[g]]);
                return b.join("")
            },
            headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
    r.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + r.headTemplate + "<tbody></tbody>" + r.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + "</table></div></div>", a.fn.datepicker.DPGlobal = r, a.fn.datepicker.noConflict = function() {
        return a.fn.datepicker = m, this
    }, a.fn.datepicker.version = "1.5.0-RC1", a(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(b) {
        var c = a(this);
        c.data("datepicker") || (b.preventDefault(), n.call(c, "show"))
    }), a(function() {
        n.call(a('[data-provide="datepicker-inline"]'))
    })
});;
! function(b) {
    b.expr[":"].icontains = function(e, c, d) {
        return b(e).text().toUpperCase().indexOf(d[3].toUpperCase()) >= 0
    };
    var a = function(d, c, f) {
        if (f) {
            f.stopPropagation();
            f.preventDefault()
        }
        this.$element = b(d);
        this.$newElement = null;
        this.$button = null;
        this.$menu = null;
        this.$lis = null;
        this.options = b.extend({}, b.fn.selectpicker.defaults, this.$element.data(), typeof c == "object" && c);
        if (this.options.title === null) {
            this.options.title = this.$element.attr("title")
        }
        this.val = a.prototype.val;
        this.render = a.prototype.render;
        this.refresh = a.prototype.refresh;
        this.setStyle = a.prototype.setStyle;
        this.selectAll = a.prototype.selectAll;
        this.deselectAll = a.prototype.deselectAll;
        this.init()
    };
    a.prototype = {
        constructor: a,
        init: function() {
            var c = this,
                d = this.$element.attr("id");
            this.$element.hide();
            this.multiple = this.$element.prop("multiple");
            this.autofocus = this.$element.prop("autofocus");
            this.$newElement = this.createView();
            this.$element.after(this.$newElement);
            this.$menu = this.$newElement.find("> .dropdown-menu");
            this.$button = this.$newElement.find("> button");
            this.$searchbox = this.$newElement.find("input");
            if (d !== undefined) {
                this.$button.attr("data-id", d);
                b('label[for="' + d + '"]').click(function(f) {
                    f.preventDefault();
                    c.$button.focus()
                })
            }
            this.checkDisabled();
            this.clickListener();
            if (this.options.liveSearch) {
                this.liveSearchListener()
            }
            this.render();
            this.liHeight();
            this.setStyle();
            this.setWidth();
            if (this.options.container) {
                this.selectPosition()
            }
            this.$menu.data("this", this);
            this.$newElement.data("this", this)
        },
        createDropdown: function() {
            var c = this.multiple ? " show-tick" : "";
            var g = this.autofocus ? " autofocus" : "";
            var f = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "";
            var e = this.options.liveSearch ? '<div class="bootstrap-select-searchbox"><input type="text" class="input-block-level form-control" /></div>' : "";
            var d = '<div class="btn-group bootstrap-select' + c + '"><button type="button" class="btn dropdown-toggle selectpicker" data-toggle="dropdown"' + g + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + f + e + '<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>';
            return b(d)
        },
        createView: function() {
            var c = this.createDropdown();
            var d = this.createLi();
            c.find("ul").append(d);
            return c
        },
        reloadLi: function() {
            this.destroyLi();
            var c = this.createLi();
            this.$menu.find("ul").append(c)
        },
        destroyLi: function() {
            this.$menu.find("li").remove()
        },
        createLi: function() {
            var d = this,
                e = [],
                c = "";
            this.$element.find("option").each(function() {
                var i = b(this);
                var g = i.attr("class") || "";
                var h = i.attr("style") || "";
                var m = i.data("content") ? i.data("content") : i.html();
                var k = i.data("subtext") !== undefined ? '<small class="muted text-muted">' + i.data("subtext") + "</small>" : "";
                var j = i.data("icon") !== undefined ? '<i class="' + d.options.iconBase + " " + i.data("icon") + '"></i> ' : "";
                if (j !== "" && (i.is(":disabled") || i.parent().is(":disabled"))) {
                    j = "<span>" + j + "</span>"
                }
                if (!i.data("content")) {
                    m = j + '<span class="text">' + m + k + "</span>"
                }
                if (d.options.hideDisabled && (i.is(":disabled") || i.parent().is(":disabled"))) {
                    e.push('<a style="min-height: 0; padding: 0"></a>')
                } else {
                    if (i.parent().is("optgroup") && i.data("divider") !== true) {
                        if (i.index() === 0) {
                            var l = i.parent().attr("label");
                            var n = i.parent().data("subtext") !== undefined ? '<small class="muted text-muted">' + i.parent().data("subtext") + "</small>" : "";
                            var f = i.parent().data("icon") ? '<i class="' + i.parent().data("icon") + '"></i> ' : "";
                            l = f + '<span class="text">' + l + n + "</span>";
                            if (i[0].index !== 0) {
                                e.push('<div class="div-contain"><div class="divider"></div></div><dt>' + l + "</dt>" + d.createA(m, "opt " + g, h))
                            } else {
                                e.push("<dt>" + l + "</dt>" + d.createA(m, "opt " + g, h))
                            }
                        } else {
                            e.push(d.createA(m, "opt " + g, h))
                        }
                    } else {
                        if (i.data("divider") === true) {
                            e.push('<div class="div-contain"><div class="divider"></div></div>')
                        } else {
                            if (b(this).data("hidden") === true) {
                                e.push("")
                            } else {
                                e.push(d.createA(m, g, h))
                            }
                        }
                    }
                }
            });
            b.each(e, function(f, g) {
                c += "<li rel=" + f + ">" + g + "</li>"
            });
            if (!this.multiple && this.$element.find("option:selected").length === 0 && !this.options.title) {
                this.$element.find("option").eq(0).prop("selected", true).attr("selected", "selected")
            }
            return b(c)
        },
        createA: function(e, c, d) {
            return '<a tabindex="0" class="' + c + '" style="' + d + '">' + e + '<i class="' + this.options.iconBase + " " + this.options.tickIcon + ' icon-ok check-mark"></i></a>'
        },
        render: function(e) {
            var d = this;
            if (e !== false) {
                this.$element.find("option").each(function(i) {
                    d.setDisabled(i, b(this).is(":disabled") || b(this).parent().is(":disabled"));
                    d.setSelected(i, b(this).is(":selected"))
                })
            }
            this.tabIndex();
            var h = this.$element.find("option:selected").map(function() {
                var k = b(this);
                var j = k.data("icon") && d.options.showIcon ? '<i class="' + d.options.iconBase + " " + k.data("icon") + '"></i> ' : "";
                var i;
                if (d.options.showSubtext && k.attr("data-subtext") && !d.multiple) {
                    i = ' <small class="muted text-muted">' + k.data("subtext") + "</small>"
                } else {
                    i = ""
                }
                if (k.data("content") && d.options.showContent) {
                    return k.data("content")
                } else {
                    if (k.attr("title") !== undefined) {
                        return k.attr("title")
                    } else {
                        return j + k.html() + i
                    }
                }
            }).toArray();
            var g = !this.multiple ? h[0] : h.join(this.options.multipleSeparator);
            if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                var c = this.options.selectedTextFormat.split(">");
                var f = this.options.hideDisabled ? ":not([disabled])" : "";
                if ((c.length > 1 && h.length > c[1]) || (c.length == 1 && h.length >= 2)) {
                    g = this.options.countSelectedText.replace("{0}", h.length).replace("{1}", this.$element.find('option:not([data-divider="true"]):not([data-hidden="true"])' + f).length)
                }
            }
            if (!g) {
                g = this.options.title !== undefined ? this.options.title : this.options.noneSelectedText
            }
            this.$button.attr("title", b.trim(g));
            this.$newElement.find(".filter-option").html(g)
        },
        setStyle: function(e, d) {
            if (this.$element.attr("class")) {
                this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device/gi, ""))
            }
            var c = e ? e : this.options.style;
            if (d == "add") {
                this.$button.addClass(c)
            } else {
                if (d == "remove") {
                    this.$button.removeClass(c)
                } else {
                    this.$button.removeClass(this.options.style);
                    this.$button.addClass(c)
                }
            }
        },
        liHeight: function() {
            var e = this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus", false).end().appendTo("body"),
                f = e.addClass("open").find("> .dropdown-menu"),
                d = f.find("li > a").outerHeight(),
                c = this.options.header ? f.find(".popover-title").outerHeight() : 0,
                g = this.options.liveSearch ? f.find(".bootstrap-select-searchbox").outerHeight() : 0;
            e.remove();
            this.$newElement.data("liHeight", d).data("headerHeight", c).data("searchHeight", g)
        },
        setSize: function() {
            var h = this,
                d = this.$menu,
                i = d.find(".inner"),
                t = this.$newElement.outerHeight(),
                f = this.$newElement.data("liHeight"),
                r = this.$newElement.data("headerHeight"),
                l = this.$newElement.data("searchHeight"),
                k = d.find("li .divider").outerHeight(true),
                q = parseInt(d.css("padding-top")) + parseInt(d.css("padding-bottom")) + parseInt(d.css("border-top-width")) + parseInt(d.css("border-bottom-width")),
                o = this.options.hideDisabled ? ":not(.disabled)" : "",
                n = b(window),
                g = q + parseInt(d.css("margin-top")) + parseInt(d.css("margin-bottom")) + 2,
                p, u, s, j = function() {
                    u = h.$newElement.offset().top - n.scrollTop();
                    s = n.height() - u - t
                };
            j();
            if (this.options.header) {
                d.css("padding-top", 0)
            }
            if (this.options.size == "auto") {
                var e = function() {
                    var v;
                    j();
                    p = s - g;
                    if (h.options.dropupAuto) {
                        h.$newElement.toggleClass("dropup", (u > s) && ((p - g) < d.height()))
                    }
                    if (h.$newElement.hasClass("dropup")) {
                        p = u - g
                    }
                    if ((d.find("li").length + d.find("dt").length) > 3) {
                        v = f * 3 + g - 2
                    } else {
                        v = 0
                    }
                    d.css({
                        "max-height": p + "px",
                        overflow: "hidden",
                        "min-height": v + "px"
                    });
                    i.css({
                        "max-height": p - r - l - q + "px",
                        "overflow-y": "auto",
                        "min-height": v - q + "px"
                    })
                };
                e();
                b(window).resize(e);
                b(window).scroll(e)
            } else {
                if (this.options.size && this.options.size != "auto" && d.find("li" + o).length > this.options.size) {
                    var m = d.find("li" + o + " > *").filter(":not(.div-contain)").slice(0, this.options.size).last().parent().index();
                    var c = d.find("li").slice(0, m + 1).find(".div-contain").length;
                    p = f * this.options.size + c * k + q;
                    if (h.options.dropupAuto) {
                        this.$newElement.toggleClass("dropup", (u > s) && (p < d.height()))
                    }
                    d.css({
                        "max-height": p + r + l + "px",
                        overflow: "hidden"
                    });
                    i.css({
                        "max-height": p - q + "px",
                        "overflow-y": "auto"
                    })
                }
            }
        },
        setWidth: function() {
            if (this.options.width == "auto") {
                this.$menu.css("min-width", "0");
                var d = this.$newElement.clone().appendTo("body");
                var c = d.find("> .dropdown-menu").css("width");
                d.remove();
                this.$newElement.css("width", c)
            } else {
                if (this.options.width == "fit") {
                    this.$menu.css("min-width", "");
                    this.$newElement.css("width", "").addClass("fit-width")
                } else {
                    if (this.options.width) {
                        this.$menu.css("min-width", "");
                        this.$newElement.css("width", this.options.width)
                    } else {
                        this.$menu.css("min-width", "");
                        this.$newElement.css("width", "")
                    }
                }
            }
            if (this.$newElement.hasClass("fit-width") && this.options.width !== "fit") {
                this.$newElement.removeClass("fit-width")
            }
        },
        selectPosition: function() {
            var e = this,
                d = "<div />",
                f = b(d),
                h, g, c = function(i) {
                    f.addClass(i.attr("class")).toggleClass("dropup", i.hasClass("dropup"));
                    h = i.offset();
                    g = i.hasClass("dropup") ? 0 : i[0].offsetHeight;
                    f.css({
                        top: h.top + g,
                        left: h.left,
                        width: i[0].offsetWidth,
                        position: "absolute"
                    })
                };
            this.$newElement.on("click", function() {
                c(b(this));
                f.appendTo(e.options.container);
                f.toggleClass("open", !b(this).hasClass("open"));
                f.append(e.$menu)
            });
            b(window).resize(function() {
                c(e.$newElement)
            });
            b(window).on("scroll", function() {
                c(e.$newElement)
            });
            b("html").on("click", function(i) {
                if (b(i.target).closest(e.$newElement).length < 1) {
                    f.removeClass("open")
                }
            })
        },
        mobile: function() {
            this.$element.addClass("mobile-device").appendTo(this.$newElement);
            if (this.options.container) {
                this.$menu.hide()
            }
        },
        refresh: function() {
            this.$lis = null;
            this.reloadLi();
            this.render();
            this.setWidth();
            this.setStyle();
            this.checkDisabled();
            this.liHeight()
        },
        update: function() {
            this.reloadLi();
            this.setWidth();
            this.setStyle();
            this.checkDisabled();
            this.liHeight()
        },
        setSelected: function(c, d) {
            if (this.$lis == null) {
                this.$lis = this.$menu.find("li")
            }
            b(this.$lis[c]).toggleClass("selected", d)
        },
        setDisabled: function(c, d) {
            if (this.$lis == null) {
                this.$lis = this.$menu.find("li")
            }
            if (d) {
                b(this.$lis[c]).addClass("disabled").find("a").attr("href", "#").attr("tabindex", -1)
            } else {
                b(this.$lis[c]).removeClass("disabled").find("a").removeAttr("href").attr("tabindex", 0)
            }
        },
        isDisabled: function() {
            return this.$element.is(":disabled")
        },
        checkDisabled: function() {
            var c = this;
            if (this.isDisabled()) {
                this.$button.addClass("disabled").attr("tabindex", -1)
            } else {
                if (this.$button.hasClass("disabled")) {
                    this.$button.removeClass("disabled")
                }
                if (this.$button.attr("tabindex") == -1) {
                    if (!this.$element.data("tabindex")) {
                        this.$button.removeAttr("tabindex")
                    }
                }
            }
            this.$button.click(function() {
                return !c.isDisabled()
            })
        },
        tabIndex: function() {
            if (this.$element.is("[tabindex]")) {
                this.$element.data("tabindex", this.$element.attr("tabindex"));
                this.$button.attr("tabindex", this.$element.data("tabindex"))
            }
        },
        clickListener: function() {
            var c = this;
            b("body").on("touchstart.dropdown", ".dropdown-menu", function(d) {
                d.stopPropagation()
            });
            this.$newElement.on("click", function() {
                c.setSize();
                if (!c.options.liveSearch && !c.multiple) {
                    setTimeout(function() {
                        c.$menu.find(".selected a").focus()
                    }, 10)
                }
            });
            this.$menu.on("click", "li a", function(k) {
                var g = b(this).parent().index(),
                    j = c.$element.val(),
                    f = c.$element.prop("selectedIndex");
                if (c.multiple) {
                    k.stopPropagation()
                }
                k.preventDefault();
                if (!c.isDisabled() && !b(this).parent().hasClass("disabled")) {
                    var d = c.$element.find("option"),
                        i = d.eq(g),
                        h = i.prop("selected");
                    if (!c.multiple) {
                        d.prop("selected", false);
                        i.prop("selected", true);
                        c.$menu.find(".selected").removeClass("selected");
                        c.setSelected(g, true)
                    } else {
                        i.prop("selected", !h);
                        c.setSelected(g, !h)
                    }
                    if (!c.multiple) {
                        c.$button.focus()
                    } else {
                        if (c.options.liveSearch) {
                            c.$searchbox.focus()
                        }
                    }
                    if ((j != c.$element.val() && c.multiple) || (f != c.$element.prop("selectedIndex") && !c.multiple)) {
                        c.$element.change()
                    }
                }
            });
            this.$menu.on("click", "li.disabled a, li dt, li .div-contain, .popover-title, .popover-title :not(.close)", function(d) {
                if (d.target == this) {
                    d.preventDefault();
                    d.stopPropagation();
                    if (!c.options.liveSearch) {
                        c.$button.focus()
                    } else {
                        c.$searchbox.focus()
                    }
                }
            });
            this.$menu.on("click", ".popover-title .close", function() {
                c.$button.focus()
            });
            this.$searchbox.on("click", function(d) {
                d.stopPropagation()
            });
            this.$element.change(function() {
                c.render(false)
            })
        },
        liveSearchListener: function() {
            var d = this,
                c = b('<li class="no-results"></li>');
            this.$newElement.on("click.dropdown.data-api", function() {
                d.$menu.find(".active").removeClass("active");
                if (!!d.$searchbox.val()) {
                    d.$searchbox.val("");
                    d.$menu.find("li").show();
                    if (!!c.parent().length) {
                        c.remove()
                    }
                }
                if (!d.multiple) {
                    d.$menu.find(".selected").addClass("active")
                }
                setTimeout(function() {
                    d.$searchbox.focus()
                }, 10)
            });
            this.$searchbox.on("input propertychange", function() {
                if (d.$searchbox.val()) {
                    d.$menu.find("li").show().not(":icontains(" + d.$searchbox.val() + ")").hide();
                    if (!d.$menu.find("li").filter(":visible:not(.no-results)").length) {
                        if (!!c.parent().length) {
                            c.remove()
                        }
                        c.html(d.options.noneResultsText + ' "' + d.$searchbox.val() + '"').show();
                        d.$menu.find("li").last().after(c)
                    } else {
                        if (!!c.parent().length) {
                            c.remove()
                        }
                    }
                } else {
                    d.$menu.find("li").show();
                    if (!!c.parent().length) {
                        c.remove()
                    }
                }
                d.$menu.find("li.active").removeClass("active");
                d.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus();
                b(this).focus()
            });
            this.$menu.on("mouseenter", "a", function(f) {
                d.$menu.find(".active").removeClass("active");
                b(f.currentTarget).parent().not(".disabled").addClass("active")
            });
            this.$menu.on("mouseleave", "a", function() {
                d.$menu.find(".active").removeClass("active")
            })
        },
        val: function(c) {
            if (c !== undefined) {
                this.$element.val(c);
                this.$element.change();
                return this.$element
            } else {
                return this.$element.val()
            }
        },
        selectAll: function() {
            this.$element.find("option").prop("selected", true).attr("selected", "selected");
            this.render()
        },
        deselectAll: function() {
            this.$element.find("option").prop("selected", false).removeAttr("selected");
            this.render()
        },
        keydown: function(p) {
            var q, o, i, n, k, j, r, f, h, m, d, s, g = {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9"
            };
            q = b(this);
            i = q.parent();
            if (q.is("input")) {
                i = q.parent().parent()
            }
            m = i.data("this");
            if (m.options.liveSearch) {
                i = q.parent().parent()
            }
            if (m.options.container) {
                i = m.$menu
            }
            o = b("[role=menu] li:not(.divider) a", i);
            s = m.$menu.parent().hasClass("open");
            if (m.options.liveSearch) {
                if (/(^9$|27)/.test(p.keyCode) && s && m.$menu.find(".active").length === 0) {
                    p.preventDefault();
                    m.$menu.parent().removeClass("open");
                    m.$button.focus()
                }
                o = b("[role=menu] li:not(.divider):visible", i);
                if (!q.val() && !/(38|40)/.test(p.keyCode)) {
                    if (o.filter(".active").length === 0) {
                        o = m.$newElement.find("li").filter(":icontains(" + g[p.keyCode] + ")")
                    }
                }
            }
            if (!o.length) {
                return
            }
            if (/(38|40)/.test(p.keyCode)) {
                if (!s) {
                    m.$menu.parent().addClass("open")
                }
                n = o.index(o.filter(":focus"));
                j = o.parent(":not(.disabled):visible").first().index();
                r = o.parent(":not(.disabled):visible").last().index();
                k = o.eq(n).parent().nextAll(":not(.disabled):visible").eq(0).index();
                f = o.eq(n).parent().prevAll(":not(.disabled):visible").eq(0).index();
                h = o.eq(k).parent().prevAll(":not(.disabled):visible").eq(0).index();
                if (m.options.liveSearch) {
                    o.each(function(e) {
                        if (b(this).is(":not(.disabled)")) {
                            b(this).data("index", e)
                        }
                    });
                    n = o.index(o.filter(".active"));
                    j = o.filter(":not(.disabled):visible").first().data("index");
                    r = o.filter(":not(.disabled):visible").last().data("index");
                    k = o.eq(n).nextAll(":not(.disabled):visible").eq(0).data("index");
                    f = o.eq(n).prevAll(":not(.disabled):visible").eq(0).data("index");
                    h = o.eq(k).prevAll(":not(.disabled):visible").eq(0).data("index")
                }
                d = q.data("prevIndex");
                if (p.keyCode == 38) {
                    if (m.options.liveSearch) {
                        n -= 1
                    }
                    if (n != h && n > f) {
                        n = f
                    }
                    if (n < j) {
                        n = j
                    }
                    if (n == d) {
                        n = r
                    }
                }
                if (p.keyCode == 40) {
                    if (m.options.liveSearch) {
                        n += 1
                    }
                    if (n == -1) {
                        n = 0
                    }
                    if (n != h && n < k) {
                        n = k
                    }
                    if (n > r) {
                        n = r
                    }
                    if (n == d) {
                        n = j
                    }
                }
                q.data("prevIndex", n);
                if (!m.options.liveSearch) {
                    o.eq(n).focus()
                } else {
                    p.preventDefault();
                    if (!q.is(".dropdown-toggle")) {
                        o.removeClass("active");
                        o.eq(n).addClass("active").find("a").focus();
                        q.focus()
                    }
                }
            } else {
                if (!q.is("input")) {
                    var c = [],
                        l, t;
                    o.each(function() {
                        if (b(this).parent().is(":not(.disabled)")) {
                            if (b.trim(b(this).text().toLowerCase()).substring(0, 1) == g[p.keyCode]) {
                                c.push(b(this).parent().index())
                            }
                        }
                    });
                    l = b(document).data("keycount");
                    l++;
                    b(document).data("keycount", l);
                    t = b.trim(b(":focus").text().toLowerCase()).substring(0, 1);
                    if (t != g[p.keyCode]) {
                        l = 1;
                        b(document).data("keycount", l)
                    } else {
                        if (l >= c.length) {
                            b(document).data("keycount", 0);
                            if (l > c.length) {
                                l = 1
                            }
                        }
                    }
                    o.eq(c[l - 1]).focus()
                }
            }
            if (/(13|32|^9$)/.test(p.keyCode) && s) {
                if (!/(32)/.test(p.keyCode)) {
                    p.preventDefault()
                }
                if (!m.options.liveSearch) {
                    b(":focus").click()
                } else {
                    if (!/(32)/.test(p.keyCode)) {
                        m.$menu.find(".active a").click();
                        q.focus()
                    }
                }
                b(document).data("keycount", 0)
            }
            if ((/(^9$|27)/.test(p.keyCode) && s && (m.multiple || m.options.liveSearch)) || (/(27)/.test(p.keyCode) && !s)) {
                m.$menu.parent().removeClass("open");
                m.$button.focus()
            }
        },
        hide: function() {
            this.$newElement.hide()
        },
        show: function() {
            this.$newElement.show()
        },
        destroy: function() {
            this.$newElement.remove();
            this.$element.remove()
        }
    };
    b.fn.selectpicker = function(e, f) {
        var c = arguments;
        var g;
        var d = this.each(function() {
            if (b(this).is("select")) {
                var m = b(this),
                    l = m.data("selectpicker"),
                    h = typeof e == "object" && e;
                if (!l) {
                    m.data("selectpicker", (l = new a(this, h, f)))
                } else {
                    if (h) {
                        for (var j in h) {
                            l.options[j] = h[j]
                        }
                    }
                }
                if (typeof e == "string") {
                    var k = e;
                    if (l[k] instanceof Function) {
                        [].shift.apply(c);
                        g = l[k].apply(l, c)
                    } else {
                        g = l.options[k]
                    }
                }
            }
        });
        if (g !== undefined) {
            return g
        } else {
            return d
        }
    };
    b.fn.selectpicker.defaults = {
        style: "btn-default",
        size: "auto",
        title: null,
        selectedTextFormat: "values",
        noneSelectedText: "Nothing selected",
        noneResultsText: "No results match",
        countSelectedText: "{0} of {1} selected",
        width: false,
        container: false,
        hideDisabled: false,
        showSubtext: false,
        showIcon: true,
        showContent: true,
        dropupAuto: true,
        header: false,
        liveSearch: false,
        multipleSeparator: ", ",
        iconBase: "glyphicon",
        tickIcon: "glyphicon-ok"
    };
    b(document).data("keycount", 0).on("keydown", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input", a.prototype.keydown).on("focusin.modal", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input", function(c) {
        c.stopPropagation()
    })
}(window.jQuery);
$(document).ready(function() {
    var mydiv = '\
<div id="confirm_dlg" class="modal fade" style="z-index:30000;">\
  <div class="modal-dialog">\
    <div class="modal-content">\
      <div class="modal-header">\
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
        <h4 class="modal-title">' + RLANG.confirm + '</h4>\
      </div>\
      <div id="confirm_dlg_message" class="modal-body">\
      </div>\
      <div class="modal-footer">\
        <button id="confirm_dlg_yes" type="button" class="btn btn-primary">' + RLANG.yes + '</button>\
        <button id="confirm_dlg_no" type="button" class="btn btn-default" data-dismiss="modal">' + RLANG.no + '</button>\
      </div>\
    </div>\
  </div>\
</div>';
    $('body').append(mydiv);
});

function showConfirmDialog(message, link) {
    ueConfirmDialog(message, function() {
        location.replace(link);
        return true;
    });
}

function ueConfirmDialog(message, callback) {
    $('#confirm_dlg #confirm_dlg_message').html(message);
    $('#confirm_dlg .modal-title').text(RLANG.confirm);
    $('#confirm_dlg #confirm_dlg_no').text(RLANG.no);
    $('#confirm_dlg #confirm_dlg_yes').unbind('click');
    $('#confirm_dlg #confirm_dlg_yes').show().click(function() {
        var preserveDialog = $.isFunction(callback) && callback() === false;
        if (!preserveDialog) {
            $('#confirm_dlg').modal('hide');
        }
        return false;
    });
    $('#confirm_dlg').modal({
        'backdrop': true
    }).modal('show');
}

function showAlert(message) {
    $('#confirm_dlg #confirm_dlg_message').html(message);
    $('#confirm_dlg .modal-title').text(RLANG.alert);
    $('#confirm_dlg #confirm_dlg_no').text(RLANG.close);
    $('#confirm_dlg #confirm_dlg_yes').hide()
    $('#confirm_dlg').modal({
        'backdrop': true
    }).modal('show');
}

function showUserModerationInfo(obj) {
    var is_topic = obj.hasClass('topic-item');
    var data_obj = obj.find('.user-moderation-status');
    var message = "<strong>" + (is_topic ? RLANG.topic_marked_by_user : RLANG.reply_marked_by_user) + "</strong><br>";
    message += RLANG.inappropriate + ": " + data_obj.attr('data-inappropriate') + "<br>";
    message += RLANG.spam + ": " + data_obj.attr('data-spam') + "<br>";
    message += RLANG.duplicate + ": " + data_obj.attr('data-duplicate') + "<br>";
    message += "<br><strong>" + (is_topic ? RLANG.accept_topic_remove_marks : RLANG.accept_reply_remove_marks) + "</strong>";
    showAlert(message);
    return false;
}

function showConfirmDlgMini(sender, message, link) {
    showConfirmDialog(message, link);
}
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function(key, value, options) {
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
        }
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                result = read(cookie, value);
                break;
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        $.cookie(key, '', $.extend({}, options, {
            expires: -1
        }));
        return !$.cookie(key);
    };
}));
jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
    $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
    $(window).scrollLeft()) + "px");
    return this;
}
var currentScroll = 0;
var ActiveEditor = false;

function lockscroll() {
    $(window).scrollTop(currentScroll);
}

function is_old_ie() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? ((parseInt(myNav.split('msie')[1]) < 9) ? true : false) : false;
}

function is_mobile() {
    var agents = ['android', 'webos', 'iphone', 'blackberry', 'windows phone', 'xblwp7', 'zunewp7'];
    for (i in agents) {
        if (navigator.userAgent.match(new RegExp(agents[i], 'i'))) {
            return true;
        }
    }
    return false;
}

function pause() {
    $("#wait_screen").css('display', 'table');
}

function resume() {
    $("#wait_screen").css('display', 'none');
}

function ue_inplace(params) {
    container = $(params.target);
    container.load(params.src, function() {
        if (params.callback) {
            params.callback();
        }
    });
}

function ue_modal(params) {
    if (!params.donthide) {
        $('.modal-backdrop').remove();
        $('#popup_container .modal').remove();
    }
    var scroll = [$(document).scrollTop(), $(document).scrollLeft()];
    if (!is_mobile()) {}
    if (params.name) {
        $('#popup_container').append($("<div id=" + params.name + "></div>"));
        container = $('#' + params.name);
    } else {
        container = $('#popup_container').html('');
        $('#popup_container').append($("<div id='default_popup'></div>"));
        container = $('#popup_container #default_popup');
    }
    container.html('<div id="popup-progress" class="popup-progress"><div class="loading" style="text-align:center;padding:20px;"><i class="fa fa-refresh fa-spin fa-2x"></i></div></div>');
    $('#popup-progress').center();
    container.show();
    container.load(params.src, function() {
        popup = $(this).find('#base_modal');
        if (params.zindex) {
            popup.css('z-index', params.zindex);
        }
        $('html').css('overflow', 'hidden');
        popup.modal({
            'backdrop': 'static',
            'keyboard': false
        }).modal('show');
        popup.on('hidden.bs.modal', function() {
            $('html').css('overflow', 'auto');
        });
        var allowed_height = $(window).height() - 20;
        var popup_height = popup.height();
        if (params.top) {
            popup.css('top', params.top).css('margin-top', '0px');
        }
        if (params.width) {
            popup.find('.modal-dialog').css('width', params.width);
            if (params.width == 'auto') {
                popup.find('.modal-dialog').css('padding', '10px');
            }
        }
        if (params.callback) {
            params.callback();
        }
        try {
            $('#base_modal input, textarea').placeholder();
        } catch (exception) {}
    });
}
jQuery.fn.ue_modal = function() {
    $(this[0]).modal({
        'backdrop': true
    }).modal('show');
};

function UE_addMsg(msg, fixed) {
    if (fixed) {
        $.jGrowl(msg, {
            sticky: true
        });
    } else {
        $.jGrowl(msg);
    }
}

function isiPad() {
    return ((navigator.platform.indexOf("iPad") != -1) || (navigator.platform.indexOf("iPhone") != -1));
}

function destroyEditor(object) {
    if ($(object).data('redactor')) {
        $(object).destroyEditor();
        $(object).removeData();
    }
}

function initEditor(object, forum_id, focus) {
    lang = __globals['lang_code'];
    if (lang == 'kk') lang = 'ru';
    if (lang == 'uk') lang = 'ua';
    var exists_languages = ['ru', 'es', 'fr', 'de', 'nl', 'ua', 'ca', 'pl', 'ko', 'he'];
    if ($.inArray(lang, exists_languages) == -1) lang = 'en';
    if (lang == 'he') {
        direction = 'rtl';
    } else {
        direction = 'ltr';
    }
    if (typeof focus == 'undefined') focus = true;
    if (typeof forum_id == 'undefined') forum_id = 0;
    var plugins = ['fullscreen', 'table', 'video', 'clipboardPaste'];
    if (global_is_staff) {
        plugins.push("fontcolor");
    };
    var ue_save_content_url = "";
    if (__redactor_ueactions) {
        plugins.push("ueactions");
        current_form = $(object).closest("form#id_feedback_form");
        if (current_form.length) {
            topic_id = current_form.find("input#id_feedback_id").val();
            if (topic_id && topic_id != 0) {
                ue_save_content_url = "/actions/topic/save_description/" + topic_id + "/";
            }
        }
    }
    if (!is_old_ie()) {
        var redactor_settings = {
            lang: lang,
            direction: direction,
            autoformat: false,
            uesavecontenturl: ue_save_content_url,
            minHeight: 100,
            linkSize: 255,
            removeEmpty: false,
            buttons: [],
            plugins: plugins,
            path: '/s/assets/redactor/',
            formatting: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            imageLink: true,
            imageUpload: '/upload/content/image/' + forum_id + '/',
            clipboardUploadUrl: '/upload/content/image/' + forum_id + '/',
            clipboardUpload: true,
            imageUploadParam: 'content',
            imageUploadCallback: function(image, json) {
                $(image).attr('src', $(json).attr('filelink'));
                this.code.sync();
            },
            imageUploadErrorCallback: function(json) {
                UE_addMsg(json.error);
            },
            fileUpload: '/upload/content/file/' + forum_id + '/',
            fileUploadParam: 'content',
            fileUploadErrorCallback: function(json) {
                UE_addMsg(json.error);
            },
            fileUploadCallback: function(file, json) {
                $(file).addClass('i_item_file');
                $(file).html('<i class="icon-file"></i> ' + $(file).html());
                this.code.sync();
            },
            focus: focus,
            focusCallback: function(e) {},
            initCallback: function() {},
            replaceDivs: false
        }
        redactor_settings['buttons'] = ['html', '|', 'formatting', '|', 'bold', 'italic', 'underline', 'deleted', '|', 'unorderedlist', 'orderedlist', '|', 'image', 'video'];
        if (__file_upload) {
            redactor_settings['buttons'] = redactor_settings['buttons'].concat(['file']);
        }
        redactor_settings['buttons'] = redactor_settings['buttons'].concat(['table', 'link', '|', 'alignment', 'horizontalrule', 'fullscreen']);
        try {
            $(object).redactor('core.destroy');
        } catch (e) {};
        $(object).redactor(redactor_settings);
        var content = $(object).redactor('core.getEditor');
        content.addClass('ue-content');
        var toolbar = $(object).redactor('core.getToolbar');
        toolbar.find('.re-fullscreen').parent().css('float', 'right');
        ActiveEditor = object;
    } else {
        if (focus) {
            object.redactor('focus.setStart');
        }
    }
    if (focus) {}
}

function utexBlockquote(obj) {
    var range = obj.getInternalRange(),
        common = range.commonAncestorContainer,
        blockquote = obj.dom.getElement("blockquote");
    if (common.nodeType === 3) {
        common = common.parentNode;
    }
    if (blockquote && $(blockquote).hasClass("quote")) {
        $(common).unwrap();
    } else {
        if ("body" !== common.nodeName.toLowerCase()) {
            $(common).wrap("<blockquote/>");
        }
    }
}

function utexCode(obj) {
    var range = obj.getInternalRange(),
        common = range.commonAncestorContainer,
        blockquote = obj.dom.getElement("code");
    if (common.nodeType === 3) {
        common = common.parentNode;
    }
    if (blockquote && $(blockquote).hasClass("code")) {
        $(common).unwrap();
    } else {
        if ("body" !== common.nodeName.toLowerCase()) {
            $(common).wrap("<code/>");
        }
    }
}

function getUserEnv() {
    resolution = window.screen.availWidth + 'x' + window.screen.availHeight;
    user_agent = navigator.userAgent;
    f_version = getFlashVersion().replace(/\,/g, '.');
    data = {
        "resolution": resolution,
        "user_agent": user_agent,
        "flash_version": f_version
    };
    return data;
}

function getFlashVersion() {
    try {
        try {
            var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
            try {
                axo.AllowScriptAccess = 'always';
            } catch (e) {
                return '6.0.0';
            }
        } catch (e) {}
        return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
    } catch (e) {
        try {
            if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
            }
        } catch (e) {}
    }
    return '0.0.0';
}

function translationPopup(content_id, obj_id) {
    ue_modal({
        'src': '/modules/module/translation/dialog/' + content_id + '/' + obj_id + '/',
        'width': 'auto'
    });
}

function bingTranslate(text, langFrom, langTo, fCallback) {
    window.mycallback = fCallback;
    var s = document.createElement("script");
    s.src = "https://api.microsofttranslator.com/V2/Ajax.svc/Translate?oncomplete=mycallback&contentType=text/html&appId=2B7834CB257466412D83FAC6B3B3F13472D4883B&from=" + langFrom + "&to=" + langTo + "&text=" + encodeURI(text);
    document.getElementsByTagName("head")[0].appendChild(s);
}

function bingSuggest(link, text, lang, to_id) {
    $(link).button('loading');
    $('#' + to_id).click();
    bingTranslate(text, '', lang, function(result) {
        $('#' + to_id).val(result).focus();
        $(link).button('reset');
        if ($('#' + to_id).data('redactor'))
            $('#' + to_id).data('redactor').insert.set(result);
    });
}

function copyOrig(link, text, to_id) {
    $(link).button('loading');
    $('#' + to_id).click();
    $('#' + to_id).val(text).focus();
    $(link).button('reset');
    if ($('#' + to_id).data('redactor'))
        $('#' + to_id).data('redactor').insert.set(text);;
}
$(document).ready(function() {
    $('[action="sign-in"]').click(function() {
        showSigninPanel();
        return false;
    });
});
var avatars = new Array();

function load_avatar(user_id, size) {
    id = 'avatar_' + user_id + '_' + size;
    if (avatars[id]) {
        if (avatars[id] != 'load')
            $('.' + id).attr('style', 'background:url(' + avatars[id] + ');height:' + size + 'px;width:' + size + 'px;');
    } else {
        avatars[id] = 'load';
        $.ajax({
            url: '/user/' + user_id + '/avatar/' + size + '/'
        }).done(function(data) {
            id = 'avatar_' + data.user_id + '_' + data.size;
            avatars[id] = data.url;
            $('.' + id).attr('style', 'background:url(' + data.url + ');height:' + data.size + 'px;width:' + data.size + 'px;');
        });
    }
}

function toggleTopicActionlist(topic_id) {
    if (alist_visible) {
        hideActionList();
    } else {
        ue_inplace({
            'target': '#popup_container',
            'src': '/dialog/topic/actions/' + topic_id + '/',
            'callback': function() {
                $(".actionlist").css('display', 'block');
                alist_visible = true;
            }
        });
    }
    return false;
}

function hideActionList() {
    $(".actionlist").css('display', 'none');
    alist_visible = false;
    return false;
}
jQuery.fn.center = function() {
    this.css("position", "fixed");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2)) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
    $(window).scrollLeft()) + "px");
    return this;
}
var isVisible = false;
var clickedAway = false;
$(document).click(function(e) {
    if (isVisible & clickedAway) {
        $('.popover').hide();
        isVisible = clickedAway = false;
    } else {
        clickedAway = true;
    }
});

function setupImageZoom(selector) {
    selector.each(function(i, obj) {
        if ($(this).parent().is("a")) {
            $(this).css("cursor", "pointer");
            return true;
        } else {
            $(this).click(function() {
                if (!$(this).parent().is("a")) {
                    $(this).wrap('<a href="' + $(this).attr("src") + '" rel="lightbox" />');
                    $(this).parent('a').trigger('click');
                };
            });
        }
    });
}

function objectSubscribe() {
    $(this).button('loading');
    var type = $(this).attr('data-object-type');
    var object_id = $(this).attr('data-object-id');
    var action = $(this).hasClass('active') ? 0 : 1;
    if ($(this).attr('data-click-to-init')) {
        action = "get_status";
        $(this).removeAttr('data-click-to-init');
    }
    $.ajax({
        context: this,
        type: "POST",
        url: '/subscribe/' + type + '/' + object_id + '/' + action + '/',
        data: {},
        success: function(data) {
            $(this).removeClass('btn-success active').button('reset');
            if (data.is_subscribed) {
                $(this).addClass('btn-success active').find('span').html($(this).attr('data-following-text'));
            } else
                $(this).find('span').html($(this).attr('data-follow-text'));
            if (data.message) {
                UE_addMsg(data.message);
            }
            if (data.success == false && data.result == 0) {
                showSigninPanel();
            }
        },
        error: function(data) {
            $(this).removeClass('btn-success active').button('reset');
            UE_addMsg("Error");
        },
        dataType: "json"
    });
}
$(document).ready(function() {
    $("ul.dropdown-menu").css('max-height', $(window).height() - 50);
    $(document).on("click", "[data-action='user-moderation-info']", onUserModerationInfoClick);
    $(document).on("change", "[data-action='custom-checkbox-changed']", onCustomFieldCheckboxChange);
    if (jQuery().datepicker) {
        $.fn.datepicker.defaults.format = "yyyy-mm-dd";
        $.fn.datepicker.defaults.language = $('html').attr("lang");
        $.fn.datepicker.defaults.autoclose = true;
        $(".date").datepicker();
    }
});
$(window).resize(function() {
    $("ul.dropdown-menu").css('max-height', $(window).height() - 50);
});

function popupwindow(url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

function setUEPageHash(hash) {
    ue_page_hash = hash;
    location.href = '#' + hash;
};

function ueScrollTo(obj) {
    var target_offset = Math.abs($('#content-wrapper').offset().top - obj.offset().top) - 5;
    obj = $('#wrap').length ? $('#wrap') : $('#wrapper');
    obj.animate({
        scrollTop: target_offset
    }, 'slow');
}
var ue_page_hash = '';

function ueNavigateByHash() {
    var scrollObj = false;
    if (location.hash && '#' + ue_page_hash != location.hash) {
        var data = location.hash.substring(1).split('/');
        if (data.length > 2) {
            module_id = data[0];
            action = data[1];
            if (action == 'page') {
                page_id = data[2];
                mtopiclistChangeFeedbackPage(module_id, page_id);
                scroll = true;
                scrollObj = $('#' + module_id);
            } else if (action == 'category') {
                category_id = data[2];
                getSubcategories(category_id);
                scroll = true;
                scrollObj = $('#' + module_id);
            } else if (action == 'search') {
                var str = "";
                var i = 2;
                while (i < data.length) {
                    if (i > 2) {
                        str = str + '/';
                    }
                    str = str + decodeURIComponent(data[i]);
                    i++;
                }
                if (str) {
                    $('#' + module_id + ' .input-search').val(str);
                    msearchStartSearch(module_id, str);
                } else {
                    cancelSearch({}, module_id);
                }
                scroll = true;
                scrollObj = $('#' + module_id + ' .input-search');
            }
        }
    }
    if (scrollObj) {
        ueScrollTo(scrollObj);
    }
}

function onUserModerationInfoClick() {
    showUserModerationInfo($(this).closest('.topic-item,.comment-item'));
    return false;
}

function onCustomFieldCheckboxChange() {
    $('#' + $(this).attr("data-input-id")).val($(this).prop("checked") ? "on" : "");
    return false;
}
var __ajax_popover_timer__ = null;
$(document).on('mouseenter', '.ajax-popover', function() {
    if (__ajax_popover_timer__) clearTimeout(__ajax_popover_timer__);
    var e = $(this);
    __ajax_popover_timer__ = setTimeout(function() {
        __ajax_popover_timer__ = null;
        showAjaxPopover(e);
    }, 1000);
}).on('mouseleave', '.ajax-popover', function() {
    if (__ajax_popover_timer__) clearTimeout(__ajax_popover_timer__);
});

function showAjaxPopover(e) {
    $('.ajax-popover').popover('destroy');
    $('.popover').remove();
    if (e.data('popover-url')) {
        if (e.next('div.popover').length == 0) {
            e.popover({
                "html": true,
                "placement": "bottom",
                "content": '<div class="load-progress"><i class="fa fa-refresh fa-spin fa-2x"></i></div>'
            }).popover("show");
            $.get(e.data('popover-url'), function(data) {
                data = '<a class="window close">?</a>' + data;
                $('body .popover .popover-content').html(data);
                $('body .popover .popover-content .close').on("click", function(i) {
                    e.popover('hide');
                    $('.popover').remove();
                })
            });
        } else if (e.next('div.popover.in').length == 0) {
            e.next('div.popover').addClass("in");
        }
    }
}

function onParentComboboxChanged(obj) {
    value = $(obj).val();
    $("select[data-parent-id='" + $(obj).attr('id') + "']").each(function(i, obj) {
        $(obj).find("option").hide();
        $(obj).find("option[data-related-value='" + value + "']").add("option:not([data-related-value]").show();
        if (!$(obj).find("option:selected").is(":visible")) {
            $(obj).val("");
        }
    });
}

function ueShowLoader(loaderId) {
    if (loaderId) {} else {
        loaderId = "id_loading_progress"
    };
    $('#popup_container').append($('<div id="' + loaderId + '" class="popup-progress"><div class="loading" style="text-align:center;padding:20px;"><i class="fa fa-refresh fa-spin fa-2x"></i></div></div>'));
    $('#popup_container #' + loaderId).center().show();
}

function ueHideLoader(loaderId) {
    if (loaderId) {} else {
        loaderId = "id_loading_progress"
    };
    $('#popup_container #' + loaderId).remove();
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!(/^(GET|HEAD|OPTIONS|TRACE)$/).test(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
        }
    }
});

function ajaxEdit(args) {
    $(".has-error").removeClass('has-error');
    $(".help-block.error-description").remove();
    data = $(args.form).serialize();
    if (args.vars != null) data = data + args.vars;
    url = args.url;
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function(data) {
            if (data.success == true) {
                args.result(data);
            } else {
                ajaxEditFail(data);
                if (args.resulterr) {
                    args.resulterr(data);
                }
            }
        },
        error: function(data, status, error) {},
        dataType: 'json'
    });
    return false;
}

function ajaxEditFail(data) {
    $(".has-error").removeClass('has-error');
    for (var error in data.errors) {
        $("div.form-group:has('#id_" + error + "')").addClass('has-error');
    }
}

function ajaxLoad(args) {
    data = $(args.form).serialize();
    if (args.vars != null) data = data + args.vars;
    url = args.url;
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function(data) {
            $(args.place).append(data);
        },
        error: function(data) {},
        dataType: 'script'
    });
    return false;
}
if (!document.createElement("canvas").getContext) {
    (function() {
        var ab = Math;
        var n = ab.round;
        var l = ab.sin;
        var A = ab.cos;
        var H = ab.abs;
        var N = ab.sqrt;
        var d = 10;
        var f = d / 2;
        var z = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];

        function y() {
            return this.context_ || (this.context_ = new D(this))
        }
        var t = Array.prototype.slice;

        function g(j, m, p) {
            var i = t.call(arguments, 2);
            return function() {
                return j.apply(m, i.concat(t.call(arguments)))
            }
        }

        function af(i) {
            return String(i).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
        }

        function Y(m, j, i) {
            if (!m.namespaces[j]) {
                m.namespaces.add(j, i, "#default#VML")
            }
        }

        function R(j) {
            Y(j, "g_vml_", "urn:schemas-microsoft-com:vml");
            Y(j, "g_o_", "urn:schemas-microsoft-com:office:office");
            if (!j.styleSheets.ex_canvas_) {
                var i = j.createStyleSheet();
                i.owningElement.id = "ex_canvas_";
                i.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
            }
        }
        R(document);
        var e = {
            init: function(i) {
                var j = i || document;
                j.createElement("canvas");
                j.attachEvent("onreadystatechange", g(this.init_, this, j))
            },
            init_: function(p) {
                var m = p.getElementsByTagName("canvas");
                for (var j = 0; j < m.length; j++) {
                    this.initElement(m[j])
                }
            },
            initElement: function(j) {
                if (!j.getContext) {
                    j.getContext = y;
                    R(j.ownerDocument);
                    j.innerHTML = "";
                    j.attachEvent("onpropertychange", x);
                    j.attachEvent("onresize", W);
                    var i = j.attributes;
                    if (i.width && i.width.specified) {
                        j.style.width = i.width.nodeValue + "px"
                    } else {
                        j.width = j.clientWidth
                    }
                    if (i.height && i.height.specified) {
                        j.style.height = i.height.nodeValue + "px"
                    } else {
                        j.height = j.clientHeight
                    }
                }
                return j
            }
        };

        function x(j) {
            var i = j.srcElement;
            switch (j.propertyName) {
                case "width":
                    i.getContext().clearRect();
                    i.style.width = i.attributes.width.nodeValue + "px";
                    i.firstChild.style.width = i.clientWidth + "px";
                    break;
                case "height":
                    i.getContext().clearRect();
                    i.style.height = i.attributes.height.nodeValue + "px";
                    i.firstChild.style.height = i.clientHeight + "px";
                    break
            }
        }

        function W(j) {
            var i = j.srcElement;
            if (i.firstChild) {
                i.firstChild.style.width = i.clientWidth + "px";
                i.firstChild.style.height = i.clientHeight + "px"
            }
        }
        e.init();
        var k = [];
        for (var ae = 0; ae < 16; ae++) {
            for (var ad = 0; ad < 16; ad++) {
                k[ae * 16 + ad] = ae.toString(16) + ad.toString(16)
            }
        }

        function B() {
            return [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]
        }

        function J(p, m) {
            var j = B();
            for (var i = 0; i < 3; i++) {
                for (var ah = 0; ah < 3; ah++) {
                    var Z = 0;
                    for (var ag = 0; ag < 3; ag++) {
                        Z += p[i][ag] * m[ag][ah]
                    }
                    j[i][ah] = Z
                }
            }
            return j
        }

        function v(j, i) {
            i.fillStyle = j.fillStyle;
            i.lineCap = j.lineCap;
            i.lineJoin = j.lineJoin;
            i.lineWidth = j.lineWidth;
            i.miterLimit = j.miterLimit;
            i.shadowBlur = j.shadowBlur;
            i.shadowColor = j.shadowColor;
            i.shadowOffsetX = j.shadowOffsetX;
            i.shadowOffsetY = j.shadowOffsetY;
            i.strokeStyle = j.strokeStyle;
            i.globalAlpha = j.globalAlpha;
            i.font = j.font;
            i.textAlign = j.textAlign;
            i.textBaseline = j.textBaseline;
            i.arcScaleX_ = j.arcScaleX_;
            i.arcScaleY_ = j.arcScaleY_;
            i.lineScale_ = j.lineScale_
        }
        var b = {
            aliceblue: "#F0F8FF",
            antiquewhite: "#FAEBD7",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedalmond: "#FFEBCD",
            blueviolet: "#8A2BE2",
            brown: "#A52A2A",
            burlywood: "#DEB887",
            cadetblue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerblue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkblue: "#00008B",
            darkcyan: "#008B8B",
            darkgoldenrod: "#B8860B",
            darkgray: "#A9A9A9",
            darkgreen: "#006400",
            darkgrey: "#A9A9A9",
            darkkhaki: "#BDB76B",
            darkmagenta: "#8B008B",
            darkolivegreen: "#556B2F",
            darkorange: "#FF8C00",
            darkorchid: "#9932CC",
            darkred: "#8B0000",
            darksalmon: "#E9967A",
            darkseagreen: "#8FBC8F",
            darkslateblue: "#483D8B",
            darkslategray: "#2F4F4F",
            darkslategrey: "#2F4F4F",
            darkturquoise: "#00CED1",
            darkviolet: "#9400D3",
            deeppink: "#FF1493",
            deepskyblue: "#00BFFF",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1E90FF",
            firebrick: "#B22222",
            floralwhite: "#FFFAF0",
            forestgreen: "#228B22",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            grey: "#808080",
            greenyellow: "#ADFF2F",
            honeydew: "#F0FFF0",
            hotpink: "#FF69B4",
            indianred: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderblush: "#FFF0F5",
            lawngreen: "#7CFC00",
            lemonchiffon: "#FFFACD",
            lightblue: "#ADD8E6",
            lightcoral: "#F08080",
            lightcyan: "#E0FFFF",
            lightgoldenrodyellow: "#FAFAD2",
            lightgreen: "#90EE90",
            lightgrey: "#D3D3D3",
            lightpink: "#FFB6C1",
            lightsalmon: "#FFA07A",
            lightseagreen: "#20B2AA",
            lightskyblue: "#87CEFA",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#B0C4DE",
            lightyellow: "#FFFFE0",
            limegreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            mediumaquamarine: "#66CDAA",
            mediumblue: "#0000CD",
            mediumorchid: "#BA55D3",
            mediumpurple: "#9370DB",
            mediumseagreen: "#3CB371",
            mediumslateblue: "#7B68EE",
            mediumspringgreen: "#00FA9A",
            mediumturquoise: "#48D1CC",
            mediumvioletred: "#C71585",
            midnightblue: "#191970",
            mintcream: "#F5FFFA",
            mistyrose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajowhite: "#FFDEAD",
            oldlace: "#FDF5E6",
            olivedrab: "#6B8E23",
            orange: "#FFA500",
            orangered: "#FF4500",
            orchid: "#DA70D6",
            palegoldenrod: "#EEE8AA",
            palegreen: "#98FB98",
            paleturquoise: "#AFEEEE",
            palevioletred: "#DB7093",
            papayawhip: "#FFEFD5",
            peachpuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderblue: "#B0E0E6",
            rosybrown: "#BC8F8F",
            royalblue: "#4169E1",
            saddlebrown: "#8B4513",
            salmon: "#FA8072",
            sandybrown: "#F4A460",
            seagreen: "#2E8B57",
            seashell: "#FFF5EE",
            sienna: "#A0522D",
            skyblue: "#87CEEB",
            slateblue: "#6A5ACD",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#FFFAFA",
            springgreen: "#00FF7F",
            steelblue: "#4682B4",
            tan: "#D2B48C",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            whitesmoke: "#F5F5F5",
            yellowgreen: "#9ACD32"
        };

        function M(j) {
            var p = j.indexOf("(", 3);
            var i = j.indexOf(")", p + 1);
            var m = j.substring(p + 1, i).split(",");
            if (m.length != 4 || j.charAt(3) != "a") {
                m[3] = 1
            }
            return m
        }

        function c(i) {
            return parseFloat(i) / 100
        }

        function r(j, m, i) {
            return Math.min(i, Math.max(m, j))
        }

        function I(ag) {
            var i, ai, aj, ah, ak, Z;
            ah = parseFloat(ag[0]) / 360 % 360;
            if (ah < 0) {
                ah++
            }
            ak = r(c(ag[1]), 0, 1);
            Z = r(c(ag[2]), 0, 1);
            if (ak == 0) {
                i = ai = aj = Z
            } else {
                var j = Z < 0.5 ? Z * (1 + ak) : Z + ak - Z * ak;
                var m = 2 * Z - j;
                i = a(m, j, ah + 1 / 3);
                ai = a(m, j, ah);
                aj = a(m, j, ah - 1 / 3)
            }
            return "#" + k[Math.floor(i * 255)] + k[Math.floor(ai * 255)] + k[Math.floor(aj * 255)]
        }

        function a(j, i, m) {
            if (m < 0) {
                m++
            }
            if (m > 1) {
                m--
            }
            if (6 * m < 1) {
                return j + (i - j) * 6 * m
            } else {
                if (2 * m < 1) {
                    return i
                } else {
                    if (3 * m < 2) {
                        return j + (i - j) * (2 / 3 - m) * 6
                    } else {
                        return j
                    }
                }
            }
        }
        var C = {};

        function F(j) {
            if (j in C) {
                return C[j]
            }
            var ag, Z = 1;
            j = String(j);
            if (j.charAt(0) == "#") {
                ag = j
            } else {
                if (/^rgb/.test(j)) {
                    var p = M(j);
                    var ag = "#",
                        ah;
                    for (var m = 0; m < 3; m++) {
                        if (p[m].indexOf("%") != -1) {
                            ah = Math.floor(c(p[m]) * 255)
                        } else {
                            ah = +p[m]
                        }
                        ag += k[r(ah, 0, 255)]
                    }
                    Z = +p[3]
                } else {
                    if (/^hsl/.test(j)) {
                        var p = M(j);
                        ag = I(p);
                        Z = p[3]
                    } else {
                        ag = b[j] || j
                    }
                }
            }
            return C[j] = {
                color: ag,
                alpha: Z
            }
        }
        var o = {
            style: "normal",
            variant: "normal",
            weight: "normal",
            size: 10,
            family: "sans-serif"
        };
        var L = {};

        function E(i) {
            if (L[i]) {
                return L[i]
            }
            var p = document.createElement("div");
            var m = p.style;
            try {
                m.font = i
            } catch (j) {}
            return L[i] = {
                style: m.fontStyle || o.style,
                variant: m.fontVariant || o.variant,
                weight: m.fontWeight || o.weight,
                size: m.fontSize || o.size,
                family: m.fontFamily || o.family
            }
        }

        function u(m, j) {
            var i = {};
            for (var ah in m) {
                i[ah] = m[ah]
            }
            var ag = parseFloat(j.currentStyle.fontSize),
                Z = parseFloat(m.size);
            if (typeof m.size == "number") {
                i.size = m.size
            } else {
                if (m.size.indexOf("px") != -1) {
                    i.size = Z
                } else {
                    if (m.size.indexOf("em") != -1) {
                        i.size = ag * Z
                    } else {
                        if (m.size.indexOf("%") != -1) {
                            i.size = (ag / 100) * Z
                        } else {
                            if (m.size.indexOf("pt") != -1) {
                                i.size = Z / 0.75
                            } else {
                                i.size = ag
                            }
                        }
                    }
                }
            }
            i.size *= 0.981;
            return i
        }

        function ac(i) {
            return i.style + " " + i.variant + " " + i.weight + " " + i.size + "px " + i.family
        }
        var s = {
            butt: "flat",
            round: "round"
        };

        function S(i) {
            return s[i] || "square"
        }

        function D(i) {
            this.m_ = B();
            this.mStack_ = [];
            this.aStack_ = [];
            this.currentPath_ = [];
            this.strokeStyle = "#000";
            this.fillStyle = "#000";
            this.lineWidth = 1;
            this.lineJoin = "miter";
            this.lineCap = "butt";
            this.miterLimit = d * 1;
            this.globalAlpha = 1;
            this.font = "10px sans-serif";
            this.textAlign = "left";
            this.textBaseline = "alphabetic";
            this.canvas = i;
            var m = "width:" + i.clientWidth + "px;height:" + i.clientHeight + "px;overflow:hidden;position:absolute";
            var j = i.ownerDocument.createElement("div");
            j.style.cssText = m;
            i.appendChild(j);
            var p = j.cloneNode(false);
            p.style.backgroundColor = "red";
            p.style.filter = "alpha(opacity=0)";
            i.appendChild(p);
            this.element_ = j;
            this.arcScaleX_ = 1;
            this.arcScaleY_ = 1;
            this.lineScale_ = 1
        }
        var q = D.prototype;
        q.clearRect = function() {
            if (this.textMeasureEl_) {
                this.textMeasureEl_.removeNode(true);
                this.textMeasureEl_ = null
            }
            this.element_.innerHTML = ""
        };
        q.beginPath = function() {
            this.currentPath_ = []
        };
        q.moveTo = function(j, i) {
            var m = V(this, j, i);
            this.currentPath_.push({
                type: "moveTo",
                x: m.x,
                y: m.y
            });
            this.currentX_ = m.x;
            this.currentY_ = m.y
        };
        q.lineTo = function(j, i) {
            var m = V(this, j, i);
            this.currentPath_.push({
                type: "lineTo",
                x: m.x,
                y: m.y
            });
            this.currentX_ = m.x;
            this.currentY_ = m.y
        };
        q.bezierCurveTo = function(m, j, ak, aj, ai, ag) {
            var i = V(this, ai, ag);
            var ah = V(this, m, j);
            var Z = V(this, ak, aj);
            K(this, ah, Z, i)
        };

        function K(i, Z, m, j) {
            i.currentPath_.push({
                type: "bezierCurveTo",
                cp1x: Z.x,
                cp1y: Z.y,
                cp2x: m.x,
                cp2y: m.y,
                x: j.x,
                y: j.y
            });
            i.currentX_ = j.x;
            i.currentY_ = j.y
        }
        q.quadraticCurveTo = function(ai, m, j, i) {
            var ah = V(this, ai, m);
            var ag = V(this, j, i);
            var aj = {
                x: this.currentX_ + 2 / 3 * (ah.x - this.currentX_),
                y: this.currentY_ + 2 / 3 * (ah.y - this.currentY_)
            };
            var Z = {
                x: aj.x + (ag.x - this.currentX_) / 3,
                y: aj.y + (ag.y - this.currentY_) / 3
            };
            K(this, aj, Z, ag)
        };
        q.arc = function(al, aj, ak, ag, j, m) {
            ak *= d;
            var ap = m ? "at" : "wa";
            var am = al + A(ag) * ak - f;
            var ao = aj + l(ag) * ak - f;
            var i = al + A(j) * ak - f;
            var an = aj + l(j) * ak - f;
            if (am == i && !m) {
                am += 0.125
            }
            var Z = V(this, al, aj);
            var ai = V(this, am, ao);
            var ah = V(this, i, an);
            this.currentPath_.push({
                type: ap,
                x: Z.x,
                y: Z.y,
                radius: ak,
                xStart: ai.x,
                yStart: ai.y,
                xEnd: ah.x,
                yEnd: ah.y
            })
        };
        q.rect = function(m, j, i, p) {
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + p);
            this.lineTo(m, j + p);
            this.closePath()
        };
        q.strokeRect = function(m, j, i, p) {
            var Z = this.currentPath_;
            this.beginPath();
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + p);
            this.lineTo(m, j + p);
            this.closePath();
            this.stroke();
            this.currentPath_ = Z
        };
        q.fillRect = function(m, j, i, p) {
            var Z = this.currentPath_;
            this.beginPath();
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + p);
            this.lineTo(m, j + p);
            this.closePath();
            this.fill();
            this.currentPath_ = Z
        };
        q.createLinearGradient = function(j, p, i, m) {
            var Z = new U("gradient");
            Z.x0_ = j;
            Z.y0_ = p;
            Z.x1_ = i;
            Z.y1_ = m;
            return Z
        };
        q.createRadialGradient = function(p, ag, m, j, Z, i) {
            var ah = new U("gradientradial");
            ah.x0_ = p;
            ah.y0_ = ag;
            ah.r0_ = m;
            ah.x1_ = j;
            ah.y1_ = Z;
            ah.r1_ = i;
            return ah
        };
        q.drawImage = function(aq, m) {
            var aj, ah, al, ay, ao, am, at, aA;
            var ak = aq.runtimeStyle.width;
            var ap = aq.runtimeStyle.height;
            aq.runtimeStyle.width = "auto";
            aq.runtimeStyle.height = "auto";
            var ai = aq.width;
            var aw = aq.height;
            aq.runtimeStyle.width = ak;
            aq.runtimeStyle.height = ap;
            if (arguments.length == 3) {
                aj = arguments[1];
                ah = arguments[2];
                ao = am = 0;
                at = al = ai;
                aA = ay = aw
            } else {
                if (arguments.length == 5) {
                    aj = arguments[1];
                    ah = arguments[2];
                    al = arguments[3];
                    ay = arguments[4];
                    ao = am = 0;
                    at = ai;
                    aA = aw
                } else {
                    if (arguments.length == 9) {
                        ao = arguments[1];
                        am = arguments[2];
                        at = arguments[3];
                        aA = arguments[4];
                        aj = arguments[5];
                        ah = arguments[6];
                        al = arguments[7];
                        ay = arguments[8]
                    } else {
                        throw Error("Invalid number of arguments")
                    }
                }
            }
            var az = V(this, aj, ah);
            var p = at / 2;
            var j = aA / 2;
            var ax = [];
            var i = 10;
            var ag = 10;
            ax.push(" <g_vml_:group", ' coordsize="', d * i, ",", d * ag, '"', ' coordorigin="0,0"', ' style="width:', i, "px;height:", ag, "px;position:absolute;");
            if (this.m_[0][0] != 1 || this.m_[0][1] || this.m_[1][1] != 1 || this.m_[1][0]) {
                var Z = [];
                Z.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", n(az.x / d), ",", "Dy=", n(az.y / d), "");
                var av = az;
                var au = V(this, aj + al, ah);
                var ar = V(this, aj, ah + ay);
                var an = V(this, aj + al, ah + ay);
                av.x = ab.max(av.x, au.x, ar.x, an.x);
                av.y = ab.max(av.y, au.y, ar.y, an.y);
                ax.push("padding:0 ", n(av.x / d), "px ", n(av.y / d), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", Z.join(""), ", sizingmethod='clip');")
            } else {
                ax.push("top:", n(az.y / d), "px;left:", n(az.x / d), "px;")
            }
            ax.push(' ">', '<g_vml_:image src="', aq.src, '"', ' style="width:', d * al, "px;", " height:", d * ay, 'px"', ' cropleft="', ao / ai, '"', ' croptop="', am / aw, '"', ' cropright="', (ai - ao - at) / ai, '"', ' cropbottom="', (aw - am - aA) / aw, '"', " />", "</g_vml_:group>");
            this.element_.insertAdjacentHTML("BeforeEnd", ax.join(""))
        };
        q.stroke = function(ao) {
            var Z = 10;
            var ap = 10;
            var ag = 5000;
            var ai = {
                x: null,
                y: null
            };
            var an = {
                x: null,
                y: null
            };
            for (var aj = 0; aj < this.currentPath_.length; aj += ag) {
                var am = [];
                var ah = false;
                am.push("<g_vml_:shape", ' filled="', !!ao, '"', ' style="position:absolute;width:', Z, "px;height:", ap, 'px;"', ' coordorigin="0,0"', ' coordsize="', d * Z, ",", d * ap, '"', ' stroked="', !ao, '"', ' path="');
                var aq = false;
                for (var ak = aj; ak < Math.min(aj + ag, this.currentPath_.length); ak++) {
                    if (ak % ag == 0 && ak > 0) {
                        am.push(" m ", n(this.currentPath_[ak - 1].x), ",", n(this.currentPath_[ak - 1].y))
                    }
                    var m = this.currentPath_[ak];
                    var al;
                    switch (m.type) {
                        case "moveTo":
                            al = m;
                            am.push(" m ", n(m.x), ",", n(m.y));
                            break;
                        case "lineTo":
                            am.push(" l ", n(m.x), ",", n(m.y));
                            break;
                        case "close":
                            am.push(" x ");
                            m = null;
                            break;
                        case "bezierCurveTo":
                            am.push(" c ", n(m.cp1x), ",", n(m.cp1y), ",", n(m.cp2x), ",", n(m.cp2y), ",", n(m.x), ",", n(m.y));
                            break;
                        case "at":
                        case "wa":
                            am.push(" ", m.type, " ", n(m.x - this.arcScaleX_ * m.radius), ",", n(m.y - this.arcScaleY_ * m.radius), " ", n(m.x + this.arcScaleX_ * m.radius), ",", n(m.y + this.arcScaleY_ * m.radius), " ", n(m.xStart), ",", n(m.yStart), " ", n(m.xEnd), ",", n(m.yEnd));
                            break
                    }
                    if (m) {
                        if (ai.x == null || m.x < ai.x) {
                            ai.x = m.x
                        }
                        if (an.x == null || m.x > an.x) {
                            an.x = m.x
                        }
                        if (ai.y == null || m.y < ai.y) {
                            ai.y = m.y
                        }
                        if (an.y == null || m.y > an.y) {
                            an.y = m.y
                        }
                    }
                }
                am.push(' ">');
                if (!ao) {
                    w(this, am)
                } else {
                    G(this, am, ai, an)
                }
                am.push("</g_vml_:shape>");
                this.element_.insertAdjacentHTML("beforeEnd", am.join(""))
            }
        };

        function w(m, ag) {
            var j = F(m.strokeStyle);
            var p = j.color;
            var Z = j.alpha * m.globalAlpha;
            var i = m.lineScale_ * m.lineWidth;
            if (i < 1) {
                Z *= i
            }
            ag.push("<g_vml_:stroke", ' opacity="', Z, '"', ' joinstyle="', m.lineJoin, '"', ' miterlimit="', m.miterLimit, '"', ' endcap="', S(m.lineCap), '"', ' weight="', i, 'px"', ' color="', p, '" />')
        }

        function G(aq, ai, aK, ar) {
            var aj = aq.fillStyle;
            var aB = aq.arcScaleX_;
            var aA = aq.arcScaleY_;
            var j = ar.x - aK.x;
            var p = ar.y - aK.y;
            if (aj instanceof U) {
                var an = 0;
                var aF = {
                    x: 0,
                    y: 0
                };
                var ax = 0;
                var am = 1;
                if (aj.type_ == "gradient") {
                    var al = aj.x0_ / aB;
                    var m = aj.y0_ / aA;
                    var ak = aj.x1_ / aB;
                    var aM = aj.y1_ / aA;
                    var aJ = V(aq, al, m);
                    var aI = V(aq, ak, aM);
                    var ag = aI.x - aJ.x;
                    var Z = aI.y - aJ.y;
                    an = Math.atan2(ag, Z) * 180 / Math.PI;
                    if (an < 0) {
                        an += 360
                    }
                    if (an < 0.000001) {
                        an = 0
                    }
                } else {
                    var aJ = V(aq, aj.x0_, aj.y0_);
                    aF = {
                        x: (aJ.x - aK.x) / j,
                        y: (aJ.y - aK.y) / p
                    };
                    j /= aB * d;
                    p /= aA * d;
                    var aD = ab.max(j, p);
                    ax = 2 * aj.r0_ / aD;
                    am = 2 * aj.r1_ / aD - ax
                }
                var av = aj.colors_;
                av.sort(function(aN, i) {
                    return aN.offset - i.offset
                });
                var ap = av.length;
                var au = av[0].color;
                var at = av[ap - 1].color;
                var az = av[0].alpha * aq.globalAlpha;
                var ay = av[ap - 1].alpha * aq.globalAlpha;
                var aE = [];
                for (var aH = 0; aH < ap; aH++) {
                    var ao = av[aH];
                    aE.push(ao.offset * am + ax + " " + ao.color)
                }
                ai.push('<g_vml_:fill type="', aj.type_, '"', ' method="none" focus="100%"', ' color="', au, '"', ' color2="', at, '"', ' colors="', aE.join(","), '"', ' opacity="', ay, '"', ' g_o_:opacity2="', az, '"', ' angle="', an, '"', ' focusposition="', aF.x, ",", aF.y, '" />')
            } else {
                if (aj instanceof T) {
                    if (j && p) {
                        var ah = -aK.x;
                        var aC = -aK.y;
                        ai.push("<g_vml_:fill", ' position="', ah / j * aB * aB, ",", aC / p * aA * aA, '"', ' type="tile"', ' src="', aj.src_, '" />')
                    }
                } else {
                    var aL = F(aq.fillStyle);
                    var aw = aL.color;
                    var aG = aL.alpha * aq.globalAlpha;
                    ai.push('<g_vml_:fill color="', aw, '" opacity="', aG, '" />')
                }
            }
        }
        q.fill = function() {
            this.stroke(true)
        };
        q.closePath = function() {
            this.currentPath_.push({
                type: "close"
            })
        };

        function V(j, Z, p) {
            var i = j.m_;
            return {
                x: d * (Z * i[0][0] + p * i[1][0] + i[2][0]) - f,
                y: d * (Z * i[0][1] + p * i[1][1] + i[2][1]) - f
            }
        }
        q.save = function() {
            var i = {};
            v(this, i);
            this.aStack_.push(i);
            this.mStack_.push(this.m_);
            this.m_ = J(B(), this.m_)
        };
        q.restore = function() {
            if (this.aStack_.length) {
                v(this.aStack_.pop(), this);
                this.m_ = this.mStack_.pop()
            }
        };

        function h(i) {
            return isFinite(i[0][0]) && isFinite(i[0][1]) && isFinite(i[1][0]) && isFinite(i[1][1]) && isFinite(i[2][0]) && isFinite(i[2][1])
        }

        function aa(j, i, p) {
            if (!h(i)) {
                return
            }
            j.m_ = i;
            if (p) {
                var Z = i[0][0] * i[1][1] - i[0][1] * i[1][0];
                j.lineScale_ = N(H(Z))
            }
        }
        q.translate = function(m, j) {
            var i = [
                [1, 0, 0],
                [0, 1, 0],
                [m, j, 1]
            ];
            aa(this, J(i, this.m_), false)
        };
        q.rotate = function(j) {
            var p = A(j);
            var m = l(j);
            var i = [
                [p, m, 0],
                [-m, p, 0],
                [0, 0, 1]
            ];
            aa(this, J(i, this.m_), false)
        };
        q.scale = function(m, j) {
            this.arcScaleX_ *= m;
            this.arcScaleY_ *= j;
            var i = [
                [m, 0, 0],
                [0, j, 0],
                [0, 0, 1]
            ];
            aa(this, J(i, this.m_), true)
        };
        q.transform = function(Z, p, ah, ag, j, i) {
            var m = [
                [Z, p, 0],
                [ah, ag, 0],
                [j, i, 1]
            ];
            aa(this, J(m, this.m_), true)
        };
        q.setTransform = function(ag, Z, ai, ah, p, j) {
            var i = [
                [ag, Z, 0],
                [ai, ah, 0],
                [p, j, 1]
            ];
            aa(this, i, true)
        };
        q.drawText_ = function(am, ak, aj, ap, ai) {
            var ao = this.m_,
                at = 1000,
                j = 0,
                ar = at,
                ah = {
                    x: 0,
                    y: 0
                },
                ag = [];
            var i = u(E(this.font), this.element_);
            var p = ac(i);
            var au = this.element_.currentStyle;
            var Z = this.textAlign.toLowerCase();
            switch (Z) {
                case "left":
                case "center":
                case "right":
                    break;
                case "end":
                    Z = au.direction == "ltr" ? "right" : "left";
                    break;
                case "start":
                    Z = au.direction == "rtl" ? "right" : "left";
                    break;
                default:
                    Z = "left"
            }
            switch (this.textBaseline) {
                case "hanging":
                case "top":
                    ah.y = i.size / 1.75;
                    break;
                case "middle":
                    break;
                default:
                case null:
                case "alphabetic":
                case "ideographic":
                case "bottom":
                    ah.y = -i.size / 2.25;
                    break
            }
            switch (Z) {
                case "right":
                    j = at;
                    ar = 0.05;
                    break;
                case "center":
                    j = ar = at / 2;
                    break
            }
            var aq = V(this, ak + ah.x, aj + ah.y);
            ag.push('<g_vml_:line from="', -j, ' 0" to="', ar, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !ai, '" stroked="', !!ai, '" style="position:absolute;width:1px;height:1px;">');
            if (ai) {
                w(this, ag)
            } else {
                G(this, ag, {
                    x: -j,
                    y: 0
                }, {
                    x: ar,
                    y: i.size
                })
            }
            var an = ao[0][0].toFixed(3) + "," + ao[1][0].toFixed(3) + "," + ao[0][1].toFixed(3) + "," + ao[1][1].toFixed(3) + ",0,0";
            var al = n(aq.x / d) + "," + n(aq.y / d);
            ag.push('<g_vml_:skew on="t" matrix="', an, '" ', ' offset="', al, '" origin="', j, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', af(am), '" style="v-text-align:', Z, ";font:", af(p), '" /></g_vml_:line>');
            this.element_.insertAdjacentHTML("beforeEnd", ag.join(""))
        };
        q.fillText = function(m, i, p, j) {
            this.drawText_(m, i, p, j, false)
        };
        q.strokeText = function(m, i, p, j) {
            this.drawText_(m, i, p, j, true)
        };
        q.measureText = function(m) {
            if (!this.textMeasureEl_) {
                var i = '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
                this.element_.insertAdjacentHTML("beforeEnd", i);
                this.textMeasureEl_ = this.element_.lastChild
            }
            var j = this.element_.ownerDocument;
            this.textMeasureEl_.innerHTML = "";
            this.textMeasureEl_.style.font = this.font;
            this.textMeasureEl_.appendChild(j.createTextNode(m));
            return {
                width: this.textMeasureEl_.offsetWidth
            }
        };
        q.clip = function() {};
        q.arcTo = function() {};
        q.createPattern = function(j, i) {
            return new T(j, i)
        };

        function U(i) {
            this.type_ = i;
            this.x0_ = 0;
            this.y0_ = 0;
            this.r0_ = 0;
            this.x1_ = 0;
            this.y1_ = 0;
            this.r1_ = 0;
            this.colors_ = []
        }
        U.prototype.addColorStop = function(j, i) {
            i = F(i);
            this.colors_.push({
                offset: j,
                color: i.color,
                alpha: i.alpha
            })
        };

        function T(j, i) {
            Q(j);
            switch (i) {
                case "repeat":
                case null:
                case "":
                    this.repetition_ = "repeat";
                    break;
                case "repeat-x":
                case "repeat-y":
                case "no-repeat":
                    this.repetition_ = i;
                    break;
                default:
                    O("SYNTAX_ERR")
            }
            this.src_ = j.src;
            this.width_ = j.width;
            this.height_ = j.height
        }

        function O(i) {
            throw new P(i)
        }

        function Q(i) {
            if (!i || i.nodeType != 1 || i.tagName != "IMG") {
                O("TYPE_MISMATCH_ERR")
            }
            if (i.readyState != "complete") {
                O("INVALID_STATE_ERR")
            }
        }

        function P(i) {
            this.code = this[i];
            this.message = i + ": DOM Exception " + this.code
        }
        var X = P.prototype = new Error;
        X.INDEX_SIZE_ERR = 1;
        X.DOMSTRING_SIZE_ERR = 2;
        X.HIERARCHY_REQUEST_ERR = 3;
        X.WRONG_DOCUMENT_ERR = 4;
        X.INVALID_CHARACTER_ERR = 5;
        X.NO_DATA_ALLOWED_ERR = 6;
        X.NO_MODIFICATION_ALLOWED_ERR = 7;
        X.NOT_FOUND_ERR = 8;
        X.NOT_SUPPORTED_ERR = 9;
        X.INUSE_ATTRIBUTE_ERR = 10;
        X.INVALID_STATE_ERR = 11;
        X.SYNTAX_ERR = 12;
        X.INVALID_MODIFICATION_ERR = 13;
        X.NAMESPACE_ERR = 14;
        X.INVALID_ACCESS_ERR = 15;
        X.VALIDATION_ERR = 16;
        X.TYPE_MISMATCH_ERR = 17;
        G_vmlCanvasManager = e;
        CanvasRenderingContext2D = D;
        CanvasGradient = U;
        CanvasPattern = T;
        DOMException = P
    })()
};
(function(B) {
    B.color = {};
    B.color.make = function(F, E, C, D) {
        var G = {};
        G.r = F || 0;
        G.g = E || 0;
        G.b = C || 0;
        G.a = D != null ? D : 1;
        G.add = function(J, I) {
            for (var H = 0; H < J.length; ++H) {
                G[J.charAt(H)] += I
            }
            return G.normalize()
        };
        G.scale = function(J, I) {
            for (var H = 0; H < J.length; ++H) {
                G[J.charAt(H)] *= I
            }
            return G.normalize()
        };
        G.toString = function() {
            if (G.a >= 1) {
                return "rgb(" + [G.r, G.g, G.b].join(",") + ")"
            } else {
                return "rgba(" + [G.r, G.g, G.b, G.a].join(",") + ")"
            }
        };
        G.normalize = function() {
            function H(J, K, I) {
                return K < J ? J : (K > I ? I : K)
            }
            G.r = H(0, parseInt(G.r), 255);
            G.g = H(0, parseInt(G.g), 255);
            G.b = H(0, parseInt(G.b), 255);
            G.a = H(0, G.a, 1);
            return G
        };
        G.clone = function() {
            return B.color.make(G.r, G.b, G.g, G.a)
        };
        return G.normalize()
    };
    B.color.extract = function(D, C) {
        var E;
        do {
            E = D.css(C).toLowerCase();
            if (E != "" && E != "transparent") {
                break
            }
            D = D.parent()
        } while (!B.nodeName(D.get(0), "body"));
        if (E == "rgba(0, 0, 0, 0)") {
            E = "transparent"
        }
        return B.color.parse(E)
    };
    B.color.parse = function(F) {
        var E, C = B.color.make;
        if (E = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(F)) {
            return C(parseInt(E[1], 10), parseInt(E[2], 10), parseInt(E[3], 10))
        }
        if (E = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(F)) {
            return C(parseInt(E[1], 10), parseInt(E[2], 10), parseInt(E[3], 10), parseFloat(E[4]))
        }
        if (E = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(F)) {
            return C(parseFloat(E[1]) * 2.55, parseFloat(E[2]) * 2.55, parseFloat(E[3]) * 2.55)
        }
        if (E = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(F)) {
            return C(parseFloat(E[1]) * 2.55, parseFloat(E[2]) * 2.55, parseFloat(E[3]) * 2.55, parseFloat(E[4]))
        }
        if (E = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(F)) {
            return C(parseInt(E[1], 16), parseInt(E[2], 16), parseInt(E[3], 16))
        }
        if (E = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(F)) {
            return C(parseInt(E[1] + E[1], 16), parseInt(E[2] + E[2], 16), parseInt(E[3] + E[3], 16))
        }
        var D = B.trim(F).toLowerCase();
        if (D == "transparent") {
            return C(255, 255, 255, 0)
        } else {
            E = A[D] || [0, 0, 0];
            return C(E[0], E[1], E[2])
        }
    };
    var A = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
(function(a) {
    function c(b, c) {
        var d = c.children("." + b)[0];
        if (null == d && (d = document.createElement("canvas"), d.className = b, a(d).css({
                direction: "ltr",
                position: "absolute",
                left: 0,
                top: 0
            }).appendTo(c), !d.getContext)) {
            if (!window.G_vmlCanvasManager) throw Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
            d = window.G_vmlCanvasManager.initElement(d)
        }
        this.element = d;
        var e = this.context = d.getContext("2d"),
            f = window.devicePixelRatio || 1,
            g = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
        this.pixelRatio = f / g, this.resize(c.width(), c.height()), this.text = {}, this._textCache = {}
    }

    function d(b, d, f, g) {
        function v(a, b) {
            b = [u].concat(b);
            for (var c = 0; a.length > c; ++c) a[c].apply(this, b)
        }

        function w() {
            for (var b = {
                Canvas: c
            }, d = 0; g.length > d; ++d) {
                var e = g[d];
                e.init(u, b), e.options && a.extend(!0, i, e.options)
            }
        }

        function x(c) {
            a.extend(!0, i, c), null == i.xaxis.color && (i.xaxis.color = "" + a.color.parse(i.grid.color).scale("a", .22)), null == i.yaxis.color && (i.yaxis.color = "" + a.color.parse(i.grid.color).scale("a", .22)), null == i.xaxis.tickColor && (i.xaxis.tickColor = i.grid.tickColor || i.xaxis.color), null == i.yaxis.tickColor && (i.yaxis.tickColor = i.grid.tickColor || i.yaxis.color), null == i.grid.borderColor && (i.grid.borderColor = i.grid.color), null == i.grid.tickColor && (i.grid.tickColor = "" + a.color.parse(i.grid.color).scale("a", .22));
            var d, e, f, g = {
                style: b.css("font-style"),
                size: Math.round(.8 * (+b.css("font-size").replace("px", "") || 13)),
                variant: b.css("font-variant"),
                weight: b.css("font-weight"),
                family: b.css("font-family")
            };
            for (f = i.xaxes.length || 1, d = 0; f > d; ++d) e = a.extend(!0, {}, i.xaxis, i.xaxes[d]), i.xaxes[d] = e, e.font && (e.font = a.extend({}, g, e.font), e.font.color || (e.font.color = e.color));
            for (f = i.yaxes.length || 1, d = 0; f > d; ++d) e = a.extend(!0, {}, i.yaxis, i.yaxes[d]), i.yaxes[d] = e, e.font && (e.font = a.extend({}, g, e.font), e.font.color || (e.font.color = e.color));
            for (i.xaxis.noTicks && null == i.xaxis.ticks && (i.xaxis.ticks = i.xaxis.noTicks), i.yaxis.noTicks && null == i.yaxis.ticks && (i.yaxis.ticks = i.yaxis.noTicks), i.x2axis && (i.xaxes[1] = a.extend(!0, {}, i.xaxis, i.x2axis), i.xaxes[1].position = "top"), i.y2axis && (i.yaxes[1] = a.extend(!0, {}, i.yaxis, i.y2axis), i.yaxes[1].position = "right"), i.grid.coloredAreas && (i.grid.markings = i.grid.coloredAreas), i.grid.coloredAreasColor && (i.grid.markingsColor = i.grid.coloredAreasColor), i.lines && a.extend(!0, i.series.lines, i.lines), i.points && a.extend(!0, i.series.points, i.points), i.bars && a.extend(!0, i.series.bars, i.bars), null != i.shadowSize && (i.series.shadowSize = i.shadowSize), null != i.highlightColor && (i.series.highlightColor = i.highlightColor), d = 0; i.xaxes.length > d; ++d) E(o, d + 1).options = i.xaxes[d];
            for (d = 0; i.yaxes.length > d; ++d) E(p, d + 1).options = i.yaxes[d];
            for (var h in t) i.hooks[h] && i.hooks[h].length && (t[h] = t[h].concat(i.hooks[h]));
            v(t.processOptions, [i])
        }

        function y(a) {
            h = z(a), F(), G()
        }

        function z(b) {
            for (var c = [], d = 0; b.length > d; ++d) {
                var e = a.extend(!0, {}, i.series);
                null != b[d].data ? (e.data = b[d].data, delete b[d].data, a.extend(!0, e, b[d]), b[d].data = e.data) : e.data = b[d], c.push(e)
            }
            return c
        }

        function A(a, b) {
            var c = a[b + "axis"];
            return "object" == typeof c && (c = c.n), "number" != typeof c && (c = 1), c
        }

        function B() {
            return a.grep(o.concat(p), function(a) {
                return a
            })
        }

        function C(a) {
            var c, d, b = {};
            for (c = 0; o.length > c; ++c) d = o[c], d && d.used && (b["x" + d.n] = d.c2p(a.left));
            for (c = 0; p.length > c; ++c) d = p[c], d && d.used && (b["y" + d.n] = d.c2p(a.top));
            return void 0 !== b.x1 && (b.x = b.x1), void 0 !== b.y1 && (b.y = b.y1), b
        }

        function D(a) {
            var c, d, e, b = {};
            for (c = 0; o.length > c; ++c)
                if (d = o[c], d && d.used && (e = "x" + d.n, null == a[e] && 1 == d.n && (e = "x"), null != a[e])) {
                    b.left = d.p2c(a[e]);
                    break
                }
            for (c = 0; p.length > c; ++c)
                if (d = p[c], d && d.used && (e = "y" + d.n, null == a[e] && 1 == d.n && (e = "y"), null != a[e])) {
                    b.top = d.p2c(a[e]);
                    break
                }
            return b
        }

        function E(b, c) {
            return b[c - 1] || (b[c - 1] = {
                n: c,
                direction: b == o ? "x" : "y",
                options: a.extend(!0, {}, b == o ? i.xaxis : i.yaxis)
            }), b[c - 1]
        }

        function F() {
            var d, b = h.length,
                c = -1;
            for (d = 0; h.length > d; ++d) {
                var e = h[d].color;
                null != e && (b--, "number" == typeof e && e > c && (c = e))
            }
            c >= b && (b = c + 1);
            var f, g = [],
                j = i.colors,
                k = j.length,
                l = 0;
            for (d = 0; b > d; d++) f = a.color.parse(j[d % k] || "#666"), 0 == d % k && d && (l = l >= 0 ? .5 > l ? -l - .2 : 0 : -l), g[d] = f.scale("rgb", 1 + l);
            var n, m = 0;
            for (d = 0; h.length > d; ++d) {
                if (n = h[d], null == n.color ? (n.color = "" + g[m], ++m) : "number" == typeof n.color && (n.color = "" + g[n.color]), null == n.lines.show) {
                    var q, r = !0;
                    for (q in n)
                        if (n[q] && n[q].show) {
                            r = !1;
                            break
                        }
                    r && (n.lines.show = !0)
                }
                null == n.lines.zero && (n.lines.zero = !!n.lines.fill), n.xaxis = E(o, A(n, "x")), n.yaxis = E(p, A(n, "y"))
            }
        }

        function G() {
            function x(a, b, c) {
                a.datamin > b && b != -d && (a.datamin = b), c > a.datamax && c != d && (a.datamax = c)
            }
            var e, f, g, i, k, l, m, q, r, s, u, w, b = Number.POSITIVE_INFINITY,
                c = Number.NEGATIVE_INFINITY,
                d = Number.MAX_VALUE;
            for (a.each(B(), function(a, d) {
                d.datamin = b, d.datamax = c, d.used = !1
            }), e = 0; h.length > e; ++e) k = h[e], k.datapoints = {
                points: []
            }, v(t.processRawData, [k, k.data, k.datapoints]);
            for (e = 0; h.length > e; ++e) {
                if (k = h[e], u = k.data, w = k.datapoints.format, !w) {
                    if (w = [], w.push({
                            x: !0,
                            number: !0,
                            required: !0
                        }), w.push({
                            y: !0,
                            number: !0,
                            required: !0
                        }), k.bars.show || k.lines.show && k.lines.fill) {
                        var y = !!(k.bars.show && k.bars.zero || k.lines.show && k.lines.zero);
                        w.push({
                            y: !0,
                            number: !0,
                            required: !1,
                            defaultValue: 0,
                            autoscale: y
                        }), k.bars.horizontal && (delete w[w.length - 1].y, w[w.length - 1].x = !0)
                    }
                    k.datapoints.format = w
                }
                if (null == k.datapoints.pointsize) {
                    k.datapoints.pointsize = w.length, m = k.datapoints.pointsize, l = k.datapoints.points;
                    var z = k.lines.show && k.lines.steps;
                    for (k.xaxis.used = k.yaxis.used = !0, f = g = 0; u.length > f; ++f, g += m) {
                        s = u[f];
                        var A = null == s;
                        if (!A)
                            for (i = 0; m > i; ++i) q = s[i], r = w[i], r && (r.number && null != q && (q = +q, isNaN(q) ? q = null : 1 / 0 == q ? q = d : q == -1 / 0 && (q = -d)), null == q && (r.required && (A = !0), null != r.defaultValue && (q = r.defaultValue))), l[g + i] = q;
                        if (A)
                            for (i = 0; m > i; ++i) q = l[g + i], null != q && (r = w[i], r.x && x(k.xaxis, q, q), r.y && x(k.yaxis, q, q)), l[g + i] = null;
                        else if (z && g > 0 && null != l[g - m] && l[g - m] != l[g] && l[g - m + 1] != l[g + 1]) {
                            for (i = 0; m > i; ++i) l[g + m + i] = l[g + i];
                            l[g + 1] = l[g - m + 1], g += m
                        }
                    }
                }
            }
            for (e = 0; h.length > e; ++e) k = h[e], v(t.processDatapoints, [k, k.datapoints]);
            for (e = 0; h.length > e; ++e) {
                k = h[e], l = k.datapoints.points, m = k.datapoints.pointsize, w = k.datapoints.format;
                var C = b,
                    D = b,
                    E = c,
                    F = c;
                for (f = 0; l.length > f; f += m)
                    if (null != l[f])
                        for (i = 0; m > i; ++i) q = l[f + i], r = w[i], r && r.autoscale !== !1 && q != d && q != -d && (r.x && (C > q && (C = q), q > E && (E = q)), r.y && (D > q && (D = q), q > F && (F = q)));
                if (k.bars.show) {
                    var G;
                    switch (k.bars.align) {
                        case "left":
                            G = 0;
                            break;
                        case "right":
                            G = -k.bars.barWidth;
                            break;
                        case "center":
                            G = -k.bars.barWidth / 2;
                            break;
                        default:
                            throw Error("Invalid bar alignment: " + k.bars.align)
                    }
                    k.bars.horizontal ? (D += G, F += G + k.bars.barWidth) : (C += G, E += G + k.bars.barWidth)
                }
                x(k.xaxis, C, E), x(k.yaxis, D, F)
            }
            a.each(B(), function(a, d) {
                d.datamin == b && (d.datamin = null), d.datamax == c && (d.datamax = null)
            })
        }

        function H() {
            b.css("padding", 0).children(":not(.flot-base,.flot-overlay)").remove(), "static" == b.css("position") && b.css("position", "relative"), j = new c("flot-base", b), k = new c("flot-overlay", b), m = j.context, n = k.context, l = a(k.element).unbind();
            var d = b.data("plot");
            d && (d.shutdown(), k.clear()), b.data("plot", u)
        }

        function I() {
            i.grid.hoverable && (l.mousemove(hb), l.bind("mouseleave", ib)), i.grid.clickable && l.click(jb), v(t.bindEvents, [l])
        }

        function J() {
            fb && clearTimeout(fb), l.unbind("mousemove", hb), l.unbind("mouseleave", ib), l.unbind("click", jb), v(t.shutdown, [l])
        }

        function K(a) {
            function b(a) {
                return a
            }
            var c, d, e = a.options.transform || b,
                f = a.options.inverseTransform;
            "x" == a.direction ? (c = a.scale = r / Math.abs(e(a.max) - e(a.min)), d = Math.min(e(a.max), e(a.min))) : (c = a.scale = s / Math.abs(e(a.max) - e(a.min)), c = -c, d = Math.max(e(a.max), e(a.min))), a.p2c = e == b ? function(a) {
                return (a - d) * c
            } : function(a) {
                return (e(a) - d) * c
            }, a.c2p = f ? function(a) {
                return f(d + a / c)
            } : function(a) {
                return d + a / c
            }
        }

        function L(a) {
            for (var b = a.options, c = a.ticks || [], d = b.labelWidth || 0, e = b.labelHeight || 0, f = a.direction + "Axis " + a.direction + a.n + "Axis", g = "flot-" + a.direction + "-axis flot-" + a.direction + a.n + "-axis " + f, h = b.font || "flot-tick-label tickLabel", i = 0; c.length > i; ++i) {
                var k = c[i];
                if (k.label) {
                    var l = j.getTextInfo(g, k.label, h);
                    null == b.labelWidth && (d = Math.max(d, l.width)), null == b.labelHeight && (e = Math.max(e, l.height))
                }
            }
            a.labelWidth = Math.ceil(d), a.labelHeight = Math.ceil(e)
        }

        function M(b) {
            var m, c = b.labelWidth,
                d = b.labelHeight,
                e = b.options.position,
                f = b.options.tickLength,
                g = i.grid.axisMargin,
                h = i.grid.labelMargin,
                k = "x" == b.direction ? o : p,
                n = a.grep(k, function(a) {
                    return a && a.options.position == e && a.reserveSpace
                });
            if (a.inArray(b, n) == n.length - 1 && (g = 0), null == f) {
                var r = a.grep(k, function(a) {
                    return a && a.reserveSpace
                });
                m = 0 == a.inArray(b, r), f = m ? "full" : 5
            }
            isNaN(+f) || (h += +f), "x" == b.direction ? (d += h, "bottom" == e ? (q.bottom += d + g, b.box = {
                top: j.height - q.bottom,
                height: d
            }) : (b.box = {
                top: q.top + g,
                height: d
            }, q.top += d + g)) : (c += h, "left" == e ? (b.box = {
                left: q.left + g,
                width: c
            }, q.left += c + g) : (q.right += c + g, b.box = {
                left: j.width - q.right,
                width: c
            })), b.position = e, b.tickLength = f, b.box.padding = h, b.innermost = m
        }

        function N(a) {
            "x" == a.direction ? (a.box.left = q.left - a.labelWidth / 2, a.box.width = j.width - q.left - q.right + a.labelWidth) : (a.box.top = q.top - a.labelHeight / 2, a.box.height = j.height - q.bottom - q.top + a.labelHeight)
        }

        function O() {
            var d, b = i.grid.minBorderMargin,
                c = {
                    x: 0,
                    y: 0
                };
            if (null == b)
                for (b = 0, d = 0; h.length > d; ++d) b = Math.max(b, 2 * (h[d].points.radius + h[d].points.lineWidth / 2));
            c.x = c.y = Math.ceil(b), a.each(B(), function(a, b) {
                var d = b.direction;
                b.reserveSpace && (c[d] = Math.ceil(Math.max(c[d], ("x" == d ? b.labelWidth : b.labelHeight) / 2)))
            }), q.left = Math.max(c.x, q.left), q.right = Math.max(c.x, q.right), q.top = Math.max(c.y, q.top), q.bottom = Math.max(c.y, q.bottom)
        }

        function P() {
            var b, c = B(),
                d = i.grid.show;
            for (var e in q) {
                var f = i.grid.margin || 0;
                q[e] = "number" == typeof f ? f : f[e] || 0
            }
            v(t.processOffset, [q]);
            for (var e in q) q[e] += "object" == typeof i.grid.borderWidth ? d ? i.grid.borderWidth[e] : 0 : d ? i.grid.borderWidth : 0;
            if (a.each(c, function(a, b) {
                    b.show = b.options.show, null == b.show && (b.show = b.used), b.reserveSpace = b.show || b.options.reserveSpace, Q(b)
                }), d) {
                var g = a.grep(c, function(a) {
                    return a.reserveSpace
                });
                for (a.each(g, function(a, b) {
                    R(b), S(b), T(b, b.ticks), L(b)
                }), b = g.length - 1; b >= 0; --b) M(g[b]);
                O(), a.each(g, function(a, b) {
                    N(b)
                })
            }
            r = j.width - q.left - q.right, s = j.height - q.bottom - q.top, a.each(c, function(a, b) {
                K(b)
            }), d && Y(), db()
        }

        function Q(a) {
            var b = a.options,
                c = +(null != b.min ? b.min : a.datamin),
                d = +(null != b.max ? b.max : a.datamax),
                e = d - c;
            if (0 == e) {
                var f = 0 == d ? 1 : .01;
                null == b.min && (c -= f), (null == b.max || null != b.min) && (d += f)
            } else {
                var g = b.autoscaleMargin;
                null != g && (null == b.min && (c -= e * g, 0 > c && null != a.datamin && a.datamin >= 0 && (c = 0)), null == b.max && (d += e * g, d > 0 && null != a.datamax && 0 >= a.datamax && (d = 0)))
            }
            a.min = c, a.max = d
        }

        function R(b) {
            var d, c = b.options;
            if (d = "number" == typeof c.ticks && c.ticks > 0 ? c.ticks : .3 * Math.sqrt("x" == b.direction ? j.width : j.height), b.delta = (b.max - b.min) / d, "time" == c.mode && !b.tickGenerator) throw Error("Time mode requires the flot.time plugin.");
            if (b.tickGenerator || (b.tickGenerator = function(a) {
                    var b = c.tickDecimals,
                        d = -Math.floor(Math.log(a.delta) / Math.LN10);
                    null != b && d > b && (d = b);
                    var h, j, m, f = Math.pow(10, -d),
                        g = a.delta / f,
                        i = [],
                        k = 0,
                        l = Number.NaN;
                    1.5 > g ? h = 1 : 3 > g ? (h = 2, g > 2.25 && (null == b || b >= d + 1) && (h = 2.5, ++d)) : h = 7.5 > g ? 5 : 10, h *= f, null != c.minTickSize && c.minTickSize > h && (h = c.minTickSize), a.tickDecimals = Math.max(0, null != b ? b : d), a.tickSize = c.tickSize || h, j = e(a.min, a.tickSize);
                    do m = l, l = j + k * a.tickSize, i.push(l), ++k; while (a.max > l && l != m);
                    return i
                }, b.tickFormatter = function(a, b) {
                    var c = b.tickDecimals ? Math.pow(10, b.tickDecimals) : 1,
                        d = "" + Math.round(a * c) / c;
                    if (null != b.tickDecimals) {
                        var e = d.indexOf("."),
                            f = -1 == e ? 0 : d.length - e - 1;
                        if (b.tickDecimals > f) return (f ? d : d + ".") + ("" + c).substr(1, b.tickDecimals - f)
                    }
                    return d
                }), a.isFunction(c.tickFormatter) && (b.tickFormatter = function(a, b) {
                    return "" + c.tickFormatter(a, b)
                }), null != c.alignTicksWithAxis) {
                var f = ("x" == b.direction ? o : p)[c.alignTicksWithAxis - 1];
                if (f && f.used && f != b) {
                    var g = b.tickGenerator(b);
                    if (g.length > 0 && (null == c.min && (b.min = Math.min(b.min, g[0])), null == c.max && g.length > 1 && (b.max = Math.max(b.max, g[g.length - 1]))), b.tickGenerator = function(a) {
                            var c, d, b = [];
                            for (d = 0; f.ticks.length > d; ++d) c = (f.ticks[d].v - f.min) / (f.max - f.min), c = a.min + c * (a.max - a.min), b.push(c);
                            return b
                        }, !b.mode && null == c.tickDecimals) {
                        var h = Math.max(0, -Math.floor(Math.log(b.delta) / Math.LN10) + 1),
                            i = b.tickGenerator(b);
                        i.length > 1 && /\..*0$/.test((i[1] - i[0]).toFixed(h)) || (b.tickDecimals = h)
                    }
                }
            }
        }

        function S(b) {
            var c = b.options.ticks,
                d = [];
            null == c || "number" == typeof c && c > 0 ? d = b.tickGenerator(b) : c && (d = a.isFunction(c) ? c(b) : c);
            var e, f;
            for (b.ticks = [], e = 0; d.length > e; ++e) {
                var g = null,
                    h = d[e];
                "object" == typeof h ? (f = +h[0], h.length > 1 && (g = h[1])) : f = +h, null == g && (g = b.tickFormatter(f, b)), isNaN(f) || b.ticks.push({
                    v: f,
                    label: g
                })
            }
        }

        function T(a, b) {
            a.options.autoscaleMargin && b.length > 0 && (null == a.options.min && (a.min = Math.min(a.min, b[0].v)), null == a.options.max && b.length > 1 && (a.max = Math.max(a.max, b[b.length - 1].v)))
        }

        function U() {
            j.clear(), v(t.drawBackground, [m]);
            var a = i.grid;
            a.show && a.backgroundColor && W(), a.show && !a.aboveData && X();
            for (var b = 0; h.length > b; ++b) v(t.drawSeries, [m, h[b]]), Z(h[b]);
            v(t.draw, [m]), a.show && a.aboveData && X(), j.render()
        }

        function V(a, b) {
            for (var c, d, e, f, g = B(), h = 0; g.length > h; ++h)
                if (c = g[h], c.direction == b && (f = b + c.n + "axis", a[f] || 1 != c.n || (f = b + "axis"), a[f])) {
                    d = a[f].from, e = a[f].to;
                    break
                }
            if (a[f] || (c = "x" == b ? o[0] : p[0], d = a[b + "1"], e = a[b + "2"]), null != d && null != e && d > e) {
                var i = d;
                d = e, e = i
            }
            return {
                from: d,
                to: e,
                axis: c
            }
        }

        function W() {
            m.save(), m.translate(q.left, q.top), m.fillStyle = sb(i.grid.backgroundColor, s, 0, "rgba(255, 255, 255, 0)"), m.fillRect(0, 0, r, s), m.restore()
        }

        function X() {
            var b, c, d, e;
            m.save(), m.translate(q.left, q.top);
            var f = i.grid.markings;
            if (f)
                for (a.isFunction(f) && (c = u.getAxes(), c.xmin = c.xaxis.min, c.xmax = c.xaxis.max, c.ymin = c.yaxis.min, c.ymax = c.yaxis.max, f = f(c)), b = 0; f.length > b; ++b) {
                    var g = f[b],
                        h = V(g, "x"),
                        j = V(g, "y");
                    null == h.from && (h.from = h.axis.min), null == h.to && (h.to = h.axis.max), null == j.from && (j.from = j.axis.min), null == j.to && (j.to = j.axis.max), h.to < h.axis.min || h.from > h.axis.max || j.to < j.axis.min || j.from > j.axis.max || (h.from = Math.max(h.from, h.axis.min), h.to = Math.min(h.to, h.axis.max), j.from = Math.max(j.from, j.axis.min), j.to = Math.min(j.to, j.axis.max), (h.from != h.to || j.from != j.to) && (h.from = h.axis.p2c(h.from), h.to = h.axis.p2c(h.to), j.from = j.axis.p2c(j.from), j.to = j.axis.p2c(j.to), h.from == h.to || j.from == j.to ? (m.beginPath(), m.strokeStyle = g.color || i.grid.markingsColor, m.lineWidth = g.lineWidth || i.grid.markingsLineWidth, m.moveTo(h.from, j.from), m.lineTo(h.to, j.to), m.stroke()) : (m.fillStyle = g.color || i.grid.markingsColor, m.fillRect(h.from, j.to, h.to - h.from, j.from - j.to))))
                }
            c = B(), d = i.grid.borderWidth;
            for (var k = 0; c.length > k; ++k) {
                var p, t, v, w, l = c[k],
                    n = l.box,
                    o = l.tickLength;
                if (l.show && 0 != l.ticks.length) {
                    for (m.lineWidth = 1, "x" == l.direction ? (p = 0, t = "full" == o ? "top" == l.position ? 0 : s : n.top - q.top + ("top" == l.position ? n.height : 0)) : (t = 0, p = "full" == o ? "left" == l.position ? 0 : r : n.left - q.left + ("left" == l.position ? n.width : 0)), l.innermost || (m.strokeStyle = l.options.color, m.beginPath(), v = w = 0, "x" == l.direction ? v = r + 1 : w = s + 1, 1 == m.lineWidth && ("x" == l.direction ? t = Math.floor(t) + .5 : p = Math.floor(p) + .5), m.moveTo(p, t), m.lineTo(p + v, t + w), m.stroke()), m.strokeStyle = l.options.tickColor, m.beginPath(), b = 0; l.ticks.length > b; ++b) {
                        var x = l.ticks[b].v;
                        v = w = 0, isNaN(x) || l.min > x || x > l.max || "full" == o && ("object" == typeof d && d[l.position] > 0 || d > 0) && (x == l.min || x == l.max) || ("x" == l.direction ? (p = l.p2c(x), w = "full" == o ? -s : o, "top" == l.position && (w = -w)) : (t = l.p2c(x), v = "full" == o ? -r : o, "left" == l.position && (v = -v)), 1 == m.lineWidth && ("x" == l.direction ? p = Math.floor(p) + .5 : t = Math.floor(t) + .5), m.moveTo(p, t), m.lineTo(p + v, t + w))
                    }
                    m.stroke()
                }
            }
            d && (e = i.grid.borderColor, "object" == typeof d || "object" == typeof e ? ("object" != typeof d && (d = {
                top: d,
                right: d,
                bottom: d,
                left: d
            }), "object" != typeof e && (e = {
                top: e,
                right: e,
                bottom: e,
                left: e
            }), d.top > 0 && (m.strokeStyle = e.top, m.lineWidth = d.top, m.beginPath(), m.moveTo(0 - d.left, 0 - d.top / 2), m.lineTo(r, 0 - d.top / 2), m.stroke()), d.right > 0 && (m.strokeStyle = e.right, m.lineWidth = d.right, m.beginPath(), m.moveTo(r + d.right / 2, 0 - d.top), m.lineTo(r + d.right / 2, s), m.stroke()), d.bottom > 0 && (m.strokeStyle = e.bottom, m.lineWidth = d.bottom, m.beginPath(), m.moveTo(r + d.right, s + d.bottom / 2), m.lineTo(0, s + d.bottom / 2), m.stroke()), d.left > 0 && (m.strokeStyle = e.left, m.lineWidth = d.left, m.beginPath(), m.moveTo(0 - d.left / 2, s + d.bottom), m.lineTo(0 - d.left / 2, 0), m.stroke())) : (m.lineWidth = d, m.strokeStyle = i.grid.borderColor, m.strokeRect(-d / 2, -d / 2, r + d, s + d))), m.restore()
        }

        function Y() {
            a.each(B(), function(a, b) {
                if (b.show && 0 != b.ticks.length) {
                    var g, h, i, k, l, c = b.box,
                        d = b.direction + "Axis " + b.direction + b.n + "Axis",
                        e = "flot-" + b.direction + "-axis flot-" + b.direction + b.n + "-axis " + d,
                        f = b.options.font || "flot-tick-label tickLabel";
                    j.removeText(e);
                    for (var m = 0; b.ticks.length > m; ++m) g = b.ticks[m], !g.label || g.v < b.min || g.v > b.max || ("x" == b.direction ? (k = "center", h = q.left + b.p2c(g.v), "bottom" == b.position ? i = c.top + c.padding : (i = c.top + c.height - c.padding, l = "bottom")) : (l = "middle", i = q.top + b.p2c(g.v), "left" == b.position ? (h = c.left + c.width - c.padding, k = "right") : h = c.left + c.padding), j.addText(e, h, i, g.label, f, null, k, l))
                }
            })
        }

        function Z(a) {
            a.lines.show && $(a), a.bars.show && bb(a), a.points.show && _(a)
        }

        function $(a) {
            function b(a, b, c, d, e) {
                var f = a.points,
                    g = a.pointsize,
                    h = null,
                    i = null;
                m.beginPath();
                for (var j = g; f.length > j; j += g) {
                    var k = f[j - g],
                        l = f[j - g + 1],
                        n = f[j],
                        o = f[j + 1];
                    if (null != k && null != n) {
                        if (o >= l && e.min > l) {
                            if (e.min > o) continue;
                            k = (e.min - l) / (o - l) * (n - k) + k, l = e.min
                        } else if (l >= o && e.min > o) {
                            if (e.min > l) continue;
                            n = (e.min - l) / (o - l) * (n - k) + k, o = e.min
                        }
                        if (l >= o && l > e.max) {
                            if (o > e.max) continue;
                            k = (e.max - l) / (o - l) * (n - k) + k, l = e.max
                        } else if (o >= l && o > e.max) {
                            if (l > e.max) continue;
                            n = (e.max - l) / (o - l) * (n - k) + k, o = e.max
                        }
                        if (n >= k && d.min > k) {
                            if (d.min > n) continue;
                            l = (d.min - k) / (n - k) * (o - l) + l, k = d.min
                        } else if (k >= n && d.min > n) {
                            if (d.min > k) continue;
                            o = (d.min - k) / (n - k) * (o - l) + l, n = d.min
                        }
                        if (k >= n && k > d.max) {
                            if (n > d.max) continue;
                            l = (d.max - k) / (n - k) * (o - l) + l, k = d.max
                        } else if (n >= k && n > d.max) {
                            if (k > d.max) continue;
                            o = (d.max - k) / (n - k) * (o - l) + l, n = d.max
                        }(k != h || l != i) && m.moveTo(d.p2c(k) + b, e.p2c(l) + c), h = n, i = o, m.lineTo(d.p2c(n) + b, e.p2c(o) + c)
                    }
                }
                m.stroke()
            }

            function c(a, b, c) {
                for (var d = a.points, e = a.pointsize, f = Math.min(Math.max(0, c.min), c.max), g = 0, i = !1, j = 1, k = 0, l = 0;;) {
                    if (e > 0 && g > d.length + e) break;
                    g += e;
                    var n = d[g - e],
                        o = d[g - e + j],
                        p = d[g],
                        q = d[g + j];
                    if (i) {
                        if (e > 0 && null != n && null == p) {
                            l = g, e = -e, j = 2;
                            continue
                        }
                        if (0 > e && g == k + e) {
                            m.fill(), i = !1, e = -e, j = 1, g = k = l + e;
                            continue
                        }
                    }
                    if (null != n && null != p) {
                        if (p >= n && b.min > n) {
                            if (b.min > p) continue;
                            o = (b.min - n) / (p - n) * (q - o) + o, n = b.min
                        } else if (n >= p && b.min > p) {
                            if (b.min > n) continue;
                            q = (b.min - n) / (p - n) * (q - o) + o, p = b.min
                        }
                        if (n >= p && n > b.max) {
                            if (p > b.max) continue;
                            o = (b.max - n) / (p - n) * (q - o) + o, n = b.max
                        } else if (p >= n && p > b.max) {
                            if (n > b.max) continue;
                            q = (b.max - n) / (p - n) * (q - o) + o, p = b.max
                        }
                        if (i || (m.beginPath(), m.moveTo(b.p2c(n), c.p2c(f)), i = !0), o >= c.max && q >= c.max) m.lineTo(b.p2c(n), c.p2c(c.max)), m.lineTo(b.p2c(p), c.p2c(c.max));
                        else if (c.min >= o && c.min >= q) m.lineTo(b.p2c(n), c.p2c(c.min)), m.lineTo(b.p2c(p), c.p2c(c.min));
                        else {
                            var r = n,
                                s = p;
                            q >= o && c.min > o && q >= c.min ? (n = (c.min - o) / (q - o) * (p - n) + n, o = c.min) : o >= q && c.min > q && o >= c.min && (p = (c.min - o) / (q - o) * (p - n) + n, q = c.min), o >= q && o > c.max && c.max >= q ? (n = (c.max - o) / (q - o) * (p - n) + n, o = c.max) : q >= o && q > c.max && c.max >= o && (p = (c.max - o) / (q - o) * (p - n) + n, q = c.max), n != r && m.lineTo(b.p2c(r), c.p2c(o)), m.lineTo(b.p2c(n), c.p2c(o)), m.lineTo(b.p2c(p), c.p2c(q)), p != s && (m.lineTo(b.p2c(p), c.p2c(q)), m.lineTo(b.p2c(s), c.p2c(q)))
                        }
                    }
                }
            }
            m.save(), m.translate(q.left, q.top), m.lineJoin = "round";
            var d = a.lines.lineWidth,
                e = a.shadowSize;
            if (d > 0 && e > 0) {
                m.lineWidth = e, m.strokeStyle = "rgba(0,0,0,0.1)";
                var f = Math.PI / 18;
                b(a.datapoints, Math.sin(f) * (d / 2 + e / 2), Math.cos(f) * (d / 2 + e / 2), a.xaxis, a.yaxis), m.lineWidth = e / 2, b(a.datapoints, Math.sin(f) * (d / 2 + e / 4), Math.cos(f) * (d / 2 + e / 4), a.xaxis, a.yaxis)
            }
            m.lineWidth = d, m.strokeStyle = a.color;
            var g = cb(a.lines, a.color, 0, s);
            g && (m.fillStyle = g, c(a.datapoints, a.xaxis, a.yaxis)), d > 0 && b(a.datapoints, 0, 0, a.xaxis, a.yaxis), m.restore()
        }

        function _(a) {
            function b(a, b, c, d, e, f, g, h) {
                for (var i = a.points, j = a.pointsize, k = 0; i.length > k; k += j) {
                    var l = i[k],
                        n = i[k + 1];
                    null == l || f.min > l || l > f.max || g.min > n || n > g.max || (m.beginPath(), l = f.p2c(l), n = g.p2c(n) + d, "circle" == h ? m.arc(l, n, b, 0, e ? Math.PI : 2 * Math.PI, !1) : h(m, l, n, b, e), m.closePath(), c && (m.fillStyle = c, m.fill()), m.stroke())
                }
            }
            m.save(), m.translate(q.left, q.top);
            var c = a.points.lineWidth,
                d = a.shadowSize,
                e = a.points.radius,
                f = a.points.symbol;
            if (0 == c && (c = 1e-4), c > 0 && d > 0) {
                var g = d / 2;
                m.lineWidth = g, m.strokeStyle = "rgba(0,0,0,0.1)", b(a.datapoints, e, null, g + g / 2, !0, a.xaxis, a.yaxis, f), m.strokeStyle = "rgba(0,0,0,0.2)", b(a.datapoints, e, null, g / 2, !0, a.xaxis, a.yaxis, f)
            }
            m.lineWidth = c, m.strokeStyle = a.color, b(a.datapoints, e, cb(a.points, a.color), 0, !1, a.xaxis, a.yaxis, f), m.restore()
        }

        function ab(a, b, c, d, e, f, g, h, i, j, k, l) {
            var m, n, o, p, q, r, s, t, u;
            k ? (t = r = s = !0, q = !1, m = c, n = a, p = b + d, o = b + e, m > n && (u = n, n = m, m = u, q = !0, r = !1)) : (q = r = s = !0, t = !1, m = a + d, n = a + e, o = c, p = b, o > p && (u = p, p = o, o = u, t = !0, s = !1)), h.min > n || m > h.max || i.min > p || o > i.max || (h.min > m && (m = h.min, q = !1), n > h.max && (n = h.max, r = !1), i.min > o && (o = i.min, t = !1), p > i.max && (p = i.max, s = !1), m = h.p2c(m), o = i.p2c(o), n = h.p2c(n), p = i.p2c(p), g && (j.beginPath(), j.moveTo(m, o), j.lineTo(m, p), j.lineTo(n, p), j.lineTo(n, o), j.fillStyle = g(o, p), j.fill()), l > 0 && (q || r || s || t) && (j.beginPath(), j.moveTo(m, o + f), q ? j.lineTo(m, p + f) : j.moveTo(m, p + f), s ? j.lineTo(n, p + f) : j.moveTo(n, p + f), r ? j.lineTo(n, o + f) : j.moveTo(n, o + f), t ? j.lineTo(m, o + f) : j.moveTo(m, o + f), j.stroke()))
        }

        function bb(a) {
            function b(b, c, d, e, f, g, h) {
                for (var i = b.points, j = b.pointsize, k = 0; i.length > k; k += j) null != i[k] && ab(i[k], i[k + 1], i[k + 2], c, d, e, f, g, h, m, a.bars.horizontal, a.bars.lineWidth)
            }
            m.save(), m.translate(q.left, q.top), m.lineWidth = a.bars.lineWidth, m.strokeStyle = a.color;
            var c;
            switch (a.bars.align) {
                case "left":
                    c = 0;
                    break;
                case "right":
                    c = -a.bars.barWidth;
                    break;
                case "center":
                    c = -a.bars.barWidth / 2;
                    break;
                default:
                    throw Error("Invalid bar alignment: " + a.bars.align)
            }
            var d = a.bars.fill ? function(b, c) {
                return cb(a.bars, a.color, b, c)
            } : null;
            b(a.datapoints, c, c + a.bars.barWidth, 0, d, a.xaxis, a.yaxis), m.restore()
        }

        function cb(b, c, d, e) {
            var f = b.fill;
            if (!f) return null;
            if (b.fillColor) return sb(b.fillColor, d, e, c);
            var g = a.color.parse(c);
            return g.a = "number" == typeof f ? f : .4, g.normalize(), "" + g
        }

        function db() {
            if (b.find(".legend").remove(), i.legend.show) {
                for (var g, j, c = [], d = [], e = !1, f = i.legend.labelFormatter, k = 0; h.length > k; ++k) g = h[k], g.label && (j = f ? f(g.label, g) : g.label, j && d.push({
                    label: j,
                    color: g.color
                }));
                if (i.legend.sorted)
                    if (a.isFunction(i.legend.sorted)) d.sort(i.legend.sorted);
                    else if ("reverse" == i.legend.sorted) d.reverse();
                    else {
                        var l = "descending" != i.legend.sorted;
                        d.sort(function(a, b) {
                            return a.label == b.label ? 0 : a.label < b.label != l ? 1 : -1
                        })
                    }
                for (var k = 0; d.length > k; ++k) {
                    var m = d[k];
                    0 == k % i.legend.noColumns && (e && c.push("</tr>"), c.push("<tr>"), e = !0), c.push('<td class="legendColorBox"><div style="border:1px solid ' + i.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + m.color + ';overflow:hidden"></div></div></td>' + '<td class="legendLabel">' + m.label + "</td>")
                }
                if (e && c.push("</tr>"), 0 != c.length) {
                    var n = '<table style="font-size:smaller;color:' + i.grid.color + '">' + c.join("") + "</table>";
                    if (null != i.legend.container) a(i.legend.container).html(n);
                    else {
                        var o = "",
                            p = i.legend.position,
                            r = i.legend.margin;
                        null == r[0] && (r = [r, r]), "n" == p.charAt(0) ? o += "top:" + (r[1] + q.top) + "px;" : "s" == p.charAt(0) && (o += "bottom:" + (r[1] + q.bottom) + "px;"), "e" == p.charAt(1) ? o += "right:" + (r[0] + q.right) + "px;" : "w" == p.charAt(1) && (o += "left:" + (r[0] + q.left) + "px;");
                        var s = a('<div class="legend">' + n.replace('style="', 'style="position:absolute;' + o + ";") + "</div>").appendTo(b);
                        if (0 != i.legend.backgroundOpacity) {
                            var t = i.legend.backgroundColor;
                            null == t && (t = i.grid.backgroundColor, t = t && "string" == typeof t ? a.color.parse(t) : a.color.extract(s, "background-color"), t.a = 1, t = "" + t);
                            var u = s.children();
                            a('<div style="position:absolute;width:' + u.width() + "px;height:" + u.height() + "px;" + o + "background-color:" + t + ';"> </div>').prependTo(s).css("opacity", i.legend.backgroundOpacity)
                        }
                    }
                }
            }
        }

        function gb(a, b, c) {
            var j, k, l, d = i.grid.mouseActiveRadius,
                e = d * d + 1,
                f = null;
            for (j = h.length - 1; j >= 0; --j)
                if (c(h[j])) {
                    var m = h[j],
                        n = m.xaxis,
                        o = m.yaxis,
                        p = m.datapoints.points,
                        q = n.c2p(a),
                        r = o.c2p(b),
                        s = d / n.scale,
                        t = d / o.scale;
                    if (l = m.datapoints.pointsize, n.options.inverseTransform && (s = Number.MAX_VALUE), o.options.inverseTransform && (t = Number.MAX_VALUE), m.lines.show || m.points.show)
                        for (k = 0; p.length > k; k += l) {
                            var u = p[k],
                                v = p[k + 1];
                            if (null != u && !(u - q > s || -s > u - q || v - r > t || -t > v - r)) {
                                var w = Math.abs(n.p2c(u) - a),
                                    x = Math.abs(o.p2c(v) - b),
                                    y = w * w + x * x;
                                e > y && (e = y, f = [j, k / l])
                            }
                        }
                    if (m.bars.show && !f) {
                        var z = "left" == m.bars.align ? 0 : -m.bars.barWidth / 2,
                            A = z + m.bars.barWidth;
                        for (k = 0; p.length > k; k += l) {
                            var u = p[k],
                                v = p[k + 1],
                                B = p[k + 2];
                            null != u && (h[j].bars.horizontal ? Math.max(B, u) >= q && q >= Math.min(B, u) && r >= v + z && v + A >= r : q >= u + z && u + A >= q && r >= Math.min(B, v) && Math.max(B, v) >= r) && (f = [j, k / l])
                        }
                    }
                }
            return f ? (j = f[0], k = f[1], l = h[j].datapoints.pointsize, {
                datapoint: h[j].datapoints.points.slice(k * l, (k + 1) * l),
                dataIndex: k,
                series: h[j],
                seriesIndex: j
            }) : null
        }

        function hb(a) {
            i.grid.hoverable && kb("plothover", a, function(a) {
                return 0 != a.hoverable
            })
        }

        function ib(a) {
            i.grid.hoverable && kb("plothover", a, function() {
                return !1
            })
        }

        function jb(a) {
            kb("plotclick", a, function(a) {
                return 0 != a.clickable
            })
        }

        function kb(a, c, d) {
            var e = l.offset(),
                f = c.pageX - e.left - q.left,
                g = c.pageY - e.top - q.top,
                h = C({
                    left: f,
                    top: g
                });
            h.pageX = c.pageX, h.pageY = c.pageY;
            var j = gb(f, g, d);
            if (j && (j.pageX = parseInt(j.series.xaxis.p2c(j.datapoint[0]) + e.left + q.left, 10), j.pageY = parseInt(j.series.yaxis.p2c(j.datapoint[1]) + e.top + q.top, 10)), i.grid.autoHighlight) {
                for (var k = 0; eb.length > k; ++k) {
                    var m = eb[k];
                    m.auto != a || j && m.series == j.series && m.point[0] == j.datapoint[0] && m.point[1] == j.datapoint[1] || ob(m.series, m.point)
                }
                j && nb(j.series, j.datapoint, a)
            }
            b.trigger(a, [h, j])
        }

        function lb() {
            var a = i.interaction.redrawOverlayInterval;
            return -1 == a ? (mb(), void 0) : (fb || (fb = setTimeout(mb, a)), void 0)
        }

        function mb() {
            fb = null, n.save(), k.clear(), n.translate(q.left, q.top);
            var a, b;
            for (a = 0; eb.length > a; ++a) b = eb[a], b.series.bars.show ? rb(b.series, b.point) : qb(b.series, b.point);
            n.restore(), v(t.drawOverlay, [n])
        }

        function nb(a, b, c) {
            if ("number" == typeof a && (a = h[a]), "number" == typeof b) {
                var d = a.datapoints.pointsize;
                b = a.datapoints.points.slice(d * b, d * (b + 1))
            }
            var e = pb(a, b); - 1 == e ? (eb.push({
                series: a,
                point: b,
                auto: c
            }), lb()) : c || (eb[e].auto = !1)
        }

        function ob(a, b) {
            if (null == a && null == b) return eb = [], lb(), void 0;
            if ("number" == typeof a && (a = h[a]), "number" == typeof b) {
                var c = a.datapoints.pointsize;
                b = a.datapoints.points.slice(c * b, c * (b + 1))
            }
            var d = pb(a, b); - 1 != d && (eb.splice(d, 1), lb())
        }

        function pb(a, b) {
            for (var c = 0; eb.length > c; ++c) {
                var d = eb[c];
                if (d.series == a && d.point[0] == b[0] && d.point[1] == b[1]) return c
            }
            return -1
        }

        function qb(b, c) {
            var d = c[0],
                e = c[1],
                f = b.xaxis,
                g = b.yaxis,
                h = "string" == typeof b.highlightColor ? b.highlightColor : "" + a.color.parse(b.color).scale("a", .5);
            if (!(f.min > d || d > f.max || g.min > e || e > g.max)) {
                var i = b.points.radius + b.points.lineWidth / 2;
                n.lineWidth = i, n.strokeStyle = h;
                var j = 1.5 * i;
                d = f.p2c(d), e = g.p2c(e), n.beginPath(), "circle" == b.points.symbol ? n.arc(d, e, j, 0, 2 * Math.PI, !1) : b.points.symbol(n, d, e, j, !1), n.closePath(), n.stroke()
            }
        }

        function rb(b, c) {
            var d = "string" == typeof b.highlightColor ? b.highlightColor : "" + a.color.parse(b.color).scale("a", .5),
                e = d,
                f = "left" == b.bars.align ? 0 : -b.bars.barWidth / 2;
            n.lineWidth = b.bars.lineWidth, n.strokeStyle = d, ab(c[0], c[1], c[2] || 0, f, f + b.bars.barWidth, 0, function() {
                return e
            }, b.xaxis, b.yaxis, n, b.bars.horizontal, b.bars.lineWidth)
        }

        function sb(b, c, d, e) {
            if ("string" == typeof b) return b;
            for (var f = m.createLinearGradient(0, d, 0, c), g = 0, h = b.colors.length; h > g; ++g) {
                var i = b.colors[g];
                if ("string" != typeof i) {
                    var j = a.color.parse(e);
                    null != i.brightness && (j = j.scale("rgb", i.brightness)), null != i.opacity && (j.a *= i.opacity), i = "" + j
                }
                f.addColorStop(g / (h - 1), i)
            }
            return f
        }
        var h = [],
            i = {
                colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                legend: {
                    show: !0,
                    noColumns: 1,
                    labelFormatter: null,
                    labelBoxBorderColor: "#ccc",
                    container: null,
                    position: "ne",
                    margin: 5,
                    backgroundColor: null,
                    backgroundOpacity: .85,
                    sorted: null
                },
                xaxis: {
                    show: null,
                    position: "bottom",
                    mode: null,
                    timezone: null,
                    font: null,
                    color: null,
                    tickColor: null,
                    transform: null,
                    inverseTransform: null,
                    min: null,
                    max: null,
                    autoscaleMargin: null,
                    ticks: null,
                    tickFormatter: null,
                    labelWidth: null,
                    labelHeight: null,
                    reserveSpace: null,
                    tickLength: null,
                    alignTicksWithAxis: null,
                    tickDecimals: null,
                    tickSize: null,
                    minTickSize: null,
                    monthNames: null,
                    timeformat: null,
                    twelveHourClock: !1
                },
                yaxis: {
                    autoscaleMargin: .02,
                    position: "left"
                },
                xaxes: [],
                yaxes: [],
                series: {
                    points: {
                        show: !1,
                        radius: 3,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        symbol: "circle"
                    },
                    lines: {
                        lineWidth: 2,
                        fill: !1,
                        fillColor: null,
                        steps: !1
                    },
                    bars: {
                        show: !1,
                        lineWidth: 2,
                        barWidth: 1,
                        fill: !0,
                        fillColor: null,
                        align: "left",
                        horizontal: !1,
                        zero: !0
                    },
                    shadowSize: 3,
                    highlightColor: null
                },
                grid: {
                    show: !0,
                    aboveData: !1,
                    color: "#545454",
                    backgroundColor: null,
                    borderColor: null,
                    tickColor: null,
                    margin: 0,
                    labelMargin: 5,
                    axisMargin: 8,
                    borderWidth: 2,
                    minBorderMargin: null,
                    markings: null,
                    markingsColor: "#f4f4f4",
                    markingsLineWidth: 2,
                    clickable: !1,
                    hoverable: !1,
                    autoHighlight: !0,
                    mouseActiveRadius: 10
                },
                interaction: {
                    redrawOverlayInterval: 1e3 / 60
                },
                hooks: {}
            },
            j = null,
            k = null,
            l = null,
            m = null,
            n = null,
            o = [],
            p = [],
            q = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            r = 0,
            s = 0,
            t = {
                processOptions: [],
                processRawData: [],
                processDatapoints: [],
                processOffset: [],
                drawBackground: [],
                drawSeries: [],
                draw: [],
                bindEvents: [],
                drawOverlay: [],
                shutdown: []
            },
            u = this;
        u.setData = y, u.setupGrid = P, u.draw = U, u.getPlaceholder = function() {
            return b
        }, u.getCanvas = function() {
            return j.element
        }, u.getPlotOffset = function() {
            return q
        }, u.width = function() {
            return r
        }, u.height = function() {
            return s
        }, u.offset = function() {
            var a = l.offset();
            return a.left += q.left, a.top += q.top, a
        }, u.getData = function() {
            return h
        }, u.getAxes = function() {
            var b = {};
            return a.each(o.concat(p), function(a, c) {
                c && (b[c.direction + (1 != c.n ? c.n : "") + "axis"] = c)
            }), b
        }, u.getXAxes = function() {
            return o
        }, u.getYAxes = function() {
            return p
        }, u.c2p = C, u.p2c = D, u.getOptions = function() {
            return i
        }, u.highlight = nb, u.unhighlight = ob, u.triggerRedrawOverlay = lb, u.pointOffset = function(a) {
            return {
                left: parseInt(o[A(a, "x") - 1].p2c(+a.x) + q.left, 10),
                top: parseInt(p[A(a, "y") - 1].p2c(+a.y) + q.top, 10)
            }
        }, u.shutdown = J, u.resize = function() {
            var a = b.width(),
                c = b.height();
            j.resize(a, c), k.resize(a, c)
        }, u.hooks = t, w(u), x(f), H(), y(d), P(), U(), I();
        var eb = [],
            fb = null
    }

    function e(a, b) {
        return b * Math.floor(a / b)
    }
    var b = Object.prototype.hasOwnProperty;
    a(function() {
        a("head").prepend(["<style id='flot-default-styles'>", ".flot-tick-label {font-size:smaller;color:#545454;}", "</style>"].join(""))
    }), c.prototype.resize = function(a, b) {
        if (0 >= a || 0 >= b) throw Error("Invalid dimensions for plot, width = " + a + ", height = " + b);
        var c = this.element,
            d = this.context,
            e = this.pixelRatio;
        this.width != a && (c.width = a * e, c.style.width = a + "px", this.width = a), this.height != b && (c.height = b * e, c.style.height = b + "px", this.height = b), d.restore(), d.save(), d.scale(e, e)
    }, c.prototype.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height)
    }, c.prototype.render = function() {
        var a = this._textCache;
        for (var c in a)
            if (b.call(a, c)) {
                var d = this.getTextLayer(c),
                    e = a[c];
                d.hide();
                for (var f in e)
                    if (b.call(e, f)) {
                        var g = e[f];
                        for (var h in g)
                            if (b.call(g, h)) {
                                var i = g[h];
                                i.active ? i.rendered || (d.append(i.element), i.rendered = !0) : (delete g[h], i.rendered && i.element.detach())
                            }
                    }
                d.show()
            }
    }, c.prototype.getTextLayer = function(b) {
        var c = this.text[b];
        return null == c && (c = this.text[b] = a("<div></div>").addClass("flot-text " + b).css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }).insertAfter(this.element)), c
    }, c.prototype.getTextInfo = function(b, c, d) {
        var f, g, h, i;
        if (c = "" + c, f = "object" == typeof d ? d.style + " " + d.variant + " " + d.weight + " " + d.size + "px " + d.family : d, g = this._textCache[b], null == g && (g = this._textCache[b] = {}), h = g[f], null == h && (h = g[f] = {}), i = h[c], null == i) {
            var j = a("<div></div>").html(c).css({
                position: "absolute",
                top: -9999
            }).appendTo(this.getTextLayer(b));
            "object" == typeof d ? j.css({
                font: f,
                color: d.color
            }) : "string" == typeof d && j.addClass(d), i = h[c] = {
                active: !1,
                rendered: !1,
                element: j,
                width: j.outerWidth(!0),
                height: j.outerHeight(!0)
            }, j.detach()
        }
        return i
    }, c.prototype.addText = function(a, b, c, d, e, f, g, h) {
        var i = this.getTextInfo(a, d, e, f);
        i.active = !0, "center" == g ? b -= i.width / 2 : "right" == g && (b -= i.width), "middle" == h ? c -= i.height / 2 : "bottom" == h && (c -= i.height), i.element.css({
            top: parseInt(c, 10),
            left: parseInt(b, 10)
        })
    }, c.prototype.removeText = function(a, c, d, e) {
        if (null == c) {
            var f = this._textCache[a];
            if (null != f)
                for (var g in f)
                    if (b.call(f, g)) {
                        var h = f[g];
                        for (var i in h) b.call(h, i) && (h[i].active = !1)
                    }
        } else this.getTextInfo(a, c, d, e).active = !1
    }, a.plot = function(b, c, e) {
        var f = new d(a(b), c, e, a.plot.plugins);
        return f
    }, a.plot.version = "0.8.0-beta", a.plot.plugins = [], a.fn.plot = function(b, c) {
        return this.each(function() {
            a.plot(this, b, c)
        })
    }
})(jQuery);
(function($) {
    var options = {
        xaxis: {
            timezone: null,
            timeformat: null,
            twelveHourClock: false,
            monthNames: null
        }
    };

    function floorInBase(n, base) {
        return base * Math.floor(n / base);
    }

    function formatDate(d, fmt, monthNames, dayNames) {
        if (typeof d.strftime == "function") {
            return d.strftime(fmt);
        }
        var leftPad = function(n, pad) {
            n = "" + n;
            pad = "" + (pad == null ? "0" : pad);
            return n.length == 1 ? pad + n : n;
        };
        var r = [];
        var escape = false;
        var hours = d.getHours();
        var isAM = hours < 12;
        if (monthNames == null) {
            monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        }
        if (dayNames == null) {
            dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        }
        var hours12;
        if (hours > 12) {
            hours12 = hours - 12;
        } else if (hours == 0) {
            hours12 = 12;
        } else {
            hours12 = hours;
        }
        for (var i = 0; i < fmt.length; ++i) {
            var c = fmt.charAt(i);
            if (escape) {
                switch (c) {
                    case 'a':
                        c = "" + dayNames[d.getDay()];
                        break;
                    case 'b':
                        c = "" + monthNames[d.getMonth()];
                        break;
                    case 'd':
                        c = leftPad(d.getDate());
                        break;
                    case 'e':
                        c = leftPad(d.getDate(), " ");
                        break;
                    case 'h':
                    case 'H':
                        c = leftPad(hours);
                        break;
                    case 'I':
                        c = leftPad(hours12);
                        break;
                    case 'l':
                        c = leftPad(hours12, " ");
                        break;
                    case 'm':
                        c = leftPad(d.getMonth() + 1);
                        break;
                    case 'M':
                        c = leftPad(d.getMinutes());
                        break;
                    case 'q':
                        c = "" + (Math.floor(d.getMonth() / 3) + 1);
                        break;
                    case 'S':
                        c = leftPad(d.getSeconds());
                        break;
                    case 'y':
                        c = leftPad(d.getFullYear() % 100);
                        break;
                    case 'Y':
                        c = "" + d.getFullYear();
                        break;
                    case 'p':
                        c = (isAM) ? ("" + "am") : ("" + "pm");
                        break;
                    case 'P':
                        c = (isAM) ? ("" + "AM") : ("" + "PM");
                        break;
                    case 'w':
                        c = "" + d.getDay();
                        break;
                }
                r.push(c);
                escape = false;
            } else {
                if (c == "%") {
                    escape = true;
                } else {
                    r.push(c);
                }
            }
        }
        return r.join("");
    }

    function makeUtcWrapper(d) {
        function addProxyMethod(sourceObj, sourceMethod, targetObj, targetMethod) {
            sourceObj[sourceMethod] = function() {
                return targetObj[targetMethod].apply(targetObj, arguments);
            };
        };
        var utc = {
            date: d
        };
        if (d.strftime != undefined) {
            addProxyMethod(utc, "strftime", d, "strftime");
        }
        addProxyMethod(utc, "getTime", d, "getTime");
        addProxyMethod(utc, "setTime", d, "setTime");
        var props = ["Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds"];
        for (var p = 0; p < props.length; p++) {
            addProxyMethod(utc, "get" + props[p], d, "getUTC" + props[p]);
            addProxyMethod(utc, "set" + props[p], d, "setUTC" + props[p]);
        }
        return utc;
    };

    function dateGenerator(ts, opts) {
        if (opts.timezone == "browser") {
            return new Date(ts);
        } else if (!opts.timezone || opts.timezone == "utc") {
            return makeUtcWrapper(new Date(ts));
        } else if (typeof timezoneJS != "undefined" && typeof timezoneJS.Date != "undefined") {
            var d = new timezoneJS.Date();
            d.setTimezone(opts.timezone);
            d.setTime(ts);
            return d;
        } else {
            return makeUtcWrapper(new Date(ts));
        }
    }
    var timeUnitSize = {
        "second": 1000,
        "minute": 60 * 1000,
        "hour": 60 * 60 * 1000,
        "day": 24 * 60 * 60 * 1000,
        "month": 30 * 24 * 60 * 60 * 1000,
        "quarter": 3 * 30 * 24 * 60 * 60 * 1000,
        "year": 365.2425 * 24 * 60 * 60 * 1000
    };
    var baseSpec = [
        [1, "second"],
        [2, "second"],
        [5, "second"],
        [10, "second"],
        [30, "second"],
        [1, "minute"],
        [2, "minute"],
        [5, "minute"],
        [10, "minute"],
        [30, "minute"],
        [1, "hour"],
        [2, "hour"],
        [4, "hour"],
        [8, "hour"],
        [12, "hour"],
        [1, "day"],
        [2, "day"],
        [3, "day"],
        [0.25, "month"],
        [0.5, "month"],
        [1, "month"],
        [2, "month"]
    ];
    var specMonths = baseSpec.concat([
        [3, "month"],
        [6, "month"],
        [1, "year"]
    ]);
    var specQuarters = baseSpec.concat([
        [1, "quarter"],
        [2, "quarter"],
        [1, "year"]
    ]);

    function init(plot) {
        plot.hooks.processOptions.push(function(plot, options) {
            $.each(plot.getAxes(), function(axisName, axis) {
                var opts = axis.options;
                if (opts.mode == "time") {
                    axis.tickGenerator = function(axis) {
                        var ticks = [];
                        var d = dateGenerator(axis.min, opts);
                        var minSize = 0;
                        var spec = (opts.tickSize && opts.tickSize[1] === "quarter") || (opts.minTickSize && opts.minTickSize[1] === "quarter") ? specQuarters : specMonths;
                        if (opts.minTickSize != null) {
                            if (typeof opts.tickSize == "number") {
                                minSize = opts.tickSize;
                            } else {
                                minSize = opts.minTickSize[0] * timeUnitSize[opts.minTickSize[1]];
                            }
                        }
                        for (var i = 0; i < spec.length - 1; ++i) {
                            if (axis.delta < (spec[i][0] * timeUnitSize[spec[i][1]] + spec[i + 1][0] * timeUnitSize[spec[i + 1][1]]) / 2 && spec[i][0] * timeUnitSize[spec[i][1]] >= minSize) {
                                break;
                            }
                        }
                        var size = spec[i][0];
                        var unit = spec[i][1];
                        if (unit == "year") {
                            if (opts.minTickSize != null && opts.minTickSize[1] == "year") {
                                size = Math.floor(opts.minTickSize[0]);
                            } else {
                                var magn = Math.pow(10, Math.floor(Math.log(axis.delta / timeUnitSize.year) / Math.LN10));
                                var norm = (axis.delta / timeUnitSize.year) / magn;
                                if (norm < 1.5) {
                                    size = 1;
                                } else if (norm < 3) {
                                    size = 2;
                                } else if (norm < 7.5) {
                                    size = 5;
                                } else {
                                    size = 10;
                                }
                                size *= magn;
                            }
                            if (size < 1) {
                                size = 1;
                            }
                        }
                        axis.tickSize = opts.tickSize || [size, unit];
                        var tickSize = axis.tickSize[0];
                        unit = axis.tickSize[1];
                        var step = tickSize * timeUnitSize[unit];
                        if (unit == "second") {
                            d.setSeconds(floorInBase(d.getSeconds(), tickSize));
                        } else if (unit == "minute") {
                            d.setMinutes(floorInBase(d.getMinutes(), tickSize));
                        } else if (unit == "hour") {
                            d.setHours(floorInBase(d.getHours(), tickSize));
                        } else if (unit == "month") {
                            d.setMonth(floorInBase(d.getMonth(), tickSize));
                        } else if (unit == "quarter") {
                            d.setMonth(3 * floorInBase(d.getMonth() / 3, tickSize));
                        } else if (unit == "year") {
                            d.setFullYear(floorInBase(d.getFullYear(), tickSize));
                        }
                        d.setMilliseconds(0);
                        if (step >= timeUnitSize.minute) {
                            d.setSeconds(0);
                        }
                        if (step >= timeUnitSize.hour) {
                            d.setMinutes(0);
                        }
                        if (step >= timeUnitSize.day) {
                            d.setHours(0);
                        }
                        if (step >= timeUnitSize.day * 4) {
                            d.setDate(1);
                        }
                        if (step >= timeUnitSize.month * 2) {
                            d.setMonth(floorInBase(d.getMonth(), 3));
                        }
                        if (step >= timeUnitSize.quarter * 2) {
                            d.setMonth(floorInBase(d.getMonth(), 6));
                        }
                        if (step >= timeUnitSize.year) {
                            d.setMonth(0);
                        }
                        var carry = 0;
                        var v = Number.NaN;
                        var prev;
                        do {
                            prev = v;
                            v = d.getTime();
                            ticks.push(v);
                            if (unit == "month" || unit == "quarter") {
                                if (tickSize < 1) {
                                    d.setDate(1);
                                    var start = d.getTime();
                                    d.setMonth(d.getMonth() +
                                    (unit == "quarter" ? 3 : 1));
                                    var end = d.getTime();
                                    d.setTime(v + carry * timeUnitSize.hour + (end - start) * tickSize);
                                    carry = d.getHours();
                                    d.setHours(0);
                                } else {
                                    d.setMonth(d.getMonth() +
                                    tickSize * (unit == "quarter" ? 3 : 1));
                                }
                            } else if (unit == "year") {
                                d.setFullYear(d.getFullYear() + tickSize);
                            } else {
                                d.setTime(v + step);
                            }
                        } while (v < axis.max && v != prev);
                        return ticks;
                    };
                    axis.tickFormatter = function(v, axis) {
                        var d = dateGenerator(v, axis.options);
                        if (opts.timeformat != null) {
                            return formatDate(d, opts.timeformat, opts.monthNames, opts.dayNames);
                        }
                        var useQuarters = (axis.options.tickSize && axis.options.tickSize[1] == "quarter") || (axis.options.minTickSize && axis.options.minTickSize[1] == "quarter");
                        var t = axis.tickSize[0] * timeUnitSize[axis.tickSize[1]];
                        var span = axis.max - axis.min;
                        var suffix = (opts.twelveHourClock) ? " %p" : "";
                        var hourCode = (opts.twelveHourClock) ? "%I" : "%H";
                        var fmt;
                        if (t < timeUnitSize.minute) {
                            fmt = hourCode + ":%M:%S" + suffix;
                        } else if (t < timeUnitSize.day) {
                            if (span < 2 * timeUnitSize.day) {
                                fmt = hourCode + ":%M" + suffix;
                            } else {
                                fmt = "%b %d " + hourCode + ":%M" + suffix;
                            }
                        } else if (t < timeUnitSize.month) {
                            fmt = "%b %d";
                        } else if ((useQuarters && t < timeUnitSize.quarter) || (!useQuarters && t < timeUnitSize.year)) {
                            if (span < timeUnitSize.year) {
                                fmt = "%b";
                            } else {
                                fmt = "%b %Y";
                            }
                        } else if (useQuarters && t < timeUnitSize.year) {
                            if (span < timeUnitSize.year) {
                                fmt = "Q%q";
                            } else {
                                fmt = "Q%q %Y";
                            }
                        } else {
                            fmt = "%Y";
                        }
                        var rt = formatDate(d, fmt, opts.monthNames, opts.dayNames);
                        return rt;
                    };
                }
            });
        });
    }
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'time',
        version: '1.0'
    });
    $.plot.formatDate = formatDate;
})(jQuery);
(function(t) {
    var o = {
            tooltip: !1,
            tooltipOpts: {
                content: "%s | X: %x | Y: %y",
                xDateFormat: null,
                yDateFormat: null,
                shifts: {
                    x: 10,
                    y: 20
                },
                defaultTheme: !0,
                onHover: function() {}
            }
        },
        i = function(t) {
            this.tipPosition = {
                x: 0,
                y: 0
            }, this.init(t)
        };
    i.prototype.init = function(o) {
        function i(t) {
            var o = {};
            o.x = t.pageX, o.y = t.pageY, s.updateTooltipPosition(o)
        }

        function e(t, o, i) {
            var e = s.getDomElement();
            if (i) {
                var n;
                n = s.stringFormat(s.tooltipOptions.content, i), e.html(n), s.updateTooltipPosition({
                    x: o.pageX,
                    y: o.pageY
                }), e.css({
                    left: s.tipPosition.x + s.tooltipOptions.shifts.x,
                    top: s.tipPosition.y + s.tooltipOptions.shifts.y
                }).show(), "function" == typeof s.tooltipOptions.onHover && s.tooltipOptions.onHover(i, e)
            } else e.hide().html("")
        }
        var s = this;
        o.hooks.bindEvents.push(function(o, n) {
            s.plotOptions = o.getOptions(), s.plotOptions.tooltip !== !1 && void 0 !== s.plotOptions.tooltip && (s.tooltipOptions = s.plotOptions.tooltipOpts, s.getDomElement(), t(o.getPlaceholder()).bind("plothover", e), t(n).bind("mousemove", i))
        }), o.hooks.shutdown.push(function(o, s) {
            t(o.getPlaceholder()).unbind("plothover", e), t(s).unbind("mousemove", i)
        })
    }, i.prototype.getDomElement = function() {
        var o;
        return t("#flotTip").length > 0 ? o = t("#flotTip") : (o = t("<div />").attr("id", "flotTip"), o.appendTo("body").hide().css({
            position: "absolute"
        }), this.tooltipOptions.defaultTheme && o.css({
            background: "#fff",
            "z-index": "100",
            padding: "0.4em 0.6em",
            "border-radius": "0.5em",
            "font-size": "0.8em",
            border: "1px solid #111",
            display: "none",
            "white-space": "nowrap"
        })), o
    }, i.prototype.updateTooltipPosition = function(o) {
        var i = t("#flotTip").outerWidth() + this.tooltipOptions.shifts.x,
            e = t("#flotTip").outerHeight() + this.tooltipOptions.shifts.y;
        o.x - t(window).scrollLeft() > t(window).innerWidth() - i && (o.x -= i), o.y - t(window).scrollTop() > t(window).innerHeight() - e && (o.y -= e), this.tipPosition.x = o.x, this.tipPosition.y = o.y
    }, i.prototype.stringFormat = function(t, o) {
        var i = /%p\.{0,1}(\d{0,})/,
            e = /%s/,
            s = /%x\.{0,1}(?:\d{0,})/,
            n = /%y\.{0,1}(?:\d{0,})/;
        return "function" == typeof t && (t = t(o.series.label, o.series.data[o.dataIndex][0], o.series.data[o.dataIndex][1], o)), o.series.percent !== void 0 && (t = this.adjustValPrecision(i, t, o.series.percent)), o.series.label !== void 0 && (t = t.replace(e, o.series.label)), this.isTimeMode("xaxis", o) && this.isXDateFormat(o) && (t = t.replace(s, this.timestampToDate(o.series.data[o.dataIndex][0], this.tooltipOptions.xDateFormat))), this.isTimeMode("yaxis", o) && this.isYDateFormat(o) && (t = t.replace(n, this.timestampToDate(o.series.data[o.dataIndex][1], this.tooltipOptions.yDateFormat))), "number" == typeof o.series.data[o.dataIndex][0] && (t = this.adjustValPrecision(s, t, o.series.data[o.dataIndex][0])), "number" == typeof o.series.data[o.dataIndex][1] && (t = this.adjustValPrecision(n, t, o.series.data[o.dataIndex][1])), o.series.xaxis.tickFormatter !== void 0 && (t = t.replace(s, o.series.xaxis.tickFormatter(o.series.data[o.dataIndex][0], o.series.xaxis))), o.series.yaxis.tickFormatter !== void 0 && (t = t.replace(n, o.series.yaxis.tickFormatter(o.series.data[o.dataIndex][1], o.series.yaxis))), t
    }, i.prototype.isTimeMode = function(t, o) {
        return o.series[t].options.mode !== void 0 && "time" === o.series[t].options.mode
    }, i.prototype.isXDateFormat = function() {
        return this.tooltipOptions.xDateFormat !== void 0 && null !== this.tooltipOptions.xDateFormat
    }, i.prototype.isYDateFormat = function() {
        return this.tooltipOptions.yDateFormat !== void 0 && null !== this.tooltipOptions.yDateFormat
    }, i.prototype.timestampToDate = function(o, i) {
        var e = new Date(o);
        return t.plot.formatDate(e, i)
    }, i.prototype.adjustValPrecision = function(t, o, i) {
        var e, s = o.match(t);
        return null !== s && "" !== RegExp.$1 && (e = RegExp.$1, i = i.toFixed(e), o = o.replace(t, i)), o
    };
    var e = function(t) {
        new i(t)
    };
    t.plot.plugins.push({
        init: e,
        options: o,
        name: "tooltip",
        version: "0.6.1"
    })
})(jQuery);
(function($) {
    var REDRAW_ATTEMPTS = 10;
    var REDRAW_SHRINK = 0.95;

    function init(plot) {
        var canvas = null,
            target = null,
            maxRadius = null,
            centerLeft = null,
            centerTop = null,
            processed = false,
            ctx = null;
        var highlights = [];
        plot.hooks.processOptions.push(function(plot, options) {
            if (options.series.pie.show) {
                options.grid.show = false;
                if (options.series.pie.label.show == "auto") {
                    if (options.legend.show) {
                        options.series.pie.label.show = false;
                    } else {
                        options.series.pie.label.show = true;
                    }
                }
                if (options.series.pie.radius == "auto") {
                    if (options.series.pie.label.show) {
                        options.series.pie.radius = 3 / 4;
                    } else {
                        options.series.pie.radius = 1;
                    }
                }
                if (options.series.pie.tilt > 1) {
                    options.series.pie.tilt = 1;
                } else if (options.series.pie.tilt < 0) {
                    options.series.pie.tilt = 0;
                }
            }
        });
        plot.hooks.bindEvents.push(function(plot, eventHolder) {
            var options = plot.getOptions();
            if (options.series.pie.show) {
                if (options.grid.hoverable) {
                    eventHolder.unbind("mousemove").mousemove(onMouseMove);
                }
                if (options.grid.clickable) {
                    eventHolder.unbind("click").click(onClick);
                }
            }
        });
        plot.hooks.processDatapoints.push(function(plot, series, data, datapoints) {
            var options = plot.getOptions();
            if (options.series.pie.show) {
                processDatapoints(plot, series, data, datapoints);
            }
        });
        plot.hooks.drawOverlay.push(function(plot, octx) {
            var options = plot.getOptions();
            if (options.series.pie.show) {
                drawOverlay(plot, octx);
            }
        });
        plot.hooks.draw.push(function(plot, newCtx) {
            var options = plot.getOptions();
            if (options.series.pie.show) {
                draw(plot, newCtx);
            }
        });

        function processDatapoints(plot, series, datapoints) {
            if (!processed) {
                processed = true;
                canvas = plot.getCanvas();
                target = $(canvas).parent();
                options = plot.getOptions();
                plot.setData(combine(plot.getData()));
            }
        }

        function combine(data) {
            var total = 0,
                combined = 0,
                numCombined = 0,
                color = options.series.pie.combine.color,
                newdata = [];
            for (var i = 0; i < data.length; ++i) {
                var value = data[i].data;
                if ($.isArray(value) && value.length == 1) {
                    value = value[0];
                }
                if ($.isArray(value)) {
                    if (!isNaN(parseFloat(value[1])) && isFinite(value[1])) {
                        value[1] = +value[1];
                    } else {
                        value[1] = 0;
                    }
                } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
                    value = [1, +value];
                } else {
                    value = [1, 0];
                }
                data[i].data = [value];
            }
            for (var i = 0; i < data.length; ++i) {
                total += data[i].data[0][1];
            }
            for (var i = 0; i < data.length; ++i) {
                var value = data[i].data[0][1];
                if (value / total <= options.series.pie.combine.threshold) {
                    combined += value;
                    numCombined++;
                    if (!color) {
                        color = data[i].color;
                    }
                }
            }
            for (var i = 0; i < data.length; ++i) {
                var value = data[i].data[0][1];
                if (numCombined < 2 || value / total > options.series.pie.combine.threshold) {
                    newdata.push({
                        data: [
                            [1, value]
                        ],
                        color: data[i].color,
                        label: data[i].label,
                        angle: value * Math.PI * 2 / total,
                        percent: value / (total / 100)
                    });
                }
            }
            if (numCombined > 1) {
                newdata.push({
                    data: [
                        [1, combined]
                    ],
                    color: color,
                    label: options.series.pie.combine.label,
                    angle: combined * Math.PI * 2 / total,
                    percent: combined / (total / 100)
                });
            }
            return newdata;
        }

        function draw(plot, newCtx) {
            if (!target) {
                return;
            }
            var canvasWidth = plot.getPlaceholder().width(),
                canvasHeight = plot.getPlaceholder().height(),
                legendWidth = target.children().filter(".legend").children().width() || 0;
            ctx = newCtx;
            processed = false;
            maxRadius = Math.min(canvasWidth, canvasHeight / options.series.pie.tilt) / 2;
            centerTop = canvasHeight / 2 + options.series.pie.offset.top;
            centerLeft = canvasWidth / 2;
            if (options.series.pie.offset.left == "auto") {
                if (options.legend.position.match("w")) {
                    centerLeft += legendWidth / 2;
                } else {
                    centerLeft -= legendWidth / 2;
                }
            } else {
                centerLeft += options.series.pie.offset.left;
            }
            if (centerLeft < maxRadius) {
                centerLeft = maxRadius;
            } else if (centerLeft > canvasWidth - maxRadius) {
                centerLeft = canvasWidth - maxRadius;
            }
            var slices = plot.getData(),
                attempts = 0;
            do {
                if (attempts > 0) {
                    maxRadius *= REDRAW_SHRINK;
                }
                attempts += 1;
                clear();
                if (options.series.pie.tilt <= 0.8) {
                    drawShadow();
                }
            } while (!drawPie() && attempts < REDRAW_ATTEMPTS)
            if (attempts >= REDRAW_ATTEMPTS) {
                clear();
                target.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>");
            }
            if (plot.setSeries && plot.insertLegend) {
                plot.setSeries(slices);
                plot.insertLegend();
            }

            function clear() {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                target.children().filter(".pieLabel, .pieLabelBackground").remove();
            }

            function drawShadow() {
                var shadowLeft = options.series.pie.shadow.left;
                var shadowTop = options.series.pie.shadow.top;
                var edge = 10;
                var alpha = options.series.pie.shadow.alpha;
                var radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius;
                if (radius >= canvasWidth / 2 - shadowLeft || radius * options.series.pie.tilt >= canvasHeight / 2 - shadowTop || radius <= edge) {
                    return;
                }
                ctx.save();
                ctx.translate(shadowLeft, shadowTop);
                ctx.globalAlpha = alpha;
                ctx.fillStyle = "#000";
                ctx.translate(centerLeft, centerTop);
                ctx.scale(1, options.series.pie.tilt);
                for (var i = 1; i <= edge; i++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
                    ctx.fill();
                    radius -= i;
                }
                ctx.restore();
            }

            function drawPie() {
                var startAngle = Math.PI * options.series.pie.startAngle;
                var radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius;
                ctx.save();
                ctx.translate(centerLeft, centerTop);
                ctx.scale(1, options.series.pie.tilt);
                ctx.save();
                var currentAngle = startAngle;
                for (var i = 0; i < slices.length; ++i) {
                    slices[i].startAngle = currentAngle;
                    drawSlice(slices[i].angle, slices[i].color, true);
                }
                ctx.restore();
                if (options.series.pie.stroke.width > 0) {
                    ctx.save();
                    ctx.lineWidth = options.series.pie.stroke.width;
                    currentAngle = startAngle;
                    for (var i = 0; i < slices.length; ++i) {
                        drawSlice(slices[i].angle, options.series.pie.stroke.color, false);
                    }
                    ctx.restore();
                }
                drawDonutHole(ctx);
                ctx.restore();
                if (options.series.pie.label.show) {
                    return drawLabels();
                } else return true;

                function drawSlice(angle, color, fill) {
                    if (angle <= 0 || isNaN(angle)) {
                        return;
                    }
                    if (fill) {
                        ctx.fillStyle = color;
                    } else {
                        ctx.strokeStyle = color;
                        ctx.lineJoin = "round";
                    }
                    ctx.beginPath();
                    if (Math.abs(angle - Math.PI * 2) > 0.000000001) {
                        ctx.moveTo(0, 0);
                    }
                    ctx.arc(0, 0, radius, currentAngle, currentAngle + angle / 2, false);
                    ctx.arc(0, 0, radius, currentAngle + angle / 2, currentAngle + angle, false);
                    ctx.closePath();
                    currentAngle += angle;
                    if (fill) {
                        ctx.fill();
                    } else {
                        ctx.stroke();
                    }
                }

                function drawLabels() {
                    var currentAngle = startAngle;
                    var radius = options.series.pie.label.radius > 1 ? options.series.pie.label.radius : maxRadius * options.series.pie.label.radius;
                    for (var i = 0; i < slices.length; ++i) {
                        if (slices[i].percent >= options.series.pie.label.threshold * 100) {
                            if (!drawLabel(slices[i], currentAngle, i)) {
                                return false;
                            }
                        }
                        currentAngle += slices[i].angle;
                    }
                    return true;

                    function drawLabel(slice, startAngle, index) {
                        if (slice.data[0][1] == 0) {
                            return true;
                        }
                        var lf = options.legend.labelFormatter,
                            text, plf = options.series.pie.label.formatter;
                        if (lf) {
                            text = lf(slice.label, slice);
                        } else {
                            text = slice.label;
                        }
                        if (plf) {
                            text = plf(text, slice);
                        }
                        var halfAngle = ((startAngle + slice.angle) + startAngle) / 2;
                        var x = centerLeft + Math.round(Math.cos(halfAngle) * radius);
                        var y = centerTop + Math.round(Math.sin(halfAngle) * radius) * options.series.pie.tilt;
                        var html = "<span class='pieLabel' id='pieLabel" + index + "' style='position:absolute;top:" + y + "px;left:" + x + "px;'>" + text + "</span>";
                        target.append(html);
                        var label = target.children("#pieLabel" + index);
                        var labelTop = (y - label.height() / 2);
                        var labelLeft = (x - label.width() / 2);
                        label.css("top", labelTop);
                        label.css("left", labelLeft);
                        if (0 - labelTop > 0 || 0 - labelLeft > 0 || canvasHeight - (labelTop + label.height()) < 0 || canvasWidth - (labelLeft + label.width()) < 0) {
                            return false;
                        }
                        if (options.series.pie.label.background.opacity != 0) {
                            var c = options.series.pie.label.background.color;
                            if (c == null) {
                                c = slice.color;
                            }
                            var pos = "top:" + labelTop + "px;left:" + labelLeft + "px;";
                            $("<div class='pieLabelBackground' style='position:absolute;width:" + label.width() + "px;height:" + label.height() + "px;" + pos + "background-color:" + c + ";'></div>").css("opacity", options.series.pie.label.background.opacity).insertBefore(label);
                        }
                        return true;
                    }
                }
            }
        }

        function drawDonutHole(layer) {
            if (options.series.pie.innerRadius > 0) {
                layer.save();
                var innerRadius = options.series.pie.innerRadius > 1 ? options.series.pie.innerRadius : maxRadius * options.series.pie.innerRadius;
                layer.globalCompositeOperation = "destination-out";
                layer.beginPath();
                layer.fillStyle = options.series.pie.stroke.color;
                layer.arc(0, 0, innerRadius, 0, Math.PI * 2, false);
                layer.fill();
                layer.closePath();
                layer.restore();
                layer.save();
                layer.beginPath();
                layer.strokeStyle = options.series.pie.stroke.color;
                layer.arc(0, 0, innerRadius, 0, Math.PI * 2, false);
                layer.stroke();
                layer.closePath();
                layer.restore();
            }
        }

        function isPointInPoly(poly, pt) {
            for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1])) && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) && (c = !c);
            return c;
        }

        function findNearbySlice(mouseX, mouseY) {
            var slices = plot.getData(),
                options = plot.getOptions(),
                radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius,
                x, y;
            for (var i = 0; i < slices.length; ++i) {
                var s = slices[i];
                if (s.pie.show) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.arc(0, 0, radius, s.startAngle, s.startAngle + s.angle / 2, false);
                    ctx.arc(0, 0, radius, s.startAngle + s.angle / 2, s.startAngle + s.angle, false);
                    ctx.closePath();
                    x = mouseX - centerLeft;
                    y = mouseY - centerTop;
                    if (ctx.isPointInPath) {
                        if (ctx.isPointInPath(mouseX - centerLeft, mouseY - centerTop)) {
                            ctx.restore();
                            return {
                                datapoint: [s.percent, s.data],
                                dataIndex: 0,
                                series: s,
                                seriesIndex: i
                            };
                        }
                    } else {
                        var p1X = radius * Math.cos(s.startAngle),
                            p1Y = radius * Math.sin(s.startAngle),
                            p2X = radius * Math.cos(s.startAngle + s.angle / 4),
                            p2Y = radius * Math.sin(s.startAngle + s.angle / 4),
                            p3X = radius * Math.cos(s.startAngle + s.angle / 2),
                            p3Y = radius * Math.sin(s.startAngle + s.angle / 2),
                            p4X = radius * Math.cos(s.startAngle + s.angle / 1.5),
                            p4Y = radius * Math.sin(s.startAngle + s.angle / 1.5),
                            p5X = radius * Math.cos(s.startAngle + s.angle),
                            p5Y = radius * Math.sin(s.startAngle + s.angle),
                            arrPoly = [
                                [0, 0],
                                [p1X, p1Y],
                                [p2X, p2Y],
                                [p3X, p3Y],
                                [p4X, p4Y],
                                [p5X, p5Y]
                            ],
                            arrPoint = [x, y];
                        if (isPointInPoly(arrPoly, arrPoint)) {
                            ctx.restore();
                            return {
                                datapoint: [s.percent, s.data],
                                dataIndex: 0,
                                series: s,
                                seriesIndex: i
                            };
                        }
                    }
                    ctx.restore();
                }
            }
            return null;
        }

        function onMouseMove(e) {
            triggerClickHoverEvent("plothover", e);
        }

        function onClick(e) {
            triggerClickHoverEvent("plotclick", e);
        }

        function triggerClickHoverEvent(eventname, e) {
            var offset = plot.offset();
            var canvasX = parseInt(e.pageX - offset.left);
            var canvasY = parseInt(e.pageY - offset.top);
            var item = findNearbySlice(canvasX, canvasY);
            if (options.grid.autoHighlight) {
                for (var i = 0; i < highlights.length; ++i) {
                    var h = highlights[i];
                    if (h.auto == eventname && !(item && h.series == item.series)) {
                        unhighlight(h.series);
                    }
                }
            }
            if (item) {
                highlight(item.series, eventname);
            }
            var pos = {
                pageX: e.pageX,
                pageY: e.pageY
            };
            target.trigger(eventname, [pos, item]);
        }

        function highlight(s, auto) {
            var i = indexOfHighlight(s);
            if (i == -1) {
                highlights.push({
                    series: s,
                    auto: auto
                });
                plot.triggerRedrawOverlay();
            } else if (!auto) {
                highlights[i].auto = false;
            }
        }

        function unhighlight(s) {
            if (s == null) {
                highlights = [];
                plot.triggerRedrawOverlay();
            }
            var i = indexOfHighlight(s);
            if (i != -1) {
                highlights.splice(i, 1);
                plot.triggerRedrawOverlay();
            }
        }

        function indexOfHighlight(s) {
            for (var i = 0; i < highlights.length; ++i) {
                var h = highlights[i];
                if (h.series == s)
                    return i;
            }
            return -1;
        }

        function drawOverlay(plot, octx) {
            var options = plot.getOptions();
            var radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius;
            octx.save();
            octx.translate(centerLeft, centerTop);
            octx.scale(1, options.series.pie.tilt);
            for (var i = 0; i < highlights.length; ++i) {
                drawHighlight(highlights[i].series);
            }
            drawDonutHole(octx);
            octx.restore();

            function drawHighlight(series) {
                if (series.angle <= 0 || isNaN(series.angle)) {
                    return;
                }
                octx.fillStyle = "rgba(255, 255, 255, " + options.series.pie.highlight.opacity + ")";
                octx.beginPath();
                if (Math.abs(series.angle - Math.PI * 2) > 0.000000001) {
                    octx.moveTo(0, 0);
                }
                octx.arc(0, 0, radius, series.startAngle, series.startAngle + series.angle / 2, false);
                octx.arc(0, 0, radius, series.startAngle + series.angle / 2, series.startAngle + series.angle, false);
                octx.closePath();
                octx.fill();
            }
        }
    }
    var options = {
        series: {
            pie: {
                show: false,
                radius: "auto",
                innerRadius: 0,
                startAngle: 3 / 2,
                tilt: 1,
                shadow: {
                    left: 5,
                    top: 15,
                    alpha: 0.02
                },
                offset: {
                    top: 0,
                    left: "auto"
                },
                stroke: {
                    color: "#fff",
                    width: 1
                },
                label: {
                    show: "auto",
                    formatter: function(label, slice) {
                        return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + slice.color + ";'>" + label + "<br/>" + Math.round(slice.percent) + "%</div>";
                    },
                    radius: 1,
                    background: {
                        color: null,
                        opacity: 0
                    },
                    threshold: 0
                },
                combine: {
                    threshold: -1,
                    color: null,
                    label: "Other"
                },
                highlight: {
                    opacity: 0.5
                }
            }
        }
    };
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "pie",
        version: "1.1"
    });
})(jQuery);
(function(e) {
    function n(e, t, n, r) {
        var i = t.xaxis.options.mode == "categories",
            s = t.yaxis.options.mode == "categories";
        if (!i && !s) return;
        var o = r.format;
        if (!o) {
            var u = t;
            o = [], o.push({
                x: !0,
                number: !0,
                required: !0
            }), o.push({
                y: !0,
                number: !0,
                required: !0
            });
            if (u.bars.show || u.lines.show && u.lines.fill) {
                var a = !!(u.bars.show && u.bars.zero || u.lines.show && u.lines.zero);
                o.push({
                    y: !0,
                    number: !0,
                    required: !1,
                    defaultValue: 0,
                    autoscale: a
                }), u.bars.horizontal && (delete o[o.length - 1].y, o[o.length - 1].x = !0)
            }
            r.format = o
        }
        for (var f = 0; f < o.length; ++f) o[f].x && i && (o[f].number = !1), o[f].y && s && (o[f].number = !1)
    }

    function r(e) {
        var t = -1;
        for (var n in e) e[n] > t && (t = e[n]);
        return t + 1
    }

    function i(e) {
        var t = [];
        for (var n in e.categories) {
            var r = e.categories[n];
            r >= e.min && r <= e.max && t.push([r, n])
        }
        return t.sort(function(e, t) {
            return e[0] - t[0]
        }), t
    }

    function s(t, n, r) {
        if (t[n].options.mode != "categories") return;
        if (!t[n].categories) {
            var s = {},
                u = t[n].options.categories || {};
            if (e.isArray(u))
                for (var a = 0; a < u.length; ++a) s[u[a]] = a;
            else
                for (var f in u) s[f] = u[f];
            t[n].categories = s
        }
        t[n].options.ticks || (t[n].options.ticks = i), o(r, n, t[n].categories)
    }

    function o(e, t, n) {
        var i = e.points,
            s = e.pointsize,
            o = e.format,
            u = t.charAt(0),
            a = r(n);
        for (var f = 0; f < i.length; f += s) {
            if (i[f] == null) continue;
            for (var l = 0; l < s; ++l) {
                var c = i[f + l];
                if (c == null || !o[l][u]) continue;
                c in n || (n[c] = a, ++a), i[f + l] = n[c]
            }
        }
    }

    function u(e, t, n) {
        s(t, "xaxis", n), s(t, "yaxis", n)
    }

    function a(e) {
        e.hooks.processRawData.push(n), e.hooks.processDatapoints.push(u)
    }
    var t = {
        xaxis: {
            categories: null
        },
        yaxis: {
            categories: null
        }
    };
    e.plot.plugins.push({
        init: a,
        options: t,
        name: "categories",
        version: "1.0"
    })
})(jQuery);
(function($, e, t) {
    "$:nomunge";
    var i = [],
        n = $.resize = $.extend($.resize, {}),
        a, r = false,
        s = "setTimeout",
        u = "resize",
        m = u + "-special-event",
        o = "pendingDelay",
        l = "activeDelay",
        f = "throttleWindow";
    n[o] = 200;
    n[l] = 20;
    n[f] = true;
    $.event.special[u] = {
        setup: function() {
            if (!n[f] && this[s]) {
                return false
            }
            var e = $(this);
            i.push(this);
            e.data(m, {
                w: e.width(),
                h: e.height()
            });
            if (i.length === 1) {
                a = t;
                h()
            }
        },
        teardown: function() {
            if (!n[f] && this[s]) {
                return false
            }
            var e = $(this);
            for (var t = i.length - 1; t >= 0; t--) {
                if (i[t] == this) {
                    i.splice(t, 1);
                    break
                }
            }
            e.removeData(m);
            if (!i.length) {
                if (r) {
                    cancelAnimationFrame(a)
                } else {
                    clearTimeout(a)
                }
                a = null
            }
        },
        add: function(e) {
            if (!n[f] && this[s]) {
                return false
            }
            var i;

            function a(e, n, a) {
                var r = $(this),
                    s = r.data(m) || {};
                s.w = n !== t ? n : r.width();
                s.h = a !== t ? a : r.height();
                i.apply(this, arguments)
            }
            if ($.isFunction(e)) {
                i = e;
                return a
            } else {
                i = e.handler;
                e.handler = a
            }
        }
    };

    function h(t) {
        if (r === true) {
            r = t || 1
        }
        for (var s = i.length - 1; s >= 0; s--) {
            var l = $(i[s]);
            if (l[0] == e || l.is(":visible")) {
                var f = l.width(),
                    c = l.height(),
                    d = l.data(m);
                if (d && (f !== d.w || c !== d.h)) {
                    l.trigger(u, [d.w = f, d.h = c]);
                    r = t || true
                }
            } else {
                d = l.data(m);
                d.w = 0;
                d.h = 0
            }
        }
        if (a !== null) {
            if (r && (t == null || t - r < 1e3)) {
                a = e.requestAnimationFrame(h)
            } else {
                a = setTimeout(h, n[o]);
                r = false
            }
        }
    }
    if (!e.requestAnimationFrame) {
        e.requestAnimationFrame = function() {
            return e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(t, i) {
                    return e.setTimeout(function() {
                        t((new Date).getTime())
                    }, n[l])
                }
        }()
    }
    if (!e.cancelAnimationFrame) {
        e.cancelAnimationFrame = function() {
            return e.webkitCancelRequestAnimationFrame || e.mozCancelRequestAnimationFrame || e.oCancelRequestAnimationFrame || e.msCancelRequestAnimationFrame || clearTimeout
        }()
    }
})(jQuery, this);
(function($) {
    var options = {};

    function init(plot) {
        function onResize() {
            var placeholder = plot.getPlaceholder();
            if (placeholder.width() == 0 || placeholder.height() == 0)
                return;
            plot.resize();
            plot.setupGrid();
            plot.draw();
        }

        function bindEvents(plot, eventHolder) {
            plot.getPlaceholder().resize(onResize);
        }

        function shutdown(plot, eventHolder) {
            plot.getPlaceholder().unbind("resize", onResize);
        }
        plot.hooks.bindEvents.push(bindEvents);
        plot.hooks.shutdown.push(shutdown);
    }
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'resize',
        version: '1.0'
    });
})(jQuery);
(function(e) {
    var t, o, n = {
            className: "autosizejs",
            append: "",
            callback: !1
        },
        i = "hidden",
        s = "border-box",
        a = "lineHeight",
        l = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',
        r = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
        c = "oninput",
        h = "onpropertychange",
        p = e(l).data("autosize", !0)[0];
    p.style.lineHeight = "99px", "99px" === e(p).css(a) && r.push(a), p.style.lineHeight = "", e.fn.autosize = function(a) {
        return a = e.extend({}, n, a || {}), p.parentNode !== document.body && (e(document.body).append(p), p.value = "\n\n\n", p.scrollTop = 9e4, t = p.scrollHeight === p.scrollTop + p.clientHeight), this.each(function() {
            function n() {
                o = b, p.className = a.className, e.each(r, function(e, t) {
                    p.style[t] = f.css(t)
                })
            }

            function l() {
                var e, s, l;
                if (o !== b && n(), !d) {
                    d = !0, p.value = b.value + a.append, p.style.overflowY = b.style.overflowY, l = parseInt(b.style.height, 10), p.style.width = Math.max(f.width(), 0) + "px", t ? e = p.scrollHeight : (p.scrollTop = 0, p.scrollTop = 9e4, e = p.scrollTop);
                    var r = parseInt(f.css("maxHeight"), 10);
                    r = r && r > 0 ? r : 9e4, e > r ? (e = r, s = "scroll") : u > e && (e = u), e += x, b.style.overflowY = s || i, l !== e && (b.style.height = e + "px", w && a.callback.call(b)), setTimeout(function() {
                        d = !1
                    }, 1)
                }
            }
            var u, d, g, b = this,
                f = e(b),
                x = 0,
                w = e.isFunction(a.callback);
            f.data("autosize") || ((f.css("box-sizing") === s || f.css("-moz-box-sizing") === s || f.css("-webkit-box-sizing") === s) && (x = f.outerHeight() - f.height()), u = Math.max(parseInt(f.css("minHeight"), 10) - x, f.height()), g = "none" === f.css("resize") || "vertical" === f.css("resize") ? "none" : "horizontal", f.css({
                overflow: i,
                overflowY: i,
                wordWrap: "break-word",
                resize: g
            }).data("autosize", !0), h in b ? c in b ? b[c] = b.onkeyup = l : b[h] = l : b[c] = l, e(window).on("resize", function() {
                d = !1, l()
            }), f.on("autosize", function() {
                d = !1, l()
            }), l())
        })
    }
})(window.jQuery || window.Zepto);
(function() {
    "use strict";
    var root = this;
    var timezoneJS = {};
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = timezoneJS;
        }
        exports.timezoneJS = timezoneJS;
    } else {
        root.timezoneJS = timezoneJS;
    }
    timezoneJS.VERSION = '0.4.4';
    var $ = root.$ || root.jQuery || root.Zepto,
        fleegix = root.fleegix,
        DAYS = timezoneJS.Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        MONTHS = timezoneJS.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        SHORT_MONTHS = {},
        SHORT_DAYS = {},
        EXACT_DATE_TIME = {};
    for (var i = 0; i < MONTHS.length; i++) {
        SHORT_MONTHS[MONTHS[i].substr(0, 3)] = i;
    }
    for (i = 0; i < DAYS.length; i++) {
        SHORT_DAYS[DAYS[i].substr(0, 3)] = i;
    }
    var _arrIndexOf = Array.prototype.indexOf || function(el) {
            if (this === null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) {
                    n = 0;
                } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === el) {
                    return k;
                }
            }
            return -1;
        };
    var _fixWidth = function(number, digits) {
        if (typeof number !== "number") {
            throw "not a number: " + number;
        }
        var trim = (number > 1000);
        var s = number.toString();
        var s_len = s.length;
        if (trim && s_len > digits) {
            return s.substr(s_len - digits, s_len);
        }
        s = [s];
        while (s_len < digits) {
            s.unshift('0');
            s_len++;
        }
        return s.join('');
    };
    var _transport = function(opts) {
        if ((!fleegix || typeof fleegix.xhr === 'undefined') && (!jQuery || typeof jQuery.ajax === 'undefined')) {
            throw new Error('Please use the Fleegix.js XHR module, jQuery ajax, Zepto ajax, or define your own transport mechanism for downloading zone files.');
        }
        if (!opts) return;
        if (!opts.url) throw new Error('URL must be specified');
        if (!('async' in opts)) opts.async = true;
        if (!opts.async) {
            return fleegix && fleegix.xhr ? fleegix.xhr.doReq({
                url: opts.url,
                async: false
            }) : jQuery.ajax({
                url: opts.url,
                async: false,
                dataType: 'text'
            }).responseText;
        }
        return fleegix && fleegix.xhr ? fleegix.xhr.send({
            url: opts.url,
            method: 'get',
            handleSuccess: opts.success,
            handleErr: opts.error
        }) : jQuery.ajax({
            url: opts.url,
            dataType: 'text',
            method: 'GET',
            error: opts.error,
            success: opts.success
        });
    };
    timezoneJS.Date = function() {
        if (this === timezoneJS) {
            throw "timezoneJS.Date object must be constructed with 'new'";
        }
        var args = Array.prototype.slice.apply(arguments),
            dt = null,
            tz = null,
            arr = [],
            valid = false;
        if (Object.prototype.toString.call(args[0]) === '[object Array]') {
            args = args[0];
        }
        if (typeof args[args.length - 1] === 'string') {
            valid = Date.parse(args[args.length - 1].replace(/GMT\+\d+/, ''));
            if (isNaN(valid) || valid === null) {
                tz = args.pop();
            }
        }
        var is_dt_local = false;
        switch (args.length) {
            case 0:
                dt = new Date();
                break;
            case 1:
                dt = new Date(args[0]);
                if (typeof args[0] == 'string' && args[0].search(/[+-][0-9]{4}/) == -1 && args[0].search(/Z/) == -1 && args[0].search(/T/) == -1) {
                    is_dt_local = true;
                }
                break;
            case 2:
                dt = new Date(args[0], args[1]);
                is_dt_local = true;
                break;
            default:
                for (var i = 0; i < 7; i++) {
                    arr[i] = args[i] || 0;
                }
                dt = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);
                is_dt_local = true;
                break;
        }
        this._useCache = false;
        this._tzInfo = {};
        this._day = 0;
        this.year = 0;
        this.month = 0;
        this.date = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.timezone = tz || null;
        if (is_dt_local) {
            this.setFromDateObjProxy(dt);
        } else {
            this.setFromTimeProxy(dt.getTime(), tz);
        }
    };
    timezoneJS.Date.prototype = {
        getDate: function() {
            return this.date;
        },
        getDay: function() {
            return this._day;
        },
        getFullYear: function() {
            return this.year;
        },
        getMonth: function() {
            return this.month;
        },
        getYear: function() {
            return this.year - 1900;
        },
        getHours: function() {
            return this.hours;
        },
        getMilliseconds: function() {
            return this.milliseconds;
        },
        getMinutes: function() {
            return this.minutes;
        },
        getSeconds: function() {
            return this.seconds;
        },
        getUTCDate: function() {
            return this.getUTCDateProxy().getUTCDate();
        },
        getUTCDay: function() {
            return this.getUTCDateProxy().getUTCDay();
        },
        getUTCFullYear: function() {
            return this.getUTCDateProxy().getUTCFullYear();
        },
        getUTCHours: function() {
            return this.getUTCDateProxy().getUTCHours();
        },
        getUTCMilliseconds: function() {
            return this.getUTCDateProxy().getUTCMilliseconds();
        },
        getUTCMinutes: function() {
            return this.getUTCDateProxy().getUTCMinutes();
        },
        getUTCMonth: function() {
            return this.getUTCDateProxy().getUTCMonth();
        },
        getUTCSeconds: function() {
            return this.getUTCDateProxy().getUTCSeconds();
        },
        getTime: function() {
            return this._timeProxy + (this.getTimezoneOffset() * 60 * 1000);
        },
        getTimezone: function() {
            return this.timezone;
        },
        getTimezoneOffset: function() {
            return this.getTimezoneInfo().tzOffset;
        },
        getTimezoneAbbreviation: function() {
            return this.getTimezoneInfo().tzAbbr;
        },
        getTimezoneInfo: function() {
            if (this._useCache) return this._tzInfo;
            var res;
            if (this.timezone) {
                res = this.timezone === 'Etc/UTC' || this.timezone === 'Etc/GMT' ? {
                    tzOffset: 0,
                    tzAbbr: 'UTC'
                } : timezoneJS.timezone.getTzInfo(this._timeProxy, this.timezone);
            } else {
                res = {
                    tzOffset: this.getLocalOffset(),
                    tzAbbr: null
                };
            }
            this._tzInfo = res;
            this._useCache = true;
            return res;
        },
        getUTCDateProxy: function() {
            var dt = new Date(this._timeProxy);
            dt.setUTCMinutes(dt.getUTCMinutes() + this.getTimezoneOffset());
            return dt;
        },
        setDate: function(date) {
            this.setAttribute('date', date);
            return this.getTime();
        },
        setFullYear: function(year, month, date) {
            if (date !== undefined) {
                this.setAttribute('date', 1);
            }
            this.setAttribute('year', year);
            if (month !== undefined) {
                this.setAttribute('month', month);
            }
            if (date !== undefined) {
                this.setAttribute('date', date);
            }
            return this.getTime();
        },
        setMonth: function(month, date) {
            this.setAttribute('month', month);
            if (date !== undefined) {
                this.setAttribute('date', date);
            }
            return this.getTime();
        },
        setYear: function(year) {
            year = Number(year);
            if (0 <= year && year <= 99) {
                year += 1900;
            }
            this.setUTCAttribute('year', year);
            return this.getTime();
        },
        setHours: function(hours, minutes, seconds, milliseconds) {
            this.setAttribute('hours', hours);
            if (minutes !== undefined) {
                this.setAttribute('minutes', minutes);
            }
            if (seconds !== undefined) {
                this.setAttribute('seconds', seconds);
            }
            if (milliseconds !== undefined) {
                this.setAttribute('milliseconds', milliseconds);
            }
            return this.getTime();
        },
        setMinutes: function(minutes, seconds, milliseconds) {
            this.setAttribute('minutes', minutes);
            if (seconds !== undefined) {
                this.setAttribute('seconds', seconds);
            }
            if (milliseconds !== undefined) {
                this.setAttribute('milliseconds', milliseconds);
            }
            return this.getTime();
        },
        setSeconds: function(seconds, milliseconds) {
            this.setAttribute('seconds', seconds);
            if (milliseconds !== undefined) {
                this.setAttribute('milliseconds', milliseconds);
            }
            return this.getTime();
        },
        setMilliseconds: function(milliseconds) {
            this.setAttribute('milliseconds', milliseconds);
            return this.getTime();
        },
        setTime: function(n) {
            if (isNaN(n)) {
                throw new Error('Units must be a number.');
            }
            this.setFromTimeProxy(n, this.timezone);
            return this.getTime();
        },
        setUTCFullYear: function(year, month, date) {
            if (date !== undefined) {
                this.setUTCAttribute('date', 1);
            }
            this.setUTCAttribute('year', year);
            if (month !== undefined) {
                this.setUTCAttribute('month', month);
            }
            if (date !== undefined) {
                this.setUTCAttribute('date', date);
            }
            return this.getTime();
        },
        setUTCMonth: function(month, date) {
            this.setUTCAttribute('month', month);
            if (date !== undefined) {
                this.setUTCAttribute('date', date);
            }
            return this.getTime();
        },
        setUTCDate: function(date) {
            this.setUTCAttribute('date', date);
            return this.getTime();
        },
        setUTCHours: function(hours, minutes, seconds, milliseconds) {
            this.setUTCAttribute('hours', hours);
            if (minutes !== undefined) {
                this.setUTCAttribute('minutes', minutes);
            }
            if (seconds !== undefined) {
                this.setUTCAttribute('seconds', seconds);
            }
            if (milliseconds !== undefined) {
                this.setUTCAttribute('milliseconds', milliseconds);
            }
            return this.getTime();
        },
        setUTCMinutes: function(minutes, seconds, milliseconds) {
            this.setUTCAttribute('minutes', minutes);
            if (seconds !== undefined) {
                this.setUTCAttribute('seconds', seconds);
            }
            if (milliseconds !== undefined) {
                this.setUTCAttribute('milliseconds', milliseconds);
            }
            return this.getTime();
        },
        setUTCSeconds: function(seconds, milliseconds) {
            this.setUTCAttribute('seconds', seconds);
            if (milliseconds !== undefined) {
                this.setUTCAttribute('milliseconds', milliseconds);
            }
            return this.getTime();
        },
        setUTCMilliseconds: function(milliseconds) {
            this.setUTCAttribute('milliseconds', milliseconds);
            return this.getTime();
        },
        setFromDateObjProxy: function(dt) {
            this.year = dt.getFullYear();
            this.month = dt.getMonth();
            this.date = dt.getDate();
            this.hours = dt.getHours();
            this.minutes = dt.getMinutes();
            this.seconds = dt.getSeconds();
            this.milliseconds = dt.getMilliseconds();
            this._day = dt.getDay();
            this._dateProxy = dt;
            this._timeProxy = Date.UTC(this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds);
            this._useCache = false;
        },
        setFromTimeProxy: function(utcMillis, tz) {
            var dt = new Date(utcMillis);
            var tzOffset = tz ? timezoneJS.timezone.getTzInfo(utcMillis, tz, true).tzOffset : dt.getTimezoneOffset();
            dt.setTime(utcMillis + (dt.getTimezoneOffset() - tzOffset) * 60000);
            this.setFromDateObjProxy(dt);
        },
        setAttribute: function(unit, n) {
            if (isNaN(n)) {
                throw new Error('Units must be a number.');
            }
            var dt = this._dateProxy;
            var meth = unit === 'year' ? 'FullYear' : unit.substr(0, 1).toUpperCase() + unit.substr(1);
            dt['set' + meth](n);
            this.setFromDateObjProxy(dt);
        },
        setUTCAttribute: function(unit, n) {
            if (isNaN(n)) {
                throw new Error('Units must be a number.');
            }
            var meth = unit === 'year' ? 'FullYear' : unit.substr(0, 1).toUpperCase() + unit.substr(1);
            var dt = this.getUTCDateProxy();
            dt['setUTC' + meth](n);
            dt.setUTCMinutes(dt.getUTCMinutes() - this.getTimezoneOffset());
            this.setFromTimeProxy(dt.getTime() + this.getTimezoneOffset() * 60000, this.timezone);
        },
        setTimezone: function(tz) {
            var previousOffset = this.getTimezoneInfo().tzOffset;
            this.timezone = tz;
            this._useCache = false;
            this.setUTCMinutes(this.getUTCMinutes() - this.getTimezoneInfo().tzOffset + previousOffset);
        },
        removeTimezone: function() {
            this.timezone = null;
            this._useCache = false;
        },
        valueOf: function() {
            return this.getTime();
        },
        clone: function() {
            return this.timezone ? new timezoneJS.Date(this.getTime(), this.timezone) : new timezoneJS.Date(this.getTime());
        },
        toGMTString: function() {
            return this.toString('EEE, dd MMM yyyy HH:mm:ss Z', 'Etc/GMT');
        },
        toLocaleString: function() {},
        toLocaleDateString: function() {},
        toLocaleTimeString: function() {},
        toSource: function() {},
        toISOString: function() {
            return this.toString('yyyy-MM-ddTHH:mm:ss.SSS', 'Etc/UTC') + 'Z';
        },
        toJSON: function() {
            return this.toISOString();
        },
        toString: function(format, tz) {
            if (!format) format = 'yyyy-MM-dd HH:mm:ss';
            var result = format;
            var tzInfo = tz ? timezoneJS.timezone.getTzInfo(this.getTime(), tz) : this.getTimezoneInfo();
            var _this = this;
            if (tz) {
                _this = this.clone();
                _this.setTimezone(tz);
            }
            var hours = _this.getHours();
            return result.replace(/a+/g, function() {
                return 'k';
            }).replace(/y+/g, function(token) {
                return _fixWidth(_this.getFullYear(), token.length);
            }).replace(/d+/g, function(token) {
                return _fixWidth(_this.getDate(), token.length);
            }).replace(/m+/g, function(token) {
                return _fixWidth(_this.getMinutes(), token.length);
            }).replace(/s+/g, function(token) {
                return _fixWidth(_this.getSeconds(), token.length);
            }).replace(/S+/g, function(token) {
                return _fixWidth(_this.getMilliseconds(), token.length);
            }).replace(/h+/g, function(token) {
                return _fixWidth(((hours % 12) === 0) ? 12 : (hours % 12), token.length);
            }).replace(/M+/g, function(token) {
                var _month = _this.getMonth(),
                    _len = token.length;
                if (_len > 3) {
                    return timezoneJS.Months[_month];
                } else if (_len > 2) {
                    return timezoneJS.Months[_month].substring(0, _len);
                }
                return _fixWidth(_month + 1, _len);
            }).replace(/k+/g, function() {
                if (hours >= 12) {
                    if (hours > 12) {
                        hours -= 12;
                    }
                    return 'PM';
                }
                return 'AM';
            }).replace(/H+/g, function(token) {
                return _fixWidth(hours, token.length);
            }).replace(/E+/g, function(token) {
                return DAYS[_this.getDay()].substring(0, token.length);
            }).replace(/Z+/gi, function() {
                return tzInfo.tzAbbr;
            });
        },
        toUTCString: function() {
            return this.toGMTString();
        },
        civilToJulianDayNumber: function(y, m, d) {
            var a;
            m++;
            if (m > 12) {
                a = parseInt(m / 12, 10);
                m = m % 12;
                y += a;
            }
            if (m <= 2) {
                y -= 1;
                m += 12;
            }
            a = Math.floor(y / 100);
            var b = 2 - a + Math.floor(a / 4),
                jDt = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524;
            return jDt;
        },
        getLocalOffset: function() {
            return this._dateProxy.getTimezoneOffset();
        }
    };
    timezoneJS.timezone = new function() {
        var _this = this,
            regionMap = {
                'Etc': 'etcetera',
                'EST': 'northamerica',
                'MST': 'northamerica',
                'HST': 'northamerica',
                'EST5EDT': 'northamerica',
                'CST6CDT': 'northamerica',
                'MST7MDT': 'northamerica',
                'PST8PDT': 'northamerica',
                'America': 'northamerica',
                'Pacific': 'australasia',
                'Atlantic': 'europe',
                'Africa': 'africa',
                'Indian': 'africa',
                'Antarctica': 'antarctica',
                'Asia': 'asia',
                'Australia': 'australasia',
                'Europe': 'europe',
                'WET': 'europe',
                'CET': 'europe',
                'MET': 'europe',
                'EET': 'europe'
            },
            regionExceptions = {
                'Pacific/Honolulu': 'northamerica',
                'Atlantic/Bermuda': 'northamerica',
                'Atlantic/Cape_Verde': 'africa',
                'Atlantic/St_Helena': 'africa',
                'Indian/Kerguelen': 'antarctica',
                'Indian/Chagos': 'asia',
                'Indian/Maldives': 'asia',
                'Indian/Christmas': 'australasia',
                'Indian/Cocos': 'australasia',
                'America/Danmarkshavn': 'europe',
                'America/Scoresbysund': 'europe',
                'America/Godthab': 'europe',
                'America/Thule': 'europe',
                'Asia/Istanbul': 'europe',
                'Asia/Yekaterinburg': 'europe',
                'Asia/Omsk': 'europe',
                'Asia/Novosibirsk': 'europe',
                'Asia/Krasnoyarsk': 'europe',
                'Asia/Irkutsk': 'europe',
                'Asia/Yakutsk': 'europe',
                'Asia/Vladivostok': 'europe',
                'Asia/Sakhalin': 'europe',
                'Asia/Magadan': 'europe',
                'Asia/Kamchatka': 'europe',
                'Asia/Anadyr': 'europe',
                'Africa/Ceuta': 'europe',
                'America/Argentina/Buenos_Aires': 'southamerica',
                'America/Argentina/Salta': 'southamerica',
                'America/Argentina/San_Luis': 'southamerica',
                'America/Argentina/Cordoba': 'southamerica',
                'America/Argentina/Tucuman': 'southamerica',
                'America/Argentina/La_Rioja': 'southamerica',
                'America/Argentina/San_Juan': 'southamerica',
                'America/Argentina/Jujuy': 'southamerica',
                'America/Argentina/Catamarca': 'southamerica',
                'America/Argentina/Mendoza': 'southamerica',
                'America/Argentina/Rio_Gallegos': 'southamerica',
                'America/Argentina/Ushuaia': 'southamerica',
                'America/Aruba': 'southamerica',
                'America/La_Paz': 'southamerica',
                'America/Noronha': 'southamerica',
                'America/Belem': 'southamerica',
                'America/Fortaleza': 'southamerica',
                'America/Recife': 'southamerica',
                'America/Araguaina': 'southamerica',
                'America/Maceio': 'southamerica',
                'America/Bahia': 'southamerica',
                'America/Sao_Paulo': 'southamerica',
                'America/Campo_Grande': 'southamerica',
                'America/Cuiaba': 'southamerica',
                'America/Porto_Velho': 'southamerica',
                'America/Boa_Vista': 'southamerica',
                'America/Manaus': 'southamerica',
                'America/Eirunepe': 'southamerica',
                'America/Rio_Branco': 'southamerica',
                'America/Santiago': 'southamerica',
                'Pacific/Easter': 'southamerica',
                'America/Bogota': 'southamerica',
                'America/Curacao': 'southamerica',
                'America/Guayaquil': 'southamerica',
                'Pacific/Galapagos': 'southamerica',
                'Atlantic/Stanley': 'southamerica',
                'America/Cayenne': 'southamerica',
                'America/Guyana': 'southamerica',
                'America/Asuncion': 'southamerica',
                'America/Lima': 'southamerica',
                'Atlantic/South_Georgia': 'southamerica',
                'America/Paramaribo': 'southamerica',
                'America/Port_of_Spain': 'southamerica',
                'America/Montevideo': 'southamerica',
                'America/Caracas': 'southamerica',
                'GMT': 'etcetera',
                'Europe/Nicosia': 'asia'
            };

        function invalidTZError(t) {
            throw new Error('Timezone "' + t + '" is either incorrect, or not loaded in the timezone registry.');
        }

        function builtInLoadZoneFile(fileName, opts) {
            var url = _this.zoneFileBasePath + '/' + fileName;
            return !opts || !opts.async ? _this.parseZones(_this.transport({
                url: url,
                async: false
            })) : _this.transport({
                async: true,
                url: url,
                success: function(str) {
                    return _this.parseZones(str) && typeof opts.callback === 'function' && opts.callback();
                },
                error: function() {
                    throw new Error('Error retrieving "' + url + '" zoneinfo files');
                }
            });
        }

        function getRegionForTimezone(tz) {
            var exc = regionExceptions[tz],
                reg, ret;
            if (exc) return exc;
            reg = tz.split('/')[0];
            ret = regionMap[reg];
            if (ret) return ret;
            var link = _this.zones[tz];
            if (typeof link === 'string') {
                return getRegionForTimezone(link);
            }
            if (!_this.loadedZones.backward) {
                _this.loadZoneFile('backward');
                return getRegionForTimezone(tz);
            }
            invalidTZError(tz);
        }

        function parseTimeString(str) {
            var pat = /(\d+)(?::0*(\d*))?(?::0*(\d*))?([wsugz])?$/;
            var hms = str.match(pat);
            hms[1] = parseInt(hms[1], 10);
            hms[2] = hms[2] ? parseInt(hms[2], 10) : 0;
            hms[3] = hms[3] ? parseInt(hms[3], 10) : 0;
            return hms.slice(1, 5);
        }

        function processZone(z) {
            if (!z[3]) {
                return;
            }
            var yea = parseInt(z[3], 10),
                mon = 11,
                dat = 31;
            if (z[4]) {
                mon = SHORT_MONTHS[z[4].substr(0, 3)];
                dat = parseInt(z[5], 10) || 1;
            }
            var t = z[6] ? parseTimeString(z[6]) : [0, 0, 0];
            return [yea, mon, dat, t[0], t[1], t[2]];
        }

        function getZone(dt, tz) {
            var utcMillis = typeof dt === 'number' ? dt : new Date(dt).getTime();
            var t = tz;
            var zoneList = _this.zones[t];
            while (typeof zoneList === "string") {
                t = zoneList;
                zoneList = _this.zones[t];
            }
            if (!zoneList) {
                if (!_this.loadedZones.backward) {
                    _this.loadZoneFile('backward');
                    return getZone(dt, tz);
                }
                invalidTZError(t);
            }
            if (zoneList.length === 0) {
                throw new Error('No Zone found for "' + tz + '" on ' + dt);
            }
            for (var i = zoneList.length - 1; i >= 0; i--) {
                var z = zoneList[i];
                if (z[3] && utcMillis > z[3]) break;
            }
            return zoneList[i + 1];
        }

        function getBasicOffset(time) {
            var off = parseTimeString(time),
                adj = time.charAt(0) === '-' ? -1 : 1;
            off = adj * (((off[0] * 60 + off[1]) * 60 + off[2]) * 1000);
            return off / 60 / 1000;
        }

        function getAdjustedOffset(off, min) {
            return -Math.ceil(min - off);
        }

        function getRule(dt, zone, isUTC) {
            var date = typeof dt === 'number' ? new Date(dt) : dt;
            var ruleset = zone[1];
            var basicOffset = zone[0];
            var staticDstMatch = ruleset.match(/^([0-9]):([0-9][0-9])$/);
            if (staticDstMatch) {
                return [-1000000, 'max', '-', 'Jan', 1, [0, 0, 0], parseInt(staticDstMatch[1], 10) * 60 + parseInt(staticDstMatch[2], 10), '-'];
            }
            var convertDateToUTC = function(date, type, rule) {
                var offset = 0;
                if (type === 'u' || type === 'g' || type === 'z') {
                    offset = 0;
                } else if (type === 's') {
                    offset = basicOffset;
                } else if (type === 'w' || !type) {
                    offset = getAdjustedOffset(basicOffset, rule[6]);
                } else {
                    throw new Error("unknown type " + type);
                }
                offset *= 60 * 1000;
                return new Date(date.getTime() + offset);
            };
            var convertRuleToExactDateAndTime = function(yearAndRule, prevRule) {
                var year = yearAndRule[0],
                    rule = yearAndRule[1];
                var hms = rule[5];
                var effectiveDate;
                if (!EXACT_DATE_TIME[year])
                    EXACT_DATE_TIME[year] = {};
                if (EXACT_DATE_TIME[year][rule])
                    effectiveDate = EXACT_DATE_TIME[year][rule];
                else {
                    if (!isNaN(rule[4])) {
                        effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]], rule[4], hms[0], hms[1], hms[2], 0));
                    } else {
                        var targetDay, operator;
                        if (rule[4].substr(0, 4) === "last") {
                            effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]] + 1, 1, hms[0] - 24, hms[1], hms[2], 0));
                            targetDay = SHORT_DAYS[rule[4].substr(4, 3)];
                            operator = "<=";
                        } else {
                            effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]], rule[4].substr(5), hms[0], hms[1], hms[2], 0));
                            targetDay = SHORT_DAYS[rule[4].substr(0, 3)];
                            operator = rule[4].substr(3, 2);
                        }
                        var ourDay = effectiveDate.getUTCDay();
                        if (operator === ">=") {
                            effectiveDate.setUTCDate(effectiveDate.getUTCDate() + (targetDay - ourDay + ((targetDay < ourDay) ? 7 : 0)));
                        } else {
                            effectiveDate.setUTCDate(effectiveDate.getUTCDate() + (targetDay - ourDay - ((targetDay > ourDay) ? 7 : 0)));
                        }
                    }
                    EXACT_DATE_TIME[year][rule] = effectiveDate;
                }
                if (prevRule) {
                    effectiveDate = convertDateToUTC(effectiveDate, hms[3], prevRule);
                }
                return effectiveDate;
            };
            var findApplicableRules = function(year, ruleset) {
                var applicableRules = [];
                for (var i = 0; ruleset && i < ruleset.length; i++) {
                    if (ruleset[i][0] <= year && (ruleset[i][1] >= year || (ruleset[i][0] === year && ruleset[i][1] === "only") || ruleset[i][1] === "max")) {
                        applicableRules.push([year, ruleset[i]]);
                    }
                }
                return applicableRules;
            };
            var compareDates = function(a, b, prev) {
                var year, rule;
                if (!(a instanceof Date)) {
                    year = a[0];
                    rule = a[1];
                    a = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule]) ? EXACT_DATE_TIME[year][rule] : convertRuleToExactDateAndTime(a, prev);
                } else if (prev) {
                    a = convertDateToUTC(a, isUTC ? 'u' : 'w', prev);
                }
                if (!(b instanceof Date)) {
                    year = b[0];
                    rule = b[1];
                    b = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule]) ? EXACT_DATE_TIME[year][rule] : convertRuleToExactDateAndTime(b, prev);
                } else if (prev) {
                    b = convertDateToUTC(b, isUTC ? 'u' : 'w', prev);
                }
                a = Number(a);
                b = Number(b);
                return a - b;
            };
            var year = date.getUTCFullYear();
            var applicableRules;
            applicableRules = findApplicableRules(year, _this.rules[ruleset]);
            applicableRules.push(date);
            applicableRules.sort(compareDates);
            if (_arrIndexOf.call(applicableRules, date) < 2) {
                applicableRules = applicableRules.concat(findApplicableRules(year - 1, _this.rules[ruleset]));
                applicableRules.sort(compareDates);
            }
            var pinpoint = _arrIndexOf.call(applicableRules, date);
            if (pinpoint > 1 && compareDates(date, applicableRules[pinpoint - 1], applicableRules[pinpoint - 2][1]) < 0) {
                return applicableRules[pinpoint - 2][1];
            } else if (pinpoint > 0 && pinpoint < applicableRules.length - 1 && compareDates(date, applicableRules[pinpoint + 1], applicableRules[pinpoint - 1][1]) > 0) {
                return applicableRules[pinpoint + 1][1];
            } else if (pinpoint === 0) {
                return null;
            }
            return applicableRules[pinpoint - 1][1];
        }

        function getAbbreviation(zone, rule) {
            var base = zone[2];
            if (base.indexOf('%s') > -1) {
                var repl;
                if (rule) {
                    repl = rule[7] === '-' ? '' : rule[7];
                } else {
                    repl = 'S';
                }
                return base.replace('%s', repl);
            } else if (base.indexOf('/') > -1) {
                return base.split("/", 2)[rule ? (rule[6] ? 1 : 0) : 0];
            }
            return base;
        }
        this.zoneFileBasePath = null;
        this.zoneFiles = ['africa', 'antarctica', 'asia', 'australasia', 'backward', 'etcetera', 'europe', 'northamerica', 'pacificnew', 'southamerica'];
        this.loadingSchemes = {
            PRELOAD_ALL: 'preloadAll',
            LAZY_LOAD: 'lazyLoad',
            MANUAL_LOAD: 'manualLoad'
        };
        this.getRegionForTimezone = getRegionForTimezone;
        this.loadingScheme = this.loadingSchemes.LAZY_LOAD;
        this.loadedZones = {};
        this.zones = {};
        this.rules = {};
        this.init = function(o) {
            var opts = {
                    async: true
                },
                def = this.loadingScheme === this.loadingSchemes.PRELOAD_ALL ? this.zoneFiles : (this.defaultZoneFile || 'northamerica'),
                done = 0,
                callbackFn;
            for (var p in o) {
                opts[p] = o[p];
            }
            if (typeof def === 'string') {
                return this.loadZoneFile(def, opts);
            }
            callbackFn = opts.callback;
            opts.callback = function() {
                done++;
                (done === def.length) && typeof callbackFn === 'function' && callbackFn();
            };
            for (var i = 0; i < def.length; i++) {
                this.loadZoneFile(def[i], opts);
            }
        };
        this.loadZoneFile = function(fileName, opts) {
            if (typeof this.zoneFileBasePath === 'undefined') {
                throw new Error('Please define a base path to your zone file directory -- timezoneJS.timezone.zoneFileBasePath.');
            }
            if (this.loadedZones[fileName]) {
                return;
            }
            this.loadedZones[fileName] = true;
            return builtInLoadZoneFile(fileName, opts);
        };
        this.loadZoneJSONData = function(url, sync) {
            var processData = function(data) {
                data = eval('(' + data + ')');
                for (var z in data.zones) {
                    _this.zones[z] = data.zones[z];
                }
                for (var r in data.rules) {
                    _this.rules[r] = data.rules[r];
                }
            };
            return sync ? processData(_this.transport({
                url: url,
                async: false
            })) : _this.transport({
                url: url,
                success: processData
            });
        };
        this.loadZoneDataFromObject = function(data) {
            if (!data) {
                return;
            }
            for (var z in data.zones) {
                _this.zones[z] = data.zones[z];
            }
            for (var r in data.rules) {
                _this.rules[r] = data.rules[r];
            }
        };
        this.getAllZones = function() {
            var arr = [];
            for (var z in this.zones) {
                arr.push(z);
            }
            return arr.sort();
        };
        this.parseZones = function(str) {
            var lines = str.split('\n'),
                arr = [],
                chunk = '',
                l, zone = null,
                rule = null;
            for (var i = 0; i < lines.length; i++) {
                l = lines[i];
                if (l.match(/^\s/)) {
                    l = "Zone " + zone + l;
                }
                l = l.split("#")[0];
                if (l.length > 3) {
                    arr = l.split(/\s+/);
                    chunk = arr.shift();
                    switch (chunk) {
                        case 'Zone':
                            zone = arr.shift();
                            if (!_this.zones[zone]) {
                                _this.zones[zone] = [];
                            }
                            if (arr.length < 3) break;
                            arr.splice(3, arr.length, processZone(arr));
                            if (arr[3]) arr[3] = Date.UTC.apply(null, arr[3]);
                            arr[0] = -getBasicOffset(arr[0]);
                            _this.zones[zone].push(arr);
                            break;
                        case 'Rule':
                            rule = arr.shift();
                            if (!_this.rules[rule]) {
                                _this.rules[rule] = [];
                            }
                            arr[0] = parseInt(arr[0], 10);
                            arr[1] = parseInt(arr[1], 10) || arr[1];
                            arr[5] = parseTimeString(arr[5]);
                            arr[6] = getBasicOffset(arr[6]);
                            _this.rules[rule].push(arr);
                            break;
                        case 'Link':
                            if (_this.zones[arr[1]]) {
                                throw new Error('Error with Link ' + arr[1] + '. Cannot create link of a preexisted zone.');
                            }
                            _this.zones[arr[1]] = arr[0];
                            break;
                    }
                }
            }
            return true;
        };
        this.transport = _transport;
        this.getTzInfo = function(dt, tz, isUTC) {
            if (this.loadingScheme === this.loadingSchemes.LAZY_LOAD) {
                var zoneFile = getRegionForTimezone(tz);
                if (!zoneFile) {
                    throw new Error('Not a valid timezone ID.');
                }
                if (!this.loadedZones[zoneFile]) {
                    this.loadZoneFile(zoneFile);
                }
            }
            var z = getZone(dt, tz);
            var off = z[0];
            var rule = getRule(dt, z, isUTC);
            if (rule) {
                off = getAdjustedOffset(off, rule[6]);
            }
            var abbr = getAbbreviation(z, rule);
            return {
                tzOffset: off,
                tzAbbr: abbr
            };
        };
    };
}).call(this);
(function($) {
    'use strict';
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(scope) {
            var fn = this;
            return function() {
                return fn.apply(scope);
            };
        };
    }
    var uuid = 0;
    $.fn.redactor = function(options) {
        var val = [];
        var args = Array.prototype.slice.call(arguments, 1);
        if (typeof options === 'string') {
            this.each(function() {
                var instance = $.data(this, 'redactor');
                var func;
                if (options.search(/\./) != '-1') {
                    func = options.split('.');
                    if (typeof instance[func[0]] != 'undefined') {
                        func = instance[func[0]][func[1]];
                    }
                } else {
                    func = instance[options];
                }
                if (typeof instance !== 'undefined' && $.isFunction(func)) {
                    var methodVal = func.apply(instance, args);
                    if (methodVal !== undefined && methodVal !== instance) {
                        val.push(methodVal);
                    }
                } else {
                    $.error('No such method "' + options + '" for Redactor');
                }
            });
        } else {
            this.each(function() {
                $.data(this, 'redactor', {});
                $.data(this, 'redactor', Redactor(this, options));
            });
        }
        if (val.length === 0) return this;
        else if (val.length === 1) return val[0];
        else return val;
    };

    function Redactor(el, options) {
        return new Redactor.prototype.init(el, options);
    }
    $.Redactor = Redactor;
    $.Redactor.VERSION = '10.2.3';
    $.Redactor.modules = ['alignment', 'autosave', 'block', 'buffer', 'build', 'button', 'caret', 'clean', 'code', 'core', 'dropdown', 'file', 'focus', 'image', 'indent', 'inline', 'insert', 'keydown', 'keyup', 'lang', 'line', 'link', 'linkify', 'list', 'modal', 'observe', 'paragraphize', 'paste', 'placeholder', 'progress', 'selection', 'shortcuts', 'tabifier', 'tidy', 'toolbar', 'upload', 'utils'];
    $.Redactor.opts = {
        lang: 'en',
        direction: 'ltr',
        plugins: false,
        focus: false,
        focusEnd: false,
        placeholder: false,
        visual: true,
        tabindex: false,
        minHeight: false,
        maxHeight: false,
        linebreaks: false,
        replaceDivs: true,
        paragraphize: true,
        cleanStyleOnEnter: false,
        enterKey: true,
        cleanOnPaste: true,
        cleanSpaces: true,
        pastePlainText: false,
        autosave: false,
        autosaveName: false,
        autosaveInterval: 60,
        autosaveOnChange: false,
        autosaveFields: false,
        linkTooltip: true,
        linkProtocol: 'http',
        linkNofollow: false,
        linkSize: 50,
        imageEditable: true,
        imageLink: true,
        imagePosition: true,
        imageFloatMargin: '10px',
        imageResizable: true,
        imageUpload: null,
        imageUploadParam: 'file',
        uploadImageField: false,
        dragImageUpload: true,
        fileUpload: null,
        fileUploadParam: 'file',
        dragFileUpload: true,
        s3: false,
        convertLinks: true,
        convertUrlLinks: true,
        convertImageLinks: true,
        convertVideoLinks: true,
        preSpaces: 4,
        tabAsSpaces: false,
        tabKey: true,
        scrollTarget: false,
        toolbar: true,
        toolbarFixed: true,
        toolbarFixedTarget: document,
        toolbarFixedTopOffset: 0,
        toolbarExternal: false,
        toolbarOverflow: false,
        source: true,
        buttons: ['html', 'formatting', 'bold', 'italic', 'deleted', 'unorderedlist', 'orderedlist', 'outdent', 'indent', 'image', 'file', 'link', 'alignment', 'horizontalrule'],
        buttonsHide: [],
        buttonsHideOnMobile: [],
        formatting: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        formattingAdd: false,
        tabifier: true,
        deniedTags: ['script', 'style'],
        allowedTags: false,
        paragraphizeBlocks: ['table', 'div', 'pre', 'form', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'dl', 'blockquote', 'figcaption', 'address', 'section', 'header', 'footer', 'aside', 'article', 'object', 'style', 'script', 'iframe', 'select', 'input', 'textarea', 'button', 'option', 'map', 'area', 'math', 'hr', 'fieldset', 'legend', 'hgroup', 'nav', 'figure', 'details', 'menu', 'summary', 'p'],
        removeComments: false,
        replaceTags: [
            ['strike', 'del'],
            ['b', 'strong']
        ],
        replaceStyles: [
            ['font-weight:\\s?bold', "strong"],
            ['font-style:\\s?italic', "em"],
            ['text-decoration:\\s?underline', "u"],
            ['text-decoration:\\s?line-through', 'del']
        ],
        removeDataAttr: false,
        removeAttr: false,
        allowedAttr: false,
        removeWithoutAttr: ['span'],
        removeEmpty: ['p'],
        activeButtons: ['deleted', 'italic', 'bold', 'underline', 'unorderedlist', 'orderedlist', 'alignleft', 'aligncenter', 'alignright', 'justify'],
        activeButtonsStates: {
            b: 'bold',
            strong: 'bold',
            i: 'italic',
            em: 'italic',
            del: 'deleted',
            strike: 'deleted',
            ul: 'unorderedlist',
            ol: 'orderedlist',
            u: 'underline'
        },
        shortcuts: {
            'ctrl+shift+m, meta+shift+m': {
                func: 'inline.removeFormat'
            },
            'ctrl+b, meta+b': {
                func: 'inline.format',
                params: ['bold']
            },
            'ctrl+i, meta+i': {
                func: 'inline.format',
                params: ['italic']
            },
            'ctrl+h, meta+h': {
                func: 'inline.format',
                params: ['superscript']
            },
            'ctrl+l, meta+l': {
                func: 'inline.format',
                params: ['subscript']
            },
            'ctrl+k, meta+k': {
                func: 'link.show'
            },
            'ctrl+shift+7': {
                func: 'list.toggle',
                params: ['orderedlist']
            },
            'ctrl+shift+8': {
                func: 'list.toggle',
                params: ['unorderedlist']
            }
        },
        shortcutsAdd: false,
        buffer: [],
        rebuffer: [],
        emptyHtml: '<p>&#x200b;</p>',
        invisibleSpace: '&#x200b;',
        imageTypes: ['image/png', 'image/jpeg', 'image/gif'],
        indentValue: 20,
        verifiedTags: ['a', 'img', 'b', 'strong', 'sub', 'sup', 'i', 'em', 'u', 'small', 'strike', 'del', 'cite', 'ul', 'ol', 'li'],
        inlineTags: ['strong', 'b', 'u', 'em', 'i', 'code', 'del', 'ins', 'samp', 'kbd', 'sup', 'sub', 'mark', 'var', 'cite', 'small'],
        alignmentTags: ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DL', 'DT', 'DD', 'DIV', 'TD', 'BLOCKQUOTE', 'OUTPUT', 'FIGCAPTION', 'ADDRESS', 'SECTION', 'HEADER', 'FOOTER', 'ASIDE', 'ARTICLE'],
        blockLevelElements: ['PRE', 'UL', 'OL', 'LI'],
        highContrast: false,
        observe: {
            dropdowns: []
        },
        langs: {
            en: {
                html: 'HTML',
                video: 'Insert Video',
                image: 'Insert Image',
                table: 'Table',
                link: 'Link',
                link_insert: 'Insert link',
                link_edit: 'Edit link',
                unlink: 'Unlink',
                formatting: 'Formatting',
                paragraph: 'Normal text',
                quote: 'Quote',
                code: 'Code',
                header1: 'Header 1',
                header2: 'Header 2',
                header3: 'Header 3',
                header4: 'Header 4',
                header5: 'Header 5',
                bold: 'Bold',
                italic: 'Italic',
                fontcolor: 'Font Color',
                backcolor: 'Back Color',
                unorderedlist: 'Unordered List',
                orderedlist: 'Ordered List',
                outdent: 'Outdent',
                indent: 'Indent',
                cancel: 'Cancel',
                insert: 'Insert',
                save: 'Save',
                _delete: 'Delete',
                insert_table: 'Insert Table',
                insert_row_above: 'Add Row Above',
                insert_row_below: 'Add Row Below',
                insert_column_left: 'Add Column Left',
                insert_column_right: 'Add Column Right',
                delete_column: 'Delete Column',
                delete_row: 'Delete Row',
                delete_table: 'Delete Table',
                rows: 'Rows',
                columns: 'Columns',
                add_head: 'Add Head',
                delete_head: 'Delete Head',
                title: 'Title',
                image_position: 'Position',
                none: 'None',
                left: 'Left',
                right: 'Right',
                center: 'Center',
                image_web_link: 'Image Web Link',
                text: 'Text',
                mailto: 'Email',
                web: 'URL',
                video_html_code: 'Video Embed Code or Youtube/Vimeo Link',
                file: 'Insert File',
                upload: 'Upload',
                download: 'Download',
                choose: 'Choose',
                or_choose: 'Or choose',
                drop_file_here: 'Drop file here',
                align_left: 'Align text to the left',
                align_center: 'Center text',
                align_right: 'Align text to the right',
                align_justify: 'Justify text',
                horizontalrule: 'Insert Horizontal Rule',
                deleted: 'Deleted',
                anchor: 'Anchor',
                link_new_tab: 'Open link in new tab',
                underline: 'Underline',
                alignment: 'Alignment',
                filename: 'Name (optional)',
                edit: 'Edit',
                upload_label: 'Drop file here or '
            }
        },
        linkify: {
            regexps: {
                youtube: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.\-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig,
                vimeo: /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,
                image: /((https?|www)[^\s]+\.)(jpe?g|png|gif)(\?[^\s-]+)?/ig,
                url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/ig,
            }
        },
        codemirror: false
    };
    Redactor.fn = $.Redactor.prototype = {
        keyCode: {
            BACKSPACE: 8,
            DELETE: 46,
            UP: 38,
            DOWN: 40,
            ENTER: 13,
            SPACE: 32,
            ESC: 27,
            TAB: 9,
            CTRL: 17,
            META: 91,
            SHIFT: 16,
            ALT: 18,
            RIGHT: 39,
            LEFT: 37,
            LEFT_WIN: 91
        },
        init: function(el, options) {
            this.$element = $(el);
            this.uuid = uuid++;
            this.rtePaste = false;
            this.$pasteBox = false;
            this.loadOptions(options);
            this.loadModules();
            this.formatting = {};
            $.merge(this.opts.blockLevelElements, this.opts.alignmentTags);
            this.reIsBlock = new RegExp('^(' + this.opts.blockLevelElements.join('|') + ')$', 'i');
            this.tidy.setupAllowed();
            if (this.opts.deniedTags !== false) {
                var tags = ['html', 'head', 'link', 'body', 'meta', 'applet'];
                for (var i = 0; i < tags.length; i++) {
                    this.opts.deniedTags.push(tags[i]);
                }
            }
            this.lang.load();
            $.extend(this.opts.shortcuts, this.opts.shortcutsAdd);
            this.core.setCallback('start');
            this.start = true;
            this.build.run();
        },
        loadOptions: function(options) {
            this.opts = $.extend({}, $.extend(true, {}, $.Redactor.opts), this.$element.data(), options);
        },
        getModuleMethods: function(object) {
            return Object.getOwnPropertyNames(object).filter(function(property) {
                return typeof object[property] == 'function';
            });
        },
        loadModules: function() {
            var len = $.Redactor.modules.length;
            for (var i = 0; i < len; i++) {
                this.bindModuleMethods($.Redactor.modules[i]);
            }
        },
        bindModuleMethods: function(module) {
            if (typeof this[module] == 'undefined') return;
            this[module] = this[module]();
            var methods = this.getModuleMethods(this[module]);
            var len = methods.length;
            for (var z = 0; z < len; z++) {
                this[module][methods[z]] = this[module][methods[z]].bind(this);
            }
        },
        alignment: function() {
            return {
                left: function() {
                    this.alignment.set('');
                },
                right: function() {
                    this.alignment.set('right');
                },
                center: function() {
                    this.alignment.set('center');
                },
                justify: function() {
                    this.alignment.set('justify');
                },
                set: function(type) {
                    if (!this.utils.browser('msie')) this.$editor.focus();
                    this.buffer.set();
                    this.selection.save();
                    this.alignment.blocks = this.selection.getBlocks();
                    this.alignment.type = type;
                    if (this.alignment.isLinebreaksOrNoBlocks()) {
                        this.alignment.setText();
                    } else {
                        this.alignment.setBlocks();
                    }
                    this.selection.restore();
                    this.code.sync();
                },
                setText: function() {
                    var wrapper = this.selection.wrap('div');
                    $(wrapper).attr('data-tagblock', 'redactor').css('text-align', this.alignment.type);
                },
                setBlocks: function() {
                    $.each(this.alignment.blocks, $.proxy(function(i, el) {
                        var $el = this.utils.getAlignmentElement(el);
                        if (!$el) return;
                        if (this.alignment.isNeedReplaceElement($el)) {
                            this.alignment.replaceElement($el);
                        } else {
                            this.alignment.alignElement($el);
                        }
                    }, this));
                },
                isLinebreaksOrNoBlocks: function() {
                    return (this.opts.linebreaks && this.alignment.blocks[0] === false);
                },
                isNeedReplaceElement: function($el) {
                    return (this.alignment.type === '' && typeof($el.data('tagblock')) !== 'undefined');
                },
                replaceElement: function($el) {
                    $el.replaceWith($el.html());
                },
                alignElement: function($el) {
                    $el.css('text-align', this.alignment.type);
                    this.utils.removeEmptyAttr($el, 'style');
                }
            };
        },
        autosave: function() {
            return {
                html: false,
                enable: function() {
                    if (!this.opts.autosave) return;
                    this.autosave.name = (this.opts.autosaveName) ? this.opts.autosaveName : this.$textarea.attr('name');
                    if (this.opts.autosaveOnChange) return;
                    this.autosaveInterval = setInterval(this.autosave.load, this.opts.autosaveInterval * 1000);
                },
                onChange: function() {
                    if (!this.opts.autosaveOnChange) return;
                    this.autosave.load();
                },
                load: function() {
                    if (!this.opts.autosave) return;
                    this.autosave.source = this.code.get();
                    if (this.autosave.html === this.autosave.source) return;
                    var data = {};
                    data['name'] = this.autosave.name;
                    data[this.autosave.name] = this.autosave.source;
                    data = this.autosave.getHiddenFields(data);
                    var jsxhr = $.ajax({
                        url: this.opts.autosave,
                        type: 'post',
                        data: data
                    });
                    jsxhr.done(this.autosave.success);
                },
                getHiddenFields: function(data) {
                    if (this.opts.autosaveFields === false || typeof this.opts.autosaveFields !== 'object') {
                        return data;
                    }
                    $.each(this.opts.autosaveFields, $.proxy(function(k, v) {
                        if (v !== null && v.toString().indexOf('#') === 0) v = $(v).val();
                        data[k] = v;
                    }, this));
                    return data;
                },
                success: function(data) {
                    var json;
                    try {
                        json = $.parseJSON(data);
                    } catch (e) {
                        json = data;
                    }
                    var callbackName = (typeof json.error == 'undefined') ? 'autosave' : 'autosaveError';
                    this.core.setCallback(callbackName, this.autosave.name, json);
                    this.autosave.html = this.autosave.source;
                },
                disable: function() {
                    clearInterval(this.autosaveInterval);
                }
            };
        },
        block: function() {
            return {
                formatting: function(name) {
                    this.block.clearStyle = false;
                    var type, value;
                    if (typeof this.formatting[name].data != 'undefined') type = 'data';
                    else if (typeof this.formatting[name].attr != 'undefined') type = 'attr';
                    else if (typeof this.formatting[name]['class'] != 'undefined') type = 'class';
                    if (typeof this.formatting[name].clear != 'undefined') {
                        this.block.clearStyle = true;
                    }
                    if (type) value = this.formatting[name][type];
                    this.block.format(this.formatting[name].tag, type, value);
                },
                format: function(tag, type, value) {
                    if (tag == 'quote') tag = 'blockquote';
                    var formatTags = ['p', 'pre', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
                    if ($.inArray(tag, formatTags) == -1) return;
                    this.block.isRemoveInline = (tag == 'pre' || tag.search(/h[1-6]/i) != -1);
                    if (!this.utils.browser('msie')) this.$editor.focus();
                    var html = $.trim(this.$editor.html());
                    this.block.isEmpty = this.utils.isEmpty(html);
                    if (this.utils.browser('mozilla') && !this.focus.isFocused()) {
                        if (this.block.isEmpty) {
                            var $first;
                            if (!this.opts.linebreaks) {
                                $first = this.$editor.children().first();
                                this.caret.setEnd($first);
                            }
                        }
                    }
                    if (tag == 'pre') {
                        this.selection.get();
                        if (this.range.endOffset - this.range.startOffset == 0) {
                            console.log('pre tag 0')
                            var marker = ''
                            var container = $('<div><pre>' + marker + '<br></pre></div>')
                            this.selection.restore();
                            this.insert.htmlWithoutClean(container.html());
                            this.code.sync();
                            return
                        }
                    }
                    this.block.blocks = this.selection.getBlocks();
                    this.block.blocksSize = this.block.blocks.length;
                    this.block.type = type;
                    this.block.value = value;
                    this.buffer.set();
                    this.selection.save();
                    this.block.set(tag);
                    this.selection.restore();
                    this.code.sync();
                    this.observe.load();
                },
                set: function(tag) {
                    this.selection.get();
                    this.block.containerTag = this.range.commonAncestorContainer.tagName;
                    if (this.range.collapsed) {
                        this.block.setCollapsed(tag);
                    } else {
                        this.block.setMultiple(tag);
                    }
                },
                setCollapsed: function(tag) {
                    if (this.opts.linebreaks && this.block.isEmpty && tag != 'p') {
                        var node = document.createElement(tag);
                        this.$editor.html(node);
                        this.caret.setEnd(node);
                        return;
                    }
                    var block = this.block.blocks[0];
                    if (block === false) return;
                    if (block.tagName == 'LI') {
                        if (tag != 'blockquote') return;
                        this.block.formatListToBlockquote();
                        return;
                    }
                    var isContainerTable = (this.block.containerTag == 'TD' || this.block.containerTag == 'TH');
                    if (isContainerTable && !this.opts.linebreaks) {
                        document.execCommand('formatblock', false, '<' + tag + '>');
                        block = this.selection.getBlock();
                        this.block.toggle($(block));
                    } else if (block.tagName.toLowerCase() != tag) {
                        if (this.opts.linebreaks && tag == 'p') {
                            $(block).append('<br>');
                            this.utils.replaceWithContents(block);
                        } else {
                            var $formatted = this.utils.replaceToTag(block, tag);
                            this.block.toggle($formatted);
                            if (tag != 'p' && tag != 'blockquote') $formatted.find('img').remove();
                            if (this.block.isRemoveInline) this.utils.removeInlineTags($formatted);
                            if (tag == 'p' || this.block.headTag) $formatted.find('p').contents().unwrap();
                            this.block.formatTableWrapping($formatted);
                        }
                    } else if (tag == 'blockquote' && block.tagName.toLowerCase() == tag) {
                        if (this.opts.linebreaks) {
                            $(block).append('<br>');
                            this.utils.replaceWithContents(block);
                        } else {
                            var $el = this.utils.replaceToTag(block, 'p');
                            this.block.toggle($el);
                        }
                    } else if (block.tagName.toLowerCase() == tag) {
                        this.block.toggle($(block));
                    }
                    if (typeof this.block.type == 'undefined' && typeof this.block.value == 'undefined') {
                        $(block).removeAttr('class').removeAttr('style');
                    }
                },
                setMultiple: function(tag) {
                    var block = this.block.blocks[0];
                    var isContainerTable = (this.block.containerTag == 'TD' || this.block.containerTag == 'TH');
                    if (block !== false && this.block.blocksSize === 1) {
                        if (block.tagName.toLowerCase() == tag && tag == 'blockquote') {
                            if (this.opts.linebreaks) {
                                $(block).append('<br>');
                                this.utils.replaceWithContents(block);
                            } else {
                                var $el = this.utils.replaceToTag(block, 'p');
                                this.block.toggle($el);
                            }
                        } else if (block.tagName == 'LI') {
                            if (tag != 'blockquote') return;
                            this.block.formatListToBlockquote();
                        } else if (this.block.containerTag == 'BLOCKQUOTE') {
                            this.block.formatBlockquote(tag);
                        } else if (this.opts.linebreaks && ((isContainerTable) || (this.range.commonAncestorContainer != block))) {
                            this.block.formatWrap(tag);
                        } else {
                            if (this.opts.linebreaks && tag == 'p') {
                                $(block).prepend('<br>').append('<br>');
                                this.utils.replaceWithContents(block);
                            } else if (block.tagName === 'TD') {
                                this.block.formatWrap(tag);
                            } else {
                                var $formatted = this.utils.replaceToTag(block, tag);
                                this.block.toggle($formatted);
                                if (this.block.isRemoveInline) this.utils.removeInlineTags($formatted);
                                if (tag == 'p' || this.block.headTag) $formatted.find('p').contents().unwrap();
                            }
                        }
                    } else {
                        if (this.opts.linebreaks || tag != 'p') {
                            if (tag == 'blockquote') {
                                var count = 0;
                                for (var i = 0; i < this.block.blocksSize; i++) {
                                    if (this.block.blocks[i].tagName == 'BLOCKQUOTE') count++;
                                }
                                if (count == this.block.blocksSize) {
                                    $.each(this.block.blocks, $.proxy(function(i, s) {
                                        var $formatted = false;
                                        if (this.opts.linebreaks) {
                                            $(s).prepend('<br>').append('<br>');
                                            $formatted = this.utils.replaceWithContents(s);
                                        } else {
                                            $formatted = this.utils.replaceToTag(s, 'p');
                                        }
                                        if ($formatted && typeof this.block.type == 'undefined' && typeof this.block.value == 'undefined') {
                                            $formatted.removeAttr('class').removeAttr('style');
                                        }
                                    }, this));
                                    return;
                                }
                            }
                            this.block.formatWrap(tag);
                        } else {
                            var classSize = 0;
                            var toggleType = false;
                            if (this.block.type == 'class') {
                                toggleType = 'toggle';
                                classSize = $(this.block.blocks).filter('.' + this.block.value).length;
                                if (this.block.blocksSize == classSize) toggleType = 'toggle';
                                else if (this.block.blocksSize > classSize) toggleType = 'set';
                                else if (classSize === 0) toggleType = 'set';
                            }
                            var exceptTags = ['ul', 'ol', 'li', 'td', 'th', 'dl', 'dt', 'dd'];
                            $.each(this.block.blocks, $.proxy(function(i, s) {
                                if ($.inArray(s.tagName.toLowerCase(), exceptTags) != -1) return;
                                var $formatted = this.utils.replaceToTag(s, tag);
                                if (toggleType) {
                                    if (toggleType == 'toggle') this.block.toggle($formatted);
                                    else if (toggleType == 'remove') this.block.remove($formatted);
                                    else if (toggleType == 'set') this.block.setForce($formatted);
                                } else this.block.toggle($formatted);
                                if (tag != 'p' && tag != 'blockquote') $formatted.find('img').remove();
                                if (this.block.isRemoveInline) this.utils.removeInlineTags($formatted);
                                if (tag == 'p' || this.block.headTag) $formatted.find('p').contents().unwrap();
                                if (typeof this.block.type == 'undefined' && typeof this.block.value == 'undefined') {
                                    $formatted.removeAttr('class').removeAttr('style');
                                }
                            }, this));
                        }
                    }
                },
                setForce: function($el) {
                    if (this.block.clearStyle) {
                        $el.removeAttr('class').removeAttr('style');
                    }
                    if (this.block.type == 'class') {
                        $el.addClass(this.block.value);
                        return;
                    } else if (this.block.type == 'attr' || this.block.type == 'data') {
                        $el.attr(this.block.value.name, this.block.value.value);
                        return;
                    }
                },
                toggle: function($el) {
                    if (this.block.clearStyle) {
                        $el.removeAttr('class').removeAttr('style');
                    }
                    if (this.block.type == 'class') {
                        $el.toggleClass(this.block.value);
                        return;
                    } else if (this.block.type == 'attr' || this.block.type == 'data') {
                        if ($el.attr(this.block.value.name) == this.block.value.value) {
                            $el.removeAttr(this.block.value.name);
                        } else {
                            $el.attr(this.block.value.name, this.block.value.value);
                        }
                        return;
                    } else {
                        $el.removeAttr('style class');
                        return;
                    }
                },
                remove: function($el) {
                    $el.removeClass(this.block.value);
                },
                formatListToBlockquote: function() {
                    var block = $(this.block.blocks[0]).closest('ul, ol', this.$editor[0]);
                    $(block).find('ul, ol').contents().unwrap();
                    $(block).find('li').append($('<br>')).contents().unwrap();
                    var $el = this.utils.replaceToTag(block, 'blockquote');
                    this.block.toggle($el);
                },
                formatBlockquote: function(tag) {
                    document.execCommand('outdent');
                    document.execCommand('formatblock', false, tag);
                    this.clean.clearUnverified();
                    this.$editor.find('p:empty').remove();
                    var formatted = this.selection.getBlock();
                    if (tag != 'p') {
                        $(formatted).find('img').remove();
                    }
                    if (!this.opts.linebreaks) {
                        this.block.toggle($(formatted));
                    }
                    this.$editor.find('ul, ol, tr, blockquote, p').each($.proxy(this.utils.removeEmpty, this));
                    if (this.opts.linebreaks && tag == 'p') {
                        this.utils.replaceWithContents(formatted);
                    }
                },
                formatWrap: function(tag) {
                    if (this.block.containerTag == 'UL' || this.block.containerTag == 'OL') {
                        if (tag == 'blockquote') {
                            this.block.formatListToBlockquote();
                        } else {
                            return;
                        }
                    }
                    var formatted = this.selection.wrap(tag);
                    if (formatted === false) return;
                    var $formatted = $(formatted);
                    this.block.formatTableWrapping($formatted);
                    var $elements = $formatted.find(this.opts.blockLevelElements.join(',') + ', td, table, thead, tbody, tfoot, th, tr');
                    $elements.contents().unwrap();
                    if (tag != 'p' && tag != 'blockquote') $formatted.find('img').remove();
                    $.each(this.block.blocks, $.proxy(this.utils.removeEmpty, this));
                    $formatted.append(this.selection.getMarker(2));
                    if (!this.opts.linebreaks) {
                        this.block.toggle($formatted);
                    }
                    this.$editor.find('ul, ol, tr, blockquote, p').each($.proxy(this.utils.removeEmpty, this));
                    $formatted.find('blockquote:empty').remove();
                    if (this.block.isRemoveInline) {
                        this.utils.removeInlineTags($formatted);
                    }
                    if (this.opts.linebreaks && tag == 'p') {
                        this.utils.replaceWithContents($formatted);
                    }
                    if (this.opts.linebreaks) {
                        var $next = $formatted.next().next();
                        if ($next.size() != 0 && $next[0].tagName === 'BR') {
                            $next.remove();
                        }
                    }
                },
                formatTableWrapping: function($formatted) {
                    if ($formatted.closest('table', this.$editor[0]).length === 0) return;
                    if ($formatted.closest('tr', this.$editor[0]).length === 0) $formatted.wrap('<tr>');
                    if ($formatted.closest('td', this.$editor[0]).length === 0 && $formatted.closest('th').length === 0) {
                        $formatted.wrap('<td>');
                    }
                },
                removeData: function(name, value) {
                    var blocks = this.selection.getBlocks();
                    $(blocks).removeAttr('data-' + name);
                    this.code.sync();
                },
                setData: function(name, value) {
                    var blocks = this.selection.getBlocks();
                    $(blocks).attr('data-' + name, value);
                    this.code.sync();
                },
                toggleData: function(name, value) {
                    var blocks = this.selection.getBlocks();
                    $.each(blocks, function() {
                        if ($(this).attr('data-' + name)) {
                            $(this).removeAttr('data-' + name);
                        } else {
                            $(this).attr('data-' + name, value);
                        }
                    });
                },
                removeAttr: function(attr, value) {
                    var blocks = this.selection.getBlocks();
                    $(blocks).removeAttr(attr);
                    this.code.sync();
                },
                setAttr: function(attr, value) {
                    var blocks = this.selection.getBlocks();
                    $(blocks).attr(attr, value);
                    this.code.sync();
                },
                toggleAttr: function(attr, value) {
                    var blocks = this.selection.getBlocks();
                    $.each(blocks, function() {
                        if ($(this).attr(name)) {
                            $(this).removeAttr(name);
                        } else {
                            $(this).attr(name, value);
                        }
                    });
                },
                removeClass: function(className) {
                    var blocks = this.selection.getBlocks();
                    $(blocks).removeClass(className);
                    this.utils.removeEmptyAttr(blocks, 'class');
                    this.code.sync();
                },
                setClass: function(className) {
                    var blocks = this.selection.getBlocks();
                    $(blocks).addClass(className);
                    this.code.sync();
                },
                toggleClass: function(className) {
                    var blocks = this.selection.getBlocks();
                    $(blocks).toggleClass(className);
                    this.code.sync();
                }
            };
        },
        buffer: function() {
            return {
                set: function(type) {
                    if (typeof type == 'undefined' || type == 'undo') {
                        this.buffer.setUndo();
                    } else {
                        this.buffer.setRedo();
                    }
                },
                setUndo: function() {
                    this.selection.save();
                    this.opts.buffer.push(this.$editor.html());
                    this.selection.restore();
                },
                setRedo: function() {
                    this.selection.save();
                    this.opts.rebuffer.push(this.$editor.html());
                    this.selection.restore();
                },
                getUndo: function() {
                    this.$editor.html(this.opts.buffer.pop());
                },
                getRedo: function() {
                    this.$editor.html(this.opts.rebuffer.pop());
                },
                add: function() {
                    this.opts.buffer.push(this.$editor.html());
                },
                undo: function() {
                    if (this.opts.buffer.length === 0) return;
                    this.buffer.set('redo');
                    this.buffer.getUndo();
                    this.selection.restore();
                    setTimeout($.proxy(this.observe.load, this), 50);
                },
                redo: function() {
                    if (this.opts.rebuffer.length === 0) return;
                    this.buffer.set('undo');
                    this.buffer.getRedo();
                    this.selection.restore();
                    setTimeout($.proxy(this.observe.load, this), 50);
                }
            };
        },
        build: function() {
            return {
                run: function() {
                    this.build.createContainerBox();
                    this.build.loadContent();
                    this.build.loadEditor();
                    this.build.enableEditor();
                    this.build.setCodeAndCall();
                },
                isTextarea: function() {
                    return (this.$element[0].tagName === 'TEXTAREA');
                },
                createContainerBox: function() {
                    this.$box = $('<div class="redactor-box" role="application" />');
                },
                createTextarea: function() {
                    this.$textarea = $('<textarea />').attr('name', this.build.getTextareaName());
                },
                getTextareaName: function() {
                    return ((typeof(name) == 'undefined')) ? 'content-' + this.uuid : this.$element.attr('id');
                },
                loadContent: function() {
                    var func = (this.build.isTextarea()) ? 'val' : 'html';
                    this.content = $.trim(this.$element[func]());
                },
                enableEditor: function() {
                    this.$editor.attr({
                        'contenteditable': true,
                        'dir': this.opts.direction
                    });
                },
                loadEditor: function() {
                    var func = (this.build.isTextarea()) ? 'fromTextarea' : 'fromElement';
                    this.build[func]();
                },
                fromTextarea: function() {
                    this.$editor = $('<div />');
                    this.$textarea = this.$element;
                    this.$box.insertAfter(this.$element).append(this.$editor).append(this.$element);
                    this.$editor.addClass('redactor-editor');
                    this.$element.hide();
                },
                fromElement: function() {
                    this.$editor = this.$element;
                    this.build.createTextarea();
                    this.$box.insertAfter(this.$editor).append(this.$editor).append(this.$textarea);
                    this.$editor.addClass('redactor-editor');
                    this.$textarea.hide();
                },
                setCodeAndCall: function() {
                    this.code.set(this.content);
                    this.build.setOptions();
                    this.build.callEditor();
                    if (this.opts.visual) return;
                    setTimeout($.proxy(this.code.showCode, this), 200);
                },
                callEditor: function() {
                    this.build.disableMozillaEditing();
                    this.build.disableIeLinks();
                    this.build.setEvents();
                    this.build.setHelpers();
                    if (this.opts.toolbar) {
                        this.opts.toolbar = this.toolbar.init();
                        this.toolbar.build();
                    }
                    this.modal.loadTemplates();
                    this.build.plugins();
                    setTimeout($.proxy(this.observe.load, this), 4);
                    this.core.setCallback('init');
                },
                setOptions: function() {
                    $(this.$textarea).attr('dir', this.opts.direction);
                    if (this.opts.linebreaks) this.$editor.addClass('redactor-linebreaks');
                    if (this.opts.tabindex) this.$editor.attr('tabindex', this.opts.tabindex);
                    if (this.opts.minHeight) this.$editor.css('minHeight', this.opts.minHeight);
                    if (this.opts.maxHeight) this.$editor.css('maxHeight', this.opts.maxHeight);
                },
                setEventDropUpload: function(e) {
                    e.preventDefault();
                    if (!this.opts.dragImageUpload || !this.opts.dragFileUpload) return;
                    var files = e.dataTransfer.files;
                    this.upload.directUpload(files[0], e);
                },
                setEventDrop: function(e) {
                    this.code.sync();
                    setTimeout(this.clean.clearUnverified, 1);
                    this.core.setCallback('drop', e);
                },
                setEvents: function() {
                    this.$editor.on('drop.redactor', $.proxy(function(e) {
                        e = e.originalEvent || e;
                        if (window.FormData === undefined || !e.dataTransfer) return true;
                        if (e.dataTransfer.files.length === 0) {
                            return this.build.setEventDrop(e);
                        } else {
                            this.build.setEventDropUpload(e);
                        }
                        setTimeout(this.clean.clearUnverified, 1);
                        this.core.setCallback('drop', e);
                    }, this));
                    this.$editor.on('click.redactor', $.proxy(function(e) {
                        var event = this.core.getEvent();
                        var type = (event == 'click' || event == 'arrow') ? false : 'click';
                        this.core.addEvent(type);
                        this.utils.disableSelectAll();
                        this.core.setCallback('click', e);
                    }, this));
                    this.$editor.on('paste.redactor', $.proxy(this.paste.init, this));
                    this.$editor.on('cut.redactor', $.proxy(this.code.sync, this));
                    this.$editor.on('keydown.redactor', $.proxy(this.keydown.init, this));
                    this.$editor.on('keyup.redactor', $.proxy(this.keyup.init, this));
                    if ($.isFunction(this.opts.codeKeydownCallback)) {
                        this.$textarea.on('keydown.redactor-textarea', $.proxy(this.opts.codeKeydownCallback, this));
                    }
                    if ($.isFunction(this.opts.codeKeyupCallback)) {
                        this.$textarea.on('keyup.redactor-textarea', $.proxy(this.opts.codeKeyupCallback, this));
                    }
                    this.$editor.on('focus.redactor', $.proxy(function(e) {
                        if ($.isFunction(this.opts.focusCallback)) this.core.setCallback('focus', e);
                        if (this.selection.getCurrent() === false) {
                            this.selection.get();
                            this.range.setStart(this.$editor[0], 0);
                            this.range.setEnd(this.$editor[0], 0);
                            this.selection.addRange();
                        }
                    }, this));
                    $(document).on('mousedown.redactor-blur.' + this.uuid, $.proxy(function(e) {
                        if (this.start) return;
                        if (this.rtePaste) return;
                        if ($(e.target).closest('.redactor-editor, .redactor-toolbar, .redactor-dropdown').size() !== 0) {
                            return;
                        }
                        this.utils.disableSelectAll();
                        if ($.isFunction(this.opts.blurCallback)) this.core.setCallback('blur', e);
                    }, this));
                },
                setHelpers: function() {
                    if (this.linkify.isEnabled()) {
                        this.linkify.format();
                    }
                    this.placeholder.enable();
                    if (this.opts.focus) setTimeout(this.focus.setStart, 200);
                    if (this.opts.focusEnd) setTimeout(this.focus.setEnd, 100);
                },
                plugins: function() {
                    if (!this.opts.plugins) return;
                    $.each(this.opts.plugins, $.proxy(function(i, s) {
                        var func = (typeof RedactorPlugins !== 'undefined' && typeof RedactorPlugins[s] !== 'undefined') ? RedactorPlugins : Redactor.fn;
                        if (!$.isFunction(func[s])) {
                            return;
                        }
                        this[s] = func[s]();
                        var methods = this.getModuleMethods(this[s]);
                        var len = methods.length;
                        for (var z = 0; z < len; z++) {
                            this[s][methods[z]] = this[s][methods[z]].bind(this);
                        }
                        if ($.isFunction(this[s].init)) {
                            this[s].init();
                        }
                    }, this));
                },
                disableMozillaEditing: function() {
                    if (!this.utils.browser('mozilla')) return;
                    try {
                        document.execCommand('enableObjectResizing', false, false);
                        document.execCommand('enableInlineTableEditing', false, false);
                    } catch (e) {}
                },
                disableIeLinks: function() {
                    if (!this.utils.browser('msie')) return;
                    document.execCommand("AutoUrlDetect", false, false);
                }
            };
        },
        button: function() {
            return {
                build: function(btnName, btnObject) {
                    var $button = $('<a href="#" class="re-icon re-' + btnName + '" rel="' + btnName + '" />').attr({
                        'role': 'button',
                        'aria-label': btnObject.title,
                        'tabindex': '-1'
                    });
                    if (btnObject.func || btnObject.command || btnObject.dropdown) {
                        this.button.setEvent($button, btnName, btnObject);
                    }
                    if (btnObject.dropdown) {
                        $button.addClass('redactor-toolbar-link-dropdown').attr('aria-haspopup', true);
                        var $dropdown = $('<div class="redactor-dropdown redactor-dropdown-' + this.uuid + ' redactor-dropdown-box-' + btnName + '" style="display: none;">');
                        $button.data('dropdown', $dropdown);
                        this.dropdown.build(btnName, $dropdown, btnObject.dropdown);
                    }
                    if (this.utils.isDesktop()) {
                        this.button.createTooltip($button, btnName, btnObject.title);
                    }
                    return $button;
                },
                setEvent: function($button, btnName, btnObject) {
                    $button.on('touchstart click', $.proxy(function(e) {
                        if ($button.hasClass('redactor-button-disabled')) return false;
                        var type = 'func';
                        var callback = btnObject.func;
                        if (btnObject.command) {
                            type = 'command';
                            callback = btnObject.command;
                        } else if (btnObject.dropdown) {
                            type = 'dropdown';
                            callback = false;
                        }
                        this.button.onClick(e, btnName, type, callback);
                    }, this));
                },
                createTooltip: function($button, name, title) {
                    var $tooltip = $('<span>').addClass('redactor-toolbar-tooltip redactor-toolbar-tooltip-' + this.uuid + ' redactor-toolbar-tooltip-' + name).hide().html(title);
                    $tooltip.appendTo('body');
                    $button.on('mouseover', function() {
                        if ($(this).hasClass('redactor-button-disabled')) return;
                        var pos = $button.offset();
                        $tooltip.show();
                        $tooltip.css({
                            top: (pos.top + $button.innerHeight()) + 'px',
                            left: (pos.left + $button.innerWidth() / 2 - $tooltip.innerWidth() / 2) + 'px'
                        });
                    });
                    $button.on('mouseout', function() {
                        $tooltip.hide();
                    });
                },
                onClick: function(e, btnName, type, callback) {
                    this.button.caretOffset = this.caret.getOffset();
                    e.preventDefault();
                    $(document).find('.redactor-toolbar-tooltip').hide();
                    if (this.utils.browser('msie')) e.returnValue = false;
                    if (type == 'command') this.inline.format(callback);
                    else if (type == 'dropdown') this.dropdown.show(e, btnName);
                    else this.button.onClickCallback(e, callback, btnName);
                },
                onClickCallback: function(e, callback, btnName) {
                    var func;
                    if ($.isFunction(callback)) callback.call(this, btnName);
                    else if (callback.search(/\./) != '-1') {
                        func = callback.split('.');
                        if (typeof this[func[0]] == 'undefined') return;
                        this[func[0]][func[1]](btnName);
                    } else this[callback](btnName);
                    this.observe.buttons(e, btnName);
                },
                get: function(key) {
                    return this.$toolbar.find('a.re-' + key);
                },
                setActive: function(key) {
                    this.button.get(key).addClass('redactor-act');
                },
                setInactive: function(key) {
                    this.button.get(key).removeClass('redactor-act');
                },
                setInactiveAll: function(key) {
                    if (typeof key === 'undefined') {
                        this.$toolbar.find('a.re-icon').removeClass('redactor-act');
                    } else {
                        this.$toolbar.find('a.re-icon').not('.re-' + key).removeClass('redactor-act');
                    }
                },
                setActiveInVisual: function() {
                    this.$toolbar.find('a.re-icon').not('a.re-html, a.re-fullscreen').removeClass('redactor-button-disabled');
                },
                setInactiveInCode: function() {
                    this.$toolbar.find('a.re-icon').not('a.re-html, a.re-fullscreen').addClass('redactor-button-disabled');
                },
                changeIcon: function(key, classname) {
                    this.button.get(key).addClass('re-' + classname);
                },
                removeIcon: function(key, classname) {
                    this.button.get(key).removeClass('re-' + classname);
                },
                setAwesome: function(key, name) {
                    var $button = this.button.get(key);
                    $button.removeClass('redactor-btn-image').addClass('fa-redactor-btn');
                    $button.html('<i class="fa ' + name + '"></i>');
                },
                addCallback: function($btn, callback) {
                    if ($btn == "buffer") return;
                    var type = (callback == 'dropdown') ? 'dropdown' : 'func';
                    var key = $btn.attr('rel');
                    $btn.on('touchstart click', $.proxy(function(e) {
                        if ($btn.hasClass('redactor-button-disabled')) return false;
                        this.button.onClick(e, key, type, callback);
                    }, this));
                },
                addDropdown: function($btn, dropdown) {
                    $btn.addClass('redactor-toolbar-link-dropdown').attr('aria-haspopup', true);
                    var key = $btn.attr('rel');
                    this.button.addCallback($btn, 'dropdown');
                    var $dropdown = $('<div class="redactor-dropdown redactor-dropdown-' + this.uuid + ' redactor-dropdown-box-' + key + '" style="display: none;">');
                    $btn.data('dropdown', $dropdown);
                    if (dropdown) this.dropdown.build(key, $dropdown, dropdown);
                    return $dropdown;
                },
                add: function(key, title) {
                    if (!this.opts.toolbar) return;
                    if (this.button.isMobileUndoRedo(key)) return "buffer";
                    var btn = this.button.build(key, {
                        title: title
                    });
                    btn.addClass('redactor-btn-image');
                    this.$toolbar.append($('<li>').append(btn));
                    return btn;
                },
                addFirst: function(key, title) {
                    if (!this.opts.toolbar) return;
                    if (this.button.isMobileUndoRedo(key)) return "buffer";
                    var btn = this.button.build(key, {
                        title: title
                    });
                    btn.addClass('redactor-btn-image');
                    this.$toolbar.prepend($('<li>').append(btn));
                    return btn;
                },
                addAfter: function(afterkey, key, title) {
                    if (!this.opts.toolbar) return;
                    if (this.button.isMobileUndoRedo(key)) return "buffer";
                    var btn = this.button.build(key, {
                        title: title
                    });
                    btn.addClass('redactor-btn-image');
                    var $btn = this.button.get(afterkey);
                    if ($btn.length !== 0) $btn.parent().after($('<li>').append(btn));
                    else this.$toolbar.append($('<li>').append(btn));
                    return btn;
                },
                addBefore: function(beforekey, key, title) {
                    if (!this.opts.toolbar) return;
                    if (this.button.isMobileUndoRedo(key)) return "buffer";
                    var btn = this.button.build(key, {
                        title: title
                    });
                    btn.addClass('redactor-btn-image');
                    var $btn = this.button.get(beforekey);
                    if ($btn.length !== 0) $btn.parent().before($('<li>').append(btn));
                    else this.$toolbar.append($('<li>').append(btn));
                    return btn;
                },
                remove: function(key) {
                    this.button.get(key).remove();
                },
                isMobileUndoRedo: function(key) {
                    return (key == "undo" || key == "redo") && !this.utils.isDesktop();
                }
            };
        },
        caret: function() {
            return {
                setStart: function(node) {
                    if (!this.utils.isBlock(node)) {
                        var space = this.utils.createSpaceElement();
                        $(node).prepend(space);
                        this.caret.setEnd(space);
                    } else {
                        this.caret.set(node, 0, node, 0);
                    }
                },
                setEnd: function(node) {
                    node = node[0] || node;
                    if (node.lastChild.nodeType == 1) {
                        return this.caret.setAfter(node.lastChild);
                    }
                    this.caret.set(node, 1, node, 1);
                },
                set: function(orgn, orgo, focn, foco) {
                    orgn = orgn[0] || orgn;
                    focn = focn[0] || focn;
                    if (this.utils.isBlockTag(orgn.tagName) && orgn.innerHTML === '') {
                        orgn.innerHTML = this.opts.invisibleSpace;
                    }
                    if (orgn.tagName == 'BR' && this.opts.linebreaks === false) {
                        var parent = $(this.opts.emptyHtml)[0];
                        $(orgn).replaceWith(parent);
                        orgn = parent;
                        focn = orgn;
                    }
                    this.selection.get();
                    try {
                        this.range.setStart(orgn, orgo);
                        this.range.setEnd(focn, foco);
                    } catch (e) {}
                    this.selection.addRange();
                },
                setAfter: function(node) {
                    try {
                        var tag = $(node)[0].tagName;
                        if (tag != 'BR' && !this.utils.isBlock(node)) {
                            var space = this.utils.createSpaceElement();
                            $(node).after(space);
                            this.caret.setEnd(space);
                        } else {
                            if (tag != 'BR' && this.utils.browser('msie')) {
                                this.caret.setStart($(node).next());
                            } else {
                                this.caret.setAfterOrBefore(node, 'after');
                            }
                        }
                    } catch (e) {
                        var space = this.utils.createSpaceElement();
                        $(node).after(space);
                        this.caret.setEnd(space);
                    }
                },
                setBefore: function(node) {
                    if (this.utils.isBlock(node)) {
                        this.caret.setEnd($(node).prev());
                    } else {
                        this.caret.setAfterOrBefore(node, 'before');
                    }
                },
                setAfterOrBefore: function(node, type) {
                    if (!this.utils.browser('msie')) this.$editor.focus();
                    node = node[0] || node;
                    this.selection.get();
                    if (type == 'after') {
                        try {
                            this.range.setStartAfter(node);
                            this.range.setEndAfter(node);
                        } catch (e) {}
                    } else {
                        try {
                            this.range.setStartBefore(node);
                            this.range.setEndBefore(node);
                        } catch (e) {}
                    }
                    this.range.collapse(false);
                    this.selection.addRange();
                },
                getOffsetOfElement: function(node) {
                    node = node[0] || node;
                    this.selection.get();
                    var cloned = this.range.cloneRange();
                    cloned.selectNodeContents(node);
                    cloned.setEnd(this.range.endContainer, this.range.endOffset);
                    return $.trim(cloned.toString()).length;
                },
                getOffset: function() {
                    var offset = 0;
                    var sel = window.getSelection();
                    if (sel.rangeCount > 0) {
                        var range = window.getSelection().getRangeAt(0);
                        var caretRange = range.cloneRange();
                        caretRange.selectNodeContents(this.$editor[0]);
                        caretRange.setEnd(range.endContainer, range.endOffset);
                        offset = caretRange.toString().length;
                    }
                    return offset;
                },
                setOffset: function(start, end) {
                    if (typeof end == 'undefined') end = start;
                    if (!this.focus.isFocused()) this.focus.setStart();
                    var sel = this.selection.get();
                    var node, offset = 0;
                    var walker = document.createTreeWalker(this.$editor[0], NodeFilter.SHOW_TEXT, null, null);
                    while (node == walker.nextNode()) {
                        offset += node.nodeValue.length;
                        if (offset > start) {
                            this.range.setStart(node, node.nodeValue.length + start - offset);
                            start = Infinity;
                        }
                        if (offset >= end) {
                            this.range.setEnd(node, node.nodeValue.length + end - offset);
                            break;
                        }
                    }
                    this.range.collapse(false);
                    this.selection.addRange();
                },
                setToPoint: function(start, end) {
                    this.caret.setOffset(start, end);
                },
                getCoords: function() {
                    return this.caret.getOffset();
                }
            };
        },
        clean: function() {
            return {
                onSet: function(html) {
                    html = this.clean.savePreCode(html);
                    html = html.replace(/<script(.*?[^>]?)>([\w\W]*?)<\/script>/gi, '<pre class="redactor-script-tag" style="display: none;" $1>$2</pre>');
                    html = html.replace(/\$/g, '&#36;');
                    html = html.replace(/<a href="(.*?[^>]?)®(.*?[^>]?)">/gi, '<a href="$1&reg$2">');
                    if (this.opts.replaceDivs && !this.opts.linebreaks) html = this.clean.replaceDivs(html);
                    if (this.opts.linebreaks) html = this.clean.replaceParagraphsToBr(html);
                    html = this.clean.saveFormTags(html);
                    var $div = $('<div>');
                    $div.html(html);
                    var fonts = $div.find('font[style]');
                    if (fonts.length !== 0) {
                        fonts.replaceWith(function() {
                            var $el = $(this);
                            var $span = $('<span>').attr('style', $el.attr('style'));
                            return $span.append($el.contents());
                        });
                        html = $div.html();
                    }
                    $div.remove();
                    html = html.replace(/<font(.*?)>/gi, '');
                    html = html.replace(/<\/font>/gi, '');
                    html = this.tidy.load(html);
                    if (this.opts.paragraphize) html = this.paragraphize.load(html);
                    html = this.clean.setVerified(html);
                    html = this.clean.convertInline(html);
                    html = html.replace(/&amp;/g, '&');
                    return html;
                },
                onSync: function(html) {
                    html = html.replace(/\u200B/g, '');
                    html = html.replace(/&#x200b;/gi, '');
                    if (this.opts.cleanSpaces) {
                        html = html.replace(/&nbsp;/gi, ' ');
                    }
                    if (html.search(/^<p>(||\s||<br\s?\/?>||&nbsp;)<\/p>$/i) != -1) {
                        return '';
                    }
                    html = html.replace(/<pre class="redactor-script-tag" style="display: none;"(.*?[^>]?)>([\w\W]*?)<\/pre>/gi, '<script$1>$2</script>');
                    html = this.clean.restoreFormTags(html);
                    var chars = {
                        '\u2122': '&trade;',
                        '\u00a9': '&copy;',
                        '\u2026': '&hellip;',
                        '\u2014': '&mdash;',
                        '\u2010': '&dash;'
                    };
                    $.each(chars, function(i, s) {
                        html = html.replace(new RegExp(i, 'g'), s);
                    });
                    if (this.utils.browser('mozilla')) {
                        html = html.replace(/<br\s?\/?>$/gi, '');
                    }
                    html = html.replace(new RegExp('<br\\s?/?></li>', 'gi'), '</li>');
                    html = html.replace(new RegExp('</li><br\\s?/?>', 'gi'), '</li>');
                    html = html.replace(/<(.*?)rel="\s*?"(.*?[^>]?)>/gi, '<$1$2">');
                    html = html.replace(/<(.*?)style="\s*?"(.*?[^>]?)>/gi, '<$1$2">');
                    html = html.replace(/="">/gi, '>');
                    html = html.replace(/""">/gi, '">');
                    html = html.replace(/"">/gi, '">');
                    html = html.replace(/<div(.*?)data-tagblock="redactor"(.*?[^>])>/gi, '<div$1$2>');
                    html = html.replace(/<(.*?) data-verified="redactor"(.*?[^>])>/gi, '<$1$2>');
                    var $div = $("<div/>").html($.parseHTML(html, document, true));
                    $div.find("span").removeAttr("rel");
                    $div.find('pre .redactor-invisible-space').each(function() {
                        $(this).contents().unwrap();
                    });
                    html = $div.html();
                    html = html.replace(/<img(.*?[^>])rel="(.*?[^>])"(.*?[^>])>/gi, '<img$1$3>');
                    html = html.replace(/<span class="redactor-invisible-space">(.*?)<\/span>/gi, '$1');
                    html = html.replace(/ data-save-url="(.*?[^>])"/gi, '');
                    html = html.replace(/<span(.*?)id="redactor-image-box"(.*?[^>])>([\w\W]*?)<img(.*?)><\/span>/gi, '$3<img$4>');
                    html = html.replace(/<span(.*?)id="redactor-image-resizer"(.*?[^>])>(.*?)<\/span>/gi, '');
                    html = html.replace(/<span(.*?)id="redactor-image-editter"(.*?[^>])>(.*?)<\/span>/gi, '');
                    html = html.replace(/<font(.*?)>/gi, '');
                    html = html.replace(/<\/font>/gi, '');
                    html = this.tidy.load(html);
                    if (this.opts.linkNofollow) {
                        html = html.replace(/<a(.*?)rel="nofollow"(.*?[^>])>/gi, '<a$1$2>');
                        html = html.replace(/<a(.*?[^>])>/gi, '<a$1 rel="nofollow">');
                    }
                    html = html.replace(/\sdata-redactor-(tag|class|style)="(.*?[^>])"/gi, '');
                    html = html.replace(new RegExp('<(.*?) data-verified="redactor"(.*?[^>])>', 'gi'), '<$1$2>');
                    html = html.replace(new RegExp('<(.*?) data-verified="redactor">', 'gi'), '<$1>');
                    html = html.replace(/&amp;/g, '&');
                    return html;
                },
                onPaste: function(html, setMode) {
                    html = $.trim(html);
                    html = html.replace(/\$/g, '&#36;');
                    html = html.replace(/<span class="s[0-9]">/gi, '<span>');
                    html = html.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, ' ');
                    html = html.replace(/<span class="Apple-tab-span"[^>]*>\t<\/span>/gi, '\t');
                    html = html.replace(/<span[^>]*>(\s|&nbsp;)<\/span>/gi, ' ');
                    if (this.opts.pastePlainText) {
                        return this.clean.getPlainText(html);
                    }
                    if (!this.utils.isSelectAll() && typeof setMode == 'undefined') {
                        if (this.utils.isCurrentOrParent(['FIGCAPTION', 'A'])) {
                            return this.clean.getPlainText(html, false);
                        }
                        if (this.utils.isCurrentOrParent('PRE')) {
                            html = html.replace(/”/g, '"');
                            html = html.replace(/“/g, '"');
                            html = html.replace(/‘/g, '\'');
                            html = html.replace(/’/g, '\'');
                            return this.clean.getPreCode(html);
                        }
                        if (this.utils.isCurrentOrParent(['BLOCKQUOTE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'])) {
                            html = this.clean.getOnlyImages(html);
                            if (!this.utils.browser('msie')) {
                                var block = this.selection.getBlock();
                                if (block && block.tagName == 'P') {
                                    html = html.replace(/<img(.*?)>/gi, '<p><img$1></p>');
                                }
                            }
                            return html;
                        }
                        if (this.utils.isCurrentOrParent(['TD'])) {
                            html = this.clean.onPasteTidy(html, 'td');
                            if (this.opts.linebreaks) html = this.clean.replaceParagraphsToBr(html);
                            html = this.clean.replaceDivsToBr(html);
                            return html;
                        }
                        if (this.utils.isCurrentOrParent(['LI'])) {
                            return this.clean.onPasteTidy(html, 'li');
                        }
                    }
                    html = this.clean.isSingleLine(html, setMode);
                    if (!this.clean.singleLine) {
                        if (this.opts.linebreaks) html = this.clean.replaceParagraphsToBr(html);
                        if (this.opts.replaceDivs) html = this.clean.replaceDivs(html);
                        html = this.clean.saveFormTags(html);
                    }
                    html = this.clean.onPasteWord(html);
                    html = this.clean.onPasteExtra(html);
                    html = this.clean.onPasteTidy(html, 'all');
                    if (!this.clean.singleLine && this.opts.paragraphize) {
                        html = this.paragraphize.load(html);
                    }
                    html = this.clean.removeDirtyStyles(html);
                    html = this.clean.onPasteRemoveSpans(html);
                    html = this.clean.onPasteRemoveEmpty(html);
                    html = this.clean.convertInline(html);
                    return html;
                },
                onPasteWord: function(html) {
                    html = html.replace(/<!--[\s\S]*?-->/gi, '');
                    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
                    html = html.replace(/<o\:p[^>]*>[\s\S]*?<\/o\:p>/gi, '');
                    if (html.match(/class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument/i)) {
                        html = html.replace(/<!--[\s\S]+?-->/gi, '');
                        html = html.replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi, '');
                        html = html.replace(/<(\/?)s>/gi, "<$1strike>");
                        html = html.replace(/ /gi, ' ');
                        html = html.replace(/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi, function(str, spaces) {
                            return (spaces.length > 0) ? spaces.replace(/./, " ").slice(Math.floor(spaces.length / 2)).split("").join("\u00a0") : '';
                        });
                        html = this.clean.onPasteIeFixLinks(html);
                        html = html.replace(/<img(.*?)v:shapes=(.*?)>/gi, '');
                        html = html.replace(/src="file\:\/\/(.*?)"/, 'src=""');
                        var $div = $("<div/>").html(html);
                        var lastList = false;
                        var lastLevel = 1;
                        var listsIds = [];
                        $div.find("p[style]").each(function() {
                            var matches = $(this).attr('style').match(/mso\-list\:l([0-9]+)\slevel([0-9]+)/);
                            if (matches) {
                                var currentList = parseInt(matches[1]);
                                var currentLevel = parseInt(matches[2]);
                                var listType = $(this).html().match(/^[\w]+\./) ? "ol" : "ul";
                                var $li = $("<li/>").html($(this).html());
                                $li.html($li.html().replace(/^([\w\.]+)</, '<'));
                                $li.find("span:first").remove();
                                if (currentLevel == 1 && $.inArray(currentList, listsIds) == -1) {
                                    var $list = $("<" + listType + "/>").attr({
                                        "data-level": currentLevel,
                                        "data-list": currentList
                                    }).html($li);
                                    $(this).replaceWith($list);
                                    lastList = currentList;
                                    listsIds.push(currentList);
                                } else {
                                    if (currentLevel > lastLevel) {
                                        var $prevList = $div.find('[data-level="' + lastLevel + '"][data-list="' + lastList + '"]');
                                        var $lastList = $prevList;
                                        for (var i = lastLevel; i < currentLevel; i++) {
                                            $list = $("<" + listType + "/>");
                                            $list.appendTo($lastList.find("li").last());
                                            $lastList = $list;
                                        }
                                        $lastList.attr({
                                            "data-level": currentLevel,
                                            "data-list": currentList
                                        }).html($li);
                                    } else {
                                        var $prevList = $div.find('[data-level="' + currentLevel + '"][data-list="' + currentList + '"]').last();
                                        $prevList.append($li);
                                    }
                                    lastLevel = currentLevel;
                                    lastList = currentList;
                                    $(this).remove();
                                }
                            }
                        });
                        $div.find('[data-level][data-list]').removeAttr('data-level data-list');
                        html = $div.html();
                        html = html.replace(/·/g, '');
                        html = html.replace(/<p class="Mso(.*?)"/gi, '<p');
                        html = html.replace(/ class=\"(mso[^\"]*)\"/gi, "");
                        html = html.replace(/ class=(mso\w+)/gi, "");
                        html = html.replace(/<o:p(.*?)>([\w\W]*?)<\/o:p>/gi, '$2');
                        html = html.replace(/\n/g, ' ');
                        html = html.replace(/<p>\n?<li>/gi, '<li>');
                    }
                    return html;
                },
                onPasteExtra: function(html) {
                    html = html.replace(/<b\sid="internal-source-marker(.*?)">([\w\W]*?)<\/b>/gi, "$2");
                    html = html.replace(/<b(.*?)id="docs-internal-guid(.*?)">([\w\W]*?)<\/b>/gi, "$3");
                    html = html.replace(/<span[^>]*(font-style: italic; font-weight: bold|font-weight: bold; font-style: italic)[^>]*>/gi, '<span style="font-weight: bold;"><span style="font-style: italic;">');
                    html = html.replace(/<span[^>]*font-style: italic[^>]*>/gi, '<span style="font-style: italic;">');
                    html = html.replace(/<span[^>]*font-weight: bold[^>]*>/gi, '<span style="font-weight: bold;">');
                    html = html.replace(/<span[^>]*text-decoration: underline[^>]*>/gi, '<span style="text-decoration: underline;">');
                    html = html.replace(/<img>/gi, '');
                    html = html.replace(/\n{3,}/gi, '\n');
                    html = html.replace(/<font(.*?)>([\w\W]*?)<\/font>/gi, '$2');
                    html = html.replace(/<p><p>/gi, '<p>');
                    html = html.replace(/<\/p><\/p>/gi, '</p>');
                    html = html.replace(/<li>(\s*|\t*|\n*)<p>/gi, '<li>');
                    html = html.replace(/<\/p>(\s*|\t*|\n*)<\/li>/gi, '</li>');
                    html = html.replace(/<\/p>\s<p/gi, '<\/p><p');
                    html = html.replace(/<img src="webkit-fake-url\:\/\/(.*?)"(.*?)>/gi, '');
                    html = html.replace(/<p>•([\w\W]*?)<\/p>/gi, '<li>$1</li>');
                    if (this.utils.browser('mozilla')) {
                        html = html.replace(/<br\s?\/?>$/gi, '');
                    }
                    return html;
                },
                onPasteTidy: function(html, type) {
                    var tags = ['span', 'a', 'pre', 'blockquote', 'small', 'em', 'strong', 'code', 'kbd', 'mark', 'address', 'cite', 'var', 'samp', 'dfn', 'sup', 'sub', 'b', 'i', 'u', 'del', 'ol', 'ul', 'li', 'dl', 'dt', 'dd', 'p', 'br', 'video', 'audio', 'iframe', 'embed', 'param', 'object', 'img', 'table', 'td', 'th', 'tr', 'tbody', 'tfoot', 'thead', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
                    var tagsEmpty = false;
                    var attrAllowed = [
                        ['a', '*'],
                        ['img', ['src', 'alt']],
                        ['span', ['class', 'rel', 'data-verified']],
                        ['iframe', '*'],
                        ['video', '*'],
                        ['audio', '*'],
                        ['embed', '*'],
                        ['object', '*'],
                        ['param', '*'],
                        ['source', '*']
                    ];
                    if (type == 'all') {
                        tagsEmpty = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
                        attrAllowed = [
                            ['table', 'class'],
                            ['td', ['colspan', 'rowspan']],
                            ['a', '*'],
                            ['img', ['src', 'alt', 'data-redactor-inserted-image']],
                            ['span', ['class', 'rel', 'data-verified']],
                            ['iframe', '*'],
                            ['video', '*'],
                            ['audio', '*'],
                            ['embed', '*'],
                            ['object', '*'],
                            ['param', '*'],
                            ['source', '*']
                        ];
                    } else if (type == 'td') {
                        tags = ['ul', 'ol', 'li', 'span', 'a', 'small', 'em', 'strong', 'code', 'kbd', 'mark', 'cite', 'var', 'samp', 'dfn', 'sup', 'sub', 'b', 'i', 'u', 'del', 'ol', 'ul', 'li', 'dl', 'dt', 'dd', 'br', 'iframe', 'video', 'audio', 'embed', 'param', 'object', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
                    } else if (type == 'li') {
                        tags = ['ul', 'ol', 'li', 'span', 'a', 'small', 'em', 'strong', 'code', 'kbd', 'mark', 'cite', 'var', 'samp', 'dfn', 'sup', 'sub', 'b', 'i', 'u', 'del', 'br', 'iframe', 'video', 'audio', 'embed', 'param', 'object', 'img'];
                    }
                    var options = {
                        deniedTags: (this.opts.deniedTags) ? this.opts.deniedTags : false,
                        allowedTags: (this.opts.allowedTags) ? this.opts.allowedTags : tags,
                        removeComments: true,
                        removePhp: true,
                        removeAttr: (this.opts.removeAttr) ? this.opts.removeAttr : false,
                        allowedAttr: (this.opts.allowedAttr) ? this.opts.allowedAttr : attrAllowed,
                        removeEmpty: tagsEmpty
                    };
                    return this.tidy.load(html, options);
                },
                onPasteRemoveEmpty: function(html) {
                    html = html.replace(/<(p|h[1-6])>(|\s|\n|\t|<br\s?\/?>)<\/(p|h[1-6])>/gi, '');
                    if (!this.opts.linebreaks) html = html.replace(/<br>$/i, '');
                    return html;
                },
                onPasteRemoveSpans: function(html) {
                    html = html.replace(/<span>(.*?)<\/span>/gi, '$1');
                    html = html.replace(/<span[^>]*>\s|&nbsp;<\/span>/gi, ' ');
                    return html;
                },
                onPasteIeFixLinks: function(html) {
                    if (!this.utils.browser('msie')) return html;
                    var tmp = $.trim(html);
                    if (tmp.search(/^<a(.*?)>(.*?)<\/a>$/i) === 0) {
                        html = html.replace(/^<a(.*?)>(.*?)<\/a>$/i, "$2");
                    }
                    return html;
                },
                isSingleLine: function(html, setMode) {
                    this.clean.singleLine = false;
                    if (!this.utils.isSelectAll() && typeof setMode == 'undefined') {
                        var blocks = this.opts.blockLevelElements.join('|').replace('P|', '').replace('DIV|', '');
                        var matchBlocks = html.match(new RegExp('</(' + blocks + ')>', 'gi'));
                        var matchContainers = html.match(/<\/(p|div)>/gi);
                        if (!matchBlocks && (matchContainers === null || (matchContainers && matchContainers.length <= 1))) {
                            var matchBR = html.match(/<br\s?\/?>/gi);
                            if (!matchBR) {
                                this.clean.singleLine = true;
                                html = html.replace(/<\/?(p|div)(.*?)>/gi, '');
                            }
                        }
                    }
                    return html;
                },
                stripTags: function(input, allowed) {
                    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
                    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
                    return input.replace(tags, function($0, $1) {
                        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
                    });
                },
                savePreCode: function(html) {
                    html = this.clean.savePreFormatting(html);
                    html = this.clean.saveCodeFormatting(html);
                    html = this.clean.restoreSelectionMarker(html);
                    return html;
                },
                savePreFormatting: function(html) {
                    var pre = html.match(/<pre(.*?)>([\w\W]*?)<\/pre>/gi);
                    if (pre !== null) {
                        $.each(pre, $.proxy(function(i, s) {
                            var arr = s.match(/<pre(.*?)>([\w\W]*?)<\/pre>/i);
                            arr[2] = arr[2].replace(/<br\s?\/?>/g, '\n');
                            arr[2] = arr[2].replace(/&nbsp;/g, ' ');
                            if (this.opts.preSpaces) {
                                arr[2] = arr[2].replace(/\t/g, Array(this.opts.preSpaces + 1).join(' '));
                            }
                            arr[2] = this.clean.encodeEntities(arr[2]);
                            arr[2] = arr[2].replace(/\$/g, '&#36;');
                            html = html.replace(s, '<pre' + arr[1] + '>' + arr[2] + '</pre>');
                        }, this));
                    }
                    return html;
                },
                saveCodeFormatting: function(html) {
                    var code = html.match(/<code(.*?)>([\w\W]*?)<\/code>/gi);
                    if (code !== null) {
                        $.each(code, $.proxy(function(i, s) {
                            var arr = s.match(/<code(.*?)>([\w\W]*?)<\/code>/i);
                            arr[2] = arr[2].replace(/&nbsp;/g, ' ');
                            arr[2] = this.clean.encodeEntities(arr[2]);
                            arr[2] = arr[2].replace(/\$/g, '&#36;');
                            html = html.replace(s, '<code' + arr[1] + '>' + arr[2] + '</code>');
                        }, this));
                    }
                    return html;
                },
                restoreSelectionMarker: function(html) {
                    html = html.replace(/&lt;span id=&quot;selection-marker-([0-9])&quot; class=&quot;redactor-selection-marker&quot; data-verified=&quot;redactor&quot;&gt;?&lt;\/span&gt;/g, '<span id="selection-marker-$1" class="redactor-selection-marker" data-verified="redactor">?</span>');
                    return html;
                },
                getTextFromHtml: function(html) {
                    html = html.replace(/<br\s?\/?>|<\/H[1-6]>|<\/p>|<\/div>|<\/li>|<\/td>/gi, '\n');
                    var tmp = document.createElement('div');
                    tmp.innerHTML = html;
                    html = tmp.textContent || tmp.innerText;
                    return $.trim(html);
                },
                getPlainText: function(html, paragraphize) {
                    html = this.clean.getTextFromHtml(html);
                    html = html.replace(/\n/g, '<br />');
                    if (this.opts.paragraphize && typeof paragraphize == 'undefined' && !this.utils.browser('mozilla')) {
                        html = this.paragraphize.load(html);
                    }
                    return html;
                },
                getPreCode: function(html) {
                    html = html.replace(/<img(.*?) style="(.*?)"(.*?[^>])>/gi, '<img$1$3>');
                    html = html.replace(/<img(.*?)>/gi, '&lt;img$1&gt;');
                    html = this.clean.getTextFromHtml(html);
                    if (this.opts.preSpaces) {
                        html = html.replace(/\t/g, Array(this.opts.preSpaces + 1).join(' '));
                    }
                    html = this.clean.encodeEntities(html);
                    return html;
                },
                getOnlyImages: function(html) {
                    html = html.replace(/<img(.*?)>/gi, '[img$1]');
                    html = html.replace(/<([Ss]*?)>/gi, '');
                    html = html.replace(/\[img(.*?)\]/gi, '<img$1>');
                    return html;
                },
                getOnlyLinksAndImages: function(html) {
                    html = html.replace(/<a(.*?)href="(.*?)"(.*?)>([\w\W]*?)<\/a>/gi, '[a href="$2"]$4[/a]');
                    html = html.replace(/<img(.*?)>/gi, '[img$1]');
                    html = html.replace(/<(.*?)>/gi, '');
                    html = html.replace(/\[a href="(.*?)"\]([\w\W]*?)\[\/a\]/gi, '<a href="$1">$2</a>');
                    html = html.replace(/\[img(.*?)\]/gi, '<img$1>');
                    return html;
                },
                encodeEntities: function(str) {
                    str = String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
                    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                },
                removeDirtyStyles: function(html) {
                    if (this.utils.browser('msie')) return html;
                    var div = document.createElement('div');
                    div.innerHTML = html;
                    this.clean.clearUnverifiedRemove($(div));
                    html = div.innerHTML;
                    $(div).remove();
                    return html;
                },
                clearUnverified: function() {
                    if (this.utils.browser('msie')) return;
                    this.clean.clearUnverifiedRemove(this.$editor);
                    var headers = this.$editor.find('h1, h2, h3, h4, h5, h6');
                    headers.find('span').removeAttr('style');
                    headers.find(this.opts.verifiedTags.join(', ')).removeAttr('style');
                    this.code.sync();
                },
                clearUnverifiedRemove: function($editor) {
                    $editor.find(this.opts.verifiedTags.join(', ')).removeAttr('style');
                    $editor.find('span').not('[data-verified="redactor"]').removeAttr('style');
                    $editor.find('span[data-verified="redactor"], img[data-verified="redactor"]').each(function(i, s) {
                        var $s = $(s);
                        $s.attr('style', $s.attr('rel'));
                    });
                },
                cleanEmptyParagraph: function() {},
                setVerified: function(html) {
                    if (this.utils.browser('msie')) return html;
                    html = html.replace(new RegExp('<img(.*?[^>])>', 'gi'), '<img$1 data-verified="redactor">');
                    html = html.replace(new RegExp('<span(.*?[^>])>', 'gi'), '<span$1 data-verified="redactor">');
                    var matches = html.match(new RegExp('<(span|img)(.*?)style="(.*?)"(.*?[^>])>', 'gi'));
                    if (matches) {
                        var len = matches.length;
                        for (var i = 0; i < len; i++) {
                            try {
                                var newTag = matches[i].replace(/style="(.*?)"/i, 'style="$1" rel="$1"');
                                html = html.replace(matches[i], newTag);
                            } catch (e) {}
                        }
                    }
                    return html;
                },
                convertInline: function(html) {
                    var $div = $('<div />').html(html);
                    var tags = this.opts.inlineTags;
                    tags.push('span');
                    $div.find(tags.join(',')).each(function() {
                        var $el = $(this);
                        var tag = this.tagName.toLowerCase();
                        $el.attr('data-redactor-tag', tag);
                        if (tag == 'span') {
                            if ($el.attr('style')) $el.attr('data-redactor-style', $el.attr('style'));
                            else if ($el.attr('class')) $el.attr('data-redactor-class', $el.attr('class'));
                        }
                    });
                    html = $div.html();
                    $div.remove();
                    return html;
                },
                normalizeLists: function() {
                    this.$editor.find('li').each(function(i, s) {
                        var $next = $(s).next();
                        if ($next.length !== 0 && ($next[0].tagName == 'UL' || $next[0].tagName == 'OL')) {
                            $(s).append($next);
                        }
                    });
                },
                removeSpaces: function(html) {
                    html = html.replace(/\n/g, '');
                    html = html.replace(/[\t]*/g, '');
                    html = html.replace(/\n\s*\n/g, "\n");
                    html = html.replace(/^[\s\n]*/g, ' ');
                    html = html.replace(/[\s\n]*$/g, ' ');
                    html = html.replace(/>\s{2,}</g, '> <');
                    html = html.replace(/\n\n/g, "\n");
                    html = html.replace(/\u200B/g, '');
                    return html;
                },
                replaceDivs: function(html) {
                    if (this.opts.linebreaks) {
                        html = html.replace(/<div><br\s?\/?><\/div>/gi, '<br />');
                        html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '$2<br />');
                    } else {
                        html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '<p$1>$2</p>');
                    }
                    html = html.replace(/<div(.*?[^>])>/gi, '');
                    html = html.replace(/<\/div>/gi, '');
                    return html;
                },
                replaceDivsToBr: function(html) {
                    html = html.replace(/<div\s(.*?)>/gi, '<p>');
                    html = html.replace(/<div><br\s?\/?><\/div>/gi, '<br /><br />');
                    html = html.replace(/<div>([\w\W]*?)<\/div>/gi, '$1<br /><br />');
                    return html;
                },
                replaceParagraphsToBr: function(html) {
                    html = html.replace(/<p\s(.*?)>/gi, '<p>');
                    html = html.replace(/<p><br\s?\/?><\/p>/gi, '<br />');
                    html = html.replace(/<p>([\w\W]*?)<\/p>/gi, '$1<br /><br />');
                    html = html.replace(/(<br\s?\/?>){1,}\n?<\/blockquote>/gi, '</blockquote>');
                    return html;
                },
                saveFormTags: function(html) {
                    return html.replace(/<form(.*?)>([\w\W]*?)<\/form>/gi, '<section$1 rel="redactor-form-tag">$2</section>');
                },
                restoreFormTags: function(html) {
                    return html.replace(/<section(.*?) rel="redactor-form-tag"(.*?)>([\w\W]*?)<\/section>/gi, '<form$1$2>$3</form>');
                }
            };
        },
        code: function() {
            return {
                set: function(html) {
                    html = $.trim(html.toString());
                    html = this.clean.onSet(html);
                    if (this.utils.browser('msie')) {
                        html = html.replace(/<span(.*?)id="selection-marker-(1|2)"(.*?)><\/span>/gi, '');
                    }
                    this.$editor.html(html);
                    this.code.sync();
                    if (html !== '') this.placeholder.remove();
                    setTimeout($.proxy(this.buffer.add, this), 15);
                    if (this.start === false) this.observe.load();
                },
                get: function() {
                    var code = this.$textarea.val();
                    if (this.opts.replaceDivs) code = this.clean.replaceDivs(code);
                    if (this.opts.linebreaks) code = this.clean.replaceParagraphsToBr(code);
                    code = this.tabifier.get(code);
                    return code;
                },
                sync: function() {
                    setTimeout($.proxy(this.code.startSync, this), 10);
                },
                startSync: function() {
                    var html = this.$editor.html();
                    if (this.code.syncCode && this.code.syncCode == html) {
                        return;
                    }
                    this.code.syncCode = html;
                    html = this.core.setCallback('syncBefore', html);
                    html = this.clean.onSync(html);
                    this.$textarea.val(html);
                    this.core.setCallback('sync', html);
                    if (this.start === false) {
                        this.core.setCallback('change', html);
                    }
                    this.start = false;
                    if (this.autosave.html == false) {
                        this.autosave.html = this.code.get();
                    }
                    if (this.opts.codemirror) {
                        this.$textarea.next('.CodeMirror').each(function(i, el) {
                            el.CodeMirror.setValue(html);
                        });
                    }
                    this.autosave.onChange();
                    this.autosave.enable();
                },
                toggle: function() {
                    if (this.opts.visual) {
                        this.code.showCode();
                    } else {
                        this.code.showVisual();
                    }
                },
                showCode: function() {
                    this.selection.save();
                    this.code.offset = this.caret.getOffset();
                    var scroll = $(window).scrollTop();
                    var width = this.$editor.innerWidth(),
                        height = this.$editor.innerHeight();
                    this.$editor.hide();
                    var html = this.$textarea.val();
                    this.modified = this.clean.removeSpaces(html);
                    html = this.tabifier.get(html);
                    var start = 0,
                        end = 0;
                    var $editorDiv = $("<div/>").append($.parseHTML(this.clean.onSync(this.$editor.html()), document, true));
                    var $selectionMarkers = $editorDiv.find("span.redactor-selection-marker");
                    if ($selectionMarkers.length > 0) {
                        var editorHtml = this.tabifier.get($editorDiv.html()).replace(/&amp;/g, '&');
                        if ($selectionMarkers.length == 1) {
                            start = this.utils.strpos(editorHtml, $editorDiv.find("#selection-marker-1").prop("outerHTML"));
                            end = start;
                        } else if ($selectionMarkers.length == 2) {
                            start = this.utils.strpos(editorHtml, $editorDiv.find("#selection-marker-1").prop("outerHTML"));
                            end = this.utils.strpos(editorHtml, $editorDiv.find("#selection-marker-2").prop("outerHTML")) - $editorDiv.find("#selection-marker-1").prop("outerHTML").toString().length;
                        }
                    }
                    this.selection.removeMarkers();
                    this.$textarea.val(html);
                    if (this.opts.codemirror) {
                        this.$textarea.next('.CodeMirror').each(function(i, el) {
                            $(el).show();
                            el.CodeMirror.setValue(html);
                            el.CodeMirror.setSize('100%', height);
                            el.CodeMirror.refresh();
                            if (start == end) {
                                el.CodeMirror.setCursor(el.CodeMirror.posFromIndex(start).line, el.CodeMirror.posFromIndex(end).ch);
                            } else {
                                el.CodeMirror.setSelection({
                                    line: el.CodeMirror.posFromIndex(start).line,
                                    ch: el.CodeMirror.posFromIndex(start).ch
                                }, {
                                    line: el.CodeMirror.posFromIndex(end).line,
                                    ch: el.CodeMirror.posFromIndex(end).ch
                                });
                            }
                            el.CodeMirror.focus();
                        });
                    } else {
                        this.$textarea.height(height).show().focus();
                        this.$textarea.on('keydown.redactor-textarea-indenting', this.code.textareaIndenting);
                        $(window).scrollTop(scroll);
                        if (this.$textarea[0].setSelectionRange) {
                            this.$textarea[0].setSelectionRange(start, end);
                        }
                        this.$textarea[0].scrollTop = 0;
                    }
                    this.opts.visual = false;
                    this.button.setInactiveInCode();
                    this.button.setActive('html');
                    this.core.setCallback('source', html);
                },
                showVisual: function() {
                    var html;
                    if (this.opts.visual) return;
                    var start = 0,
                        end = 0;
                    if (this.opts.codemirror) {
                        var selection;
                        this.$textarea.next('.CodeMirror').each(function(i, el) {
                            selection = el.CodeMirror.listSelections();
                            start = el.CodeMirror.indexFromPos(selection[0].anchor);
                            end = el.CodeMirror.indexFromPos(selection[0].head);
                            html = el.CodeMirror.getValue();
                        });
                    } else {
                        start = this.$textarea.get(0).selectionStart;
                        end = this.$textarea.get(0).selectionEnd;
                        html = this.$textarea.hide().val();
                    }
                    if (start > end && end > 0) {
                        var tempStart = end;
                        var tempEnd = start;
                        start = tempStart;
                        end = tempEnd;
                    }
                    start = this.code.enlargeOffset(html, start);
                    end = this.code.enlargeOffset(html, end);
                    html = html.substr(0, start) + this.selection.getMarkerAsHtml(1) + html.substr(start);
                    if (end > start) {
                        var markerLength = this.selection.getMarkerAsHtml(1).toString().length;
                        html = html.substr(0, end + markerLength) + this.selection.getMarkerAsHtml(2) + html.substr(end + markerLength);
                    }
                    if (this.modified !== this.clean.removeSpaces(html)) {
                        this.code.set(html);
                    }
                    if (this.opts.codemirror) {
                        this.$textarea.next('.CodeMirror').hide();
                    }
                    this.$editor.show();
                    if (!this.utils.isEmpty(html)) {
                        this.placeholder.remove();
                    }
                    this.selection.restore();
                    this.$textarea.off('keydown.redactor-textarea-indenting');
                    this.button.setActiveInVisual();
                    this.button.setInactive('html');
                    this.observe.load();
                    this.opts.visual = true;
                    this.core.setCallback('visual', html);
                },
                textareaIndenting: function(e) {
                    if (e.keyCode !== 9) return true;
                    var $el = this.$textarea;
                    var start = $el.get(0).selectionStart;
                    $el.val($el.val().substring(0, start) + "\t" + $el.val().substring($el.get(0).selectionEnd));
                    $el.get(0).selectionStart = $el.get(0).selectionEnd = start + 1;
                    return false;
                },
                enlargeOffset: function(html, offset) {
                    var htmlLength = html.length;
                    var c = 0;
                    if (html[offset] == '>') {
                        c++;
                    } else {
                        for (var i = offset; i <= htmlLength; i++) {
                            c++;
                            if (html[i] == '>') {
                                break;
                            } else if (html[i] == '<' || i == htmlLength) {
                                c = 0;
                                break;
                            }
                        }
                    }
                    return offset + c;
                }
            };
        },
        core: function() {
            return {
                getObject: function() {
                    return $.extend({}, this);
                },
                getEditor: function() {
                    return this.$editor;
                },
                getBox: function() {
                    return this.$box;
                },
                getElement: function() {
                    return this.$element;
                },
                getTextarea: function() {
                    return this.$textarea;
                },
                getToolbar: function() {
                    return (this.$toolbar) ? this.$toolbar : false;
                },
                addEvent: function(name) {
                    this.core.event = name;
                },
                getEvent: function() {
                    return this.core.event;
                },
                setCallback: function(type, e, data) {
                    var eventName = type + 'Callback';
                    var eventNamespace = 'redactor';
                    var callback = this.opts[eventName];
                    if (this.$textarea) {
                        var returnValue = false;
                        var events = $._data(this.$textarea[0], 'events');
                        if (typeof events != 'undefined' && typeof events[eventName] != 'undefined') {
                            $.each(events[eventName], $.proxy(function(key, value) {
                                if (value['namespace'] == eventNamespace) {
                                    var data = (typeof data == 'undefined') ? [e] : [e, data];
                                    returnValue = (typeof data == 'undefined') ? value.handler.call(this, e) : value.handler.call(this, e, data);
                                }
                            }, this));
                        }
                        if (returnValue) return returnValue;
                    }
                    if ($.isFunction(callback)) {
                        return (typeof data == 'undefined') ? callback.call(this, e) : callback.call(this, e, data);
                    } else {
                        return (typeof data == 'undefined') ? e : data;
                    }
                },
                destroy: function() {
                    this.opts.destroyed = true;
                    this.core.setCallback('destroy');
                    this.$element.off('.redactor').removeData('redactor');
                    this.$editor.off('.redactor');
                    $(document).off('mousedown.redactor-blur.' + this.uuid);
                    $(document).off('mousedown.redactor.' + this.uuid);
                    $(document).off('click.redactor-image-delete.' + this.uuid);
                    $(document).off('click.redactor-image-resize-hide.' + this.uuid);
                    $(document).off('touchstart.redactor.' + this.uuid + ' click.redactor.' + this.uuid);
                    $("body").off('scroll.redactor.' + this.uuid);
                    $(this.opts.toolbarFixedTarget).off('scroll.redactor.' + this.uuid);
                    this.$editor.removeClass('redactor-editor redactor-linebreaks redactor-placeholder');
                    this.$editor.removeAttr('contenteditable');
                    var html = this.code.get();
                    if (this.opts.toolbar) {
                        this.$toolbar.find('a').each(function() {
                            var $el = $(this);
                            if ($el.data('dropdown')) {
                                $el.data('dropdown').remove();
                                $el.data('dropdown', {});
                            }
                        });
                    }
                    if (this.build.isTextarea()) {
                        this.$box.after(this.$element);
                        this.$box.remove();
                        this.$element.val(html).show();
                    } else {
                        this.$box.after(this.$editor);
                        this.$box.remove();
                        this.$element.html(html).show();
                    }
                    if (this.$pasteBox) this.$pasteBox.remove();
                    if (this.$modalBox) this.$modalBox.remove();
                    if (this.$modalOverlay) this.$modalOverlay.remove();
                    $('.redactor-toolbar-tooltip-' + this.uuid).remove();
                    clearInterval(this.autosaveInterval);
                }
            };
        },
        dropdown: function() {
            return {
                build: function(name, $dropdown, dropdownObject) {
                    if (name == 'formatting' && this.opts.formattingAdd) {
                        $.each(this.opts.formattingAdd, $.proxy(function(i, s) {
                            var name = s.tag,
                                func;
                            if (typeof s['class'] != 'undefined') {
                                name = name + '-' + s['class'];
                            }
                            s.type = (this.utils.isBlockTag(s.tag)) ? 'block' : 'inline';
                            if (typeof s.func !== "undefined") {
                                func = s.func;
                            } else {
                                func = (s.type == 'inline') ? 'inline.formatting' : 'block.formatting';
                            }
                            if (this.opts.linebreaks && s.type == 'block' && s.tag == 'p') return;
                            this.formatting[name] = {
                                tag: s.tag,
                                style: s.style,
                                'class': s['class'],
                                attr: s.attr,
                                data: s.data,
                                clear: s.clear
                            };
                            dropdownObject[name] = {
                                func: func,
                                title: s.title
                            };
                        }, this));
                    }
                    $.each(dropdownObject, $.proxy(function(btnName, btnObject) {
                        var $item = $('<a href="#" class="redactor-dropdown-' + btnName + '" role="button">' + btnObject.title + '</a>');
                        if (name == 'formatting') $item.addClass(btnName);
                        $item.on('click', $.proxy(function(e) {
                            e.preventDefault();
                            this.selection.save();
                            var type = 'func';
                            var callback = btnObject.func;
                            if (btnObject.command) {
                                type = 'command';
                                callback = btnObject.command;
                            } else if (btnObject.dropdown) {
                                type = 'dropdown';
                                callback = btnObject.dropdown;
                            }
                            if ($(e.target).hasClass('redactor-dropdown-link-inactive')) return;
                            this.button.onClick(e, btnName, type, callback);
                            this.dropdown.hideAll();
                        }, this));
                        this.observe.addDropdown($item, btnName, btnObject);
                        $dropdown.append($item);
                    }, this));
                },
                show: function(e, key) {
                    if (!this.opts.visual) {
                        e.preventDefault();
                        return false;
                    }
                    var $button = this.button.get(key);
                    var $dropdown = $button.data('dropdown').appendTo(this.$box);
                    if (this.opts.highContrast) {
                        $dropdown.addClass("redactor-dropdown-contrast");
                    }
                    if ($button.hasClass('dropact')) {
                        this.dropdown.hideAll();
                    } else {
                        this.dropdown.hideAll();
                        this.observe.dropdowns();
                        this.core.setCallback('dropdownShow', {
                            dropdown: $dropdown,
                            key: key,
                            button: $button
                        });
                        this.button.setActive(key);
                        $button.addClass('dropact');
                        var keyPosition = $button.position();
                        var dropdownWidth = $dropdown.width();
                        if ((keyPosition.left + dropdownWidth) > $(document).width()) {
                            keyPosition.left = Math.max(0, keyPosition.left - dropdownWidth);
                        }
                        var left = keyPosition.left + 'px';
                        if (this.$toolbar.hasClass('toolbar-fixed-box')) {
                            var top = this.$toolbar.innerHeight() + this.opts.toolbarFixedTopOffset;
                            var position = 'fixed';
                            if (this.opts.toolbarFixedTarget !== document) {
                                top = (this.$toolbar.innerHeight() + this.$toolbar.offset().top) + this.opts.toolbarFixedTopOffset;
                                position = 'absolute';
                            }
                            $dropdown.css({
                                position: position,
                                left: left,
                                top: top + 'px'
                            }).show();
                        } else {
                            var top = ($button.innerHeight() + keyPosition.top) + 'px';
                            $dropdown.css({
                                position: 'absolute',
                                left: left,
                                top: top
                            }).show();
                        }
                        this.core.setCallback('dropdownShown', {
                            dropdown: $dropdown,
                            key: key,
                            button: $button
                        });
                        this.$dropdown = $dropdown;
                    }
                    $(document).one('click.redactor-dropdown', $.proxy(this.dropdown.hide, this));
                    this.$editor.one('click.redactor-dropdown', $.proxy(this.dropdown.hide, this));
                    $(document).one('keyup.redactor-dropdown', $.proxy(this.dropdown.closeHandler, this));
                    $dropdown.on('mouseover.redactor-dropdown', $.proxy(this.utils.disableBodyScroll, this)).on('mouseout.redactor-dropdown', $.proxy(this.utils.enableBodyScroll, this));
                    e.stopPropagation();
                },
                closeHandler: function(e) {
                    if (e.which != this.keyCode.ESC) return;
                    this.dropdown.hideAll();
                    this.$editor.focus();
                },
                hideAll: function() {
                    this.$toolbar.find('a.dropact').removeClass('redactor-act').removeClass('dropact');
                    this.utils.enableBodyScroll();
                    $('.redactor-dropdown-' + this.uuid).hide();
                    $('.redactor-dropdown-link-selected').removeClass('redactor-dropdown-link-selected');
                    if (this.$dropdown) {
                        this.$dropdown.off('.redactor-dropdown');
                        this.core.setCallback('dropdownHide', this.$dropdown);
                        this.$dropdown = false;
                    }
                },
                hide: function(e) {
                    var $dropdown = $(e.target);
                    if (!$dropdown.hasClass('dropact') && !$dropdown.hasClass('redactor-dropdown-link-inactive')) {
                        $dropdown.removeClass('dropact');
                        $dropdown.off('mouseover mouseout');
                        this.dropdown.hideAll();
                    }
                }
            };
        },
        file: function() {
            return {
                show: function() {
                    this.modal.load('file', this.lang.get('file'), 700);
                    this.upload.init('#redactor-modal-file-upload', this.opts.fileUpload, this.file.insert);
                    this.selection.save();
                    this.selection.get();
                    var text = this.sel.toString();
                    $('#redactor-filename').val(text);
                    this.modal.show();
                },
                insert: function(json, direct, e) {
                    if (typeof json.error != 'undefined') {
                        this.modal.close();
                        this.selection.restore();
                        this.core.setCallback('fileUploadError', json);
                        return;
                    }
                    var link;
                    if (typeof json == 'string') {
                        link = json;
                    } else {
                        var text = $('#redactor-filename').val();
                        if (typeof text == 'undefined' || text === '') text = json.filename;
                        link = '<a href="' + json.filelink + '" id="filelink-marker">' + text + '</a>';
                    }
                    if (direct) {
                        this.selection.removeMarkers();
                        var marker = this.selection.getMarker();
                        this.insert.nodeToCaretPositionFromPoint(e, marker);
                    } else {
                        this.modal.close();
                    }
                    this.selection.restore();
                    this.buffer.set();
                    this.insert.htmlWithoutClean(link);
                    if (typeof json == 'string') return;
                    var linkmarker = $(this.$editor.find('a#filelink-marker'));
                    if (linkmarker.length !== 0) {
                        linkmarker.removeAttr('id').removeAttr('style');
                    } else linkmarker = false;
                    this.core.setCallback('fileUpload', linkmarker, json);
                }
            };
        },
        focus: function() {
            return {
                setStart: function() {
                    this.$editor.focus();
                    var first = this.$editor.children().first();
                    if (first.length === 0) return;
                    if (first[0].length === 0 || first[0].tagName == 'BR' || first[0].nodeType == 3) {
                        return;
                    }
                    if (first[0].tagName == 'UL' || first[0].tagName == 'OL') {
                        var child = first.find('li').first();
                        if (!this.utils.isBlock(child) && child.text() === '') {
                            this.caret.setStart(child);
                            return;
                        }
                    }
                    if (this.opts.linebreaks && !this.utils.isBlockTag(first[0].tagName)) {
                        this.selection.get();
                        this.range.setStart(this.$editor[0], 0);
                        this.range.setEnd(this.$editor[0], 0);
                        this.selection.addRange();
                        return;
                    }
                    this.caret.setStart(first);
                },
                setEnd: function() {
                    var last = this.$editor.children().last();
                    this.$editor.focus();
                    if (last.size() === 0) return;
                    if (this.utils.isEmpty(this.$editor.html())) {
                        this.selection.get();
                        this.range.collapse(true);
                        this.range.setStartAfter(last[0]);
                        this.range.setEnd(last[0], 0);
                        this.selection.addRange();
                    } else {
                        this.selection.get();
                        this.range.selectNodeContents(last[0]);
                        this.range.collapse(false);
                        this.selection.addRange();
                    }
                },
                isFocused: function() {
                    var focusNode = document.getSelection().focusNode;
                    if (focusNode === null) return false;
                    if (this.opts.linebreaks && $(focusNode.parentNode).hasClass('redactor-linebreaks')) return true;
                    else if (!this.utils.isRedactorParent(focusNode.parentNode)) return false;
                    return this.$editor.is(':focus');
                }
            };
        },
        image: function() {
            return {
                show: function() {
                    this.modal.load('image', this.lang.get('image'), 700);
                    this.upload.init('#redactor-modal-image-droparea', this.opts.imageUpload, this.image.insert);
                    this.selection.save();
                    this.modal.show();
                },
                showEdit: function($image) {
                    var $link = $image.closest('a', this.$editor[0]);
                    this.modal.load('imageEdit', this.lang.get('edit'), 705);
                    this.modal.createCancelButton();
                    this.image.buttonDelete = this.modal.createDeleteButton(this.lang.get('_delete'));
                    this.image.buttonSave = this.modal.createActionButton(this.lang.get('save'));
                    this.image.buttonDelete.on('click', $.proxy(function() {
                        this.image.remove($image);
                    }, this));
                    this.image.buttonSave.on('click', $.proxy(function() {
                        this.image.update($image);
                    }, this));
                    var $el = $image;
                    var H, W;
                    $('#redactor_img_width').val($el.width()).keyup(function() {
                        if ($('#redactor_keep_aspect_ratio').is(":checked")) {
                            $('#redactor_img_height').val(Math.floor($('#redactor_img_width').val() * H / W));
                        }
                    });
                    $('#redactor_img_height').val($el.height()).keyup(function() {
                        if ($('#redactor_keep_aspect_ratio').is(":checked")) {
                            $('#redactor_img_width').val(Math.floor($('#redactor_img_height').val() * W / H));
                        }
                    });
                    var img = new Image();
                    img.onload = function() {
                        H = this.height;
                        W = this.width;
                    }
                    img.src = $el.attr('src');
                    $('.redactor-link-tooltip').remove();
                    $('#redactor-image-title').val($image.attr('alt'));
                    if (!this.opts.imageLink) $('.redactor-image-link-option').hide();
                    else {
                        var $redactorImageLink = $('#redactor-image-link');
                        $redactorImageLink.attr('href', $image.attr('src'));
                        if ($link.length !== 0) {
                            $redactorImageLink.val($link.attr('href'));
                            if ($link.attr('target') == '_blank') $('#redactor-image-link-blank').prop('checked', true);
                        }
                    }
                    if (!this.opts.imagePosition) $('.redactor-image-position-option').hide();
                    else {
                        var floatValue = ($image.css('display') == 'block' && $image.css('float') == 'none') ? 'center' : $image.css('float');
                        $('#redactor-image-align').val(floatValue);
                    }
                    this.modal.show();
                    $('#redactor-image-title').focus();
                },
                setFloating: function($image) {
                    var floating = $('#redactor-image-align').val();
                    var imageFloat = '';
                    var imageDisplay = '';
                    var imageMargin = '';
                    switch (floating) {
                        case 'left':
                            imageFloat = 'left';
                            imageMargin = '0 ' + this.opts.imageFloatMargin + ' ' + this.opts.imageFloatMargin + ' 0';
                            break;
                        case 'right':
                            imageFloat = 'right';
                            imageMargin = '0 0 ' + this.opts.imageFloatMargin + ' ' + this.opts.imageFloatMargin;
                            break;
                        case 'center':
                            imageDisplay = 'block';
                            imageMargin = 'auto';
                            break;
                    }
                    $image.css({
                        'float': imageFloat,
                        display: imageDisplay,
                        margin: imageMargin
                    });
                    $image.attr('rel', $image.attr('style'));
                },
                update: function($image) {
                    this.image.hideResize();
                    this.buffer.set();
                    var $link = $image.closest('a', this.$editor[0]);
                    var title = $('#redactor-image-title').val().replace(/(<([^>]+)>)/ig, "");
                    $image.attr('alt', title);
                    $($image).width($('#redactor_img_width').val());
                    this.image.setFloating($image);
                    var link = $.trim($('#redactor-image-link').val());
                    var link = link.replace(/(<([^>]+)>)/ig, "");
                    if (link !== '') {
                        var pattern = '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}';
                        var re = new RegExp('^(http|ftp|https)://' + pattern, 'i');
                        var re2 = new RegExp('^' + pattern, 'i');
                        if (link.search(re) == -1 && link.search(re2) === 0 && this.opts.linkProtocol) {
                            link = this.opts.linkProtocol + '://' + link;
                        }
                        var target = ($('#redactor-image-link-blank').prop('checked')) ? true : false;
                        if ($link.length === 0) {
                            var a = $('<a href="' + link + '">' + this.utils.getOuterHtml($image) + '</a>');
                            if (target) a.attr('target', '_blank');
                            $image.replaceWith(a);
                        } else {
                            $link.attr('href', link);
                            if (target) {
                                $link.attr('target', '_blank');
                            } else {
                                $link.removeAttr('target');
                            }
                        }
                    } else if ($link.length !== 0) {
                        $link.replaceWith(this.utils.getOuterHtml($image));
                    }
                    this.modal.close();
                    this.observe.images();
                    this.code.sync();
                },
                setEditable: function($image) {
                    if (this.opts.imageEditable) {
                        $image.on('dragstart', $.proxy(this.image.onDrag, this));
                    }
                    var handler = $.proxy(function(e) {
                        this.observe.image = $image;
                        this.image.resizer = this.image.loadEditableControls($image);
                        $(document).on('mousedown.redactor-image-resize-hide.' + this.uuid, $.proxy(this.image.hideResize, this));
                        if (!this.opts.imageResizable) return;
                        this.image.resizer.on('mousedown.redactor touchstart.redactor', $.proxy(function(e) {
                            this.image.setResizable(e, $image);
                        }, this));
                    }, this);
                    $image.off('mousedown.redactor').on('mousedown.redactor', $.proxy(this.image.hideResize, this));
                    $image.off('click.redactor touchstart.redactor').on('click.redactor touchstart.redactor', handler);
                },
                setResizable: function(e, $image) {
                    e.preventDefault();
                    this.image.resizeHandle = {
                        x: e.pageX,
                        y: e.pageY,
                        el: $image,
                        ratio: $image.width() / $image.height(),
                        h: $image.height()
                    };
                    e = e.originalEvent || e;
                    if (e.targetTouches) {
                        this.image.resizeHandle.x = e.targetTouches[0].pageX;
                        this.image.resizeHandle.y = e.targetTouches[0].pageY;
                    }
                    this.image.startResize();
                },
                startResize: function() {
                    $(document).on('mousemove.redactor-image-resize touchmove.redactor-image-resize', $.proxy(this.image.moveResize, this));
                    $(document).on('mouseup.redactor-image-resize touchend.redactor-image-resize', $.proxy(this.image.stopResize, this));
                },
                moveResize: function(e) {
                    e.preventDefault();
                    e = e.originalEvent || e;
                    var height = this.image.resizeHandle.h;
                    if (e.targetTouches) height += (e.targetTouches[0].pageY - this.image.resizeHandle.y);
                    else height += (e.pageY - this.image.resizeHandle.y);
                    var width = Math.round(height * this.image.resizeHandle.ratio);
                    if (height < 50 || width < 100) return;
                    var height = Math.round(this.image.resizeHandle.el.width() / this.image.resizeHandle.ratio);
                    this.image.resizeHandle.el.attr({
                        width: width,
                        height: height
                    });
                    this.image.resizeHandle.el.width(width);
                    this.image.resizeHandle.el.height(height);
                    this.code.sync();
                },
                stopResize: function() {
                    this.handle = false;
                    $(document).off('.redactor-image-resize');
                    this.image.hideResize();
                },
                onDrag: function(e) {
                    if (this.$editor.find('#redactor-image-box').length !== 0) {
                        e.preventDefault();
                        return false;
                    }
                    this.$editor.on('drop.redactor-image-inside-drop', $.proxy(function() {
                        setTimeout($.proxy(this.image.onDrop, this), 1);
                    }, this));
                },
                onDrop: function() {
                    this.image.fixImageSourceAfterDrop();
                    this.observe.images();
                    this.$editor.off('drop.redactor-image-inside-drop');
                    this.clean.clearUnverified();
                    this.code.sync();
                },
                fixImageSourceAfterDrop: function() {
                    this.$editor.find('img[data-save-url]').each(function() {
                        var $el = $(this);
                        $el.attr('src', $el.attr('data-save-url'));
                        $el.removeAttr('data-save-url');
                    });
                },
                hideResize: function(e) {
                    if (e && $(e.target).closest('#redactor-image-box', this.$editor[0]).length !== 0) return;
                    if (e && e.target.tagName == 'IMG') {
                        var $image = $(e.target);
                        $image.attr('data-save-url', $image.attr('src'));
                    }
                    var imageBox = this.$editor.find('#redactor-image-box');
                    if (imageBox.length === 0) return;
                    $('#redactor-image-editter').remove();
                    $('#redactor-image-resizer').remove();
                    imageBox.find('img').css({
                        marginTop: imageBox[0].style.marginTop,
                        marginBottom: imageBox[0].style.marginBottom,
                        marginLeft: imageBox[0].style.marginLeft,
                        marginRight: imageBox[0].style.marginRight
                    });
                    imageBox.css('margin', '');
                    imageBox.find('img').css('opacity', '');
                    imageBox.replaceWith(function() {
                        return $(this).contents();
                    });
                    $(document).off('mousedown.redactor-image-resize-hide.' + this.uuid);
                    if (typeof this.image.resizeHandle !== 'undefined') {
                        this.image.resizeHandle.el.attr('rel', this.image.resizeHandle.el.attr('style'));
                    }
                    this.code.sync();
                },
                loadResizableControls: function($image, imageBox) {
                    if (this.opts.imageResizable && !this.utils.isMobile()) {
                        var imageResizer = $('<span id="redactor-image-resizer" data-redactor="verified"></span>');
                        if (!this.utils.isDesktop()) {
                            imageResizer.css({
                                width: '15px',
                                height: '15px'
                            });
                        }
                        imageResizer.attr('contenteditable', false);
                        imageBox.append(imageResizer);
                        imageBox.append($image);
                        return imageResizer;
                    } else {
                        imageBox.append($image);
                        return false;
                    }
                },
                loadEditableControls: function($image) {
                    var imageBox = $('<span id="redactor-image-box" data-redactor="verified">');
                    imageBox.css('float', $image.css('float')).attr('contenteditable', false);
                    if ($image[0].style.margin != 'auto') {
                        imageBox.css({
                            marginTop: $image[0].style.marginTop,
                            marginBottom: $image[0].style.marginBottom,
                            marginLeft: $image[0].style.marginLeft,
                            marginRight: $image[0].style.marginRight
                        });
                        $image.css('margin', '');
                    } else {
                        imageBox.css({
                            'display': 'block',
                            'margin': 'auto'
                        });
                    }
                    $image.css('opacity', '.5').after(imageBox);
                    if (this.opts.imageEditable) {
                        this.image.editter = $('<span id="redactor-image-editter" data-redactor="verified">' + this.lang.get('edit') + '</span>');
                        this.image.editter.attr('contenteditable', false);
                        this.image.editter.on('click', $.proxy(function() {
                            this.image.showEdit($image);
                        }, this));
                        imageBox.append(this.image.editter);
                        var editerWidth = this.image.editter.innerWidth();
                        this.image.editter.css('margin-left', '-' + editerWidth / 2 + 'px');
                    }
                    return this.image.loadResizableControls($image, imageBox);
                },
                remove: function(image) {
                    var $image = $(image);
                    var $link = $image.closest('a', this.$editor[0]);
                    var $figure = $image.closest('figure', this.$editor[0]);
                    var $parent = $image.parent();
                    if ($('#redactor-image-box').length !== 0) {
                        $parent = $('#redactor-image-box').parent();
                    }
                    var $next;
                    if ($figure.length !== 0) {
                        $next = $figure.next();
                        $figure.remove();
                    } else if ($link.length !== 0) {
                        $parent = $link.parent();
                        $link.remove();
                    } else {
                        $image.remove();
                    }
                    $('#redactor-image-box').remove();
                    if ($figure.length !== 0) {
                        this.caret.setStart($next);
                    } else {
                        this.caret.setStart($parent);
                    }
                    this.core.setCallback('imageDelete', $image[0].src, $image);
                    this.modal.close();
                    this.code.sync();
                },
                insert: function(json, direct, e) {
                    if (typeof json.error != 'undefined') {
                        this.modal.close();
                        this.selection.restore();
                        this.core.setCallback('imageUploadError', json);
                        return;
                    }
                    var $img;
                    if (typeof json == 'string') {
                        $img = $(json).attr('data-redactor-inserted-image', 'true');
                    } else {
                        $img = $('<img>');
                        $img.attr('src', json.filelink).attr('data-redactor-inserted-image', 'true');
                    }
                    var node = $img;
                    var isP = this.utils.isCurrentOrParent('P');
                    if (isP) {
                        node = $('<blockquote />').append($img);
                    }
                    if (direct) {
                        this.selection.removeMarkers();
                        var marker = this.selection.getMarker();
                        this.insert.nodeToCaretPositionFromPoint(e, marker);
                    } else {
                        this.modal.close();
                    }
                    this.selection.restore();
                    this.buffer.set();
                    this.insert.html(this.utils.getOuterHtml(node), false);
                    var $image = this.$editor.find('img[data-redactor-inserted-image=true]').removeAttr('data-redactor-inserted-image');
                    if (isP) {
                        $image.parent().contents().unwrap().wrap('<p />');
                    } else if (this.opts.linebreaks) {
                        if (!this.utils.isEmpty(this.code.get())) {
                            $image.before('<br>');
                        }
                        $image.after('<br>');
                    }
                    if (typeof json == 'string') return;
                    this.core.setCallback('imageUpload', $image, json);
                }
            };
        },
        indent: function() {
            return {
                increase: function() {
                    if (!this.utils.browser('msie')) this.$editor.focus();
                    this.buffer.set();
                    this.selection.save();
                    var block = this.selection.getBlock();
                    if (block && block.tagName == 'LI') {
                        this.indent.increaseLists();
                    } else if (block === false && this.opts.linebreaks) {
                        this.indent.increaseText();
                    } else {
                        this.indent.increaseBlocks();
                    }
                    this.selection.restore();
                    this.code.sync();
                },
                increaseLists: function() {
                    document.execCommand('indent');
                    this.indent.fixEmptyIndent();
                    this.clean.normalizeLists();
                    this.clean.clearUnverified();
                },
                increaseBlocks: function() {
                    $.each(this.selection.getBlocks(), $.proxy(function(i, elem) {
                        if (elem.tagName === 'TD' || elem.tagName === 'TH') return;
                        var $el = this.utils.getAlignmentElement(elem);
                        var left = this.utils.normalize($el.css('margin-left')) + this.opts.indentValue;
                        $el.css('margin-left', left + 'px');
                    }, this));
                },
                increaseText: function() {
                    var wrapper = this.selection.wrap('div');
                    $(wrapper).attr('data-tagblock', 'redactor');
                    $(wrapper).css('margin-left', this.opts.indentValue + 'px');
                },
                decrease: function() {
                    this.buffer.set();
                    this.selection.save();
                    var block = this.selection.getBlock();
                    if (block && block.tagName == 'LI') {
                        this.indent.decreaseLists();
                    } else {
                        this.indent.decreaseBlocks();
                    }
                    this.selection.restore();
                    this.code.sync();
                },
                decreaseLists: function() {
                    document.execCommand('outdent');
                    var current = this.selection.getCurrent();
                    var $item = $(current).closest('li', this.$editor[0]);
                    this.indent.fixEmptyIndent();
                    if (!this.opts.linebreaks && $item.length === 0) {
                        document.execCommand('formatblock', false, 'p');
                        this.$editor.find('ul, ol, blockquote, p').each($.proxy(this.utils.removeEmpty, this));
                    }
                    this.clean.clearUnverified();
                },
                decreaseBlocks: function() {
                    $.each(this.selection.getBlocks(), $.proxy(function(i, elem) {
                        var $el = this.utils.getAlignmentElement(elem);
                        var left = this.utils.normalize($el.css('margin-left')) - this.opts.indentValue;
                        if (left <= 0) {
                            if (this.opts.linebreaks && typeof($el.data('tagblock')) !== 'undefined') {
                                $el.replaceWith($el.html() + '<br />');
                            } else {
                                $el.css('margin-left', '');
                                this.utils.removeEmptyAttr($el, 'style');
                            }
                        } else {
                            $el.css('margin-left', left + 'px');
                        }
                    }, this));
                },
                fixEmptyIndent: function() {
                    var block = this.selection.getBlock();
                    if (this.range.collapsed && block && block.tagName == 'LI' && this.utils.isEmpty($(block).text())) {
                        var $block = $(block);
                        $block.find('span').not('.redactor-selection-marker').contents().unwrap();
                        $block.append('<br>');
                    }
                }
            };
        },
        inline: function() {
            return {
                formatting: function(name) {
                    var type, value;
                    if (typeof this.formatting[name].style != 'undefined') type = 'style';
                    else if (typeof this.formatting[name]['class'] != 'undefined') type = 'class';
                    if (type) value = this.formatting[name][type];
                    this.inline.format(this.formatting[name].tag, type, value);
                },
                format: function(tag, type, value) {
                    var current = this.selection.getCurrent();
                    if (current && current.tagName === 'TR') return;
                    if (this.utils.isCurrentOrParent('PRE') || this.utils.isCurrentOrParentHeader()) return;
                    var tags = ['b', 'bold', 'i', 'italic', 'underline', 'strikethrough', 'deleted', 'superscript', 'subscript'];
                    var replaced = ['strong', 'strong', 'em', 'em', 'u', 'del', 'del', 'sup', 'sub'];
                    for (var i = 0; i < tags.length; i++) {
                        if (tag == tags[i]) tag = replaced[i];
                    }
                    if (this.opts.allowedTags) {
                        if ($.inArray(tag, this.opts.allowedTags) == -1) return;
                    } else {
                        if ($.inArray(tag, this.opts.deniedTags) !== -1) return;
                    }
                    this.inline.type = type || false;
                    this.inline.value = value || false;
                    this.buffer.set();
                    if (!this.utils.browser('msie') && !this.opts.linebreaks) {
                        this.$editor.focus();
                    }
                    this.selection.get();
                    if (this.range.collapsed) {
                        this.inline.formatCollapsed(tag);
                    } else {
                        this.inline.formatMultiple(tag);
                    }
                },
                formatCollapsed: function(tag) {
                    var current = this.selection.getCurrent();
                    var $parent = $(current).closest(tag + '[data-redactor-tag=' + tag + ']', this.$editor[0]);
                    if ($parent.length !== 0 && (this.inline.type != 'style' && $parent[0].tagName != 'SPAN')) {
                        if (this.utils.isEmpty($parent.text())) {
                            this.caret.setAfter($parent[0]);
                            $parent.remove();
                            this.code.sync();
                        } else if (this.utils.isEndOfElement($parent)) {
                            this.caret.setAfter($parent[0]);
                        }
                        return;
                    }
                    var node = $('<' + tag + '>').attr('data-verified', 'redactor').attr('data-redactor-tag', tag);
                    node.html(this.opts.invisibleSpace);
                    node = this.inline.setFormat(node);
                    var node = this.insert.node(node);
                    this.caret.setEnd(node);
                    this.code.sync();
                },
                formatMultiple: function(tag) {
                    this.inline.formatConvert(tag);
                    this.selection.save();
                    document.execCommand('strikethrough');
                    this.$editor.find('strike').each($.proxy(function(i, s) {
                        var $el = $(s);
                        this.inline.formatRemoveSameChildren($el, tag);
                        var $span;
                        if (this.inline.type) {
                            $span = $('<span>').attr('data-redactor-tag', tag).attr('data-verified', 'redactor');
                            $span = this.inline.setFormat($span);
                        } else {
                            $span = $('<' + tag + '>').attr('data-redactor-tag', tag).attr('data-verified', 'redactor');
                        }
                        $el.replaceWith($span.html($el.contents()));
                        var $parent = $span.parent();
                        if ($span[0].tagName === 'A' && $parent && $parent[0].tagName === 'U') {
                            $span.parent().replaceWith($span);
                        }
                        if (tag == 'span') {
                            if ($parent && $parent[0].tagName === 'SPAN' && this.inline.type === 'style') {
                                var arr = this.inline.value.split(';');
                                for (var z = 0; z < arr.length; z++) {
                                    if (arr[z] === '') return;
                                    var style = arr[z].split(':');
                                    $parent.css(style[0], '');
                                    if (this.utils.removeEmptyAttr($parent, 'style')) {
                                        $parent.replaceWith($parent.contents());
                                    }
                                }
                            }
                        }
                    }, this));
                    if (tag != 'span') {
                        this.$editor.find(this.opts.inlineTags.join(', ')).each($.proxy(function(i, s) {
                            var $el = $(s);
                            if (s.tagName === 'U' && s.attributes.length === 0) {
                                $el.replaceWith($el.contents());
                                return;
                            }
                            var property = $el.css('text-decoration');
                            if (property === 'line-through') {
                                $el.css('text-decoration', '');
                                this.utils.removeEmptyAttr($el, 'style');
                            }
                        }, this));
                    }
                    if (tag != 'del') {
                        var _this = this;
                        this.$editor.find('inline').each(function(i, s) {
                            _this.utils.replaceToTag(s, 'del');
                        });
                    }
                    this.selection.restore();
                    this.code.sync();
                },
                formatRemoveSameChildren: function($el, tag) {
                    var self = this;
                    $el.children(tag).each(function() {
                        var $child = $(this);
                        if (!$child.hasClass('redactor-selection-marker')) {
                            if (self.inline.type == 'style') {
                                var arr = self.inline.value.split(';');
                                for (var z = 0; z < arr.length; z++) {
                                    if (arr[z] === '') return;
                                    var style = arr[z].split(':');
                                    $child.css(style[0], '');
                                    if (self.utils.removeEmptyAttr($child, 'style')) {
                                        $child.replaceWith($child.contents());
                                    }
                                }
                            } else {
                                $child.contents().unwrap();
                            }
                        }
                    });
                },
                formatConvert: function(tag) {
                    this.selection.save();
                    var find = '';
                    if (this.inline.type == 'class') find = '[data-redactor-class=' + this.inline.value + ']';
                    else if (this.inline.type == 'style') {
                        find = '[data-redactor-style="' + this.inline.value + '"]';
                    }
                    var self = this;
                    if (tag != 'del') {
                        this.$editor.find('del').each(function(i, s) {
                            self.utils.replaceToTag(s, 'inline');
                        });
                    }
                    if (tag != 'span') {
                        this.$editor.find(tag).each(function() {
                            var $el = $(this);
                            $el.replaceWith($('<strike />').html($el.contents()));
                        });
                    }
                    this.$editor.find('[data-redactor-tag="' + tag + '"]' + find).each(function() {
                        if (find === '' && tag == 'span' && this.tagName.toLowerCase() == tag) return;
                        var $el = $(this);
                        $el.replaceWith($('<strike />').html($el.contents()));
                    });
                    this.selection.restore();
                },
                setFormat: function(node) {
                    switch (this.inline.type) {
                        case 'class':
                            if (node.hasClass(this.inline.value)) {
                                node.removeClass(this.inline.value);
                                node.removeAttr('data-redactor-class');
                            } else {
                                node.addClass(this.inline.value);
                                node.attr('data-redactor-class', this.inline.value);
                            }
                            break;
                        case 'style':
                            node[0].style.cssText = this.inline.value;
                            node.attr('data-redactor-style', this.inline.value);
                            break;
                    }
                    return node;
                },
                removeStyle: function() {
                    this.buffer.set();
                    var current = this.selection.getCurrent();
                    var nodes = this.selection.getInlines();
                    this.selection.save();
                    if (current && current.tagName === 'SPAN') {
                        var $s = $(current);
                        $s.removeAttr('style');
                        if ($s[0].attributes.length === 0) {
                            $s.replaceWith($s.contents());
                        }
                    }
                    $.each(nodes, $.proxy(function(i, s) {
                        var $s = $(s);
                        if ($.inArray(s.tagName.toLowerCase(), this.opts.inlineTags) != -1 && !$s.hasClass('redactor-selection-marker')) {
                            $s.removeAttr('style');
                            if ($s[0].attributes.length === 0) {
                                $s.replaceWith($s.contents());
                            }
                        }
                    }, this));
                    this.selection.restore();
                    this.code.sync();
                },
                removeStyleRule: function(name) {
                    this.buffer.set();
                    var parent = this.selection.getParent();
                    var nodes = this.selection.getInlines();
                    this.selection.save();
                    if (parent && parent.tagName === 'SPAN') {
                        var $s = $(parent);
                        $s.css(name, '');
                        this.utils.removeEmptyAttr($s, 'style');
                        if ($s[0].attributes.length === 0) {
                            $s.replaceWith($s.contents());
                        }
                    }
                    $.each(nodes, $.proxy(function(i, s) {
                        var $s = $(s);
                        if ($.inArray(s.tagName.toLowerCase(), this.opts.inlineTags) != -1 && !$s.hasClass('redactor-selection-marker')) {
                            $s.css(name, '');
                            this.utils.removeEmptyAttr($s, 'style');
                            if ($s[0].attributes.length === 0) {
                                $s.replaceWith($s.contents());
                            }
                        }
                    }, this));
                    this.selection.restore();
                    this.code.sync();
                },
                removeFormat: function() {
                    this.buffer.set();
                    var current = this.selection.getCurrent();
                    this.selection.save();
                    document.execCommand('removeFormat');
                    if (current && current.tagName === 'SPAN') {
                        $(current).replaceWith($(current).contents());
                    }
                    $.each(this.selection.getNodes(), $.proxy(function(i, s) {
                        var $s = $(s);
                        if ($.inArray(s.tagName.toLowerCase(), this.opts.inlineTags) != -1 && !$s.hasClass('redactor-selection-marker')) {
                            $s.replaceWith($s.contents());
                        }
                    }, this));
                    this.selection.restore();
                    this.code.sync();
                },
                toggleClass: function(className) {
                    this.inline.format('span', 'class', className);
                },
                toggleStyle: function(value) {
                    this.inline.format('span', 'style', value);
                }
            };
        },
        insert: function() {
            return {
                set: function(html, clean) {
                    this.placeholder.remove();
                    html = this.clean.setVerified(html);
                    if (typeof clean == 'undefined') {
                        html = this.clean.onPaste(html, false);
                    }
                    this.$editor.html(html);
                    this.selection.remove();
                    this.focus.setEnd();
                    this.clean.normalizeLists();
                    this.code.sync();
                    this.observe.load();
                    if (typeof clean == 'undefined') {
                        setTimeout($.proxy(this.clean.clearUnverified, this), 10);
                    }
                },
                text: function(text) {
                    this.placeholder.remove();
                    text = text.toString();
                    text = $.trim(text);
                    text = this.clean.getPlainText(text, false);
                    this.$editor.focus();
                    if (this.utils.browser('msie')) {
                        this.insert.htmlIe(text);
                    } else {
                        this.selection.get();
                        this.range.deleteContents();
                        var el = document.createElement("div");
                        el.innerHTML = text;
                        var frag = document.createDocumentFragment(),
                            node, lastNode;
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        this.range.insertNode(frag);
                        if (lastNode) {
                            var range = this.range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            this.sel.removeAllRanges();
                            this.sel.addRange(range);
                        }
                    }
                    this.code.sync();
                    this.clean.clearUnverified();
                },
                htmlWithoutClean: function(html) {
                    this.insert.html(html, false);
                },
                html: function(html, clean) {
                    this.placeholder.remove();
                    if (typeof clean == 'undefined') clean = true;
                    if (!this.opts.linebreaks) {
                        this.$editor.focus();
                    }
                    html = this.clean.setVerified(html);
                    if (clean) {
                        html = this.clean.onPaste(html);
                    }
                    if (this.utils.browser('msie')) {
                        this.insert.htmlIe(html);
                    } else {
                        if (this.clean.singleLine) this.insert.execHtml(html);
                        else {
                            try {
                                document.execCommand('insertHTML', false, html);
                            } catch (e) {}
                        }
                        this.insert.htmlFixMozilla();
                    }
                    this.clean.normalizeLists();
                    if (!this.opts.linebreaks) {
                        this.$editor.find('p').each($.proxy(this.utils.removeEmpty, this));
                    }
                    this.code.sync();
                    this.observe.load();
                    if (clean) {
                        this.clean.clearUnverified();
                    }
                },
                htmlFixMozilla: function() {
                    if (!this.utils.browser('mozilla')) return;
                    var $next = $(this.selection.getBlock()).next();
                    if ($next.length > 0 && $next[0].tagName == 'P' && $next.html() === '') {
                        $next.remove();
                    }
                },
                htmlIe: function(html) {
                    if (this.utils.isIe11()) {
                        var parent = this.utils.isCurrentOrParent('P');
                        var $html = $('<div>').append(html);
                        var blocksMatch = $html.contents().is('p, :header, dl, ul, ol, div, table, td, blockquote, pre, address, section, header, footer, aside, article');
                        if (parent && blocksMatch) this.insert.ie11FixInserting(parent, html);
                        else this.insert.ie11PasteFrag(html);
                        return;
                    }
                    document.selection.createRange().pasteHTML(html);
                },
                execHtml: function(html) {
                    html = this.clean.setVerified(html);
                    this.selection.get();
                    this.range.deleteContents();
                    var el = document.createElement('div');
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(),
                        node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    this.range.insertNode(frag);
                    this.range.collapse(true);
                    this.caret.setAfter(lastNode);
                },
                node: function(node, deleteContents) {
                    node = node[0] || node;
                    var html = this.utils.getOuterHtml(node);
                    html = this.clean.setVerified(html);
                    if (html.match(/</g) !== null) {
                        node = $(html)[0];
                    }
                    this.selection.get();
                    if (deleteContents !== false) {
                        this.range.deleteContents();
                    }
                    this.range.insertNode(node);
                    this.range.collapse(false);
                    this.selection.addRange();
                    return node;
                },
                nodeToPoint: function(node, x, y) {
                    node = node[0] || node;
                    this.selection.get();
                    var range;
                    if (document.caretPositionFromPoint) {
                        var pos = document.caretPositionFromPoint(x, y);
                        this.range.setStart(pos.offsetNode, pos.offset);
                        this.range.collapse(true);
                        this.range.insertNode(node);
                    } else if (document.caretRangeFromPoint) {
                        range = document.caretRangeFromPoint(x, y);
                        range.insertNode(node);
                    } else if (typeof document.body.createTextRange != "undefined") {
                        range = document.body.createTextRange();
                        range.moveToPoint(x, y);
                        var endRange = range.duplicate();
                        endRange.moveToPoint(x, y);
                        range.setEndPoint("EndToEnd", endRange);
                        range.select();
                    }
                },
                nodeToCaretPositionFromPoint: function(e, node) {
                    node = node[0] || node;
                    var range;
                    var x = e.clientX,
                        y = e.clientY;
                    if (document.caretPositionFromPoint) {
                        var pos = document.caretPositionFromPoint(x, y);
                        var sel = document.getSelection();
                        range = sel.getRangeAt(0);
                        range.setStart(pos.offsetNode, pos.offset);
                        range.collapse(true);
                        range.insertNode(node);
                    } else if (document.caretRangeFromPoint) {
                        range = document.caretRangeFromPoint(x, y);
                        range.insertNode(node);
                    } else if (typeof document.body.createTextRange != "undefined") {
                        range = document.body.createTextRange();
                        range.moveToPoint(x, y);
                        var endRange = range.duplicate();
                        endRange.moveToPoint(x, y);
                        range.setEndPoint("EndToEnd", endRange);
                        range.select();
                    }
                },
                ie11FixInserting: function(parent, html) {
                    var node = document.createElement('span');
                    node.className = 'redactor-ie-paste';
                    this.insert.node(node);
                    var parHtml = $(parent).html();
                    parHtml = '<p>' + parHtml.replace(/<span class="redactor-ie-paste"><\/span>/gi, '</p>' + html + '<p>') + '</p>';
                    parHtml = parHtml.replace(/<p><\/p>/gi, '');
                    $(parent).replaceWith(parHtml);
                },
                ie11PasteFrag: function(html) {
                    this.selection.get();
                    this.range.deleteContents();
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(),
                        node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    this.range.insertNode(frag);
                    this.range.collapse(false);
                    this.selection.addRange();
                }
            };
        },
        keydown: function() {
            return {
                init: function(e) {
                    if (this.rtePaste) return;
                    var key = e.which;
                    var arrow = (key >= 37 && key <= 40);
                    this.keydown.ctrl = e.ctrlKey || e.metaKey;
                    this.keydown.current = this.selection.getCurrent();
                    this.keydown.parent = this.selection.getParent();
                    this.keydown.block = this.selection.getBlock();
                    this.keydown.pre = this.utils.isTag(this.keydown.current, 'pre');
                    this.keydown.blockquote = this.utils.isTag(this.keydown.current, 'blockquote');
                    this.keydown.figcaption = this.utils.isTag(this.keydown.current, 'figcaption');
                    this.shortcuts.init(e, key);
                    if (this.utils.isDesktop()) {
                        this.keydown.checkEvents(arrow, key);
                        this.keydown.setupBuffer(e, key);
                    }
                    this.keydown.addArrowsEvent(arrow);
                    this.keydown.setupSelectAll(e, key);
                    var keydownStop = this.core.setCallback('keydown', e);
                    if (keydownStop === false) {
                        e.preventDefault();
                        return false;
                    }
                    if (this.opts.enterKey && (this.utils.browser('msie') || this.utils.browser('mozilla')) && (key === this.keyCode.DOWN || key === this.keyCode.RIGHT)) {
                        var isEndOfTable = false;
                        var $table = false;
                        if (this.keydown.block && this.keydown.block.tagName === 'TD') {
                            $table = $(this.keydown.block).closest('table', this.$editor[0]);
                        }
                        if ($table && $table.find('td').last()[0] === this.keydown.block) {
                            isEndOfTable = true;
                        }
                        if (this.utils.isEndOfElement() && isEndOfTable) {
                            var node = $(this.opts.emptyHtml);
                            $table.after(node);
                            this.caret.setStart(node);
                        }
                    }
                    if (this.opts.enterKey && key === this.keyCode.DOWN) {
                        this.keydown.onArrowDown();
                    }
                    if (!this.opts.enterKey && key === this.keyCode.ENTER) {
                        e.preventDefault();
                        if (!this.range.collapsed) this.range.deleteContents();
                        return;
                    }
                    if (key == this.keyCode.ENTER && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
                        var stop = this.core.setCallback('enter', e);
                        if (stop === false) {
                            e.preventDefault();
                            return false;
                        }
                        if (this.keydown.blockquote && this.keydown.exitFromBlockquote(e) === true) {
                            return false;
                        }
                        var current, $next;
                        if (this.keydown.pre) {
                            return this.keydown.insertNewLine(e);
                        } else if (this.keydown.blockquote || this.keydown.figcaption) {
                            current = this.selection.getCurrent();
                            $next = $(current).next();
                            if ($next.length !== 0 && $next[0].tagName == 'BR') {
                                return this.keydown.insertBreakLine(e);
                            } else if (this.utils.isEndOfElement() && (current && current != 'SPAN')) {
                                return this.keydown.insertDblBreakLine(e);
                            } else {
                                return this.keydown.insertBreakLine(e);
                            }
                        } else if (this.opts.linebreaks && !this.keydown.block) {
                            current = this.selection.getCurrent();
                            $next = $(this.keydown.current).next();
                            if ($next.length !== 0 && $next[0].tagName == 'BR') {
                                return this.keydown.insertBreakLine(e);
                            } else if (current !== false && $(current).hasClass('redactor-invisible-space')) {
                                this.caret.setAfter(current);
                                $(current).contents().unwrap();
                                return this.keydown.insertDblBreakLine(e);
                            } else {
                                if (this.utils.isEndOfEditor()) {
                                    return this.keydown.insertDblBreakLine(e);
                                } else if ($next.length === 0 && current === false && typeof $next.context != 'undefined') {
                                    return this.keydown.insertBreakLine(e);
                                }
                                return this.keydown.insertBreakLine(e);
                            }
                        } else if (this.opts.linebreaks && this.keydown.block) {
                            setTimeout($.proxy(this.keydown.replaceDivToBreakLine, this), 1);
                        } else if (!this.opts.linebreaks && this.keydown.block) {
                            setTimeout($.proxy(this.keydown.replaceDivToParagraph, this), 1);
                            if (this.keydown.block.tagName === 'LI') {
                                current = this.selection.getCurrent();
                                var $parent = $(current).closest('li', this.$editor[0]);
                                var $list = $parent.closest('ul,ol', this.$editor[0]);
                                if ($parent.length !== 0 && this.utils.isEmpty($parent.html()) && $list.next().length === 0 && this.utils.isEmpty($list.find("li").last().html())) {
                                    $list.find("li").last().remove();
                                    var node = $(this.opts.emptyHtml);
                                    $list.after(node);
                                    this.caret.setStart(node);
                                    return false;
                                }
                            }
                        } else if (!this.opts.linebreaks && !this.keydown.block) {
                            return this.keydown.insertParagraph(e);
                        }
                    }
                    if (key === this.keyCode.ENTER && (e.ctrlKey || e.shiftKey)) {
                        return this.keydown.onShiftEnter(e);
                    }
                    if (key === this.keyCode.TAB || e.metaKey && key === 221 || e.metaKey && key === 219) {
                        return this.keydown.onTab(e, key);
                    }
                    if (key === this.keyCode.BACKSPACE || key === this.keyCode.DELETE) {
                        var nodes = this.selection.getNodes();
                        if (nodes) {
                            var len = nodes.length;
                            var last;
                            for (var i = 0; i < len; i++) {
                                var children = $(nodes[i]).children('img');
                                if (children.length !== 0) {
                                    var self = this;
                                    $.each(children, function(z, s) {
                                        var $s = $(s);
                                        if ($s.css('float') != 'none') return;
                                        self.core.setCallback('imageDelete', s.src, $s);
                                        last = s;
                                    });
                                } else if (nodes[i].tagName == 'IMG') {
                                    if (last != nodes[i]) {
                                        this.core.setCallback('imageDelete', nodes[i].src, $(nodes[i]));
                                        last = nodes[i];
                                    }
                                }
                            }
                        }
                    }
                    if (key === this.keyCode.BACKSPACE) {
                        var block = this.selection.getBlock();
                        var indented = ($(block).css('margin-left') !== '0px');
                        if (block && indented && this.range.collapsed && this.utils.isStartOfElement()) {
                            this.indent.decrease();
                            e.preventDefault();
                            return;
                        }
                        if (this.utils.browser('mozilla')) {
                            var prev = this.selection.getPrev();
                            var prev2 = $(prev).prev()[0];
                            if (prev && prev.tagName === 'HR') $(prev).remove();
                            if (prev2 && prev2.tagName === 'HR') $(prev2).remove();
                        }
                        this.keydown.removeInvisibleSpace();
                        this.keydown.removeEmptyListInTable(e);
                    }
                    this.code.sync();
                },
                checkEvents: function(arrow, key) {
                    if (!arrow && (this.core.getEvent() == 'click' || this.core.getEvent() == 'arrow')) {
                        this.core.addEvent(false);
                        if (this.keydown.checkKeyEvents(key)) {
                            this.buffer.set();
                        }
                    }
                },
                checkKeyEvents: function(key) {
                    var k = this.keyCode;
                    var keys = [k.BACKSPACE, k.DELETE, k.ENTER, k.ESC, k.TAB, k.CTRL, k.META, k.ALT, k.SHIFT];
                    return ($.inArray(key, keys) == -1) ? true : false;
                },
                addArrowsEvent: function(arrow) {
                    if (!arrow) return;
                    if ((this.core.getEvent() == 'click' || this.core.getEvent() == 'arrow')) {
                        this.core.addEvent(false);
                        return;
                    }
                    this.core.addEvent('arrow');
                },
                setupBuffer: function(e, key) {
                    if (this.keydown.ctrl && key === 90 && !e.shiftKey && !e.altKey && this.opts.buffer.length) {
                        e.preventDefault();
                        this.buffer.undo();
                        return;
                    } else if (this.keydown.ctrl && key === 90 && e.shiftKey && !e.altKey && this.opts.rebuffer.length !== 0) {
                        e.preventDefault();
                        this.buffer.redo();
                        return;
                    } else if (!this.keydown.ctrl) {
                        if (key == this.keyCode.BACKSPACE || key == this.keyCode.DELETE || (key == this.keyCode.ENTER && !e.ctrlKey && !e.shiftKey)) {
                            this.buffer.set();
                        }
                    }
                },
                setupSelectAll: function(e, key) {
                    if (this.keydown.ctrl && key === 65) {
                        this.utils.enableSelectAll();
                    } else if (key != this.keyCode.LEFT_WIN && !this.keydown.ctrl) {
                        this.utils.disableSelectAll();
                    }
                },
                onArrowDown: function() {
                    var tags = [this.keydown.blockquote, this.keydown.pre, this.keydown.figcaption];
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i]) {
                            this.keydown.insertAfterLastElement(tags[i]);
                            return false;
                        }
                    }
                },
                onShiftEnter: function(e) {
                    this.buffer.set();
                    if (this.utils.isEndOfElement()) {
                        return this.keydown.insertDblBreakLine(e);
                    }
                    return this.keydown.insertBreakLine(e);
                },
                onTab: function(e, key) {
                    if (!this.opts.tabKey) return true;
                    if (this.utils.isEmpty(this.code.get()) && this.opts.tabAsSpaces === false) return true;
                    e.preventDefault();
                    var node;
                    if (this.keydown.pre && !e.shiftKey) {
                        node = (this.opts.preSpaces) ? document.createTextNode(Array(this.opts.preSpaces + 1).join('\u00a0')) : document.createTextNode('\t');
                        this.insert.node(node);
                        this.code.sync();
                    } else if (this.opts.tabAsSpaces !== false) {
                        node = document.createTextNode(Array(this.opts.tabAsSpaces + 1).join('\u00a0'));
                        this.insert.node(node);
                        this.code.sync();
                    } else {
                        if (e.metaKey && key === 219) this.indent.decrease();
                        else if (e.metaKey && key === 221) this.indent.increase();
                        else if (!e.shiftKey) this.indent.increase();
                        else this.indent.decrease();
                    }
                    return false;
                },
                replaceDivToBreakLine: function() {
                    var blockElem = this.selection.getBlock();
                    var blockHtml = blockElem.innerHTML.replace(/<br\s?\/?>/gi, '');
                    if ((blockElem.tagName === 'DIV' || blockElem.tagName === 'P') && blockHtml === '' && !$(blockElem).hasClass('redactor-editor')) {
                        var br = document.createElement('br');
                        $(blockElem).replaceWith(br);
                        this.caret.setBefore(br);
                        this.code.sync();
                        return false;
                    }
                },
                replaceDivToParagraph: function() {
                    var blockElem = this.selection.getBlock();
                    var blockHtml = blockElem.innerHTML.replace(/<br\s?\/?>/gi, '');
                    if (blockElem.tagName === 'DIV' && this.utils.isEmpty(blockHtml) && !$(blockElem).hasClass('redactor-editor')) {
                        var p = document.createElement('p');
                        p.innerHTML = this.opts.invisibleSpace;
                        $(blockElem).replaceWith(p);
                        this.caret.setStart(p);
                        this.code.sync();
                        return false;
                    } else if (this.opts.cleanStyleOnEnter && blockElem.tagName == 'P') {
                        $(blockElem).removeAttr('class').removeAttr('style');
                    }
                },
                insertParagraph: function(e) {
                    e.preventDefault();
                    this.selection.get();
                    var p = document.createElement('p');
                    p.innerHTML = this.opts.invisibleSpace;
                    this.range.deleteContents();
                    this.range.insertNode(p);
                    this.caret.setStart(p);
                    this.code.sync();
                    return false;
                },
                exitFromBlockquote: function(e) {
                    if (!this.utils.isEndOfElement()) return;
                    var tmp = $.trim($(this.keydown.block).html());
                    if (tmp.search(/(<br\s?\/?>){2}$/i) != -1) {
                        e.preventDefault();
                        if (this.opts.linebreaks) {
                            var br = document.createElement('br');
                            $(this.keydown.blockquote).after(br);
                            this.caret.setBefore(br);
                            $(this.keydown.block).html(tmp.replace(/<br\s?\/?>$/i, ''));
                        } else {
                            var node = $(this.opts.emptyHtml);
                            $(this.keydown.blockquote).after(node);
                            this.caret.setStart(node);
                        }
                        return true;
                    }
                    return;
                },
                insertAfterLastElement: function(element) {
                    if (!this.utils.isEndOfElement()) return;
                    this.buffer.set();
                    if (this.opts.linebreaks) {
                        var contents = $('<div>').append($.trim(this.$editor.html())).contents();
                        var last = contents.last()[0];
                        if (last.tagName == 'SPAN' && last.innerHTML === '') {
                            last = contents.prev()[0];
                        }
                        if (this.utils.getOuterHtml(last) != this.utils.getOuterHtml(element)) return;
                        var br = document.createElement('br');
                        $(element).after(br);
                        this.caret.setAfter(br);
                    } else {
                        if (this.$editor.contents().last()[0] !== element) return;
                        var node = $(this.opts.emptyHtml);
                        $(element).after(node);
                        this.caret.setStart(node);
                    }
                },
                insertNewLine: function(e) {
                    e.preventDefault();
                    var node = document.createTextNode('\n');
                    this.selection.get();
                    this.range.deleteContents();
                    this.range.insertNode(node);
                    this.caret.setAfter(node);
                    this.code.sync();
                    return false;
                },
                insertBreakLine: function(e) {
                    return this.keydown.insertBreakLineProcessing(e);
                },
                insertDblBreakLine: function(e) {
                    return this.keydown.insertBreakLineProcessing(e, true);
                },
                insertBreakLineProcessing: function(e, dbl) {
                    e.stopPropagation();
                    this.selection.get();
                    var br1 = document.createElement('br');
                    if (this.utils.browser('msie')) {
                        this.range.collapse(false);
                        this.range.setEnd(this.range.endContainer, this.range.endOffset);
                    } else {
                        this.range.deleteContents();
                    }
                    this.range.insertNode(br1);
                    var $parentA = $(br1).parent("a");
                    if ($parentA.length > 0) {
                        $parentA.find(br1).remove();
                        $parentA.after(br1);
                    }
                    if (dbl === true) {
                        var $next = $(br1).next();
                        if ($next.length !== 0 && $next[0].tagName === 'BR' && this.utils.isEndOfEditor()) {
                            this.caret.setAfter(br1);
                            this.code.sync();
                            return false;
                        }
                        var br2 = document.createElement('br');
                        this.range.insertNode(br2);
                        this.caret.setAfter(br2);
                    } else {
                        if (this.utils.browser('msie')) {
                            var space = document.createElement('span');
                            space.innerHTML = '&#x200b;';
                            $(br1).after(space);
                            this.caret.setAfter(space);
                            $(space).remove();
                        } else {
                            var range = document.createRange();
                            range.setStartAfter(br1);
                            range.collapse(true);
                            var selection = window.getSelection();
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    }
                    this.code.sync();
                    return false;
                },
                removeInvisibleSpace: function() {
                    var $current = $(this.keydown.current);
                    if ($current.text().search(/^\u200B$/g) === 0) {
                        $current.remove();
                    }
                },
                removeEmptyListInTable: function(e) {
                    var $current = $(this.keydown.current);
                    var $parent = $(this.keydown.parent);
                    var td = $current.closest('td', this.$editor[0]);
                    if (td.length !== 0 && $current.closest('li', this.$editor[0]) && $parent.children('li').length === 1) {
                        if (!this.utils.isEmpty($current.text())) return;
                        e.preventDefault();
                        $current.remove();
                        $parent.remove();
                        this.caret.setStart(td);
                    }
                }
            };
        },
        keyup: function() {
            return {
                init: function(e) {
                    if (this.rtePaste) return;
                    var key = e.which;
                    this.keyup.current = this.selection.getCurrent();
                    this.keyup.parent = this.selection.getParent();
                    var $parent = this.utils.isRedactorParent($(this.keyup.parent).parent());
                    var keyupStop = this.core.setCallback('keyup', e);
                    if (keyupStop === false) {
                        e.preventDefault();
                        return false;
                    }
                    if (!this.opts.linebreaks && this.keyup.current.nodeType === 3 && this.keyup.current.length <= 1 && (this.keyup.parent === false || this.keyup.parent.tagName == 'BODY')) {
                        this.keyup.replaceToParagraph();
                    }
                    if (!this.opts.linebreaks && this.utils.isRedactorParent(this.keyup.current) && this.keyup.current.tagName === 'DIV') {
                        this.keyup.replaceToParagraph(false);
                    }
                    if (!this.opts.linebreaks && $(this.keyup.parent).hasClass('redactor-invisible-space') && ($parent === false || $parent[0].tagName == 'BODY')) {
                        $(this.keyup.parent).contents().unwrap();
                        this.keyup.replaceToParagraph();
                    }
                    if (this.linkify.isEnabled() && this.linkify.isKey(key)) this.linkify.format();
                    if (key === this.keyCode.DELETE || key === this.keyCode.BACKSPACE) {
                        if (this.utils.browser('mozilla')) {
                            var td = $(this.keydown.current).closest('td', this.$editor[0]);
                            if (td.size() !== 0 && td.text() !== '') {
                                e.preventDefault();
                                return false;
                            }
                        }
                        this.clean.clearUnverified();
                        if (this.observe.image) {
                            e.preventDefault();
                            this.image.hideResize();
                            this.buffer.set();
                            this.image.remove(this.observe.image);
                            this.observe.image = false;
                            return false;
                        }
                        this.$editor.find('p').each($.proxy(function(i, s) {
                            this.utils.removeEmpty(i, $(s).html());
                        }, this));
                        if (this.opts.linebreaks && this.keyup.current && this.keyup.current.tagName == 'DIV' && this.utils.isEmpty(this.keyup.current.innerHTML)) {
                            $(this.keyup.current).after(this.selection.getMarkerAsHtml());
                            this.selection.restore();
                            $(this.keyup.current).remove();
                        }
                        return this.keyup.formatEmpty(e);
                    }
                },
                replaceToParagraph: function(clone) {
                    var $current = $(this.keyup.current);
                    var node;
                    if (clone === false) {
                        node = $('<p>').append($current.html());
                    } else {
                        node = $('<p>').append($current.clone());
                    }
                    $current.replaceWith(node);
                    var next = $(node).next();
                    if (typeof(next[0]) !== 'undefined' && next[0].tagName == 'BR') {
                        next.remove();
                    }
                    this.caret.setEnd(node);
                },
                formatEmpty: function(e) {
                    var html = $.trim(this.$editor.html());
                    if (!this.utils.isEmpty(html)) return;
                    e.preventDefault();
                    if (this.opts.linebreaks) {
                        this.$editor.html(this.selection.getMarkerAsHtml());
                        this.selection.restore();
                    } else {
                        this.$editor.html(this.opts.emptyHtml);
                        this.focus.setStart();
                    }
                    this.code.sync();
                    return false;
                }
            };
        },
        lang: function() {
            return {
                load: function() {
                    this.opts.curLang = this.opts.langs[this.opts.lang];
                },
                get: function(name) {
                    return (typeof this.opts.curLang[name] != 'undefined') ? this.opts.curLang[name] : '';
                }
            };
        },
        line: function() {
            return {
                insert: function() {
                    this.buffer.set();
                    var blocks = this.selection.getBlocks();
                    if (blocks[0] !== false && this.line.isExceptLastOrFirst(blocks)) {
                        if (!this.utils.browser('msie')) this.$editor.focus();
                        return;
                    }
                    if (this.utils.browser('msie')) {
                        this.line.insertInIe();
                    } else {
                        this.line.insertInOthersBrowsers();
                    }
                },
                isExceptLastOrFirst: function(blocks) {
                    var exceptTags = ['li', 'td', 'th', 'blockquote', 'figcaption', 'pre', 'dl', 'dt', 'dd'];
                    var first = blocks[0].tagName.toLowerCase();
                    var last = this.selection.getLastBlock();
                    last = (typeof last == 'undefined') ? first : last.tagName.toLowerCase();
                    var firstFound = $.inArray(first, exceptTags) != -1;
                    var lastFound = $.inArray(last, exceptTags) != -1;
                    if ((firstFound && lastFound) || firstFound) {
                        return true;
                    }
                },
                insertInIe: function() {
                    this.utils.saveScroll();
                    this.buffer.set();
                    this.insert.node(document.createElement('hr'));
                    this.utils.restoreScroll();
                    this.code.sync();
                },
                insertInOthersBrowsers: function() {
                    this.buffer.set();
                    var extra = '<p id="redactor-insert-line"><br /></p>';
                    if (this.opts.linebreaks) extra = '<br id="redactor-insert-line">';
                    document.execCommand('insertHtml', false, '<hr>' + extra);
                    this.line.setFocus();
                    this.code.sync();
                },
                setFocus: function() {
                    var node = this.$editor.find('#redactor-insert-line');
                    var next = $(node).next()[0];
                    var target = next;
                    if (this.utils.browser('mozilla') && next && next.innerHTML === '') {
                        target = $(next).next()[0];
                        $(next).remove();
                    }
                    if (target) {
                        node.remove();
                        if (!this.opts.linebreaks) {
                            this.$editor.focus();
                            this.line.setStart(target);
                        }
                    } else {
                        node.removeAttr('id');
                        this.line.setStart(node[0]);
                    }
                },
                setStart: function(node) {
                    if (typeof node === 'undefined') return;
                    var textNode = document.createTextNode('\u200B');
                    this.selection.get();
                    this.range.setStart(node, 0);
                    this.range.insertNode(textNode);
                    this.range.collapse(true);
                    this.selection.addRange();
                }
            };
        },
        link: function() {
            return {
                show: function(e) {
                    if (typeof e != 'undefined' && e.preventDefault) e.preventDefault();
                    if (!this.observe.isCurrent('a')) {
                        this.modal.load('link', this.lang.get('link_insert'), 600);
                    } else {
                        this.modal.load('link', this.lang.get('link_edit'), 600);
                    }
                    this.modal.createCancelButton();
                    var buttonText = !this.observe.isCurrent('a') ? this.lang.get('insert') : this.lang.get('edit');
                    this.link.buttonInsert = this.modal.createActionButton(buttonText);
                    this.selection.get();
                    this.link.getData();
                    this.link.cleanUrl();
                    if (this.link.target == '_blank') $('#redactor-link-blank').prop('checked', true);
                    this.link.$inputUrl = $('#redactor-link-url');
                    this.link.$inputText = $('#redactor-link-url-text');
                    this.link.$inputText.val(this.link.text);
                    this.link.$inputUrl.val(this.link.url);
                    this.link.buttonInsert.on('click', $.proxy(this.link.insert, this));
                    $('.redactor-link-tooltip').remove();
                    this.selection.save();
                    this.modal.show();
                    this.link.$inputUrl.focus();
                },
                cleanUrl: function() {
                    var thref = self.location.href.replace(/\/$/i, '');
                    if (typeof this.link.url !== "undefined") {
                        this.link.url = this.link.url.replace(thref, '');
                        this.link.url = this.link.url.replace(/^\/#/, '#');
                        this.link.url = this.link.url.replace('mailto:', '');
                        if (!this.opts.linkProtocol) {
                            var re = new RegExp('^(http|ftp|https)://' + self.location.host, 'i');
                            this.link.url = this.link.url.replace(re, '');
                        }
                    }
                },
                getData: function() {
                    this.link.$node = false;
                    var $el = $(this.selection.getCurrent()).closest('a', this.$editor[0]);
                    if ($el.length !== 0 && $el[0].tagName === 'A') {
                        this.link.$node = $el;
                        this.link.url = $el.attr('href');
                        this.link.text = $el.text();
                        this.link.target = $el.attr('target');
                    } else {
                        this.link.text = this.sel.toString();
                        this.link.url = '';
                        this.link.target = '';
                    }
                },
                insert: function() {
                    this.placeholder.remove();
                    var target = '';
                    var link = this.link.$inputUrl.val();
                    var text = this.link.$inputText.val().replace(/(<([^>]+)>)/ig, "");
                    if ($.trim(link) === '') {
                        this.link.$inputUrl.addClass('redactor-input-error').on('keyup', function() {
                            $(this).removeClass('redactor-input-error');
                            $(this).off('keyup');
                        });
                        return;
                    }
                    if (link.search('@') != -1 && /(http|ftp|https):\/\//i.test(link) === false) {
                        link = 'mailto:' + link;
                    } else if (link.search('#') !== 0) {
                        if ($('#redactor-link-blank').prop('checked')) {
                            target = '_blank';
                        }
                        var pattern = '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}';
                        var re = new RegExp('^(http|ftp|https)://' + pattern, 'i');
                        var re2 = new RegExp('^' + pattern, 'i');
                        var re3 = new RegExp('\.(html|php)$', 'i');
                        if (link.search(re) == -1 && link.search(re3) == -1 && link.search(re2) === 0 && this.opts.linkProtocol) {
                            link = this.opts.linkProtocol + '://' + link;
                        }
                    }
                    this.link.set(text, link, target);
                    this.modal.close();
                },
                set: function(text, link, target) {
                    text = $.trim(text.replace(/<|>/g, ''));
                    this.selection.restore();
                    var blocks = this.selection.getBlocks();
                    if (text === '' && link === '') return;
                    if (text === '' && link !== '') text = link;
                    if (this.link.$node) {
                        this.buffer.set();
                        var $link = this.link.$node,
                            $el = $link.children();
                        if ($el.length > 0) {
                            while ($el.length) {
                                $el = $el.children();
                            }
                            $el = $el.end();
                        } else {
                            $el = $link;
                        }
                        $link.attr('href', link);
                        $el.text(text);
                        if (target !== '') {
                            $link.attr('target', target);
                        } else {
                            $link.removeAttr('target');
                        }
                        this.selection.selectElement($link);
                        this.code.sync();
                    } else {
                        if (this.utils.browser('mozilla') && this.link.text === '') {
                            var $a = $('<a />').attr('href', link).text(text);
                            if (target !== '') $a.attr('target', target);
                            $a = $(this.insert.node($a));
                            if (this.opts.linebreaks) {
                                $a.after('&nbsp;');
                            }
                            this.selection.selectElement($a);
                        } else {
                            var $a;
                            if (this.utils.browser('msie')) {
                                $a = $('<a href="' + link + '">').text(text);
                                if (target !== '') $a.attr('target', target);
                                $a = $(this.insert.node($a));
                                if (this.selection.getText().match(/\s$/)) {
                                    $a.after(" ");
                                }
                                this.selection.selectElement($a);
                            } else {
                                document.execCommand('createLink', false, link);
                                $a = $(this.selection.getCurrent()).closest('a', this.$editor[0]);
                                if (this.utils.browser('mozilla')) {
                                    $a = $('a[_moz_dirty=""]');
                                }
                                if (target !== '') $a.attr('target', target);
                                $a.removeAttr('style').removeAttr('_moz_dirty');
                                if (this.selection.getText().match(/\s$/)) {
                                    $a.after(" ");
                                }
                                if (this.link.text !== '' || this.link.text != text) {
                                    if (!this.opts.linebreaks && blocks && blocks.length <= 1) {
                                        $a.text(text);
                                    } else if (this.opts.linebreaks) {
                                        $a.text(text);
                                    }
                                    this.selection.selectElement($a);
                                }
                            }
                        }
                        this.code.sync();
                        this.core.setCallback('insertedLink', $a);
                    }
                    setTimeout($.proxy(function() {
                        this.observe.links();
                    }, this), 5);
                },
                unlink: function(e) {
                    if (typeof e != 'undefined' && e.preventDefault) {
                        e.preventDefault();
                    }
                    var nodes = this.selection.getNodes();
                    if (!nodes) return;
                    this.buffer.set();
                    var len = nodes.length;
                    var links = [];
                    for (var i = 0; i < len; i++) {
                        if (nodes[i].tagName === 'A') {
                            links.push(nodes[i]);
                        }
                        var $node = $(nodes[i]).closest('a', this.$editor[0]);
                        $node.replaceWith($node.contents());
                    }
                    this.core.setCallback('deletedLink', links);
                    $('.redactor-link-tooltip').remove();
                    this.code.sync();
                },
                toggleClass: function(className) {
                    this.link.setClass(className, 'toggleClass');
                },
                addClass: function(className) {
                    this.link.setClass(className, 'addClass');
                },
                removeClass: function(className) {
                    this.link.setClass(className, 'removeClass');
                },
                setClass: function(className, func) {
                    var links = this.selection.getInlinesTags(['a']);
                    if (links === false) return;
                    $.each(links, function() {
                        $(this)[func](className);
                    });
                }
            };
        },
        linkify: function() {
            return {
                isKey: function(key) {
                    return key == this.keyCode.ENTER || key == this.keyCode.SPACE;
                },
                isEnabled: function() {
                    return this.opts.convertLinks && (this.opts.convertUrlLinks || this.opts.convertImageLinks || this.opts.convertVideoLinks) && !this.utils.isCurrentOrParent('PRE');
                },
                format: function() {
                    var linkify = this.linkify,
                        opts = this.opts;
                    this.$editor.find(":not(iframe,img,a,pre)").addBack().contents().filter(function() {
                        return this.nodeType === 3 && $.trim(this.nodeValue) != "" && !$(this).parent().is("pre") && (this.nodeValue.match(opts.linkify.regexps.youtube) || this.nodeValue.match(opts.linkify.regexps.vimeo) || this.nodeValue.match(opts.linkify.regexps.image) || this.nodeValue.match(opts.linkify.regexps.url));
                    }).each(function() {
                        var text = $(this).text(),
                            html = text;
                        if (opts.convertVideoLinks && (html.match(opts.linkify.regexps.youtube) || html.match(opts.linkify.regexps.vimeo))) {
                            html = linkify.convertVideoLinks(html);
                        } else if (opts.convertImageLinks && html.match(opts.linkify.regexps.image)) {
                            html = linkify.convertImages(html);
                        } else if (opts.convertUrlLinks) {
                            html = linkify.convertLinks(html);
                        }
                        $(this).before(text.replace(text, html)).remove();
                    });
                    var objects = this.$editor.find('.redactor-linkify-object').each(function() {
                        var $el = $(this);
                        $el.removeClass('redactor-linkify-object');
                        if ($el.attr('class') === '') $el.removeAttr('class');
                        return $el[0];
                    });
                    setTimeout($.proxy(function() {
                        this.observe.load();
                        this.core.setCallback('linkify', objects);
                    }, this), 100);
                    this.code.sync();
                },
                convertVideoLinks: function(html) {
                    var iframeStart = '<iframe class="redactor-linkify-object" width="500" height="281" src="',
                        iframeEnd = '" frameborder="0" allowfullscreen></iframe>';
                    if (html.match(this.opts.linkify.regexps.youtube)) {
                        html = html.replace(this.opts.linkify.regexps.youtube, iframeStart + '//www.youtube.com/embed/$1' + iframeEnd);
                    }
                    if (html.match(this.opts.linkify.regexps.vimeo)) {
                        html = html.replace(this.opts.linkify.regexps.vimeo, iframeStart + '//player.vimeo.com/video/$2' + iframeEnd);
                    }
                    return html;
                },
                convertImages: function(html) {
                    var matches = html.match(this.opts.linkify.regexps.image);
                    if (matches) {
                        html = html.replace(html, '<img src="' + matches + '" class="redactor-linkify-object" />');
                        if (this.opts.linebreaks) {
                            if (!this.utils.isEmpty(this.code.get())) {
                                html = '<br>' + html;
                            }
                        }
                        html += '<br>';
                    }
                    return html;
                },
                convertLinks: function(html) {
                    var matches = html.match(this.opts.linkify.regexps.url);
                    if (matches) {
                        matches = $.grep(matches, function(v, k) {
                            return $.inArray(v, matches) === k;
                        });
                        var length = matches.length;
                        for (var i = 0; i < length; i++) {
                            var href = matches[i],
                                text = href,
                                linkProtocol = this.opts.linkProtocol + '://';
                            if (href.match(/(https?|ftp):\/\//i) !== null) {
                                linkProtocol = "";
                            }
                            if (text.length > this.opts.linkSize) {
                                text = text.substring(0, this.opts.linkSize) + '...';
                            }
                            if (text.search('%') === -1) {
                                text = decodeURIComponent(text);
                            }
                            var regexB = "\\b";
                            if ($.inArray(href.slice(-1), ["/", "&", "="]) != -1) {
                                regexB = "";
                            }
                            var regexp = new RegExp('(' + href.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + regexB + ')', 'g');
                            html = html.replace(regexp, '<a href="' + linkProtocol + $.trim(href) + '" class="redactor-linkify-object">' + $.trim(text) + '</a>');
                        }
                    }
                    return html;
                }
            };
        },
        list: function() {
            return {
                toggle: function(cmd) {
                    this.placeholder.remove();
                    if (!this.utils.browser('msie')) this.$editor.focus();
                    this.buffer.set();
                    this.selection.save();
                    var parent = this.selection.getParent();
                    var $list = $(parent).closest('ol, ul', this.$editor[0]);
                    if (!this.utils.isRedactorParent($list) && $list.length !== 0) {
                        $list = false;
                    }
                    var isUnorderedCmdOrdered, isOrderedCmdUnordered;
                    var remove = false;
                    if ($list && $list.length) {
                        remove = true;
                        var listTag = $list[0].tagName;
                        isUnorderedCmdOrdered = (cmd === 'orderedlist' && listTag === 'UL');
                        isOrderedCmdUnordered = (cmd === 'unorderedlist' && listTag === 'OL');
                    }
                    if (isUnorderedCmdOrdered) {
                        this.utils.replaceToTag($list, 'ol');
                    } else if (isOrderedCmdUnordered) {
                        this.utils.replaceToTag($list, 'ul');
                    } else {
                        if (remove) {
                            this.list.remove(cmd, $list);
                        } else {
                            this.list.insert(cmd);
                        }
                    }
                    this.selection.restore();
                    this.code.sync();
                },
                insert: function(cmd) {
                    var current = this.selection.getCurrent();
                    var $td = $(current).closest('td, th', this.$editor[0]);
                    if (this.utils.browser('msie') && this.opts.linebreaks) {
                        this.list.insertInIe(cmd);
                    } else {
                        document.execCommand('insert' + cmd);
                    }
                    var parent = this.selection.getParent();
                    var $list = $(parent).closest('ol, ul', this.$editor[0]);
                    if ($td.length !== 0) {
                        var newTd = $td.clone();
                        $td.after(newTd).remove('');
                    }
                    if (this.utils.isEmpty($list.find('li').text())) {
                        var $children = $list.children('li');
                        $children.find('br').remove();
                        $children.append(this.selection.getMarkerAsHtml());
                        if (this.opts.linebreaks && this.utils.browser('mozilla') && $children.size() == 2 && this.utils.isEmpty($children.eq(1).text())) {
                            $children.eq(1).remove();
                        }
                    }
                    if ($list.length) {
                        var $listParent = $list.parent();
                        if (this.utils.isRedactorParent($listParent) && $listParent[0].tagName != 'LI' && this.utils.isBlock($listParent[0])) {
                            $listParent.replaceWith($listParent.contents());
                        }
                    }
                    if (!this.utils.browser('msie')) {
                        this.$editor.focus();
                    }
                    this.clean.clearUnverified();
                },
                insertInIe: function(cmd) {
                    var wrapper = this.selection.wrap('div');
                    var wrapperHtml = $(wrapper).html();
                    var tmpList = (cmd == 'orderedlist') ? $('<ol>') : $('<ul>');
                    var tmpLi = $('<li>');
                    if ($.trim(wrapperHtml) === '') {
                        tmpLi.append(this.selection.getMarkerAsHtml());
                        tmpList.append(tmpLi);
                        this.$editor.find('#selection-marker-1').replaceWith(tmpList);
                    } else {
                        var items = wrapperHtml.split(/<br\s?\/?>/gi);
                        if (items) {
                            for (var i = 0; i < items.length; i++) {
                                if ($.trim(items[i]) !== '') {
                                    tmpList.append($('<li>').html(items[i]));
                                }
                            }
                        } else {
                            tmpLi.append(wrapperHtml);
                            tmpList.append(tmpLi);
                        }
                        $(wrapper).replaceWith(tmpList);
                    }
                },
                remove: function(cmd, $list) {
                    if ($.inArray('ul', this.selection.getBlocks())) cmd = 'unorderedlist';
                    document.execCommand('insert' + cmd);
                    var $current = $(this.selection.getCurrent());
                    this.indent.fixEmptyIndent();
                    if (!this.opts.linebreaks && $current.closest('li, th, td', this.$editor[0]).length === 0) {
                        document.execCommand('formatblock', false, 'p');
                        this.$editor.find('ul, ol, blockquote').each($.proxy(this.utils.removeEmpty, this));
                    }
                    var $table = $(this.selection.getCurrent()).closest('table', this.$editor[0]);
                    var $prev = $table.prev();
                    if (!this.opts.linebreaks && $table.length !== 0 && $prev.length !== 0 && $prev[0].tagName == 'BR') {
                        $prev.remove();
                    }
                    this.clean.clearUnverified();
                }
            };
        },
        modal: function() {
            return {
                callbacks: {},
                loadTemplates: function() {
                    this.opts.modal = {
                        imageEdit: String() + '<section id="redactor-modal-image-edit">' + '<label>' + this.lang.get('title') + '</label>' + '<input type="text" id="redactor-image-title" />' + '<label class="redactor-image-link-option">' + this.lang.get('link') + '</label>' + '<input type="text" id="redactor-image-link" class="redactor-image-link-option" aria-label="' + this.lang.get('link') + '" />' + '<label class="redactor-image-link-option"><input type="checkbox" id="redactor-image-link-blank" aria-label="' + this.lang.get('link_new_tab') + '"> ' + this.lang.get('link_new_tab') + '</label>' + '<label class="redactor-image-position-option">' + this.lang.get('image_position') + '</label>' + '<select class="redactor-image-position-option" id="redactor-image-align" aria-label="' + this.lang.get('image_position') + '">' + '<option value="none">' + this.lang.get('none') + '</option>' + '<option value="left">' + this.lang.get('left') + '</option>' + '<option value="center">' + this.lang.get('center') + '</option>' + '<option value="right">' + this.lang.get('right') + '</option>' + '</select>' + '<label><input type="checkbox" id="redactor_link_blank"> ' + this.opts.curLang.link_new_tab + '</label>' + '<label>' + RLANG.image_width + '</label>' + '<input id="redactor_img_width" class="redactor_input" />' + '<label>' + RLANG.image_height + '</label>' + '<input id="redactor_img_height" class="redactor_input" />' + '<label><input type="checkbox" id="redactor_keep_aspect_ratio" checked="true"> ' + RLANG.keep_aspect_ratio + '</label>' + '</section>',
                        image: String() + '<section id="redactor-modal-image-insert">' + '<div id="redactor-modal-image-droparea"></div>' + '</section>',
                        file: String() + '<section id="redactor-modal-file-insert">' + '<div id="redactor-modal-file-upload-box">' + '<label>' + this.lang.get('filename') + '</label>' + '<input type="text" id="redactor-filename" aria-label="' + this.lang.get('filename') + '" /><br><br>' + '<div id="redactor-modal-file-upload"></div>' + '</div>' + '</section>',
                        link: String() + '<section id="redactor-modal-link-insert">' + '<label>URL</label>' + '<input type="url" id="redactor-link-url" aria-label="URL" />' + '<label>' + this.lang.get('text') + '</label>' + '<input type="text" id="redactor-link-url-text" aria-label="' + this.lang.get('text') + '" />' + '<label><input type="checkbox" id="redactor-link-blank"> ' + this.lang.get('link_new_tab') + '</label>' + '</section>'
                    };
                    $.extend(this.opts, this.opts.modal);
                },
                addCallback: function(name, callback) {
                    this.modal.callbacks[name] = callback;
                },
                createTabber: function($modal) {
                    this.modal.$tabber = $('<div>').attr('id', 'redactor-modal-tabber');
                    $modal.prepend(this.modal.$tabber);
                },
                addTab: function(id, name, active) {
                    var $tab = $('<a href="#" rel="tab' + id + '">').text(name);
                    if (active) {
                        $tab.addClass('active');
                    }
                    var self = this;
                    $tab.on('click', function(e) {
                        e.preventDefault();
                        $('.redactor-tab').hide();
                        $('.redactor-' + $(this).attr('rel')).show();
                        self.modal.$tabber.find('a').removeClass('active');
                        $(this).addClass('active');
                    });
                    this.modal.$tabber.append($tab);
                },
                addTemplate: function(name, template) {
                    this.opts.modal[name] = template;
                },
                getTemplate: function(name) {
                    return this.opts.modal[name];
                },
                getModal: function() {
                    return this.$modalBody.find('section');
                },
                load: function(templateName, title, width) {
                    this.modal.templateName = templateName;
                    this.modal.width = width;
                    this.modal.build();
                    this.modal.enableEvents();
                    this.modal.setTitle(title);
                    this.modal.setDraggable();
                    this.modal.setContent();
                    if (typeof this.modal.callbacks[templateName] != 'undefined') {
                        this.modal.callbacks[templateName].call(this);
                    }
                },
                show: function() {
                    this.utils.disableBodyScroll();
                    if (this.utils.isMobile()) {
                        this.modal.showOnMobile();
                    } else {
                        this.modal.showOnDesktop();
                    }
                    if (this.opts.highContrast) {
                        this.$modalBox.addClass("redactor-modal-contrast");
                    }
                    this.$modalOverlay.show();
                    this.$modalBox.show();
                    this.$modal.attr('tabindex', '-1');
                    this.$modal.focus();
                    this.modal.setButtonsWidth();
                    this.utils.saveScroll();
                    if (!this.utils.isMobile()) {
                        setTimeout($.proxy(this.modal.showOnDesktop, this), 0);
                        $(window).on('resize.redactor-modal', $.proxy(this.modal.resize, this));
                    }
                    this.core.setCallback('modalOpened', this.modal.templateName, this.$modal);
                    $(document).off('focusin.modal');
                    this.$modal.find('input[type=text],input[type=url],input[type=email]').on('keydown.redactor-modal', $.proxy(this.modal.setEnter, this));
                },
                showOnDesktop: function() {
                    var height = this.$modal.outerHeight();
                    var windowHeight = $(window).height();
                    var windowWidth = $(window).width();
                    if (this.modal.width > windowWidth) {
                        this.$modal.css({
                            width: '96%',
                            marginTop: (windowHeight / 2 - height / 2) + 'px'
                        });
                        return;
                    }
                    if (height > windowHeight) {
                        this.$modal.css({
                            width: this.modal.width + 'px',
                            marginTop: '20px'
                        });
                    } else {
                        this.$modal.css({
                            width: this.modal.width + 'px',
                            marginTop: (windowHeight / 2 - height / 2) + 'px'
                        });
                    }
                },
                showOnMobile: function() {
                    this.$modal.css({
                        width: '96%',
                        marginTop: '2%'
                    });
                },
                resize: function() {
                    if (this.utils.isMobile()) {
                        this.modal.showOnMobile();
                    } else {
                        this.modal.showOnDesktop();
                    }
                },
                setTitle: function(title) {
                    this.$modalHeader.html(title);
                },
                setContent: function() {
                    this.$modalBody.html(this.modal.getTemplate(this.modal.templateName));
                },
                setDraggable: function() {
                    if (typeof $.fn.draggable === 'undefined') return;
                    this.$modal.draggable({
                        handle: this.$modalHeader
                    });
                    this.$modalHeader.css('cursor', 'move');
                },
                setEnter: function(e) {
                    if (e.which != 13) return;
                    e.preventDefault();
                    this.$modal.find('button.redactor-modal-action-btn').click();
                },
                createCancelButton: function() {
                    var button = $('<button>').addClass('redactor-modal-btn redactor-modal-close-btn').html(this.lang.get('cancel'));
                    button.on('click', $.proxy(this.modal.close, this));
                    this.$modalFooter.append(button);
                },
                createDeleteButton: function(label) {
                    return this.modal.createButton(label, 'delete');
                },
                createActionButton: function(label) {
                    return this.modal.createButton(label, 'action');
                },
                createButton: function(label, className) {
                    var button = $('<button>').addClass('redactor-modal-btn').addClass('redactor-modal-' + className + '-btn').html(label);
                    this.$modalFooter.append(button);
                    return button;
                },
                setButtonsWidth: function() {
                    var buttons = this.$modalFooter.find('button');
                    var buttonsSize = buttons.length;
                    if (buttonsSize === 0) return;
                    buttons.css('width', (100 / buttonsSize) + '%');
                },
                build: function() {
                    this.modal.buildOverlay();
                    this.$modalBox = $('<div id="redactor-modal-box"/>').hide();
                    this.$modal = $('<div id="redactor-modal" role="dialog" aria-labelledby="redactor-modal-header" />');
                    this.$modalHeader = $('<header id="redactor-modal-header"/>');
                    this.$modalClose = $('<button type="button" id="redactor-modal-close" tabindex="1" aria-label="Close" />').html('&times;');
                    this.$modalBody = $('<div id="redactor-modal-body" />');
                    this.$modalFooter = $('<footer />');
                    this.$modal.append(this.$modalHeader);
                    this.$modal.append(this.$modalClose);
                    this.$modal.append(this.$modalBody);
                    this.$modal.append(this.$modalFooter);
                    this.$modalBox.append(this.$modal);
                    this.$modalBox.appendTo(document.body);
                },
                buildOverlay: function() {
                    this.$modalOverlay = $('<div id="redactor-modal-overlay">').hide();
                    $('body').prepend(this.$modalOverlay);
                },
                enableEvents: function() {
                    this.$modalClose.on('click.redactor-modal', $.proxy(this.modal.close, this));
                    $(document).on('keyup.redactor-modal', $.proxy(this.modal.closeHandler, this));
                    this.$editor.on('keyup.redactor-modal', $.proxy(this.modal.closeHandler, this));
                    this.$modalBox.on('click.redactor-modal', $.proxy(this.modal.close, this));
                },
                disableEvents: function() {
                    this.$modalClose.off('click.redactor-modal');
                    $(document).off('keyup.redactor-modal');
                    this.$editor.off('keyup.redactor-modal');
                    this.$modalBox.off('click.redactor-modal');
                    $(window).off('resize.redactor-modal');
                },
                closeHandler: function(e) {
                    if (e.which != this.keyCode.ESC) return;
                    this.modal.close(false);
                },
                close: function(e) {
                    if (e) {
                        if (!$(e.target).hasClass('redactor-modal-close-btn') && e.target != this.$modalClose[0] && e.target != this.$modalBox[0]) {
                            return;
                        }
                        e.preventDefault();
                    }
                    if (!this.$modalBox) return;
                    this.modal.disableEvents();
                    this.utils.enableBodyScroll();
                    this.$modalOverlay.remove();
                    this.$modalBox.fadeOut('fast', $.proxy(function() {
                        this.$modalBox.remove();
                        setTimeout($.proxy(this.utils.restoreScroll, this), 0);
                        if (e !== undefined) this.selection.restore();
                        $(document.body).css('overflow', this.modal.bodyOveflow);
                        this.core.setCallback('modalClosed', this.modal.templateName);
                    }, this));
                }
            };
        },
        observe: function() {
            return {
                load: function() {
                    if (typeof this.opts.destroyed != "undefined") return;
                    if (this.utils.browser('msie')) {
                        var self = this;
                        this.$editor.find('pre, code').on('mouseover', function() {
                            self.$editor.attr('contenteditable', false);
                            $(this).attr('contenteditable', true);
                        }).on('mouseout', function() {
                            self.$editor.attr('contenteditable', true);
                            $(this).removeAttr('contenteditable');
                        });
                    }
                    this.observe.images();
                    this.observe.links();
                },
                toolbar: function(e, btnName) {
                    this.observe.buttons(e, btnName);
                    this.observe.dropdowns();
                },
                isCurrent: function($el, $current) {
                    if (typeof $current == 'undefined') {
                        var $current = $(this.selection.getCurrent());
                    }
                    return $current.is($el) || $current.parents($el).length > 0;
                },
                dropdowns: function() {
                    var $current = $(this.selection.getCurrent());
                    $.each(this.opts.observe.dropdowns, $.proxy(function(key, value) {
                        var observe = value.observe,
                            element = observe.element,
                            $item = value.item,
                            inValues = typeof observe['in'] != 'undefined' ? observe['in'] : false,
                            outValues = typeof observe['out'] != 'undefined' ? observe['out'] : false;
                        if ($current.closest(element).size() > 0) {
                            this.observe.setDropdownProperties($item, inValues, outValues);
                        } else {
                            this.observe.setDropdownProperties($item, outValues, inValues);
                        }
                    }, this));
                },
                setDropdownProperties: function($item, addProperties, deleteProperties) {
                    if (deleteProperties && typeof deleteProperties['attr'] != 'undefined') {
                        this.observe.setDropdownAttr($item, deleteProperties.attr, true);
                    }
                    if (typeof addProperties['attr'] != 'undefined') {
                        this.observe.setDropdownAttr($item, addProperties.attr);
                    }
                    if (typeof addProperties['title'] != 'undefined') {
                        $item.text(addProperties['title']);
                    }
                },
                setDropdownAttr: function($item, properties, isDelete) {
                    $.each(properties, function(key, value) {
                        if (key == 'class') {
                            if (!isDelete) {
                                $item.addClass(value);
                            } else {
                                $item.removeClass(value);
                            }
                        } else {
                            if (!isDelete) {
                                $item.attr(key, value);
                            } else {
                                $item.removeAttr(key);
                            }
                        }
                    });
                },
                addDropdown: function($item, btnName, btnObject) {
                    if (typeof btnObject.observe == "undefined") return;
                    btnObject.item = $item;
                    this.opts.observe.dropdowns.push(btnObject);
                },
                buttons: function(e, btnName) {
                    var current = this.selection.getCurrent();
                    var parent = this.selection.getParent();
                    if (e !== false) {
                        this.button.setInactiveAll();
                    } else {
                        this.button.setInactiveAll(btnName);
                    }
                    if (e === false && btnName !== 'html') {
                        if ($.inArray(btnName, this.opts.activeButtons) != -1) this.button.toggleActive(btnName);
                        return;
                    }
                    $.each(this.opts.activeButtonsStates, $.proxy(function(key, value) {
                        var parentEl = $(parent).closest(key, this.$editor[0]);
                        var currentEl = $(current).closest(key, this.$editor[0]);
                        if (parentEl.length !== 0 && !this.utils.isRedactorParent(parentEl)) return;
                        if (!this.utils.isRedactorParent(currentEl)) return;
                        if (parentEl.length !== 0 || currentEl.closest(key, this.$editor[0]).length !== 0) {
                            this.button.setActive(value);
                        }
                    }, this));
                    var $parent = $(parent).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
                    if (this.utils.isRedactorParent(parent) && $parent.length) {
                        var align = ($parent.css('text-align') === '') ? 'left' : $parent.css('text-align');
                        this.button.setActive('align' + align);
                    }
                },
                addButton: function(tag, btnName) {
                    this.opts.activeButtons.push(btnName);
                    this.opts.activeButtonsStates[tag] = btnName;
                },
                images: function() {
                    this.$editor.find('img').each($.proxy(function(i, img) {
                        var $img = $(img);
                        $img.closest('a', this.$editor[0]).on('click', function(e) {
                            e.preventDefault();
                        });
                        if (this.utils.browser('msie')) $img.attr('unselectable', 'on');
                        this.image.setEditable($img);
                    }, this));
                    $(document).on('click.redactor-image-delete.' + this.uuid, $.proxy(function(e) {
                        this.observe.image = false;
                        if (e.target.tagName == 'IMG' && this.utils.isRedactorParent(e.target)) {
                            this.observe.image = (this.observe.image && this.observe.image == e.target) ? false : e.target;
                        }
                    }, this));
                },
                links: function() {
                    if (!this.opts.linkTooltip) return;
                    this.$editor.find('a').on('touchstart.redactor.' + this.uuid + ' click.redactor.' + this.uuid, $.proxy(this.observe.showTooltip, this));
                    this.$editor.on('touchstart.redactor.' + this.uuid + ' click.redactor.' + this.uuid, $.proxy(this.observe.closeTooltip, this));
                    $(document).on('touchstart.redactor.' + this.uuid + ' click.redactor.' + this.uuid, $.proxy(this.observe.closeTooltip, this));
                },
                getTooltipPosition: function($link) {
                    return $link.offset();
                },
                showTooltip: function(e) {
                    var $el = $(e.target);
                    if ($el[0].tagName == 'IMG')
                        return;
                    if ($el[0].tagName !== 'A')
                        $el = $el.closest('a', this.$editor[0]);
                    if ($el[0].tagName !== 'A')
                        return;
                    var $link = $el;
                    var pos = this.observe.getTooltipPosition($link);
                    var tooltip = $('<span class="redactor-link-tooltip"></span>');
                    var href = $link.attr('href');
                    if (href === undefined) {
                        href = '';
                    }
                    if (href.length > 24) href = href.substring(0, 24) + '...';
                    var aLink = $('<a href="' + $link.attr('href') + '" target="_blank" />').html(href).addClass('redactor-link-tooltip-action');
                    var aEdit = $('<a href="#" />').html(this.lang.get('edit')).on('click', $.proxy(this.link.show, this)).addClass('redactor-link-tooltip-action');
                    var aUnlink = $('<a href="#" />').html(this.lang.get('unlink')).on('click', $.proxy(this.link.unlink, this)).addClass('redactor-link-tooltip-action');
                    tooltip.append(aLink).append(' | ').append(aEdit).append(' | ').append(aUnlink);
                    tooltip.css({
                        top: (pos.top + parseInt($link.css('line-height'), 10)) + 'px',
                        left: pos.left + 'px'
                    });
                    $('.redactor-link-tooltip').remove();
                    $('body').append(tooltip);
                },
                closeTooltip: function(e) {
                    e = e.originalEvent || e;
                    var target = e.target;
                    var $parent = $(target).closest('a', this.$editor[0]);
                    if ($parent.length !== 0 && $parent[0].tagName === 'A' && target.tagName !== 'A') {
                        return;
                    } else if ((target.tagName === 'A' && this.utils.isRedactorParent(target)) || $(target).hasClass('redactor-link-tooltip-action')) {
                        return;
                    }
                    $('.redactor-link-tooltip').remove();
                }
            };
        },
        paragraphize: function() {
            return {
                load: function(html) {
                    if (this.opts.linebreaks) return html;
                    if (html === '' || html === '<p></p>') return this.opts.emptyHtml;
                    html = html + "\n";
                    this.paragraphize.safes = [];
                    this.paragraphize.z = 0;
                    html = html.replace(/(<br\s?\/?>){1,}\n?<\/blockquote>/gi, '</blockquote>');
                    html = this.paragraphize.getSafes(html);
                    html = this.paragraphize.getSafesComments(html);
                    html = this.paragraphize.replaceBreaksToNewLines(html);
                    html = this.paragraphize.replaceBreaksToParagraphs(html);
                    html = this.paragraphize.clear(html);
                    html = this.paragraphize.restoreSafes(html);
                    html = html.replace(new RegExp('<br\\s?/?>\n?<(' + this.opts.paragraphizeBlocks.join('|') + ')(.*?[^>])>', 'gi'), '<p><br /></p>\n<$1$2>');
                    return $.trim(html);
                },
                getSafes: function(html) {
                    var $div = $('<div />').append(html);
                    $div.find('blockquote p').replaceWith(function() {
                        return $(this).append('<br />').contents();
                    });
                    html = $div.html();
                    $div.find(this.opts.paragraphizeBlocks.join(', ')).each($.proxy(function(i, s) {
                        this.paragraphize.z++;
                        this.paragraphize.safes[this.paragraphize.z] = s.outerHTML;
                        html = html.replace(s.outerHTML, '\n{replace' + this.paragraphize.z + '}');
                    }, this));
                    return html;
                },
                getSafesComments: function(html) {
                    var commentsMatches = html.match(/<!--([\w\W]*?)-->/gi);
                    if (!commentsMatches) return html;
                    $.each(commentsMatches, $.proxy(function(i, s) {
                        this.paragraphize.z++;
                        this.paragraphize.safes[this.paragraphize.z] = s;
                        html = html.replace(s, '\n{replace' + this.paragraphize.z + '}');
                    }, this));
                    return html;
                },
                restoreSafes: function(html) {
                    $.each(this.paragraphize.safes, function(i, s) {
                        s = (typeof s !== 'undefined') ? s.replace(/\$/g, '&#36;') : s;
                        html = html.replace('{replace' + i + '}', s);
                    });
                    return html;
                },
                replaceBreaksToParagraphs: function(html) {
                    var htmls = html.split(new RegExp('\n', 'g'), -1);
                    html = '';
                    if (htmls) {
                        var len = htmls.length;
                        for (var i = 0; i < len; i++) {
                            if (!htmls.hasOwnProperty(i)) return;
                            if (htmls[i].search('{replace') == -1) {
                                htmls[i] = htmls[i].replace(/<p>\n\t?<\/p>/gi, '');
                                htmls[i] = htmls[i].replace(/<p><\/p>/gi, '');
                                if (htmls[i] !== '') {
                                    html += '<p>' + htmls[i].replace(/^\n+|\n+$/g, "") + "</p>";
                                }
                            } else html += htmls[i];
                        }
                    }
                    return html;
                },
                replaceBreaksToNewLines: function(html) {
                    html = html.replace(/<br \/>\s*<br \/>/gi, "\n\n");
                    html = html.replace(/<br\s?\/?>\n?<br\s?\/?>/gi, "\n<br /><br />");
                    html = html.replace(new RegExp("\r\n", 'g'), "\n");
                    html = html.replace(new RegExp("\r", 'g'), "\n");
                    html = html.replace(new RegExp("/\n\n+/"), 'g', "\n\n");
                    return html;
                },
                clear: function(html) {
                    html = html.replace(new RegExp('</blockquote></p>', 'gi'), '</blockquote>');
                    html = html.replace(new RegExp('<p></blockquote>', 'gi'), '</blockquote>');
                    html = html.replace(new RegExp('<p><blockquote>', 'gi'), '<blockquote>');
                    html = html.replace(new RegExp('<blockquote></p>', 'gi'), '<blockquote>');
                    html = html.replace(new RegExp('<p><p ', 'gi'), '<p ');
                    html = html.replace(new RegExp('<p><p>', 'gi'), '<p>');
                    html = html.replace(new RegExp('</p></p>', 'gi'), '</p>');
                    html = html.replace(new RegExp('<p>\\s?</p>', 'gi'), '');
                    html = html.replace(new RegExp("\n</p>", 'gi'), '</p>');
                    html = html.replace(new RegExp('<p>\t?\t?\n?<p>', 'gi'), '<p>');
                    html = html.replace(new RegExp('<p>\t*</p>', 'gi'), '');
                    return html;
                }
            };
        },
        paste: function() {
            return {
                init: function(e) {
                    if (!this.opts.cleanOnPaste) {
                        setTimeout($.proxy(this.code.sync, this), 1);
                        return;
                    }
                    this.rtePaste = true;
                    this.buffer.set();
                    this.selection.save();
                    this.utils.saveScroll();
                    this.paste.createPasteBox();
                    $(window).on('scroll.redactor-freeze', $.proxy(function() {
                        $(window).scrollTop(this.saveBodyScroll);
                    }, this));
                    setTimeout($.proxy(function() {
                        var html = this.$pasteBox.html();
                        this.$pasteBox.remove();
                        this.selection.restore();
                        this.utils.restoreScroll();
                        this.paste.insert(html);
                        $(window).off('scroll.redactor-freeze');
                        if (this.linkify.isEnabled()) {
                            this.linkify.format();
                        }
                    }, this), 1);
                },
                createPasteBox: function() {
                    this.$pasteBox = $('<div>').html('').attr('contenteditable', 'true').css({
                        position: 'fixed',
                        width: 0,
                        top: 0,
                        left: '-9999px'
                    });
                    if (this.utils.browser('msie')) {
                        this.$box.append(this.$pasteBox);
                    } else {
                        $('body').append(this.$pasteBox);
                    }
                    this.$pasteBox.focus();
                },
                insert: function(html) {
                    html = this.core.setCallback('pasteBefore', html);
                    html = (this.utils.isSelectAll()) ? this.clean.onPaste(html, false) : this.clean.onPaste(html);
                    html = this.core.setCallback('paste', html);
                    if (this.utils.isSelectAll()) {
                        this.insert.set(html, false);
                    } else {
                        this.insert.html(html, false);
                    }
                    this.utils.disableSelectAll();
                    this.rtePaste = false;
                    setTimeout($.proxy(this.clean.clearUnverified, this), 10);
                    setTimeout($.proxy(function() {
                        var spans = this.$editor.find('span');
                        $.each(spans, function(i, s) {
                            var html = s.innerHTML.replace(/\u200B/, '');
                            if (html === '' && s.attributes.length === 0) $(s).remove();
                        });
                    }, this), 10);
                }
            };
        },
        placeholder: function() {
            return {
                enable: function() {
                    if (!this.placeholder.is()) return;
                    this.$editor.attr('placeholder', this.$element.attr('placeholder'));
                    this.placeholder.toggle();
                    this.$editor.on('keydown.redactor-placeholder', $.proxy(this.placeholder.toggle, this));
                },
                toggle: function() {
                    setTimeout($.proxy(function() {
                        var func = this.utils.isEmpty(this.$editor.html(), false) ? 'addClass' : 'removeClass';
                        this.$editor[func]('redactor-placeholder');
                    }, this), 5);
                },
                remove: function() {
                    this.$editor.removeClass('redactor-placeholder');
                },
                is: function() {
                    if (this.opts.placeholder) {
                        return this.$element.attr('placeholder', this.opts.placeholder);
                    } else {
                        return !(typeof this.$element.attr('placeholder') == 'undefined' || this.$element.attr('placeholder') === '');
                    }
                }
            };
        },
        progress: function() {
            return {
                show: function() {
                    $(document.body).append($('<div id="redactor-progress"><span></span></div>'));
                    $('#redactor-progress').fadeIn();
                },
                hide: function() {
                    $('#redactor-progress').fadeOut(1500, function() {
                        $(this).remove();
                    });
                }
            };
        },
        selection: function() {
            return {
                get: function() {
                    this.sel = document.getSelection();
                    if (document.getSelection && this.sel.getRangeAt && this.sel.rangeCount) {
                        this.range = this.sel.getRangeAt(0);
                    } else {
                        this.range = document.createRange();
                    }
                },
                addRange: function() {
                    try {
                        this.sel.removeAllRanges();
                    } catch (e) {}
                    this.sel.addRange(this.range);
                },
                getCurrent: function() {
                    var el = false;
                    this.selection.get();
                    if (this.sel && this.sel.rangeCount > 0) {
                        el = this.sel.getRangeAt(0).startContainer;
                    }
                    return this.utils.isRedactorParent(el);
                },
                getParent: function(elem) {
                    elem = elem || this.selection.getCurrent();
                    if (elem) {
                        return this.utils.isRedactorParent($(elem).parent()[0]);
                    }
                    return false;
                },
                getPrev: function() {
                    return window.getSelection().anchorNode.previousSibling;
                },
                getNext: function() {
                    return window.getSelection().anchorNode.nextSibling;
                },
                getBlock: function(node) {
                    node = node || this.selection.getCurrent();
                    while (node) {
                        if (this.utils.isBlockTag(node.tagName)) {
                            return ($(node).hasClass('redactor-editor')) ? false : node;
                        }
                        node = node.parentNode;
                    }
                    return false;
                },
                getInlines: function(nodes, tags) {
                    this.selection.get();
                    if (this.range && this.range.collapsed) {
                        return false;
                    }
                    var inlines = [];
                    nodes = (typeof nodes == 'undefined' || nodes === false) ? this.selection.getNodes() : nodes;
                    var inlineTags = this.opts.inlineTags;
                    inlineTags.push('span');
                    if (typeof tags !== 'undefined') {
                        for (var i = 0; i < tags.length; i++) {
                            inlineTags.push(tags[i]);
                        }
                    }
                    $.each(nodes, $.proxy(function(i, node) {
                        if ($.inArray(node.tagName.toLowerCase(), inlineTags) != -1) {
                            inlines.push(node);
                        }
                    }, this));
                    return (inlines.length === 0) ? false : inlines;
                },
                getInlinesTags: function(tags) {
                    this.selection.get();
                    if (this.range && this.range.collapsed) {
                        return false;
                    }
                    var inlines = [];
                    var nodes = this.selection.getNodes();
                    $.each(nodes, $.proxy(function(i, node) {
                        if ($.inArray(node.tagName.toLowerCase(), tags) != -1) {
                            inlines.push(node);
                        }
                    }, this));
                    return (inlines.length === 0) ? false : inlines;
                },
                getBlocks: function(nodes) {
                    this.selection.get();
                    if (this.range && this.range.collapsed) {
                        return [this.selection.getBlock()];
                    }
                    var blocks = [];
                    nodes = (typeof nodes == 'undefined') ? this.selection.getNodes() : nodes;
                    $.each(nodes, $.proxy(function(i, node) {
                        if (this.utils.isBlock(node)) {
                            this.selection.lastBlock = node;
                            blocks.push(node);
                        }
                    }, this));
                    return (blocks.length === 0) ? [this.selection.getBlock()] : blocks;
                },
                getLastBlock: function() {
                    return this.selection.lastBlock;
                },
                getNodes: function() {
                    this.selection.get();
                    var startNode = this.selection.getNodesMarker(1);
                    var endNode = this.selection.getNodesMarker(2);
                    if (this.range.collapsed === false) {
                        if (window.getSelection) {
                            var sel = window.getSelection();
                            if (sel.rangeCount > 0) {
                                var range = sel.getRangeAt(0);
                                var startPointNode = range.startContainer,
                                    startOffset = range.startOffset;
                                var boundaryRange = range.cloneRange();
                                boundaryRange.collapse(false);
                                boundaryRange.insertNode(endNode);
                                boundaryRange.setStart(startPointNode, startOffset);
                                boundaryRange.collapse(true);
                                boundaryRange.insertNode(startNode);
                                range.setStartAfter(startNode);
                                range.setEndBefore(endNode);
                                sel.removeAllRanges();
                                sel.addRange(range);
                            }
                        }
                    } else {
                        this.selection.setNodesMarker(this.range, startNode, true);
                        endNode = startNode;
                    }
                    var nodes = [];
                    var counter = 0;
                    var self = this;
                    this.$editor.find('*').each(function() {
                        if (this == startNode) {
                            var parent = $(this).parent();
                            if (parent.length !== 0 && parent[0].tagName != 'BODY' && self.utils.isRedactorParent(parent[0])) {
                                nodes.push(parent[0]);
                            }
                            nodes.push(this);
                            counter = 1;
                        } else {
                            if (counter > 0) {
                                nodes.push(this);
                                counter = counter + 1;
                            }
                        }
                        if (this == endNode) {
                            return false;
                        }
                    });
                    var finalNodes = [];
                    var len = nodes.length;
                    for (var i = 0; i < len; i++) {
                        if (nodes[i].id != 'nodes-marker-1' && nodes[i].id != 'nodes-marker-2') {
                            finalNodes.push(nodes[i]);
                        }
                    }
                    this.selection.removeNodesMarkers();
                    return finalNodes;
                },
                getNodesMarker: function(num) {
                    return $('<span id="nodes-marker-' + num + '" class="redactor-nodes-marker" data-verified="redactor">' + this.opts.invisibleSpace + '</span>')[0];
                },
                setNodesMarker: function(range, node, type) {
                    var range = range.cloneRange();
                    try {
                        range.collapse(type);
                        range.insertNode(node);
                    } catch (e) {}
                },
                removeNodesMarkers: function() {
                    $(document).find('span.redactor-nodes-marker').remove();
                    this.$editor.find('span.redactor-nodes-marker').remove();
                },
                fromPoint: function(start, end) {
                    this.caret.setOffset(start, end);
                },
                wrap: function(tag) {
                    this.selection.get();
                    if (this.range.collapsed) return false;
                    var wrapper = document.createElement(tag);
                    wrapper.appendChild(this.range.extractContents());
                    this.range.insertNode(wrapper);
                    return wrapper;
                },
                selectElement: function(node) {
                    if (this.utils.browser('mozilla')) {
                        node = node[0] || node;
                        var range = document.createRange();
                        range.selectNodeContents(node);
                    } else {
                        this.caret.set(node, 0, node, 1);
                    }
                },
                selectAll: function() {
                    this.selection.get();
                    this.range.selectNodeContents(this.$editor[0]);
                    this.selection.addRange();
                },
                remove: function() {
                    this.selection.get();
                    this.sel.removeAllRanges();
                },
                save: function() {
                    this.selection.createMarkers();
                },
                createMarkers: function() {
                    this.selection.get();
                    var node1 = this.selection.getMarker(1);
                    this.selection.setMarker(this.range, node1, true);
                    if (this.range.collapsed === false) {
                        var node2 = this.selection.getMarker(2);
                        this.selection.setMarker(this.range, node2, false);
                    }
                    this.savedSel = this.$editor.html();
                },
                getMarker: function(num) {
                    if (typeof num == 'undefined') num = 1;
                    return $('<span id="selection-marker-' + num + '" class="redactor-selection-marker"  data-verified="redactor">' + this.opts.invisibleSpace + '</span>')[0];
                },
                getMarkerAsHtml: function(num) {
                    return this.utils.getOuterHtml(this.selection.getMarker(num));
                },
                setMarker: function(range, node, type) {
                    range = range.cloneRange();
                    try {
                        range.collapse(type);
                        range.insertNode(node);
                    } catch (e) {
                        this.focus.setStart();
                    }
                },
                restore: function() {
                    var node1 = this.$editor.find('span#selection-marker-1');
                    var node2 = this.$editor.find('span#selection-marker-2');
                    if (this.utils.browser('mozilla')) {
                        this.$editor.focus();
                    }
                    if (node1.length !== 0 && node2.length !== 0) {
                        this.caret.set(node1, 0, node2, 0);
                    } else if (node1.length !== 0) {
                        this.caret.set(node1, 0, node1, 0);
                    } else {
                        this.$editor.focus();
                    }
                    this.selection.removeMarkers();
                    this.savedSel = false;
                },
                removeMarkers: function() {
                    this.$editor.find('span.redactor-selection-marker').each(function(i, s) {
                        var text = $(s).text().replace(/\u200B/g, '');
                        if (text === '') $(s).remove();
                        else $(s).replaceWith(function() {
                            return $(this).contents();
                        });
                    });
                },
                getText: function() {
                    this.selection.get();
                    return this.sel.toString();
                },
                getHtml: function() {
                    var html = '';
                    this.selection.get();
                    if (this.sel.rangeCount) {
                        var container = document.createElement('div');
                        var len = this.sel.rangeCount;
                        for (var i = 0; i < len; ++i) {
                            container.appendChild(this.sel.getRangeAt(i).cloneContents());
                        }
                        html = container.innerHTML;
                    }
                    return this.clean.onSync(html);
                },
                replaceSelection: function(html) {
                    this.selection.get();
                    this.range.deleteContents();
                    var div = document.createElement("div");
                    div.innerHTML = html;
                    var frag = document.createDocumentFragment(),
                        child;
                    while ((child = div.firstChild)) {
                        frag.appendChild(child);
                    }
                    this.range.insertNode(frag);
                },
                replaceWithHtml: function(html) {
                    html = this.selection.getMarkerAsHtml(1) + html + this.selection.getMarkerAsHtml(2);
                    this.selection.get();
                    if (window.getSelection && window.getSelection().getRangeAt) {
                        this.selection.replaceSelection(html);
                    } else if (document.selection && document.selection.createRange) {
                        this.range.pasteHTML(html);
                    }
                    this.selection.restore();
                    this.code.sync();
                }
            };
        },
        shortcuts: function() {
            return {
                init: function(e, key) {
                    if (!this.opts.shortcuts) {
                        if ((e.ctrlKey || e.metaKey) && (key === 66 || key === 73)) e.preventDefault();
                        return false;
                    }
                    $.each(this.opts.shortcuts, $.proxy(function(str, command) {
                        var keys = str.split(',');
                        var len = keys.length;
                        for (var i = 0; i < len; i++) {
                            if (typeof keys[i] === 'string') {
                                this.shortcuts.handler(e, $.trim(keys[i]), $.proxy(function() {
                                    var func;
                                    if (command.func.search(/\./) != '-1') {
                                        func = command.func.split('.');
                                        if (typeof this[func[0]] != 'undefined') {
                                            this[func[0]][func[1]].apply(this, command.params);
                                        }
                                    } else {
                                        this[command.func].apply(this, command.params);
                                    }
                                }, this));
                            }
                        }
                    }, this));
                },
                handler: function(e, keys, origHandler) {
                    var hotkeysSpecialKeys = {
                        8: "backspace",
                        9: "tab",
                        10: "return",
                        13: "return",
                        16: "shift",
                        17: "ctrl",
                        18: "alt",
                        19: "pause",
                        20: "capslock",
                        27: "esc",
                        32: "space",
                        33: "pageup",
                        34: "pagedown",
                        35: "end",
                        36: "home",
                        37: "left",
                        38: "up",
                        39: "right",
                        40: "down",
                        45: "insert",
                        46: "del",
                        59: ";",
                        61: "=",
                        96: "0",
                        97: "1",
                        98: "2",
                        99: "3",
                        100: "4",
                        101: "5",
                        102: "6",
                        103: "7",
                        104: "8",
                        105: "9",
                        106: "*",
                        107: "+",
                        109: "-",
                        110: ".",
                        111: "/",
                        112: "f1",
                        113: "f2",
                        114: "f3",
                        115: "f4",
                        116: "f5",
                        117: "f6",
                        118: "f7",
                        119: "f8",
                        120: "f9",
                        121: "f10",
                        122: "f11",
                        123: "f12",
                        144: "numlock",
                        145: "scroll",
                        173: "-",
                        186: ";",
                        187: "=",
                        188: ",",
                        189: "-",
                        190: ".",
                        191: "/",
                        192: "`",
                        219: "[",
                        220: "\\",
                        221: "]",
                        222: "'"
                    };
                    var hotkeysShiftNums = {
                        "`": "~",
                        "1": "!",
                        "2": "@",
                        "3": "#",
                        "4": "$",
                        "5": "%",
                        "6": "^",
                        "7": "&",
                        "8": "*",
                        "9": "(",
                        "0": ")",
                        "-": "_",
                        "=": "+",
                        ";": ": ",
                        "'": "\"",
                        ",": "<",
                        ".": ">",
                        "/": "?",
                        "\\": "|"
                    };
                    keys = keys.toLowerCase().split(" ");
                    var special = hotkeysSpecialKeys[e.keyCode],
                        character = String.fromCharCode(e.which).toLowerCase(),
                        modif = "",
                        possible = {};
                    $.each(["alt", "ctrl", "meta", "shift"], function(index, specialKey) {
                        if (e[specialKey + 'Key'] && special !== specialKey) {
                            modif += specialKey + '+';
                        }
                    });
                    if (special) possible[modif + special] = true;
                    if (character) {
                        possible[modif + character] = true;
                        possible[modif + hotkeysShiftNums[character]] = true;
                        if (modif === "shift+") {
                            possible[hotkeysShiftNums[character]] = true;
                        }
                    }
                    for (var i = 0, len = keys.length; i < len; i++) {
                        if (possible[keys[i]]) {
                            e.preventDefault();
                            return origHandler.apply(this, arguments);
                        }
                    }
                }
            };
        },
        tabifier: function() {
            return {
                get: function(code) {
                    if (!this.opts.tabifier) return code;
                    var ownLine = ['area', 'body', 'head', 'hr', 'i?frame', 'link', 'meta', 'noscript', 'style', 'script', 'table', 'tbody', 'thead', 'tfoot'];
                    var contOwnLine = ['li', 'dt', 'dt', 'h[1-6]', 'option', 'script'];
                    var newLevel = ['p', 'blockquote', 'div', 'dl', 'fieldset', 'form', 'frameset', 'map', 'ol', 'pre', 'select', 'td', 'th', 'tr', 'ul'];
                    this.tabifier.lineBefore = new RegExp('^<(/?' + ownLine.join('|/?') + '|' + contOwnLine.join('|') + ')[ >]');
                    this.tabifier.lineAfter = new RegExp('^<(br|/?' + ownLine.join('|/?') + '|/' + contOwnLine.join('|/') + ')[ >]');
                    this.tabifier.newLevel = new RegExp('^</?(' + newLevel.join('|') + ')[ >]');
                    var i = 0,
                        codeLength = code.length,
                        point = 0,
                        start = null,
                        end = null,
                        tag = '',
                        out = '',
                        cont = '';
                    this.tabifier.cleanlevel = 0;
                    for (; i < codeLength; i++) {
                        point = i;
                        if (-1 == code.substr(i).indexOf('<')) {
                            out += code.substr(i);
                            return this.tabifier.finish(out);
                        }
                        while (point < codeLength && code.charAt(point) != '<') {
                            point++;
                        }
                        if (i != point) {
                            cont = code.substr(i, point - i);
                            if (!cont.match(/^\s{2,}$/g)) {
                                if ('\n' == out.charAt(out.length - 1)) out += this.tabifier.getTabs();
                                else if ('\n' == cont.charAt(0)) {
                                    out += '\n' + this.tabifier.getTabs();
                                    cont = cont.replace(/^\s+/, '');
                                }
                                out += cont;
                            }
                            if (cont.match(/\n/)) out += '\n' + this.tabifier.getTabs();
                        }
                        start = point;
                        while (point < codeLength && '>' != code.charAt(point)) {
                            point++;
                        }
                        tag = code.substr(start, point - start);
                        i = point;
                        var t;
                        if ('!--' == tag.substr(1, 3)) {
                            if (!tag.match(/--$/)) {
                                while ('-->' != code.substr(point, 3)) {
                                    point++;
                                }
                                point += 2;
                                tag = code.substr(start, point - start);
                                i = point;
                            }
                            if ('\n' != out.charAt(out.length - 1)) out += '\n';
                            out += this.tabifier.getTabs();
                            out += tag + '>\n';
                        } else if ('!' == tag[1]) {
                            out = this.tabifier.placeTag(tag + '>', out);
                        } else if ('?' == tag[1]) {
                            out += tag + '>\n';
                        } else if (t = tag.match(/^<(script|style|pre)/i)) {
                            t[1] = t[1].toLowerCase();
                            tag = this.tabifier.cleanTag(tag);
                            out = this.tabifier.placeTag(tag, out);
                            end = String(code.substr(i + 1)).toLowerCase().indexOf('</' + t[1]);
                            if (end) {
                                cont = code.substr(i + 1, end);
                                i += end;
                                out += cont;
                            }
                        } else {
                            tag = this.tabifier.cleanTag(tag);
                            out = this.tabifier.placeTag(tag, out);
                        }
                    }
                    return this.tabifier.finish(out);
                },
                getTabs: function() {
                    var s = '';
                    for (var j = 0; j < this.tabifier.cleanlevel; j++) {
                        s += '\t';
                    }
                    return s;
                },
                finish: function(code) {
                    code = code.replace(/\n\s*\n/g, '\n');
                    code = code.replace(/^[\s\n]*/, '');
                    code = code.replace(/[\s\n]*$/, '');
                    code = code.replace(/<script(.*?)>\n<\/script>/gi, '<script$1></script>');
                    this.tabifier.cleanlevel = 0;
                    return code;
                },
                cleanTag: function(tag) {
                    var tagout = '';
                    tag = tag.replace(/\n/g, ' ');
                    tag = tag.replace(/\s{2,}/g, ' ');
                    tag = tag.replace(/^\s+|\s+$/g, ' ');
                    var suffix = '';
                    if (tag.match(/\/$/)) {
                        suffix = '/';
                        tag = tag.replace(/\/+$/, '');
                    }
                    var m;
                    while (m = /\s*([^= ]+)(?:=((['"']).*?\3|[^ ]+))?/.exec(tag)) {
                        if (m[2]) tagout += m[1].toLowerCase() + '=' + m[2];
                        else if (m[1]) tagout += m[1].toLowerCase();
                        tagout += ' ';
                        tag = tag.substr(m[0].length);
                    }
                    return tagout.replace(/\s*$/, '') + suffix + '>';
                },
                placeTag: function(tag, out) {
                    var nl = tag.match(this.tabifier.newLevel);
                    if (tag.match(this.tabifier.lineBefore) || nl) {
                        out = out.replace(/\s*$/, '');
                        out += '\n';
                    }
                    if (nl && '/' == tag.charAt(1)) this.tabifier.cleanlevel--;
                    if ('\n' == out.charAt(out.length - 1)) out += this.tabifier.getTabs();
                    if (nl && '/' != tag.charAt(1)) this.tabifier.cleanlevel++;
                    out += tag;
                    if (tag.match(this.tabifier.lineAfter) || tag.match(this.tabifier.newLevel)) {
                        out = out.replace(/ *$/, '');
                    }
                    return out;
                }
            };
        },
        tidy: function() {
            return {
                setupAllowed: function() {
                    var index = $.inArray('span', this.opts.removeEmpty);
                    if (index !== -1) {
                        this.opts.removeEmpty.splice(index, 1);
                    }
                    if (this.opts.allowedTags) this.opts.deniedTags = false;
                    if (this.opts.allowedAttr) this.opts.removeAttr = false;
                    if (this.opts.linebreaks) return;
                    var tags = ['p', 'section'];
                    if (this.opts.allowedTags) this.tidy.addToAllowed(tags);
                    if (this.opts.deniedTags) this.tidy.removeFromDenied(tags);
                },
                addToAllowed: function(tags) {
                    var len = tags.length;
                    for (var i = 0; i < len; i++) {
                        if ($.inArray(tags[i], this.opts.allowedTags) == -1) {
                            this.opts.allowedTags.push(tags[i]);
                        }
                    }
                },
                removeFromDenied: function(tags) {
                    var len = tags.length;
                    for (var i = 0; i < len; i++) {
                        var pos = $.inArray(tags[i], this.opts.deniedTags);
                        if (pos != -1) {
                            this.opts.deniedTags.splice(pos, 1);
                        }
                    }
                },
                load: function(html, options) {
                    this.tidy.settings = {
                        deniedTags: this.opts.deniedTags,
                        allowedTags: this.opts.allowedTags,
                        removeComments: this.opts.removeComments,
                        replaceTags: this.opts.replaceTags,
                        replaceStyles: this.opts.replaceStyles,
                        removeDataAttr: this.opts.removeDataAttr,
                        removeAttr: this.opts.removeAttr,
                        allowedAttr: this.opts.allowedAttr,
                        removeWithoutAttr: this.opts.removeWithoutAttr,
                        removeEmpty: this.opts.removeEmpty
                    };
                    $.extend(this.tidy.settings, options);
                    html = this.tidy.removeComments(html);
                    this.tidy.$div = $('<div />').append(html);
                    this.tidy.replaceTags();
                    this.tidy.replaceStyles();
                    this.tidy.removeTags();
                    this.tidy.removeAttr();
                    this.tidy.removeEmpty();
                    this.tidy.removeParagraphsInLists();
                    this.tidy.removeDataAttr();
                    this.tidy.removeWithoutAttr();
                    html = this.tidy.$div.html();
                    this.tidy.$div.remove();
                    return html;
                },
                removeComments: function(html) {
                    if (!this.tidy.settings.removeComments) return html;
                    return html.replace(/<!--[\s\S]*?-->/gi, '');
                },
                replaceTags: function(html) {
                    if (!this.tidy.settings.replaceTags) return html;
                    var len = this.tidy.settings.replaceTags.length;
                    var replacement = [],
                        rTags = [];
                    for (var i = 0; i < len; i++) {
                        rTags.push(this.tidy.settings.replaceTags[i][1]);
                        replacement.push(this.tidy.settings.replaceTags[i][0]);
                    }
                    $.each(replacement, $.proxy(function(key, value) {
                        this.tidy.$div.find(value).replaceWith(function() {
                            return $("<" + rTags[key] + " />", {
                                html: $(this).html()
                            });
                        });
                    }, this));
                },
                replaceStyles: function() {
                    if (!this.tidy.settings.replaceStyles) return;
                    var len = this.tidy.settings.replaceStyles.length;
                    this.tidy.$div.find('span').each($.proxy(function(n, s) {
                        var $el = $(s);
                        var style = $el.attr('style');
                        for (var i = 0; i < len; i++) {
                            if (style && style.match(new RegExp('^' + this.tidy.settings.replaceStyles[i][0], 'i'))) {
                                var tagName = this.tidy.settings.replaceStyles[i][1];
                                $el.replaceWith(function() {
                                    var tag = document.createElement(tagName);
                                    return $(tag).append($(this).contents());
                                });
                            }
                        }
                    }, this));
                },
                removeTags: function() {
                    if (!this.tidy.settings.deniedTags && this.tidy.settings.allowedTags) {
                        this.tidy.$div.find('*').not(this.tidy.settings.allowedTags.join(',')).each(function(i, s) {
                            if (s.innerHTML === '') $(s).remove();
                            else $(s).contents().unwrap();
                        });
                    }
                    if (this.tidy.settings.deniedTags) {
                        this.tidy.$div.find(this.tidy.settings.deniedTags.join(',')).each(function(i, s) {
                            if ($(s).hasClass('redactor-script-tag') || $(s).hasClass('redactor-selection-marker')) return;
                            if (s.innerHTML === '') $(s).remove();
                            else $(s).contents().unwrap();
                        });
                    }
                },
                removeAttr: function() {
                    var len;
                    if (!this.tidy.settings.removeAttr && this.tidy.settings.allowedAttr) {
                        var allowedAttrTags = [],
                            allowedAttrData = [];
                        len = this.tidy.settings.allowedAttr.length;
                        for (var i = 0; i < len; i++) {
                            allowedAttrTags.push(this.tidy.settings.allowedAttr[i][0]);
                            allowedAttrData.push(this.tidy.settings.allowedAttr[i][1]);
                        }
                        this.tidy.$div.find('*').each($.proxy(function(n, s) {
                            var $el = $(s);
                            var pos = $.inArray($el[0].tagName.toLowerCase(), allowedAttrTags);
                            var attributesRemove = this.tidy.removeAttrGetRemoves(pos, allowedAttrData, $el);
                            if (attributesRemove) {
                                $.each(attributesRemove, function(z, f) {
                                    $el.removeAttr(f);
                                });
                            }
                        }, this));
                    }
                    if (this.tidy.settings.removeAttr) {
                        len = this.tidy.settings.removeAttr.length;
                        for (var i = 0; i < len; i++) {
                            var attrs = this.tidy.settings.removeAttr[i][1];
                            if ($.isArray(attrs)) attrs = attrs.join(' ');
                            this.tidy.$div.find(this.tidy.settings.removeAttr[i][0]).removeAttr(attrs);
                        }
                    }
                },
                removeAttrGetRemoves: function(pos, allowed, $el) {
                    var attributesRemove = [];
                    if (pos == -1) {
                        $.each($el[0].attributes, function(i, item) {
                            attributesRemove.push(item.name);
                        });
                    } else if (allowed[pos] == '*') {
                        attributesRemove = [];
                    } else {
                        $.each($el[0].attributes, function(i, item) {
                            if ($.isArray(allowed[pos])) {
                                if ($.inArray(item.name, allowed[pos]) == -1) {
                                    attributesRemove.push(item.name);
                                }
                            } else if (allowed[pos] != item.name) {
                                attributesRemove.push(item.name);
                            }
                        });
                    }
                    return attributesRemove;
                },
                removeAttrs: function(el, regex) {
                    regex = new RegExp(regex, "g");
                    return el.each(function() {
                        var self = $(this);
                        var len = this.attributes.length - 1;
                        for (var i = len; i >= 0; i--) {
                            var item = this.attributes[i];
                            if (item && item.specified && item.name.search(regex) >= 0) {
                                self.removeAttr(item.name);
                            }
                        }
                    });
                },
                removeEmpty: function() {
                    if (!this.tidy.settings.removeEmpty) return;
                    this.tidy.$div.find(this.tidy.settings.removeEmpty.join(',')).each(function() {
                        var $el = $(this);
                        var text = $el.text();
                        text = text.replace(/\u200B/g, '');
                        text = text.replace(/&nbsp;/gi, '');
                        text = text.replace(/\s/g, '');
                        if (text === '' && $el.children().length === 0) {
                            $el.remove();
                        }
                    });
                },
                removeParagraphsInLists: function() {
                    this.tidy.$div.find('li p').contents().unwrap();
                },
                removeDataAttr: function() {
                    if (!this.tidy.settings.removeDataAttr) return;
                    var tags = this.tidy.settings.removeDataAttr;
                    if ($.isArray(this.tidy.settings.removeDataAttr)) tags = this.tidy.settings.removeDataAttr.join(',');
                    this.tidy.removeAttrs(this.tidy.$div.find(tags), '^(data-)');
                },
                removeWithoutAttr: function() {
                    if (!this.tidy.settings.removeWithoutAttr) return;
                    this.tidy.$div.find(this.tidy.settings.removeWithoutAttr.join(',')).each(function() {
                        if (this.attributes.length === 0) {
                            $(this).contents().unwrap();
                        }
                    });
                }
            };
        },
        toolbar: function() {
            return {
                init: function() {
                    return {
                        html: {
                            title: this.lang.get('html'),
                            func: 'code.toggle'
                        },
                        formatting: {
                            title: this.lang.get('formatting'),
                            dropdown: {
                                p: {
                                    title: this.lang.get('paragraph'),
                                    func: 'block.format'
                                },
                                blockquote: {
                                    title: this.lang.get('quote'),
                                    func: 'block.format'
                                },
                                pre: {
                                    title: this.lang.get('code'),
                                    func: 'block.format'
                                },
                                h1: {
                                    title: this.lang.get('header1'),
                                    func: 'block.format'
                                },
                                h2: {
                                    title: this.lang.get('header2'),
                                    func: 'block.format'
                                },
                                h3: {
                                    title: this.lang.get('header3'),
                                    func: 'block.format'
                                },
                                h4: {
                                    title: this.lang.get('header4'),
                                    func: 'block.format'
                                },
                                h5: {
                                    title: this.lang.get('header5'),
                                    func: 'block.format'
                                },
                                h6: {
                                    title: 'header6',
                                    func: 'block.format'
                                }
                            }
                        },
                        bold: {
                            title: this.lang.get('bold'),
                            func: 'inline.format'
                        },
                        italic: {
                            title: this.lang.get('italic'),
                            func: 'inline.format'
                        },
                        deleted: {
                            title: this.lang.get('deleted'),
                            func: 'inline.format'
                        },
                        underline: {
                            title: this.lang.get('underline'),
                            func: 'inline.format'
                        },
                        unorderedlist: {
                            title: '&bull; ' + this.lang.get('unorderedlist'),
                            func: 'list.toggle'
                        },
                        orderedlist: {
                            title: '1. ' + this.lang.get('orderedlist'),
                            func: 'list.toggle'
                        },
                        outdent: {
                            title: '< ' + this.lang.get('outdent'),
                            func: 'indent.decrease'
                        },
                        indent: {
                            title: '> ' + this.lang.get('indent'),
                            func: 'indent.increase'
                        },
                        image: {
                            title: this.lang.get('image'),
                            func: 'image.show'
                        },
                        file: {
                            title: this.lang.get('file'),
                            func: 'file.show'
                        },
                        link: {
                            title: this.lang.get('link'),
                            dropdown: {
                                link: {
                                    title: this.lang.get('link_insert'),
                                    func: 'link.show',
                                    observe: {
                                        element: 'a',
                                        in : {
                                            title: this.lang.get('link_edit'),
                                        },
                                        out: {
                                            title: this.lang.get('link_insert')
                                        }
                                    }
                                },
                                unlink: {
                                    title: this.lang.get('unlink'),
                                    func: 'link.unlink',
                                    observe: {
                                        element: 'a',
                                        out: {
                                            attr: {
                                                'class': 'redactor-dropdown-link-inactive',
                                                'aria-disabled': true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        alignment: {
                            title: this.lang.get('alignment'),
                            dropdown: {
                                left: {
                                    title: this.lang.get('align_left'),
                                    func: 'alignment.left'
                                },
                                center: {
                                    title: this.lang.get('align_center'),
                                    func: 'alignment.center'
                                },
                                right: {
                                    title: this.lang.get('align_right'),
                                    func: 'alignment.right'
                                },
                                justify: {
                                    title: this.lang.get('align_justify'),
                                    func: 'alignment.justify'
                                }
                            }
                        },
                        horizontalrule: {
                            title: this.lang.get('horizontalrule'),
                            func: 'line.insert'
                        }
                    };
                },
                build: function() {
                    this.toolbar.hideButtons();
                    this.toolbar.hideButtonsOnMobile();
                    this.toolbar.isButtonSourceNeeded();
                    if (this.opts.buttons.length === 0) return;
                    this.$toolbar = this.toolbar.createContainer();
                    this.toolbar.setOverflow();
                    this.toolbar.append();
                    this.toolbar.setFormattingTags();
                    this.toolbar.loadButtons();
                    this.toolbar.setFixed();
                    if (this.opts.activeButtons) {
                        this.$editor.on('mouseup.redactor keyup.redactor focus.redactor', $.proxy(this.observe.toolbar, this));
                    }
                },
                createContainer: function() {
                    return $('<ul>').addClass('redactor-toolbar').attr({
                        'id': 'redactor-toolbar-' + this.uuid,
                        'role': 'toolbar'
                    });
                },
                setFormattingTags: function() {
                    $.each(this.opts.toolbar.formatting.dropdown, $.proxy(function(i, s) {
                        if ($.inArray(i, this.opts.formatting) == -1) delete this.opts.toolbar.formatting.dropdown[i];
                    }, this));
                },
                loadButtons: function() {
                    $.each(this.opts.buttons, $.proxy(function(i, btnName) {
                        if (!this.opts.toolbar[btnName]) return;
                        if (btnName === 'file') {
                            if (this.opts.fileUpload === false) return;
                            else if (!this.opts.fileUpload && this.opts.s3 === false) return;
                        }
                        if (btnName === 'image') {
                            if (this.opts.imageUpload === false) return;
                            else if (!this.opts.imageUpload && this.opts.s3 === false) return;
                        }
                        var btnObject = this.opts.toolbar[btnName];
                        this.$toolbar.append($('<li>').append(this.button.build(btnName, btnObject)));
                    }, this));
                },
                append: function() {
                    if (this.opts.toolbarExternal) {
                        this.$toolbar.addClass('redactor-toolbar-external');
                        $(this.opts.toolbarExternal).html(this.$toolbar);
                    } else {
                        this.$box.prepend(this.$toolbar);
                    }
                },
                setFixed: function() {
                    if (!this.utils.isDesktop()) return;
                    if (this.opts.toolbarExternal) return;
                    if (!this.opts.toolbarFixed) return;
                    this.toolbar.observeScroll();
                    $(this.opts.toolbarFixedTarget).on('scroll.redactor.' + this.uuid, $.proxy(this.toolbar.observeScroll, this));
                },
                setOverflow: function() {
                    if (this.utils.isMobile() && this.opts.toolbarOverflow) {
                        this.$toolbar.addClass('redactor-toolbar-overflow');
                    }
                },
                isButtonSourceNeeded: function() {
                    if (this.opts.source) return;
                    var index = this.opts.buttons.indexOf('html');
                    if (index !== -1) {
                        this.opts.buttons.splice(index, 1);
                    }
                },
                hideButtons: function() {
                    if (this.opts.buttonsHide.length === 0) return;
                    $.each(this.opts.buttonsHide, $.proxy(function(i, s) {
                        var index = this.opts.buttons.indexOf(s);
                        this.opts.buttons.splice(index, 1);
                    }, this));
                },
                hideButtonsOnMobile: function() {
                    if (!this.utils.isMobile() || this.opts.buttonsHideOnMobile.length === 0) return;
                    $.each(this.opts.buttonsHideOnMobile, $.proxy(function(i, s) {
                        var index = this.opts.buttons.indexOf(s);
                        this.opts.buttons.splice(index, 1);
                    }, this));
                },
                observeScroll: function() {
                    var scrollTop = $(this.opts.toolbarFixedTarget).scrollTop();
                    var boxTop = 1;
                    if (this.opts.toolbarFixedTarget === document) {
                        boxTop = this.$box.offset().top;
                    }
                    if ((scrollTop + this.opts.toolbarFixedTopOffset) > boxTop) {
                        this.toolbar.observeScrollEnable(scrollTop, boxTop);
                    } else {
                        this.toolbar.observeScrollDisable();
                    }
                },
                observeScrollEnable: function(scrollTop, boxTop) {
                    var top = this.opts.toolbarFixedTopOffset + scrollTop - boxTop;
                    var left = 0;
                    var end = boxTop + this.$box.height() - 32;
                    var width = this.$box.innerWidth();
                    this.$toolbar.addClass('toolbar-fixed-box');
                    this.$toolbar.css({
                        position: 'absolute',
                        width: width,
                        top: top + 'px',
                        left: left
                    });
                    if (scrollTop > end)
                        $('.redactor-dropdown-' + this.uuid + ':visible').hide();
                    this.toolbar.setDropdownsFixed();
                    this.$toolbar.css('visibility', (scrollTop < end) ? 'visible' : 'hidden');
                },
                observeScrollDisable: function() {
                    this.$toolbar.css({
                        position: 'relative',
                        width: 'auto',
                        top: 0,
                        left: 0,
                        visibility: 'visible'
                    });
                    this.toolbar.unsetDropdownsFixed();
                    this.$toolbar.removeClass('toolbar-fixed-box');
                },
                setDropdownsFixed: function() {
                    var top = this.$toolbar.innerHeight() + this.opts.toolbarFixedTopOffset;
                    var position = 'fixed';
                    if (this.opts.toolbarFixedTarget !== document) {
                        top = (this.$toolbar.innerHeight() + this.$toolbar.offset().top) + this.opts.toolbarFixedTopOffset;
                        position = 'absolute';
                    }
                    $('.redactor-dropdown-' + this.uuid).each(function() {
                        $(this).css({
                            position: position,
                            top: top + 'px'
                        });
                    });
                },
                unsetDropdownsFixed: function() {
                    var top = (this.$toolbar.innerHeight() + this.$toolbar.offset().top);
                    $('.redactor-dropdown-' + this.uuid).each(function() {
                        $(this).css({
                            position: 'absolute',
                            top: top + 'px'
                        });
                    });
                }
            };
        },
        upload: function() {
            return {
                init: function(id, url, callback) {
                    this.upload.direct = false;
                    this.upload.callback = callback;
                    this.upload.url = url;
                    this.upload.$el = $(id);
                    this.upload.$droparea = $('<div id="redactor-droparea" />');
                    this.upload.$placeholdler = $('<div id="redactor-droparea-placeholder" />').text(this.lang.get('upload_label'));
                    this.upload.$input = $('<input type="file" name="file" />');
                    this.upload.$placeholdler.append(this.upload.$input);
                    this.upload.$droparea.append(this.upload.$placeholdler);
                    this.upload.$el.append(this.upload.$droparea);
                    this.upload.$droparea.off('redactor.upload');
                    this.upload.$input.off('redactor.upload');
                    this.upload.$droparea.on('dragover.redactor.upload', $.proxy(this.upload.onDrag, this));
                    this.upload.$droparea.on('dragleave.redactor.upload', $.proxy(this.upload.onDragLeave, this));
                    this.upload.$input.on('change.redactor.upload', $.proxy(function(e) {
                        e = e.originalEvent || e;
                        this.upload.traverseFile(this.upload.$input[0].files[0], e);
                    }, this));
                    this.upload.$droparea.on('drop.redactor.upload', $.proxy(function(e) {
                        e.preventDefault();
                        this.upload.$droparea.removeClass('drag-hover').addClass('drag-drop');
                        this.upload.onDrop(e);
                    }, this));
                },
                directUpload: function(file, e) {
                    this.upload.direct = true;
                    this.upload.traverseFile(file, e);
                },
                onDrop: function(e) {
                    e = e.originalEvent || e;
                    var files = e.dataTransfer.files;
                    this.upload.traverseFile(files[0], e);
                },
                traverseFile: function(file, e) {
                    if (this.opts.s3) {
                        this.upload.setConfig(file);
                        this.upload.s3uploadFile(file);
                        return;
                    }
                    var formData = !!window.FormData ? new FormData() : null;
                    if (window.FormData) {
                        this.upload.setConfig(file);
                        var name = (this.upload.type == 'image') ? this.opts.imageUploadParam : this.opts.fileUploadParam;
                        formData.append(name, file);
                    }
                    this.progress.show();
                    this.core.setCallback('uploadStart', e, formData);
                    this.upload.sendData(formData, e);
                },
                setConfig: function(file) {
                    this.upload.getType(file);
                    if (this.upload.direct) {
                        this.upload.url = (this.upload.type == 'image') ? this.opts.imageUpload : this.opts.fileUpload;
                        this.upload.callback = (this.upload.type == 'image') ? this.image.insert : this.file.insert;
                    }
                },
                getType: function(file) {
                    this.upload.type = 'image';
                    if (this.opts.imageTypes.indexOf(file.type) == -1) {
                        this.upload.type = 'file';
                    }
                },
                getHiddenFields: function(obj, fd) {
                    if (obj === false || typeof obj !== 'object') return fd;
                    $.each(obj, $.proxy(function(k, v) {
                        if (v !== null && v.toString().indexOf('#') === 0) v = $(v).val();
                        fd.append(k, v);
                    }, this));
                    return fd;
                },
                sendData: function(formData, e) {
                    if (this.upload.type == 'image') {
                        formData = this.upload.getHiddenFields(this.opts.uploadImageFields, formData);
                        formData = this.upload.getHiddenFields(this.upload.imageFields, formData);
                    } else {
                        formData = this.upload.getHiddenFields(this.opts.uploadFileFields, formData);
                        formData = this.upload.getHiddenFields(this.upload.fileFields, formData);
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', this.upload.url);
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    xhr.onreadystatechange = $.proxy(function() {
                        if (xhr.readyState == 4) {
                            var data = xhr.responseText;
                            data = data.replace(/^\[/, '');
                            data = data.replace(/\]$/, '');
                            var json;
                            try {
                                json = (typeof data === 'string' ? $.parseJSON(data) : data);
                            } catch (err) {
                                json = {
                                    error: true
                                };
                            }
                            this.progress.hide();
                            if (!this.upload.direct) {
                                this.upload.$droparea.removeClass('drag-drop');
                            }
                            this.upload.callback(json, this.upload.direct, e);
                        }
                    }, this);
                    xhr.send(formData);
                },
                onDrag: function(e) {
                    e.preventDefault();
                    this.upload.$droparea.addClass('drag-hover');
                },
                onDragLeave: function(e) {
                    e.preventDefault();
                    this.upload.$droparea.removeClass('drag-hover');
                },
                clearImageFields: function() {
                    this.upload.imageFields = {};
                },
                addImageFields: function(name, value) {
                    this.upload.imageFields[name] = value;
                },
                removeImageFields: function(name) {
                    delete this.upload.imageFields[name];
                },
                clearFileFields: function() {
                    this.upload.fileFields = {};
                },
                addFileFields: function(name, value) {
                    this.upload.fileFields[name] = value;
                },
                removeFileFields: function(name) {
                    delete this.upload.fileFields[name];
                },
                s3uploadFile: function(file) {
                    this.upload.s3executeOnSignedUrl(file, $.proxy(function(signedURL) {
                        this.upload.s3uploadToS3(file, signedURL);
                    }, this));
                },
                s3executeOnSignedUrl: function(file, callback) {
                    var xhr = new XMLHttpRequest();
                    var mark = (this.opts.s3.search(/\?/) !== '-1') ? '?' : '&';
                    xhr.open('GET', this.opts.s3 + mark + 'name=' + file.name + '&type=' + file.type, true);
                    if (xhr.overrideMimeType) xhr.overrideMimeType('text/plain; charset=x-user-defined');
                    var that = this;
                    xhr.onreadystatechange = function(e) {
                        if (this.readyState == 4 && this.status == 200) {
                            that.progress.show();
                            callback(decodeURIComponent(this.responseText));
                        } else if (this.readyState == 4 && this.status != 200) {}
                    };
                    xhr.send();
                },
                s3createCORSRequest: function(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {
                        xhr.open(method, url, true);
                    } else if (typeof XDomainRequest != "undefined") {
                        xhr = new XDomainRequest();
                        xhr.open(method, url);
                    } else {
                        xhr = null;
                    }
                    return xhr;
                },
                s3uploadToS3: function(file, url) {
                    var xhr = this.upload.s3createCORSRequest('PUT', url);
                    if (!xhr) {} else {
                        xhr.onload = $.proxy(function() {
                            if (xhr.status == 200) {
                                this.progress.hide();
                                var s3file = url.split('?');
                                if (!s3file[0]) {
                                    return false;
                                }
                                if (!this.upload.direct) {
                                    this.upload.$droparea.removeClass('drag-drop');
                                }
                                var json = {
                                    filelink: s3file[0]
                                };
                                if (this.upload.type == 'file') {
                                    var arr = s3file[0].split('/');
                                    json.filename = arr[arr.length - 1];
                                }
                                this.upload.callback(json, this.upload.direct, false);
                            } else {}
                        }, this);
                        xhr.onerror = function() {};
                        xhr.upload.onprogress = function(e) {};
                        xhr.setRequestHeader('Content-Type', file.type);
                        xhr.setRequestHeader('x-amz-acl', 'public-read');
                        xhr.send(file);
                    }
                }
            };
        },
        utils: function() {
            return {
                isMobile: function() {
                    return /(iPhone|iPod|BlackBerry|Android)/.test(navigator.userAgent);
                },
                isDesktop: function() {
                    return !/(iPhone|iPod|iPad|BlackBerry|Android)/.test(navigator.userAgent);
                },
                isString: function(obj) {
                    return Object.prototype.toString.call(obj) == '[object String]';
                },
                isEmpty: function(html, removeEmptyTags) {
                    html = html.replace(/[\u200B-\u200D\uFEFF]/g, '');
                    html = html.replace(/&nbsp;/gi, '');
                    html = html.replace(/<\/?br\s?\/?>/g, '');
                    html = html.replace(/\s/g, '');
                    html = html.replace(/^<p>[^\W\w\D\d]*?<\/p>$/i, '');
                    html = html.replace(/<iframe(.*?[^>])>$/i, 'iframe');
                    html = html.replace(/<source(.*?[^>])>$/i, 'source');
                    if (removeEmptyTags !== false) {
                        html = html.replace(/<[^\/>][^>]*><\/[^>]+>/gi, '');
                        html = html.replace(/<[^\/>][^>]*><\/[^>]+>/gi, '');
                    }
                    html = $.trim(html);
                    return html === '';
                },
                normalize: function(str) {
                    if (typeof(str) === 'undefined') return 0;
                    return parseInt(str.replace('px', ''), 10);
                },
                hexToRgb: function(hex) {
                    if (typeof hex == 'undefined') return;
                    if (hex.search(/^#/) == -1) return hex;
                    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                        return r + r + g + g + b + b;
                    });
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return 'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')';
                },
                getOuterHtml: function(el) {
                    return $('<div>').append($(el).eq(0).clone()).html();
                },
                getAlignmentElement: function(el) {
                    if ($.inArray(el.tagName, this.opts.alignmentTags) !== -1) {
                        return $(el);
                    } else {
                        return $(el).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
                    }
                },
                removeEmptyAttr: function(el, attr) {
                    var $el = $(el);
                    if (typeof $el.attr(attr) == 'undefined') {
                        return true;
                    }
                    if ($el.attr(attr) === '') {
                        $el.removeAttr(attr);
                        return true;
                    }
                    return false;
                },
                removeEmpty: function(i, s) {
                    var $s = $($.parseHTML(s));
                    $s.find('.redactor-invisible-space').removeAttr('style').removeAttr('class');
                    if ($s.find('hr, br, img, iframe, source').length !== 0) return;
                    var text = $.trim($s.text());
                    if (this.utils.isEmpty(text, false)) {
                        $s.remove();
                    }
                },
                saveScroll: function() {
                    this.saveEditorScroll = this.$editor.scrollTop();
                    this.saveBodyScroll = $(window).scrollTop();
                    if (this.opts.scrollTarget) this.saveTargetScroll = $(this.opts.scrollTarget).scrollTop();
                },
                restoreScroll: function() {
                    if (typeof this.saveScroll === 'undefined' && typeof this.saveBodyScroll === 'undefined') return;
                    $(window).scrollTop(this.saveBodyScroll);
                    this.$editor.scrollTop(this.saveEditorScroll);
                    if (this.opts.scrollTarget) $(this.opts.scrollTarget).scrollTop(this.saveTargetScroll);
                },
                createSpaceElement: function() {
                    var space = document.createElement('span');
                    space.className = 'redactor-invisible-space';
                    space.innerHTML = this.opts.invisibleSpace;
                    return space;
                },
                removeInlineTags: function(node) {
                    var tags = this.opts.inlineTags;
                    tags.push('span');
                    if (node.tagName == 'PRE') tags.push('a');
                    $(node).find(tags.join(',')).not('span.redactor-selection-marker').contents().unwrap();
                },
                replaceWithContents: function(node, removeInlineTags) {
                    var self = this;
                    $(node).replaceWith(function() {
                        if (removeInlineTags === true) self.utils.removeInlineTags(this);
                        return $(this).contents();
                    });
                    return $(node);
                },
                replaceToTag: function(node, tag, removeInlineTags) {
                    var replacement;
                    var self = this;
                    $(node).replaceWith(function() {
                        replacement = $('<' + tag + ' />').append($(this).contents());
                        for (var i = 0; i < this.attributes.length; i++) {
                            replacement.attr(this.attributes[i].name, this.attributes[i].value);
                        }
                        if (removeInlineTags === true) self.utils.removeInlineTags(replacement);
                        return replacement;
                    });
                    return replacement;
                },
                isStartOfElement: function() {
                    var block = this.selection.getBlock();
                    if (!block) return false;
                    var offset = this.caret.getOffsetOfElement(block);
                    return (offset === 0) ? true : false;
                },
                isEndOfElement: function(element) {
                    if (typeof element == 'undefined') {
                        var element = this.selection.getBlock();
                        if (!element) return false;
                    }
                    var offset = this.caret.getOffsetOfElement(element);
                    var text = $.trim($(element).text()).replace(/\n\r\n/g, '');
                    return (offset == text.length) ? true : false;
                },
                isStartOfEditor: function() {
                    var offset = this.caret.getOffsetOfElement(this.$editor[0]);
                    return (offset === 0) ? true : false;
                },
                isEndOfEditor: function() {
                    var block = this.$editor[0];
                    var offset = this.caret.getOffsetOfElement(block);
                    var text = $.trim($(block).html().replace(/(<([^>]+)>)/gi, ''));
                    return (offset == text.length) ? true : false;
                },
                isBlock: function(block) {
                    block = block[0] || block;
                    return block && this.utils.isBlockTag(block.tagName);
                },
                isBlockTag: function(tag) {
                    if (typeof tag == 'undefined') return false;
                    return this.reIsBlock.test(tag);
                },
                isTag: function(current, tag) {
                    var element = $(current).closest(tag, this.$editor[0]);
                    if (element.length == 1) {
                        return element[0];
                    }
                    return false;
                },
                isSelectAll: function() {
                    return this.selectAll;
                },
                enableSelectAll: function() {
                    this.selectAll = true;
                },
                disableSelectAll: function() {
                    this.selectAll = false;
                },
                isRedactorParent: function(el) {
                    if (!el) {
                        return false;
                    }
                    if ($(el).parents('.redactor-editor').length === 0 || $(el).hasClass('redactor-editor')) {
                        return false;
                    }
                    return el;
                },
                isCurrentOrParentHeader: function() {
                    return this.utils.isCurrentOrParent(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
                },
                isCurrentOrParent: function(tagName) {
                    var parent = this.selection.getParent();
                    var current = this.selection.getCurrent();
                    if ($.isArray(tagName)) {
                        var matched = 0;
                        $.each(tagName, $.proxy(function(i, s) {
                            if (this.utils.isCurrentOrParentOne(current, parent, s)) {
                                matched++;
                            }
                        }, this));
                        return (matched === 0) ? false : true;
                    } else {
                        return this.utils.isCurrentOrParentOne(current, parent, tagName);
                    }
                },
                isCurrentOrParentOne: function(current, parent, tagName) {
                    tagName = tagName.toUpperCase();
                    return parent && parent.tagName === tagName ? parent : current && current.tagName === tagName ? current : false;
                },
                isOldIe: function() {
                    return (this.utils.browser('msie') && parseInt(this.utils.browser('version'), 10) < 9) ? true : false;
                },
                isLessIe10: function() {
                    return (this.utils.browser('msie') && parseInt(this.utils.browser('version'), 10) < 10) ? true : false;
                },
                isIe11: function() {
                    return !!navigator.userAgent.match(/Trident\/7\./);
                },
                browser: function(browser) {
                    var ua = navigator.userAgent.toLowerCase();
                    var match = /(opr)[\/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
                    if (browser == 'safari') return (typeof match[3] != 'undefined') ? match[3] == 'safari' : false;
                    if (browser == 'version') return match[2];
                    if (browser == 'webkit') return (match[1] == 'chrome' || match[1] == 'opr' || match[1] == 'webkit');
                    if (match[1] == 'rv') return browser == 'msie';
                    if (match[1] == 'opr') return browser == 'webkit';
                    return browser == match[1];
                },
                strpos: function(haystack, needle, offset) {
                    var i = haystack.indexOf(needle, offset);
                    return i >= 0 ? i : false;
                },
                disableBodyScroll: function() {
                    var $body = $('html');
                    var windowWidth = window.innerWidth;
                    if (!windowWidth) {
                        var documentElementRect = document.documentElement.getBoundingClientRect();
                        windowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
                    }
                    var isOverflowing = document.body.clientWidth < windowWidth;
                    var scrollbarWidth = this.utils.measureScrollbar();
                    $body.css('overflow', 'hidden');
                    if (isOverflowing) $body.css('padding-right', scrollbarWidth);
                },
                measureScrollbar: function() {
                    var $body = $('body');
                    var scrollDiv = document.createElement('div');
                    scrollDiv.className = 'redactor-scrollbar-measure';
                    $body.append(scrollDiv);
                    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                    $body[0].removeChild(scrollDiv);
                    return scrollbarWidth;
                },
                enableBodyScroll: function() {
                    $('html').css({
                        'overflow': '',
                        'padding-right': ''
                    });
                    $('body').remove('redactor-scrollbar-measure');
                }
            };
        }
    };
    $(window).on('load.tools.redactor', function() {
        $('[data-tools="redactor"]').redactor();
    });
    Redactor.prototype.init.prototype = Redactor.prototype;
})(jQuery);
(function($) {
    $.Redactor.opts.langs['ru'] = {
        html: 'Êîä',
        video: 'Âèäåî',
        image: 'Èçîáðàæåíèå',
        table: 'Òàáëèöà',
        link: 'Ññûëêà',
        link_insert: 'Âñòàâèòü ññûëêó ...',
        link_edit: 'Èçìåíèòü ññûëêó',
        unlink: 'Óäàëèòü ññûëêó',
        formatting: 'Ôîðìàòèðîâàíèå',
        paragraph: 'Îáû÷íûé òåêñò',
        quote: 'Öèòàòà',
        code: 'Êîä',
        header1: 'Çàãîëîâîê 1',
        header2: 'Çàãîëîâîê 2',
        header3: 'Çàãîëîâîê 3',
        header4: 'Çàãîëîâîê 4',
        header5: 'Çàãîëîâîê 5',
        bold: 'Ïîëóæèðíûé',
        italic: 'Íàêëîííûé',
        fontcolor: 'Öâåò òåêñòà',
        backcolor: 'Çàëèâêà òåêñòà',
        unorderedlist: 'Îáû÷íûé ñïèñîê',
        orderedlist: 'Íóìåðîâàííûé ñïèñîê',
        outdent: 'Óìåíüøèòü îòñòóï',
        indent: 'Óâåëè÷èòü îòñòóï',
        cancel: 'Îòìåíèòü',
        insert: 'Âñòàâèòü',
        save: 'Ñîõðàíèòü',
        _delete: 'Óäàëèòü',
        insert_table: 'Âñòàâèòü òàáëèöó',
        insert_row_above: 'Äîáàâèòü ñòðîêó ñâåðõó',
        insert_row_below: 'Äîáàâèòü ñòðîêó ñíèçó',
        insert_column_left: 'Äîáàâèòü ñòîëáåö ñëåâà',
        insert_column_right: 'Äîáàâèòü ñòîëáåö ñïðàâà',
        delete_column: 'Óäàëèòü ñòîëáåö',
        delete_row: 'Óäàëèòü ñòðîêó',
        delete_table: 'Óäàëèòü òàáëèöó',
        rows: 'Ñòðîêè',
        columns: 'Ñòîëáöû',
        add_head: 'Äîáàâèòü çàãîëîâîê',
        delete_head: 'Óäàëèòü çàãîëîâîê',
        title: 'Ïîäñêàçêà',
        image_position: 'Îáòåêàíèå òåêñòîì',
        none: 'Íåò',
        left: 'Cëåâà',
        right: 'Cïðàâà',
        image_web_link: 'Cñûëêà íà èçîáðàæåíèå',
        text: 'Òåêñò',
        mailto: 'Ýë. ïî÷òà',
        web: 'URL',
        video_html_code: 'Êîä âèäåî ðîëèêà',
        file: 'Ôàéë',
        upload: 'Çàãðóçèòü',
        download: 'Ñêà÷àòü',
        choose: 'Âûáðàòü',
        or_choose: 'Èëè âûáåðèòå',
        drop_file_here: 'Ïåðåòàùèòå ôàéë ñþäà',
        align_left: 'Ïî ëåâîìó êðàþ',
        align_center: 'Ïî öåíòðó',
        align_right: 'Ïî ïðàâîìó êðàþ',
        align_justify: 'Âûðîâíÿòü òåêñò ïî øèðèíå',
        horizontalrule: 'Ãîðèçîíòàëüíàÿ ëèíåéêà',
        fullscreen: 'Âî âåñü ýêðàí',
        deleted: 'Çà÷åðêíóòûé',
        anchor: 'ßêîðü',
        link_new_tab: 'Îòêðûâàòü â íîâîé âêëàäêå',
        underline: 'Ïîä÷åðêíóòûé',
        alignment: 'Âûðàâíèâàíèå',
        filename: 'Íàçâàíèå (íåîáÿçàòåëüíî)',
        edit: 'Ðåä.',
        center: 'Ïî öåíòðó'
    };
})(jQuery);
(function($) {
    $.Redactor.opts.langs['es'] = {
        html: 'HTML',
        video: 'Insertar video...',
        image: 'Insertar imagen...',
        table: 'Tabla',
        link: 'Enlace',
        link_insert: 'Insertar enlace ...',
        link_edit: 'Editar enlace',
        unlink: 'Desenlazar',
        formatting: 'Estilos',
        paragraph: 'Texto normal',
        quote: 'Cita',
        code: 'C?digo',
        header1: 'Cabecera 1',
        header2: 'Cabecera 2',
        header3: 'Cabecera 3',
        header4: 'Cabecera 4',
        header5: 'Cabecera 5',
        bold: 'Negrita',
        italic: 'It?lica',
        fontcolor: 'Color de fuente',
        backcolor: 'Color de fondo',
        unorderedlist: 'Lista desordenada',
        orderedlist: 'Lista ordenada',
        outdent: 'Disminuir sangrado',
        indent: 'Aumentar sangrado',
        cancel: 'Cancelar',
        insert: 'Insertar',
        save: 'Guardar',
        _delete: 'Borrar',
        insert_table: 'Insertar tabla...',
        insert_row_above: 'A?adir fila encima',
        insert_row_below: 'A?adir fila debajo',
        insert_column_left: 'A?adir columna a la izquierda',
        insert_column_right: 'A?adir column a la derecha',
        delete_column: 'Borrar columna',
        delete_row: 'Borrar fila',
        delete_table: 'Borrar tabla',
        rows: 'Filas',
        columns: 'Columnas',
        add_head: 'A?adir cabecera',
        delete_head: 'Borrar cabecera',
        title: 'T?tulo',
        image_position: 'Posici?n',
        none: 'Ninguna',
        left: 'Izquierda',
        right: 'Derecha',
        image_web_link: 'Enlace web de la im?gen',
        text: 'Texto',
        mailto: 'Email',
        web: 'URL',
        video_html_code: 'C?digo de inserci?n de video',
        file: 'Insertar archivo...',
        upload: 'Cargar',
        download: 'Descargar',
        choose: 'Elegir',
        or_choose: 'O elegir',
        drop_file_here: 'Arrastra y suelta el archivo aqui',
        align_left: 'Alinear texto a la izquierda',
        align_center: 'Centrar texto',
        align_right: 'Alinear texto a la derecha',
        align_justify: 'Justificar texto',
        horizontalrule: 'Insertar l?nea horizontal',
        deleted: 'Borrado',
        anchor: 'Anchor',
        link_new_tab: 'Abrir enlace en una nueva pesta?a',
        underline: 'Subrayado',
        alignment: 'Alineaci?n',
        filename: 'Nombre (opcional)',
        edit: 'Editar',
        center: 'Center'
    };
})(jQuery);
(function($) {
    $.Redactor.opts.langs['fr'] = {
        html: 'Code HTML',
        video: 'Ins?rer une vid?o...',
        image: 'Ins?rer une image...',
        table: 'Tableau',
        link: 'Lien',
        link_insert: 'Ins?rer un lien...',
        link_edit: 'Modifier le lien',
        unlink: 'Supprimer le lien',
        formatting: 'Styles',
        paragraph: 'Paragraphe',
        quote: 'Citation',
        code: 'Code',
        header1: 'Titre 1',
        header2: 'Titre 2',
        header3: 'Titre 3',
        header4: 'Titre 4',
        header5: 'Titre 5',
        bold: 'Gras',
        italic: 'Italique',
        fontcolor: 'Couleur du texte',
        backcolor: 'Couleur d\'arri?re plan du texte',
        unorderedlist: 'Liste ? puces',
        orderedlist: 'Liste num?rot?e',
        outdent: 'Diminuer le retrait',
        indent: 'Augmenter le retrait',
        cancel: 'Annuler',
        insert: 'Ins?rer',
        save: 'Enregistrer',
        _delete: 'Supprimer',
        insert_table: 'Ins?rer un tableau...',
        insert_row_above: 'Ajouter une rang?e au-dessus',
        insert_row_below: 'Ajouter une rang?e en-dessous',
        insert_column_left: 'Ajouter une colonne ? gauche',
        insert_column_right: 'Ajouter une colonne ? droite',
        delete_column: 'Supprimer la colonne',
        delete_row: 'Supprimer la rang?e',
        delete_table: 'Supprimer le tableau',
        rows: 'Rang?es',
        columns: 'Colonnes',
        add_head: 'Ajouter un en-t?te',
        delete_head: 'Supprimer l\'en-t?te',
        title: 'Titre',
        image_position: 'Position',
        none: 'Aucun',
        left: 'Gauche',
        right: 'Droite',
        image_web_link: 'Adresse URL de l\'image',
        text: 'Texte',
        mailto: 'Courriel',
        web: 'Adresse URL',
        video_html_code: 'Code d\'int?gration du video',
        file: 'Ins?rer un fichier...',
        upload: 'T?l?verser',
        download: 'T?l?charger',
        choose: 'Choisir',
        or_choose: 'Ou choisissez',
        drop_file_here: 'D?posez le fichier ici',
        align_left: 'Aligner ? gauche',
        align_center: 'Aligner au centre',
        align_right: 'Aligner ? droite',
        align_justify: 'Justifier',
        horizontalrule: 'Ins?rer une ligne horizontale',
        deleted: 'Supprim?',
        anchor: 'Ancre',
        link_new_tab: 'Ouvrir le lien dans un nouvel onglet',
        underline: 'Souligner',
        alignment: 'Alignement',
        filename: 'Nom de fichier (optionnel)',
        edit: 'Modifier',
        center: 'Center'
    };
})(jQuery);
(function($) {
    $.Redactor.opts.langs['de'] = {
        html: 'HTML',
        video: 'Video',
        image: 'Bilder',
        table: 'Tabelle',
        link: 'Link',
        link_insert: 'Link einf?gen ...',
        link_edit: 'Link bearbeiten',
        unlink: 'Link entfernen',
        formatting: 'Formatvorlagen',
        paragraph: 'Absatz',
        quote: 'Zitat',
        code: 'Code',
        header1: '?berschrift 1',
        header2: '?berschrift 2',
        header3: '?berschrift 3',
        header4: '?berschrift 4',
        header5: '?berschrift 5',
        bold: 'Fett',
        italic: 'Kursiv',
        fontcolor: 'Schriftfarbe',
        backcolor: 'Texthervorhebungsfarbe',
        unorderedlist: 'Aufz?hlungszeichen',
        orderedlist: 'Nummerierung',
        outdent: 'Einzug verkleinern',
        indent: 'Einzug vergr??ern',
        redo: 'Wiederholen',
        undo: 'R?ckg?ngig',
        cut: 'Ausschneiden',
        cancel: 'Abbrechen',
        insert: 'Einf?gen',
        save: 'Speichern',
        _delete: 'L?schen',
        insert_table: 'Tabelle einf?gen',
        insert_row_above: 'Zeile oberhalb einf?gen',
        insert_row_below: 'Zeile unterhalb einf?gen',
        insert_column_left: 'Spalte links einf?gen',
        insert_column_right: 'Spalte rechts einf?gen',
        delete_column: 'Spalte l?schen',
        delete_row: 'Zeile l?schen',
        delete_table: 'Tabelle l?schen',
        rows: 'Zeilen',
        columns: 'Spalten',
        add_head: 'Titel einf?gen',
        delete_head: 'Titel entfernen',
        title: 'Title',
        image_view: 'Bilder',
        image_position: 'Textumbruch',
        none: 'Keine',
        left: 'Links',
        right: 'Rechts',
        image_web_link: 'Bilder-Link',
        text: 'Text',
        mailto: 'Email',
        web: 'URL',
        video_html_code: 'Video-Einbettungscode',
        file: 'Datei',
        upload: 'Hochladen',
        download: 'Download',
        choose: 'Ausw?hlen',
        or_choose: 'Oder, w?hlen Sie eine Datei aus',
        drop_file_here: 'Ziehen Sie eine Datei hier hin',
        align_left: 'Linksb?ndig',
        align_center: 'Mitte',
        align_right: 'Rechtsb?ndig',
        align_justify: 'Blocksatz',
        horizontalrule: 'Horizontale Linie',
        fullscreen: 'Vollbild',
        deleted: 'Durchgestrichen',
        anchor: 'Anker',
        link_new_tab: 'Link in neuem Tab ?ffnen',
        underline: 'Unterstrichen',
        alignment: 'Ausrichtung',
        filename: 'Name (optional)',
        edit: 'Bearbeiten',
        center: 'Center'
    };
})(jQuery);
(function($) {
    $.Redactor.opts.langs['nl'] = {
        html: 'HTML',
        video: 'Video',
        image: 'Afbeelding',
        table: 'Tabel',
        link: 'Link',
        link_insert: 'Link invoegen...',
        link_edit: 'Edit link',
        unlink: 'Link ontkoppelen',
        formatting: 'Stijlen',
        paragraph: 'Paragraaf',
        quote: 'Citaat',
        code: 'Code',
        header1: 'Kop 1',
        header2: 'Kop 2',
        header3: 'Kop 3',
        header4: 'Kop 4',
        header5: 'Kop 5',
        bold: 'Vet',
        italic: 'Cursief',
        fontcolor: 'Tekstkleur',
        backcolor: 'Achtergrondkleur',
        unorderedlist: 'Ongeordende lijst',
        orderedlist: 'Geordende lijst',
        outdent: 'Uitspringen',
        indent: 'Inspringen',
        redo: 'Opnieuw maken',
        undo: 'Ongedaan maken',
        cut: 'Knippen',
        cancel: 'Annuleren',
        insert: 'Invoegen',
        save: 'Opslaan',
        _delete: 'Verwijderen',
        insert_table: 'Tabel invoegen',
        insert_row_above: 'Rij hierboven invoegen',
        insert_row_below: 'Rij hieronder invoegen',
        insert_column_left: 'Kolom links toevoegen',
        insert_column_right: 'Kolom rechts toevoegen',
        delete_column: 'Verwijder kolom',
        delete_row: 'Verwijder rij',
        delete_table: 'Verwijder tabel',
        rows: 'Rijen',
        columns: 'Kolommen',
        add_head: 'Titel toevoegen',
        delete_head: 'Titel verwijderen',
        title: 'Titel',
        image_position: 'Positie',
        none: 'geen',
        left: 'links',
        right: 'rechts',
        image_web_link: 'Afbeelding link',
        text: 'Tekst',
        mailto: 'Email',
        web: 'URL',
        video_html_code: 'Video embed code',
        file: 'Bestand',
        upload: 'Uploaden',
        download: 'Downloaden',
        choose: 'Kies',
        or_choose: 'Of kies',
        drop_file_here: 'Sleep bestand hier',
        align_left: 'Links uitlijnen',
        align_center: 'Centreren',
        align_right: 'Rechts uitlijnen',
        align_justify: 'Uitvullen',
        horizontalrule: 'Horizontale lijn',
        fullscreen: 'Volledig scherm',
        deleted: 'Verwijderd',
        anchor: 'Anker',
        link_new_tab: 'Open link in nieuw tabblad',
        underline: 'Onderstrepen',
        alignment: 'Uitlijning',
        filename: 'Naam (optioneel)',
        edit: 'Bewerk',
        center: 'Center'
    };
})(jQuery);
(function($) {
    $.Redactor.opts.langs['ua'] = {
        html: 'Êîä',
        video: 'Â³äåî',
        image: 'Çîáðàæåííÿ',
        table: 'Òàáëèöÿ',
        link: 'Ïîñèëàííÿ',
        link_insert: 'Âñòàâèòè ïîñèëàííÿ ...',
        link_edit: 'Edit link',
        unlink: 'Âèäàëèòè ïîñèëàííÿ',
        formatting: 'Ñòèë³',
        paragraph: 'Çâè÷àéíèé òåêñò',
        quote: 'Öèòàòà',
        code: 'Êîä',
        header1: 'Çàãîëîâîê 1',
        header2: 'Çàãîëîâîê 2',
        header3: 'Çàãîëîâîê 3',
        header4: 'Çàãîëîâîê 4',
        header5: 'Çàãîëîâîê 5',
        bold: 'Æèðíèé',
        italic: 'Ïîõèëèé',
        fontcolor: 'Êîë³ð òåêñòó',
        backcolor: 'Çàëèâêà òåêñòó',
        unorderedlist: 'Çâè÷àéíèé ñïèñîê',
        orderedlist: 'Íóìåðîâàíèé ñïèñîê',
        outdent: 'Çìåíøèòè â³äñòóï',
        indent: 'Çá³ëüøèòè â³äñòóï',
        cancel: 'Ñêàñóâàòè',
        insert: 'Âñòàâèòè',
        save: 'Çáåðåãòè',
        _delete: 'Âèäàëèòè',
        insert_table: 'Âñòàâèòè òàáëèöþ',
        insert_row_above: 'Äîäàòè ðÿäîê çâåðõó',
        insert_row_below: 'Äîäàòè ðÿäîê çíèçó',
        insert_column_left: 'Äîäàòè ñòîâïåöü ë³âîðó÷',
        insert_column_right: 'Äîäàòè ñòîâïåöü ïðàâîðó÷',
        delete_column: 'Âèäàëèòè ñòîâïåöü',
        delete_row: 'Âèäàëèòè ðÿäîê',
        delete_table: 'Âèäàëèòè òàáëèöþ',
        rows: 'Ðÿäêè',
        columns: 'Ñòîâïö³',
        add_head: 'Äîäàòè çàãîëîâîê',
        delete_head: 'Âèäàëèòè çàãîëîâîê',
        title: 'Ï³äêàçêà',
        image_view: 'Çàâàíòàæèòè çîáðàæåííÿ',
        image_position: 'Îáò³êàííÿ òåêñòîì',
        none: 'í³',
        left: 'ë³âîðó÷',
        right: 'ïðàâîðó÷',
        image_web_link: 'Ïîñèëàííÿ íà çîáðàæåííÿ',
        text: 'Òåêñò',
        mailto: 'Åë. ïîøòà',
        web: 'URL',
        video_html_code: 'Êîä â³äåî ðîëèêà',
        file: 'Ôàéë',
        upload: 'Çàâàíòàæèòè',
        download: 'Çàâàíòàæèòè',
        choose: 'Âèáðàòè',
        or_choose: 'Àáî âèáåð³òü',
        drop_file_here: 'Ïåðåòÿãí³òü ôàéë ñþäè',
        align_left: 'Ïî ë³âîìó êðàþ',
        align_center: 'Ïî öåíòðó',
        align_right: 'Ïî ïðàâîìó êðàþ',
        align_justify: 'Âèð³âíÿòè òåêñò ïî øèðèí³',
        horizontalrule: 'Ãîðèçîíòàëüíàÿ ë³í³éêà',
        fullscreen: 'Íà âåñü åêðàí',
        deleted: 'Çàêðåñëåíèé',
        anchor: 'Anchor',
        link_new_tab: 'Open link in new tab',
        underline: 'Underline',
        alignment: 'Alignment',
        filename: 'Name (optional)',
        edit: 'Edit',
        center: 'Center'
    };
})(jQuery);
(function($) {
    $.Redactor.opts.langs['ca'] = {
        html: 'HTML',
        video: 'Inserta V?deo...',
        image: 'Inserta Imatge...',
        table: 'Taula',
        link: 'Enlla?',
        link_insert: 'Inserta Enlla? ...',
        link_edit: 'Edit link',
        unlink: 'Elimina enlla?',
        formatting: 'Formateja',
        paragraph: 'Par?graf',
        quote: 'Cita',
        code: 'Codi',
        header1: 'Cap?alera 1',
        header2: 'Cap?alera 2',
        header3: 'Cap?alera 3',
        header4: 'Cap?alera 4',
        header5: 'Cap?alera 5',
        bold: 'Negreta',
        italic: 'Cursiva',
        fontcolor: 'Color de la lletra',
        backcolor: 'Color del fons',
        unorderedlist: 'Llista sense ordenar',
        orderedlist: 'Llista ordenada',
        outdent: 'Treure indentaci?',
        indent: 'Indentar',
        cancel: 'Cancel·lar',
        insert: 'Insertar',
        save: 'Desar',
        _delete: 'Eliminar',
        insert_table: 'Insertar Taula...',
        insert_row_above: 'Insertar fila superior',
        insert_row_below: 'Insertar fila inferior',
        insert_column_left: 'Insertar columna a l\'esquerra',
        insert_column_right: 'Insertar columna a la dreta',
        delete_column: 'Eliminar Columna',
        delete_row: 'Eliminar Fila',
        delete_table: 'Eliminar Taula',
        rows: 'Files',
        columns: 'Columnes',
        add_head: 'Incloure cap?alera',
        delete_head: 'Eliminar cap?alera',
        title: 'T?tol',
        image_position: 'Posici?',
        none: 'Cap',
        left: 'Esquerra',
        right: 'Dreta',
        image_web_link: 'Enlla? web a imatge',
        text: 'Text',
        mailto: 'Direcci? de correu',
        web: 'URL',
        video_html_code: 'Codi de v?deo inserit',
        file: 'Insertar Fitxer...',
        upload: 'Pujar',
        download: 'Descarregar',
        choose: 'Escull',
        or_choose: 'O escull',
        drop_file_here: 'Arrosega el fitxer fins aqu?',
        align_left: 'Alinear a l\'esquerra',
        align_center: 'Alinear al centre',
        align_right: 'Alinear a la dreta',
        align_justify: 'Justificar',
        horizontalrule: 'Insertar l?nia horitzontal',
        deleted: 'Eliminar',
        anchor: '?ncora',
        link_new_tab: 'Obrir enlla? en una nova pestanya',
        underline: 'Underline',
        alignment: 'Alignment',
        filename: 'Name (optional)',
        edit: 'Edit',
        center: 'Center'
    };
})(jQuery);
(function($) {
    $.Redactor.opts.langs['pl'] = {
        html: '?r?d?o',
        video: 'Wideo',
        image: 'Obrazek',
        table: 'Tabela',
        link: 'Link',
        link_insert: 'Wstaw link ...',
        link_edit: 'Edit link',
        unlink: 'Usu? link',
        formatting: 'Style',
        paragraph: 'Zwyk?y tekst',
        quote: 'Cytat',
        code: 'Kod ?r?d?owy',
        header1: 'Nag??wek 1',
        header2: 'Nag??wek 2',
        header3: 'Nag??wek 3',
        header4: 'Nag??wek 4',
        header5: 'Nag??wek 5',
        bold: 'Pogrubiony',
        italic: 'Pochylony',
        fontcolor: 'Kolor tekstu',
        backcolor: 'Kolor t?a',
        unorderedlist: 'Wypunktowanie',
        orderedlist: 'Numeracja',
        outdent: 'Zwi?ksz wci?cie',
        indent: 'Zmniejsz wci?cie',
        cancel: 'Anuluj',
        insert: 'Wstaw',
        save: 'Zachowaj',
        _delete: 'Usu?',
        insert_table: 'Wstaw tabele',
        insert_row_above: 'Dodaj wiersz na g?rze',
        insert_row_below: 'Dodaj wiersz na dole',
        insert_column_left: 'Dodaj kolumn? po lewej',
        insert_column_right: 'Dodaj kolumn? po prawej',
        delete_column: 'Usu? kolumn?',
        delete_row: 'Usu? wiersz',
        delete_table: 'Usu? tabele',
        rows: 'Wiersze',
        columns: 'Kolumny',
        add_head: 'Dodaj nag??wek',
        delete_head: 'Usu? nag??wek',
        title: 'Wskaz?wka',
        image_position: 'Obramowanie',
        none: 'nie ma',
        left: 'od lewej',
        right: 'od prawej',
        image_web_link: 'albo link do obrazku',
        text: 'Tekst',
        mailto: 'Poczta e-mail',
        web: 'URL',
        video_html_code: 'Kod ?r?d?owy pliku wideo',
        file: 'Plik',
        upload: 'Wgraj na serwer',
        download: 'Pobierz',
        choose: 'Wybierz z listy',
        or_choose: 'lub wybierz',
        drop_file_here: 'Przenie? plik tutaj',
        align_left: 'Tekst do lewej',
        align_center: 'Wy?rodkuj',
        align_right: 'Tekst do prawej',
        align_justify: 'Wyjustuj',
        horizontalrule: 'Linia pozioma',
        fullscreen: 'Pe?ny ekran',
        deleted: 'Usuni?ty',
        anchor: 'Kotwica',
        link_new_tab: 'Otw?rz link w nowym oknie',
        underline: 'Pokdre?lony',
        alignment: 'Wyr?wnanie',
        filename: 'Name (optional)',
        edit: 'Edit',
        center: 'Center'
    };
})(jQuery);
(function($) {
    $.Redactor.opts.langs['ko'] = {
        html: 'HTML',
        video: '???',
        image: '???',
        table: '?',
        link: '??',
        link_insert: '?? ??',
        link_edit: '?? ??',
        unlink: '?? ??',
        formatting: '???',
        paragraph: '??',
        quote: '??',
        code: '??',
        header1: '?? 1',
        header2: '?? 2',
        header3: '?? 3',
        header4: '?? 4',
        header5: '?? 5',
        bold: '??',
        italic: '????',
        fontcolor: '???',
        backcolor: '???',
        unorderedlist: '?????',
        orderedlist: '?????',
        outdent: '????',
        indent: '????',
        cancel: '??',
        insert: '??',
        save: '??',
        _delete: '??',
        insert_table: '? ??',
        insert_row_above: '?? ?? ??',
        insert_row_below: '?? ??? ??',
        insert_column_left: '?? ??? ??',
        insert_column_right: '?? ???? ??',
        delete_column: '?? ??',
        delete_row: '? ??',
        delete_table: '? ??',
        rows: '?',
        columns: '?',
        add_head: '? ?? ??',
        delete_head: '? ?? ??',
        title: '??',
        image_position: '??? ??',
        none: '??',
        left: '??',
        right: '???',
        image_web_link: '??? ??',
        text: '???',
        mailto: '??',
        web: 'URL',
        video_html_code: '??? ??(embed) ??',
        file: '??',
        upload: '???',
        download: '????',
        choose: '??',
        or_choose: '?? ??',
        drop_file_here: '??? ??? ??',
        align_left: '????',
        align_center: '?????',
        align_right: '?????',
        align_justify: '??????',
        horizontalrule: '???',
        fullscreen: '????',
        deleted: '???',
        anchor: '??',
        link_new_tab: '??? ??? ?? ??',
        underline: '??',
        alignment: '??',
        filename: '??? (??)',
        edit: '??',
        center: 'Center'
    };
})(jQuery);
(function($) {
    $.Redactor.prototype.video = function() {
        return {
            reUrlYoutube: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig,
            reUrlVimeo: /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,
            getTemplate: function() {
                return String() + '<section id="redactor-modal-video-insert">' + '<label>' + this.lang.get('video_html_code') + '</label>' + '<textarea id="redactor-insert-video-area" style="height: 160px;"></textarea>' + '</section>';
            },
            init: function() {
                var button = this.button.addAfter('image', 'video', this.lang.get('video'));
                this.button.addCallback(button, this.video.show);
            },
            show: function() {
                this.modal.addTemplate('video', this.video.getTemplate());
                this.modal.load('video', this.lang.get('video'), 700);
                this.modal.createCancelButton();
                var button = this.modal.createActionButton(this.lang.get('insert'));
                button.on('click', this.video.insert);
                this.selection.save();
                this.modal.show();
                $('#redactor-insert-video-area').focus();
            },
            insert: function() {
                var data = $('#redactor-insert-video-area').val();
                if (!data.match(/<iframe|<video/gi)) {
                    data = this.clean.stripTags(data);
                    var iframeStart = '<iframe style="width: 500px; height: 281px;" src="',
                        iframeEnd = '" frameborder="0" allowfullscreen></iframe>';
                    if (data.match(this.video.reUrlYoutube)) {
                        data = data.replace(this.video.reUrlYoutube, iframeStart + '//www.youtube.com/embed/$1' + iframeEnd);
                    } else if (data.match(this.video.reUrlVimeo)) {
                        data = data.replace(this.video.reUrlVimeo, iframeStart + '//player.vimeo.com/video/$2' + iframeEnd);
                    }
                }
                this.selection.restore();
                this.modal.close();
                var current = this.selection.getBlock() || this.selection.getCurrent();
                if (current) $(current).after(data);
                else {
                    this.insert.html(data);
                }
                this.code.sync();
            }
        };
    };
})(jQuery);
(function($) {
    $.Redactor.prototype.table = function() {
        return {
            getTemplate: function() {
                return String() + '<section id="redactor-modal-table-insert">' + '<label>' + this.lang.get('rows') + '</label>' + '<input type="text" size="5" value="2" id="redactor-table-rows" />' + '<label>' + this.lang.get('columns') + '</label>' + '<input type="text" size="5" value="3" id="redactor-table-columns" />' + '</section>';
            },
            init: function() {
                var dropdown = {};
                dropdown.insert_table = {
                    title: this.lang.get('insert_table'),
                    func: this.table.show,
                    observe: {
                        element: 'table',
                        in : {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.insert_row_above = {
                    title: this.lang.get('insert_row_above'),
                    func: this.table.addRowAbove,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.insert_row_below = {
                    title: this.lang.get('insert_row_below'),
                    func: this.table.addRowBelow,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.insert_row_below = {
                    title: this.lang.get('insert_row_below'),
                    func: this.table.addRowBelow,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.insert_column_left = {
                    title: this.lang.get('insert_column_left'),
                    func: this.table.addColumnLeft,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.insert_column_right = {
                    title: this.lang.get('insert_column_right'),
                    func: this.table.addColumnRight,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.add_head = {
                    title: this.lang.get('add_head'),
                    func: this.table.addHead,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.delete_head = {
                    title: this.lang.get('delete_head'),
                    func: this.table.deleteHead,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.delete_column = {
                    title: this.lang.get('delete_column'),
                    func: this.table.deleteColumn,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.delete_row = {
                    title: this.lang.get('delete_row'),
                    func: this.table.deleteRow,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                dropdown.delete_row = {
                    title: this.lang.get('delete_table'),
                    func: this.table.deleteTable,
                    observe: {
                        element: 'table',
                        out: {
                            attr: {
                                'class': 'redactor-dropdown-link-inactive',
                                'aria-disabled': true,
                            }
                        }
                    }
                };
                this.observe.addButton('td', 'table');
                this.observe.addButton('th', 'table');
                var button = this.button.addBefore('link', 'table', this.lang.get('table'));
                this.button.addDropdown(button, dropdown);
            },
            show: function() {
                this.modal.addTemplate('table', this.table.getTemplate());
                this.modal.load('table', this.lang.get('insert_table'), 300);
                this.modal.createCancelButton();
                var button = this.modal.createActionButton(this.lang.get('insert'));
                button.on('click', this.table.insert);
                this.selection.save();
                this.modal.show();
                $('#redactor-table-rows').focus();
            },
            insert: function() {
                this.placeholder.remove();
                var rows = $('#redactor-table-rows').val(),
                    columns = $('#redactor-table-columns').val(),
                    $tableBox = $('<div>'),
                    tableId = Math.floor(Math.random() * 99999),
                    $table = $('<table id="table' + tableId + '"><tbody></tbody></table>'),
                    i, $row, z, $column;
                for (i = 0; i < rows; i++) {
                    $row = $('<tr>');
                    for (z = 0; z < columns; z++) {
                        $column = $('<td>' + this.opts.invisibleSpace + '</td>');
                        if (i === 0 && z === 0) {
                            $column.append(this.selection.getMarker());
                        }
                        $($row).append($column);
                    }
                    $table.append($row);
                }
                $tableBox.append($table);
                var html = $tableBox.html();
                this.modal.close();
                this.selection.restore();
                if (this.table.getTable()) return;
                this.buffer.set();
                var current = this.selection.getBlock() || this.selection.getCurrent();
                if (current && current.tagName != 'BODY') {
                    if (current.tagName == 'LI') current = $(current).closest('ul, ol');
                    $(current).after(html);
                } else {
                    this.insert.html(html, false);
                }
                this.selection.restore();
                var table = this.$editor.find('#table' + tableId);
                var p = table.prev("p");
                if (p.length > 0 && this.utils.isEmpty(p.html())) {
                    p.remove();
                }
                if (!this.opts.linebreaks && (this.utils.browser('mozilla') || this.utils.browser('msie'))) {
                    var $next = table.next();
                    if ($next.length === 0) {
                        table.after(this.opts.emptyHtml);
                    }
                }
                this.observe.buttons();
                table.find('span.redactor-selection-marker').remove();
                table.removeAttr('id');
                this.code.sync();
                this.core.setCallback('insertedTable', table);
            },
            getTable: function() {
                var $table = $(this.selection.getParent()).closest('table');
                if (!this.utils.isRedactorParent($table)) return false;
                if ($table.size() === 0) return false;
                return $table;
            },
            restoreAfterDelete: function($table) {
                this.selection.restore();
                $table.find('span.redactor-selection-marker').remove();
                this.code.sync();
            },
            deleteTable: function() {
                var $table = this.table.getTable();
                if (!$table) return;
                this.buffer.set();
                var $next = $table.next();
                if (!this.opts.linebreaks && $next.length !== 0) {
                    this.caret.setStart($next);
                } else {
                    this.caret.setAfter($table);
                }
                $table.remove();
                this.code.sync();
            },
            deleteRow: function() {
                var $table = this.table.getTable();
                if (!$table) return;
                var $current = $(this.selection.getCurrent());
                this.buffer.set();
                var $current_tr = $current.closest('tr');
                var $focus_tr = $current_tr.prev().length ? $current_tr.prev() : $current_tr.next();
                if ($focus_tr.length) {
                    var $focus_td = $focus_tr.children('td, th').first();
                    if ($focus_td.length) $focus_td.prepend(this.selection.getMarker());
                }
                $current_tr.remove();
                this.table.restoreAfterDelete($table);
            },
            deleteColumn: function() {
                var $table = this.table.getTable();
                if (!$table) return;
                this.buffer.set();
                var $current = $(this.selection.getCurrent());
                var $current_td = $current.closest('td, th');
                var index = $current_td[0].cellIndex;
                $table.find('tr').each($.proxy(function(i, elem) {
                    var $elem = $(elem);
                    var focusIndex = index - 1 < 0 ? index + 1 : index - 1;
                    if (i === 0) $elem.find('td, th').eq(focusIndex).prepend(this.selection.getMarker());
                    $elem.find('td, th').eq(index).remove();
                }, this));
                this.table.restoreAfterDelete($table);
            },
            addHead: function() {
                var $table = this.table.getTable();
                if (!$table) return;
                this.buffer.set();
                if ($table.find('thead').size() !== 0) {
                    this.table.deleteHead();
                    return;
                }
                var tr = $table.find('tr').first().clone();
                tr.find('td').replaceWith($.proxy(function() {
                    return $('<th>').html(this.opts.invisibleSpace);
                }, this));
                $thead = $('<thead></thead>').append(tr);
                $table.prepend($thead);
                this.code.sync();
            },
            deleteHead: function() {
                var $table = this.table.getTable();
                if (!$table) return;
                var $thead = $table.find('thead');
                if ($thead.size() === 0) return;
                this.buffer.set();
                $thead.remove();
                this.code.sync();
            },
            addRowAbove: function() {
                this.table.addRow('before');
            },
            addRowBelow: function() {
                this.table.addRow('after');
            },
            addColumnLeft: function() {
                this.table.addColumn('before');
            },
            addColumnRight: function() {
                this.table.addColumn('after');
            },
            addRow: function(type) {
                var $table = this.table.getTable();
                if (!$table) return;
                this.buffer.set();
                var $current = $(this.selection.getCurrent());
                var $current_tr = $current.closest('tr');
                var new_tr = $current_tr.clone();
                new_tr.find('th').replaceWith(function() {
                    var $td = $('<td>');
                    $td[0].attributes = this.attributes;
                    return $td.append($(this).contents());
                });
                new_tr.find('td').html(this.opts.invisibleSpace);
                if (type == 'after') {
                    $current_tr.after(new_tr);
                } else {
                    $current_tr.before(new_tr);
                }
                this.code.sync();
            },
            addColumn: function(type) {
                var $table = this.table.getTable();
                if (!$table) return;
                var index = 0;
                var current = $(this.selection.getCurrent());
                this.buffer.set();
                var $current_tr = current.closest('tr');
                var $current_td = current.closest('td, th');
                $current_tr.find('td, th').each($.proxy(function(i, elem) {
                    if ($(elem)[0] === $current_td[0]) index = i;
                }, this));
                $table.find('tr').each($.proxy(function(i, elem) {
                    var $current = $(elem).find('td, th').eq(index);
                    var td = $current.clone();
                    td.html(this.opts.invisibleSpace);
                    if (type == 'after') {
                        $current.after(td);
                    } else {
                        $current.before(td);
                    }
                }, this));
                this.code.sync();
            }
        };
    };
})(jQuery);
(function($) {
    $.Redactor.prototype.fullscreen = function() {
        return {
            init: function() {
                this.fullscreen.isOpen = false;
                var button = this.button.add('fullscreen', 'Fullscreen');
                this.button.addCallback(button, this.fullscreen.toggle);
                if (this.opts.fullscreen) this.fullscreen.toggle();
            },
            enable: function() {
                this.button.changeIcon('fullscreen', 'normalscreen');
                this.button.setActive('fullscreen');
                this.fullscreen.isOpen = true;
                if (this.opts.toolbarExternal) {
                    this.fullscreen.toolcss = {};
                    this.fullscreen.boxcss = {};
                    this.fullscreen.toolcss.width = this.$toolbar.css('width');
                    this.fullscreen.toolcss.top = this.$toolbar.css('top');
                    this.fullscreen.toolcss.position = this.$toolbar.css('position');
                    this.fullscreen.boxcss.top = this.$box.css('top');
                }
                this.fullscreen.height = this.$editor.height();
                if (this.opts.maxHeight) this.$editor.css('max-height', '');
                if (this.opts.minHeight) this.$editor.css('min-height', '');
                if (!this.$fullscreenPlaceholder) this.$fullscreenPlaceholder = $('<div/>');
                this.$fullscreenPlaceholder.insertAfter(this.$box);
                this.$box.appendTo(document.body);
                this.$box.addClass('redactor-box-fullscreen');
                $('body, html').css('overflow', 'hidden');
                this.fullscreen.resize();
                $(window).on('resize.redactor.fullscreen', $.proxy(this.fullscreen.resize, this));
                $(document).scrollTop(0, 0);
                $('.redactor-toolbar-tooltip').hide();
                this.$editor.focus();
                this.observe.load();
            },
            disable: function() {
                this.button.removeIcon('fullscreen', 'normalscreen');
                this.button.setInactive('fullscreen');
                this.fullscreen.isOpen = false;
                $(window).off('resize.redactor.fullscreen');
                $('body, html').css('overflow', '');
                this.$box.insertBefore(this.$fullscreenPlaceholder);
                this.$fullscreenPlaceholder.remove();
                this.$box.removeClass('redactor-box-fullscreen').css({
                    width: 'auto',
                    height: 'auto'
                });
                this.code.sync();
                if (this.opts.toolbarExternal) {
                    this.$box.css('top', this.fullscreen.boxcss.top);
                    this.$toolbar.css({
                        'width': this.fullscreen.toolcss.width,
                        'top': this.fullscreen.toolcss.top,
                        'position': this.fullscreen.toolcss.position
                    });
                }
                if (this.opts.minHeight) this.$editor.css('minHeight', this.opts.minHeight);
                if (this.opts.maxHeight) this.$editor.css('maxHeight', this.opts.maxHeight);
                $('.redactor-toolbar-tooltip').hide();
                this.$editor.css('height', 'auto');
                this.$editor.focus();
                this.observe.load();
            },
            toggle: function() {
                if (this.fullscreen.isOpen) {
                    this.fullscreen.disable();
                } else {
                    this.fullscreen.enable();
                }
            },
            resize: function() {
                if (!this.fullscreen.isOpen) return;
                var toolbarHeight = this.$toolbar.height();
                var height = $(window).height() - toolbarHeight - this.utils.normalize(this.$editor.css('padding-top')) - this.utils.normalize(this.$editor.css('padding-bottom'));
                this.$box.width($(window).width()).height(height);
                if (this.opts.toolbarExternal) {
                    this.$toolbar.css({
                        'top': '0px',
                        'position': 'absolute',
                        'width': '100%'
                    });
                    this.$box.css('top', toolbarHeight + 'px');
                }
                this.$editor.height(height);
            }
        };
    };
})(jQuery);
(function($) {
    $.Redactor.prototype.fontcolor = function() {
        return {
            init: function() {
                var colors = ['#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646', '#ffff00', '#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada', '#fff2ca', '#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5', '#ffe694', '#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#b7dde8', '#fac08f', '#f2c314', '#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#92cddc', '#e36c09', '#c09100', '#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#31859b', '#974806', '#7f6000'];
                var buttons = ['fontcolor', 'backcolor'];
                for (var i = 0; i < 2; i++) {
                    var name = buttons[i];
                    var button = this.button.add(name, this.lang.get(name));
                    var $dropdown = this.button.addDropdown(button);
                    $dropdown.width(242);
                    this.fontcolor.buildPicker($dropdown, name, colors);
                }
            },
            buildPicker: function($dropdown, name, colors) {
                var rule = (name == 'backcolor') ? 'background-color' : 'color';
                var len = colors.length;
                var self = this;
                var func = function(e) {
                    e.preventDefault();
                    self.fontcolor.set($(this).data('rule'), $(this).attr('rel'));
                };
                for (var z = 0; z < len; z++) {
                    var color = colors[z];
                    var $swatch = $('<a rel="' + color + '" data-rule="' + rule + '" href="#" style="float: left; font-size: 0; border: 2px solid #fff; padding: 0; margin: 0; width: 22px; height: 22px;"></a>');
                    $swatch.css('background-color', color);
                    $swatch.on('click', func);
                    $dropdown.append($swatch);
                }
                var $elNone = $('<a href="#" style="display: block; clear: both; padding: 5px; font-size: 12px; line-height: 1;"></a>').html(this.lang.get('none'));
                $elNone.on('click', $.proxy(function(e) {
                    e.preventDefault();
                    this.fontcolor.remove(rule);
                }, this));
                $dropdown.append($elNone);
            },
            set: function(rule, type) {
                this.inline.format('span', 'style', rule + ': ' + type + ';');
            },
            remove: function(rule) {
                this.inline.removeStyleRule(rule);
            }
        };
    };
})(jQuery);
if (!RedactorPlugins) var RedactorPlugins = {};
RedactorPlugins.ueactions = function() {
    return {
        init: function() {
            var that = this;
            var dropdown = {};
            dropdown.id = {
                title: RLANG.set_tag_id,
                func: this.ueactions.getUeActionsForm
            };
            dropdown.class = {
                title: RLANG.set_tag_class, func: this.ueactions.getUeActionsForm
            };
            if ("uesavecontenturl" in this.opts && this.opts.uesavecontenturl) {
                dropdown.uesavecontent = {
                    title: RLANG.save_content,
                    func: this.ueactions.ueSaveContent
                };
            }
            var button = this.button.add('ue_methods', RLANG.additional_options);
            this.button.setAwesome('ue_methods', 'fa-angle-down');
            this.button.addDropdown(button, dropdown);
        },
        _getActionTag: function() {
            return $(this.selection.getParent());
        },
        ueSaveContent: function() {
            var html = this.code.get();
            var name = this.$element.attr('name');
            data = {
                "name": name
            };
            data[name] = html;
            $.ajax({
                url: this.opts.uesavecontenturl,
                type: 'post',
                data: data,
                success: $.proxy(function(data) {
                    if (data.message) {
                        UE_addMsg(data.message);
                    }
                }, this)
            });
        },
        getUeActionsForm: function(attr) {
            if (this.ueactions._getActionTag().length) {
                header = this.ueactions._getActionTag()[0].nodeName + " -> " + attr.toUpperCase();
                this.modal.addTemplate('ueactions', this.ueactions.getTemplate());
                this.modal.addCallback('ueactions', function() {
                    var value = "";
                    this.ue_methods_action_tag = this.ueactions._getActionTag();
                    if (this.ue_methods_action_tag && this.ue_methods_action_tag.attr(attr)) {
                        value = this.ue_methods_action_tag.attr(attr);
                    }
                    $('#redactor_ueactions_tag_attr').val(attr);
                    $('#redactor_ueactions_tag_value').val(value);
                });
                this.modal.load('ueactions', header, 700);
                this.modal.createCancelButton();
                var button = this.modal.createActionButton(this.lang.get('save'));
                button.on('click', this.ueactions.ueActionsProcess);
                this.modal.show();
                $('#redactor_ueactions_tag_value').focus();
            } else {
                alert(RLANG.no_element_selected);
            }
        },
        ueActionsProcess: function() {
            var attr = $('#redactor_ueactions_tag_attr').val();
            var value = $('#redactor_ueactions_tag_value').val();
            if (value) {
                this.ue_methods_action_tag.attr(attr, value);
            } else {
                this.ue_methods_action_tag.removeAttr(attr);
            }
            this.modal.close();
            this.code.sync();
        },
        getTemplate: function() {
            return String() + '<section>' + '<form id="redactorUEActionsForm" method="post" action="">' + '<div id="redactor_tabs">' + '<label>' + RLANG._value + '</label>' + '<input type="hidden" id="redactor_ueactions_tag_attr"/>' + '<input type="text" id="redactor_ueactions_tag_value" class="redactor_input"  />' + '</div>' + '</form>' + '</section>'
        }
    };
};
if (!RedactorPlugins) var RedactorPlugins = {};
(function($) {
    RedactorPlugins.clipboardPaste = function() {
        return {
            init: function() {
                if (!this.opts.clipboardUploadUrl) return;
                if (!this.opts.clipboardUpload) return;
                this.$editor.on('paste.redactor', $.proxy(function(e) {
                    var pasteEvent = e.originalEvent || e;
                    if (this.utils.browser('mozilla')) {
                        setTimeout($.proxy(function() {
                            if (this.opts.clipboardUpload) {
                                imgs = this.$editor.find("img[src*='data:image']");
                                $.each(imgs, $.proxy(function(i, s) {
                                    this.progress.show();
                                    var $s = $(s);
                                    var arr = s.src.split(",");
                                    var postData = {
                                        'contentType': arr[0].split(";")[0].split(":")[1],
                                        'data': arr[1]
                                    };
                                    $.post(this.opts.clipboardUploadUrl, postData, $.proxy(function(data) {
                                        var json = (typeof data === 'string' ? $.parseJSON(data) : data);
                                        json = json[0]
                                        $s.attr('src', json.filelink);
                                        $s.removeAttr('data-mozilla-paste-image');
                                        $s.attr("data-redactor-inserted-image", true);
                                        if (this.opts.linebreaks) {
                                            $s.prepend('<br>').append('<br>');
                                        } else {
                                            $s.wrap("<p></p>");
                                        }
                                        this.code.sync();
                                        this.progress.hide();
                                    }, this)).always($.proxy(function() {
                                        this.progress.hide();
                                    }, this));
                                }, this));
                            }
                        }, this), 500);
                        return true;
                    }
                    if (typeof(clipboardData) != 'undefined') {
                        var fileList = clipboardData.files;
                        if (fileList && fileList.length) {
                            var file = fileList[0];
                            var url = URL.createObjectURL(file);
                            event.msConvertURL(file, "specified", url);
                            this.progress.show();
                            var reader = new FileReader();
                            reader.onload = $.proxy(this.clipboardPaste.pasteClipboardUploadIE, this);
                            reader.readAsDataURL(file);
                            e.preventDefault();
                            return true;
                        }
                    }
                    if (typeof(pasteEvent.clipboardData) === 'undefined') return;
                    if (pasteEvent.clipboardData.items) {
                        e.stopPropagation();
                        var img = document.createElement('img');
                        img.alt = "clipboard-image-marker";
                        img.setAttribute("data-redactor-inserted-image", true);
                        this.selection.get();
                        this.range.deleteContents();
                        this.range.insertNode(img);
                        this.caret.setAfter(img);
                        var file = pasteEvent.clipboardData.items[0].getAsFile();
                        if (file !== null) {
                            this.progress.show();
                            var reader = new FileReader();
                            reader.onload = $.proxy(this.clipboardPaste.pasteClipboardUpload, this);
                            reader.readAsDataURL(file);
                        } else {
                            this.progress.hide();
                            $($.find('img[alt="clipboard-image-marker"]')).remove();
                        }
                        return true;
                    }
                }, this));
            },
            pasteClipboardUploadIE: function(e) {
                var result = e.target.result;
                var arr = result.split(",");
                var postData = {
                    'contentType': arr[0].split(";")[0].split(":")[1],
                    'data': arr[1]
                };
                if (this.opts.clipboardUpload) {
                    $.post(this.opts.clipboardUploadUrl, postData, $.proxy(function(data) {
                        var json = (typeof data === 'string' ? $.parseJSON(data) : data);
                        json = json[0]
                        this.insert.html("<img src='" + json.filelink + "' data-redactor-inserted-image='true' id='clipboard-image-marker'/>");
                        var image = $(this.$editor.find('img#clipboard-image-marker'));
                        if (image.length) {
                            image.removeAttr('id');
                        } else {
                            image = false;
                        }
                        this.code.sync();
                        this.progress.hide();
                    }, this)).always($.proxy(function() {
                        this.progress.hide();
                    }, this));
                } else {
                    this.insert.html('<img src="' + result + '" />');
                    this.progress.hide();
                }
            },
            pasteClipboardUpload: function(e) {
                var result = e.target.result;
                var arr = result.split(",");
                var postData = {
                    'contentType': arr[0].split(";")[0].split(":")[1],
                    'data': arr[1]
                };
                if (this.opts.clipboardUpload) {
                    $.post(this.opts.clipboardUploadUrl, postData, $.proxy(function(data) {
                        var json = (typeof data === 'string' ? $.parseJSON(data) : data);
                        json = json[0]
                        var image = $(this.$editor.find('img[alt="clipboard-image-marker"]'));
                        if (image.length) {
                            image.attr('src', json.filelink);
                            image.removeAttr('alt');
                        }
                        this.code.sync();
                        this.progress.hide();
                        return true;
                    }, this)).always($.proxy(function() {
                        this.progress.hide();
                    }, this));
                } else {
                    this.insert.html('<img src="' + result + '" />');
                    this.progress.hide();
                }
            }
        };
    };
})(jQuery);
(function(d) {
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(f, e) {
        d.fx.step[e] = function(g) {
            if (!g.colorInit) {
                g.start = c(g.elem, e);
                g.end = b(g.end);
                g.colorInit = true
            }
            g.elem.style[e] = "rgb(" + [Math.max(Math.min(parseInt((g.pos * (g.end[0] - g.start[0])) + g.start[0]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[1] - g.start[1])) + g.start[1]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[2] - g.start[2])) + g.start[2]), 255), 0)].join(",") + ")"
        }
    });

    function b(f) {
        var e;
        if (f && f.constructor == Array && f.length == 3) {
            return f
        }
        if (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) {
            return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3])]
        }
        if (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) {
            return [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55]
        }
        if (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
        }
        if (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
        }
        if (e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
            return a.transparent
        }
        return a[d.trim(f).toLowerCase()]
    }

    function c(g, e) {
        var f;
        do {
            f = d.css(g, e);
            if (f != "" && f != "transparent" || d.nodeName(g, "body")) {
                break
            }
            e = "backgroundColor"
        } while (g = g.parentNode);
        return b(f)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }
})(jQuery);