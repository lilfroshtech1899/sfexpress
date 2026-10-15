import { useState } from 'react'
import Logo from './Logo.jsx'
import RegionSwitcher from './RegionSwitcher.jsx'
import { MenuIcon, CloseIcon, MailIcon } from './Icons.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

const NAV = [
  { labelKey: 'nav.track', href: '#track' },
  { labelKey: 'nav.services', href: '#services' },
  { labelKey: 'nav.network', href: '#network' },
  { labelKey: 'nav.support', href: '#support' }
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__tag">{t('topbar.tag')}</span>
          <span className="topbar__contacts">
            <RegionSwitcher />
            <a href="mailto:support@sf-express.kr" className="topbar__link">
              <MailIcon width="15" height="15" /> support@sf-express.kr
            </a>
            <a href="mailto:sfexpresskoreadeliverycompany1@gmail.com" className="topbar__link">
              <MailIcon width="15" height="15" /> sfexpresskoreadeliverycompany1@gmail.com
            </a>
          </span>
        </div>
      </div>

      <div className="header">
        <div className="container header__inner">
          <a className="header__brand" href="#top" aria-label="SF Express Korea home">
            <Logo />
          </a>

          <nav className="header__nav" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="header__nav-link">
                {t(item.labelKey)}
              </a>
            ))}
            <a href="#track" className="btn btn--primary btn--sm header__cta">
              {t('cta.track')}
            </a>
          </nav>

          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="header__mobile">
          <nav className="container" aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="header__mobile-link"
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}
              </a>
            ))}
            <a
              href="#track"
              className="btn btn--primary btn--block"
              onClick={() => setOpen(false)}
            >
              {t('cta.track')}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
