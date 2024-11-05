import React from 'react';
import { RefreshCw } from 'lucide-react';
import SelectableCard from './SelectableCard';
import singledoor from '../assets/img/Single-door.png';
import doubledoor from '../assets/img/door-double.png';
import slidingdoor from '../assets/img/door-with-slidtiles.png';
import slidedoor from '../assets/img/glass-door.png';

interface DoorTypeSelectorProps {
  onSelect: (type: string) => void;
  selected: string;
  onQuantityChange: (id: string, delta: number) => void;
  quantities: Record<string, number>;
}

export default function DoorTypeSelector({ onSelect, selected, setquantities, quantities }: DoorTypeSelectorProps) {





  const doorTypes = [
    { id: 'single', name: 'Single', image: singledoor },
    { id: 'double', name: 'Double', image: doubledoor },
    { id: 'sliding', name: 'Sliding Glass Door', image: slidingdoor },
    { id: 'sidelites', name: 'Door with Sidelites', image: slidedoor },
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
        {doorTypes.map((type) => (
          <SelectableCard
            key={type.id}
            id={type.id}
            name={type.name}
            image={type.image}
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