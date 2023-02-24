// const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
// export const config = {
//   headers: {
//     Authorization: "bearer " + token,
//   },
// };
const authConfig = (token) => {
  return {
    headers: {
      Authorization: "bearer " + token,
    },
  };
};
export default authConfig;
