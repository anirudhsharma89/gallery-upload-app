import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { galleryActions } from "../actions";

class GalleryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      file: [null]
    };

    this.fileObj = [];
    this.fileArray = [];
    this.uploadedFiles = [];
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  componentDidMount() {
    // this.props.getAllGallary();
  }

  //   handleDeleteUser(id) {
  //     return e => this.props.deleteUser(id);
  //   }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  }

  uploadFiles(e) {
    e.preventDefault();
    this.fileObj.push(e.target.files);

    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.uploadedFiles.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.uploadedFiles });
    console.log("%%%%%%%%%%%%%", this.state);

    if (this.uploadedFiles.length > 0) {
      this.props.galleryUpload(this.state);
    }
    this.fileObj = [];
    this.fileArray = [];
  }

  render() {
    // const { user, users } = this.props;
    console.log("this.props$444444444444444", this.props);

    return (
      <form>
        <div className="form-group multi-preview">
          {(this.uploadedFiles || []).map(url => (
            <img
              src={url}
              style={{ width: "100px", height: "100px" }}
              alt="..."
            />
          ))}
        </div>
        <div className="form-group multi-preview">
          {(this.fileArray || []).map(url => (
            <img
              src={url}
              style={{ width: "50px", height: "50px" }}
              alt="..."
            />
          ))}
        </div>

        <div className="form-group">
          <input
            type="file"
            className="form-control"
            onChange={this.uploadMultipleFiles}
            multiple
          />
        </div>
        <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      </form>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  galleryUpload: galleryActions.galleryUpload,
  getAllGallary: galleryActions.getAllGallary
  //   deleteUser: userActions.delete
};

const connectedGallaryPage = connect(mapState, actionCreators)(GalleryPage);
export { connectedGallaryPage as GalleryPage };
