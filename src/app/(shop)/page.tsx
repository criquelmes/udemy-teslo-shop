import { titleFont } from "../../config/fonts";

export default function Home() {
  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>hola</h1>
      <h1 className={titleFont.className}>hola mundo</h1>
    </div>
  );
}
