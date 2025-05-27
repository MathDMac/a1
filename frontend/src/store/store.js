import { create } from "zustand";
import { axiosBaseUrl } from "../libs/axios.js";
import { io } from "socket.io-client";
import toast  from "react-hot-toast"

export const authStoreManager = create((set, get) => ({
  userAuth: null,

  isLogging: false,
  isSigning: false,
  isLoggingOut: false,
  isCheckingAuth: false,
  isSendingMessage: false,
  isConnectingSocket: false,
  isUsersLoading: false,
  isMessagesLoading: false,
  isProfileLoading: false,
  isContactsLoading: false,
  isPushingContact: false,


  selectedUser: null,
  onlineUsers: [],
  socket: null,

  talkings: [],
  users: [],
  messages: [],
  
  userPerfil: null,


  createUser: async (data) => {
    try {
      set({ isSigning: true });
      const res = await axiosBaseUrl.post("/auth/signup", data);
      set({ userAuth: res.data });
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao criar conta.");
    } finally {
      set({ isSigning: false });
    }
  },

  loginUser: async (data) => {
    try {
      set({ isLogging: true });
      const res = await axiosBaseUrl.post("/auth/login", data);
      set({ userAuth: res.data });
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao logar.");
    } finally {
      set({ isLogging: false });
    }
  },

  logoutUser: async () => {
    try {
      set({ isLoggingOut: true });
      await axiosBaseUrl.post("/auth/logout");
      set({ userAuth: null });
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao deslogar.");
    } finally {
      set({ isLoggingOut: false });
    }
  },

  checkUser: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosBaseUrl.get("/auth/checkUser");
      
      if (res.data && res.data._id) {
        set({ userAuth: res.data });
        get().connectSocket();
      } else {
        set({ userAuth: null }); 
      }
      
    } catch (error) {
      set({ userAuth: null }); 
      toast.error(error.response?.data?.message || "Erro ao verificar usuário.");
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  sendMessage: async (data) => {
    try {
      set({ isSendingMessage: true });
      const { messages, selectedUser } = get();
      const res = await axiosBaseUrl.post(`/messages/send/${selectedUser._id}`, data);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao enviar mensagem.");
    } finally {
      set({ isSendingMessage: false });
    }
  },

  getMessages: async () => {
    try {
      set({ isMessagesLoading: true });
      const { selectedUser } = get();
      const res = await axiosBaseUrl.get(`/messages/message/${selectedUser._id}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao carregar mensagens.");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  connectSocket: () => {
    try {
      set({ isConnectingSocket: true });
      const { userAuth, socket } = get();
      if (!userAuth || socket?.connected) return;

      const socketConn = io("http://localhost:5001", {
        query: { userId: userAuth._id },
      });

      socketConn.connect();
      set({ socket: socketConn });

      socketConn.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });
    } catch (error) {
      toast.error(error.message || "Erro ao conectar socket.");
    } finally {
      set({ isConnectingSocket: false });
    }
  },

  disconnectSocket: () => {
    try {
      const { socket } = get();
      if (socket?.connected) socket.disconnect();
    } catch (error) {
      toast.error(error.message || "Erro ao desconectar socket.");
    }
  },

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const { users } = get();
      const res = await axiosBaseUrl.get(`/users/users`);
      set({ users: [...users, ...res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao buscar usuários.");
    } finally {
      set({ isUsersLoading: false });
    }
  },


  realTimeSocketOpen: () => {
    try {
      const { socket, selectedUser, messages } = get();
      socket?.on("newMessage", (newMessage) => {
        const sentSelectedUser = newMessage.senderId === selectedUser?._id;
        if (!sentSelectedUser) return;
        set({ messages: [...messages, newMessage] });
      });
    } catch (error) {
      toast.error(error.message || "Erro ao escutar mensagens em tempo real.");
    }
  },
  realTimeSocketOff: () =>{
      const {socket} = get()
      socket.off("newMessage")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  pushContacts: async (data) => {
    try {
      set({ isPushingContact: true });
  
      await axiosBaseUrl.post(`/users/addcontacts/${data._id}`);
  
      
      set((state) => ({
        userAuth: {
          ...state.userAuth,
          contacts: [...state.userAuth.contacts, data._id]
        }
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao adicionar contato.");
    } finally {
      set({ isPushingContact: false });
    }
  },
  
  postChange: async(data) =>{
    try{
      const res = await axiosBaseUrl.put(`/users/updateprofilepic`, data);
      set({userAuth:res.data})
     }catch(error){
        toast.error(error.response?.data?.message || "Erro ao postar status.");
      }
  },
  getAllTalkings: async() =>{
      try{
      const res = await axiosBaseUrl.get(`/messages/allmessages`);
      set({talking: res.data})
      }catch(error){
        toast.error(error.response?.data?.message || "Erro ao postar status.");
      }
  }
}));
