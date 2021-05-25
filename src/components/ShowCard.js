import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class ShowCard extends Component {

    render() {
        return (
        <div className="show-container">
            <div className="main-show">
                <div className="exit-show"><button onClick={()=>this.props.backHome()}>X</button></div>
                <div className="left-show">
                    <img id="show-image" src={this.props.entry.image_url}></img>
                </div>
                <div className="right-show">
                    <h1>{this.props.entry.name} ({this.props.entry.category})</h1>
                </div>
            </div>
        </div>
        )
    }
}