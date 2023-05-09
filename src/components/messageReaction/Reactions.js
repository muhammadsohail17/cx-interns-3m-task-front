import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import EmojiPicker from "./EmojiPicker";

const Reactions = () => {
  const [text, setText] = useState("");

  const handleAddMessage = () => {
    // Add code here to handle adding the message
    console.log("add message working");
  };

  const handleAddEmoji = (emoji) => {
    setText(text + emoji);
  };

  return (
    <div className="pt-3 w-[90%] sm:w-[70%] md:w-[40%]">
      <h1 className="text-2xl font-bold mb-4 capitalize">Message Reactions</h1>

      <div>
        <form className="flex items-start gap-2">
          <div className="flex items-end p-2 border border-slate-400 rounded">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              cols={30}
              rows={2}
              className="bg-transparent outline-none resize-none text-sm"
              placeholder="Enter your message here"
            ></textarea>

            <EmojiPicker onEmojiSelect={handleAddEmoji} />
          </div>

          <button
            onClick={handleAddMessage}
            className="flex items-center capitalize gap-2 bg-gray-800 hover:text-gray-300 text-gray-100 py-1.5 px-3 mt-2 rounded"
          >
            <AiOutlinePlus />
            add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reactions;
