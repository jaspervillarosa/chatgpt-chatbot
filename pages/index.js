import LoadingSpinner from "@/components/LoadingSpinner";
import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import className from "classnames";

export default function Home() {

  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [chat, setChat] = useState([]);

  const generateResponse = async (data) => {
    try {
      setLoading(true);
      let chatRaw = chat;
      chatRaw = [
        ...chatRaw,
        data,
      ];
      setChat(chatRaw);
      const responseRaw = await fetch('/api/chatgpt', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const response = await responseRaw.json();
      setResponse(response.text);
      chatRaw = [
        ...chatRaw,
        response.text,
      ];
      setChat(chatRaw);
    }
    catch (ex) {  
      console.error(ex.stack);  
    } finally {
      setLoading(false);
      setText('');
    }
  }

  return (
    <div className="general-container">
      <div className={className(
        "general-chat",
        {"general-chat-container-blank" : chat.length === 0}
      )}>
      <div 
        className={className(
          "general-chat-container", 
          {"general-chat-container-blank" : chat.length === 0}
        )}
        style={ loading ? { marginBottom: '-10px'} : { marginBottom : '20px'}}
      >
      {chat.length === 0 && <div className="general-chat-text"> Ask me anything. </div>}
      {chat && chat.map((x, i) => (
        <React.Fragment key={i}>
         {i % 2 === 0 ? 
         <div className="general-chat-sender-container">
          <div className="general-chat-sender"> {x} </div>
        </div> :
        <div className="general-chat-receiver-container">
          <div className="general-chat-receiver"> {x} </div>
        </div>}
        </React.Fragment>
      ))}
      {loading && <div className="general-chat-loading-container">
        <img src='/giphy.gif' className="general-chat-loading" />
      </div>}
      </div>

      </div>

      <div className="general-input-container">
        <input 
          value={text} 
          type="text" 
          onChange={e => setText(e.target.value)} 
          placeholder="Enter text" 
          className="general-input"
          onKeyDown={e => e.key === 'Enter' ? generateResponse(text) : null}
        />
        <button 
          onClick={() => generateResponse(text)}
          disabled={!text || loading}
          className="general-button"
        > <AiOutlineSend /> </button>
      </div>
    </div>
  )
}
