import api from "./api";

export const sign_in = async function (data) {
  return await api
    .post(`users/auth/sign_in`, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      console.log("response", response);
      const replaced = JSON.stringify(response.headers).replace(
        "access-token",
        "access_token"
      );
      localStorage.setItem("user", replaced);
      return response.data;
    })
    .catch((error) => {
      console.log("response", error);
      return {
        success: false,
        errors: ["Credenciais informados são inválidos, tente novamente"],
      };
    });
};

export const all_Enterprises = async function () {
  const user = JSON.parse(localStorage.getItem("user"));
  return await api
    .get(`enterprises`, {
      headers: {
        "Content-Type": "application/json",
        "access-token": user.access_token,
        client: user.client,
        uid: user.uid,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        errors: [error.message],
      };
    });
};

export const only_enterprise = async function (name) {
  const user = JSON.parse(localStorage.getItem("user"));
  return await api
    .get(`enterprises?name=${name}`, {
      headers: {
        "Content-Type": "application/json",
        "access-token": user.access_token,
        client: user.client,
        uid: user.uid,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        errors: [error.message],
      };
    });
};
