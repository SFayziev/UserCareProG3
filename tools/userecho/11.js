/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
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
      };
    return !1
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
}(jQuery), + function(a) {
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
}(jQuery), + function(a) {
  "use strict";
  var b = function(c, d) {
    this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.isLoading = !1
  };
  b.DEFAULTS = {
    loadingText: "loading..."
  }, b.prototype.setState = function(b) {
    var c = "disabled",
        d = this.$element,
        e = d.is("input") ? "val" : "html",
        f = d.data();
    b += "Text", f.resetText || d.data("resetText", d[e]()), d[e](f[b] || this.options[b]), setTimeout(a.proxy(function() {
      "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
    }, this), 0)
  }, b.prototype.toggle = function() {
    var a = !0,
        b = this.$element.closest('[data-toggle="buttons"]');
    if (b.length) {
      var c = this.$element.find("input");
      "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
    }
    a && this.$element.toggleClass("active")
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
}(jQuery), + function(a) {
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
    return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(".item"), this.$items.index(this.$active)
  }, b.prototype.to = function(b) {
    var c = this,
        d = this.getActiveIndex();
    return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
      c.to(b)
    }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
  }, b.prototype.pause = function(b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
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
    if (e.hasClass("active")) return this.sliding = !1;
    var j = a.Event("slide.bs.carousel", {
      relatedTarget: e[0],
      direction: g
    });
    return this.$element.trigger(j), j.isDefaultPrevented() ? void 0 : (this.sliding = !0, f && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function() {
      var b = a(i.$indicators.children()[i.getActiveIndex()]);
      b && b.addClass("active")
    })), a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function() {
      e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function() {
        i.$element.trigger("slid.bs.carousel")
      }, 0)
    }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), f && this.cycle(), this)
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
}(jQuery), + function(a) {
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
        var f = function(a) {
          a && a.target != this.$element[0] || (this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse"))
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
        var d = function(a) {
          a && a.target != this.$element[0] || (this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse"))
        };
        return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
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
      !e && f.toggle && "show" == c && (c = !c), e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function() {
    return a.fn.collapse = c, this
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(b) {
    var c, d = a(this),
        e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""),
        f = a(e),
        g = f.data("bs.collapse"),
        h = g ? "toggle" : d.data(),
        i = d.attr("data-parent"),
        j = i && a(i);
    g && g.transitioning || (j && j.find('[data-toggle="collapse"][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
  })
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    a(d).remove(), a(e).each(function() {
      var d = c(a(this)),
          e = {
            relatedTarget: this
          };
      d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
    })
  }

  function c(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent()
  }
  var d = ".dropdown-backdrop",
      e = '[data-toggle="dropdown"]',
      f = function(b) {
        a(b).on("click.bs.dropdown", this.toggle)
      };
  f.prototype.toggle = function(d) {
    var e = a(this);
    if (!e.is(".disabled, :disabled")) {
      var f = c(e),
          g = f.hasClass("open");
      if (b(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
        var h = {
          relatedTarget: this
        };
        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
        f.toggleClass("open").trigger("shown.bs.dropdown", h), e.trigger("focus")
      }
      return !1
    }
  }, f.prototype.keydown = function(b) {
    if (/(38|40|27)/.test(b.keyCode)) {
      var d = a(this);
      if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
        var f = c(d),
            g = f.hasClass("open");
        if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).trigger("focus"), d.trigger("click");
        var h = " li:not(.divider):visible a",
            i = f.find('[role="menu"]' + h + ', [role="listbox"]' + h);
        if (i.length) {
          var j = i.index(i.filter(":focus"));
          38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
        }
      }
    }
  };
  var g = a.fn.dropdown;
  a.fn.dropdown = function(b) {
    return this.each(function() {
      var c = a(this),
          d = c.data("bs.dropdown");
      d || c.data("bs.dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
    })
  }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function() {
    return a.fn.dropdown = g, this
  }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
    a.stopPropagation()
  }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ', [role="menu"], [role="listbox"]', f.prototype.keydown)
}(jQuery), + function(a) {
  "use strict";
  var b = function(b, c) {
    this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
      this.$element.trigger("loaded.bs.modal")
    }, this))
  };
  b.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, b.prototype.toggle = function(a) {
    return this.isShown ? this.hide() : this.show(a)
  }, b.prototype.show = function(b) {
    var c = this,
        d = a.Event("show.bs.modal", {
          relatedTarget: b
        });
    this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function() {
      var d = a.support.transition && c.$element.hasClass("fade");
      c.$element.parent().length || c.$element.appendTo(c.$body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
      var e = a.Event("shown.bs.modal", {
        relatedTarget: b
      });
      d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function() {
        c.$element.trigger("focus").trigger(e)
      }).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e)
    }))
  }, b.prototype.hide = function(b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
  }, b.prototype.enforceFocus = function() {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
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
      if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
            a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
          }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
      d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
    } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
  }, b.prototype.checkScrollbar = function() {
    document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
  }, b.prototype.setScrollbar = function() {
    var a = parseInt(this.$body.css("padding-right") || 0);
    this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
  }, b.prototype.resetScrollbar = function() {
    this.$body.css("padding-right", "")
  }, b.prototype.measureScrollbar = function() {
    var a = document.createElement("div");
    a.className = "modal-scrollbar-measure", this.$body.append(a);
    var b = a.offsetWidth - a.clientWidth;
    return this.$body[0].removeChild(a), b
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
        f = e.data("bs.modal") ? "toggle" : a.extend({
          remote: !/#/.test(d) && d
        }, e.data(), c.data());
    c.is("a") && b.preventDefault(), e.modal(f, this).one("hide", function() {
      c.is(":visible") && c.trigger("focus")
    })
  })
}(jQuery), + function(a) {
  "use strict";
  var b = function(a, b) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
  };
  b.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
      selector: "body",
      padding: 0
    }
  }, b.prototype.init = function(b, c, d) {
    this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
      else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
            i = "hover" == g ? "mouseleave" : "focusout";
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
    return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
      "in" == c.hoverState && c.show()
    }, c.options.delay.show)) : c.show()
  }, b.prototype.leave = function(b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
    return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
      "out" == c.hoverState && c.hide()
    }, c.options.delay.hide)) : c.hide()
  }, b.prototype.show = function() {
    var b = a.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      if (this.$element.trigger(b), b.isDefaultPrevented()) return;
      var c = this,
          d = this.tip();
      this.setContent(), this.options.animation && d.addClass("fade");
      var e = "function" == typeof this.options.placement ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement,
          f = /\s?auto?\s?/i,
          g = f.test(e);
      g && (e = e.replace(f, "") || "top"), d.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(e), this.options.container ? d.appendTo(this.options.container) : d.insertAfter(this.$element);
      var h = this.getPosition(),
          i = d[0].offsetWidth,
          j = d[0].offsetHeight;
      if (g) {
        var k = e,
            l = this.$element.parent(),
            m = this.getPosition(l);
        e = "bottom" == e && h.top + h.height + j - m.scroll > m.height ? "top" : "top" == e && h.top - m.scroll - j < 0 ? "bottom" : "right" == e && h.right + i > m.width ? "left" : "left" == e && h.left - i < m.left ? "right" : e, d.removeClass(k).addClass(e)
      }
      var n = this.getCalculatedOffset(e, h, i, j);
      this.applyPlacement(n, e), this.hoverState = null;
      var o = function() {
        c.$element.trigger("shown.bs." + c.type)
      };
      a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, o).emulateTransitionEnd(150) : o()
    }
  }, b.prototype.applyPlacement = function(b, c) {
    var d = this.tip(),
        e = d[0].offsetWidth,
        f = d[0].offsetHeight,
        g = parseInt(d.css("margin-top"), 10),
        h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
      using: function(a) {
        d.css({
          top: Math.round(a.top),
          left: Math.round(a.left)
        })
      }
    }, b), 0), d.addClass("in");
    var i = d[0].offsetWidth,
        j = d[0].offsetHeight;
    "top" == c && j != f && (b.top = b.top + f - j);
    var k = this.getViewportAdjustedDelta(c, b, i, j);
    k.left ? b.left += k.left : b.top += k.top;
    var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j,
        m = k.left ? "left" : "top",
        n = k.left ? "offsetWidth" : "offsetHeight";
    d.offset(b), this.replaceArrow(l, d[0][n], m)
  }, b.prototype.replaceArrow = function(a, b, c) {
    this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
  }, b.prototype.setContent = function() {
    var a = this.tip(),
        b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
  }, b.prototype.hide = function() {
    function b() {
      "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type)
    }
    var c = this,
        d = this.tip(),
        e = a.Event("hide.bs." + this.type);
    return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.hoverState = null, this)
  }, b.prototype.fixTitle = function() {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
  }, b.prototype.hasContent = function() {
    return this.getTitle()
  }, b.prototype.getPosition = function(b) {
    b = b || this.$element;
    var c = b[0],
        d = "BODY" == c.tagName;
    return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : null, {
      scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(),
      width: d ? a(window).width() : b.outerWidth(),
      height: d ? a(window).height() : b.outerHeight()
    }, d ? {
      top: 0,
      left: 0
    } : b.offset())
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
  }, b.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
    var e = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return e;
    var f = this.options.viewport && this.options.viewport.padding || 0,
        g = this.getPosition(this.$viewport);
    if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
          i = b.top + f - g.scroll + d;
      h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
    } else {
      var j = b.left - f,
          k = b.left + f + c;
      j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
    }
    return e
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
    clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
  };
  var c = a.fn.tooltip;
  a.fn.tooltip = function(c) {
    return this.each(function() {
      var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == typeof c && c;
      (e || "destroy" != c) && (e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]())
    })
  }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function() {
    return a.fn.tooltip = c, this
  }
}(jQuery), + function(a) {
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
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
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
      (e || "destroy" != c) && (e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]())
    })
  }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function() {
    return a.fn.popover = c, this
  }
}(jQuery), + function(a) {
  "use strict";

  function b(c, d) {
    var e, f = a.proxy(this.process, this);
    this.$element = a(a(c).is("body") ? window : c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scrollspy", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
  }
  b.DEFAULTS = {
    offset: 10
  }, b.prototype.refresh = function() {
    var b = this.$element[0] == window ? "offset" : "position";
    this.offsets = a([]), this.targets = a([]); {
      var c = this;
      this.$body.find(this.selector).map(function() {
        var d = a(this),
            e = d.data("target") || d.attr("href"),
            f = /^#./.test(e) && a(e);
        return f && f.length && f.is(":visible") && [
              [f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]
            ] || null
      }).sort(function(a, b) {
        return a[0] - b[0]
      }).each(function() {
        c.offsets.push(this[0]), c.targets.push(this[1])
      })
    }
  }, b.prototype.process = function() {
    var a, b = this.$scrollElement.scrollTop() + this.options.offset,
        c = this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight),
        d = c - this.$scrollElement.height(),
        e = this.offsets,
        f = this.targets,
        g = this.activeTarget;
    if (b >= d) return g != (a = f.last()[0]) && this.activate(a);
    if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
    for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
  }, b.prototype.activate = function(b) {
    this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
        d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
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
  }, a(window).on("load.bs.scrollspy.data-api", function() {
    a('[data-spy="scroll"]').each(function() {
      var b = a(this);
      b.scrollspy(b.data())
    })
  })
}(jQuery), + function(a) {
  "use strict";
  var b = function(b) {
    this.element = a(b)
  };
  b.prototype.show = function() {
    var b = this.element,
        c = b.closest("ul:not(.dropdown-menu)"),
        d = b.data("target");
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
}(jQuery), + function(a) {
  "use strict";
  var b = function(c, d) {
    this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
  };
  b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {
    offset: 0
  }, b.prototype.getPinnedOffset = function() {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(b.RESET).addClass("affix");
    var a = this.$window.scrollTop(),
        c = this.$element.offset();
    return this.pinnedOffset = c.top - a
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
      "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element));
      var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
      if (this.affixed !== i) {
        null != this.unpin && this.$element.css("top", "");
        var j = "affix" + (i ? "-" + i : ""),
            k = a.Event(j + ".bs.affix");
        this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({
          top: e.top
        }))
      }
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
}(jQuery);
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
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
  lang = _ue_globals['lang_code'];
  direction = _ue_globals['lang_direction'];
  if (typeof focus == 'undefined') focus = true;
  if (typeof forum_id == 'undefined') forum_id = 0;
  var plugins = ['fullscreen', 'table', 'video', 'clipboardPaste'];
  if (_ue_globals['is_staff']) {
    plugins.push("fontcolor");
  };
  var ue_save_content_url = "";
  if (_ue_globals['redactor_ueactions']) {
    plugins.push("ueactions");
    current_form = $(object).closest("form#id_topic_form");
    if (current_form.length) {
      topic_id = current_form.find("input#id_topic_id").val();
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
    if (_ue_globals['redactor_file_upload']) {
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
    $.fn.datepicker.defaults.language = _ue_globals['datepicker_lang_code'];
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
        mtopiclistChangeTopicPage(module_id, page_id);
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
        data = '<a class="window close">×</a>' + data;
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
$(document).ready(function() {
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
    $('.navbar-offcanvas').toggleClass('active');
    $('.navbar-fixed-top').toggleClass('offcanvas-active');
  });
  $(window).resize(function() {
    w = $(window).width();
    if (w > 768) {
      $('.row-offcanvas').removeClass('active');
      $('.navbar-offcanvas').removeClass('active');
      $('.navbar-fixed-top').removeClass('offcanvas-active');
    }
  });
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
/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
 * Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */
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
$.validator.setDefaults({
  highlight: function(element) {
    $(element).closest('.form-group, .checkbox').removeClass('has-success');
    $(element).closest('.form-group, .checkbox').addClass('has-error');
  },
  unhighlight: function(element) {
    $(element).closest('.form-group, .checkbox').removeClass('has-error');
    $(element).closest('.form-group, .checkbox').addClass('has-success');
  },
  errorElement: 'span',
  errorClass: 'help-block',
  errorPlacement: function(error, element) {
    if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
      error.insertAfter(element.parent());
    } else {
      error.insertAfter(element);
    }
  }
});
$(document).on("click", "a[data-action='delete-comment']", deleteComment);
$(document).on("click", "a[data-action='reply-comment']", showReplyCommentForm);
$(document).on("click", "a[data-action='edit-comment']", showEditCommentForm);
$(document).on("click", "[data-action='reply-topic']", showReplyTopicForm);
$(document).on("click", "button[data-action='follow']", objectSubscribe);
$(document).on("click", "a[data-action='upvote-comment']", upvoteComment);
$(document).on("click", "a[data-action='downvote-comment']", downvoteComment);
$(document).on("click", "a[data-action='accept-comment']", acceptComment);
$(document).on("click", "input[data-action='signin-comment']", showCommentSigninPanel);
$(document).on("click", "a[data-action='pin-comment']", pinComment);
$(document).on("click", "a[data-action='unpin-comment']", unpinComment);
$(document).on("click", "a[data-action='mark-comment-as-answer']", markCommentAsAnswer);
$(document).on("click", "button[data-action='markasprivate-comment']", commentToggleButtonClick);
$(document).on("click", "button[data-action='markasanswer-comment']", commentToggleButtonClick);
$(document).on("click", "button[data-action='replytosocial-comment']", commentToggleButtonClick);
$(document).on("change", "select[data-action='reply-privacy-change']", replyPrivacyChangeClick);

function updateBtnStatus(btn, status) {
  if (status == 'toggle') {
    cur_status = btn.attr('data-status');
    if (cur_status == 'checked') status = '';
    else status = 'checked';
  }
  active_class = btn.attr('data-checked-class');
  if (status == 'checked') {
    btn.button('checked').attr('data-status', 'checked');
    btn.addClass(active_class);
  } else {
    btn.button('reset').attr('data-status', '');
    btn.removeClass(active_class);
  }
}

function replyPrivacyChangeClick() {
  checkCommentStaffButtons($(this).closest('.comment-item'));
}

function commentToggleButtonClick() {
  updateBtnStatus($(this), 'toggle');
  checkCommentStaffButtons($(this).closest('.comment-item'));
}

function checkCommentStaffButtons(comment) {
  var answer_button = comment.find('button[data-action="markasanswer-comment"]');
  var privacy_select = comment.find('select[data-action="reply-privacy-change"]');
  var social_button = comment.find('button[data-action="replytosocial-comment"]');
  var topic_status_change = comment.find('select[data-action="topic-status-change"]');
  if (answer_button.attr('data-status') == 'checked' || social_button.attr('data-status') == 'checked') {
    privacy_select.val(1);
    privacy_select.attr('disabled', '');
  } else {
    privacy_select.removeAttr('disabled');
  }
  pm = privacy_select.val();
  if (pm == 2 || pm == 3) {
    updateBtnStatus(answer_button, '');
    answer_button.addClass('disabled');
    social_button.addClass('disabled');
    topic_status_change.hide();
  } else {
    answer_button.removeClass('disabled');
    social_button.removeClass('disabled');
    topic_status_change.show();
  }
}

function finalizeComment(data) {
  if ('parent_moderated' in data && data.parent_moderated) {
    $('.comment-edit-mode').prev().removeClass('moderation').find('.info-status.moderation').remove();
  }
  if ('is_answer' in data && data.is_answer) {
    $('.comments-list .comment-item .info-status.answer').remove();
  }
  if ('comment' in data) {
    $('.comment-edit-mode').replaceWith(data.comment.html);
  }
  if ('topic_needs_review' in data) {
    btn = $("#topic_details #topic_details_container [data-topic-id='" + data.topic_id + "'] [data-action='needs-review-change']");
    if (btn.length == 1) {
      updateNeedsReviewButton(btn, data.topic_needs_review);
    }
  }
  if ('topic' in data) {
    if ('status_id' in data.topic) {
      $('#comment-template .comment-edit .admin-post-features select[data-action="topic-status-change"] option').each(function(index) {
        if (this.value == data.topic.status_id)
          $(this).attr('selected', 'selected');
        else
          $(this).removeAttr('selected');
      });
      $('a[data-action="updatestatus-topic-selected"] i').removeClass('fa-arrow-right');
      $('a[data-action="updatestatus-topic-selected"]').each(function(index) {
        if ($(this).attr('data-status-id') == data.topic.status_id)
          $(this).find('i:first').addClass('fa-arrow-right');
      });
    }
    $('.topic-container').html(data.topic.html);
    $(".tooltip").remove();
    $("[data-toggle=tooltip]").tooltip({
      container: 'body'
    });
  }
  if (data.message != "")
    UE_addMsg(data.message);
  newComment();
  if (interface_mode == 'Moderation') {
    refreshStatCounts();
  }
}

function postCommentKB(comment) {
  data = {
    'topic_id': $('.comment-edit-mode').closest('[data-topic-id]').attr('data-topic-id'),
    'parent_id': 0,
    'depth': 0,
    'comment': comment
  }
  $.ajax({
    type: 'POST',
    url: _comment_post_url_,
    data: data,
    success: function(data) {
      location.reload();
    },
    error: function(data) {
      alert('error');
    },
    dataType: 'json'
  });
}

function postComment(event) {
  data = {
    'topic_id': $('.comment-edit-mode').closest('[data-topic-id]').attr('data-topic-id'),
    'parent_id': 0,
    'depth': 0,
    'comment': $('.comment-edit-mode #edit-comment textarea').val(),
    'status_id': $('.comment-edit-mode #edit-comment select[name=status]').val()
  }
  captcha_0 = $('.comment-edit-mode #edit-comment #id_captcha_0').val();
  captcha_1 = $('.comment-edit-mode #edit-comment #id_captcha_1').val();
  data['captcha_0'] = captcha_0;
  data['captcha_1'] = captcha_1;
  answer_button = $('.comment-edit-mode button[data-action="markasanswer-comment"]');
  social_button = $('.comment-edit-mode button[data-action="replytosocial-comment"]');
  data['reply_privacy_mode'] = $('.comment-edit-mode #edit-comment select[name=reply-privacy]').val();
  data['is_answer'] = (answer_button.length > 0 && answer_button.attr('data-status') == 'checked') ? true : false;
  data['reply_to_social'] = (social_button.length > 0 && social_button.attr('data-status') == 'checked') ? true : false;
  action_url = _comment_post_url_;
  if ('data' in event && event.data != null) {
    if ('parent_id' in event.data) data['parent_id'] = event.data.parent_id;
    if ('comment_id' in event.data) data['comment_id'] = event.data.comment_id;
    if (event.data.mode == 'edit') action_url = _comment_edit_url_;
    if (event.data.mode == 'new') action_url = _comment_post_url_;
  }
  $('.comment-edit-mode .comment-edit .btn-post').button('loading');
  $.ajax({
    type: 'POST',
    url: action_url,
    data: data,
    success: function(data) {
      if (data.success == true) finalizeComment(data);
      if (data.success == false) {
        $('.comment-edit-mode .comment-edit .btn-post').button('reset');
        UE_addMsg(data.message);
      }
      if ('captcha_data' in data) {
        $('.comment-edit-mode .comment-edit input#id_captcha_0').val(data.captcha_data[0]);
        $('.comment-edit-mode .comment-edit img.captcha').attr('src', data.captcha_data[1]);
        $('#comment-template .comment-edit input#id_captcha_0').val(data.captcha_data[0]);
        $('#comment-template .comment-edit img.captcha').attr('src', data.captcha_data[1]);
      }
    },
    error: function(data) {
      alert('error');
    },
    dataType: 'json'
  });
}

function showReplyCommentForm() {
  parent_comment = $(this).closest('.comment-item');
  parent_comment_id = parent_comment.attr('id').match(/comment-(\d+)/)[1];
  ReplyCommentForm(parent_comment_id);
}

function ReplyCommentForm(parent_comment_id) {
  parent_comment = $('#comment-' + parent_comment_id);
  depth = parseInt(parent_comment.attr('data-depth'));
  cleanupComments();
  var comment_form = $("#comment-template").clone();
  comment_form.addClass('comment-edit-mode');
  comment_form.addClass('comment-temporary');
  comment_form.attr('data-depth', depth + 1);
  comment_form.addClass('co' + (depth + 1));
  comment_form.attr('data-parent-comment-id', parent_comment_id);
  comment_form.find('.comment-edit .btn-cancel').click(newComment);
  comment_form.find('.comment-edit .btn-post').click({
    'parent_id': parent_comment_id,
    'mode': 'new'
  }, postComment);
  comment_form.insertAfter(".comments-list #comment-" + parent_comment_id);
  comment_form.show();
  editComment('.comment-edit-mode');
  pm = parent_comment.attr('data-privacy-mode');
  if (pm == 2 || pm == 3) {
    comment_form.find('select[name=reply-privacy]').val(pm);
    checkCommentStaffButtons(comment_form);
    comment_form.find('select[name=reply-privacy]').attr('disabled', '');
  }
}

function showEditCommentForm() {
  cleanupComments();
  comment = $(this).closest('.comment-item');
  comment_id = comment.attr('id').match(/comment-(\d+)/)[1];
  var edit_block = $("#comment-template .comment-edit").clone();
  edit_block.find('.btn-more').remove();
  edit_block.find('.admin-post-features').remove();
  comment_text_clone = comment.find('.comment-text').clone();
  $.each($(comment_text_clone).find('a[rel="lightbox"]'), function(i, item) {
    $(item).replaceWith($(item).html());
  });
  edit_block.find('#edit-comment textarea').val(comment_text_clone.html());
  edit_block.find('.btn-cancel').click(newComment);
  edit_block.find('.btn-post').click({
    'comment_id': comment_id,
    'mode': 'edit'
  }, postComment);
  comment.append(edit_block);
  comment.addClass('comment-edit-mode');
  editComment('.comment-edit-mode');
}

function showReplyTopicForm() {
  $('.row-offcanvas').removeClass('active');
  $('.navbar-offcanvas').removeClass('active');
  $('.navbar-fixed-top').removeClass('offcanvas-active');
  newCommentForm();
  comment_form = $('.comment-edit-mode');
  var answer_button = comment_form.find('button[data-action="markasanswer-comment"]');
  updateBtnStatus(answer_button, 'checked');
  checkCommentStaffButtons(comment_form);
  if ($('.comment-edit-mode').length > 0)
    $('html,body').animate({
      scrollTop: $('.comment-edit-mode').offset().top
    });
}

function newCommentForm() {
  newComment();
  editComment('.comment-edit-mode');
}

function newComment() {
  cleanupComments();
  var direction = $('.comments-list').attr('data-comments-order');
  var comment_form = $("#comment-template").clone();
  comment_form.addClass('comment-edit-mode');
  comment_form.addClass('comment-temporary');
  comment_form.attr('data-depth', 0);
  comment_form.find('.comment-edit .btn-cancel').click(newComment);
  comment_form.find('.comment-edit .btn-post').click(postComment);
  if (direction == 'down') {
    comment_form.prependTo(".comments-list");
  } else {
    comment_form.appendTo(".comments-list");
  }
  comment_form.show();
  $("button[data-toggle=tooltip]").tooltip({
    container: 'body'
  });
}

function editComment(comment_id) {
  var comment = $(comment_id);
  var forum_id = comment.closest('[data-forum-id]').attr('data-forum-id');
  comment.find('.activator').hide();
  initEditor(comment.find('#edit-comment textarea'), forum_id, true);
  comment.find('#edit-comment').show();
  comment.find('.comment-text').hide();
}

function cleanupComments() {
  $('.comment-temporary').remove();
  $('.comment-edit-mode').removeClass('comment-edit-mode');
  $('.comments-list .comment-edit').remove();
  $('.comments-list .comment-text').show();
}

function deleteComment() {
  id = $(this).closest('.comment-item').attr('id').match(/comment-(\d+)/)[1];
  showConfirmDialog(gettext("Are you sure you want to delete this object?"), 'javascript:deleteCommentConfirmed(' + id + ');');
  return false;
}

function deleteCommentSuccess(id) {
  $('#comment-' + id).hide('slow', function() {
    if ($('#comment-' + id).hasClass('comment-answer')) {
      $('#comment-' + id).closest('.module-body').remove();
      $('#comment-' + id).remove();
    } else {
      $('#comment-' + id).remove();
    }
    if (interface_mode == 'Moderation') {
      refreshStatCounts();
    }
    UE_addMsg(gettext("The comment has been deleted"));
  });
}

function deleteCommentConfirmed(id) {
  var data = {};
  $.post('/comments/delete/' + id + '/', data, function(data) {
    deleteCommentSuccess(id)
  }, "json");
}

function hideCommentActionlist() {
  caw = $('#comment_actions').width();
  $('#comment_actions').animate({
    'margin-left': -caw
  }, 200);
  $('.comment-placeholder').stop().animate({
    'left': '0px'
  }, 200).css('position', 'relative');
  $('#comment_actions').remove();
  $('.comment-item').removeClass('actions-selected');
}

function toggleCommentActionlist(comment_id) {
  hideCommentActionlist();
  comment = $('#comment-' + comment_id);
  comment.addClass('actions-selected');
  height = comment.height();
  width = comment.width();
  $('#comment-' + comment_id).prepend('<div id="comment_actions"></div>')
  ue_inplace({
    'target': '#comment_actions',
    'src': '/dialog/comment/actions/' + comment_id + '/',
    'callback': function() {
      $('#comment-' + comment_id).height(height);
      $('#comment_actions').height(height + 12);
      caw = $('#comment_actions').width();
      $('#comment_actions').css('margin-left', -caw);
      $('#comment_actions').animate({
        'margin-left': 0
      }, 200);
      $('#comment-' + comment_id + ' .comment-placeholder').width(width).css('position', 'absolute').stop().animate({
        'left': ($('#comment_actions').width() + 24) + 'px'
      }, 200);
    }
  });
  return false;
}

function upvoteComment() {
  id = $(this).closest('.comment-item').attr('id').match(/comment-(\d+)/)[1];
  voteForComment(id, 1);
  return false;
}

function downvoteComment() {
  id = $(this).closest('.comment-item').attr('id').match(/comment-(\d+)/)[1];
  voteForComment(id, -1);
  return false;
}

function voteForComment(comment_id, vote_value) {
  serverurl = "/voting/vote/";
  var data = {
    'model': "ThreadedComment",
    'object_id': comment_id,
    'vote_value': vote_value,
  };
  $.post(serverurl, data, function(data) {
    if (data.success) {
      comment = $('#comment-' + comment_id);
      if (data.score.vote_diff > 0) {
        comment.find('.comment-votes .label').html('+' + data.score.vote_diff).removeClass().addClass('label label-success');
      } else if (data.score.vote_diff < 0) {
        comment.find('.comment-votes .label').html(data.score.vote_diff).removeClass().addClass('label label-danger');
      } else {
        comment.find('.comment-votes .label').html(data.score.vote_diff).removeClass().addClass('hidden');;
      }
    }
    UE_addMsg(data.message);
  }, "json");
  return false;
}

function acceptComment() {
  id = $(this).closest('.comment-item').attr('id').match(/comment-(\d+)/)[1];
  showConfirmDialog(gettext("Are you sure you want to do this?"), 'javascript:acceptCommentAction(' + id + ');');
  return false;
}

function acceptCommentSuccess(data) {
  UE_addMsg(data.message);
  if (data.success) {
    $('#comment-' + data.id + ' [data-action="accept-comment"]').hide();
    $('#comment-' + data.id + ' div.info-status.moderation').hide();
    if (interface_mode == 'Moderation') {
      refreshStatCounts();
    }
  }
}

function acceptCommentAction(id) {
  var data = {};
  $.post('/comments/accept/' + id + '/', data, function(data) {
    acceptCommentSuccess(data)
  }, "json");
}

function showCommentSigninPanel() {
  parent_comment_id = $(this).closest('.comment-item').attr('data-parent-comment-id');
  showSigninPanel("signInCompleteLocal(" + parent_comment_id + ");");
}

function signInCompleteLocal(parent_comment_id) {
  newURL = location.protocol + "//" + location.host + location.pathname + '?comment_form_activate=true';
  if (parent_comment_id)
    newURL = newURL + '&comment_id=' + parent_comment_id + '#comment-' + parent_comment_id;
  location.href = newURL;
}

function pinComment() {
  comment_id = $(this).closest('.comment-item').attr('id').match(/comment-(\d+)/)[1];
  $('#comment-' + comment_id + ' #pin-comment').hide();
  $.post('/comments/mark_best/' + comment_id + '/', function(data) {
    $('#comment-' + comment_id + ' #unpin-comment').show();
    $('.topic-container').html(data.topic.html);
    UE_addMsg(data.message);
  }, "json");
  return false;
}

function unpinComment() {
  comment_id = $(this).closest('.comment-item').attr('id').match(/comment-(\d+)/)[1];
  $('#comment-' + comment_id + ' #unpin-comment').hide();
  $.post('/comments/unmark_best/' + comment_id + '/', function(data) {
    $('#comment-' + comment_id + ' #pin-comment').show();
    $('.topic-container').html(data.topic.html);
    UE_addMsg(data.message);
  }, "json");
  return false;
}

function markCommentAsAnswer() {
  ueShowLoader();
  comment_item = $(this).closest('.comment-item');
  comment_id = comment_item.attr('id').match(/comment-(\d+)/)[1];
  $.post('/comments/mark_answer/' + comment_id + '/', function(data) {
    ueHideLoader();
    if (data.success) {
      $(".comments-list .comment-item.comment-answer .info-status.answer").remove();
      $(".comments-list .comment-item.comment-answer").removeClass("comment-answer");
      $('.topic-container').html(data.topic.html);
      comment_item.replaceWith(data.comment.html);
    }
    if (data.message) {
      UE_addMsg(data.message);
    }
  }, "json");
  return false;
}
$(document).on("click", ".module-search-active i[data-action='cancel-search-topic']", cancelSearch);
$(document).on("keyup", "input[data-action='search-topic']", msearchStartSearchDelay);
$(document).on("change", "input[data-action='search-topic']", msearchStartSearchDelay);
$(document).on("paste", "input[data-action='search-topic']", msearchPaste);
$(document).on("click", ".module-search-active button[data-action='continue-topic']", continueTopic);

function getModuleId(obj) {
  var module_id = $(obj).closest('div.module').attr('id');
  if (typeof(module_id) == "undefined") {
    module_id = $(obj).closest("[data-module-id]").attr("data-module-id");
  }
  return module_id;
}

function msearchPaste() {
  var _this = this;
  setTimeout(function() {
    $(_this).keyup()
  }, 500);
}

function continueTopic() {
  var module_id = getModuleId(this);
  $('#' + module_id + ' .results-pane').hide();
  $('#' + module_id + ' .module-search .results').html('');
  if ('backdrop' in __m_settings[module_id] && __m_settings[module_id]['backdrop'])
    $('.backdrop').fadeOut('fast');
  $('#' + module_id).removeClass("module-search-active");
  $('#' + module_id + ' .on-search-success-hidden').show();
  return false;
}

function cancelSearch(event, module_id, empty_only) {
  if (typeof(module_id) == 'undefined')
    module_id = getModuleId(this);
  if (typeof(empty_only) != 'undefined' && empty_only === true)
    if ($('#' + module_id + ' .input-search').val() != '') {
      return;
    }
  $('#' + module_id + ' .private-message-container').show();
  $('#' + module_id + ' .results-pane').slideUp("slow");
  $('#' + module_id + ' .module-search .results').html('');
  if ('backdrop' in __m_settings[module_id] && __m_settings[module_id]['backdrop'])
    $('.backdrop').fadeOut('fast');
  $('#' + module_id).removeClass("module-search-active");
  setSearchStatusButton(module_id, "default");
  $('#' + module_id + ' .on-search-success-hidden').show();
  $('#' + module_id + ' .input-search').val('');
  if ('save_page_hash' in __m_settings[module_id] && __m_settings[module_id]['save_page_hash']) {
    setUEPageHash(module_id + '/search/');
  }
}

function msearchStartSearchDelay() {
  var module_id = getModuleId(this);
  var str = $(this).val();
  if (str != '')
    setTimeout(function() {
      msearchStartSearch(module_id, str);
    }, 500);
  else {
    __m_settings[module_id]['lastSearch'] = '';
    setTimeout(function() {
      cancelSearch({}, module_id, true);
    }, 500);
  }
}

function setSearchStatusButton(module_id, status) {
  var button = $('#' + module_id + ' #input-inline-button');
  if (button.length > 0) {
    var add_button = $('#' + module_id + ' #add-topic-button');
    if (add_button.length > 0) {
      button_width = add_button.width();
      if (button_width <= 0) {
        setTimeout(function() {
          setSearchStatusButton(module_id, status);
        }, 1000);
        return;
      }
      button.css('right', (31 + button_width) + 'px');
    }
    button.removeClass().addClass(button.attr('data-class-' + status)).attr("data-action", button.attr('data-action-' + status)).show();
  }
}

function msearchStartSearch(module_id, str) {
  cfg = __m_settings[module_id];
  if (!cfg['searching'] && cfg['lastSearch'] != str && $('#' + module_id + ' .input-search').val() == str) {
    if ('save_page_hash' in cfg && cfg['save_page_hash']) {
      if (ue_page_hash == '') {
        setUEPageHash(module_id + '/search/');
      }
      setUEPageHash(module_id + '/search/' + encodeURIComponent(str));
    }
    cfg['searching'] = 1;
    cfg['lastSearch'] = str;
    search_mode = cfg['search_mode'];
    target = cfg['target'];
    $('#' + module_id + ' .private-message-container').hide();
    setSearchStatusButton(module_id, "refresh");
    url = '/modules/module/msearch/' + module_id + '/get_list/' + __m_settings[module_id]['forum_id'] + '/' + __m_settings[module_id]['topic_limit'] + '/';
    data = {
      'search': $('#' + module_id + ' .input-search').val(),
      'exclude_id': $('#' + module_id).attr('data-exclude-id'),
      'mode': search_mode,
      'target': target
    }
    if ('view' in cfg)
      data['view'] = cfg['view'];
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      success: function(data) {
        commentBusy = false;
        if (data.success == true) msearchGetTopicListSuccess(data);
        cfg['searching'] = 0;
        setSearchStatusButton(module_id, "cancel");
      },
      error: function(data) {},
      dataType: 'json'
    });
  }
}

function msearchGetTopicListSuccess(data) {
  module_id = data.module_id;
  cfg = __m_settings[module_id];
  if (cfg['lastSearch'] != '') {
    $('#' + module_id + ' .results').html('');
    if ('backdrop' in cfg && cfg['backdrop'])
      $('.backdrop').fadeIn('fast');
    $('#' + module_id).addClass("module-search-active");
    if (data.topics.length || data.articles.length) {
      $('#' + module_id + ' #id_topics_count').text(data.topics.length + data.articles.length);
      if (data.articles.length && data.topics.length) {
        $('#' + module_id + ' .results').append('<div class="search-divider">' + gettext('Knowledge base') + '</div>');
      }
      $.each(data.articles, function(i, item) {
        $('#' + module_id + ' .results').append(item);
      });
      if (data.articles.length && data.topics.length) {
        $('#' + module_id + ' .results').append('<div class="search-divider">' + gettext('Regular topics') + '</div>');
      }
      $.each(data.topics, function(i, item) {
        $('#' + module_id + ' .results').append(item);
      });
      $('#' + module_id + ' .result-info').show();
      $('#' + module_id + ' .after-search-text').show();
      $('#' + module_id + ' .result-none').hide();
      $('#' + module_id + ' .results').show();
      $('#' + module_id + ' .on-search-success-hidden').hide();
    } else {
      $('#' + module_id + ' .result-info').hide();
      $('#' + module_id + ' .after-search-text').hide();
      $('#' + module_id + ' .result-none').show();
      $('#' + module_id + ' .results').hide();
      $('#' + module_id + ' .on-search-success-hidden').show();
    }
    $('#' + module_id + ' .results-pane').slideDown("slow");
    str = $("#" + module_id + ' .input-search').val();
    msearchStartSearch(module_id, str);
  }
}
$(document).on("click", "[data-action='edit-topic']", editTopic);
$(document).on("click", "[data-action='translate-topic']", translateTopic);
$(document).on("click", "[data-action='merge-topic']", mergeTopic);
$(document).on("click", "[data-action='unmerge-topic']", unmergeConfirm);
$(document).on("click", "[data-action='mergetothis-topic']", mergeConfirm);
$(document).on("click", "[data-action='showvoters-topic']", showVoters);
$(document).on("click", "[data-action='setup-poll-topic']", editPollSettings);
$(document).on("click", "[data-action='getinfo-topic']", getinfoTopic);
$(document).on("click", "[data-action='move-topic']", moveTopic);
$(document).on("click", "[data-action='delete-topic']", deleteTopic);
$(document).on("click", "[data-action='vote-topic']", voteTopic);
$(document).on("click", "[data-action='show-topic-full-list']", showTopicWithDescription);
$(document).on("click", "[data-action='show-topic-compact-list']", showTopicWithoutDescription);
$(document).on("click", "[data-action='new-topic']", newTopic);
$(document).on("click", "[data-action='new-topic-select-forum']", newTopicSelectForum);
$(document).on("click", "[data-action='removetag-topic']", removetagTopic);
$(document).on("click", "[data-action='showduplicates-topic']", showduplicatesTopic);
$(document).on("click", "[data-action='markasdraft-topic']", markAsDraftTopic);
$(document).on("click", "[data-action='publish-topic']", publishTopic);
$(document).on("click", "[data-action='export-jira-topic']", export2JiraConfirm);
$(document).on("click", "a[data-action='updatestatus-topic-selected']", changeTopicStatus);
$(document).on("click", "[data-action='fill-user-profile']", fillUserProfile);
$(document).on("click", "[data-action='signin']", showSigninPanel2);
$(document).on("click", "[data-action='manage-collaborators']", manageCollaborators);
$(document).on("click", "[data-action='canned-response']", selectCannedResponse);
$(document).on("click", "[data-action='insert-topic']", insertTopic);
$(document).on("click", "[data-action='insert-topic-as-link']", insertTopicAsLink);
$(document).on("click", "[data-action='insert-topic-chat']", insertTopicChat);
$(document).on("click", "[data-action='insert-topic-as-link-chat']", insertTopicAsLinkChat);

function showSigninPanel2(data) {
  showSigninPanel();
}

function deleteTopicSuccess(data) {
  UE_addMsg(data.message);
  if (data.success == true) {
    fb_id = data.topic_id
    $('#base_modal').modal('hide');
    if (interface_mode == 'Moderation') {
      if ($('div.topics div.topic-item.active').length > 0 && $('div.topics div.topic-item.active').next().length > 0) {
        $('div.topics div.topic-item.active').next().click();
      } else {
        clearTopicDetails();
      }
      refreshStatCounts();
      return;
    }
    if (typeof _return_path_ != 'undefined') {
      window.location.replace(_return_path_);
    } else {
      $('#fb_item_' + fb_id).hide('slow');
    }
  }
}

function deleteTopicFail(data) {
  UE_addMsg('fail');
  $('#id_submit_btn').button('reset');
}

function showduplicatesTopic() {
  ueScrollTo($('#topic-duplicates'));
  $("#topic-duplicates #button_duplicates_toggle").find("i").toggleClass("fa-chevron-down").toggleClass("fa-chevron-up");
  $("#topic-duplicates .topic-duplicates").toggle();
  if (!$("#topic-duplicates .topic-duplicates").attr("data-state")) {
    topic_id = $(this).closest('div[data-topic-id]').attr('data-topic-id');
    $.ajax({
      type: 'GET',
      cache: false,
      url: '/topic/' + topic_id + '/duplicates/json/',
      success: function(data) {
        if (data.success == true) {
          $('.topic-duplicates').html(data.duplicates_html);
          $("#topic-duplicates .topic-duplicates").attr("data-state", "loaded");
        } else {
          UE_addMsg('fail');
        }
      },
      dataType: 'json'
    });
  }
  return false;
}

function mergeConfirm() {
  to_id = $(this).closest('div[data-topic-id]').attr('data-topic-id');
  topic_id = $(this).closest('div[data-exclude-id]').attr('data-exclude-id');
  showConfirmDialog(gettext("Are you sure you want to do this?"), 'javascript:merge("' + topic_id + '","' + to_id + '")');
  return false;
}

function merge(topic_id, to_id) {
  var merge_mode = (typeof(topic_merge_mode) != "undefined") ? topic_merge_mode : 'current_to_original';
  ajaxEdit({
    'url': '/actions/topic/merge/' + topic_id + '/' + to_id + '/' + merge_mode + '/',
    'result': mergeSuccess
  });
}

function mergeSuccess(data) {
  UE_addMsg(data.message);
  if (data.success == true) {
    if (data.merge_mode == 'current_to_original') {
      if (interface_mode == 'Moderation') {
        $('.modal').modal('hide')
        loadTopicDetails(data.to_id);
        $('#topic_' + data.from_id).hide('slow');
        return false;
      }
      if (typeof _return_path_ != 'undefined')
        window.location.replace('/topics/' + data.to_id + '-merge/');
      else
        $('#fb_item_' + data.from_id).hide('slow');
    } else {
      $('#merge4search #topic-' + data.to_id).hide();
    }
  }
  return false;
}

function unmergeConfirm() {
  topic_id = $(this).closest('ul[data-topic-id]').attr('data-topic-id');
  showConfirmDialog(gettext("Are you sure you want to do this?"), 'javascript:unmerge("' + topic_id + '")');
  return false;
}

function unmerge(topic_id) {
  ajaxEdit({
    'url': '/actions/topic/unmerge/' + topic_id + '/',
    'result': unmergeSuccess
  });
}

function unmergeSuccess(data) {
  UE_addMsg(data.message);
  if (data.success == true) {
    $('.topic-duplicates #topic-' + data.topic.id).hide('slow');
  }
  return false;
}

function showTopicWithoutDescription() {
  topic_id = $(this).closest('ul[data-topic-id]').attr('data-topic-id');
  $.post("/topic_json/", {
    topic_id: topic_id,
    mode: 'compact-list'
  }, showTopicSuccess, "json");
}

function showTopicWithDescription() {
  topic_id = $(this).closest('ul[data-topic-id]').attr('data-topic-id');
  $.post("/topic_json/", {
    topic_id: topic_id,
    mode: 'full-list'
  }, showTopicSuccess, "json");
}

function showTopicSuccess(data) {
  if (data.success == true) {
    $('.topic-duplicates #topic-' + data.topic_id).replaceWith(data.topic_html);
  }
  return false;
}

function removetagTopic() {
  topic_id = $(this).closest('div[data-topic-id]').attr('data-topic-id');
  tag_id = $(this).closest('[data-tag-id]').attr('data-tag-id');
  mode = $(this).closest('[data-topic-mode]').attr('data-topic-mode');
  showConfirmDialog('Do you want to delete this tag from topic ?', 'javascript:removeTag(' + topic_id + ',' + tag_id + ',"' + mode + '")');
  return false;
}

function removeTag(topic_id, tag_id, mode) {
  url = '/actions/topic/removetag/';
  params = {
    'topic_id': topic_id,
    'tag_id': tag_id,
    'mode': mode
  };
  $.ajax({
    type: 'POST',
    cache: false,
    url: url,
    data: params,
    success: function(data) {
      if (data.success == true) {
        $('#topic-' + topic_id).closest('.topic-container').html(data.topic.html);
      } else {
        UE_addMsg('fail');
      }
    },
    dataType: 'json'
  });
}

function voteTopic() {
  topic = $(this).closest('.topic-item');
  topic.find('.actions-bar').toggle();
  topic.find('[data-action="follow"][data-click-to-init]').click();
  return false;
}

function newTopic() {
  forum_id = $(this).closest('[data-forum-id]').attr('data-forum-id');
  from_comment_id = $(this).attr('data-from-comment-id');
  args = {}
  if (from_comment_id) {
    args["from_comment_id"] = from_comment_id;
  }
  showLeaveTopicPopup(forum_id, args);
  return false;
}

function newTopicSelectForum() {
  default_forum_id = $(this).closest('[data-forum-id]').attr('data-forum-id');
  from_comment_id = $(this).attr('data-from-comment-id');
  url = '/dialog/forum/select/';
  args = {}
  if (default_forum_id) {
    args['default_forum_id'] = default_forum_id;
  }
  if (from_comment_id) {
    args['from_comment_id'] = from_comment_id;
  }
  var params = (!args) ? '' : $.param(args);
  url += (!params) ? '' : '?' + params;
  ue_modal({
    'src': url,
    'maxheight': 'auto',
    'modal': true,
    callback: function() {}
  });
  return false;
}

function showLeaveTopicPopup(forum_id, args) {
  current_forum_id = $('body').attr('data-forum-id');
  text = '';
  inplace = false;
  if ($("body").hasClass("widget")) {
    inplace = true;
  }
  if (typeof args == 'undefined') {
    args = {};
  }
  if (!('category_id' in args)) {
    category_id = $('body').attr('data-category-id');
    if (category_id) {
      args['category_id'] = category_id;
    }
  }
  if (!('referer' in args)) {
    referer = $('body').attr('data-referer');
    if (referer) {
      args['referer'] = referer;
    }
  }
  if (('is_private_tab_click' in args) || ('is_public_tab_click' in args)) {
    prev_text = $('#id_topic_form #id_header').val();
    text = (prev_text ? prev_text : $("#search").val());
    description = $('#id_topic_form #id_description').val();
    if (text) {
      args['text'] = text;
    }
    if (description) {
      args['description'] = description;
    }
  } else {
    text = $("#search").val();
    if (text) {
      args['text'] = text;
    }
  }
  args['return_forum_id'] = current_forum_id;
  var params = (!args) ? '' : $.param(args);
  var url = '/' + (inplace ? 'inplace' : 'dialog') + '/leave-topic/' + forum_id + '/' + (params ? ('?' + params) : '');
  if (inplace) {
    ue_inplace({
      'src': url,
      'target': '#wrap',
      'maxheight': 'auto',
      callback: function() {
        initEditor($('#id_description'), forum_id);
      }
    });
  } else {
    ue_modal({
      'src': url,
      'maxheight': 'auto',
      'modal': true,
      callback: function() {
        initEditor($('#id_description'), forum_id);
      }
    });
  }
  return false;
}

function editTopic() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  forum_id = $(this).closest('[data-forum-id]').attr('data-forum-id');
  ue_modal({
    'src': '/dialog/topic/edit/' + topic_id + '/',
    'maxheight': 'auto',
    callback: function() {
      initEditor($('#id_description'), forum_id);
      $("button[data-toggle=tooltip]").tooltip();
    }
  });
  return false;
}

