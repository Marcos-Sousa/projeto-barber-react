import BarbershopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    title?: string;
    service?: string;
  };
}
const BarbershopPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  return (
    <div>
      <Header></Header>

      <div className="m-4">
        <Search></Search>
      </div>

      <h2 className="mb-3 ml-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Resultados para &quot;{searchParams?.title || searchParams?.service}
        &quot;
      </h2>

      <div className="grid grid-cols-2 gap-4 ml-2 mr-2 mb- mt-3">
        {barbershops.map((barber, index) => (
          <BarbershopItem key={index} barbershop={barber}></BarbershopItem>
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
