import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";
import BookinkItem from "../_components/booking-item";

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return notFound();
  }
  const ConfirmedBookinks = await db.booking.findMany({
    where: {
      userId: (session.user as SessionUser).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: { barbershop: true },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const concludedBookinks = await db.booking.findMany({
    where: {
      userId: (session.user as SessionUser).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: { barbershop: true },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div>
      <Header></Header>

      <div className="p-5 space-y-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {ConfirmedBookinks.length > 0 && (
          <div>
            <h2 className="font-bold mt-6 mb-3 text-xm text-gray-400 ">
              Confirmados
            </h2>
            {ConfirmedBookinks.map((booking) => (
              <BookinkItem key={booking.id} booking={booking}></BookinkItem>
            ))}
          </div>
        )}

        {concludedBookinks.length > 0 && (
          <>
            <h2 className="font-bold mt-6 mb-3 text-xm text-gray-400 ">
              Finalizados
            </h2>
            {concludedBookinks.map((booking) => (
              <BookinkItem key={booking.id} booking={booking}></BookinkItem>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;
