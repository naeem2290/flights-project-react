import React from 'react'

const Header = () => {
  return (
   <>
   
   <div className=" mb-5   text-light bg-dark">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light px-0  ">
            Dashboard
            <div
              className="collapse navbar-collapse justify-content-end "
              id="navigation"
            >
              <ul className="navbar-nav ml-auto text-center  ">
                <li id="home" className={`nav-item`}>
                  <a className="nav-link text-light" href="/">
                    Home
                  </a>
                </li>
                <li id="services" className={`nav-item`}>
                  <a className="nav-link text-light" href="/">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
   </>
  )
}

export default Header