import { Editable, EditablePreview, EditableTextarea } from "@chakra-ui/react";

interface IEditableTextArea {
  value: string;
  onChange: (newVal: string) => void;
}

export const EditableTextArea: React.FC<IEditableTextArea> = ({
  value,
  onChange,
}) => {
  return (
    <Editable onChange={(newVal) => onChange(newVal)} defaultValue={value}>
      <EditablePreview />
      <EditableTextarea />
    </Editable>
  );
};
