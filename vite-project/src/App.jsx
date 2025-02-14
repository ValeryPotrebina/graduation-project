import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import {CoursesContextProvider} from "./context/courses-context";

export default function App() {
  return (
    <>
      <CoursesContextProvider>
        <AppLayout />
      </CoursesContextProvider>
    </>
  );
}
