import React from "react";
import createStyle from "./filter-bar.styles";
import {TextInput, TouchableOpacity, View, Image} from "react-native";
import FilterBarProps from "./interfaces";
import useSearchBar from "./hooks/useSearchBar";

const FilterBar = ({
  onUpdateSearchTerm,
  onPressDelete,
  color,
}: FilterBarProps) => {
  const {searchTerm, setSearchTerm} = useSearchBar(onUpdateSearchTerm);
  const style = createStyle({color});

  return (
    <View style={style.container}>
      <View style={style.searchbar}>
        {searchTerm?.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onPressDelete();

              setSearchTerm("");
            }}
            style={style.delete_icon}
          >
            <Image
              style={{width: 24, height: 24}}
              source={require("../../assets/images/closeIconWhite.png")}
            />
          </TouchableOpacity>
        )}
        <TextInput
          focusable
          cursorColor={"#FFF"}
          style={style.input}
          value={searchTerm}
          onChangeText={(v) => {
            setSearchTerm(v);
          }}
        />
      </View>
    </View>
  );
};

export default FilterBar;
