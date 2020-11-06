import React from 'react'
import PropTypes from 'prop-types'
import MobileClients from './MobileClients'
import EditClient from './EditClient'
import {EventEmitter} from 'events'

import './style.css'

class MobileCompany extends React.PureComponent {

    constructor(props) {
        super(props)
        this.nextID = 9
        this.myEvents = new EventEmitter()
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
        filteredList: 0, // 0 - all, 1 - active, 2 - blocked
        editClient: 0, // 0 - не редактируем, 1 - редактируем 2 - добавляем нового
        editedClient: null
    }

    
    componentDidMount = () => {
        this.myEvents.addListener("E_DelClient", this.delClient)
        this.myEvents.addListener("E_EditClient", this.editClient)
        this.myEvents.addListener("E_SaveClient", this.saveClient)
    }

    componentWillUnmount = () => {
        this.myEvents.removeListener("E_DelClient", this.delClient)
        this.myEvents.removeListener("E_EditClient", this.editClient)
    }

    delClient = (client) => {
        let companyName = this.state.companyName
        let companies = {...this.state.companies}
        let clients = [...companies[companyName]]
        let newClients = clients.filter(v=>v.code != client.code)
        companies[companyName] = newClients
        this.setState({companies: companies})
    }

    editClient = (client) => {
        let companies = {...this.state.companies}
        this.setState({editClient: 1, editedClient: client, companies: companies})
    }

    addNewClient = () => {
        this.setState({editClient: 2})
    }

    saveClient = (newClient) => {

            let companyName = this.state.companyName
            let companies = {...this.state.companies}
            let clients = [...companies[companyName]]

        if (this.state.editClient==1) { // Сохраняю отредактированного

            let index = clients.findIndex(client=>client.code==newClient.code)
            clients[index] = newClient
            companies[companyName] = clients
            this.setState({companies: companies, editClient: 0, editedClient: null})

        } else { // Сохраняю нового

            clients.push(newClient)
            this.nextID++
            companies[companyName] = clients
            this.setState({companies: companies, editClient: 0, editedClient: null})

        }
    }

    setName = (name) => {
        if (this.state.companyName != name.current.value) {
            this.selectAll()
            this.setState({companyName: name.current.value})
        }
    }

    selectAll = () => {
        this.setState({filteredList: 0})
    }

    selectActive = () => {
        this.setState({filteredList: 1})
    }

    selectBlocked = () => {
        this.setState({filteredList: 2})
    }
    
    render() {
        
        console.log("MobileCompany render")

        let company = this.state.companyName
        let companies = {...this.state.companies}
        let clients = [...companies[company]]
        let clientsInfo
        
        if (this.state.filteredList === 0) 
            clientsInfo = clients.map(client =>
                <MobileClients key={client.code} info={client} events={this.myEvents}/>   
            )
        
        if (this.state.filteredList === 1) 
            clientsInfo = clients.map(client =>
                (client.balance > 0) && <MobileClients key={client.code} info={client} events={this.myEvents}/>   
            )
        
        if (this.state.filteredList === 2) 
            clientsInfo = clients.map(client =>
                (client.balance <= 0) && <MobileClients key={client.code} info={client} events={this.myEvents}/>   
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
                <input type='button'value='Добавить' onClick={this.addNewClient}/>
                {
                    this.state.editClient == 1 // Релактирую
                    && 
                    <EditClient workmode={this.state.editClient} 
                                events={this.myEvents} 
                                info={this.state.editedClient}
                                key={this.state.editedClient.code}
                    />
                }

                {
                    this.state.editClient == 2 // Добавляю
                    && 
                    <EditClient workmode={this.state.editClient} 
                                events={this.myEvents} 
                                nextID={this.nextID}
                    />
                }
            </div>
        )
    }
}

export default MobileCompany