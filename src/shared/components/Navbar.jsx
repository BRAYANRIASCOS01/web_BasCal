const Navbar = ({ brand = "BasCal", links = [], cta }) => {
  return (
    <header className="navbar">
      <div className="navbar__brand">{brand}</div>

      {links.length > 0 && (
        <nav className="navbar__links" aria-label="Menú principal">
          <ul>
            {links.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {cta && (
        <div className="navbar__cta">
          <a href={cta.href}>{cta.label}</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
