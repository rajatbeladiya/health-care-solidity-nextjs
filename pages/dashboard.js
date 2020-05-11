import React, { Component, Fragment } from 'react';
import { Card, Button, Message } from 'semantic-ui-react';
// import factory from '../ethereum/factory';
import healthCare from '../ethereum/HealthCare';
import web3 from '../ethereum/web3';
import Layout from '../components/Layout/Layout';
import { Router, Link } from '../routes';

class Dashboard extends Component {
  state = {
    errorMessage: '',
    user: {},
    doctors: [],
    patients: [],
    loading: false,
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const userDetails = await healthCare.methods.getUserDetail(String(accounts[0])).call();
    console.log('userDetails=====', userDetails);
    if (!userDetails[0]) {
      Router.pushRoute('/');
      alert('You are not registered! Please Sign up to Continue');
    }
    const doctors = await healthCare.methods.getDoctorAccounts().call();
    const patients = await healthCare.methods.getPatientAccounts().call();
    this.setState({
      user: userDetails,
      doctors: doctors,
      patients: patients,
    });
  }

  handleState = (message) => {
    this.setState({ errorMessage: this.props.errorMessage });
  }

  renderUsersList(users = [], role) {
    const items = users.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/${role}/${address}`}>
            <a>View {role}</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    const { errorMessage, user, doctors, patients } = this.state;
    return (
      <Layout>
        {
          errorMessage && (
            <Message error header="Oops!" content={errorMessage} />
          )
        }
        <div className='profile'>
          <h3>Profile</h3>
          <div><b>First Name:</b> {user[0]}</div>
          <div><b>Last Name:</b> {user[1]}</div>
          <div><b>Role:</b> {user[2]}</div>
        </div>
        <br />
        {
          user && user[2] === "doctor" && (
            <div className="patients">
              <h3>Patients</h3>
              {this.renderUsersList(patients, "patient")}
            </div>
          )
        }
        {
          user && user[2] === "patient" && (
            <div className="doctors">
              <h3>Doctors</h3>
              {this.renderUsersList(doctors, "doctor")}
            </div>
          )
        }
      </Layout>
    );
  }
}

export default Dashboard;
