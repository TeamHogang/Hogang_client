import api from "./index";

export const GetMarkerList = async (data) => {
  let config = {
    headers: data,
  };
  const response = await api.get(
    `${process.env.REACT_APP_SERVER_URL}/map/MarkerList`,
    config
  );
  return response;
};

export const GetMarkerDetail = async (data, id) => {
  let config = {
    headers: data,
  };
  const response = await api.get(
    `${process.env.REACT_APP_SERVER_URL}/map/MarkerDetail/${id}`,
    config
  );
  return response;
};

export const PostMarkerDetail = async (data) => {
    const response = await api.post(`${process.env.REACT_APP_SERVER_URL}/api/putMarkerDetail`
    ,data).then(function(response){
      console.log(response);
    }).then(function(error){
      console.log(error);
    });

    return response;
}