import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const bgcolors = [
    "lightcoral",
    "lightgoldenrodyellow",
    "lightyellow",
    "lightblue",
    "lightpink",
    "lightgreen",
    "lightsalmon",
  ];

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const removeAllNotes = () => {
    setNotes([]);
    localStorage.removeItem("notes");
  };

  const handleNotes = () => {
    let colorIndex = Math.floor(Math.random() * bgcolors.length);
    const currentColor = bgcolors[colorIndex];
    let updatedNotes = [...notes, { color: currentColor, content: "" }];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleNoteChange = (ind, value) => {
    const updatedNotes = [...notes];
    updatedNotes[ind].content = value;
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const removeNotes = (ind) => {
    const updatedNotes = notes.filter((_, index) => index !== ind);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <>
      <div className="notes">
        <div className="text-3xl font-extrabold fixed flex justify-around top-4">
          <IoMdAdd onClick={handleNotes} />
          <MdDelete onClick={removeAllNotes} />
        </div>

        <div className="notes-list flex flex-wrap justify-start items-center mt-[4rem]">
          {notes.map((note, index) => (
            <div
              className="list w-[23vw] h-[26vh] rounded-lg p-4 mr-4 mb-4"
              key={index}
              style={{ backgroundColor: note.color }}
            >
              <textarea
                name="notes"
                value={note.content}
                onChange={(e) => handleNoteChange(index, e.target.value)}
                className="w-full h-[80%] resize-none outline-none"
                style={{ backgroundColor: note.color }}
              ></textarea>
              <div className="delete-note mt-2">
                <MdDelete onClick={() => removeNotes(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
