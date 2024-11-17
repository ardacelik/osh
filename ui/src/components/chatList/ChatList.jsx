import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/user-chats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatlist">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">New Chat</Link>
      <hr />
      <span className="title">CHAT HISTORY</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong :("
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
    </div>
  );
};

export default ChatList;
