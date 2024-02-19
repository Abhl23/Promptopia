"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);

  const { id } = useParams();

  const searchParams = useSearchParams();

  const username = searchParams.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (id) {
      fetchPosts();
    }
  }, [id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page`}
      data={posts}
    />
  );
};

export default UserProfile;
