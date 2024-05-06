// Utilities
import { defineStore, DefineStoreOptionsBase, StoreDefinition } from 'pinia';
import AuthService from '../services/auth.service';
import TableService, {
  Inventory,
  Position,
  UserUpdate,
} from '../services/table.service';
import { AxiosResponse } from 'axios';
import { RouteParamValue } from 'vue-router';

export interface UserState {
  status: {
    loggedIn: boolean;
  };
  user: User | null;
}

export interface User {
  access_token: string;
  username: string;
  roleId: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  username: string;
  password: string;
  roleId: number;
}

export interface FormatData {
  count: number;
  codes: string[];
}

export const useAppUserStore: DefineStoreOptionsBase<
  UserState,
  StoreDefinition
> &
  StoreDefinition<
    string,
    UserState,
    {
      logIn: (state) => boolean;
      hasUser: (state) => User;
      userRole: (state) => number;
      authToken: (state) => string;
    },
    {
      logout(): void;
      login(user: UserLogin): Promise<User>;
      register(user: UserRegister): Promise<{ message: string }>;
      updateCode(form: FormatData): Promise<void>;
      updateUsers(form: UserUpdate[]): Promise<void>;
      getAllInventory(): Promise<Inventory[]>;
      getSingleInventory(code: string | RouteParamValue[]): Promise<Inventory>;
      getAllPositions(): Promise<Position[]>;
      checkToken(): Promise<number>;
      clearTables(): Promise<void>;
    }
  > = defineStore({
  id: 'app',
  state: (): UserState => {
    return {
      status: { loggedIn: false },
      user: null,
    };
  },
  persist: true,
  getters: {
    logIn: (state) => state.status.loggedIn,
    hasUser: (state) => state.user,
    userRole: (state) => state.user.roleId,
    authToken: (state) => state.user.access_token,
  },
  actions: {
    async checkToken() {
      try {
        return await AuthService.getTokenAvalibility(
          this.userRole,
          this.user.username,
        );
      } catch (e) {
        this.status.loggedIn = false;
        this.user = null;
      }
    },
    async login(user: UserLogin) {
      try {
        const response = await AuthService.login(user);
        this.status.loggedIn = true;
        this.user = response;
        // return response;
      } catch (error) {
        this.status.loggedIn = false;
        this.user = null;
        return Promise.reject(error);
      }
    },
    async logout() {
      await AuthService.logout(this.user);
      this.status.loggedIn = false;
      this.user = null;
    },
    async register(user: UserRegister) {
      try {
        const response: AxiosResponse<{ message: string }> =
          await AuthService.register(user);
        this.status.loggedIn = true;
        return response.data;
      } catch (error) {
        this.status.loggedIn = true;
        return Promise.reject(error);
      }
    },
    async updateCode(form: FormatData) {
      await TableService.updatePosition(form);
    },
    async updateUsers(users: UserUpdate[]) {
      await TableService.updateUsers(users);
    },
    async getAllInventory() {
      return await TableService.getInventories(
        this.user.access_token,
        `${this.userRole}:${this.user.username}`,
      );
    },
    async getSingleInventory(code: string) {
      return await TableService.getInventory(code);
    },
    async getAllPositions() {
      return await TableService.getPositions(
        this.user.access_token,
        `${this.userRole}:${this.user.username}`,
      );
    },
    async clearTables() {
      await TableService.clearTables();
    },
  },
});
