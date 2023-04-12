import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { RegionsPage, WineListPage, WinePage, NotFound } from '.';

class _WineApp extends Component {
  goBack = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  goHome = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/`,
    });
  };

  render() {
    const displayButton =
      window.location.pathname === '/' || window.location.pathname === '/react-wines-103-bis/'
        ? false
        : true;
    return (
      <div className="container">
        <h1 className="center-align">Open Wine Database</h1>
        <div className="center-align">
          You can read the Wines API documentation at{' '}
          <a href="https://wines-api.onrender.com" target="_blank">
            https://wines-api.onrender.com
          </a>
        </div>
        {displayButton && (
          <div className="center-align" style={{ marginTop: 20 }}>
            <button className="btn waves-effect waves-light" onClick={this.goBack} type="button">
              <i className="material-icons left">fast_rewind</i>
              Back
            </button>
            <button
              className="btn waves-effect waves-light"
              style={{ marginLeft: 10 }}
              onClick={this.goHome}
              type="button">
              <i className="material-icons left">home</i>
              Home
            </button>
          </div>
        )}
        <div className="row">
          <Switch>
            <Route exact path="/" component={RegionsPage} />
            <Route exact path="/regions/:regionId/wines/:wineId" component={WinePage} />
            <Route exact path="/regions/:regionId" component={WineListPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export const WineApp = withRouter(_WineApp);
