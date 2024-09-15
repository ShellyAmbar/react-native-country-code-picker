import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  VirtualizedList,
} from "react-native";
import React, {memo, useCallback} from "react";
import {CountryCodePickerProps} from "./interfaces";
import Style from "./country-code-picker.styles";
import useCountryCodePicker from "./hooks/useCountryCodePicker";
import {SvgUri} from "react-native-svg";
import FilterBar from "./filter-bar/filter-bar";
import Spacer from "../spacer/spacer";
import Entypo from "react-native-vector-icons/Entypo";
const CountryCodePicker = ({
  pickerStyle,
  modalStyle,
  textStyle,
  onPickedCode,
  filterBarColor,
  defaultCountryName,
}: CountryCodePickerProps) => {
  const {
    isOpen,
    setIsOpen,
    selectedCountry,
    setSelectedCountry,
    Data: countriesData,
    filteredCountriesData,
    setFilteredCountriesData,
  } = useCountryCodePicker(defaultCountryName);

  const onPressItem = useCallback((item) => {
    setSelectedCountry(item), setIsOpen(false);
    onPickedCode("+" + item.callingCodes[0].toString(), item.name);
  }, []);

  const Item = memo(({item, onPress}) => {
    return (
      <TouchableOpacity
        style={Style.item}
        onPress={() => {
          onPress(item);
        }}
      >
        {/* <SvgUri
          viewBox="0 0 1000 500"
          uri={item.flag}
          width={30}
          height={30}
          style={Style.itemImage}
        /> */}
        <Text style={{...Style.text, ...textStyle}}>{item.name}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(true);
          setFilteredCountriesData(countriesData);
        }}
        style={{...Style.container, ...pickerStyle}}
      >
        {isOpen ? (
          <Entypo name="chevron-small-up" size={22} color={"#FFF"} />
        ) : (
          <Entypo name="chevron-small-down" size={22} color={"#FFF"} />
        )}
        <Spacer size={10} isVertical={false} />
        {selectedCountry ? (
          <>
            <SvgUri
              viewBox="0 0 1000 500"
              uri={selectedCountry.flag}
              width={30}
              height={30}
            />
            <Spacer size={10} isVertical={false} />

            <Text style={{...Style.text, ...textStyle}}>
              {selectedCountry.alpha2Code}
            </Text>
          </>
        ) : (
          <>
            <Spacer size={10} isVertical={false} />
            <Text style={{...Style.text, ...textStyle}}>{"Select"}</Text>
          </>
        )}
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <View style={{...Style.modalBack}}>
          <View style={{...Style.modal, ...modalStyle}}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => setIsOpen(false)}
            >
              <Image
                style={{width: 20, height: 20}}
                source={require("../assets/images/closeIconWhite.png")}
              />
            </TouchableOpacity>
            <Spacer size={16} />
            <FilterBar
              color={filterBarColor}
              onPressDelete={() => {
                setFilteredCountriesData(countriesData);
              }}
              onUpdateSearchTerm={(t) => {
                const filteredList = countriesData.filter((item) =>
                  item.name.toLowerCase().includes(t.toLowerCase())
                );
                setFilteredCountriesData(filteredList);
              }}
            />
            <Spacer size={8} />
            {filteredCountriesData?.length > 0 && (
              <VirtualizedList
                getItemCount={(data) => data.length}
                getItem={(data, index) => data[index]}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={16}
                windowSize={10}
                data={filteredCountriesData}
                removeClippedSubviews={true}
                renderItem={({item, index}) => (
                  <Item item={item} onPress={onPressItem} />
                )}
                keyExtractor={(item, index) => index.toString()}
                style={Style.list}
                getItemLayout={(data, index) => ({
                  length: 16,
                  offset: 16 * index,
                  index,
                })}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CountryCodePicker;
