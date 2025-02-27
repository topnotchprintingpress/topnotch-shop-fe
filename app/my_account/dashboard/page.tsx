"use client";
import React, { useState } from "react";
import {
  Bell,
  CreditCard,
  Heart,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const EcommerceDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const { data: session } = useSession();
  // Sample user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    address: "123 Main Street, San Francisco, CA 94105",
    profilePicture: "/api/placeholder/150/150",
    orders: [
      {
        id: "ORD-3429",
        date: "Feb 24, 2025",
        status: "Delivered",
        amount: 129.99,
        tracking: "TRK29384756",
      },
      {
        id: "ORD-3402",
        date: "Feb 15, 2025",
        status: "In Transit",
        amount: 89.5,
        tracking: "TRK29384123",
      },
      {
        id: "ORD-3375",
        date: "Jan 30, 2025",
        status: "Processing",
        amount: 210.75,
        tracking: "TRK29383999",
      },
    ],
    wishlist: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 89.99,
        image: "/books/chem.png",
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "/api/placeholder/80/80",
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        price: 49.99,
        image: "/api/placeholder/80/80",
      },
    ],
    spendingData: [
      { month: "Sep", amount: 120 },
      { month: "Oct", amount: 220 },
      { month: "Nov", amount: 180 },
      { month: "Dec", amount: 310 },
      { month: "Jan", amount: 240 },
      { month: "Feb", amount: 350 },
    ],
    loyaltyPoints: 450,
  };

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500";
      case "In Transit":
        return "bg-blue-500";
      case "Processing":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <Image
                    src={
                      session?.user.image
                        ? session.user.image
                        : "/placeholder/profile.png"
                    }
                    width={150}
                    height={150}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {session?.user.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{session?.user.email}</p>
                  <p className="text-gray-600 mb-4">{userData.address}</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Activity Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{userData.orders.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-gray-600">Wishlist Items</p>
                  <p className="text-2xl font-bold">
                    {userData.wishlist.length}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-gray-600">Loyalty Points</p>
                  <p className="text-2xl font-bold">{userData.loyaltyPoints}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Order Management</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tracking
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userData.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`${getStatusColor(
                              order.status
                            )} text-white text-xs px-2 py-1 rounded-full`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.tracking}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-800">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "wishlist":
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">
              Wishlist & Favorites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData.wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4 flex items-center">
                    <Image
                      src={
                        session?.user.image
                          ? session.user.image
                          : "/placeholder/profile.png"
                      }
                      width={80}
                      height={80}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-blue-600 font-semibold">
                        ${item.price}
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Add to Cart
                        </button>
                        <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  Password Management
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                <div className="border border-gray-200 rounded-md p-4 mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 05/2027</p>
                    </div>
                  </div>
                  <div>
                    <button className="text-sm text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Add Payment Method
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications about your orders
                      </p>
                    </div>
                    <div className="relative inline-block w-12 h-6 bg-gray-200 rounded-full cursor-pointer">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 transform translate-x-6"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotions</p>
                      <p className="text-sm text-gray-500">
                        Receive promotions and discounts
                      </p>
                    </div>
                    <div className="relative inline-block w-12 h-6 bg-blue-600 rounded-full cursor-pointer">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 transform translate-x-6"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-gray-500">
                        Receive our weekly newsletter
                      </p>
                    </div>
                    <div className="relative inline-block w-12 h-6 bg-gray-200 rounded-full cursor-pointer">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">
              Analytics & Insights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium mb-4">Spending Trends</h3>
                <div className="h-64 flex items-end space-x-2">
                  {userData.spendingData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(item.amount / 350) * 200}px` }}
                      ></div>
                      <p className="text-xs mt-1">{item.month}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium mb-4">Loyalty Program</h3>
                <div className="mb-4">
                  <p className="text-gray-600 mb-1">Current Points</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {userData.loyaltyPoints}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Progress to next reward (500 points)
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(userData.loyaltyPoints / 500) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">50 points to go</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                    <p className="font-medium">$5 Store Credit</p>
                    <p className="text-blue-600 font-semibold">300 points</p>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                    <p className="font-medium">Free Shipping Coupon</p>
                    <p className="text-blue-600 font-semibold">500 points</p>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                    <p className="font-medium">$15 Store Credit</p>
                    <p className="text-blue-600 font-semibold">750 points</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                <h3 className="text-lg font-medium mb-4">
                  Purchase Categories
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg text-center">
                    <p className="text-lg font-semibold">45%</p>
                    <p className="text-gray-600">Electronics</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg text-center">
                    <p className="text-lg font-semibold">25%</p>
                    <p className="text-gray-600">Clothing</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg text-center">
                    <p className="text-lg font-semibold">20%</p>
                    <p className="text-gray-600">Home Goods</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg text-center">
                    <p className="text-lg font-semibold">10%</p>
                    <p className="text-gray-600">Other</p>
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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-[#2b0909] capitalize">
            {session?.user.name}
          </h1>
        </div>

        <div className="flex-1 p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection("profile")}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeSection === "profile"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </button>

            <button
              onClick={() => setActiveSection("orders")}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeSection === "orders"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Package className="mr-3 h-5 w-5" />
              Orders
            </button>

            <button
              onClick={() => setActiveSection("wishlist")}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeSection === "wishlist"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Heart className="mr-3 h-5 w-5" />
              Wishlist
            </button>

            <button
              onClick={() => setActiveSection("settings")}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeSection === "settings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </button>

            <button
              onClick={() => setActiveSection("analytics")}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                activeSection === "analytics"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ShoppingCart className="mr-3 h-5 w-5" />
              Analytics
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <button
          onClick={() => setActiveSection("profile")}
          className={`flex flex-1 flex-col items-center py-2 ${
            activeSection === "profile" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </button>

        <button
          onClick={() => setActiveSection("orders")}
          className={`flex flex-1 flex-col items-center py-2 ${
            activeSection === "orders" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Package className="h-5 w-5" />
          <span className="text-xs mt-1">Orders</span>
        </button>

        <button
          onClick={() => setActiveSection("wishlist")}
          className={`flex flex-1 flex-col items-center py-2 ${
            activeSection === "wishlist" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs mt-1">Wishlist</span>
        </button>

        <button
          onClick={() => setActiveSection("settings")}
          className={`flex flex-1 flex-col items-center py-2 ${
            activeSection === "settings" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs mt-1">Settings</span>
        </button>

        <button
          onClick={() => setActiveSection("analytics")}
          className={`flex flex-1 flex-col items-center py-2 ${
            activeSection === "analytics" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-xs mt-1">Analytics</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <div className="md:hidden">
            <h1 className="text-xl font-bold text-blue-600">ShopDash</h1>
          </div>

          <div className="flex items-center">
            <div className="relative mr-4">
              <Bell className="h-6 w-6 text-gray-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            <div className="flex items-center">
              <Image
                src={
                  session?.user.image
                    ? session.user.image
                    : "/placeholder/profile.png"
                }
                width={32}
                height={32}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="ml-2 font-medium hidden sm:inline-block capitalize">
                {session?.user.name}
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
