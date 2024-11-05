import React, { useState } from 'react';
import axios from "axios";
import BASE_URL from '../Utils/Element.jsx'


interface PriceFormProps {
  onClose: () => void;
  quantities: { [key: string]: number };
}

export default function PriceForm({ onClose, quantities }: PriceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email'
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: ''
  });



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      quantities,
    };

    try {
      const response = await axios.post(`${BASE_URL}/pricequote`, dataToSend);
      if (response.data.success) {
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Set field-specific errors
        setErrors(error.response.data.errors);
      } else {
        console.error("Error:", error);
      }
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Your Price Quote</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Contact Method
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === 'email'}
              onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
              className="mr-2"
            />
            Email
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === 'phone'}
              onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
              className="mr-2"
            />
            Phone
          </label>
        </div>
        {errors.preferredContact && <p className="text-red-500 text-sm">{errors.preferredContact}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-medium"
      >
        Get My Quote
      </button>
    </form>
  );
}