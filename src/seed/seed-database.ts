import { initialData } from "./seed";

async function main() {
  console.log("Seeding database...");
  console.log(initialData);
  // Add your database seeding logic here
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
