import React from "react";

import axios from "axios";

export default class PersonList extends React.Component {
    //  GET //
    // state = {
    //     persons: []
    // };
    //
    // componentDidMount() {
    //     axios
    //         .get(`https://jsonplaceholder.typicode.com/users`)
    //         .then(res => {
    //             const persons = res.data;
    //             this.setState({ persons });
    //         })
    //         .catch(error => console.log(error));
    // }
    //
    // render() {
    //     return (
    //         <ol>
    //             {this.state.persons.map(person => (
    //
    //                 <li key={person.id}>{person.name}</li>
    //             ))}
    //         </ol>
    //     );
    // }

    //  POST //
    state = {
        name: ""
    };

    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            name: this.state.name
        };

        axios
            .post(`https://jsonplaceholder.typicode.com/users`, { user }) // wrap input in user object
            .then(res => {
                console.log("Response: ");
                console.log(res);
                console.log("response.data: ");
                console.log(res.data); // name se nam trong user object
            });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Person Name:
                        <input type="text" name="name" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}