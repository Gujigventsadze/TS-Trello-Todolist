import { useState } from "react";
import "./Todobox.css";
import { Draggable } from "@hello-pangea/dnd";

interface BoxProps {
  id: number;
  title: string;
  handleDelete: (id: number) => void;
  handleFinish: (id: number) => void;
  handleEdit: (id: number, newText: string) => void;
  completed: boolean;
  index: number;
}

const Todobox: React.FC<BoxProps> = ({
  id,
  index,
  title,
  handleDelete,
  handleFinish,
  handleEdit,
  completed,
}) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(title);

  const handleEditClick = () => {
    setIsEdited(!isEdited);
  };

  const handleSave = () => {
    handleEdit(id, editedText);
    setIsEdited(false);
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          className="box-container"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {isEdited ? (
            <div className="edited-input">
              <input
                className="edit-input"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                autoFocus={true}
              />
              <div className="edited-buttons">
                <button onClick={handleSave}>Save</button>
                <button
                  onClick={() => {
                    handleEditClick();
                    setEditedText(title);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className={completed ? "box-name-completed" : "box-name"}>
              {title}
            </div>
          )}
          {!isEdited && (
            <div className="box-buttons">
              <button onClick={handleEditClick} disabled={completed}>
                E
              </button>
              <button onClick={() => handleDelete(id)}>D</button>
              <button onClick={() => handleFinish(id)} disabled={completed}>
                F
              </button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Todobox;
