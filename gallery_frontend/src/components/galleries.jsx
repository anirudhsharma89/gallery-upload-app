import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { galleryActions } from "../actions";

class GalleryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      file: [null]
    };

    this.fileObj = [];
    this.fileArray = [];
    this.uploadedFiles = [];
    this.galleryImg = [];
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  componentWillMount() {
    this.props.getAllGallary(this.state.userId);
  }

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

    if (this.uploadedFiles.length > 0) {
      this.props.galleryUpload(this.state);
      this.props.getAllGallary(this.state.userId);
    }
    this.fileObj = [];
    this.fileArray = [];
  }

  render() {
    const { gallery } = this.props;
    this.galleryImg = gallery.gallery;

    return (
      <form>
        <div className="form-group multi-preview">
          {(this.galleryImg || []).map((url, i) => (
            <img
              key={i}
              src={url}
              style={{
                width: "150px",
                height: "150px",
                paddingRight: "10px",
                paddingLeft: "10px"
              }}
              alt="..."
            />
          ))}
        </div>
        <div className="form-group multi-preview">
          {(this.fileArray || []).map((url, i) => (
            <img
              key={i}
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
  const { gallery } = state;
  return { gallery };
}

const actionCreators = {
  galleryUpload: galleryActions.galleryUpload,
  getAllGallary: galleryActions.getAllGallary
};

const connectedGallaryPage = connect(mapState, actionCreators)(GalleryPage);
export { connectedGallaryPage as GalleryPage };
