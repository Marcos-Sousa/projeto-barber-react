import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import BookingInfo from "./booking-info";
import PhoneItem from "./phone-item";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true };
      };
    };
  }>;
}

const BookinkItem = ({ booking }: BookingItemProps) => {
  const ifConfirmed = isFuture(booking.date) ? "Confirmado" : "Finalizado";
  console.log(booking.date);
  return (
    <Sheet>
      <SheetTrigger className="min-w-full">
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="flex items-center justify-center">
                {ifConfirmed}
              </Badge>
              <h3 className="font-semibold">{booking?.service.name}</h3>
              <div className="flex flex-items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={booking.service.barbershop.imageUrl}
                  ></AvatarImage>
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader className="text-left">Informação da reserva</SheetHeader>

        <div className="relative h-[180px] w-full flex items-end mt-6">
          <Image
            src="/map.png"
            alt="map"
            className="object-cover rounded-xl"
            fill
          ></Image>

          <Card className="z-50 w-full m-4  rounded-x">
            <CardContent className="flex items-center px-5 py-3">
              <Avatar>
                <AvatarImage
                  src={booking.service.barbershop.imageUrl}
                ></AvatarImage>
              </Avatar>
              <div className="ml-2">
                <h3 className="font-bold">{booking.service.barbershop.name}</h3>
                <h6 className="text-xs">
                  {booking.service.barbershop.address}
                </h6>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge className="">{ifConfirmed}</Badge>
          <div className="w-full mt-4">
            <BookingInfo
              nameService={booking.service.name}
              price={booking.service.price}
              day={booking.date}
              time={format(booking.date, "HH:mm", { locale: ptBR })}
              nameBarberShop={booking.service.barbershop.name}
            ></BookingInfo>
          </div>

          <div className="mt-8 space-y-3">
            <div className="space-y-3">
              {booking.service.barbershop.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone}></PhoneItem>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookinkItem;
