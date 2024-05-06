import api from './api';
import { AxiosResponse } from 'axios';
import { User, UserLogin, UserRegister } from '../stores/app';

class AuthService {
  async login({ username, password }: UserLogin): Promise<User> {
    const response = await api.post('/auth/signin', {
      username,
      password,
    });
    const user: User = {
      access_token: response.data.access_token,
      username: response.data.username,
      roleId: response.data.roleId,
    };
    return user;
  }

  async logout(user: User): Promise<{ message: string }> {
    const response = await api.post(
      '/auth/logout',
      {
        username: user.username,
        roleId: user.roleId,
      },
      {
        headers: {
          authorization: user.access_token,
        },
      },
    );
    return response.data;
  }

  async register(
    user: UserRegister,
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await api.post('/auth/signup', {
      username: user.username,
      password: user.password,
      roleId: user.roleId,
    });
    return response.data;
  }

  async getTokenAvalibility(roleId: number, username: string): Promise<number> {
    const response = await api.get(
      `/auth/token?roleId=${roleId}&username=${username}`,
    );
    return response.status;
  }
}

export default new AuthService();
