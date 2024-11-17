import "./chat.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";

const Chat = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`http://localhost:3000/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong :("
            : data?.history?.map((message, index) => (
                <div
                  className={
                    message.role === "user" ? "message user" : "message"
                  }
                  key={index}
                >
                  <Markdown>{message.content[0].text}</Markdown>
                </div>
              ))}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
