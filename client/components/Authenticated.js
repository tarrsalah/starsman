import React, {useState, useEffect} from "react";
import fetch from "isomorphic-fetch";
import fuzzysearch from "fuzzysearch";
import Header from "./Header.js";
import Repositories from "./Repositories.js";
import Languages from "./Languages.js";
import style from "./App.css";

export default function () {
  const [fetchedRepos, setFetchedRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    let timeout = 0;
    if (timeout) clearTimeout(this.timeout);
    let searchText = e.target.value;

    timeout = setTimeout(() => {
      setFilter(searchText);
    }, 100);
  };

  const count = () => {
    return fetchedRepos.length;
  };

  const languages = () => {
    let map = {};

    fetchedRepos.forEach((repository) => {
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
  };

  const repositories = () => {
    if (filter.length < 3) {
      return fetchedRepos;
    }

    return fetchedRepos.filter((repo) => {
      return fuzzysearch(
        filter.toLowerCase(),
        repo.nameWithOwner.toLowerCase() || ""
      );
    });
  };

  useEffect(() => {
    async function fetchRepos() {
      const url = "http://localhost:3000/api/starred";
      const options = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      };

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
            setIsLoading(false);
          }

          let json = await response.json();
          hasNextPage = json.hasNextPage;
          endCursor = json.endCursor;

          if (Array.isArray(json.repos)) {
            setFetchedRepos(json.repos);
          }
        }
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    }

    fetchRepos();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className={style.main}>
        <div className={style.left}>
          <Languages loading={false} languages={languages()} />
        </div>
        <div className={style.right}>
          <Repositories
            repos={repositories()}
            count={count()}
            isLoading={isLoading}
            handleFilter={handleFilter}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
