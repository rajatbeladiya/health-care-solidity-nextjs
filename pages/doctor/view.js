import React, { Component, Fragment } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';
import healthCare from '../../ethereum/HealthCare';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class DoctorView extends Component {
  state = {
    loading: false,
    delicated: false,
    queryAddress: '',
    senderAddress: '',
    firstName: '',
    lastName: '',
    role: '',
    isDoctorDelicated: '',
    loggedInUserRole: '',
  };

  static async getInitialProps(props) {
    const queryAddress = props.query.address;

    return {
      queryAddress
    };
  }

  async componentDidMount() {
    let delicated;
    const { queryAddress } = this.props;
    const user = await healthCare.methods.getUserDetail(queryAddress).call();
    const accounts = await web3.eth.getAccounts();
    const senderAddress = accounts[0];
    const loggedInUser = await healthCare.methods.getUserDetail(senderAddress).call();
    if(user[2] == "doctor") {
      delicated = await healthCare.methods.isDoctorDelicated(senderAddress, queryAddress).call();
      console.log('delicated======', delicated);
    }
    this.setState({
      queryAddress,
      firstName: user[0],
      lastName: user[1],
      role: user[2],
      delicated,
      senderAddress,
      loggedInUserRole: loggedInUser[2],
    });
  }

  onDelicateClick = async (doctorAddress, delicated) => {
    const { senderAddress } = this.state;
    this.setState({ loading: true });
    await healthCare.methods
        .delicateAccessToDoctor(doctorAddress, delicated)
        .send({ from: senderAddress });
    this.setState({ loading: false,  delicated: delicated });
  }

  renderCards() {
    const {
      firstName, lastName, role, queryAddress, loading, delicated, loggedInUserRole
    } = this.state;

    const items = [
      {
        header: queryAddress,
        description: (
          <div>
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
            {
              loggedInUserRole === "patient" && (
                <Button
                  primary
                  onClick={() => this.onDelicateClick(queryAddress, !delicated)}
                  loading={loading}
                >
                  {delicated ? 'Remove Delicate' : 'Delicate'}
                </Button>
              )
            }
            {
              loggedInUserRole === "doctor" && (
                <div>
                  <Button
                    primary
                    onClick={() => Router.pushRoute(`/meetings/${queryAddress}`)}
                    loading={loading}
                  >
                    Past Meetings
                  </Button>
                  <Button
                    primary
                    onClick={() => Router.pushRoute(`/meetings/add/${queryAddress}`)}
                    loading={loading}
                  >
                    Add Meeting
                  </Button>
                </div>
              )
            }
          </div>
        ),
        style: { overflowWrap: 'break-word' }
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    const { loggedInUserRole } = this.state;
    return (
      <Layout>
        {
          <h3>{loggedInUserRole == "doctor" ? 'Patients' : 'Doctors'}</h3>     
        }
        
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default DoctorView;
