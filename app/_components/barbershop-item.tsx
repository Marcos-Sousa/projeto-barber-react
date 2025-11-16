import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface BarbershopItemProp {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProp) => {
  return (
    <Card className="min-w-[165px] rounded-2xl">
      <CardContent className="p-0 px-2 pt-1">
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbershop.name}
            fill
            className="object-cover rounded-2xl"
            src={barbershop.imageUrl}
          ></Image>

          <Badge className="absolute left-2 top-2 gap-2" variant="secondary">
            <StarIcon size={12} className="fill-primary text-primary"></StarIcon>
            <p className="text-sm font-semibold">5.0</p>
          </Badge>
        </div>
        <div className="px-1 py-3">
          <p className="font-semibold truncate">{barbershop.name}</p>
          <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
          <Button variant="secondary" className="w-full mt-3" asChild>
            <Link href={`/barbershop/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
