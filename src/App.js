import React, { Component } from 'react';
import { observer, Provider } from "mobx-react";
import rootStore from './stores/root'
import { Header, Container } from 'semantic-ui-react'
import './App.css';
import TodoView from './components/TodoView';

@observer
class App extends Component {
  render() {
    return (
      <Provider rootStore={rootStore}
                todoStore={rootStore.todoStore}>

        <div className="App">
          <Container>
            <Header as='h1'>Todo App</Header>
            <TodoView />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
