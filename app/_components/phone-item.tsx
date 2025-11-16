"use client"
import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Número copiado para a área de transferência!",);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-items gap-3">
          <SmartphoneIcon></SmartphoneIcon>
          <p>{phone}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopyPhoneClick(phone)}
        >
          Copiar
        </Button>
      </div>
    </div>
  );
};

export default PhoneItem;
