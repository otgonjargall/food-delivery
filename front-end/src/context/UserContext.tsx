

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type UserType = {
  email: string;
  password?: string;
  _id: string;
};

type UserContextType = {
  user: UserType | undefined;
  email: string;
  signIn: (email: string, password: string) => Promise<void>;
  handleEmail: (email: string) => void;
  signUp: (email: string, password: string) => Promise<void>; 
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const signIn = async (emailInput: string, passwordInput: string) => {
    try {
      const response = await axios.post("http://localhost:3001/user/signin", {
        email: emailInput,
        password: passwordInput,
      });

      if (response.status === 200 || response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Амжилттай нэвтэрлээ");
        router.push("/");
      }
    } catch (error) {
      console.error("Нэвтрэхэд алдаа гарлаа:", error);
      toast.error("Нэвтрэхэд алдаа гарлаа");
    }
  };

  const signUp = async (emailInput: string, passwordInput: string) => {
    try {
      const response = await axios.post("http://localhost:3001/user/signup", {
        email: emailInput,
        password: passwordInput,
      });

      if (response.status === 200 || response.status === 201) {
        setUser(response.data.user);
        toast.success("Амжилттай бүртгэгдлээ, одоо нэвтэрнэ үү");
        router.push("/signin");
      }
    } catch (error) {
      console.error("Бүртгүүлэхэд алдаа гарлаа:", error);
      toast.error("Бүртгүүлэхэд алдаа гарлаа");
    }
  };

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("LocalStorage-аас уншихад алдаа гарлаа:", error);
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
    toast.success("Амжилттай гарлаа");
    router.push("/signin");
  };

  const handleEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, email, signIn, handleEmail, signUp, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};






