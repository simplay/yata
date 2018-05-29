import React, { Component } from "react";
import { inject, observer} from "mobx-react";
import { List, Segment, Grid, Container, Checkbox, Button, Form, Icon, Modal, Header } from 'semantic-ui-react'
import { Flex, Box } from 'reflexbox'

@inject("todoStore") @observer
class TodoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.todo.title,
      description: this.getDescription()
    }
  }

  handleClose = () => {
      this.props.todoStore.disableActiveTodo();
  }

  handleOnChange = (event) => {
      let fieldName = event.target.name;
      let newValue = event.target.value;
      this.setState({[fieldName]: newValue});
  }

  displayModal = () => {
      let activeTodo = this.props.todoStore.activeTodo;
      return activeTodo === this.props.todo;
  }

  getDescription = () => {
      let description = this.props.todo.description;
      if (description == null) {
        return '';
      }
      return description;
  }

  render() {
      let title = `Details: ${this.props.todo.title}`
      const inlineStyle = {
          modal: {
              marginTop: '0px !important',
              marginLeft: 'auto',
              marginRight: 'auto'
          }
      };

      return (
          <Modal open={this.displayModal()}
                 centered='true'
                 onClose={this.handleClose}
                 style={inlineStyle.modal}
                 size='large'
          >
              <Header icon='browser' content='Todo Details' />
              <Modal.Content>
                  <Form>
                      <Form.Field>
                          <label>Title</label>
                          <input placeholder='Title...'
                                 value={this.state.title}
                                 name="title"
                                 onChange={this.handleOnChange}/>
                      </Form.Field>
                      <Form.Field>
                          <label>Description</label>
                          <input placeholder='Description goes here...'
                                 value={this.state.description}
                                 name="description"
                                 onChange={this.handleOnChange}/>
                      </Form.Field>
                      <Form.Field>
                          <Checkbox label='Done' />
                      </Form.Field>
                  </Form>
              </Modal.Content>
              <Modal.Actions>
                  <Button color='green' onClick={this.handleClose} inverted>
                      <Icon name='checkmark' /> Save
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
        event.stopPropagation();
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
                       size="large"
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
        this.state = {title: ''};
    }

    setDefaultTitle = () => {
        this.setState({title: ''});
    }

    handleChange = (event) => {
        this.setState({title: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let todoParams = {title: this.state.title};
        this.props.todoStore.saveTodo(todoParams);
        this.setDefaultTitle();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
              <Form.Group style={{margin:"0 0 -1em 0"}}>
                    <Form.Input onChange={this.handleChange}
                                fluid
                                style={{width:"400px"}}
                                size='large'
                                value={this.state.title}
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
                <Grid centered>
                    <Grid.Row>
                        <AddTodo />
                    </Grid.Row>
                    <Grid.Row>
                        <List divided
                              inverted
                              size='large'
                              style={{width:"60%"}}>
                            { todos.map(todo => <TodoItem key={todo.id} todo={todo}/>) }
                        </List>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default TodoList;
