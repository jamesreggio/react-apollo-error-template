import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class App extends Component {
  state = {
    log: '',
  };

  componentWillReceiveProps() {
    this.setState(({log}) => ({
      log: [log, 'Received update to `data` prop'].join('\n'),
    }));
  }

  render() {
    const { data: { loading, people } } = this.props;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in
            Apollo Client. Edit the source code and watch your browser window
            reload with the changes.
          </p>
          <p>
            The code which renders this component lives in{" "}
            <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and
            ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => <li key={person.id}>{person.id}: {person.name}</li>)}
          </ul>
        )}
        <button onClick={this.resetStore}>Reset Store</button>
        <pre>
          {this.state.log}
        </pre>
      </main>
    );
  }

  resetStore = () => {
    this.props.client.resetStore();
    this.setState(({log}) => ({
      log: [log, 'Called `client.resetStore()`'].join('\n'),
    }));
  };
}

export default graphql(
  gql`
    query ErrorTemplate {
      people {
        id
        name
      }
    }
  `
)(App);
