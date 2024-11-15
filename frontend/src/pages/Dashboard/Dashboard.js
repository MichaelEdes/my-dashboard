import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import "./Dashboard.css";
import { NewNote } from "../Notes/NewNote";
import NotesList from "@pages/Notes/NotesList";
function App() {
    return (_jsx("div", { className: "font-sora", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(NotesList, {}) }), _jsx(Route, { path: "/new", element: _jsx(NewNote, {}) }), _jsxs(Route, { path: "/:id", children: [_jsx(Route, { index: true, element: _jsx("h1", { children: "Show" }) }), _jsx(Route, { path: "edit", element: _jsx("h1", { children: "Edit" }) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
}
export default App;
