import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

class MobileClients extends React.PureComponent {
    
    constructor(props) {
        super(props)
    }

    static propTypes = {
        info: PropTypes.shape({
            code: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            fam: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired
        }),
        events: PropTypes.object.isRequired
    }

    state = {
        info: this.props.info
    }
    
    delClient = () => {
        this.props.events.emit("E_DelClient", this.state.info)
    }

    editClient = () => {
        let nc = {
            fam: this.state.info.fam,
            name: this.state.info.name,
            otch: this.state.info.otch,
            balance: this.state.info.balance,
            code: this.state.info.code,
        }
        this.props.events.emit("E_EditClient", nc)
    }

    render() {

        console.log("MobileClients id="+this.state.info.code+" render")

        return (
            
            <tr>
                <td>{this.props.info.fam}</td>
                <td>{this.props.info.name}</td>
                <td>{this.props.info.otch}</td>
                <td>{this.props.info.balance}</td>
                <td className={ (this.props.info.balance<=0) ? 'blocked' : 'active' }>
                    { (this.props.info.balance <=0) ? 'blocked' : 'active' }
                </td>
                <td><input type='button' value='Редактировать' onClick={this.editClient}/></td>
                <td><input type='button' value='Удалить' onClick={this.delClient}/></td>
            </tr>
        )
    }

}

export default MobileClients