"use client";
import React, { useState } from "react";
import {
  Package,
  User,
  ChevronRight,
  Calendar,
  DollarSign,
  Clock,
  Menu,
  X,
} from "lucide-react";
import SignOut from "@/components/buttons/SignOut";
import EditShippingInfo from "@/components/forms/ShippingUpdate";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useShippingContext } from "@/providers/ShippingContext";

const EcommerceDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { data: session } = useSession();
  const { order, shipping } = useShippingContext();

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
        <EditShippingInfo
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
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
                onClick={() => setEditDialogOpen(true)}
                className="px-4 py-2 bg-[#350203] text-white rounded-3xl hover:bg-[#ff8080] transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
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
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#350203]/10 shadow-md transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#350203] mb-6 capitalize">
                    {session?.user.name}
                  </h3>

                  {shipping && shipping.length > 0 ? (
                    <div className="bg-[#fffcf7] rounded-lg p-4 border border-[#350203]/10">
                      <h4 className="font-medium text-[#350203] mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#350203]" /> Shipping
                        Information
                      </h4>
                      {shipping.map((ship) => (
                        <div key={ship.id} className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <span className="text-xs text-[#350203]/70 block">
                                Full Name
                              </span>
                              <p className="font-medium text-[#350203]">
                                {ship.first_name} {ship.last_name}
                              </p>
                            </div>
                            <div>
                              <span className="text-xs text-[#350203]/70 block">
                                Phone
                              </span>
                              <p className="font-medium text-[#350203]">
                                {ship.phone_number}
                              </p>
                            </div>
                            <div className="md:col-span-2">
                              <span className="text-xs text-[#350203]/70 block">
                                Address
                              </span>
                              <p className="font-medium text-[#350203]">
                                {ship.apartment} {ship.street_address},{" "}
                                {ship.city}
                              </p>
                            </div>
                            <div>
                              <span className="text-xs text-[#350203]/70 block">
                                Email
                              </span>
                              <p className="font-medium text-[#350203]">
                                {ship.email}
                              </p>
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
              <h3 className="text-xl font-bold text-[#350203] mb-4 flex items-center gap-2">
                Activity Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Package,
                    bgColor: "bg-blue-100",
                    title: "Total Orders",
                    value: order.length,
                    iconColor: "text-[#350203]",
                  },
                  {
                    icon: DollarSign,
                    bgColor: "bg-green-100",
                    title: "Total Spent",
                    value: `KES ${order
                      .reduce((sum, o) => sum + Number(o.total_price || 0), 0)
                      .toLocaleString()}`,
                    iconColor: "text-green-600",
                  },
                  {
                    icon: Clock,
                    bgColor: "bg-purple-100",
                    title: "Last Purchase",
                    value:
                      order.length > 0
                        ? new Date(
                            Math.max(
                              ...order.map((o) =>
                                new Date(o.created_at).getTime()
                              )
                            )
                          ).toLocaleDateString()
                        : "-",
                    iconColor: "text-purple-600",
                  },
                ].map((card, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center transition-all hover:shadow-md"
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${card.bgColor} flex items-center justify-center mr-4`}
                    >
                      <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-[#350203]/70 text-sm">{card.title}</p>
                      <p className="text-2xl font-bold text-[#350203]">
                        {card.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-[#350203]">
                Order History
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#fffcf7] border-b border-[#350203]/10">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#350203]/70 uppercase tracking-wider">
                        Order Ref
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#350203]/70 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#350203]/70 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#350203]/70 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#350203]/10">
                    {order.length > 0 ? (
                      order.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-[#fffcf7] transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#350203]">
                            #{order.order_reference}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#350203]/70">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#350203]/50" />
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#350203]">
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
                          className="px-6 py-12 text-center text-[#350203]/70"
                        >
                          <div className="flex flex-col items-center">
                            <Package className="w-12 h-12 text-[#350203]/30 mb-3" />
                            <p className="text-lg font-medium text-[#350203]">
                              No orders yet
                            </p>
                            <p className="text-[#350203]/70 mt-1">
                              Your order history will appear here
                            </p>
                            <button className="mt-4 bg-[#350203] text-white px-4 py-2 rounded-lg hover:bg-[#ff8080] transition-colors">
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
                <div className="px-6 py-4 bg-[#fffcf7] border-t border-[#350203]/10 flex items-center justify-between">
                  <p className="text-sm text-[#350203]/70">
                    Showing {order.length} orders
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      // ... [rest of the renderContent remains similar, just update text colors to #350203]
      default:
        return <div>Select a section</div>;
    }
  };

  const navItems = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "orders", icon: Package, label: "Orders" },
  ];

  return (
    <div className="min-h-screen bg-[#fffcf7] flex">
      {/* Edit Dialog */}
      <EditDialog />

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-col w-64 bg-white border-r border-[#350203]/10 shadow-sm">
        <div className="flex-1 p-4">
          <div className="mb-6">
            <div className="px-3 py-2 text-xs font-semibold text-[#350203]/50 uppercase tracking-wider">
              Main Menu
            </div>
            <nav className="space-y-1 mt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-[#350203]/10 text-[#350203]"
                      : "text-[#350203]/70 hover:bg-[#350203]/5"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      activeSection === item.id
                        ? "text-[#350203]"
                        : "text-[#350203]/50"
                    }`}
                  />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-[#350203]/10">
          <div className="flex items-center p-2 rounded-lg bg-[#fffcf7] mb-3">
            <Image
              src={session?.user.image || "/placeholder/profile.png"}
              width={40}
              height={40}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-[#350203]/20"
            />
            <div className="ml-3 truncate">
              <p className="text-sm font-medium text-[#350203] truncate">
                {session?.user.name}
              </p>
              <p className="text-xs text-[#350203]/70 truncate">
                {session?.user.email}
              </p>
            </div>
          </div>
          <div className="px-4">
            <SignOut />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Similar updates with color scheme */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="h-full w-3/4 max-w-xs bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#350203]/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#350203]">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X className="h-6 w-6 text-[#350203]" />
              </button>
            </div>

            {/* Mobile menu content with color updates */}
            <div className="p-4">
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
                        ? "bg-[#350203]/10 text-[#350203]"
                        : "text-[#350203]/70 hover:bg-[#350203]/5"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        activeSection === item.id
                          ? "text-[#350203]"
                          : "text-[#350203]/50"
                      }`}
                    />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#350203]/10 z-10 shadow-lg">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-1 flex-col items-center py-3 ${
              activeSection === item.id ? "text-[#350203]" : "text-[#350203]/70"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-1 flex-col items-center py-3 text-[#350203]/70"
        >
          <Menu className="h-6 w-6" />
          <span className="text-xs mt-1 font-medium">More</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-[#350203]/10 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <div className="md:hidden mr-4">
              <button onClick={() => setMobileMenuOpen(true)} className="p-1">
                <Menu className="h-6 w-6 text-[#350203]" />
              </button>
            </div>

            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-[#350203]">
                {activeSection === "profile" && "My Profile"}
                {activeSection === "orders" && "Order History"}
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
                className="w-8 h-8 rounded-full object-cover border border-[#350203]/20"
              />
              <span className="ml-2 font-medium text-[#350203] hidden sm:inline-block capitalize">
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
