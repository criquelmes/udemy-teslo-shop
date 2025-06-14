import Link from "next/link";
import Image from "next/image";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={"${titleFont.className} antialiased text-9xl"}>404</h2>
        <p className="font-light">Whoops! Lo que buscas no se encuentra.</p>
        <p className="font-semibold">
          <Link className="hover:underline transition-all " href="/">
            <span>Volver</span>
          </Link>
        </p>
      </div>
      <div className="px-5 mx-5">
        <Image
          className="p-5 sm:p-0"
          src="/imgs/starman_750x750.png"
          alt="starman"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};