function translateTopic() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  ue_modal({
    'src': '/dialog/topic/translations/edit/' + topic_id + '/',
    'width': 'auto',
    'maxheight': true
  });
  return false;
}

function mergeTopic() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  ue_modal({
    'src': '/dialog/topic/merge/' + topic_id + '/',
    'maxheight': 'auto',
    'top': '10px'
  });
  return false;
}

function showVoters() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  ue_modal({
    'src': '/dialog/topic/' + topic_id + '/voters/',
    'maxheight': 'auto'
  });
  return false;
}

function editPollSettings() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  ue_modal({
    "src": '/dialog/poll/edit/' + topic_id + '/',
    'maxheight': 'auto'
  });
  return false;
}

function showPollVariantForm(topic_id, variant_id) {
  $('#base_modal').modal('hide');
  ue_modal({
    "src": '/dialog/poll/' + topic_id + '/variant/edit/' + variant_id + '/',
    'maxheight': 'auto'
  });
  return false;
}

function hidePollVariantForm(topic_id) {
  ue_modal({
    "src": '/dialog/poll/edit/' + topic_id + '/',
    'maxheight': 'auto'
  });
  return false;
}

function getinfoTopic() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  ue_modal({
    'src': '/dialog/topic/user_env/' + topic_id + '/'
  });
  return false;
}

