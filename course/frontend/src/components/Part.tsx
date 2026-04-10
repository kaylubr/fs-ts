import type { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {

  const assertNever = (value: never): never => {
    throw new Error (
      `Unhandled discriminatory union type: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
        </p>
      )
    case 'group':
      return (
        <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>project exercises {part.groupProjectCount}</div>
        </p>
      )
    case 'background':
      return (
        <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>submit to {part.backgroundMaterial}</div>
        </p>
      )
    case 'special':
      return (
        <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>Required skills: {part.requirements.join(', ')}</div>
        </p>
      )
    default:
      assertNever(part)
      break;
  } 
};

export default Part;