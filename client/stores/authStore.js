import { observable, action, runInAction } from "mobx";

class AuthStore {
  @observable user;
  @observable isAuthenticated;

  @action
  async fetch() {
    let options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      let response = await fetch("http://localhost:3000/api/user", options);
      if (response.status == 200) {
        this.user = await response.json();
        this.isAuthenticated = true;
      }
    } catch (err) {
      this.isAuthenticated = false;
    }
  }
}

export default new AuthStore();