function manageCollaborators() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  ue_modal({
    'src': '/dialog/topic/collaborators/' + topic_id + '/'
  });
  return false;
}

function moveTopic() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  ue_modal({
    'src': '/dialog/topic/' + topic_id + '/forum/change/'
  });
  return false;
}

function deleteTopic() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  forum_id = $(this).closest('[data-forum-id]').attr('data-forum-id');
  ue_modal({
    "src": '/dialog/topic/delete/' + topic_id + '/',
    'maxheight': true,
    "callback": function() {
      initEditor($('#id_admin_comment'), forum_id, true);
    }
  });
  return false;
}

function changeTopicStatus() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  status_id = $(this).attr('data-status-id');
  newCommentForm();
  $('.comment-edit-mode').hide();
  $('.comment-edit-mode .admin-post-features select[data-action="topic-status-change"]').val(status_id);
  $('.comment-edit-mode .btn-post').click();
  return false;
}

function topicToggleAdminPanel(element) {
  var is_open = $(element).hasClass('fa-chevron-down');
  if (is_open)
    $(element).removeClass('fa-chevron-down').addClass('fa-chevron-up');
  else
    $(element).removeClass('fa-chevron-up').addClass('fa-chevron-down');
  $('#additional_data').toggle();
  return false;
}

function changeTopicForumSuccess(data) {
  if (data.success == true) {
    $('#base_modal').modal('hide');
    UE_addMsg(gettext("topic forum changed"));
    if (interface_mode == 'Moderation') {
      loadTopicDetails(data.topic_id);
      return;
    }
    if (typeof _return_path_ != 'undefined')
      window.location.replace(_return_path_);
    else
      $('#fb_item_' + data.topic_id).hide('slow');
  }
  return false;
}

