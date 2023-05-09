import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { custom } from "./customEmojis";

// A component to render the emoji picker
const EmojiPicker = ({ onEmojiSelect }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  //handle select emoji
  const handleEmojiSelect = (emoji) => {
    const emojiCodePoints = emoji.unified.split("_");
    const codeArray = emojiCodePoints.map((element) => "0x" + element);
    const selectedEmoji = String.fromCodePoint(...codeArray);
    onEmojiSelect(selectedEmoji);
    setShowEmoji(false);
  };

  return (
    <div className="relative">
      <span
        onClick={() => setShowEmoji(!showEmoji)}
        className="cursor-pointer hover:text-slate-300"
      >
        <BsEmojiSmile />
      </span>

      {showEmoji && (
        <div className="absolute top-[100%] right-0 mt-2">
          <Picker
            data={data}
            emojiSize={20}
            emojiButtonSize={28}
            maxFrequentRows={0}
            onEmojiSelect={handleEmojiSelect}
            custom={custom}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
