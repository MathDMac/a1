import { useState } from "react";
import { authStoreManager } from "../store/store.js";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail} from "lucide-react";
import Icon from "../components/Icon.jsx"
import WorldDraw from "../components/WorldDraw.jsx"

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginUser, isLoggingIn } = authStoreManager();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 mt-5.5">
     
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
        
          <div className="text-center mb-4 ">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors opacity-0 sm:opacity-100 duration-300"
              >
                <Icon className="w-6 h-6 sm:w-20 sm:h-12" backgroundColor="blue" borderRadius="20%"/>
              </div>
              <h1 className="text-2xl font-bold mt-2">Bem vindo</h1>
              <p className="text-base-content/60">Faça login na sua conta</p>
            </div>
          </div>

         
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Senha</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Não tem conta?{" "}
              <Link to="/signup" className="link link-primary">
                Crie sua conta
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center bg-[#6a88ee]">
        <WorldDraw/>
      </div>
    </div>
  );
};

