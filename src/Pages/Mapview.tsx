import React, { useState } from 'react';
import { Home, X } from 'lucide-react';
import WindowTypeSelector from '../components/WindowTypeSelector';
import DoorTypeSelector from '../components/DoorTypeSelector';
import AddressInput from '../components/AddressInput';
import PriceForm from '../components/PriceForm';
import Map from '../components/Map';

const Mapview = () => {


  const [selectedWindow, setSelectedWindow] = useState('');
  const [selectedDoor, setSelectedDoor] = useState('');
  const [address, setAddress] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [windowQuantities, setWindowQuantities] = useState<Record<string, number>>({});
  const [doorQuantities, setDoorQuantities] = useState<Record<string, number>>({});

  console.log("CCCCCCCCCCCC@@@@@", windowQuantities);
  console.log("CCCCCCCCCCCC@@@222", doorQuantities);




  const handleAddressSubmit = (submittedAddress: string) => {
    setAddress(submittedAddress);
    setShowOptions(true);
  };

  const isFormValid = address && (selectedWindow || selectedDoor);


  const handleWindowQuantityChange = (id: string, delta: number) => {
    setWindowQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) + delta),
    }));
  };

  const handleDoorQuantityChange = (id: string, delta: number) => {
    setDoorQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) + delta),
    }));
  };

  const getCombinedQuantities = () => {
    return {
      ...windowQuantities,
      ...doorQuantities,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <Home className="text-blue-500" />
          How Much Will My Impact Windows Cost?
        </h1>

        <div className="space-y-8">
          <AddressInput onAddressSubmit={handleAddressSubmit} />

          <Map address={address} />

          {showOptions && (
            <>
              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Impact Window Type</h2>
                <WindowTypeSelector
                  onSelect={setSelectedWindow}
                  selected={selectedWindow}
                  onQuantityChange={handleWindowQuantityChange}
                  quantities={windowQuantities}
                  setquantities={setWindowQuantities}
                />
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Impact Door Type</h2>
                <DoorTypeSelector
                  onSelect={setSelectedDoor}
                  selected={selectedDoor}
                  onQuantityChange={handleDoorQuantityChange}
                  quantities={doorQuantities}
                  setquantities={setDoorQuantities}
                />
              </section>
            </>
          )}

          <div className="flex gap-4 pt-6">
            <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium">
              CALL NOW
            </button>
            <button
              className={`flex-1 ${isFormValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'} text-white py-3 px-6 rounded-lg transition-colors font-medium`}
              onClick={() => {
                if (isFormValid) {
                  getCombinedQuantities();
                  setShowPriceForm(true);
                }
              }}

              disabled={!isFormValid}
            >
              SEE MY PRICE
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            *Prices are based on standard sizes and are for reference only. Final prices are subject to change based on finalized measurements, material selections, and applicable service fees.
          </p>
        </div>
      </div>

      {/* Price Form Modal */}
      {showPriceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowPriceForm(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <PriceForm onClose={() => setShowPriceForm(false)} quantities={getCombinedQuantities()} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Mapview