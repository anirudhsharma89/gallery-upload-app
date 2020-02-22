import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../actions";
import { GalleryPage } from "../components/galleries";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
    return e => this.props.deleteUser(id);
  }

  render() {
    const { user, users } = this.props;
    return (
      <div>
        <header>
          <div className="col-md-12" style={{ backgroundColor: "#f1dbce" }}>
            <span className="col-md-4">
              <h4>Hi {user.firstName}</h4>
            </span>
            <span className="col-md-4"></span>
            <span className="col-md-4">
              <Link to="/login">
                <h4>Logout</h4>
              </Link>
            </span>
          </div>
        </header>
        <div>
          <div>
            <h3>Your Photos Gallery</h3>
            <GalleryPage userId={user.id} />
          </div>
          <div>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && (
              <span className="text-danger">ERROR: {users.error}</span>
            )}
            {users.items && (
              <ul>
                {users.items.map((user, index) => (
                  <li key={user.id}>
                    {user.firstName + " " + user.lastName}
                    {user.deleting ? (
                      <em> - Deleting...</em>
                    ) : user.deleteError ? (
                      <span className="text-danger">
                        {" "}
                        - ERROR: {user.deleteError}
                      </span>
                    ) : (
                      <span>
                        {" "}
                        - <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
