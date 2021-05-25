import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

export default class EntryCard extends Component {

    
    
    render() {
        return (
            
            <div className="entry_card" onClick={(e)=>this.props.onClick(e, this.props.entry_item)}>
                <div className="img_img">
                    <img src={this.props.entry_item.image_url}></img>
                </div>
                <div className="image-description">
                    <h3 >{this.props.entry_item.name} ({this.props.entry_item.category}) </h3>
                </div>
            </div>
            
        )
    }
}