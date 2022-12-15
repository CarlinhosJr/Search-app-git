import { MagnifyingGlass, Moon, SunDim } from "phosphor-react";
import { useEffect, useState, useRef } from "react";
import AreaInfo from "./components/AreaInfo";
import { useTheme } from "./hooks/useTheme";
import { joinedDate } from "./utils/FormatData";

function App() {
  const { theme, setTheme } = useTheme();
  const [searchUser, setSearchUser] = useState("octocat");
  const [userNotFound, setUserNotFound] = useState(false);
  const [empty, setEmpty] = useState(false);
  const userNameRef = useRef(null);

  const [user, setUser] = useState({
    avatar: "",
    name: "",
    joinedAt: "",
    login: "",
    bio: "",
    repos: "",
    followers: "",
    following: "",
    location: "",
    twitter: "",
    company: "",
    blog: "",
  });

  function handleSubmit() {
    if (
      userNameRef.current?.value === "" ||
      userNameRef.current?.value === undefined
    ) {
      setEmpty(true);
      setUser(null);
      return;
    }

    setEmpty(false);
    fetchUser(searchUser);
  }

  async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.status != 200) {
      setUserNotFound(true);
      setUser(null);
      return;
    }

    setUserNotFound(false);

    setUser({
      avatar: data.avatar_url,
      name: data.name,
      joinedAt: joinedDate(data.created_at),
      login: data.login,
      bio: data.bio,
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      location: data.location,
      twitter: data.twitter_username,
      company: data.company,
      blog: data.blog,
    });

    console.log(data);
  }

  useEffect(() => {
    fetchUser(searchUser);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="md:w-[730px] w-[330px] mb-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#222731] dark:text-white">
          devfinder
        </div>
        <div>
          {theme === "light" ? (
            <button
              className="w-[78px] flex items-center gap-2 cursor-pointer text-[#697c9a] font-bold outline-none"
              onClick={() => setTheme("dark")}
            >
              DARK
              <Moon size={28} weight="fill" />
            </button>
          ) : (
            <button
              className="w-[78px] flex items-center gap-2 cursor-pointer text-white font-bold outline-none"
              onClick={() => setTheme("light")}
            >
              LIGHT
              <SunDim size={28} weight="fill" />
            </button>
          )}
        </div>
      </div>

      <form
        className="md:w-[730px] md:h-[69px] w-[350px] h-14 flex items-center justify-between bg-white dark:bg-[#1f2a48] rounded-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="h-full flex items-center gap-4">
          <MagnifyingGlass size={32} className="ml-4" color="#2272c9" />
          <input
            className=" h-10 md:w-[350px] w-40 outline-none text-lg text-[#4b6a9b] bg-white dark:bg-[#1f2a48] placeholder:text-[#4b6a9b] placeholder:opacity-80 md:placeholder:text-base placeholder:text-xs "
            type="text"
            placeholder="Search Github username..."
            ref={userNameRef}
            onChange={(event) => setSearchUser(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="md:w-[100px] md:h-[50px] w-16 h-10 rounded-xl mr-4  text-white md:text-lg text-sm bg-[#0079ff] hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      <div className="mt-4 flex gap-6">
        {empty && <span className="text-sm text-red-500 font-bold">Enter User</span>}
        {userNotFound && <span className="text-sm  text-red-500 font-bold">User Not Found</span>}
      </div>
      {user && <AreaInfo user={user}/>}
    </div>
  );
}

export default App;
