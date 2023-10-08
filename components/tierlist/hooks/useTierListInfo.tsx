import { ChangeEvent, useState } from "react";

export const useTierListInfo = () => {
  const [title, setTitle] = useState("");
  const [titlePlaceholder, setTitlePlaceholder] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  return { title, handleChangeTitle, titlePlaceholder, setTitlePlaceholder, description, handleChangeDescription };
};
