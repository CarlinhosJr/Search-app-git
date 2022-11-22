import { Buildings, Globe, MagnifyingGlass, MapPin, Moon, SunDim, TwitterLogo } from "phosphor-react"
import { useEffect, useState } from "react"
import { ButtonChangeDarkOrLight } from "./components/ButtonChangeDarkOrLight"
import { joinedDate } from "./utils/FormatData"


function App() {

    const [searchUser, setSearchUser] = useState('octocat')

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
        }
    
        useEffect(()=> {
            fetchUser(searchUser)
          },[searchUser])
        


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[730px] mb-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#222731]">devfinder</div>
        <div>
            <div className="hidden">
                <ButtonChangeDarkOrLight
                    name="LIGHT"
                    icon={<SunDim size={28} />}
                />
            </div>

            <div>
                <ButtonChangeDarkOrLight
                    name="DARK"
                    icon={<Moon size={28}/>}
                />
            </div>
        </div>
      </div>

      <form className="w-[730px] h-[69px] flex items-center justify-between bg-white rounded-2xl" onSubmit={handleSubmit} >
          <div className="h-full flex items-center gap-4">
              <MagnifyingGlass 
                size={32} 
                className="ml-9"  
              />
              <input 
                className="h-full w-[500px] outline-none text-lg text-[#4b6a9b] bg-white placeholder:text-[#4b6a9b] placeholder:opacity-80 "
                type="text" 
                placeholder="Search Github username..." 
                onChange={event => setSearchUser(event.target.value)}
                
                
                
              />
          </div>
          <button type="submit" className="w-[106px] h-[50px] rounded-xl mr-4  text-white bg-[#0079ff] hover:bg-blue-600"  >
            Search
          </button>
      </form>

      <div className="w-[730px] h-[419px] flex flex-col items-center bg-white rounded-2xl mt-5">
        <div className=" w-[650px] mt-7 flex items-center justify-between">
            <div>
                <img 
                    src={user.avatar} 
                    alt="Imagem do perfil do Github"
                    className="w-28 h-28 rounded-full"
                />
            </div>
            <div className=" w-[480px] h-full relative">
                <div className="text-2xl font-bold text-[#2b3442]">{user.name}</div>
                <div className="mt-1">
                    <a href={`https://github.com/${user.login}`} target="_blank">@{user.login}</a>
                </div>
                <div className="absolute right-0 top-1 text-[#697c9a]">{user.joinedAt || "joined"}</div>
            </div>
        </div>

        <div className="w-[650px] flex flex-col items-end">
            <div className="w-[480px] h-6 -mt-5 mb-7">{user.bio}</div>

            <div className="w-[480px] h-[85px] flex items-center justify-around bg-[#f6f8ff] rounded-xl">
                <div>
                    <div>Repos</div>
                    <div>{user.repos}</div>
                </div>
                <div>
                    <div>Followers</div>
                    <div>{user.followers}</div>
                </div>
                <div>
                    <div>Following</div>
                    <div>{user.following}</div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 w-[480px] mt-7 text-sm">
                <div className="flex items-center gap-2">
                    <MapPin size={26} />
                    <p>{user.location || "not available"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <TwitterLogo size={26} />
                    <p>{user.twitter || "not available"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Globe size={26} />
                    <p>{user.blog || "not available"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Buildings size={26} />
                    <p>{user.company || "not available"}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App
