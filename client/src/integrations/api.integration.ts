import axios from "axios";
import { PostInterface } from "../interfaces/post.interface";
import { UserInterface } from "../interfaces/user.interface";
export class ApiIntegration {
  private static accessToken = localStorage.getItem("@socialdev:token");
  private static refreshToken = localStorage.getItem("@socialdev:refreshtoken");
  private static username = localStorage.getItem("@socialdev:username");
  private static fullname = localStorage.getItem("@socialdev:fullname");

  static axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
    },
  });

  static async getPosts() {
    try {
      if (!this.accessToken) {
        throw new Error("Você não está autenticado, por favor faça login");
      }
      const response = await this.axiosInstance.get("/feed", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const body = response.data;
      console.log(body);
      return body as Promise<PostInterface[]>;
    } catch (error) {
      if (
        (error as any).message.includes("Request failed with status code 401")
      ) {
        throw new Error("Você não está autenticado, por favor faça login");
      }
      throw error;
    }
  }

  static async getAuthenticateUser() {
    try {
      const response = await this.axiosInstance.get<UserInterface>("users/me", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const user = response.data;
      console.log(user);
      user.fullname = user.firstName + " " + user.lastName;
      return user;
    } catch (error) {
      if (
        (error as any).message.includes("Request failed with status code 401")
      ) {
        throw new Error("Você não está autenticado, por favor faça login");
      }
      throw error;
    }
  }

  static async getUser(username?: string) {
    try {
      const response = await this.axiosInstance.get<UserInterface>(
        `users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      const user = response.data;
      console.log(user);
      user.fullname = user.firstName + " " + user.lastName;
      return user;
    } catch (error) {
      if (
        (error as any).message.includes("Request failed with status code 401")
      ) {
        throw new Error("Você não está autenticado, por favor faça login");
      }
      throw error;
    }
  }

  static async authenticateUser(username: string, password: string) {
    try {
      const response = await this.axiosInstance.post("/sign/in", {
        username,
        password,
      });
      console.log(response.data);

      localStorage.setItem("@socialdev:token", response.data.token.access);
      localStorage.setItem(
        "@socialdev:refreshtoken",
        response.data.token.refresh
      );
      localStorage.setItem("@socialdev:username", response.data.user.username);
      localStorage.setItem("@socialdev:fullname", response.data.user.fullname);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async refreshAuthentication() {
    try {
      const response = await this.axiosInstance.post("/sign/refresh", {
        refreshToken: this.refreshToken,
      });
      console.log(response.data);

      localStorage.setItem("@socialdev:token", response.data.token.access);
      localStorage.setItem(
        "@socialdev:refreshtoken",
        response.data.token.refresh
      );
      return response.data;
    } catch (error) {
      if (
        (error as any).message.includes("Request failed with status code 401")
      ) {
        throw new Error("Autenticação expirada, por favor faça login");
      }
      throw error;
    }
  }

  static async registerUser(user: UserInterface) {
    try {
      const response = await this.axiosInstance.post("/sign/up", user);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async becomeFan(userId: string) {
    try {
      const response = await this.axiosInstance.post(
        `/fanbase?heroId=${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async stopBeingFan(userId: string) {
    try {
      const response = await this.axiosInstance.delete(
        `/fanbase?heroId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getFans(userId: string) {
    try {
      const response = await this.axiosInstance.get<UserInterface[]>(
        `/users/${userId}/fans`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      const fans = response.data;
      console.log(fans);
      return fans;
    } catch (error) {
      throw error;
    }
  }

  static async getHeroes(userId: string) {
    try {
      const response = await this.axiosInstance.get<UserInterface[]>(
        `/users/${userId}/heroes`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      const fans = response.data;
      console.log(fans);
      return fans;
    } catch (error) {
      throw error;
    }
  }

  static async getSuggestedHeroes() {
    try {
      const response = await this.axiosInstance.get<UserInterface[]>(
        `/fanbase`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      const heroes = response.data;
      console.log(heroes);
      return heroes;
    } catch (error) {
      throw error;
    }
  }

  static async likePost(postId: string) {
    try {
      const response = await this.axiosInstance.post(
        `/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async unlikePost(postId: string) {
    try {
      const response = await this.axiosInstance.delete(
        `/posts/${postId}/unlike`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPostsByOwnerId(ownerId: string) {
    try {
      const response = await this.axiosInstance.get<PostInterface[]>(
        `/posts?ownerId=${ownerId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      const posts = response.data;
      console.log(posts);
      return posts;
    } catch (error) {
      throw error;
    }
  }
}
