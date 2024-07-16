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

  static async getProfile() {
    const response = await fetch("http://localhost:3001/profile");
    return response.json();
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
}

/**
 * { token: {…}, user: {…} }
​
token: Object { access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlhFTzNTeHlDM2hQdXo2eXN2LXAzYiIsInVzZXJuYW1lIjoiYWRpZWwiLCJmdWxsbmFtZSI6IkFkaWVsIERldiIsImlhdCI6MTcyMTE0NzcxMiwiZXhwIjoxNzIxMjM0MTEyfQ.3D0skxCHGS8DH0jq6e0OMoKijkodHiMoxLigTel67kQ", refresh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlhFTzNTeHlDM2hQdXo2eXN2LXAzYiIsInVzZXJuYW1lIjoiYWRpZWwiLCJmdWxsbmFtZSI6IkFkaWVsIERldiIsImlhdCI6MTcyMTE0NzcxMiwiZXhwIjoxNzIxNDA2OTEyfQ.xZD_mS4RC_7KNJMnB7oS11pYyOsUXuqSTd4k8PQCTu0" }
​
user: Object { id: "XEO3SxyC3hPuz6ysv-p3b", username: "adiel", fullname: "Adiel Dev" }
 */
