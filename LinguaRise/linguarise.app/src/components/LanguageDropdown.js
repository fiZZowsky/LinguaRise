import React, { useState } from "react";
import "../assets/styles/Dropdown.css";

export default function LanguageDropdown({ languages, selectedLang, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
  };

  const selectedLangObj = languages.find(lang => lang.code === selectedLang);

  return (
    <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
      <div className="selected">
        {selectedLangObj ? selectedLangObj.name : "Select Language"}
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>
      {isOpen && (
        <div className="options">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className={`option ${lang.code === selectedLang ? "active" : ""}`}
              onClick={() => handleSelect(lang.code)}
            >
              {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
