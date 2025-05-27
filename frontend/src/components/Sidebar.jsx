import { useEffect, useState } from "react";
import { authStoreManager } from "../store/store.js";
import {
  Users,
  MessageCircleMore,
  BookUser,
  UserRoundSearch,
} from "lucide-react";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    onlineUsers,
    userAuth,
    pushContacts,
    talking,
    getAllTalkings,
    sendMessage,
  } = authStoreManager();

  const [searching, setSearching] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

 
  const totalUsers = users.filter((user, index, self) => {
    return index === self.findIndex((obj) => obj._id === user._id);
  });

  
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    getAllTalkings();
  }, [getAllTalkings, talking, sendMessage]);

  useEffect(() => {
    if (!isUsersLoading) {
      allTalkings();
    }
  }, [users, isUsersLoading, userAuth.contacts]);

  const handleSearchInput = (e) => {
    const query = e.target.value.toLowerCase();

    setFilteredUsers(
      totalUsers.filter((user) =>
        user.fullName.toLowerCase().includes(query)
      )
    );
  };

  const showContacts = () => {
    if (!Array.isArray(userAuth.contacts)) return;

    setFilteredUsers(
      totalUsers.filter((user) =>
        userAuth.contacts.includes(user._id)
      )
    );
    setSearching(false);
  };

  const addConcts = (data) => {
    pushContacts(data);
  };

  const allTalkings = () => {
    if (!Array.isArray(talking)) return;

    setFilteredUsers(
      totalUsers.filter((user) =>
        talking.includes(user._id.toString())
      )
    );
    setSearching(false);
  };

  if (isUsersLoading) return null;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-6 pb-1 gap-4">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        
        <div className={`hidden w-full pt-4 ${searching ? "lg:block" : ""}`}>
          <input
            type="text"
            className="input w-full"
            onChange={handleSearchInput}
            placeholder="Buscar usuário..."
          />
        </div>

        
        <div className="w-full mt-3 ml-[-1rem] grid grid-cols-3 gap-3 sm:gap-0">
          <button className="flex gap-2 text-center" onClick={allTalkings}>
            <MessageCircleMore />
            <span className="text-[12px] hidden lg:block">Conversas</span>
          </button>
          <button
            className="flex gap-2"
            onClick={() => (
              setFilteredUsers(totalUsers), setSearching(!searching)
            )}
          >
            <UserRoundSearch />
            <span className="text-[12px] hidden lg:block">Buscar</span>
          </button>
          <button className="flex gap-2" onClick={showContacts}>
            <BookUser />
            <span className="text-[12px] hidden lg:block">Contatos</span>
          </button>
        </div>
      </div>

     
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName || "Usuário"}
                className="size-12 object-cover rounded-full"
              />
              {Array.isArray(userAuth.contacts) && !userAuth.contacts.includes(user._id) && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    addConcts(user);
                  }}
                  className="absolute top-0 left-0 size-5 bg-black text-white text-xs font-bold 
                 rounded-full ring-2 ring-zinc-900 flex items-center justify-center cursor-pointer"
                >
                  +
                </span>
              )}
              {Array.isArray(onlineUsers) && onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {Array.isArray(onlineUsers) && onlineUsers.includes(user._id)
                  ? "Online"
                  : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            Nenhum usuário encontrado
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;