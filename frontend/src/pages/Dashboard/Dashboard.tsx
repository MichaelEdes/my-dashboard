import { Routes, Route, Navigate } from "react-router-dom";

import { NewNote } from "../Notes/NewNote";
import NotesList from "../../pages/Notes/NotesList";

function App() {
  return (
    <div className="font-sora">
      <Routes>
        <Route path="/" element={<NotesList />}></Route>
        <Route path="/new" element={<NewNote />}></Route>
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
