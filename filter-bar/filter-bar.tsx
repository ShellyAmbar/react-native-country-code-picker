import React from "react";
import createStyle from "./filter-bar.styles";
import {TextInput, TouchableOpacity, View} from "react-native";
import Delete from "../assets/images/closeIconWhite.svg";
import FilterBarProps from "./interfaces";
import useSearchBar from "./hooks/useSearchBar";
const FilterBar = ({
  onUpdateSearchTerm,
  onPressDelete,
  color,
}: FilterBarProps) => {
  const {searchTerm, setSearchTerm} = useSearchBar();
  const style = createStyle({color});
  return (
    <View style={style.container}>
      <View style={style.searchbar}>
        {searchTerm?.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onPressDelete();
              onUpdateSearchTerm("");
              setSearchTerm("");
            }}
            style={style.delete_icon}
          >
            <Delete width={14} height={14} />
          </TouchableOpacity>
        )}
        <TextInput
          style={style.input}
          value={searchTerm}
          onEndEditing={(v) => {
            setSearchTerm(v.nativeEvent.text);
            onUpdateSearchTerm(v.nativeEvent.text);
          }}
          onChangeText={(v) => {
            setSearchTerm(v);
            onUpdateSearchTerm(v);
          }}
        />
      </View>
    </View>
  );
};

export default FilterBar;
