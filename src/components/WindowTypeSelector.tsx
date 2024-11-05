import React from 'react';
import { RefreshCw, Plus, Minus } from 'lucide-react';
import SelectableCard from './SelectableCard';
import singleHung from '../assets/img/Single-Hung.png';
import doubleHung from '../assets/img/double.png';
import casement from '../assets/img/casement.png';
import horizontalRoller from '../assets/img/rollar.png';

interface WindowTypeSelectorProps {
  onSelect: (type: string) => void;
  selected: string;
  onQuantityChange: (id: string, delta: number) => void;
  quantities: Record<string, number>;
}

const windowTypeImages = {
  single: singleHung,
  double: doubleHung,
  casement: casement,
  horizontal: horizontalRoller,
};

export default function WindowTypeSelector({ onSelect, selected, setquantities, quantities }: WindowTypeSelectorProps) {


  const windowTypes = [
    { id: 'single', name: 'Single Hung' },
    { id: 'double', name: 'Double Hung' },
    { id: 'casement', name: 'Casement' },
    { id: 'horizontal', name: 'Horizontal Roller' },
  ];

  const handleSelect = (typeId: string) => {
    if (selected === typeId) {
      onSelect('');
      setquantities({});
    } else {
      onSelect(typeId);
      setquantities({ [typeId]: 1 });
    }
  };

  const handleQuantityChange = (typeId: string, delta: number) => {
    setquantities(prev => ({
      ...prev,
      [typeId]: Math.max(1, (prev[typeId] || 1) + delta)
    }));
  };

  const handleReset = () => {
    onSelect('');
    setquantities({});
  };

  return (
    <div className="relative">
      <button
        onClick={handleReset}
        className="absolute -top-12 right-0 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        title="Reset selection"
      >
        <RefreshCw size={20} />
      </button>
      <div className="grid grid-cols-4 gap-4">
        {windowTypes.map((type) => (
          <SelectableCard
            key={type.id}
            id={type.id}
            name={type.name}
            image={windowTypeImages[type.id]}
            selected={selected === type.id}
            quantity={quantities[type.id]}
            onSelect={handleSelect}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </div>
  );
}