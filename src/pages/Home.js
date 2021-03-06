import React from 'react'
import EntryCard from '../components/EntryCard'
import ShowCard from '../components/ShowCard'
import Search from '../components/Search'

class Home extends React.Component {
    state = {
        entry_show: {},
        full_entry: {}
    }

    onClick = (entry_item) => {
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
            //console.log(entry)
            this.setState({entry_show: entry});
            this.getDataEntry(entry)
        })
        this.props.updateProfile()
    }

    //Grab full data for show
    getDataEntry = (entry) => {
        fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${entry.original_id}`, {
            method: 'GET',
            headers:  {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(entryData => {
            console.log(entryData)
            this.setState({full_entry: entryData["data"]})
        })
        // this.props.updateProfile()
    }

    //Create note
    submitForm = (submitNote, e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/user_notes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(submitNote)
        })
        .then(res => res.json())
        .then(note => {
            if (note.message) {
                alert(note.message)
            }
            this.onClick(this.state.entry_show) 
        })
    }

    //Update note
    editSubmit = (updateNote, e) => {
        e.preventDefault()
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
    
    //Delete note
    deleteClick = (e, deleteNote) => {
        e.stopPropagation()
        fetch(`http://localhost:3000/user_notes/${deleteNote.id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(() => this.onClick(this.state.entry_show))
    }

    //Back to browse from show
    backHome = () => {
        this.setState({
            entry_show: {},
            full_entry: {}
        })
    }
    

    renderContent = () => {
        if (Object.keys(this.state.entry_show).length > 0) {
            return <div className="show-card"><ShowCard user={this.props.user} entry_items={this.props.entry_items} entry={this.state.full_entry} category={this.state.entry_show.category} entry_show={this.state.entry_show} backHome={this.backHome} submitForm={this.submitForm} editSubmit={this.editSubmit} deleteClick={this.deleteClick}/></div>
        }
        else {
            return <div>
                <h2>DATA ENTRIES</h2>
                <h3>The Legend of Zelda: Breath of the Wild</h3>
                <h4>Filtering for: {this.props.categoryFilter}</h4>
                <div className='button-row'>
                    <button value='all' onClick={(e)=>this.props.handleCategoryFilter(e)}>All Items</button>
                    <button value='monsters' onClick={(e)=>this.props.handleCategoryFilter(e)}>Monsters</button>
                    <button value='equipment' onClick={(e)=>this.props.handleCategoryFilter(e)}>Equipment</button>
                    <button value='materials' onClick={(e)=>this.props.handleCategoryFilter(e)}>Materials</button>
                </div>
                <div><Search handleInput={this.props.handleFilteredSearch} search={this.props.search}/></div>
                
                <div className="entry-container">{this.props.entry_items.map(entry_item => {return <EntryCard key={entry_item.name} entry_item={entry_item} token={this.props.token} handleShow={this.handleShow} onClick={this.onClick}/>})}</div>
            </div>
        }
    }

    render(){
        return (
            <div>
                 
                <div className="main-container">
                    {this.renderContent()}
                </div>
            </div>
        )
    }

}
export default Home