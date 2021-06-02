import React, { Component } from 'react'

export default class EntryCard extends Component {
    render() {
        return (
            <div className="entry-card" onClick={()=>this.props.onClick(this.props.entry_item)}>
                <div className="img_img">
                    <img src={this.props.entry_item.image_url}></img>
                </div>
                <div className="image-description">
                    <h3>{this.props.entry_item.name}</h3>
                    <h3>({this.props.entry_item.category})</h3>
                </div>
            </div>
        )
    }
}