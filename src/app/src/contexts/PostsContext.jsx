import { createContext, useState } from "react";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [queryLocation, setQueryLocation] = useState({});
  const [displayCity, setDisplayCity] = useState("");


  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        queryLocation,
        setQueryLocation,
        displayCity,
        setDisplayCity,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider, PostsContext };
