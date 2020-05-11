import React, { Component } from 'react';
import { Form, Button, Message, Input, Radio } from 'semantic-ui-react';
import healthCare from '../ethereum/HealthCare';
import web3 from '../ethereum/web3';
import { Link, Router } from '../routes';
import Layout from '../components/Layout/Layout';

class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    role: 'doctor',
    loading: false,
    errorMessage: ''
  };

  // static async getInitialProps(props) {
  //   const { address } = props.query;

  //   return { address };
  // }

  onSubmit = async event => {
    event.preventDefault();
    const { firstName, lastName, role } = this.state;

    this.setState({ loading: true, errorMessage: '' });
    console.log('details======', this.state);
    console.log('HealthCare.methods===', healthCare.methods);
    try {
      const accounts = await web3.eth.getAccounts();
      await healthCare.methods
        .signUp(firstName, lastName, role)
        .send({ from: accounts[0] });

      Router.pushRoute(`/dashboard`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    console.log('role====', this.state.role);
    return (
      <Layout>
        <Link route="/">
          <a>Back</a>
        </Link>
        <h3>Sign Up</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>First Name</label>
            <Input
              value={this.state.firstName}
              onChange={event =>
                this.setState({ firstName: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Last Name</label>
            <Input
              value={this.state.lastName}
              onChange={event => this.setState({ lastName: event.target.value })}
            />
          </Form.Field>
          <label>I am a </label>
          <Form.Field>
            <Radio
              label='Doctor'
              name='roleRadioGroup'
              value='doctor'
              checked={this.state.role === 'doctor'}
              onChange={() => this.setState({ role: "doctor" })}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Patient'
              name='roleRadioGroup'
              value='patient'
              checked={this.state.role === 'patient'}
              onChange={() => this.setState({ role: "patient" })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Sign Up
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default SignUp;
