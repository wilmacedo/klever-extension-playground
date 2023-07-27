interface Provider {
  name: string;
  method: "none" | "kleverWeb";
}

export const providers: Provider[] = [
  {
    name: "Select one",
    method: "none",
  },
  {
    name: "Klever",
    method: "kleverWeb",
  },
];
