"use client";

import Container from "@/core/Container/Container";
import Section from "@/core/Section/Section";
import Tools from "../components/Tools/Tools";
import SelectLang from "../components/SelectLang/SelectLang";
import { useEffect, useState } from "react";
import Content from "../components/Content/Content";
import { LangType } from "@/i18n/routing";
import { isValidLang } from "@/utils/helper";

export type Section = { id: string; type: string; content: string | string[] };

export type Data = {
  ua: Section[];
  en: Section[];
};

type PropsType = {
  params: {
    selectedLang: string;
  };
};

export default function SelectedLang({ params }: PropsType) {
  const { selectedLang } = params;
  const [validLang, setValidLang] = useState<LangType>(() =>
    isValidLang(selectedLang),
  );

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("exampleData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem("exampleData", JSON.stringify(data));
    }
    setValidLang(() => isValidLang(selectedLang));
  }, [data, selectedLang]);

  const updateContentById = (
    currentId: string,
    newContent: string | string[],
  ) => {
    if (!data) return;
    const updatedContent = data[validLang].map((obj) =>
      obj.id === currentId ? { ...obj, content: newContent } : obj,
    );

    setData(() => ({
      ...data,
      [validLang]: updatedContent,
    }));
  };

  const addContent = (type: string, content: { en: string; ua: string }) => {
    if (!data) return;

    const newContentEn = {
      id: `${Date.now()}`,
      type: type,
      content: content.en,
    };

    const newContentUa = {
      id: `${Date.now()}`,
      type: type,
      content: content.ua,
    };

    setData(() => ({
      en: [...data.en, newContentEn],
      ua: [...data.ua, newContentUa],
    }));
  };

  return (
    <Section>
      <Container>
        <SelectLang />
        <Content
          data={data && data[validLang]}
          updateContentById={updateContentById}
        />
        <Tools addContent={addContent} />
      </Container>
    </Section>
  );
}