function markAsDraftTopic() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  url = '/actions/topic/mark_as_draft/';
  params = {
    'topic_id': topic_id
  };
  $.ajax({
    type: 'POST',
    cache: false,
    url: url,
    data: params,
    success: function(data) {
      if (data.success == true) {
        UE_addMsg(gettext("Topic marked as draft"));
        $("a[data-action='publish-topic']").parent().show();
        $("a[data-action='markasdraft-topic']").parent().hide();
        $('#topic-' + topic_id).closest('.topic-container').html(data.topic.html);
      } else {
        UE_addMsg('fail');
      }
    },
    dataType: 'json'
  });
  return false;
}

function publishTopic() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  url = '/actions/topic/accept/';
  params = {
    'topic_id': topic_id
  };
  $.ajax({
    type: 'POST',
    cache: false,
    url: url,
    data: params,
    success: function(data) {
      if (data.success == true) {
        $("a[data-action='publish-topic']").parent().hide();
        $("a[data-action='markasdraft-topic']").parent().show();
        $('#topic-' + topic_id).closest('.topic-container').html(data.topic.html);
        UE_addMsg(gettext("Topic published"));
        if (interface_mode == 'Moderation') {
          refreshStatCounts();
        }
      } else {
        UE_addMsg('fail');
      }
    },
    dataType: 'json'
  });
  return false;
}

