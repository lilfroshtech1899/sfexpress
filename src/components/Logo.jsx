/**
 * Brand lockup: red mark + wordmark. Used in the header and footer.
 */
export default function Logo({ compact = false, light = false }) {
  return (
    <span className={`logo ${compact ? 'logo--compact' : ''} ${light ? 'logo--light' : ''}`}>
      <span className="logo__mark" aria-hidden="true">
        <span className="logo__mark-text">SF</span>
      </span>
      <span className="logo__words">
        <span className="logo__name">SF Express</span>
        {!compact && <span className="logo__region">Korea</span>}
      </span>
    </span>
  )
}
