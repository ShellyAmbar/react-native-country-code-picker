import React, { useState } from 'react';
import { Country } from './interfaces';
import Data from '../data';

const useCountryCodePicker = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [countriesData, setCountriesData] = useState(Data);
  const [filteredCountriesData, setFilteredCountriesData] = useState(Data);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: countriesData[0].name,
    alpha2Code: countriesData[0].alpha2Code,
    flag: countriesData[0].flag,
  });
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