function addTag(topic_id, tag_id) {
  url = '/actions/topic/addtag/';
  params = {
    'topic_id': topic_id,
    'tag_id': tag_id
  };
  $.ajax({
    type: 'POST',
    url: url,
    data: params,
    success: function(data) {
      if (data.success == true) {
        $('.topic-container').html(data.topic.html);
      } else {
        UE_addMsg('fail');
      }
    },
    dataType: 'json'
  });
}

function addCat(topic_id, category_id) {
  url = '/actions/topic/assigncategory/';
  params = {
    'topic_id': topic_id,
    'category_id': category_id
  };
  $.ajax({
    type: 'POST',
    url: url,
    data: params,
    success: function(data) {
      if (data.success == true) {
        $('.topic-container').html(data.topic.html);
      } else {
        UE_addMsg('fail');
      }
    },
    dataType: 'json'
  });
}

function export2JiraConfirm() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  showConfirmDialog(gettext("Are you sure you want to do this?"), 'javascript:export2Jira("' + topic_id + '")');
  return false;
}

function export2Jira(topic_id) {
  url = '/actions/topic/export/jira/';
  params = {
    'topic_id': topic_id
  };
  $.ajax({
    type: 'POST',
    cache: false,
    url: url,
    data: params,
    success: function(data) {
      UE_addMsg(data.message);
      if (data.success == true) {
        $('.topic-container').html(data.topic.html);
      }
    },
    dataType: 'json'
  });
}
$.fn.hasHeightOverflow = function() {
  return $(this).height() < $(this).children().height();
};
$.fn.showAll = function() {
  $(this).css('max-height', 'none');
};
$.fn.addShowAll = function() {
  var item = $(this);
  if (item.hasClass('mh_none')) return;
  var descr = item[0];
  var more_link = '<a class="b-post-more">' + gettext('Show more') + ' →</a>';
  if ($(descr).hasHeightOverflow()) {
    $(more_link).insertAfter(item).click(function() {
      $(this).prev().showAll();
      $(this).hide();
      $(this).prev().removeClass('has_overflow');
      return false;
    });
    item.addClass('has_overflow');
  }
}

