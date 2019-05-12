import React from 'react'
import { Link } from 'react-router-dom'

import './Layout.css'

function NotFoundScene({ children }) {
  return (
    <div className="Layout">
      <nav className="Layout-nav x4">
        <Link to="/" className="Layout-nav-brand">
          NPM Statistics
        </Link>
      </nav>
      <div className="Layout-content">
        {children}
      </div>
    </div>
  )
}

export default NotFoundScene
