import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";
import { Key } from "lucide-react";
import BookinkItem from "../_components/booking-item";

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session.user) {
    return notFound();
  }
  const bookinks = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: {
        include: { barbershop: true },
      },
    },
  });
  return (
    <div>
      <Header></Header>

      <div className="p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {bookinks.map((booking) => (
          <BookinkItem key={booking.id} bookinkg={booking}></BookinkItem>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
