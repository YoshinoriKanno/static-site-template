!(function (t, e) {
  typeof exports === 'object' && typeof module === 'object'
    ? (module.exports = e())
    : typeof define === 'function' && define.amd
    ? define([], e)
    : typeof exports === 'object'
    ? (exports.MatchHeight = e())
    : (t.MatchHeight = e());
})(self, () =>
  (() => {
    var t = {
      d: (e, n) => {
        for (const r in n) t.o(n, r) && !t.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
    };
    const e = {};
    t.d(e, { default: () => h });
    function n(t) {
      for (var e = '', n = 0; n < t; n += 1) e += '-';
      return e;
    }
    function r(t) {
      const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
      return Array.prototype.slice.call(e.querySelectorAll(t));
    }
    function o(t) {
      return typeof t === 'string' ? r(t) : t instanceof Element ? [t] : t ? Array.prototype.slice.call(t) : [];
    }
    function a(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    function i(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    const u = (function () {
      function t() {
        let e;
        const n = this;
        !(function (t, e) {
          if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        })(this, t),
          (e = this.reset.bind(this)),
          document.readyState !== 'loading' ? e() : document.addEventListener('DOMContentLoaded', e),
          window.addEventListener('resize', () => n.update()),
          (this.groupCounter = 1);
      }
      let e;
      let u;
      return (
        (e = t),
        (u = [
          {
            key: 'findElements',
            value() {
              this.groups = this.group(r('[data-match-height]'));
            },
          },
          {
            key: 'group',
            value(t) {
              return t.reduce((t, e) => {
                let n = e.getAttribute('data-match-height');
                const r = e.closest('[data-match-height-group]');
                return (
                  r && (n = `${r.getAttribute('data-match-height-group')}-${n}`), (t[n] = (t[n] || []).concat(e)), t
                );
              }, {});
            },
          },
          {
            key: 'isEnabled',
            value(t) {
              if (!t || !t[0]) return !1;
              const e = t[0];
              const n = e.closest('[data-match-height-enable]');
              if (n) {
                const r = n.getAttribute('data-match-height-enable');
                return r === 'true' || (r !== 'false' && window.matchMedia(r).matches);
              }
              const o = e.closest('[data-match-height-disable]');
              if (o) {
                const a = o.getAttribute('data-match-height-disable');
                return a !== 'true' && (a === 'false' || !window.matchMedia(a).matches);
              }
              return !0;
            },
          },
          {
            key: 'match',
            value(t) {
              const e = t.reduce((t, e) => ((e.style.height = ''), Math.max(t, e.offsetHeight)), 0);
              t.forEach((t) => (t.style.height = ''.concat(e, 'px')));
            },
          },
          {
            key: 'update',
            value(t) {
              const e = this.getGroups(t);
              for (const n in e) {
                const r = e[n];
                this.isEnabled(r) ? this.match(r) : r.forEach((t) => (t.style.height = ''));
              }
            },
          },
          {
            key: 'reset',
            value() {
              this.findElements(), this.update();
            },
          },
          {
            key: 'getNewGroupID',
            value() {
              const t = 'group-'.concat(this.groupCounter);
              return (this.groupCounter += 1), t;
            },
          },
          {
            key: 'getGroupID',
            value(t) {
              const e = (t = o(t)).shift();
              if (!e) return null;
              let n = e.getAttribute('data-match-height');
              const r = e.closest('[data-match-height-group]');
              return r && (n = `${r.getAttribute('data-match-height-group')}-${n}`), n;
            },
          },
          {
            key: 'getGroups',
            value(t) {
              return t
                ? (typeof t === 'string' && this.groups[t] ? (e = t) : ((t = o(t)), (e = this.getGroupID(t))),
                  this.groups[e]
                    ? ((n = {}),
                      (r = e),
                      (a = this.groups[e]),
                      r in n
                        ? Object.defineProperty(n, r, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                        : (n[r] = a),
                      n)
                    : {})
                : this.groups;
              let e;
              let n;
              let r;
              let a;
            },
          },
          {
            key: 'getControl',
            value(t) {
              const e = (t = o(t)).shift();
              return e ? e.closest('[data-match-height-enable], [data-match-height-disable]') : null;
            },
          },
          {
            key: 'add',
            value(t, e) {
              (t = o(t)),
                (e = e || this.getNewGroupID()),
                t.forEach((t) => t.setAttribute('data-match-height', e)),
                (this.groups[e] = (this.groups[e] || []).concat(t)),
                this.update(e);
            },
          },
          {
            key: 'remove',
            value(t) {
              if (typeof t === 'string' && this.groups[t]) delete this.groups[t];
              else {
                let e;
                const n = this;
                const r = o(t);
                let a = [];
                r.forEach((t) => {
                  const e = n.getGroupID(t);
                  t.removeAttribute('data-match-height'),
                    (n.groups[e] = n.groups[e].filter((e) => e && e !== t)),
                    n.groups[e].length ? a.push(e) : (delete n.groups[e], (a = a.filter((t) => t !== e)));
                }),
                  ((e = a), e.filter((t, e, n) => n.indexOf(t) === e)).forEach((t) => n.update(t));
              }
            },
          },
          {
            key: 'debug',
            value(t) {
              let e;
              const r = this.getGroups(t);
              if (((e = r), Object.getOwnPropertyNames(e).length !== 0)) {
                for (const o in r)
                  if (a(r, o)) {
                    const i = r[o];
                    const u = this.getControl(i);
                    const c = {};
                    (c.isEnabled = this.isEnabled(i)),
                      (c.control = u),
                      (c.enable = u ? u.getAttribute('data-match-height-enable') : void 0),
                      (c.disable = u ? u.getAttribute('data-match-height-disable') : void 0),
                      (c.groupID = o),
                      (c.group = i),
                      console.log(
                        '\n---------------------------'
                          .concat(n(o.length), '-\n🐛 Match Height Debugger: "')
                          .concat(o, '"\n---------------------------')
                          .concat(n(o.length), '-\n\n👇 Click into the object below to inspect your elements.\n\n')
                      ),
                      console.log(c),
                      console.log('\n');
                  }
              } else
                console.log(
                  '\n😢 Oh no! Match Height couldn\'t find a matching group for "'.concat(
                    t,
                    '".\n\n--------------------------------------------------------------------------------------------\nℹ️ NOTE: Make sure the elements you\'re trying to debug have a [data-match-height] attribute.\n--------------------------------------------------------------------------------------------\n\n'
                  )
                );
            },
          },
        ]) && i(e.prototype, u),
        t
      );
    })();
    !(function (t) {
      const e = t.Element.prototype;
      typeof e.matches !== 'function' &&
        (e.matches =
          e.msMatchesSelector ||
          e.mozMatchesSelector ||
          e.webkitMatchesSelector ||
          function (t) {
            for (var e = this, n = (e.document || e.ownerDocument).querySelectorAll(t), r = 0; n[r] && n[r] !== e; )
              ++r;
            return Boolean(n[r]);
          }),
        typeof e.closest !== 'function' &&
          (e.closest = function (t) {
            for (let e = this; e && e.nodeType === 1; ) {
              if (e.matches(t)) return e;
              e = e.parentNode;
            }
            return null;
          });
    })(window);
    const c = new u();
    (window.MatchHeight = c),
      typeof $ !== 'undefined' &&
        ($.fn.matchHeight = function () {
          window.MatchHeight.add(this);
        });
    const h = c;
    return e.default;
  })()
);
// # sourceMappingURL=match-height.js.map
