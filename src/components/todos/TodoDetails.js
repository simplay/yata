import React from "react";
import { inject, observer} from "mobx-react";
import {
    Checkbox,
    Button,
    Form,
    Icon,
    Modal,
    Header
} from "semantic-ui-react"

@inject("todoStore") @observer
class TodoDetails extends React.Component {
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

export default TodoDetails;
