import logoUrl from '../assets/sf-logo.png'

/**
 * Brand logo. Used in the header and footer.
 */
export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <img className="logo__image" src={logoUrl} alt="SF Express Korea" />
    </span>
  )
}
