import React, { useState } from "react";
import classNames from "classnames";

const MessageReaction = () => {
  const [selectedEmoji, setSelectedEmoji] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [emojiCount, setEmojiCount] = useState({});

  const handleUniqueEmojis = () => {
    const uniqueEmojis = [...new Set(selectedEmoji)];

    const result = uniqueEmojis.map((emoji) => {
      return {
        emoji,
        count: selectedEmoji.filter((e) => e === emoji).length,
      };
    });
    return result;
  };
  const handleEmojiClick = (emoji) => {
    if (selectedEmoji === emoji) {
      setSelectedEmoji(null);
      setEmojiCount({
        ...emojiCount,
        [emoji]: (emojiCount[emoji] || 0) - 1,
      });
    } else {
      setSelectedEmoji([...selectedEmoji, emoji]);
      setEmojiCount({
        ...emojiCount,
        [emoji]: (emojiCount[emoji] || 0) + 1,
      });
    }
    setShowOptions(false);
  };

  const handleEmojiButtonToggle = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="message-reaction">
      {handleUniqueEmojis().map((emoji) => (
        <button
          className={classNames(
            "message-reaction__emoji",
            {
              "message-reaction__emoji--selected": selectedEmoji,
            },
            "hover:border rounded hover:border-inherit px-1 py-1"
          )}
          onClick={handleEmojiButtonToggle}
        >
          {emoji.emoji}
          {emoji.count}
        </button>
      ))}
      <button
        className={classNames(
          "message-reaction__emoji",
          {
            "message-reaction__emoji--selected": selectedEmoji,
          },
          "hover:border rounded hover:border-inherit px-2 py-1"
        )}
        onClick={handleEmojiButtonToggle}
      >
        {<span style={{ filter: "grayscale(90%)" }}>😀</span>}
      </button>
      {showOptions && (
        <div className="message-reaction-container w-36 h-20 px-2 py-2 rounded bg-white shadow-md">
          <div className="message-reaction flex flex-wrap gap-3">
            <button
              className={classNames(
                "message-reaction__option",
                {
                  "message-reaction__option--selected": selectedEmoji === "👍",
                },
                "hover:scale-125"
              )}
              onClick={() => handleEmojiClick("👍")}
            >
              👍
            </button>
            <button
              className={classNames(
                "message-reaction__option",
                {
                  "message-reaction__option--selected": selectedEmoji === "👎",
                },
                "hover:scale-125"
              )}
              onClick={() => handleEmojiClick("👎")}
            >
              👎
            </button>
            <button
              className={classNames(
                "message-reaction__option",
                {
                  "message-reaction__option--selected": selectedEmoji === "😀",
                },
                "hover:scale-125"
              )}
              onClick={() => handleEmojiClick("😀")}
            >
              😀
            </button>
            <button
              className={classNames(
                "message-reaction__option",
                {
                  "message-reaction__option--selected": selectedEmoji === "❤️",
                },
                "hover:scale-125"
              )}
              onClick={() => handleEmojiClick("❤️")}
            >
              ❤️
            </button>
            <button
              className={classNames(
                "message-reaction__option",
                {
                  "message-reaction__option--selected": selectedEmoji === "🚀",
                },
                "hover:scale-125"
              )}
              onClick={() => handleEmojiClick("🚀")}
            >
              🚀
            </button>
            <button
              className={classNames(
                "message-reaction__option",
                {
                  "message-reaction__option--selected": selectedEmoji === "👀",
                },
                "hover:scale-125"
              )}
              onClick={() => handleEmojiClick("👀")}
            >
              👀
            </button>
            <button
              className={classNames(
                "message-reaction__option",
                {
                  "message-reaction__option--selected": selectedEmoji === "💀",
                },
                "hover:scale-125"
              )}
              onClick={() => handleEmojiClick("💀")}
            >
              💀
            </button>
            <button
              className={classNames(
                "message-reaction__option",
                {
                  "message-reaction__option--selected": selectedEmoji === "👻",
                },
                "hover:scale-125"
              )}
              onClick={() => handleEmojiClick("👻")}
            >
              👻
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageReaction;
