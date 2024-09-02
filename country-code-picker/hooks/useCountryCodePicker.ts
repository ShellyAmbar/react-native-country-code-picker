import React, {useEffect, useState} from "react";
import {Country} from "./interfaces";
import Data from "../data";

const useCountryCodePicker = (defaultCountryName?: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const [countriesData, setCountriesData] = useState(Data);
  const [filteredCountriesData, setFilteredCountriesData] = useState(Data);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: countriesData[0].name,
    alpha2Code: countriesData[0].alpha2Code,
    flag: countriesData[0].flag,
  });
  useEffect(() => {
    if (defaultCountryName) {
      const defaultItemIndex = Data.findIndex(
        (item) => item.name.toLowerCase() === defaultCountryName.toLowerCase()
      );
      if (defaultItemIndex) {
        setSelectedCountry({
          name: Data[defaultItemIndex].name,
          alpha2Code: Data[defaultItemIndex].alpha2Code,
          flag: Data[defaultItemIndex].flag,
        });
      }
    }
  }, [defaultCountryName]);

  return {
    isOpen,
    setIsOpen,
    selectedCountry,
    setSelectedCountry,
    countriesData,
    filteredCountriesData,
    setFilteredCountriesData,
  };
};

export default useCountryCodePicker;
