import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'

export default class Login extends Component {
    render() {
        return (
            <div className="loginCont">
                <div className="home">
                    <FormLogin loginUser={this.props.loginUser}/>
                </div>
                <div className="image-row">
                    <img src="https://cdn.gamer-network.net/2017/usgamer/legend-of-zelda-breath-of-the-wild-link.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/18-12-2018-zelda-breath-of-the-wild-the-best-weapons-equipment-and-where-to-find-them.jpg"></img>
                    {/* <img src="https://i.guim.co.uk/img/media/67edb515d6a2b19ef10b002c6bdd44b40b284316/112_0_1734_1041/master/1734.jpg?width=620&quality=85&auto=format&fit=max&s=ed68671b6485f6af9813d0a0188cc27d"></img> */}
                    <img src="https://www.gameinformer.com/sites/default/files/styles/full/public/2018/06/07/e69b8dfd/zeldathing.jpg"></img>
                </div>
            </div>
        )
    }
}