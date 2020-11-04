import React from 'react'
import PropTypes from 'prop-types'
import {myEvents} from './events'
import './style.css'
class MobileClients extends React.PureComponent {
   
    static propTypes = {
        info: PropTypes.shape({
            code: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            fam: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired
        }),
    }

    state = {
        info: this.props.info
    }

    delClient = () => {
        myEvents.emit("E_DelClient", this.state.info)
    }

    editClient = () => {
        myEvents.emit("E_EditClient", this.state.info)
    }

    render() {

        console.log("MobileClients id="+this.state.info.code+" render")

        return (
            
            <tr>
                <td>{this.state.info.fam}</td>
                <td>{this.state.info.name}</td>
                <td>{this.state.info.otch}</td>
                <td>{this.state.info.balance}</td>
                <td className={ (this.state.info.balance<=0) ? 'blocked' : 'active' }>
                    { (this.state.info.balance <=0) ? 'blocked' : 'active' }
                </td>
                <td><input type='button' value='Редактировать' onClick={this.editClient}/></td>
                <td><input type='button' value='Удалить' onClick={this.delClient}/></td>
            </tr>
        )
    }

}

export default MobileClients