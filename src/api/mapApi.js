import api from "./index";

export const GetMarkerList = async () => {
  // let config = {
  //   headers: data,
  // };
  const response = await api.get(
    `${process.env.REACT_APP_SERVER_URL}/map/MarkerList`
  );
  return response;
};

export const PostMarkerDetail = async (data) => {
    const response = await api.post(`${process.env.REACT_APP_SERVER_URL}/map/putMarkerDetail`
    ,data).then(function(response){
      console.log(response);
    }).then(function(error){
      console.log(error);
    });

    return response;
}