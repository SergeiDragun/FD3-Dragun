import React from 'react'
import PropTypes from 'prop-types'
import MobileClients from './MobileClients'
import {myEvents} from './events'

import './style.css'

class MobileCompany extends React.PureComponent {

    constructor(props) {
        super(props)

        this.changed = false
        this.firstCompanyName = React.createRef()
        this.secondCompanyName = React.createRef()
    }

    static propTypes = {
        companyName: PropTypes.string.isRequired,
        companies: PropTypes.shape({
            company: PropTypes.arrayOf(
                PropTypes.shape({
                    code: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    otch: PropTypes.string.isRequired,
                    fam: PropTypes.string.isRequired,
                    balance: PropTypes.number.isRequired,
                })
            ),
        }),
    }

    state = {
        companyName: this.props.companyName,
        companies: this.props.companies,
        filterBlocked: false,
        filterActive: false
    }

    
    componentDidMount = () => {
        myEvents.addListener("E_DelClient", this.delClient)
        myEvents.addListener("E_EditCLient", this.editClient)
        console.log("qwe")
    }

    componentWillUnmount = () => {
        myEvents.removeListener("E_DelClient", this.delClient)
        myEvents.removeListener("E_EditClient", this.editClient)
    }

    delClient = (client) => {

        let companyName = this.state.companyName
        let companies = {...this.state.companies}
        let clients = [...companies[companyName]]
        let newClients = clients.filter(v=>v.code != client.code)
        companies[companyName] = newClients
        /* if (this.state.companies[company].length != activeClients.length) {
            this.changed = true */
            this.setState({companies: companies})
        /* } */
    }

    editClient = () => {
        console.log("Редактирую клиента")
    }

    setName = (name) => {
        if (this.changed && this.state.companyName != name.current.value) {
            this.selectAll()
        }
        this.setState({companyName: name.current.value})
    }

    selectAll = () => {
        this.changed = false
        this.setState({companies: this.props.companies})
    }

    filteredList = null

    selectActive = () => {
        let companies = {...this.props.companies}
        let company = this.state.companyName
        let clients = [...companies[company]]
        /* let clients = [...this.state.companies[company]] */
        let activeClients = clients.filter(client=>client.balance > 0)
        this.filteredList = activeClients
        companies[company] = activeClients
        if (this.state.companies[company].length != activeClients.length) {
            this.changed = true
            this.setState({companies: companies}, ()=> console.log(this.state.companies))
        }
    }

    selectBlocked = () => {
        let companies = {...this.props.companies}
        let company = this.state.companyName
        let clients = [...companies[company]]
        /* let clients = [...this.state.companies[company]] */
        let activeClients = clients.filter(client => client.balance <= 0)
        this.filteredList = activeClients
        companies[company] = activeClients
        if (this.state.companies[company].length != activeClients.length) {
            this.changed = true
            this.setState({companies: companies}, () => console.log(this.state.companies))
        }
    }

    render() {
        
        console.log("MobileCompany render")

        let company = this.state.companies[this.state.companyName]
        let clientsInfo = company.map(client =>
            <MobileClients key={client.code} info={client}/>   
        )

        return (
            <div className='mobileCompany'>
                <div className='mobileCompanyName'>
                    <input type='button' value='MTC' 
                           ref={this.firstCompanyName} 
                           onClick={()=>this.setName(this.firstCompanyName)}
                    />
                    <input type='button' value='Velcome' 
                           ref={this.secondCompanyName} 
                           onClick={()=>this.setName(this.secondCompanyName)}
                    />
                    <div className='mobileCompanyNameValue'>
                        Компания &laquo;{this.state.companyName}&raquo;
                    </div>
                </div>
                <div className='sortClients'>
                    <input type='button' value='Все' onClick={this.selectAll}/>
                    <input type='button' value='Активные' onClick={this.selectActive}/>
                    <input type='button' value='Заблокированные' onClick={this.selectBlocked}/>
                </div>
                <div>
                    <table className="clients">
                        <thead className="clients_options">
                            <tr>
                                <th>Фамилия</th>
                                <th>Имя</th>
                                <th>Отчество</th>
                                <th>Баланс</th>
                                <th>Статус</th>
                                <th>Редактировать</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody className="clients_info">{clientsInfo}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MobileCompany