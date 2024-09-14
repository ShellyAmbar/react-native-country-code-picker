import {useEffect, useState} from "react";
import {Country} from "./interfaces";
import Data from "../data";

const useCountryCodePicker = (defaultCountryName?: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const [filteredCountriesData, setFilteredCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>();
  useEffect(() => {
    if (defaultCountryName && defaultCountryName?.length > 0) {
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
    } else {
      setSelectedCountry(null);
    }
  }, []);

  return {
    isOpen,
    setIsOpen,
    selectedCountry,
    setSelectedCountry,
    Data,
    filteredCountriesData,
    setFilteredCountriesData,
  };
};

export default useCountryCodePicker;
