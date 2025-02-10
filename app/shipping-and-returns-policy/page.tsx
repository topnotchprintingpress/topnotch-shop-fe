import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Shipping & Returns Policy</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Returns Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Request a Return or Exchange:{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Click here to request a return or exchange.
            </a>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Returns MUST be initiated within 7 days (24 hours for books) after
              being in receipt of the order. Afterward the request will NOT be
              eligible.
            </li>
            <li>
              Returned items due to an error on the customer{"'"}s part, should
              be unused and must be returned in original packaging with any
              enclosed documentation. We will issue a credit note voucher.
              Alternatively, if preferred, we will exchange the item.
            </li>
            <li>
              Returned IT category items MUST be verified to be in sellable
              condition before a refund is initiated. Printers with toners or
              ink already inserted are NOT eligible for a refund, unless
              confirmed by warranty service center to be faulty.
            </li>
            <li>
              Laptops, computers and printers should be supplied with an
              official seal, unless informed prior to delivery by TBC staff. For
              prior testing/checking/set-up, you MUST initiate your request on
              email.
            </li>
            <li>
              The item is your responsibility until it reaches us. Therefore,
              for your own protection, we recommend that you send the parcel
              using a delivery service that insures you of the value of the
              goods or drop off at your nearest branch.
            </li>
            <li>
              The cost of returning the item to us is your responsibility.
            </li>
            <li>
              Issuance of credit notes is ONLY ONCE per order for all
              returns/exchanges.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Refunds Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            You{"'"}re eligible for a refund within 48 working hours, if you
            {"'"}re dissatisfied with your purchase either due to an error on
            our part or if the product doesn{"'"}t arrive.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                1. Incorrect Product / Not As Described / Damaged
              </AccordionTrigger>
              <AccordionContent>
                You are eligible for a full refund of the purchase price,
                including original shipping costs, only if your return is a
                result of an error on our part. To receive a refund, you must
                return your item directly to us within 7 days (24 hrs for books)
                of the estimated delivery date and in the same condition you
                received it in.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                2. Product Did Not Arrive
              </AccordionTrigger>
              <AccordionContent>
                You are eligible for a full refund of the purchase price,
                including shipping costs, if your product hasn{"'"}t arrived 30
                days past the estimated delivery date, without prior notice. If
                the shipper/courier provides tracking information indicating the
                book has arrived, the return is void.
                <br />
                <br />
                In cases where the product is returned to us for the following
                reasons, the refund price includes only the product price:
                incomplete address, unclaimed, returned to sender, or similar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline">
                3. Other Terms & Conditions
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    There are no refunds on items damaged during shipping. In
                    that case, you must file a claim with the courier.
                  </li>
                  <li>
                    Orders that are paid for with a credit card and returned
                    will be assessed a KShs100 as a processing fee.
                  </li>
                  <li>
                    We do not refund shipping costs MPesa or credit card fees.
                    They will be deducted from the total amount of your refund.
                  </li>
                  <li>
                    We currently do not support cash on delivery. Full payment
                    must be made in advance either via mobile money transfer,
                    card payment or bank payment.
                  </li>
                  <li>
                    In case of a refund, either partial or full, the transaction
                    fees incurred by TBC will be deducted from the refund
                    amount.
                  </li>
                  <li>
                    The client has an obligation to respond to any communication
                    either written or oral in order to facilitate delivery.
                    Failure to which, TBC will deliver the item to the nearest
                    or most convenient TBC branch.
                  </li>
                  <li>
                    For international orders (outside Kenya), the client must
                    contact Text Book Centre before making an order for a
                    shipping fee estimate.
                  </li>
                  <li>
                    EMS is a Posta subsidiary and may, in some cases, not offer
                    door-to-door deliveries. In such cases, the client will be
                    required to collect their order at the nearest Posta office.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping and Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                General Shipping Information
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Shipping charges for goods delivered within Nairobi or out
                    of Nairobi (Upcountry) will incur a shipping cost KShs300
                    (excludes premium services), except in areas considered as
                    hardship areas. International orders must choose a shipping
                    method at checkout.
                  </li>
                  <li>
                    Text Book Centre will not provide one shipping cost to
                    orders that are split between multiple shipping addresses.
                  </li>
                  <li>
                    We reserve the right to choose the most appropriate shipping
                    method according to the size and weight of your order, the
                    location of your shipping address, and other factors.
                  </li>
                  <li>
                    Goods to Nairobi will be shipped within 72 hours after
                    receipt and clearance of the order and up to 5 days to the
                    rest of Kenya.
                  </li>
                  <li>
                    Free shipping is available for orders above KSh. 3,000
                    within Kenya.
                  </li>
                  <li>
                    The shipping fee applies to orders weighing between 0-5 kg,
                    each additional kg or part thereof is charged an additional
                    KSh 50.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                Express Shipping
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Express delivery is only available within the Nairobi
                    Metropolitan area.
                  </li>
                  <li>
                    Express delivery orders are processed between 8:30 am and 4
                    pm on working days (8:30 am - 12 noon on Saturdays) for
                    same-day delivery.
                  </li>
                  <li>
                    Express delivery is charged at a flat rate of Kshs 500.
                  </li>
                  <li>
                    Ensure the delivery address is accurate and the contact
                    information given is reliable.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline">
                Delivery to Hardship Areas
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Areas considered hardship areas will attract an extra shipping
                  fee of not less than KSh 1,000. Delivery for items shipped to
                  hardship areas is within 7 days.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="hover:no-underline">
                Premium Delivery Services
              </AccordionTrigger>
              <AccordionContent>
                <h4 className="font-semibold mb-2">
                  Wells Fargo Kenya Limited (Local Shipping)
                </h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    This delivery option will charge Ksh. 406 regardless of the
                    cart amount and delivery location for weights not exceeding
                    5 kg.
                  </li>
                  <li>
                    Weights above 5 kg will be charged an extra Ksh. 30 per Kg.
                  </li>
                  <li>
                    Delivery is done every day of the week except Sundays and
                    Public Holidays.
                  </li>
                </ul>
                <h4 className="font-semibold mb-2">
                  DHL (International Shipping)
                </h4>
                <p>
                  DHL Express Worldwide is available for all international (Out
                  of Kenya) deliveries. It has a reliable tracking system and a
                  transit time of within 2-3 days to most parts of the world.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
