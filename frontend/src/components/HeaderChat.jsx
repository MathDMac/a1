import { X } from "lucide-react";
import { authStoreManager } from "../store/store.js"; 
import { Link } from "react-router-dom";

const HeaderChat = () => {
  const {selectedUser,setSelectedUser, onlineUsers} = authStoreManager();

  if (!selectedUser) return null;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

         
          <div>
             <Link to= {`/profile/${selectedUser._id}`}><h3 className="font-medium">{selectedUser.fullName}</h3></Link>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

      
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default HeaderChat;