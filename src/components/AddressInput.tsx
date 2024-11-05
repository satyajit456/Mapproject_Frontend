import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import BASE_URL from '../Utils/Element.jsx'

interface AddressInputProps {
  onAddressSubmit: (address: string) => void;
}

export default function AddressInput({ onAddressSubmit }: AddressInputProps) {
  const [inputAddress, setInputAddress] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedsuggestions, setSelectedSuggestions] = useState('');


  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (query === selectedsuggestions) {
      setSuggestions([]);
      return;
    }


    try {
      const response = await axios.get(`${BASE_URL}/place-suggestions`, { params: { input: query } });
      console.log(response.data)
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAddress.trim()) {
      setError('Please enter an address');
      return;
    }
    setError('');
    onAddressSubmit(inputAddress.trim());
  };

  const handleSelectSuggestion = (suggestion: string) => {

    console.log("NNNNNNNNNNNNNNNN", suggestion);


    setInputAddress(suggestion);
    setSelectedSuggestions(suggestion);
    // setSuggestions([]);
    onAddressSubmit(suggestion);
  };

  useEffect(() => {

    const timerId = setTimeout(() => {
      console.log('User stopped writing. Final value:', inputAddress);
      fetchSuggestions(inputAddress);
    }, 2000);

    return () => clearTimeout(timerId);
  }, [inputAddress]);

  return (
    <form onSubmit={handleSubmit} className="mb-6 relative">
      <div className="flex flex-col">
        <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">

          <input
            type="text"
            value={inputAddress}
            onChange={(e) => {
              setInputAddress(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter your address"
            className="flex-grow px-4 py-2 focus:outline-none"
          // required
          />
          {/* <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 transition-colors font-medium"
          >
            Search
          </button> */}

        </div>
        {suggestions.length > 0 && inputAddress !== '' && (
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSelectSuggestion(suggestion.description)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {suggestion.description}
              </div>
            ))}
          </div>
        )}
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    </form>
  );
}