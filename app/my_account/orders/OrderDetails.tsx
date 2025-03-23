"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Package, CreditCard, MapPin } from "lucide-react";
import Image from "next/image";
import { useShippingContext } from "@/providers/ShippingContext";

function OrderDetails() {
  const { order, fetchOrder } = useShippingContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrder(); // Fetch orders when the component mounts
      setLoading(false);
    };

    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading orders...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const handleDownloadInvoice = (orderId: number, orderReference: string) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoice/${orderId}/${orderReference}/`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${orderReference}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#fffcf7]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button and title */}
        <div className="mb-8">
          <motion.button
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center text-[#2b0909] mb-4 font-medium hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Orders
          </motion.button>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-semibold text-[#2b0909]"
          >
            My Orders
          </motion.h1>
        </div>

        {/* List all orders */}
        {order.length > 0 ? (
          order.map((orderItem) => (
            <motion.div
              key={orderItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-sm border border-[#2b0909] mb-8 overflow-hidden"
            >
              {/* Order Header with Status Banner */}
              <div className="bg-[#2b0909]/5 p-6 border-b border-[#2b0909]/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-medium text-[#2b0909] flex items-center">
                      <Package className="mr-2 h-5 w-5" />
                      Order Reference No:{" "}
                      <span className="font-bold ml-2">
                        {" "}
                        {orderItem.order_reference}
                      </span>
                    </h2>
                    <p className="text-sm text-[#2b0909]/70 mt-1">
                      {orderItem.created_at && (
                        <>
                          Placed on:{" "}
                          {new Date(orderItem.created_at).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                      {orderItem.status || "Processing"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                {/* Order Items Section */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-[#2b0909]/80 mb-4 pb-2 border-b border-[#2b0909]/5">
                    Items ({orderItem.items.length})
                  </h3>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="divide-y divide-[#2b0909]/10"
                  >
                    {orderItem?.items?.length > 0 ? (
                      orderItem.items.map((item) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          className="py-4 flex items-center"
                        >
                          <div className="h-20 w-20 overflow-hidden mr-4 bg-gray-100 flex-shrink-0 p-1 border border-[#2b0909] rounded-xl">
                            <Image
                              width={300}
                              height={300}
                              src={
                                item.product &&
                                item.product.images &&
                                item.product.images.length > 0
                                  ? item.product.images[0].image
                                  : "/books/english.png"
                              }
                              alt={item.product?.title || "Product Image"}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-[#2b0909]">
                              {item.product?.title}
                            </h3>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#2b0909]">
                              <span className="font-bold">KES</span>{" "}
                              {item.product.discount
                                ? (
                                    item.product.price *
                                    (1 - item.product.discount / 100)
                                  ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : item.product.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                            </p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p>No items found</p>
                    )}
                  </motion.div>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Shipping Information */}
                  <div className="bg-[#2b0909]/5 p-4 rounded-lg">
                    <h3 className="flex items-center text-md font-medium text-[#2b0909] mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      Shipping Address
                    </h3>
                    <div className="text-sm text-[#2b0909]/80">
                      {orderItem.shipping_address && (
                        <>
                          <div className="flex gap-1">
                            <p className="font-medium">
                              {orderItem.shipping_address.first_name ||
                                "Customer Name"}
                            </p>
                            <p className="font-medium">
                              {orderItem.shipping_address.last_name ||
                                "Customer Name"}
                            </p>
                          </div>

                          <p>{orderItem.shipping_address.street_address}</p>
                          <p>
                            {orderItem.shipping_address.city},
                            {orderItem.shipping_address.county &&
                              ` ${orderItem.shipping_address.county},`}
                            {orderItem.shipping_address.postal_code &&
                              ` ${orderItem.shipping_address.postal_code}`}
                          </p>
                          <p>{orderItem.shipping_address.country}</p>
                          {orderItem.shipping_address.phone_number && (
                            <p className="mt-2">
                              Phone: {orderItem.shipping_address.phone_number}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-[#2b0909]/5 p-4 rounded-lg">
                    <h3 className="flex items-center text-md font-medium text-[#2b0909] mb-3">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Details
                    </h3>
                    <div className="text-sm text-[#2b0909]/80">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>KES {orderItem.total_price || 0}</span>
                      </div>
                      {orderItem.shipping_cost && (
                        <div className="flex justify-between mb-2">
                          <span>Shipping:</span>
                          <span>${orderItem.shipping_cost.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-medium text-[#2b0909] mt-3 pt-3 border-t border-[#2b0909]/10">
                        <span>Total:</span>
                        <span>KES {orderItem.total_price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking Information */}
                {/* {orderItem.tracking_number && (
                  <div className="mt-4 p-4 border border-[#2b0909]/10 rounded-lg bg-white">
                    <h3 className="flex items-center text-md font-medium text-[#2b0909] mb-2">
                      <Truck className="h-4 w-4 mr-2" />
                      Tracking Information
                    </h3>
                    <p className="text-sm text-[#2b0909]/70">
                      Tracking Number:{" "}
                      <span className="font-medium">
                        {orderItem.tracking_number}
                      </span>
                    </p>
                    {orderItem.carrier && (
                      <p className="text-sm text-[#2b0909]/70">
                        Carrier:{" "}
                        <span className="font-medium">{orderItem.carrier}</span>
                      </p>
                    )}
                  </div>
                )} */}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-[#2b0909] text-white rounded hover:bg-[#2b0909]/90 transition-colors text-sm font-medium">
                    Track Package
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadInvoice(
                        orderItem.id,
                        orderItem.order_reference
                      )
                    }
                    className="px-4 py-2 border border-[#2b0909] text-[#2b0909] rounded hover:bg-[#2b0909]/5 transition-colors text-sm font-medium"
                  >
                    Download Invoice
                  </button>
                  <button className="px-4 py-2 text-[#2b0909]/80 hover:text-[#2b0909] hover:underline transition-colors text-sm">
                    Need Help?
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm border border-[#2b0909]/10 p-10 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2b0909]/5 mb-4">
              <Package className="h-8 w-8 text-[#2b0909]/60" />
            </div>
            <h2 className="text-xl font-medium text-[#2b0909] mb-2">
              No Orders Found
            </h2>
            <p className="text-[#2b0909]/70 mb-6">
              You haven{"'"}t placed any orders yet.
            </p>
            <button className="px-6 py-2 bg-[#2b0909] text-white rounded-lg hover:bg-[#2b0909]/90 transition-colors">
              Browse Products
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
