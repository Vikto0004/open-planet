import React, { useState } from "react";

import EditFormEn from "./EditFormEn";
import EditFormUa from "./EditFormUa";

const EditForm = ({ data, handleSubmit, setValue, projectId }) => {
  const [lang, setLang] = useState("ua"); // За замовчуванням українська

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "ua" ? "en" : "ua"));
  };

  return (
    <div>
      <button onClick={toggleLanguage}>
        {lang === "ua" ? "Переключити на англійську" : "Switch to Ukrainian"}
      </button>

      {/* Рендеринг форми відповідно до поточної мови */}
      {lang === "ua" ? (
        <EditFormUa
          data={data}
          handleSubmit={handleSubmit}
          setValue={setValue}
          lang={lang}
          projectId={projectId}
        />
      ) : (
        <EditFormEn
          data={data}
          handleSubmit={handleSubmit}
          setValue={setValue}
          lang={lang}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default EditForm;
