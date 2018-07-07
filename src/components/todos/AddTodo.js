import React from "react";
import { inject, observer} from "mobx-react";
import { Form } from "semantic-ui-react"

@inject("todoStore") @observer
class AddTodo extends React.Component {
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

export default AddTodo;
