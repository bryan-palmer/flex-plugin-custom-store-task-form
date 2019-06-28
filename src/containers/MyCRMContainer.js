import React from "react";
import { connect } from "react-redux";
import { customUpdateTask } from "../actions";
import Input from "../components/Input";
import NoTaskSelected from "../components/NoTaskSelected";
import TextArea from "../components/TextArea";
import { Actions } from "@twilio/flex-ui";

// default form state used for new tasks
const get_initial_state = () => ({
  name: "",
  email: "",
  notes: ""
});

export class MyCRMContainer extends React.Component {
  constructor(props) {
    super(props);

    // set local form state
    this.state = {
      sid: this.props.task ? this.props.task.sid : null,
      form: get_initial_state()
    };

    // bind handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // fires when a new task is selected or a task completes
  componentDidUpdate(prevProps, prevState) {
    let prevTaskSid = prevProps.task ? prevProps.task.sid : null;
    let newTaskSid = this.props.task ? this.props.task.sid : null;

    // different task is being viewed
    if (prevTaskSid !== newTaskSid) {
      // preserve local state in custom store
      if (prevTaskSid && prevProps.task.status !== "completed")
        prevProps.dispatch(customUpdateTask(prevState));

      // update local state for current task or no task
      this.setState({
        sid: newTaskSid,
        form: this.props.custom.tasks[newTaskSid] || get_initial_state()
      });
    }
  }

  // update local state when form values change
  handleChange(event) {
    let thisTarget = event.target;

    this.setState(prevState => {
      prevState.form[thisTarget.name] = thisTarget.value;
      return prevState;
    });
  }

  handleSubmit(event) {
    alert(`Form submitted (task: ${this.state.sid})
           Name: ${this.state.form.name}
           Email: ${this.state.form.email}
           Notes: ${this.state.form.notes}
           
           ----------------------------------------------------
           ==> Next: Task will be completed!`);

    // use Flex Action to complete task
    Actions.invokeAction("CompleteTask", {
      sid: this.state.sid,
      reason: 'Completed after submitting form'
    });

    // prevent user from nagivating away
    event.preventDefault();
  }

  render() {
    if (!this.props.task) {
      return (
        <div>
          <NoTaskSelected />
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            {/* Task SID */}
            <Input
              type={"text"}
              title={"Task"}
              name={"task"}
              value={this.state.sid}
              disabled={true}
            />

            {/* Customer Name */}
            <Input
              type={"text"}
              title={"Name"}
              name={"name"}
              value={this.state.form.name}
              placeholder={"John Smith"}
              handleChange={this.handleChange}
            />

            {/* Customer Email */}
            <Input
              type={"text"}
              title={"Email"}
              name={"email"}
              value={this.state.form.email}
              placeholder={"john@smith.com"}
              handleChange={this.handleChange}
            />

            {/* Task Notes */}
            <TextArea
              title={"Notes"}
              rows={10}
              cols={60}
              value={this.state.form.notes}
              name={"notes"}
              handleChange={this.handleChange}
              placeholder={"Task notes (issue, resolution, etc)"}
            />

            <input type="submit" value="Submit and Complete Task" />
          </form>
        </div>
      );
    }
  }
}

// provide access to custom store
const mapStateToProps = state => ({
  custom: state.custom
});

export default connect(mapStateToProps)(MyCRMContainer);
