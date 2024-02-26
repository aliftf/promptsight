'use client';

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ post, handleTagClick }) => {
  return (
    <div className="mt-16 prompt-layout">
      {post.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');

  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchState(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} className="search-input peer" required />
      </form>

      <PromptCardList post={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed