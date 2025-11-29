import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface BookingItemProps {
  bookinkg: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true };
      };
    };
  }>;
}

const BookinkItem = ({ bookinkg }: BookingItemProps) => {
  return (
    <div>
      <h2 className="font-bold mt-6 mb-3 text-xm text-gray-400 ">
        Agendamento
      </h2>
      <Card>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="flex items-center justify-center">
              Confirmado
            </Badge>
            <h3 className="font-semibold">{bookinkg?.service.name}</h3>
            <div className="flex flex-items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={bookinkg.service.barbershop.imageUrl}></AvatarImage>
              </Avatar>
              <p className="text-sm">{bookinkg.service.barbershop.name}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
            <p className="text-sm">Fervereiro</p>
            <p className="text-2xl">03</p>
            <p className="text-sm">20:00h</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookinkItem;
