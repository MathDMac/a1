import { Link } from "react-router-dom";
import { authStoreManager } from "../store/store.js";
import { LogOut, MessageSquare, User } from "lucide-react";
import Icon from "./Icon.jsx"


export const Navbar = () => {
  const { logoutUser, userAuth } = authStoreManager();
  return (
    <header
    className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
  backdrop-blur-lg bg-base-100/80"
  >
    <div className="container mx-auto px-4 h-16">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-8 h-8 sm:w-9 sm:h-9" backgroundColor="blue" borderRadius="20%"/>
            </div>
            <h1 className="text-lg font-bold">Menssager</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">

          {userAuth && (
            <>
              <Link to={`/profile/${userAuth._id}`} className={`btn btn-sm gap-2`}>
                <User className="size-5" />
                <span className="hidden sm:inline">Perfil</span>
              </Link>

              <button className="flex gap-2 items-center" onClick={logoutUser}>
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>
  )
}

