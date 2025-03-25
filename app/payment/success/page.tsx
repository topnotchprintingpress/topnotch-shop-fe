import React from "react";
import PaymentSuccessPage from "../../../components/custom/PaymentSuccessPage";
import { Suspense } from "react";
import Loading from "@/app/loading";

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccessPage />
    </Suspense>
  );
}

export default page;
