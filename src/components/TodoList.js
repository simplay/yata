import React, { Component } from "react";
import { inject, observer} from "mobx-react";
import {
    List,
    Segment,
    Grid,
    Checkbox,
    Button,
    Form,
    Icon,
    Modal,
    Header
} from "semantic-ui-react"
import { Flex, Box } from "reflexbox"

@inject("todoStore") @observer
class TodoDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.todo.title,
            description: this.getDescription(),
            status: this.getStatusCode(this.props.todo)
        }
    }

    handleClose = () => {
        let activeTodo = this.props.todo;
        this.props.todoStore.disableActiveTodo();
        this.props.todoStore.updateActiveTodo(
            activeTodo, this.state
        );
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
            return "";
        }
        return description;
    }

    // Todo status enum:
    //   0: pristine
    //   1: wip
    //   2: done
    //   3: canceled
    getStatusCode = (todo) => {
        switch(todo.status) {
            case "pristine":
                return 0;
            case "wip":
                return 1;
            case "done":
                return 2;
            case "canceled":
                return 3;
            default:
                return 1;
        }
    }

    handleDoneClick = (event) => {
        let newStatus = this.state.status === 0 ? 2 : 0
        this.setState({
            status: newStatus
        });
    }

    statusIsDone = () => {
        return this.state.status === 2;
    }

    render() {
        let title = `Details: ${this.props.todo.title}`
        const inlineStyle = {
            modal: {
                marginTop: "0px !important",
                marginLeft: "auto",
                marginRight: "auto"
            }
        };

        return (
            <Modal
                open={this.displayModal()}
                centered="true"
                onClose={this.handleClose}
                style={inlineStyle.modal}
                size="large"
            >
                <Header icon='browser' content='Todo Details' />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Title</label>
                            <input
                                placeholder="Title..."
                                value={this.state.title}
                                name="title"
                                onChange={this.handleOnChange}
                            />
                        </Form.Field>
                        <Form.TextArea
                            label="Description"
                            placeholder="Description goes here..."
                            value={this.state.description}
                            name="description"
                            onChange={this.handleOnChange}>
                        </Form.TextArea>
                        <Form.Field>
                            <Checkbox
                                label="Done"
                                name="status"
                                type="checkbox"
                                checked={this.statusIsDone()}
                                onClick={this.handleDoneClick}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" onClick={this.handleClose} inverted>
                        <Icon name="checkmark" /> Save
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

@inject("todoStore") @observer
class TodoItem extends Component {
    state = {
        isHovered: false
    };

    handleDeleteClick = (event) => {
        let activeTodo = this.props.todo;
        this.props.todoStore.deleteTodo(activeTodo);
        event.stopPropagation();
    }

    handleSegmentClick = (event) => {
        this.props.todoStore.setActiveTodo(this.props.todo);
    }

    handleHoverOn = (event) => {
        this.setState({
            isHovered: true
        });
    }

    handleHoverOff = (event) => {
        this.setState({
            isHovered: false
        });
    }

    getTodoItemStyle = () => {
        let todoStyle = {
            marginBottom: "5px",
            marginTop: "5px",
            border: "3px solid"
        };
        todoStyle["color"] = this.state.isHovered ? "purple" : "black";
        return todoStyle;
    }

    render() {
        let todo = this.props.todo;
        return (
            <div>
                <TodoDetails todo={this.props.todo}/>
                <Segment
                    className="inverted"
                    size="large"
                    style={this.getTodoItemStyle()}
                    onMouseEnter={this.handleHoverOn}
                    onMouseLeave={this.handleHoverOff}
                    onClick={this.handleSegmentClick}
                >
                    <List.Item>
                        <List.Content>
                            <Flex justify="space-between">
                                <Box>
                                    <List.Header style={{color: "white"}}>
                                        {todo.title}
                                    </List.Header>
                                </Box>
                                <Box>
                                    <Button
                                        color="red"
                                        onClick={this.handleDeleteClick}
                                    >
                                        Delete
                                    </Button>
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
        this.state = {title: ""};
    }

    setDefaultTitle = () => {
        this.setState({title: ""});
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
                    <Form.Input
                        onChange={this.handleChange}
                        fluid
                        style={{width:"400px"}}
                        size="large"
                        value={this.state.title}
                        placeholder="New Todo..."
                    />
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
                        <List
                            divided
                            inverted
                            size='large'
                            style={{width:"60%"}}
                        >
                            { todos.map(todo => <TodoItem key={todo.id} todo={todo}/>) }
                        </List>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default TodoList;
