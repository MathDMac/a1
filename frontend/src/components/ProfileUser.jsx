import { useState } from "react";
import { authStoreManager } from "../store/store.js";
import { Camera, User, Mail } from "lucide-react";

export const ProfileUser = ({ reqId }) => {
  const { userAuth, users } = authStoreManager();
  const [selectedImg] = useState(null);

  const userH = users.find((user) => user._id === reqId);

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Informações do Perfil</p>
          </div>

          
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || userH?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{userH?.fullName || "Nome não encontrado"}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Descrição
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{userH?.description || "Não possui descrição ainda"}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">

            <div className="space-y-3 text-sm">

              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};