"use client";
import React from "react";
import { ChevronRight } from "lucide-react";

export default function Loader() {
  return (
    <div className="bg-[#fffcf7] min-h-screen p-4 md:p-8 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Skeleton Breadcrumb */}
        <div className="mb-6 text-sm flex items-center">
          <div className="h-4 w-10 bg-[#2b090979] rounded"></div>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
          <div className="h-4 w-12 bg-[#2b090979] rounded"></div>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
          <div className="h-4 w-24 bg-[#2b090979] rounded"></div>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery Skeleton */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden aspect-square bg-[#2b090979] shadow-xl border border-gray-300">
              {/* Main Image Placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            </div>

            {/* Thumbnail Navigation Skeleton */}
            <div className="flex space-x-2 mt-4 justify-center">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded-md bg-[#2b090979]"
                ></div>
              ))}
            </div>
          </div>

          {/* Product Information Skeleton */}
          <div className="flex flex-col">
            {/* Title */}
            <div className="h-8 bg-[#2b090979] rounded w-3/4 mb-2"></div>

            {/* Price */}
            <div className="h-6 bg-[#2b090979] rounded w-1/4 mb-6"></div>

            {/* Description */}
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-[#2b090979] rounded w-full"></div>
              <div className="h-4 bg-[#2b090979] rounded w-full"></div>
              <div className="h-4 bg-[#2b090979] rounded w-3/4"></div>
            </div>

            {/* Quantity Section */}
            <div className="mb-6">
              <div className="h-5 bg-[#2b090979] rounded w-20 mb-2"></div>
              <div className="h-10 bg-[#2b090979] rounded w-32"></div>
            </div>

            {/* Stock Status */}
            <div className="h-6 bg-[#2b090979] rounded w-32 mb-6"></div>

            {/* Shipping Info */}
            <div className="h-5 bg-[#2b090979] rounded w-3/4 mb-8"></div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <div className="h-14 bg-[#2b090979] rounded flex-1"></div>
              <div className="h-14 bg-[#2b090979] rounded flex-1"></div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="mt-12">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 w-full mb-4">
            <div className="flex space-x-6">
              <div className="h-6 bg-[#2b090979] rounded w-20 pb-2 border-b-2 border-gray-300"></div>
              <div className="h-6 bg-[#2b090979] rounded w-24 pb-2"></div>
              <div className="h-6 bg-[#2b090979] rounded w-32 pb-2"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="h-6 bg-[#2b090979] rounded w-48 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-[#2b090979] rounded w-full"></div>
                <div className="h-4 bg-[#2b090979] rounded w-full"></div>
                <div className="h-4 bg-[#2b090979] rounded w-2/3"></div>
              </div>
            </div>
            <div>
              <div className="h-6 bg-[#2b090979] rounded w-40 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-[#2b090979] rounded w-full"></div>
                <div className="h-4 bg-[#2b090979] rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
