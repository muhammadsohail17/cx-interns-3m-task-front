import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { tagsSuggessions } from "../../utils/constants";

const TagsInput = () => {
  //define states
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreateTag = (event) => {
    if (event.key !== "Enter") return;
    const value = event.target.value;

    if (!value.trim()) return;
    // check if the selected value is a suggested tag
    const selectedTag = tagsSuggessions.find((tag) => tag.full_name === value);
    if (selectedTag) {
      // add the suggested tag to the tags list
      setTags([...tags, selectedTag.full_name]);
    } else {
      // add a new tag
      setTags([...tags, value]);
    }
    setInputValue("");
    setShowDropdown(false);
  };

  const deleteTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowDropdown(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setTags([...tags, suggestion]);
    setInputValue("");
    setShowDropdown(false);
  };

  const filteredSuggestions = tagsSuggessions.filter((suggestion) =>
    suggestion.full_name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <React.Fragment>
      <div className="flex items-center flex-wrap gap-0.5 border-2 border-inherit border-solid py-3 mt-1">
        <span className="mx-2">
          <FontAwesomeIcon icon={faTag} rotation={90} />
        </span>
        {tags.map((tag, index) => (
          <div
            className="bg-gray-300 inline-block p-2 rounded-full"
            key={index}
          >
            <span className="min-h-auto min-w-auto text-white inline-flex justify-center items-center text-base mx-1">
              {tag}
            </span>
            <span
              className="h-5 w-5 bg-gray-800 hover:text-gray-300 text-white rounded-full inline-flex justify-center items-center text-base cursor-pointer ml-1"
              onClick={() => deleteTag(index)}
            >
              &times;
            </span>
          </div>
        ))}
        <input
          type="text"
          placeholder="add tags"
          className="flex-grow py-0.5 px-0 border-none outline-none ml-1"
          value={inputValue}
          onKeyDown={handleCreateTag}
          onChange={handleInputChange}
        />
      </div>
      {showDropdown && (
        <div className="dropdown absolute z-10 w-full bg-white border border-gray-300">
          {filteredSuggestions.map((suggestion) => (
            <div
              className="dropdown-row cursor-pointer hover:bg-gray-100 p-2"
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.full_name)}
            >
              {suggestion.full_name}
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default TagsInput;
