import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShippingContext } from "@/providers/ShippingContext";
import { shippingSchema } from "@/lib/schemas"; // Import the schema
import { z } from "zod"; // Import zod
import { useSession } from "next-auth/react";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function Shipping({ onNextStep }: { onNextStep: () => void }) {
  const { addShipping, shipping } = useShippingContext();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street_address: "",
    apartment: "",
    city: "",
    county: "",
    country: "",
    postal_code: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({}); // Store validation errors

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when user starts typing
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate the form data using the schema
      const validatedData = shippingSchema.parse(formData);

      // If validation passes, call addShipping
      await addShipping(validatedData);
      onNextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Extract and display validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error submitting shipping info:", error);
      }
    }
  };

  return (
    <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
      <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
      {shipping && shipping.length > 0 ? (
        <div>
          {shipping.map((ship) => (
            <div key={ship.id}>
              <div className="space-y-2 mt-2">
                <p>
                  <span className="font-medium">Name:</span> {ship.first_name}{" "}
                  {ship.last_name}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {ship.apartment}
                  , {ship.street_address}, {ship.city}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {session?.user.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {ship.phone_number}
                </p>
              </div>
              <Button
                className="w-full mt-6 text-white"
                style={{ backgroundColor: "#2b0909" }}
                onClick={onNextStep}
              >
                Continue to Payment
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm">{errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm">{errors.last_name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="md:col-span-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">{errors.phone_number}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Street Address */}
            <div className="md:col-span-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.street_address && (
                <p className="text-red-500 text-sm">{errors.street_address}</p>
              )}
            </div>

            {/* Apartment */}
            <div className="md:col-span-2">
              <Label htmlFor="apartment">Apartment (Optional)</Label>
              <Input
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.apartment && (
                <p className="text-red-500 text-sm">{errors.apartment}</p>
              )}
            </div>

            {/* City */}
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            {/* County */}
            <div>
              <Label htmlFor="county">County/State</Label>
              <Input
                id="county"
                name="county"
                value={formData.county}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.county && (
                <p className="text-red-500 text-sm">{errors.county}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.postal_code && (
                <p className="text-red-500 text-sm">{errors.postal_code}</p>
              )}
            </div>

            <Button
              className="w-full mt-6 text-white"
              style={{ backgroundColor: "#2b0909" }}
              onClick={handleSubmit}
            >
              Continue to Payment
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}