function checkOverflow() {
  $.each($('.post'), function(i, item) {
    $(item).addShowAll();
  });
};

function fillUserProfile() {
  button_obj = $(this);
  url = '/dialog/fill-user-profile/'
  ue_modal({
    'src': url,
    'maxheight': 'auto',
    'modal': true,
    'donthide': true,
    'name': 'fill_user_profile',
    callback: function() {
      fup_button = button_obj;
    }
  });
  return false;
}

function selectCannedResponse() {
  ActiveEditor.redactor('selection.save');
  forum_id = $(this).attr('data-forum-id');
  ue_modal({
    'src': '/dialog/topic/canned_response/' + forum_id + '/',
    'maxheight': 'auto',
    'top': '10px'
  });
  return false;
}

function insertTopic() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  $.post("/topic_json/", {
    topic_id: topic_id,
    mode: 'get_description'
  }, insertTopicPlace, "json");
}

function insertTopicChat() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  $.post("/topic_json/", {
    topic_id: topic_id,
    mode: 'get_description'
  }, insertTopicPlaceChat, "json");
}

function insertTopicAsLink() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  $.post("/topic_json/", {
    topic_id: topic_id,
    mode: 'get_link'
  }, insertTopicPlace, "json");
}

function insertTopicAsLinkChat() {
  topic_id = $(this).closest('[data-topic-id]').attr('data-topic-id');
  $.post("/topic_json/", {
    topic_id: topic_id,
    mode: 'get_link'
  }, insertTopicPlaceChat, "json");
}

function insertTopicPlace(data) {
  if (data.success == true) {
    ActiveEditor.redactor('selection.restore');
    ActiveEditor.redactor('insert.html', data.topic_description);
    $(".modal").modal('hide');
  }
  return false;
}

function insertTopicPlaceChat(data) {
  if (data.success == true) {
    $('.tab-pane.active #message').redactor('code.set', data.topic_description);
    $('.tab-pane.active #message').redactor('focus.setStart');
    $(".modal").modal('hide');
  }
  return false;
}

function mtopiclistPaginatorClick() {
  module_id = $(this).closest('div.module').attr('id');
  page_id = $(this).attr('data-page-id');
  if ('save_page_hash' in __m_settings[module_id] && __m_settings[module_id]['save_page_hash']) {
    if (ue_page_hash == '') {
      setUEPageHash(module_id + '/page/1');
    }
    setUEPageHash(module_id + '/page/' + page_id);
  }
  mtopiclistChangeTopicPage(module_id, page_id);
  ueScrollTo($('#' + module_id));
  return false;
}

function mtopiclistChangeTopicPage(module_id, page_id) {
  mtopiclistGetTopicList(module_id, __m_settings[module_id]['forum_id'], __m_settings[module_id]['type_id'], __m_settings[module_id]['order'], page_id);
}

function mtopiclistGetTopicList(module_id, forum_id, type_id, order, page, tag_name) {
  url = '/modules/module/mtopic_list/' + module_id + '/get_list/' + forum_id + '/' + type_id + '/' + __m_settings[module_id]['status'] + '/' + order + '/' + __m_settings[module_id]['count_on_page'] + '/' + __m_settings[module_id]['topic_mode'] + '/?view=' + __m_settings[module_id]['view'];
  if (typeof(page) != 'undefined' && page != -1) url += '&page=' + page;
  else if (typeof(tag_name) != 'undefined' && tag_name != -1) url += '&tag=' + tag_name;
  if (__m_settings[module_id]['category']) url += '&category=' + __m_settings[module_id]['category'];
  if (__m_settings[module_id]['filter_user_id']) url += '&user_id=' + __m_settings[module_id]['filter_user_id'];
  if (__m_settings[module_id]['assigned_user_id']) url += '&assigned_user_id=' + __m_settings[module_id]['assigned_user_id'];
  $("#mask_loading_" + module_id).show();
  ajaxEdit({
    'url': url,
    'result': mtopiclistGetTopicListSuccess
  });
}

function mtopiclistGetTopicListSuccess(data) {
  module_id = data.module_id;
  type_id = data.type_id;
  $('#' + module_id + ' .topiclist-topics').html('');
  $('#' + module_id + ' .topiclist-paginator').html('');
  $('#' + module_id + ' #no_topic').hide();
  $('#' + module_id + ' #filter-topictype').removeClass('active');
  if (data.type_highlight) $('#' + module_id + ' #filter-topictype').addClass('active');
  $('#' + module_id + ' #filter-topictype .filter-name').text(data.type_text);
  if (data.type_count == 0) {
    $('#' + module_id + ' #filter-topictype > a > .badge').hide();
  } else {
    $('#' + module_id + ' #filter-topictype > a > .badge').show().text(data.type_count);
  }
  $('#' + module_id + ' #tabs li').removeClass("active");
  $('#' + module_id + ' #tabs #tab' + data.type_id).parent().addClass("active");
  $('#' + module_id + ' #filter-topicstatus').removeClass('active');
  if (data.filter_highlight) $('#' + module_id + ' #filter-topicstatus').addClass('active');
  $('#' + module_id + ' #filter-topicstatus .filter-name').text(data.filter_text);
  if (data.filter_count == 0) {
    $('#' + module_id + ' #filter-topicstatus .badge').hide();
  } else {
    $('#' + module_id + ' #filter-topicstatus .badge').show().text(data.filter_count);
  }
  $('#' + module_id + ' #filter-tags .filter-name').text(data.tag_text);
  $('#' + module_id + ' #filter-tags').removeClass('active');
  if (data.tag_highlight) $('#' + module_id + ' #filter-tags').addClass('active');
  $('#' + module_id + ' #dropdown-sort #order_text').text(data.order_text);
  $("#mask_loading_" + module_id).hide();
  if (data.topics.length) {
    $.each(data.topics, function(i, item) {
      $('#' + module_id + ' .topiclist-topics').append(item);
    });
  } else
    $('#' + module_id + ' #no_topic').show();
  $('#' + module_id + ' .topiclist-paginator').html(data.pages_html);
  if (data.filter_user_id) {
    $('#' + module_id + ' .filter_user_tag #user_filter_text').text(data.filter_user_name);
    $('#' + module_id + ' .filter_user_tag').show();
    $('#' + module_id + ' .filter_user_tag .avatar').attr('src', data.filter_user_avatar);
  } else {
    $('#' + module_id + ' #id_user_filter_tag').hide();
  }
  $('#' + module_id + ' div.topic-text').each(function(index) {
    $(this).addShowAll();
  });
  $("span[data-rel]").tooltip({
    container: 'body'
  });
  $("#" + module_id + " .topiclist-topics [rel=tooltip]").tooltip({
    container: 'body'
  });
  $("#" + module_id + " .topiclist-topics [data-toggle=tooltip]").tooltip({
    container: 'body'
  });

  function getURLParameter(name) {
    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
  }
  setupImageZoom($('#' + module_id + ' .ue-content img'));
};

