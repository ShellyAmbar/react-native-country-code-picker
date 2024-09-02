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
      const defaultItem = Data.find(
        (item) =>
          item.name.toString().toLowerCase() ===
          defaultCountryName.toString().toLowerCase()
      );
      if (defaultItem) {
        setSelectedCountry({
          name: defaultItem.name,
          alpha2Code: defaultItem.alpha2Code,
          flag: defaultItem.flag,
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
