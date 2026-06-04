export type ActionResponse<T = null> = {
  data?: T,
  status: boolean,
  errors?: {
    message:string,
  }
}
