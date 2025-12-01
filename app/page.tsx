import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookinkItem from "./_components/booking-item";
import Search from "./_components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const Home = async () => {
  const session = await getServerSession(authOptions);
  const barbeshops = await db.barbershop.findMany({});
  const popularsBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  const ConfirmedBookinks = session?.user
    ? await db.booking.findMany({
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
      })
    : [];

  return (
    <div>
      <Header></Header>
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {session?.user?.name?.split(" ")[0]}</h2>
        {/* <p>Sexta feria, dia 2</p> */}
        <h2 className="capitalize">
        {(format(new Date(), "EEEE dd 'de' MMMM", { locale: ptBR }))}
        </h2>
        <div className="mt-6">
          <Search></Search>
        </div>

        <div className="flex gap-3 mt-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((serch, index) => (
            <Link key={index} href={`/barbershop?service=${serch.title}`}>
              <Button  className="gap-2" variant="secondary">
                <Image
                  alt={serch.title}
                  src={serch.imageUrl}
                  width={16}
                  height={16}
                ></Image>
                {serch.title}
              </Button>
            </Link>
          ))}
        </div>

        <div className="relative w-full h-[150px] mt-6 ">
          <Image
            src="/banner-01.png"
            fill
            className="object-cover rounded-xl"
            alt="imagem"
          />
        </div>

        <h2 className="font-bold mt-6 mb-3 text-xm text-gray-400 ">
          Agendamentos
        </h2>
        <div className="mt-5 flex overflow-auto  gap-4 [&::-webkit-scrollbar]:hidden">
          {ConfirmedBookinks.map((booking) => (
            <BookinkItem key={booking.id} booking={booking}></BookinkItem>
          ))}
        </div>

        <h2 className="font-bold mt-6 mb-3 text-xm text-gray-400 ">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbeshops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            ></BarbershopItem>
          ))}
        </div>

        <h2 className="font-bold mt-6 mb-3 text-xm text-gray-400 ">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularsBarbershops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            ></BarbershopItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
