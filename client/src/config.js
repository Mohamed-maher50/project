const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
export const config = {
  headers: {
    Authorization: "bearer " + token,
  },
};