function mtopiclistShowTopicFilter(module_id, obj) {
  $('#filter-topicstatus .dropdown-menu').html('').load('/modules/module/mtopic_list/' + module_id + '/get_filter_popup/' + __m_settings[module_id]['forum_id'] + '/' + __m_settings[module_id]['type_id'] + '/', function() {
    $('#filter-topicstatus .dropdown-toggle').dropdown();
  });
}

function mtopiclistChangeTopicFilter(module_id, filter_name) {
  __m_settings[module_id]['status'] = filter_name;
  mtopiclistGetTopicList(module_id, __m_settings[module_id]['forum_id'], __m_settings[module_id]['type_id'], __m_settings[module_id]['order'], -1, -1);
}

function mtopiclistChangeTopicTag(module_id, tag_name) {
  __m_settings[module_id]['tag'] = tag_name;
  mtopiclistGetTopicList(module_id, __m_settings[module_id]['forum_id'], __m_settings[module_id]['type_id'], __m_settings[module_id]['order'], -1, tag_name);
  return false;
}

function mtopiclistChangeTopicType(module_id, type_id) {
  __m_settings[module_id]['type_id'] = type_id;
  mtopiclistGetTopicList(module_id, __m_settings[module_id]['forum_id'], type_id, __m_settings[module_id]['order']);
}

function mtopiclistChangeTopicOrder(module_id, order) {
  __m_settings[module_id]['order'] = order;
  mtopiclistGetTopicList(module_id, __m_settings[module_id]['forum_id'], __m_settings[module_id]['type_id'], __m_settings[module_id]['order']);
}

function mtopiclistSetUserFilter(module_id, user_id, filter_name, user_filter_type) {
  __m_settings[module_id]['status'] = filter_name;
  __m_settings[module_id]['tag'] = '';
  __m_settings[module_id]['type_id'] = 0;
  if (user_filter_type == 'author') {
    __m_settings[module_id]['filter_user_id'] = user_id;
  } else if (user_filter_type == 'performer') {
    __m_settings[module_id]['assigned_user_id'] = user_id;
  }
  mtopiclistGetTopicList(module_id, __m_settings[module_id]['forum_id'], __m_settings[module_id]['type_id'], __m_settings[module_id]['order'], 1, __m_settings[module_id]['tag']);
  $('#' + module_id + ' .m_usertopicstates .active').removeClass('active');
  $('#' + module_id + ' .m_usertopicstates #status' + filter_name).addClass('active');
}

function mtopiclistClearUserFilter(module_id) {
  __m_settings[module_id]['filter_user_id'] = '';
  $('#' + module_id + ' .filter_user_tag').hide();
  mtopiclistGetTopicList(module_id, __m_settings[module_id]['forum_id'], __m_settings[module_id]['type_id'], __m_settings[module_id]['order'], 1, __m_settings[module_id]['tag']);
  $('#' + module_id + ' #m_topic_list .m_usertopicstats .active').removeClass('active');
}
$(document).on("click", ".topic-item button[data-action='vote']", vote);
$(document).on("click", ".topic-item button[data-action='load-multivoter']", loadMultivoter);

function loadMultivoter() {
  voting_type = $(this).attr('data-voting-type');
  topic_item = $(this).closest('.topic-item');
  topic_id = topic_item.attr('data-topic-id');
  dropdown_menu = topic_item.find(".multivoter.vote-" + voting_type)
  dropdown_menu.html(dropdown_menu.attr('data-loading-text')).load('/voting/multivoter/' + topic_id + '/' + voting_type + '/');
  return false;
}

function vote(event) {
  vote_value = $(this).attr('data-vote-value');
  if (typeof vote_value == 'undefined' || vote_value === false) {
    vote_value = 1;
  }
  topic_item = $(this).closest('.topic-item');
  topic_id = topic_item.attr('data-topic-id');
  topic_mode = topic_item.attr('data-topic-mode');
  module_id = $(this).closest('.module').attr('id');
  if ($(this).hasClass('btn-multivoter')) {
    voting_type = vote_value > 0 ? "up" : "down";
    topic_item.find('[data-action="load-multivoter"][data-voting-type="' + voting_type + '"]').button('loading');
  } else {
    $(this).button('loading');
  }
  putVote("Topic", topic_id, vote_value, topic_mode, module_id);
}

function putVote(model, object_id, vote_value, mode, module_id) {
  var data = {
    'model': model,
    'object_id': object_id,
    'vote_value': vote_value,
    'mode': mode,
    'module_id': module_id
  };
  $.post("/voting/vote/", data, function(data) {
    putVoteAnswer(data, object_id)
  }, "json");
}

function putVoteAnswer(data, object_id) {
  if (data.message) {
    UE_addMsg(data.message);
  }
  $('#' + data.module_id + ' #topic-' + object_id).replaceWith(data.topic.html);
  if ($('.module-votes-left').length > 0 && data.topic.votes_left_html) {
    $('.module-votes-left').replaceWith(data.topic.votes_left_html);
  }
  $(".tooltip").remove();
  $("[data-toggle=tooltip]").tooltip({
    container: 'body'
  });
  if (data.need_login) {
    showSigninPanel('$(".modal").modal("hide");putVote("Topic",' + object_id + ',"' + data.vote_value + '","' + data.mode + '","' + data.module_id + '");');
  }
}

function putPollVote(object_id, reverse) {
  $("#poll_variant_" + object_id).parent().find('.pv_vote_indicator').attr('disabled', true);
  checked = ($("#poll_variant_" + object_id + " .pv_vote_indicator").attr('checked') == 'checked');
  checked = reverse ? !checked : checked;
  direction = checked ? 'up' : 'clear';
  serverurl = "/poll/variant/" + object_id + "/" + direction + "vote/";
  $.post(serverurl, {}, function(data) {
    putPollVoteAnswer(data, object_id)
  }, "json");
}

function putPollVoteAnswer(data, object_id) {
  UE_addMsg(data.message);
  if (data.success) {
    $("#poll_variant_" + data.variant_id + " .pv_vc").html(data.vote_sum);
  }
  $("#poll_variant_" + data.variant_id + " .pv_vote_indicator").attr('checked', (data.curuser == 1));
  checked_count = $("#poll_variant_" + data.variant_id).parent().find('.pv_vote_indicator:checked').length;
  if (data.poll_multiple_votes || checked_count == 0)
    if (data.poll_return_vote_enabled)
      $("#poll_variant_" + data.variant_id).parent().find('.pv_vote_indicator').attr('disabled', false);
    else
      $("#poll_variant_" + data.variant_id).parent().find('.pv_vote_indicator').not(':checked').attr('disabled', false);
  else if (data.poll_return_vote_enabled)
    $("#poll_variant_" + data.variant_id).parent().find('.pv_vote_indicator:checked').attr('disabled', false);
}
$(document).on("click", "[data-action='block-user']", blockUser);
$(document).on("click", "[data-action='invite-user']", inviteUser);
$(document).on("click", "[data-action='invite-user-popup']", inviteUserPopup);
$(document).on("click", "[data-action='unblock-user']", unblockUser);
$(document).on("click", "[data-action='assign-user-group-dialog']", assignUserGroupDialog);
$(document).on("click", "[data-action='change-avatar']", changeAvatar);
$(document).on("click", "[data-action='assign-user-group']", assignUserGroup);

function changeAvatar(data) {
  ue_modal({
    "src": '/dialog/image-selector/ue_core.user/avatar/' + $(this).closest('[data-user-id]').attr('data-user-id') + '/',
    'callback': function() {
      initImageSelector({
        'imagePlace': $('#id_div_avatar')
      })
    }
  });
}

function setUserBlockStatusSuccess(data) {
  if (data.success) {
    $('#id_link_block_user').hide();
    $('#id_link_unblock_user').hide();
    $('#id_img_user_blocked').hide();
    $('#id_label_user_blocked').hide();
    if (data.is_blocked) {
      $('#id_link_unblock_user').show();
      $('#id_img_user_blocked').show();
      $('#id_label_user_blocked').show();
      UE_addMsg(gettext("User is blocked"));
    } else {
      $('#id_link_block_user').show();
      UE_addMsg(gettext("User is unblocked"));
    }
  }
}

function inviteUserPopup() {
  email = $(this).closest('[data-email]').attr('data-email');
  ue_modal({
    'src': '/dialog/topic/invite_user/',
    'maxheight': 'auto',
    'top': '10px',
    'callback': function() {
      $('#id_email').val(email);
    }
  });
};

function inviteUser() {
  ajaxEdit({
    'url': '/actions/user/invite/json/',
    'form': '#invite_user_form',
    'result': inviteUserResult
  });
  return false;
};

function inviteUserResult(data) {
  UE_addMsg(gettext("User has been invited"));
  window.location.assign("?search=" + data.email + "&search_by=email");
}

function blockUser() {
  user_id = $(this).closest('[data-user-id]').attr('data-user-id');
  ajaxEdit({
    'url': '/users/' + user_id + '/set_block_status/1/',
    'result': setUserBlockStatusSuccess
  });
};

function unblockUser() {
  user_id = $(this).closest('[data-user-id]').attr('data-user-id');
  ajaxEdit({
    'url': '/users/' + user_id + '/set_block_status/0/',
    'result': setUserBlockStatusSuccess
  });
};

