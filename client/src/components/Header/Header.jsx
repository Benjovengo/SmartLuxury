import React, { useRef, useEffect } from "react";
import './header.css'
import { Container } from "reactstrap"
import { NavLink, Link} from "react-router-dom"

const NAV__LINKS = [
  {
    display:'Home',
    url:'/home'
  },
  {
    display:'Market',
    url:'/market'
  },
  {
    display:'Add Product',
    url:'/create'
  },
  {
    display:'Wallet',
    url:'/wallet'
  },
  {
    display:'Account',
    url:'/account'
  },
]

const Header = ( { account, setAccount } ) => {
  const headerRef = useRef(null);

  const menuRef = useRef(null);

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className='d-flex gap-2 align-items-center'>
              <span>
                <img src='SmartLuxuryColorLogo.svg' alt='smart luxury logo' className='img__logo' ></img>
              </span>
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu} >
            <ul className="nav__list">
              {
                NAV__LINKS.map((item, index) => 
                  <li className="nav__item" key={index}>
                    <NavLink to={item.url} className={ navClass=> navClass.isActive ? 'active' : ''}>
                      {item.display}
                    </NavLink>
                  </li>
                )
              }
            </ul>
          </div>
          <div className="nav__right d-flex align-items-center gap-5">
            <button className="btn" onClick={connectHandler}>
              <Link className="d-flex gap-2 align-items-center" >
                <span>
                  <i className="ri-wallet-line"></i>
                </span>
                {account? (
                <div>Address: {account.slice(0,6) + '...' + account.slice(38,42)}</div>
                //<p><b>Address:</b> {account}</p>
              ) : (
                <div>Connect Wallet</div>
              )}
              </Link>
            </button>
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu} ></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header