import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

class EditProduct extends React.PureComponent {
    static propTypes = {
        info: PropTypes.shape({
            code: PropTypes.number,
            name: PropTypes.string,
            otch: PropTypes.string,
            fam: PropTypes.string,
            balance: PropTypes.number
        }),
        events: PropTypes.object.isRequired,
        nextID: PropTypes.number,
        workmode: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props)

        this.famRef=React.createRef()
        this.nameRef=React.createRef()
        this.otchRef=React.createRef()
        this.balanceRef=React.createRef()
        this.input = React.createRef();
        this.newClient = null
    }

    state = {
        fam: null,
        balance: null,
        editedClient: this.props.info,
    }
    
    save = () => {
        this.newClient = {
            code: this.props.workmode==2?this.props.nextID:this.state.editedClient.code,
            name: this.nameRef.current.value,
            otch: this.otchRef.current.value,
            fam: this.famRef.current.value,
            balance: +this.balanceRef.current.value
        }
        /* console.log(this.props.nextID) */
        this.props.events.emit("E_SaveClient", {...this.newClient})
    }

    render() {

        console.log("EditClient render")

        return (
            <div>
                <span className="title">
                    {this.props.workmode === 1 
                    ? 
                    "Редактируем клиента" 
                    : 
                    "Добавляем нового клиента"}
                </span>
                <br/>
                <span className="label">Новая фамилия:</span>
                <input type='text' 
                    defaultValue={this.props.workmode==1?this.state.editedClient.fam:null} 
                    ref={this.famRef}
                />
                <br/>
                <span className="label">Новое имя:</span>
                <input type='text' 
                    defaultValue={this.props.workmode==1?this.state.editedClient.name:null} 
                    ref={this.nameRef}
                />
                <br/>
                <span className="label">Новое отчество:</span>
                <input type='text' 
                    defaultValue={this.props.workmode==1?this.state.editedClient.otch:null} 
                    ref={this.otchRef}
                />
                <br/>
                <span className="label">Новый баланс:</span>
                <input type='text' 
                    defaultValue={this.props.workmode==1?this.state.editedClient.balance:null} 
                    ref={this.balanceRef}
                />
                <br/>
                <input type='button' value='save' onClick={this.save}/>
            </div>
        )
    }
}

export default EditProduct