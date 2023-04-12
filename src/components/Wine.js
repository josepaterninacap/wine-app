import React, { Component } from 'react';
import { Loader } from '.';
import { connect } from 'react-redux';
import { LikeButton, CommentButton, CommentList, CommentModal } from '.';
import * as Actions from '../actions';
import { host } from '../services/Wines';

class Wine extends Component {
  render() {
    if (this.props.wine === null) {
      return null;
    }
    return (
      <div className="col s12 m12 l6 offset-l3">
        <h2 className="center-align">Wine details</h2>
        <div className="card horizontal">
          <div className="card-image">
            <img
              className="responsive-img wine-detail-image"
              alt="Wine bottle pic"
              src={`${this.props.host}/api/wines/${this.props.wine.id}/image`}
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h3>{this.props.wine.name}</h3>
              <br />
              <p>
                <b>Appellation:</b> {this.props.wine.appellation.name}
              </p>
              <p>
                <b>Region:</b> {this.props.wine.appellation.region}
              </p>
              <p>
                <b>Color:</b> {this.props.wine.type}
              </p>
              <p>
                <b>Grapes:</b> {this.props.wine.grapes.join(', ')}
              </p>
              <CommentList wine={this.props.wine} />
            </div>
            <div className="card-action">
              <LikeButton wine={this.props.wine} />
              <CommentButton openCommentModal={this.props.openCommentModal} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class _WinePage extends Component {
  state = {
    commentModalOpen: false,
  };

  componentDidMount() {
    const id = this.props.match.params.wineId;
    this.props.dispatch(Actions.fetchCurrentWine(id));
  }

  closeCommentModal = () => {
    this.setState({ commentModalOpen: false });
  };

  openCommentModal = () => {
    this.setState({ commentModalOpen: true });
  };

  render() {
    if (this.props.loading) {
      return (
        <div className="center-align">
          <Loader />
        </div>
      );
    }
    return (
      <div>
        <Wine host={host} wine={this.props.wine} openCommentModal={this.openCommentModal} />
        <CommentModal
          wine={this.props.wine}
          isOpen={this.state.commentModalOpen}
          closeCommentModal={this.closeCommentModal}
        />
      </div>
    );
  }
}

function mapFromStoreToProps(store) {
  return {
    wine: store.currentWine ? store.currentWine.wine : null,
    comments: store.currentWine ? store.currentWine.comments : [],
    liked: store.currentWine ? store.currentWine.liked : false,
    loading: store.loading === 'HTTP_LOADING',
  };
}

export const WinePage = connect(mapFromStoreToProps)(_WinePage);
