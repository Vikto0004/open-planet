import styles from "./TextareaC.module.css";

interface TextareaCProps {
  tagName: string;
  content: string;
  setContent: (value: string) => void;
  setShowTA: (value: boolean) => void;
  saveContent: () => void;
}

const TextareaC: React.FC<TextareaCProps> = ({
  tagName,
  content,
  setContent,
  setShowTA,
  saveContent,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleCancel = () => {
    setContent("");
    setShowTA(false);
  };

  return (
    <div className={styles.textareaWrapper}>
      <label htmlFor="textarea" className={styles.label}>
        <p>{tagName}</p>
        <textarea
          id="textarea"
          value={content}
          onChange={handleChange}
          placeholder="Введіть текст..."
          className={styles.textarea}
          onClick={(e) => e.stopPropagation()}
        />
      </label>
      <button
        type="button"
        className={styles.save}
        onClick={saveContent}
        //disabled={content.trim() === ""}
      >
        Save
      </button>
      <button type="button" className={styles.cansel} onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default TextareaC;
