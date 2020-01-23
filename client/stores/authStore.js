import { observable, action, runInAction } from "mobx";

class AuthStore {
  @observable user;
  @observable isAuthenticated;
  @observable isLoading;

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
      runInAction(() => {
        this.isLoading = true;
      });

      let response = await fetch("http://localhost:3000/api/user", options);
      let user = await response.json();

      if (response.status == 200) {
        runInAction(() => {
          this.user = user;
          this.isAuthenticated = true;
          this.isLoading = false;
        });
      } else {
        runInAction(() => {
          this.isAuthenticated = false;
          this.isLoading = false;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.isAuthenticated = false;
        this.isLoading = false;
      });
    }
  }
}

export default new AuthStore();
