import { useState } from "react";
import { authStoreManager } from "../store/store.js";
import { Camera, Mail, User } from "lucide-react";
import { useParams } from "react-router-dom";
import { ProfileUser } from "../components/ProfileUser.jsx";

export const Profile = () => {
  const { id: reqId } = useParams();
  const { userAuth, postChange } = authStoreManager();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  if (reqId !== userAuth._id) {
    return <ProfileUser reqId={reqId} />;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setIsUpdatingProfile(true);
      try {
        await postChange({ profilePic: base64Image });
      } finally {
        setIsUpdatingProfile(false);
      }
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Seu Perfil</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || userAuth.profilePic || "/avatar.png"}
                alt="Foto de perfil"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            {isUpdatingProfile && (
              <p className="text-sm text-zinc-500">Atualizando imagem...</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {userAuth?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Descrição
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {userAuth?.description || "Não possui descrição ainda"}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2">
                <span>Status da Conta</span>
                <span className="text-green-500">Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};