function assignUserGroupDialog() {
  user_id = $(this).closest('[data-user-id]').attr('data-user-id');
  ue_modal({
    'src': '/dialog/users/' + user_id + '/groups/assign/'
  });
  return false;
}

function assignUserGroup() {
  user_id = $(this).closest('[data-user-id]').attr('data-user-id');
  group_id = $(this).closest('form').find('input[name=group]:checked').val();
  data = {
    'user_id': user_id,
    'group_id': group_id
  }
  $.post('/actions/user/group/assign/', data, function(data) {
    UE_addMsg(data.message);
    $('#base_modal').modal('hide');
    $('[data-user-id=' + data.user_id + '] .group-name').text(data.group_name);
    $('#user_group_data').toggle(data.group_id != 0);
  }, "json");
  return false;
}

function sendEmailConfirmation() {
  var data = {};
  $.post("/confirmation/email/", data, function(data) {
    UE_addMsg(gettext("We've sent confirmation letter. Check your email."));
  }, "json");
}
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
(function() {
  var b, d, c;
  b = jQuery;
  c = (function() {
    function b() {
      this.fadeDuration = 500;
      this.fitImagesInViewport = true;
      this.resizeDuration = 700;
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
$(document).ready(function() {
  var mydiv = '\
<div id="confirm_dlg" class="modal fade" style="z-index:30000;">\
  <div class="modal-dialog">\
    <div class="modal-content">\
      <div class="modal-header">\
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
        <h4 class="modal-title">' + gettext("Confirm") + '</h4>\
      </div>\
      <div id="confirm_dlg_message" class="modal-body">\
      </div>\
      <div class="modal-footer">\
        <button id="confirm_dlg_yes" type="button" class="btn btn-primary">' + gettext("Yes") + '</button>\
        <button id="confirm_dlg_no" type="button" class="btn btn-default" data-dismiss="modal">' + gettext("No") + '</button>\
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
  $('#confirm_dlg .modal-title').text(gettext("Confirm"));
  $('#confirm_dlg #confirm_dlg_no').text(gettext("No"));
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
  $('#confirm_dlg .modal-title').text(gettext("Alert"));
  $('#confirm_dlg #confirm_dlg_no').text(gettext("Close"));
  $('#confirm_dlg #confirm_dlg_yes').hide()
  $('#confirm_dlg').modal({
    'backdrop': true
  }).modal('show');
}

function showUserModerationInfo(obj) {
  var is_topic = obj.hasClass('topic-item');
  var data_obj = obj.find('.user-moderation-status');
  var message = "<strong>" + gettext("This object has been marked by users because you have selected users moderation") + "</strong><br>";
  message += gettext("Inappropriate") + ": " + data_obj.attr('data-inappropriate') + "<br>";
  message += gettext("Spam") + ": " + data_obj.attr('data-spam') + "<br>";
  message += gettext("Duplicate") + ": " + data_obj.attr('data-duplicate') + "<br>";
  message += "<br><strong>" + gettext("Accept if you want to remove this marks") + "</strong>";
  showAlert(message);
  return false;
}
/*!
 * Datepicker for Bootstrap v1.5.0-RC1 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
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
});

function reportSuccess(data, model, object_id) {
  $('#rl_' + model.replace('.', '_') + '_' + object_id).hide('slow');
  UE_addMsg('Thank you for report.');
}

function putReport(model, object_id, type_id) {
  serverurl = "/report/" + model + "/" + object_id + "/" + type_id + "/";
  var data = {};
  $.post(serverurl, data, function(data) {
    reportSuccess(data, model, object_id)
  }, "json")
} /*! http://mths.be/placeholder v2.0.8 by @mathias */ ;
(function(window, document, $) {
  var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
  var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
  var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
  var prototype = $.fn;
  var valHooks = $.valHooks;
  var propHooks = $.propHooks;
  var hooks;
  var placeholder;
  if (isInputSupported && isTextareaSupported) {
    placeholder = prototype.placeholder = function() {
      return this;
    };
    placeholder.input = placeholder.textarea = true;
  } else {
    placeholder = prototype.placeholder = function() {
      var $this = this;
      $this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]').not('.placeholder').bind({
        'focus.placeholder': clearPlaceholder,
        'blur.placeholder': setPlaceholder
      }).data('placeholder-enabled', true).trigger('blur.placeholder');
      return $this;
    };
    placeholder.input = isInputSupported;
    placeholder.textarea = isTextareaSupported;
    hooks = {
      'get': function(element) {
        var $element = $(element);
        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value;
        }
        return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
      },
      'set': function(element, value) {
        var $element = $(element);
        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value = value;
        }
        if (!$element.data('placeholder-enabled')) {
          return element.value = value;
        }
        if (value == '') {
          element.value = value;
          if (element != safeActiveElement()) {
            setPlaceholder.call(element);
          }
        } else if ($element.hasClass('placeholder')) {
          clearPlaceholder.call(element, true, value) || (element.value = value);
        } else {
          element.value = value;
        }
        return $element;
      }
    };
    if (!isInputSupported) {
      valHooks.input = hooks;
      propHooks.value = hooks;
    }
    if (!isTextareaSupported) {
      valHooks.textarea = hooks;
      propHooks.value = hooks;
    }
    $(function() {
      $(document).delegate('form', 'submit.placeholder', function() {
        var $inputs = $('.placeholder', this).each(clearPlaceholder);
        setTimeout(function() {
          $inputs.each(setPlaceholder);
        }, 10);
      });
    });
    $(window).bind('beforeunload.placeholder', function() {
      $('.placeholder').each(function() {
        this.value = '';
      });
    });
  }

  function args(elem) {
    var newAttrs = {};
    var rinlinejQuery = /^jQuery\d+$/;
    $.each(elem.attributes, function(i, attr) {
      if (attr.specified && !rinlinejQuery.test(attr.name)) {
        newAttrs[attr.name] = attr.value;
      }
    });
    return newAttrs;
  }

  function clearPlaceholder(event, value) {
    var input = this;
    var $input = $(input);
    if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
      if ($input.data('placeholder-password')) {
        $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
        if (event === true) {
          return $input[0].value = value;
        }
        $input.focus();
      } else {
        input.value = '';
        $input.removeClass('placeholder');
        input == safeActiveElement() && input.select();
      }
    }
  }

  function setPlaceholder() {
    var $replacement;
    var input = this;
    var $input = $(input);
    var id = this.id;
    if (input.value == '') {
      if (input.type == 'password') {
        if (!$input.data('placeholder-textinput')) {
          try {
            $replacement = $input.clone().attr({
              'type': 'text'
            });
          } catch (e) {
            $replacement = $('<input>').attr($.extend(args(this), {
              'type': 'text'
            }));
          }
          $replacement.removeAttr('name').data({
            'placeholder-password': $input,
            'placeholder-id': id
          }).bind('focus.placeholder', clearPlaceholder);
          $input.data({
            'placeholder-textinput': $replacement,
            'placeholder-id': id
          }).before($replacement);
        }
        $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
      }
      $input.addClass('placeholder');
      $input[0].value = $input.attr('placeholder');
    } else {
      $input.removeClass('placeholder');
    }
  }

  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (exception) {}
  }
}(this, document, jQuery));
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
          html = html.replace(/&lt;span id=&quot;selection-marker-([0-9])&quot; class=&quot;redactor-selection-marker&quot; data-verified=&quot;redactor&quot;&gt;​&lt;\/span&gt;/g, '<span id="selection-marker-$1" class="redactor-selection-marker" data-verified="redactor">​</span>');
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
            imageEdit: String() + '<section id="redactor-modal-image-edit">' + '<label>' + this.lang.get('title') + '</label>' + '<input type="text" id="redactor-image-title" />' + '<label class="redactor-image-link-option">' + this.lang.get('link') + '</label>' + '<input type="text" id="redactor-image-link" class="redactor-image-link-option" aria-label="' + this.lang.get('link') + '" />' + '<label class="redactor-image-link-option"><input type="checkbox" id="redactor-image-link-blank" aria-label="' + this.lang.get('link_new_tab') + '"> ' + this.lang.get('link_new_tab') + '</label>' + '<label class="redactor-image-position-option">' + this.lang.get('image_position') + '</label>' + '<select class="redactor-image-position-option" id="redactor-image-align" aria-label="' + this.lang.get('image_position') + '">' + '<option value="none">' + this.lang.get('none') + '</option>' + '<option value="left">' + this.lang.get('left') + '</option>' + '<option value="center">' + this.lang.get('center') + '</option>' + '<option value="right">' + this.lang.get('right') + '</option>' + '</select>' + '<label><input type="checkbox" id="redactor_link_blank"> ' + this.opts.curLang.link_new_tab + '</label>' + '<label>' + gettext("Width, px") + '</label>' + '<input id="redactor_img_width" class="redactor_input" />' + '<label>' + gettext("Height, px") + '</label>' + '<input id="redactor_img_height" class="redactor_input" />' + '<label><input type="checkbox" id="redactor_keep_aspect_ratio" checked="true"> ' + gettext("Keep aspect ratio") + '</label>' + '</section>',
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
if (!RedactorPlugins) var RedactorPlugins = {};
RedactorPlugins.ueactions = function() {
  return {
    init: function() {
      var that = this;
      var dropdown = {};
      dropdown.id = {
        title: gettext("Set tag ID"),
        func: this.ueactions.getUeActionsForm
      };
      dropdown.class = {
        title: gettext("Set tag Class"), func: this.ueactions.getUeActionsForm
      };
      if ("uesavecontenturl" in this.opts && this.opts.uesavecontenturl) {
        dropdown.uesavecontent = {
          title: gettext("Save"),
          func: this.ueactions.ueSaveContent
        };
      }
      var button = this.button.add('ue_methods', gettext("Additional options"));
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
        alert(gettext("No element selected"));
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
      return String() + '<section>' + '<form id="redactorUEActionsForm" method="post" action="">' + '<div id="redactor_tabs">' + '<label>' + gettext("Value") + '</label>' + '<input type="hidden" id="redactor_ueactions_tag_attr"/>' + '<input type="text" id="redactor_ueactions_tag_value" class="redactor_input"  />' + '</div>' + '</form>' + '</section>'
    }
  };
};