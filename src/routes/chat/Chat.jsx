import "./chat.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";

const Chat = () => {
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">test message</div>
          <div className="message user">test lore</div>
          <div className="message">test message</div>
          <div className="message user">test message</div>
          <div className="message">test message</div>
          <div className="message user">test message</div>
          <div className="message">test message</div>
          <div className="message user">test message</div>
          <div className="message">test message</div>
          <div className="message user">test message</div>
          <div className="message">test message</div>
          <div className="message user">test message</div>
          <div className="message">test message</div>
          <div className="message user">test message</div>
          <div className="message">test message</div>
          <div className="message user">test message</div>
          <div className="message">test message</div>
          <div className="message user">test message</div>
          <div className="message">THIS NEW message</div>
          <div className="message user">NEW message</div>
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default Chat;
