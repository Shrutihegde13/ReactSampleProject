import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Pusher from 'pusher-js';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  constructor(){
    super();
    // connect to pusher
    this.pusher = new Pusher("325e5cc4a3ecf0c178b4", {
     cluster: 'ap2',
     encrypted: true
    });
  }

  componentDidMount(){
    if ('actions' in Notification.prototype) {
      alert('You can enjoy the notification feature');
    } else {
      alert('Sorry notifications are NOT supported on your browser');
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
            <Header />
            <section className="App-main">
               {/* pass the pusher object and apollo to the posts component */}
               <Posts pusher={this.pusher} apollo_client={client}/>
            
            </section>
          </div>
          </ApolloProvider>
    );
  }
}

export default App;
