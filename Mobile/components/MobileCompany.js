import React from 'react'
import PropTypes from 'prop-types'
import MobileClients from './MobileClients'
import {myEvents} from './events'

import './style.css'

class MobileCompany extends React.PureComponent {

    constructor(props) {

        super(props)

        this.sortedActive = false
        this.sortedBlocked = false
        this.clientsInfo = null
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
        filteredList: null
    }

    
    componentDidMount = () => {
        myEvents.addListener("E_DelClient", this.delClient)
        myEvents.addListener("E_EditClient", this.editClient)
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
        if (this.state.filteredList) {
            console.log("удаляю из отфильтрованного")
            let filteredClients = [...this.state.filteredList]
            let newFilteredClients = filteredClients.filter(v=>v.code != client.code)
            this.setState({filteredList: newFilteredClients, companies: companies})
        } else {
            this.setState({companies: companies})
        }
    }

    editClient = (client) => {
        console.log("Редактирую "+client.name)
        
    }

    setName = (name) => {
        if (this.state.companyName != name.current.value) {
            this.setState({companyName: name.current.value}, ()=> this.selectAll())
        } 
    }

    selectAll = () => {
        if (this.sortedActive === false && this.sortedBlocked === false) {
            return   
        }
        this.sortedActive = false
        this.sortedBlocked = false
        let companies = {...this.state.companies}
        this.setState({filteredList: null, companies: companies})
    }

    selectActive = () => {
        let companies = {...this.state.companies}
        let company = this.state.companyName
        let clients = [...companies[company]]
        let activeClients = clients.filter(client=>client.balance > 0)
        this.sortedBlocked = false
        if (!this.sortedActive) {
            this.sortedActive = true
            this.setState({filteredList: activeClients})
        }
        
    }

    selectBlocked = () => {
        
        let companies = {...this.state.companies}
        let company = this.state.companyName
        let clients = [...companies[company]]
        let blockedClients = clients.filter(client => client.balance <= 0)
        this.sortedActive = false
        if (!this.sortedBlocked) {
            this.sortedBlocked = true
            this.setState({filteredList: blockedClients})
        }
    }
    
    render() {
        
        console.log("MobileCompany render")

        if (this.state.filteredList) {
            this.clientsInfo = [...this.state.filteredList].map(client =>
                <MobileClients key={client.code} info={client}/>   
            )
        } else {
            let company = this.state.companies[this.state.companyName]
            this.clientsInfo = company.map(client =>
                <MobileClients key={client.code} info={client}/>   
            )
        }

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
                        <tbody className="clients_info">{this.clientsInfo}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MobileCompany