import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";

const SignInDialog = () => {
  const handlerLoginWithGoogle = async () => {
    await signIn("google");
  };

  return (
    <DialogContent className="w-[90%]">
      <DialogHeader>
        <DialogTitle>Faça seu login</DialogTitle>
        <DialogDescription>
          Realize seu cadastro na plataforma!
        </DialogDescription>
      </DialogHeader>
      <Button variant="outline" onClick={handlerLoginWithGoogle}>
        <Image alt="google" width={18} height={18} src="/google.svg"></Image>{" "}
        Google
      </Button>
    </DialogContent>
  );
};

export default SignInDialog;
