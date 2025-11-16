"use client";

import {
  CalendarHeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import Image from "next/image";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signIn } from "next-auth/react";

const SidebarButton = () => {
  const { data } = useSession();

  const handlerLoginWithGoogle = async () => {
    await signIn("google");
  };

  const handlerLogoutWithGoogle = async () => {
    await signOut("google");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon></MenuIcon>
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>

          <div className="">
            {data?.user ? (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    width={30}
                    height={30}
                    src={data?.user?.image ?? ""}
                  />
                </Avatar>

                <div className="text-left">
                  <p className="font-bold">{data.user.name}</p>
                  <p className="text-xs">{data.user.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold">Olá, faça seu login</p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <LogInIcon></LogInIcon>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>Faça seu login</DialogTitle>
                      <DialogDescription>
                        Realize seu cadastro na plataforma!
                      </DialogDescription>
                    </DialogHeader>
                    <Button variant="outline" onClick={handlerLoginWithGoogle}>
                      <Image
                        alt="google"
                        width={18}
                        height={18}
                        src="/google.svg"
                      ></Image>{" "}
                      Google
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </SheetHeader>

        <div className="py-5 flex flex-col border-b gap-4">
          <SheetClose asChild>
            <Link href="/">
              <Button className="gap-2 justify-start" variant="ghost">
                <HomeIcon size={18}></HomeIcon>
                Inicio
              </Button>
            </Link>
          </SheetClose>

          <Button className="gap-2 justify-start" variant="ghost">
            <CalendarHeartIcon></CalendarHeartIcon>
            Agendamento
          </Button>
        </div>

        <div className="flex flex-col gap-2 border-solid py-5 border-b">
          {quickSearchOptions.map((serch) => (
            <SheetClose key={serch.title} asChild>
              <Button
                asChild
                key={serch.title}
                className="gap-2 justify-start"
                variant="secondary"
              >
                <Link href={`/barbershop?service=${serch.title}`}>
                  <Image
                    alt={serch.title}
                    src={serch.imageUrl}
                    width={18}
                    height={18}
                  ></Image>
                  {serch.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        <div className="gap-2 float-start flex flex-col py-5">
          <Button
            className="justify-content"
            variant="ghost"
            onClick={handlerLogoutWithGoogle}
          >
            <LogOutIcon width={18} height={18}></LogOutIcon>
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarButton;
