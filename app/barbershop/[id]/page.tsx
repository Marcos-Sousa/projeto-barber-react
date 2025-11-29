import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SidebarButton from "@/app/_components/sidebar-button";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BarberShopPage = async ({ params }) => {
  const barbeshop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbeshop) {
    return notFound();
  }

  console.log("barbeshop", barbeshop);
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbeshop?.name!}
          src={barbeshop?.imageUrl!}
          fill
          className="object-cover"
        ></Image>

        <Button
          asChild
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon></ChevronLeftIcon>
          </Link>
        </Button>

        <div className="absolute right-4 top-4">
          <SidebarButton></SidebarButton>
        </div>
      </div>

      <div className="p-5 border-b border-solid">
        <h1 className="font-bold text-xl">{barbeshop?.name}</h1>

        <div className="flex items-center mt-3 gap-3">
          <MapPinIcon className="text-primary" size={18}></MapPinIcon>
          <p className="text-sm">{barbeshop?.address}</p>
        </div>

        <div className="flex items-center mt-3 gap-3">
          <StarIcon className="text-primary fill-primary" size={18}></StarIcon>
          <p className="text-sm">5.0 (3042 avaliações)</p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h2 className="font-semibold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbeshop?.description}</p>
      </div>

      <div className="p-5">
        <h2 className="font-semibold uppercase text-gray-400 mb-4">Serviços</h2>
        <div className="space-y-3">
          {barbeshop.services.map((item) => (
            <ServiceItem key={item.id} service={item} nameBarberShop={barbeshop.name}></ServiceItem>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="space-y-3">
          {barbeshop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone}></PhoneItem>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BarberShopPage;
