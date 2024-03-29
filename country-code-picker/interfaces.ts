import {TextStyle, ViewStyle} from "react-native";

type CountryCodePickerProps = {
  pickerStyle?: ViewStyle;
  modalStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPickedCode: (code: string) => void;
  filterBarColor?: string;
};

export {CountryCodePickerProps};
