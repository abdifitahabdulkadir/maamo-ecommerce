export type ActionResponse<T = null> = {
  data?: T,
  status: boolean,
  errors?: {
    message:string,
  }
}

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

export enum AuthProviderID {
  credentail
}
