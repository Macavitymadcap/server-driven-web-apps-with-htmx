export interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <h1>{title}</h1>
          <label htmlFor="nav-toggle" className="nav-toggle-label">
            <span className="hamburger"></span>
          </label>
        </div>

        <input type="checkbox" id="nav-toggle" className="nav-toggle" />

        <nav className="main-nav">
          <menu>
            <li><a href="/">Home</a></li>
            <li><a href="/pages/chapter-1.html">Chapter 1</a></li>
            <li><a href="/pages/chapter-3.html">Chapter 3</a></li>

            <li className="has-submenu">
              <input type="checkbox" id="submenu-ch4" className="submenu-toggle" />
              <label htmlFor="submenu-ch4" className="submenu-label">
                <a href="/pages/chapter-4.html">Chapter 4</a>
                <span className="submenu-indicator">▼</span>
              </label>
              <menu className="submenu">
                <li><a href="/pages/boosting.html">Boosting</a></li>
                <li><a href="/pages/infinite-scroll.html">Infinite Scroll</a></li>
              </menu>
            </li>

            <li className="has-submenu">
              <input type="checkbox" id="submenu-ch5" className="submenu-toggle" />
              <label htmlFor="submenu-ch5" className="submenu-label">
                <a href="/pages/chapter-5.html">Chapter 5</a>
                <span className="submenu-indicator">▼</span>
              </label>
              <menu className="submenu">
                <li><a href="/pages/alpine.html">Alpine</a></li>
                <li><a href="/pages/hyperscript.html">_hyperscript</a></li>
              </menu>
            </li>

            <li className="has-submenu">
              <input type="checkbox" id="submenu-ch6" className="submenu-toggle" />
              <label htmlFor="submenu-ch6" className="submenu-label">
                <a href="/pages/chapter-6.html">Chapter 6</a>
                <span className="submenu-indicator">▼</span>
              </label>
              <menu className="submenu">
                <li><a href="/pages/balloon-game.html">Balloon Game</a></li>
              </menu>
            </li>

            <li><a href="/pages/chapter-7.html">Chapter 7</a></li>
            <li><a href="/pages/chapter-8.html">Chapter 8</a></li>
          </menu>
        </nav>
      </div>
    </header>
  );
};