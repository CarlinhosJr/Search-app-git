import React from "react";
import { Buildings, Globe, MapPin, TwitterLogo } from "phosphor-react";

function AreaInfo({user}) {
  return (
    <div className="md:w-[730px] w-[350px] md:h-[400px] h-[480px]  flex flex-col items-center bg-white dark:bg-[#1f2a48] rounded-2xl mt-5">
      <div className=" md:w-[650px] w-[269px] mt-7 flex items-center justify-between">
        <div>
          <img
            src={user.avatar}
            alt="Imagem perfil do Github"
            className="md:w-28 w-56 rounded-full"
          />
        </div>
        <div className=" w-[480px] h-full relative ml-4">
          <div className="md:text-3xl text-xl font-bold text-[#2b3442] dark:text-white">
            {user.name}
          </div>
          <div className="md:mt-1 text-blue-600 md:text-base text-sm">
            <a href={`https://github.com/${user.login}`} target="_blank">
              @{user.login}
            </a>
          </div>
          <div className="md:absolute md:text-base text-sm right-0 top-1 text-[#697c9a] dark:text-white">
            {user.joinedAt}
          </div>
        </div>
      </div>

      <div className="md:w-[650px] flex flex-col md:items-end items-center">
        <div className="md:w-[480px] h-6 md:-mt-5 mb-7 mt-5 dark:text-white">
          {user.bio}
        </div>

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
  );
}

export default AreaInfo;
