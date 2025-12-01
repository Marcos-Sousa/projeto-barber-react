import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { Decimal } from "@prisma/client/runtime/library";

interface BookingInfoProps {
  nameService: string;
  price: Decimal;
  day: Date;
  time: string;
  nameBarberShop: string;
}

const BookingInfo = ({
  nameService,
  price,
  day,
  time,
  nameBarberShop,
}: BookingInfoProps) => {
  return (
    <Card>
      <CardContent className="p-3 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{nameService}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(price))}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="text-sm">
            {format(day, "d 'de' MMM", { locale: ptBR })}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm">{time}</p>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="text-sm">{nameBarberShop}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingInfo;
