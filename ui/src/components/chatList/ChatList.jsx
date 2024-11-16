import { Link } from "react-router-dom";
import "./chatList.css";

const ChatList = () => {
  return (
    <div className="chatlist">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">New Chat</Link>
      <hr />
      <span className="title">CHAT HISTORY</span>
      <div className="list">
        <Link to="/">Past chat</Link>
        <Link to="/">Past chat</Link>
        <Link to="/">Past chat</Link>
        <Link to="/">Past chat</Link>
        <Link to="/">Past chat</Link>
      </div>
      <hr />
    </div>
  );
};

export default ChatList;
