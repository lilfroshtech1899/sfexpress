import Logo from './Logo.jsx'
import { MailIcon, GlobeIcon } from './Icons.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

const COLUMNS = [
  {
    titleKey: 'footer.col.track',
    links: ['footer.l1', 'footer.l2', 'footer.l3', 'footer.l4']
  },
  {
    titleKey: 'footer.col.services',
    links: ['footer.l5', 'footer.l6', 'footer.l7', 'footer.l8']
  },
  {
    titleKey: 'footer.col.company',
    links: ['footer.l9', 'footer.l10', 'footer.l11', 'footer.l12']
  },
  {
    titleKey: 'footer.col.support',
    links: ['footer.l13', 'footer.l14', 'footer.l15', 'footer.l16']
  }
]

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="footer" id="support">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p className="footer__tagline">{t('footer.tagline')}</p>
          <ul className="footer__contact">
            <li>
              <MailIcon width="16" height="16" /> support@sf-express.kr
            </li>
            <li>
              <MailIcon width="16" height="16" /> sfexpresskoreadeliverycompany1@gmail.com
            </li>
            <li>
              <GlobeIcon width="16" height="16" /> {t('footer.seoul')}
            </li>
          </ul>
        </div>

        <nav className="footer__columns" aria-label="Footer">
          {COLUMNS.map((column) => (
            <div key={column.titleKey} className="footer__column">
              <h4 className="footer__column-title">{t(column.titleKey)}</h4>
              <ul>
                {column.links.map((linkKey) => (
                  <li key={linkKey}>
                    <a href="#track">{t(linkKey)}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>{t('footer.bottom', { year: new Date().getFullYear() })}</p>
          <p className="footer__legal">
            <a href="#track">{t('footer.privacy')}</a>
            <a href="#track">{t('footer.terms')}</a>
            <a href="#track">{t('footer.cookies')}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
