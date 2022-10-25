import { Select } from "@chakra-ui/react";

interface ISelectDropdownProps {
  defaultValue: string;
  options: { id: string; title: string }[];
}

export const SelectDropdown: React.FC<ISelectDropdownProps> = ({
  defaultValue,
  options,
}) => {
  return (
    <Select
      size="xs"
      variant="filled"
      maxW="150px"
      marginLeft="3"
      paddingBottom="2"
      bg="teal.200"
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </Select>
  );
};
