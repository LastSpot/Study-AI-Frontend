import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

const PolicyDialog: React.FC<PolicyDialogProps> = ({ isOpen, onClose, type }) => {
  const title = type === 'terms' ? 'Terms of Service' : 'Privacy Policy';
  
  const termsContent = (
    <>
      <h3 className="text-lg font-semibold mt-4">1. Acceptance of Terms</h3>
      <p className="text-sm text-gray-600 mt-2">
        By accessing and using Study AI's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
      </p>

      <h3 className="text-lg font-semibold mt-4">2. Service Description</h3>
      <p className="text-sm text-gray-600 mt-2">
        Study AI provides AI-powered study assistance services. We process and analyze educational content to provide personalized learning experiences.
      </p>

      <h3 className="text-lg font-semibold mt-4">3. User Responsibilities</h3>
      <p className="text-sm text-gray-600 mt-2">
        You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
      </p>

      <h3 className="text-lg font-semibold mt-4">4. Content and Copyright</h3>
      <p className="text-sm text-gray-600 mt-2">
        While we process and store content for service functionality, we do not claim ownership of your uploaded materials. You retain all rights to your content.
      </p>

      <h3 className="text-lg font-semibold mt-4">5. Cookie Usage</h3>
      <p className="text-sm text-gray-600 mt-2">
        By using our service, you consent to our use of cookies and similar technologies for functionality, analytics, and personalization purposes.
      </p>

      <h3 className="text-lg font-semibold mt-4">6. Limitations of Liability</h3>
      <p className="text-sm text-gray-600 mt-2">
        Study AI provides its services "as is" and makes no warranties about the accuracy or reliability of the service.
      </p>
    </>
  );

  const privacyContent = (
    <>
      <h3 className="text-lg font-semibold mt-4">1. Information Collection</h3>
      <p className="text-sm text-gray-600 mt-2">
        We collect information you provide directly (such as account details) and automatically (such as usage data and cookies) to provide and improve our services.
      </p>

      <h3 className="text-lg font-semibold mt-4">2. Cookie Policy</h3>
      <p className="text-sm text-gray-600 mt-2">
        We use cookies and similar tracking technologies to enhance your experience. By using our service, you consent to our use of cookies for:
        <ul className="list-disc ml-6 mt-2">
          <li>Essential service functionality</li>
          <li>Analytics and performance monitoring</li>
          <li>Personalization of user experience</li>
          <li>Session management</li>
        </ul>
      </p>

      <h3 className="text-lg font-semibold mt-4">3. Data Storage and Processing</h3>
      <p className="text-sm text-gray-600 mt-2">
        While we store and process content to provide our services, we do not store direct copies of uploaded materials. We maintain:
        <ul className="list-disc ml-6 mt-2">
          <li>Account information</li>
          <li>Usage patterns and preferences</li>
          <li>Processed content data</li>
          <li>Service interaction history</li>
        </ul>
      </p>

      <h3 className="text-lg font-semibold mt-4">4. Data Security</h3>
      <p className="text-sm text-gray-600 mt-2">
        We implement appropriate security measures to protect your information from unauthorized access or disclosure.
      </p>

      <h3 className="text-lg font-semibold mt-4">5. Third-Party Services</h3>
      <p className="text-sm text-gray-600 mt-2">
        We may use third-party services for analytics, processing, and service improvement. These services are bound by confidentiality obligations.
      </p>

      <h3 className="text-lg font-semibold mt-4">6. Your Rights</h3>
      <p className="text-sm text-gray-600 mt-2">
        You have the right to access, correct, or delete your personal information. Contact us for any privacy-related concerns.
      </p>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {type === 'terms' ? termsContent : privacyContent}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyDialog; 