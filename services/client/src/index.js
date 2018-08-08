import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserList from './components/UsersList';
import AddUSer from './components/AddUser';

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            username: '',
            email: '',
        };
        this.handleChange = this.handleChange.bind(this);
    };
    componentDidMount() {
        this.getUsers();
    };
    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
        .then((res) => { this.setState({ users: res.data.data.users }); })
        .catch((err) => { console.log(err); });
    };
    addUser(event) {
        event.preventDefault();
        console.log('sanity check!');
        console.log(this.state);
    };
    handleChange(event) {
        const obj ={};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    };
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <br/>
                        <h1>All Users</h1>
                        <hr/><br/>
                        <AddUSer username={this.state.username}
                            email={this.state.email}
                            addUser={this.addUser}
                            handleChange={this.handleChange}/>
                        <br/>
                        <UserList users={this.state.users}/>
                    </div>
                </div>
            </div>
        )
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
