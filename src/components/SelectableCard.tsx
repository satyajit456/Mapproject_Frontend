import React from 'react';
import { Plus, Minus } from 'lucide-react';



interface SelectableCardProps {
  id: string;
  name: string;
  image: string;
  selected: boolean;
  quantity?: number;
  onSelect: (id: string) => void;
  onQuantityChange: (id: string, delta: number) => void;
}

export default function SelectableCard({
  id,
  name,
  image,
  selected,
  quantity = 1,
  onSelect,
  onQuantityChange,
}: SelectableCardProps) {

  console.log(quantity);


  return (
    <div
      className={`flex flex-col items-center ${selected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'
        } rounded-lg transition-all cursor-pointer p-4`}
      onClick={() => onSelect(id)}
    >

      <div className="bg-gray-200 rounded-lg w-full aspect-square mb-2">
        <img
          src={image}
          alt={name}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      <span className="text-sm text-gray-700 font-medium text-center px-2 mb-2">
        {name}
      </span>
      {selected && (
        <div className="flex items-center justify-center gap-2 mt-auto w-full bg-gray-50 rounded-lg p-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuantityChange(id, -1);
            }}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="text-sm font-semibold min-w-[20px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuantityChange(id, 1);
            }}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  );
}