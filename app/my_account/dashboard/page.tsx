"use client";
import React, { useState } from "react";
import {
  Package,
  Settings,
  User,
  ChevronRight,
  Calendar,
  DollarSign,
  Clock,
  Menu,
  X,
  Check,
} from "lucide-react";
import SignOut from "@/components/buttons/SignOut";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useShippingContext } from "@/providers/ShippingContext";

const EcommerceDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { data: session } = useSession();
  const { order, shipping, updateShipping } = useShippingContext();

  // Form state for editing shipping information
  const [editFormData, setEditFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    apartment: "",
    street_address: "",
    city: "",
    country: "",
    county: "",
    postal_code: "",
  });

  // Open the edit dialog with the current shipping info
  const handleEditClick = () => {
    if (shipping && shipping.length > 0) {
      setEditFormData({
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
      });
    }
    setEditDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateShipping({ ...editFormData, id: Number(editFormData.id) });

    setEditDialogOpen(false);
  };

  // Get color based on order status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500";
      case "In Transit":
        return "bg-blue-500";
      case "Delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Edit Dialog Component
  const EditDialog = () => {
    if (!editDialogOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setEditDialogOpen(false)}
          ></div>

          {/* Dialog panel */}
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Shipping Information
                </h3>
                <button
                  onClick={() => setEditDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      value={editFormData.first_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      value={editFormData.last_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      id="phone_number"
                      value={editFormData.phone_number}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                      required
                    />
                  </div>

                  {/* Apartment/House No. */}
                  <div>
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apartment/House No.
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      value={editFormData.apartment}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label
                      htmlFor="street_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street_address"
                      id="street_address"
                      value={editFormData.street_address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                      required
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={editFormData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                      required
                    />
                  </div>

                  {/* County */}
                  <div>
                    <label
                      htmlFor="county"
                      className="block text-sm font-medium text-gray-700"
                    >
                      County
                    </label>
                    <input
                      type="text"
                      name="county"
                      id="county"
                      value={editFormData.county}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                      required
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={editFormData.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                      required
                    />
                  </div>

                  {/* Postal Code (Optional) */}
                  <div>
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      value={editFormData.postal_code}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#350203] focus:border-[#350203]"
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  {/* Save Changes Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-3xl border border-transparent shadow-sm px-4 py-2 bg-[#350203] text-base font-medium text-white hover:bg-[#350203]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#350203] sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <Check className="w-4 h-4 mr-2" /> Save Changes
                  </button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={() => setEditDialogOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div></div>
              <button
                onClick={handleEditClick}
                className="px-4 py-2 bg-[#350203] text-white rounded-3xl hover:bg-[#350203]/50 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
              >
                Edit Info <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="relative group">
                  <Image
                    src={session?.user.image || "/placeholder/profile.png"}
                    width={150}
                    height={150}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-50 shadow-md transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#350203] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer">
                    <Settings className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
                    {session?.user.name}
                  </h3>

                  {shipping && shipping.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#350203]" /> Shipping
                        Information
                      </h4>
                      {shipping.map((ship) => (
                        <div key={ship.id} className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Full Name
                              </span>
                              <p className="font-medium">
                                {ship.first_name} {ship.last_name}
                              </p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Phone
                              </span>
                              <p className="font-medium">{ship.phone_number}</p>
                            </div>
                            <div className="md:col-span-2">
                              <span className="text-xs text-gray-500 block">
                                Address
                              </span>
                              <p className="font-medium">
                                {ship.apartment} {ship.street_address},{" "}
                                {ship.city}
                              </p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Email
                              </span>
                              <p className="font-medium">{ship.email}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                {" "}
                Activity Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center transition-all hover:shadow-md">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Package className="w-6 h-6 text-[#350203]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {order.length}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center transition-all hover:shadow-md">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-800">
                      KES{" "}
                      {order
                        .reduce((sum, o) => sum + Number(o.total_price || 0), 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center transition-all hover:shadow-md">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Last Purchase</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {order.length > 0
                        ? new Date(
                            Math.max(
                              ...order.map((o) =>
                                new Date(o.created_at).getTime()
                              )
                            )
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Order History
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Order Ref
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.length > 0 ? (
                      order.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{order.order_reference}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(order.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`${getStatusColor(
                                order.status
                              )} text-white text-xs px-3 py-1 rounded-full font-medium`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            KES{" "}
                            {parseFloat(
                              order.total_price.toString()
                            ).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-12 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center">
                            <Package className="w-12 h-12 text-gray-300 mb-3" />
                            <p className="text-lg font-medium text-gray-700">
                              No orders yet
                            </p>
                            <p className="text-gray-500 mt-1">
                              Your order history will appear here
                            </p>
                            <button className="mt-4 bg-[#350203] text-white px-4 py-2 rounded-lg">
                              Browse Products
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {order.length > 0 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {order.length} orders
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Account Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                    <User className="w-5 h-5 text-[#350203]" /> Password
                    Management
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="px-4 py-2 bg-[#350203] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a section</div>;
    }
  };

  const navItems = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "orders", icon: Package, label: "Orders" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Edit Dialog */}
      <EditDialog />

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="flex-1 p-4">
          <div className="mb-6">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main Menu
            </div>
            <nav className="space-y-1 mt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-50 text-[#350203]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      activeSection === item.id
                        ? "text-[#350203]"
                        : "text-gray-500"
                    }`}
                  />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center p-2 rounded-lg bg-gray-50 mb-3">
            <Image
              src={session?.user.image || "/placeholder/profile.png"}
              width={40}
              height={40}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div className="ml-3 truncate">
              <p className="text-sm font-medium text-gray-800 truncate">
                {session?.user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user.email}
              </p>
            </div>
          </div>
          <div className="px-4">
            <SignOut />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="h-full w-3/4 max-w-xs bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="mb-6">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Main Menu
                </div>
                <nav className="space-y-1 mt-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-50 text-[#350203]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          activeSection === item.id
                            ? "text-[#350203]"
                            : "text-gray-500"
                        }`}
                      />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 mt-auto">
              <div className="flex items-center p-2 rounded-lg bg-gray-50 mb-3">
                <Image
                  src={session?.user.image || "/placeholder/profile.png"}
                  width={40}
                  height={40}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div className="ml-3 truncate">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {session?.user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session?.user.email}
                  </p>
                </div>
              </div>
              <div className="px-4">
                <SignOut />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation - Bottom Bar */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 shadow-lg">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-1 flex-col items-center py-3 ${
              activeSection === item.id ? "text-[#350203]" : "text-gray-600"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-1 flex-col items-center py-3 text-gray-600"
        >
          <Menu className="h-6 w-6" />
          <span className="text-xs mt-1 font-medium">More</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <div className="md:hidden mr-4">
              <button onClick={() => setMobileMenuOpen(true)} className="p-1">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-gray-800">
                {activeSection === "profile" && "My Profile"}
                {activeSection === "orders" && "Order History"}
                {activeSection === "settings" && "Account Settings"}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <Image
                src={session?.user.image || "/placeholder/profile.png"}
                width={32}
                height={32}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <span className="ml-2 font-medium text-gray-800 hidden sm:inline-block capitalize">
                {session?.user.name?.split(" ")[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-6 pb-20 md:pb-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default EcommerceDashboard;
