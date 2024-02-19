"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e, tag = "") => {
    const text = tag ? tag : e.target.value;

    setSearchText(text);

    const searchRegex = new RegExp(text, "i");

    const searchedResult = posts.filter(
      (post) =>
        searchRegex.test(post.tag) ||
        searchRegex.test(post.prompt) ||
        searchRegex.test(post.creator.username)
    );

    setSearchedPosts(searchedResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchedPosts.length !== 0 ? searchedPosts : posts}
        handleTagClick={(tag) => handleSearchChange(undefined, tag)}
      />
    </section>
  );
};

export default Feed;
