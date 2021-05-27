import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    render(){
        return(
            <div className="navbar">
                <div>
                    {this.props.user !== {} && <p>@{this.props.user.username}</p>}
                </div>
                <div className="nav-logo">
                    <h2>Link's Library</h2>
                </div>
                <div className="nav-links">
                    <Link to="/entry_items" className="nav-link" hidden={!this.props.loggedIn}>Browse</Link>
                    <Link to="/profile" className="nav-link" hidden={!this.props.loggedIn}>My Notes</Link>
                    <Link to="/register" className="nav-link" hidden={this.props.loggedIn}>Register</Link>
                    <Link to="/" className="nav-link" hidden={this.props.loggedIn} >Login</Link>
                    <Link to="/" className="nav-link" hidden={!this.props.loggedIn} onClick={(e) => this.props.handleLogout(e)}>Logout</Link>
                </div>
                  
                
                
            </div>
        )
    }
}

export default NavBar