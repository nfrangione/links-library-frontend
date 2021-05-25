import React from 'react'
import EntryCard from '../components/EntryCard'
import ShowCard from '../components/ShowCard'

class Home extends React.Component {
    state = {
        entry_show: {}
    }

    onClick = (e, entry_item) => {
        // e.preventDefault()
        fetch("http://localhost:3000/entry_items", {
            method: 'POST',
            headers:  {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({entry_item})
        })
        .then(res => res.json())
        .then(entry => this.setState({entry_show: entry}))
    }

    backHome = () => {
        this.setState({entry_show: {}})
    }

    renderContent = () => {
        console.log(Object.keys(this.state.entry_show).length)
        console.log(Object.keys(this.state.entry_show).length > 0)
        if (Object.keys(this.state.entry_show).length > 0) {
            console.log("I am true")
            return <div className="show-card"><ShowCard entry={this.state.entry_show} backHome = {this.backHome}/></div>
        }
        else {
            return <div className="entry-container">{this.props.entry_items.map(entry_item => {return <EntryCard key={entry_item.name} entry_item={entry_item} token={this.props.token} handleShow={this.handleShow} onClick={this.onClick}/>})}</div>
        }
    }

    render(){
        console.log("HOME RENDERED")
        return (
            <div className="main-container">
                {this.renderContent()}
            </div>
        )
    }

}
export default Home