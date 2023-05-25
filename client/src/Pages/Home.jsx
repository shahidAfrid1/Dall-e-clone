import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";
import "../styles/home.css";
import axios from "axios";
import { server } from "../main";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h2 className="render-title">{title}</h2>;
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${server}/post`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.statusText === "OK") {
          setAllPosts(response.data.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section>
      <div className="hero">
        <h1>
          Images generated by <span>Dall E</span> Artificial Intellegence modal
          by the Users
        </h1>

        <p>
          Generate images by using create button and and upload images to
          showcase your creativity to the world
        </p>
      </div>

      <div className="search-box">
        <FormField
          labelName="Search Images"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div>
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="search-result-text">
                Showing results for <span>{searchText}</span>
              </h2>
            )}

            <div className="cards-container">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;