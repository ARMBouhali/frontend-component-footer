function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';
import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube, faInstagram, faReddit, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
ensureConfig(['LMS_BASE_URL', 'LOGO_TRADEMARK_URL', 'LMS_BASE_URL'], 'Footer component');
var EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link'
};

var SiteFooter = /*#__PURE__*/function (_React$Component) {
  _inherits(SiteFooter, _React$Component);

  var _super = _createSuper(SiteFooter);

  function SiteFooter(props) {
    var _this;

    _classCallCheck(this, SiteFooter);

    _this = _super.call(this, props);
    _this.externalLinkClickHandler = _this.externalLinkClickHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SiteFooter, [{
    key: "getLocalePrefix",
    value: function getLocalePrefix(locale) {
      var twoLetterPrefix = locale.substring(0, 2).toLowerCase();

      if (twoLetterPrefix === 'en') {
        return '';
      }

      return "/".concat(twoLetterPrefix);
    }
  }, {
    key: "externalLinkClickHandler",
    value: function externalLinkClickHandler(event) {
      var label = event.currentTarget.getAttribute('href');
      var eventName = EVENT_NAMES.FOOTER_LINK;
      var properties = {
        category: 'outbound_link',
        label: label
      };
      sendTrackEvent(eventName, properties);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          supportedLanguages = _this$props.supportedLanguages,
          onLanguageSelected = _this$props.onLanguageSelected,
          logo = _this$props.logo,
          intl = _this$props.intl;
      var showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
      var config = this.context.config;
      var socialIcons = [{
        key: 'Facebook',
        text: 'Like our Facebook page',
        //Intl
        icon: faFacebookF,
        url: '#'
      }, {
        key: 'Twitter',
        text: 'Follow us on Twitter',
        //Intl
        icon: faTwitter,
        url: '#'
      }, {
        key: 'Instagram',
        text: 'Follow us on Instagram',
        //Intl
        icon: faInstagram,
        url: '#'
      }, {
        key: 'LinkedIn',
        text: 'Check our LinkedIn page',
        //Intl
        icon: faLinkedinIn,
        url: '#'
      }, {
        key: 'YouTube',
        text: 'Subscribe to our YouTube Channel',
        //Intl
        icon: faYoutube,
        url: '#'
      }, {
        key: 'Reddit',
        text: 'Subscribe to our subreddit',
        //Intl
        icon: faReddit,
        url: '#'
      }];
      var menus = [{
        key: 'info',
        title: 'أكاديمية الرواد',
        items: [{
          key: 'about',
          text: 'من نحن',
          url: config.LMS_BASE_URL + '/about'
        }]
      }, {
        key: 'legal',
        title: 'معلومات قانونية',
        items: [{
          key: 'privacy',
          text: 'سياسة الخصوصية',
          url: config.LMS_BASE_URL + '/privacy'
        }, {
          key: 'tos_and_honor',
          text: 'شروط الخدمة و ميثاق الشرف الاكاديمي',
          url: config.LMS_BASE_URL + '/tos_and_honor'
        }]
      }, {
        key: 'connect',
        title: 'تواصل',
        items: [{
          key: 'blog',
          text: 'الموقع الرسمي',
          url: 'https://tarjihacademy.org'
        }, {
          key: 'contact',
          text: 'اتصل بنا',
          url: config.LMS_BASE_URL + '/support/contact_us'
        }, {
          key: 'donate',
          text: 'تبرع',
          url: config.LMS_BASE_URL + '/donate'
        }]
      }];
      return /*#__PURE__*/React.createElement("footer", {
        role: "contentinfo",
        className: "footer d-flex flex-column border-top py-3 px-4 "
      }, /*#__PURE__*/React.createElement("div", {
        className: "container-fluid d-flex justify-content-center flex-wrap",
        style: {
          columnGap: 32
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "logo-area d-flex justify-content-center align-items-center flex-column"
      }, /*#__PURE__*/React.createElement("div", {
        className: "footer-logo text-center"
      }, /*#__PURE__*/React.createElement("a", {
        className: "d-block",
        href: "https://open.edx.org",
        "aria-label": intl.formatMessage(messages['footer.logo.ariaLabel'])
      }, /*#__PURE__*/React.createElement("img", {
        style: {
          maxHeight: 150
        },
        src: logo || config.LOGO_TRADEMARK_URL,
        alt: intl.formatMessage(messages['footer.logo.altText'])
      }))), /*#__PURE__*/React.createElement("div", {
        className: "social-icons d-flex justify-content-center"
      }, socialIcons.map(function (_ref, index) {
        var key = _ref.key,
            icon = _ref.icon,
            text = _ref.text,
            url = _ref.url;
        return /*#__PURE__*/React.createElement("a", {
          "aria-labelledby": text,
          title: text,
          href: url
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          icon: icon
        }));
      }))), /*#__PURE__*/React.createElement("div", {
        className: "footer-menus d-flex flex-wrap justify-content-space-around"
      }, menus.map(function (menu) {
        var _menu$items;

        return !(menu !== null && menu !== void 0 && (_menu$items = menu.items) !== null && _menu$items !== void 0 && _menu$items.length) ? null : /*#__PURE__*/React.createElement("div", {
          key: menu.key,
          className: "footer-col-menu"
        }, /*#__PURE__*/React.createElement("h2", {
          className: "h4"
        }, menu.title), /*#__PURE__*/React.createElement("ul", {
          className: "list-unstyled"
        }, menu.items.map(function (item) {
          return /*#__PURE__*/React.createElement("li", {
            key: item.key,
            className: "list-group-item border-0 bg-transparent"
          }, /*#__PURE__*/React.createElement("a", {
            href: item.url
          }, item.text));
        })));
      }))), /*#__PURE__*/React.createElement("p", {
        "class": "copyright w-100 text-center"
      }, "\xA9 2019\u20132022 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 FennX - \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.", /*#__PURE__*/React.createElement("br", null), "\u0645\u0634\u063A\u0651\u0644 \u0645\u0646 \u0642\u0628\u0644 ", /*#__PURE__*/React.createElement("a", {
        href: "//fennectech.net/",
        target: "_blank"
      }, "\u0641\u0646\u0643 \u0644\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627", /*#__PURE__*/React.createElement("sup", null, "\xAE"))));
    }
  }]);

  return SiteFooter;
}(React.Component);

SiteFooter.contextType = AppContext;
SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
};
SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: []
};
export default injectIntl(SiteFooter);
export { EVENT_NAMES };
//# sourceMappingURL=Footer.js.map