import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
<header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-primary text-decoration-none">
            <h4 className="pt-0 mt-1 fs-3">Course Management</h4>
        </a>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 fs-6">
          <li><a href="#" className="nav-link px-3 ms-3 mt-1 text-white">User</a></li>
          <li><a href="#" className="nav-link px-3 mt-1 text-white">Course</a></li>
        </ul>
      </div>
    </div>
  </header>

        <Outlet/>
    </>
  )
}

export default Layout