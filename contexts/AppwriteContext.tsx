import {
  createContext,
  PropsWithChildren,
  FC,
  useState,
  useEffect,
} from "react";
import AppwriteService from "../lib/appwrite";
import { Models } from "react-native-appwrite";
import { Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
type AppContextType = {
  appwrite: AppwriteService;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: User;
  setUser:(user:User)=>void,
  post: Models.Document[];
  userPost : Models.Document[];
  latestPost: Models.Document[];

  isLoading: boolean;
  handleRefresh: () => Promise<void>;
  query: string;
  setQuery: (query: string) => void;
  searchedPost: Models.Document[];
};

type FormType = {
  title: string;
  video: DocumentPicker.DocumentPickerAsset | null;
  thumnail: DocumentPicker.DocumentPickerAsset | null;
  prompt: string;

};

type User = {
  email: string;
  username: string;
  id:string;
  // Optional, if there are additional unknown properties
} | null;

export const AppwriteContext = createContext<AppContextType>({
  appwrite: new AppwriteService(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser:()=>{},
  userPost:[],
  post: [],

  latestPost: [],
  isLoading: true,
  handleRefresh: async () => {},
  setQuery: () => {},
  query: "",
  searchedPost: [],
});

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const appwrite = new AppwriteService();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Models.Document[]>([]);
  const [latestPost, setLatestPost] = useState<Models.Document[]>([]);
  const [searchedPost, setSearchedPost] = useState<Models.Document[]>([]);
  const [userPost, setUserPost] = useState<Models.Document[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRefresh = async () => {
    await fetchPost();
    await fetchLatestPost();
  };

  const defaultValue: AppContextType = {
    appwrite: appwrite,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    post,
    isLoading,
    handleRefresh,
    latestPost,
    setQuery,
    query,
    searchedPost,
    userPost
  };

  async function init() {
    try {
      const user = await appwrite.getCurrentSession();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
       
      }
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
    }
  }

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response = await appwrite.getAllVideo();
      setPost(response);
    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLatestPost = async () => {
    setIsLoading(true);
    try {
      const response = await appwrite.getLatestVideo();
      setLatestPost(response);
    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchPost = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await appwrite.getSearchVideo(query);
      setSearchedPost(response);

    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserPost = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await appwrite.getUserVideo(userId);
      setUserPost(response);

    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    init();
    fetchPost();
    fetchLatestPost();
  

    
  }, []);

  useEffect(() => {
    if (query) {
      fetchSearchPost(query);
    }
  }, [query]);

  useEffect(() => {
    if(user){
      fetchUserPost(user.id);
    }
  }, [user]);

  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};
