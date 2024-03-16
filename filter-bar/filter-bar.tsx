import React from 'react';
import style from './filter-bar.styles';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Delete from '../assets/images/closeIconWhite.svg';
import SearchBarProps from './interfaces';
import useSearchBar from './hooks/useSearchBar';
const FilterBar = ({ onUpdateSearchTerm, onPressDelete }: SearchBarProps) => {
  const { searchTerm, setSearchTerm } = useSearchBar();
  return (
    <View style={style.container}>
      <View style={style.searchbar}>
        {searchTerm?.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onPressDelete();
              onUpdateSearchTerm('');
              setSearchTerm('');
            }}
            style={style.delete_icon}
          >
            <Delete width={14} height={14} />
          </TouchableOpacity>
        )}
        <TextInput
          style={style.input}
          value={searchTerm}
          onEndEditing={v => {
            setSearchTerm(v.nativeEvent.text);
            onUpdateSearchTerm(v.nativeEvent.text);
          }}
          onChangeText={v => {
            setSearchTerm(v);
            onUpdateSearchTerm(v);
          }}
        />
      </View>
    </View>
  );
};

export default FilterBar;
