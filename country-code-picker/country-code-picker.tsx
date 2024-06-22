import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import React from "react";
import {CountryCodePickerProps} from "./interfaces";
import Style from "./country-code-picker.styles";
import DirectionDown from "../assets/images/direction-down-white.svg";
import DirectionUp from "../assets/images/direction-up-white.svg";
import Close from "../assets/images/closeIconWhite.svg";
import useCountryCodePicker from "./hooks/useCountryCodePicker";
import {SvgUri} from "react-native-svg";
import FilterBar from "../filter-bar/filter-bar";
import Spacer from "../spacer/spacer";
const CountryCodePicker = ({
  pickerStyle,
  modalStyle,
  textStyle,
  onPickedCode,
  filterBarColor,
}: CountryCodePickerProps) => {
  const {
    isOpen,
    setIsOpen,
    selectedCountry,
    setSelectedCountry,
    countriesData,
    filteredCountriesData,
    setFilteredCountriesData,
  } = useCountryCodePicker();

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={Style.item}
        onPress={() => {
          setSelectedCountry(item), setIsOpen(false);
          onPickedCode("+" + item.callingCodes[0].toString());
        }}
      >
        <SvgUri
          viewBox="0 0 1000 500"
          uri={item.flag}
          width={30}
          height={30}
          style={Style.itemImage}
        />
        <Text style={{...Style.text, ...textStyle}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
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
          <DirectionUp width={20} height={20} />
        ) : (
          <DirectionDown width={20} height={20} />
        )}

        <View style={Style.svg}>
          <SvgUri
            viewBox="0 0 1000 500"
            uri={selectedCountry.flag}
            width={30}
            height={30}
            style={{}}
          />
        </View>
        <Text style={{...Style.text, ...textStyle}}>
          {selectedCountry.alpha2Code}
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={{...Style.modalBack}}>
            <View style={{...Style.modal, ...modalStyle}}>
              <Close width={20} height={20} />
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
              <FlatList
                data={filteredCountriesData}
                renderItem={(item) => renderItem(item.item)}
                keyExtractor={(item) => item.flag}
                style={Style.list}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default CountryCodePicker;
