import React, { useState } from "react";

const EditPopup = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note.name);
  const [description, setDescription] = useState(note.description);

  const handleSave = () => {
    const updatedNote = {
      id: note._id,
      name: title,
      description: description,
    };
    onSave(updatedNote);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
        <input
          type="text"
          placeholder="Note Title"
          className="w-full border rounded-lg py-2 px-3 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Description"
          className="w-full border rounded-lg py-2 px-3 mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
