import { observable, computed, action, runInAction } from "mobx";
import fetch from "isomorphic-fetch";

export class RepositoriesStore {
  @observable repositories = [];
  @observable isLoading = false;

  @computed get count() {
    return this.repositories.length;
  }

  @action
  async fetch() {
    this.repositories = [];
    this.isLoading = true;

    let options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    };

    let url = "http://localhost:3000/api/starred";

    try {
      let hasNextPage = true;
      let endCursor;

      while (hasNextPage) {
        let actualURL = url;
        if (hasNextPage && endCursor) {
          actualURL = actualURL + "?next=" + endCursor;
        }

        let response = await fetch(actualURL, options);

        if (response.status != 200) {
          runInAction(() => {
            this.isLoading = false;
          });
        }

        let json = await response.json();

        hasNextPage = json.hasNextPage;
        endCursor = json.endCursor;

        runInAction(() => {
          this.repositories.push(...json.repos);
        });
      }

      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
    }
  }
}

export default new RepositoriesStore();
