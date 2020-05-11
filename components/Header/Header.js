import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';

import healthCare from '../../ethereum/HealthCare';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class Header extends Component {
  onLoginClick = async () => {
    const accounts = await web3.eth.getAccounts();
    const userDetails = await healthCare.methods.getUserDetail(String(accounts[0])).call();
    if (!userDetails[0]) {
      Router.pushRoute('/');
      alert('You are not registered! Please Sign up to Continue');
    } else {
      Router.pushRoute('/dashboard');
    }
  };

  render() {
    const { showSignInButtons } = this.props;
    return (
      <Menu style={{ marginTop: '10px' }}>
        <Link route="/">
          <a className="item">Health Care</a>
        </Link>
        {
          showSignInButtons && (
            <Menu.Menu position="right">
              <Button onClick={() => this.onLoginClick()} >
                Login
              </Button>
              <Link route="/signup">
                <Button>
                  Sign up
                </Button>
              </Link>
            </Menu.Menu>
          )
        }
      </Menu>
    );
  }
};

export default Header;

