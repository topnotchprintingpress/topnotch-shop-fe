import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Truck, HeadphonesIcon, LockIcon } from "lucide-react";
import type React from "react"; // Added import for React

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <Card className="flex bg-[#fffcf7] flex-col justify-center items-center text-center border border-[#2b0909]">
    <CardHeader>
      <div className="mb-4 flex justify-center items-center">{icon}</div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

export default function FeatureCards() {
  return (
    <section className="w-full bg-[#fffcf7] flex justify-center items-center">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Truck className="h-6 w-6 text-primary-foreground" />}
            title="Free Shipping"
            description="Enjoy free shipping on all orders over $50. We deliver to your doorstep with care and efficiency."
          />
          <FeatureCard
            icon={
              <HeadphonesIcon className="h-6 w-6 text-primary-foreground" />
            }
            title="Online Support"
            description="Our dedicated support team is available 24/7 to assist you with any questions or concerns."
          />
          <FeatureCard
            icon={<LockIcon className="h-6 w-6 text-primary-foreground" />}
            title="Secure Payment"
            description="Shop with confidence using our encrypted and secure payment gateway for all transactions."
          />
        </div>
      </div>
    </section>
  );
}
