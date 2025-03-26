import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            At Topnotch Printing Press, we are committed to protecting your
            privacy and ensuring the security of your personal information. This
            Privacy Policy outlines how we collect, use, and safeguard your data
            when you interact with our website or purchase our products.
          </p>
          <p>
            By using our website, you agree to the terms outlined in this
            Privacy Policy. If you do not agree with these terms, please refrain
            from using our services.
          </p>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                Personal Information
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    We collect personal information such as your name, email
                    address, phone number, and shipping/billing address when you
                    place an order or create an account.
                  </li>
                  <li>
                    This information is used to process your orders, communicate
                    with you, and provide customer support.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                Payment Information
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  We do not store your payment information (e.g., credit card
                  details) on our servers. All payments are processed through
                  secure third-party payment gateways that comply with industry
                  standards for data protection.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline">
                Usage Data
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  We may collect non-personal information about how you interact
                  with our website, such as your IP address, browser type, pages
                  visited, and time spent on the site. This data helps us
                  improve our services and tailor your shopping experience.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              To process and fulfill your orders, including shipping and
              delivery.
            </li>
            <li>
              To send you transactional emails, such as order confirmations and
              shipping updates.
            </li>
            <li>To respond to your inquiries and provide customer support.</li>
            <li>
              To personalize your shopping experience and recommend products
              that may interest you.
            </li>
            <li>
              To analyze website usage and improve our services, content, and
              offerings.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Data Security</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            We take reasonable measures to protect your personal information
            from unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for any activities that occur under your
            account.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Third-Party Disclosure</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                Sharing with Third Parties
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  We may share your information with trusted third parties who
                  assist us in operating our website, conducting our business,
                  or servicing you, so long as those parties agree to keep this
                  information confidential.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                Legal Requirements
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  We may disclose your information if required by law or in
                  response to valid legal requests, such as court orders or
                  government investigations.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
