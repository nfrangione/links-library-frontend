import React from 'react'
import EntryCard from '../components/EntryCard'
import ShowCard from '../components/ShowCard'

class Home extends React.Component {
    state = {
        entry_show: {},
        full_entry: {},
        entry_items: []
    }

    onClick = (entry_item) => {
        //e.preventDefault()
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
        .then(entry => {
            this.setState({entry_show: entry});
            this.getDataEntry(entry)
        })
    }

    getDataEntry = (entry) => {
        fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${entry.original_id}`, {
            method: 'GET',
            headers:  {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(entryData => this.setState({full_entry: entryData["data"]}))
    }

    submitForm = (note, e) => {
        //e.preventDefault()
        fetch(`http://localhost:3000/user_notes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(note)
        })
        .then(res => res.json())
        .then(note => {
            this.onClick(this.state.entry_show)
        })
    }

    editSubmit = (updateNote, e) => {
        //e.preventDefault()
        fetch(`http://localhost:3000/user_notes/${updateNote.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updateNote)
        })
        .then(res => res.json())
        .then(note => {
            this.onClick(this.state.entry_show)
        })
    }

    deleteClick = (e, deleteNote) => {
        // e.stopPropagation()
        fetch(`http://localhost:3000/user_notes/${deleteNote.id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(() => this.onClick(this.state.entry_show))
    }

    backHome = () => {
        this.setState({
            entry_show: {},
            full_entry: {}
        })
    }
    

    renderContent = () => {
        //console.log(Object.keys(this.state.entry_show).length)
        //console.log(Object.keys(this.state.entry_show).length > 0)
        if (Object.keys(this.state.entry_show).length > 0) {
            //console.log("I am true")
            return <div className="show-card"><ShowCard user={this.props.user} entry={this.state.full_entry} entry_show={this.state.entry_show} backHome={this.backHome} submitForm={this.submitForm} editSubmit={this.editSubmit} deleteClick={this.deleteClick}/></div>
        }
        else {
            return <div className="entry-container">{this.props.entry_items.map(entry_item => {return <EntryCard key={entry_item.name} entry_item={entry_item} token={this.props.token} handleShow={this.handleShow} onClick={this.onClick}/>})}</div>
        }
    }

    render(){
        //console.log("HOME RENDERED")
        return (
            <div className="main-container">
                {this.renderContent()}
            </div>
        )
    }

}
export default Home