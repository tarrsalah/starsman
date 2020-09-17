import React, {useState, useEffect} from "react";
import fetch from "isomorphic-fetch";
import fuzzysearch from "fuzzysearch";
import Header from "./Header.js";
import Repositories from "./Repositories.js";
import Languages from "./Languages.js";
import style from "./App.css";

export default function () {
  const [fetchedRepos, setFetchedRepos] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(new Set());
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

  function toggleLanguage(name) {
    const clone = new Set(selectedLanguages);
    clone.has(name) ? clone.delete(name) : clone.add(name);
    setSelectedLanguages(clone);
  }

  const languages = () => {
    let map = {};

    filteredByName().forEach((repository) => {
      if (!repository.primaryLanguage) {
        return;
      }

      let name = repository.primaryLanguage.name;

      let language = {};
      language.name = name;
      language.color = repository.primaryLanguage.color;

      if (selectedLanguages.has(name)) {
        language.selected = true;
      }

      if (map.hasOwnProperty(name)) {
        map[name].count++;
      } else {
        language.count = 1;
        map[name] = language;
      }
    });

    return map;
  };

  function filteredByName() {
    if (filter.length >= 3) {
      return fetchedRepos.filter((repo) => {
        return fuzzysearch(
          filter.toLowerCase(),
          repo.nameWithOwner.toLowerCase() || ""
        );
      });
    }
    return fetchedRepos;
  }

  function filteredByLanguage() {
    if (selectedLanguages.size > 0) {
      return filteredByName().filter((repo) => {
        return (
          repo.primaryLanguage &&
          selectedLanguages.has(repo.primaryLanguage.name)
        );
      });
    }
    return filteredByName();
  }

  useEffect(() => {
    async function fetchRepos() {
      const url = "http://localhost:5000/api/starred";
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
          <Languages
            loading={false}
            languages={languages()}
            toggleLanguage={toggleLanguage}
          />
        </div>
        <div className={style.right}>
          <Repositories
            repos={filteredByLanguage()}
            isLoading={isLoading}
            handleFilter={handleFilter}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
