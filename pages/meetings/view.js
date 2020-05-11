import { Component } from "react";
import healthCare from '../../ethereum/HealthCare';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout/Layout';

class Meetings extends Component {
  state = {
    meetings: [],
  };

  static async getInitialProps(props) {
    const queryAddress = props.query.address;

    return {
      queryAddress
    };
  }

  async componentDidMount() {
    const { queryAddress } = this.props;
    console.log('add====', queryAddress);
    const meetings = await healthCare.methods.getPatientMeetingsList(String(queryAddress)).call();
    // console.log('meetings=====', meetings);
    // const accounts = await web3.eth.getAccounts();
  }

  render() {
    return (
      <Layout>
        <div>Meetings</div>
      </Layout>
    );
  }
}

export default Meetings;
