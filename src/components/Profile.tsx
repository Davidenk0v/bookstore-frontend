import { jwtDecode } from "jwt-decode";
import { getMe } from "../services/userServies";
import { Title } from "./Title";
import { UserData } from "./UserData";
import { useEffect, useState } from "react";
import { User } from "../models/user";
import { BorrowLists } from "./BorrowList";

export const Profile = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    name: "",
  });
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    const id = jwtDecode(token).sub || "";
    getMe(token, id).then((response) => {
      console.log(response.data.data);
      setUser(response.data.data[0]);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <section>
      <Title title="Mi cuenta" description={user.username} />
      <div className="container mx-auto px-4 flex flex-row justify-between">
        <div className="w-1/3">
          <UserData user={user} />
        </div>
        <div className="w-screen">
          <BorrowLists />
        </div>
      </div>
    </section>
  );
};
