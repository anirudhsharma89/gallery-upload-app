import { galleryConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from ".";
import { history } from "../helpers";

export const galleryActions = {
  galleryUpload,
  getAllGallary
};

function galleryUpload(files) {
  return dispatch => {
    dispatch(request(files));
    userService.galleryUpload(files).then(
      files => {
        dispatch(success(files));
        // history.push("/login");
        // dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(files) {
    return { type: galleryConstants.GALLERY_REQUEST, files };
  }
  function success(files) {
    return { type: galleryConstants.GALLERY_SUCCESS, files };
  }
  function failure(error) {
    return { type: galleryConstants.GALLERY_FAILURE, error };
  }
}

function getAllGallary() {
  return dispatch => {
    dispatch(request());

    userService.getAllGallery().then(
      gallery => dispatch(success(gallery)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: galleryConstants.GALLERY_REQUEST };
  }
  function success(gallery) {
    return { type: galleryConstants.GETALLGALLERY_SUCCESS, gallery };
  }
  function failure(error) {
    return { type: galleryConstants.GETALLGALLERY_FAILURE, error };
  }
}
