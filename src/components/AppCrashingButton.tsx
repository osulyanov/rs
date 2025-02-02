import { Component } from 'react';

interface AppCrashingButtonState {
  error: boolean;
}
class AppCrashingButton extends Component<object, AppCrashingButtonState> {
  constructor(props: Readonly<object>) {
    super(props);
    this.state = { error: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ error: true });
  }
  render() {
    if (this.state.error) {
      throw new Error('I crashed!');
    }
    return <button onClick={this.handleClick}>Crash me!</button>;
  }
}

export default AppCrashingButton;
