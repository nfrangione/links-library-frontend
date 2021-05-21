import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'

export default class Login extends Component {
    render() {
        return (
            <div className="home">
                <FormLogin loginUser={this.props.loginUser}/>
            </div>
        )
    }
}