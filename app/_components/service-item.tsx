"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import { format, isPast, isToday, set } from "date-fns";
import { BarbershopService , Booking} from "@prisma/client";
import { useSession } from "next-auth/react";
import { createBooking } from "../_actions/create_booking";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-booking";

interface ServiceItemProps {
  service: BarbershopService;
  nameBarberShop: string;
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, nameBarberShop }: ServiceItemProps) => {
  const { data } = useSession();
  const [selectDay, setSelectDay] = useState<Date | undefined>(undefined);
  const [selectTime, setSelectTime] = useState<string | undefined>(undefined);
  const [dayBooking, setDayBooking] = useState<Booking[]>([]); 
  
  useEffect(() =>{
    const fetch = async () =>{
      if(!selectDay) return;
     const bookings = await getBookings({date: selectDay!,  serviceId: service.id});
     setDayBooking(bookings);
    }
    fetch();

  }, [selectDay, service.id]);
  console.log("dayBooking", dayBooking);

  const handlerDateSelect = (date: Date | undefined) => {
    setSelectDay(date);
  };

  const handlerTimeSelect = (time: Date | undefined) => {
    setSelectTime(time);
  };

  const handlerCreateBooking = async () => {
    if (!selectDay || !selectTime) {
      return;
    }
    try {
      const hour = selectTime?.split(":")[0];
      const minute = selectTime?.split(":")[1];
      const newDate = set(selectDay, {
        minutes: Number(minute),
        hours: Number(hour),
      });
      console.log("newDate", newDate);
      await createBooking({
        serviceId: service.id,
        userId: data?.user?.id,
        date: newDate,
      });
      toast.success("Reserva criada com sucesso!");
    } catch (error) {
      console.log("error", error);
      toast.error("Erro ao criar reserva!");
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="object-cover rounded-lg"
            ></Image>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex flex-items justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(service.price)}
              </p>

              <Sheet>
                {data?.user && (
                  <SheetTrigger asChild>
                    <Button variant="secondary" size="sm">
                      Reservar
                    </Button>
                  </SheetTrigger>
                )}

                <SheetContent className="overflow-y-auto px-0">
                  <SheetHeader>Fazer Reserva</SheetHeader>

                  <div>
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectDay}
                      onSelect={handlerDateSelect}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    ></Calendar>
                  </div>

                  {selectDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                      {TIME_LIST.map((time) => (
                        <Button
                          key={time}
                          onClick={() => handlerTimeSelect(time)}
                          variant={selectTime == time ? "default" : "outline"}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectTime && selectDay && (
                    <Card className="m-5">
                      <CardContent className="p-3 space-y-3">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-semibold">
                            {service.name}
                          </h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(service.price)}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(selectDay, "d 'de' MMM", { locale: ptBR })}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <p className="text-sm">{selectTime}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">{nameBarberShop}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <SheetFooter className="px-5">
                    <SheetClose asChild>
                      <Button
                        disabled={!selectDay || !selectTime}
                        onClick={handlerCreateBooking}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceItem;
