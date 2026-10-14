import Logo from './Logo.jsx'
import { PhoneIcon, MailIcon, GlobeIcon } from './Icons.jsx'

const COLUMNS = [
  {
    title: 'Track',
    links: ['Track a shipment', 'Track by reference', 'Delivery notifications', 'Proof of delivery']
  },
  {
    title: 'Services',
    links: ['International Express', 'Express Delivery', 'E-commerce Logistics', 'Warehousing']
  },
  {
    title: 'Company',
    links: ['About SF Express Korea', 'Global network', 'Careers', 'Newsroom']
  },
  {
    title: 'Support',
    links: ['Help centre', 'Prohibited items', 'Customs & duties', 'Contact us']
  }
]

export default function Footer() {
  return (
    <footer className="footer" id="support">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p className="footer__tagline">
            Reliable international express delivery, connecting South Korea with the world.
          </p>
          <ul className="footer__contact">
            <li>
              <MailIcon width="16" height="16" /> support@sf-express.kr
            </li>
            <li>
              <MailIcon width="16" height="16" /> sfexpresskoreadeliverycompany1@gmail.com
            </li>
            <li>
              <GlobeIcon width="16" height="16" /> Seoul, South Korea
            </li>
          </ul>
        </div>

        <nav className="footer__columns" aria-label="Footer">
          {COLUMNS.map((column) => (
            <div key={column.title} className="footer__column">
              <h4 className="footer__column-title">{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#track">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} SF Express Korea. Demonstration portal — not an official service.</p>
          <p className="footer__legal">
            <a href="#track">Privacy</a>
            <a href="#track">Terms</a>
            <a href="#track">Cookies</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
