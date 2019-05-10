import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function RootScene() {
  return (
    <div className="RootScene">
      RootScene
      <ul>
        <li>
          <Link to="/package/serverless-offline">serverless-offline</Link>
        </li>
        <li>
          <Link to="/package/piano-keys">piano-keys</Link>
        </li>
        <li>
          <Link to="/package/lodash">lodash</Link>
        </li>
        <li>
          <Link to="/package/react">react</Link>
        </li>
      </ul>
    </div>
  )
}

export default RootScene
