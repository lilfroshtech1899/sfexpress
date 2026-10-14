import { useState } from 'react'
import Logo from './Logo.jsx'
import { MenuIcon, CloseIcon, PhoneIcon, MailIcon } from './Icons.jsx'

const NAV = [
  { label: 'Track', href: '#track' },
  { label: 'Services', href: '#services' },
  { label: 'Network', href: '#network' },
  { label: 'Support', href: '#support' }
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__tag">International Express · Global Delivery</span>
          <span className="topbar__contacts">
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
                {item.label}
              </a>
            ))}
            <a href="#track" className="btn btn--primary btn--sm header__cta">
              Track Shipment
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
                {item.label}
              </a>
            ))}
            <a
              href="#track"
              className="btn btn--primary btn--block"
              onClick={() => setOpen(false)}
            >
              Track Shipment
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
