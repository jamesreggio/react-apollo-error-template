import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class App extends Component {
  state = {
    nextResults: null,
  };

  render() {
    const { data: { loading, people, pets } } = this.props;
    const { nextResults } = this.state;

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
          <div>
            <h2>People</h2>
            <ul>
              {people.map(person => <li key={person.id}>{person.name}</li>)}
            </ul>
            <h2>Pets</h2>
            {pets ? (
              <ul>
                {pets.map(pet => <li key={pet.id}>{pet.name}</li>)}
              </ul>
            ) : (
              <button onClick={this.fetchPets.bind(this)}>Fetch!</button>
            )}
          </div>
        )}
        <div>
          <p>Contents of <code>nextResults</code> from <code>fetchMore.updateQuery</code></p>
          <pre>
            {nextResults ? JSON.stringify(nextResults, null, 2) : "Haven't fetched yet"}
          </pre>
        </div>
      </main>
    );
  }

  fetchPets() {
    this.props.data.fetchMore({
      variables: {
        includePets: true,
      },
      updateQuery: (lastResults, nextResults) => {
        this.setState({nextResults});

        // nextResults.variables is expected to reflect the variables above,
        // but will instead show the original variables (not including the
        // default value).
        //
        // Furthermore, because the wrong variables are then passed onward
        // internally to updateQuery(), the pets list will not be set because
        // the @include directive evaluates to false with the prior variables.

        return {
          ...lastResults,
          ...nextResults,
        };
      },
    });
  }
}

export default graphql(
  gql`
    query ErrorTemplate(
      $includePets: Boolean = false
    ) {
      people {
        id
        name
      }

      pets @include(if: $includePets) {
        id
        name
      }
    }
  `
)(App);
