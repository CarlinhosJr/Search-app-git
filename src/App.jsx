import { Buildings, Globe, MagnifyingGlass, MapPin, Moon, SunDim, TwitterLogo } from "phosphor-react"
import { useEffect, useState } from "react"
import { useTheme } from "./hooks/useTheme"
import { joinedDate } from "./utils/FormatData"


function App() {
    const {theme, setTheme} = useTheme()
    const [searchUser, setSearchUser] = useState('octocat')
    const [error, setError] = useState('')

    const [user, setUser] = useState({
        avatar: '',
        name: '',
        joinedAt: '',
        login: '',
        bio: '',
        repos: '',
        followers: '',
        following: '',
        location: '',
        twitter: '',
        company: '',
        blog: '',
    })


    function handleSubmit(e){
        // if (searchUser.current.value === ''){
        //     setError('Enter User')
        //     return false
        // }
        // setError('')
        e.preventDefault();
        fetchUser(searchUser)
    }

    async function fetchUser(username){
        const response = await fetch(`https://api.github.com/users/${username}`)
        const data = await response.json()

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
        })

        console.log(data)
    }
    
    useEffect(()=> {
        fetchUser(searchUser)
    },[])
        


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="md:w-[730px] w-[320px] mb-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#222731] dark:text-white">devfinder</div>
        <div>
            {theme === "light" ? (
                <button className="w-[78px] flex items-center gap-2 cursor-pointer text-[#697c9a] font-bold outline-none" onClick={() => setTheme("dark")}>
                    DARK 
                    <Moon size={28} weight="fill" /> 
                </button> 
                ) : (
                <button className="w-[78px] flex items-center gap-2 cursor-pointer text-white font-bold outline-none" onClick={() => setTheme("light")}>
                    LIGHT 
                    <SunDim size={28} weight="fill"/>
                   
                </button> 
                    
                )}
        </div>
      </div>

      <form className="md:w-[730px] md:h-[69px] w-[330px] h-14 flex items-center justify-between bg-white dark:bg-[#1f2a48] rounded-2xl" onSubmit={handleSubmit}   >
          <div className="h-full flex items-center gap-4" >
              <MagnifyingGlass 
                size={32} 
                className="md:ml-9 ml-4" 
                color="#2272c9" 
                
              />
              <input 
                className="h-full md:w-[500px] w-40 outline-none text-lg text-[#4b6a9b] bg-white dark:bg-[#1f2a48] placeholder:text-[#4b6a9b] placeholder:opacity-80 md:placeholder:text-base placeholder:text-xs "
                type="text"
                placeholder="Search Github username..." 
                onChange={event => setSearchUser(event.target.value)}
              />
              <span className="text-red-600">{error}</span>
          </div>
          <button type="submit" className="md:w-[100px] md:h-[50px] w-16 h-10 rounded-xl mr-4  text-white md:text-lg text-sm bg-[#0079ff] hover:bg-blue-600"  >
            Search
          </button>
      </form>

      <div className="md:w-[730px] w-[330px] h-[419px]  flex flex-col items-center bg-white dark:bg-[#1f2a48] rounded-2xl mt-5">
        <div className=" md:w-[650px] w-[269px] mt-7 flex items-center justify-between">
            <div>
                <img 
                    src={user.avatar} 
                    alt="Imagem do perfil do Github"
                    className="md:w-28 w-56 rounded-full"
                />
            </div>
            <div className=" w-[480px] h-full relative ml-4">
                <div className="md:text-3xl text-xl font-bold text-[#2b3442] dark:text-white">{user.name}</div>
                <div className="md:mt-1 text-blue-600 md:text-base text-sm">
                    <a href={`https://github.com/${user.login}`} target="_blank">@{user.login}</a>
                </div>
                <div className="md:absolute md:text-base text-sm right-0 top-1 text-[#697c9a] dark:text-white">{user.joinedAt}</div>
            </div>
        </div>

        <div className="md:w-[650px] flex flex-col md:items-end items-center">
            <div className="w-[480px] h-6 -mt-5 mb-7 dark:text-white">{user.bio}</div>

            <div className="md:w-[480px] w-[300px] h-[85px] flex items-center justify-around bg-[#f6f8ff] dark:bg-[#141c2f] dark:text-white rounded-xl">
                <div>
                    <div>Repos</div>
                    <div className="md:text-xl text-lg font-bold">{user.repos}</div>
                </div>
                <div>
                    <div>Followers</div>
                    <div className="md:text-xl text-lg font-bold">{user.followers}</div>
                </div>
                <div>
                    <div>Following</div>
                    <div className="md:text-xl text-lg font-bold">{user.following}</div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-y-4 md:w-[480px] w-[300px] mt-7 text-base dark:text-white">
                <div className="flex items-center gap-4">
                    <MapPin size={24} weight="fill" />
                    <p>{user.location || "not available"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <TwitterLogo size={24} weight="fill" />
                    <p>{user.twitter || "not available"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Globe size={24} />
                    <p>{user.blog || "not available"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Buildings size={24} />
                    <p>{user.company || "not available"}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App
