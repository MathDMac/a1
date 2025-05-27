import { authStoreManager } from "../store/store.js";

import Sidebar from "../components/Sidebar.jsx";
import Chat from "../components/Chat.jsx";
import NormalChat from "../components/NormalChat.jsx";

export const HomePage = () => {
  const { selectedUser } = authStoreManager();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NormalChat /> : <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
};