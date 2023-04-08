import axios, { Axios } from "axios";

export type LoginPayload = {
  email: string;
  password: string;
};
export type LoginResponse = UserDto & {
  accessToken: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};
export type UserDto = {
  id: string;
  name: string;
  email: string;
};

export class BackendService {
  private axios: Axios;

  constructor(private baseUrl: string) {
    this.axios = axios.create({ baseURL: baseUrl });
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const result = await this.axios.post<LoginResponse>(`/auth/login`, payload);
    return result.data;
  }

  async signup(payload: SignupPayload): Promise<UserDto> {
    const result = await this.axios.post<UserDto>(`/auth/signup`, payload);
    return result.data;
  }
}

export const backendService = new BackendService("http://localhost:3001");
