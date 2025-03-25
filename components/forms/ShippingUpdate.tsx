"use client";
import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { useShippingContext } from "@/providers/ShippingContext";

interface EditShippingInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditShippingInfo: React.FC<EditShippingInfoProps> = ({
  isOpen,
  onClose,
}) => {
  const { shipping, updateShipping } = useShippingContext();

  const [editFormData, setEditFormData] = useState(
    shipping && shipping.length > 0
      ? {
          id: shipping[0].id.toString(),
          first_name: shipping[0].first_name,
          last_name: shipping[0].last_name,
          email: shipping[0].email,
          phone_number: shipping[0].phone_number,
          apartment: shipping[0].apartment,
          street_address: shipping[0].street_address,
          city: shipping[0].city,
          country: shipping[0].country,
          county: shipping[0].county,
          postal_code: shipping[0].postal_code,
        }
      : {}
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateShipping({ ...editFormData, id: Number(editFormData.id) });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-[#fffcf7] rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-[#350203] text-white p-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Edit Shipping Information</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "first_name", label: "First Name", required: true },
              { name: "last_name", label: "Last Name", required: true },
              { name: "email", label: "Email", type: "email" },
              { name: "phone_number", label: "Phone Number", required: true },
              { name: "apartment", label: "Apartment/House No." },
              {
                name: "street_address",
                label: "Street Address",
                required: true,
              },
              { name: "city", label: "City", required: true },
              { name: "county", label: "County", required: true },
              { name: "country", label: "Country", required: true },
              { name: "postal_code", label: "Postal Code" },
            ].map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-[#350203] mb-2"
                >
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  id={field.name}
                  value={
                    editFormData[field.name as keyof typeof editFormData] || ""
                  }
                  onChange={handleInputChange}
                  required={field.required}
                  className="w-full px-4 py-3 border-2 border-[#350203]/20 rounded-full 
                             focus:border-[#ff8080] focus:ring-2 focus:ring-[#ff8080]/50 
                             transition-all duration-300 bg-white 
                             placeholder-[#350203]/50"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full border-2 border-[#350203] 
                         text-[#350203] hover:bg-[#350203]/10 
                         transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#350203] text-white 
                         hover:bg-[#ff8080] focus:outline-none 
                         focus:ring-4 focus:ring-[#ff8080]/50 
                         transition-all duration-300 flex items-center"
            >
              <Check className="w-5 h-5 mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShippingInfo;
