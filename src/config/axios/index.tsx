import axiosInstance from "./axiosInstance";
import { showError } from "../../messageHelper/Helper";

export const makeAuthenticatedGetRequest = (url) => {
  return async (dispatch, getState) => {
    const state = await getState();
    console.log("Access-Token GET Request---->", state);
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, {
          headers: {
            Authorization:
              state?.user?.accessToken && "Bearer " + state?.user?.accessToken,
          },
        })
        .then(function (response) {
          const returnValue = {
            type: "success",
            data: response.data,
          };
          return resolve(returnValue);
        })
        .catch(async function (error) {
          if (error.response) {
            const status = error.response.status;
            const dataError = error.response.data;
            switch (status) {
              case 400:
                showError(
                  dataError?.results?.detail[0] || dataError?.detail[0]
                );
                return reject(error);
              case 401:
                showError("User is not authorized");
                return reject(error);
              case 403:
                showError("You are not authorized to make this request.");
                return reject(error);
              case 404:
                showError(
                  "This data either does not exist or you are not authorized to view it."
                );
                return reject(error);
              case 500:
                showError(
                  "Something went wrong while attempting to process your request. Please try again later."
                );
                return reject(error);
              default:
                showError("Something went wrong. Please try again later.");
                return reject(error);
            }
          } else if (error.request) {
            showError(
              "The server is not responding. Please check your internet connection or try again later."
            );
            return reject(error);
          } else {
            showError(
              "Something went wrong while attempting to process your request. Please try again later."
            );
            return reject(error);
          }
        });
    });
  };
};

export const makeAuthenticatedPostRequest = (url, data) => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log("Access-Token POST Request ---->", state?.user?.accessToken);
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data, {
          headers: {
            Authorization:
              state?.user?.accessToken && "Bearer " + state?.user?.accessToken,
          },
        })
        .then(function (response) {
          const returnValue = {
            type: "success",
            data: response?.data,
          };
          return resolve(returnValue);
        })
        .catch(async function (error) {
          if (error?.response) {
            const status = error.response.status;
            const dataError = error.response.data;

            console.log("Error of API", error?.response)
            switch (status) {
              case 400:
                showError(
                  dataError?.results?.detail[0] || dataError?.detail[0]
                );
                return reject(error);
              case 401:
                showError("User is not authorized!");
                return reject(error);
              case 403:
                showError("You are not authorized to make this request.");
                return reject(error);
              case 404:
                showError(
                  "This data either does not exist or you are not authorized to view it."
                );
                return reject(error);
              case 500:
                showError(
                  "Something went wrong while attempting to process your request. Please try again later."
                );
                return reject(error);
              default:
                showError("Something went wrong. Please try again later.");
                return reject(error);
            }
          } else if (error.request) {
            showError(
              "The server is not responding. Please check your internet connection or try again later."
            );
            return reject(error);
          } else {
            showError(
              "Something went wrong while attempting to process your request. Please try again later."
            );
            return reject(error);
          }
        });
    });
  };
};

export const makeAuthenticatedPatchRequest = (url, data = {}) => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log("Access-Token PATCH Request ---->", state?.user?.accessToken);
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch(url, data, {
          headers: {
            Authorization:
              state?.user?.accessToken && "Bearer " + state?.user?.accessToken,
          },
        })
        .then(function (response) {
          const returnValue = {
            type: "success",
            data: response.data,
          };
          return resolve(returnValue);
        })
        .catch(async function (error) {
          if (error?.response) {
            const status = error.response.status;
            const dataError = error.response.data;
            switch (status) {
              case 400:
                showError(dataError?.results?.detail[0]);
                return reject(error);
              case 401:
                showError("User is not authorized!");
                return reject(error);
              case 403:
                showError("You are not authorized to make this request.");
                return reject(error);
              case 404:
                showError(
                  "This data either does not exist or you are not authorized to view it."
                );
                return reject(error);
              case 500:
                showError(
                  "Something went wrong while attempting to process your request. Please try again later."
                );
                return reject(error);
              default:
                showError("Something went wrong. Please try again later.");
                return reject(error);
            }
          } else if (error.request) {
            showError(
              "The server is not responding. Please check your internet connection or try again later."
            );
            return reject(error);
          } else {
            showError(
              "Something went wrong while attempting to process your request. Please try again later."
            );
            return reject(error);
          }
        });
    });
  };
};

export const makeAuthenticatedDeleteRequest = (url) => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log("Access-Token DELETE Request ---->", state?.user?.accessToken);
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(url, {
          headers: {
            Authorization:
              state?.user?.accessToken && "Bearer " + state?.user?.accessToken,
          },
        })
        .then(function (response) {
          const returnValue = {
            type: "success",
            data: response.data,
          };
          return resolve(returnValue);
        })
        .catch(async function (error) {
          if (error?.response) {
            const status = error.response.status;
            const dataError = error.response.data;
            switch (status) {
              case 400:
                showError(
                  dataError?.results?.detail[0] || dataError?.detail[0] || dataError?.message
                );
                return reject(error);
              case 401:
                showError("User is not authorized!");
                return reject(error);
              case 403:
                showError("You are not authorized to make this request.");
                return reject(error);
              case 404:
                showError(
                  "This data either does not exist or you are not authorized to view it."
                );
                return reject(error);
              case 500:
                showError(
                  "Something went wrong while attempting to process your request. Please try again later."
                );
                return reject(error);
              default:
                showError("Something went wrong. Please try again later.");
                return reject(error);
            }
          } else if (error.request) {
            showError(
              "The server is not responding. Please check your internet connection or try again later."
            );
            return reject(error);
          } else {
            showError(
              "Something went wrong while attempting to process your request. Please try again later."
            );
            return reject(error);
          }
        });
    });
  };
};
