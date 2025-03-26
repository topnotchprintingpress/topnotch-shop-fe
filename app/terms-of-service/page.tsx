import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Welcome to Topnotch Printing Press! These Terms of Service {"("}
            &quot;Terms&quot;{")"} govern your use of our website and services.
            By accessing or using our platform, you agree to comply with and be
            bound by these Terms. If you do not agree with any part of these
            Terms, please refrain from using our services.
          </p>
          <p>
            We reserve the right to update or modify these Terms at any time
            without prior notice. Your continued use of the website after any
            changes constitutes your acceptance of the updated Terms.
          </p>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Eligibility</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                Age Requirement
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You must be at least 18 years old or have the permission of a
                  parent or guardian to use our website. By using our services,
                  you represent and warrant that you meet this age requirement.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                Account Responsibility
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account credentials and for all activities that occur
                  under your account. You agree to notify us immediately of any
                  unauthorized use of your account.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              All product descriptions, images, and pricing are subject to
              change without notice. We strive to provide accurate information,
              but we do not guarantee the accuracy, completeness, or reliability
              of any content on our website.
            </li>
            <li>
              Some products may have limited availability and may only be
              returned or exchanged in accordance with our{" "}
              <a
                href="/shipping-returns"
                className="text-[#350203] hover:underline"
              >
                Shipping & Returns Policy
              </a>
              .
            </li>
            <li>
              Prices displayed on the website are inclusive of taxes unless
              otherwise stated.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Placement</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                Payment Methods
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  We accept payments via mobile money transfer, credit/debit
                  cards, and bank transfers. Payments must be made in full
                  before your order is processed. Cash on delivery is not
                  supported.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                Order Confirmation
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Once you place an order, you will receive an order
                  confirmation email. This email does not guarantee product
                  availability. In case of stock issues, we will notify you
                  promptly.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Prohibited Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You agree not to use our website for any illegal or unauthorized
              purposes.
            </li>
            <li>
              You shall not attempt to interfere with the security or
              functionality of our website, including through hacking, data
              mining, or introducing viruses.
            </li>
            <li>
              You shall not post or transmit any content that is defamatory,
              obscene, or violates any third-party rights.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Limitation of Liability</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            To the fullest extent permitted by law, Topnotch Printing Press and
            its affiliates shall not be liable for any indirect, incidental,
            special, or consequential damages arising out of or in connection
            with your use of our website or services.
          </p>
          <p>
            We do not guarantee that our website will always be available or
            error-free. We reserve the right to suspend or terminate access to
            our website at any time without notice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
