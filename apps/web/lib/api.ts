import { LoginSchemaType, RegisterSchemaType } from "@org/lib";
import { handleRequest } from "./fetch";

export const API = {
  user: {
    create: async (user: RegisterSchemaType) => {
      return await handleRequest({
        body: user,
        method: "POST",
        url: "/user/signup",
      });
    },

    login: async (user: LoginSchemaType) => {
      return await handleRequest({
        body: user,
        method: "POST",
        url: "/user/signin",
      });
    },
  },
};
