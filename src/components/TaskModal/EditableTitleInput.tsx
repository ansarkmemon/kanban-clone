import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

interface IEditableTitleInputProps {
  defaultValue: string;
  onChange: (newVal: string) => void;
}

export const EditableTitleInput: React.FC<IEditableTitleInputProps> = ({
  defaultValue,
  onChange,
}) => {
  return (
    <Editable
      defaultValue={defaultValue}
      onChange={(newVal) => onChange(newVal)}
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
};
