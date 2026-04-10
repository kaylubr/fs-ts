import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courses: CoursePart[];
};

const Content = ({ courses }: ContentProps) => {
  return (
    <>
      {courses.map(course => (
        <Part part={course} />
      ))}
    </>
  )
};

export default Content;