import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig,   } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';
import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookF, faTwitter, faYoutube, faInstagram, faReddit, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
  'LMS_BASE_URL'
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  getLocalePrefix(locale) {
    const twoLetterPrefix = locale.substring(0, 2).toLowerCase();
    if (twoLetterPrefix === 'en') {
      return '';
    }
    return `/${twoLetterPrefix}`;
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;
    const socialIcons = [
      {
        key: 'Facebook',
        text: 'Like our Facebook page',//Intl
        icon: faFacebookF,
        url: '#',
      },
      {
        key: 'Twitter',
        text: 'Follow us on Twitter',//Intl
        icon: faTwitter,
        url: '#',
      },
      {
        key: 'Instagram',
        text: 'Follow us on Instagram',//Intl
        icon: faInstagram,
        url: '#',
      },
      {
        key: 'LinkedIn',
        text: 'Check our LinkedIn page',//Intl
        icon: faLinkedinIn,
        url: '#',
      },
      {
        key: 'YouTube',
        text: 'Subscribe to our YouTube Channel',//Intl
        icon: faYoutube,
        url: '#',
      },
      {
        key: 'Reddit',
        text: 'Subscribe to our subreddit',//Intl
        icon: faReddit,
        url: '#',
      },
    
    ]
    
    const menus = [
      {
        key: 'info',
        title: 'أكاديمية Fennx',
        items:[
          {
            key: 'about',
            text: 'من نحن',
            url: config.LMS_BASE_URL + '/about'
          },
        ],
      },
      {
        key: 'legal',
        title: 'معلومات قانونية',
        items:[
          {
            key: 'privacy',
            text: 'سياسة الخصوصية',
            url: config.LMS_BASE_URL + '/privacy'
          },
          {
            key: 'tos_and_honor',
            text: 'شروط الخدمة و ميثاق الشرف الاكاديمي',
            url: config.LMS_BASE_URL + '/tos_and_honor'
          },
        ],
      },
      {
        key: 'connect',
        title: 'تواصل',
        items:[
          {
            key: 'blog',
            text: 'الموقع الرسمي',
            url: 'https://tarjihacademy.org'
          },
          {
            key: 'contact',
            text: 'اتصل بنا',
            url: config.LMS_BASE_URL + '/support/contact_us'
          },
          {
            key: 'donate',
            text: 'تبرع',
            url: config.LMS_BASE_URL + '/donate'
          },
        ],
      },
    ]
    
    return (
      <footer
        role="contentinfo"
        className="footer d-flex flex-column border-top py-3 px-4 "
      >
        <div className="container-fluid d-flex justify-content-center flex-wrap" style={{columnGap:32}}>
          <div className="logo-area d-flex justify-content-center align-items-center flex-column">
            <div className="footer-logo text-center">
              <a
                className="d-block"
                href="https://open.edx.org"
                aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
              >
                <img
                    style={{ maxHeight: 150 }}
                    src={logo || config.LOGO_TRADEMARK_URL}
                    alt={intl.formatMessage(messages['footer.logo.altText'])}
                  />
              </a>
            </div>
            <div className="social-icons d-flex justify-content-center">
              {
                socialIcons.map(({key, icon, text, url}, index) => 
                  <a aria-labelledby={text} title={text} href={url}>
                    <FontAwesomeIcon icon={icon} />
                  </a>
                )
              }
            </div>

          </div>
          <div className="footer-menus d-flex flex-wrap justify-content-space-around">
            {
              menus.map(menu =>
                !menu?.items?.length ? null
                : <div
                    key={menu.key}
                    className="footer-col-menu"
                  >
                    <h2 className="h4">{menu.title}</h2>
                    <ul className="list-unstyled">
                      {
                        menu.items.map(item => 
                          <li key={item.key} className="list-group-item border-0 bg-transparent">
                            <a href={item.url}>{item.text}</a>
                          </li>
                        )
                      }
                    </ul>

                  </div>
              )
            }
          </div>
        {/* <div className="flex-grow-1" /> */}
          {/* {showLanguageSelector && (
            <LanguageSelector
              options={supportedLanguages}
              onSubmit={onLanguageSelected}
            />
          )} */}
        </div>
        <p class="copyright w-100 text-center">
          © 2019–2022 أكاديمية FennX - جميع الحقوق محفوظة.<br />
          مشغّل من قبل <a href="//fennectech.net/" target="_blank">فنك للتكنولوجيا<sup>®</sup></a>
        </p>

      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
