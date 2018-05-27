import React, { Component } from "react";
import { inject, observer} from "mobx-react";
import { List, Segment, Grid, Container, Button, Form, Icon, Modal, Header } from 'semantic-ui-react'
import { Flex, Box } from 'reflexbox'

@inject("todoStore") @observer
class TodoDetails extends Component {

  handleClose = () => {
      this.props.todoStore.disableActiveTodo();
  }

  displayModal = () => {
      let activeTodo = this.props.todoStore.activeTodo;
      return activeTodo === this.props.todo;
  }

  render() {
      let title = `Details: ${this.props.todo.title}`
      return (
          <Modal
              open={this.displayModal()}
              onClose={this.handleClose}
              basic
              size='small'
          >
              <Header icon='browser' content='Cookies policy' />
              <Modal.Content>
                  <h3> {title} </h3>
              </Modal.Content>
              <Modal.Actions>
                  <Button color='green' onClick={this.handleClose} inverted>
                      <Icon name='checkmark' /> Got it
                  </Button>
              </Modal.Actions>
          </Modal>
      )
  }
}

@inject("todoStore") @observer
class TodoItem extends Component {
    handleDeleteClick = (event) => {
        let todoId = this.props.todo.id;
        this.props.todoStore.deleteTodo(todoId);
    }

    handleSegmentClick = (event) => {
        this.props.todoStore.setActiveTodo(this.props.todo);
    }

    render() {
        let todo = this.props.todo;
        return (
            <div>
            <TodoDetails todo={this.props.todo}/>
              <Segment inverted
                       style={{marginBottom: "5px", marginTop: "5px"}}
                       onClick={this.handleSegmentClick}>
                  <List.Item>
                  <List.Content>
                      <Flex justify="space-between">
                          <Box>
                              <List.Header>{todo.title}</List.Header>
                          </Box>
                          <Box>
                              <Button color="red" onClick={this.handleDeleteClick}> Delete </Button>
                          </Box>
                      </Flex>
                  </List.Content>
                </List.Item>
              </Segment>
          </div>
        )
    }
}

@inject("todoStore") @observer
class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    handleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let todoParams = {title: this.state.title};
        this.props.todoStore.saveTodo(todoParams);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Input onChange={this.handleChange}
                                size="large"
                                style={{minWidth:"30em"}}
                                placeholder='New Todo...' />
                </Form.Group>
            </Form>
        )
    }
}

@inject("todoStore") @observer
class TodoList extends Component {
    componentDidMount() {
        this.props.todoStore.loadTodos();
    }

    render() {
        let todos = this.props.todoStore.todos;
        return (
            <div>
                <Container>
                    <Grid centered>
                        <AddTodo />
                    </Grid>
                </Container>
                <List divided inverted relaxed>
                    { todos.map(todo => <TodoItem key={todo.id} todo={todo}/>) }
                </List>
            </div>
        )
    }
}

export default TodoList;
