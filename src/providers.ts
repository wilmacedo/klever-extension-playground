export type FunctionName = "buildTransaction";

interface FunctionCall {
  name: FunctionName;
  inputs: string[];
}

interface Provider {
  name: string;
  method: "none" | "kleverWeb";
  functions?: FunctionCall[];
}

export const providers: Provider[] = [
  {
    name: "Select one",
    method: "none",
  },
  {
    name: "Klever",
    method: "kleverWeb",
    functions: [
      {
        name: "buildTransaction",
        inputs: ["receiver", "amount"],
      },
    ],
  },
];
