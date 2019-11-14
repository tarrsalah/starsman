import { observable, computed, action, runInAction } from "mobx";
import fetch from "isomorphic-fetch";
import fuzzysearch from "fuzzysearch";

export class RepositoriesStore {
  @observable fetchedRepositories = [];
  @observable isLoading = false;
  @observable filter = "";
  @observable languagerFilters = [];

  @computed get count() {
    return this.repositories.length;
  }

  @computed get repositories() {
    if (this.filter.length < 3) {
      return this.fetchedRepositories;
    }

    return this.fetchedRepositories.filter(repo => {
      return fuzzysearch(
        this.filter.toLowerCase(),
        repo.nameWithOwner.toLowerCase() || ""
      );
    });
  }

  @computed get languages() {
    let map = {};

    this.repositories.forEach(repository => {
      if (!repository.primaryLanguage) {
        return;
      }

      let name = repository.primaryLanguage.name;

      let language = {};
      language.name = name;
      language.color = repository.primaryLanguage.color;

      if (map.hasOwnProperty(name)) {
        map[name].count++;
      } else {
        language.count = 1;
        map[name] = language;
      }
    });

    return map;
  }

  @action
  async fetch() {
    this.fetchedRepositories = [];
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
          if (Array.isArray(json.repos)) {
            this.fetchedRepositories = json.repos;
          }
        });
      }

      runInAction(() => {
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default new RepositoriesStore();
