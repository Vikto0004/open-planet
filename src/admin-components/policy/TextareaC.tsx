import styles from "./TextareaC.module.css";

interface TextareaCProps {
  tagName: string;
  content: string;
  setContent: (value: string) => void;
  setShowTA: (value: boolean) => void;
  saveContent: () => void;
  handleRemove?: (id: string) => void;
  selectedBlockId?: string;
}

const TextareaC: React.FC<TextareaCProps> = ({
  tagName,
  content,
  setContent,
  setShowTA,
  saveContent,
  handleRemove,
  selectedBlockId,
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

  const handleDelete = () => {
    setContent("");
    setShowTA(false);
    if (handleRemove && selectedBlockId) {
      handleRemove(selectedBlockId);
    }
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
      {handleRemove && (
        <button type="button" className={styles.delete} onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default TextareaC;
