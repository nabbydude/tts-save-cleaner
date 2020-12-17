#!/usr/bin/env node

import { promises } from "fs";
import { clean } from ".";
const { readFile, writeFile } = promises;

import yargs from "yargs";

interface Args {
  $0: string;
  inFile?: string;
  outFile?: string;
  roundingAccuracy?: number;
  sortContents?: string[];
}

yargs(process.argv.slice(2)).command(["clean [inFile] [outFile]", "*"], "Clean a save file", (yargs) => {
  yargs.positional("inFile", {
    type: "string",
    normalize: true,
    description: "The file to be cleaned",
  })
  yargs.positional("outFile", {
    type: "string",
    normalize: true,
    description: "Where to save the result",
  })
  yargs.option("roundingAccuracy", {
    type: "number",
    description: "Round all numbers to this many decimal places",
  })
  yargs.option("sortContents", {
    type: "array",
    string: true,
    description: "A list of GUIDs whose contents should be reordered to a consistent state (Use -1 to reorder loaded objects)",
  })
}, (args: Args) => {
  cleanCommand(args).catch(e => console.error(e));
})
.help()
.config()
.strict()
.parse()

export async function cleanCommand(args: Args) {
  if (!args.inFile) {
    console.error(`Please specify an input filepath\nMore info in ${args.$0} --help`);
    process.exitCode = 1;
    return;
  }
  if (!args.outFile) {
    args.outFile = args.inFile;
  }
  const text = await readFile(args.inFile, "utf8");

  const resultText = clean(text, {
    roundingAccuracy: args.roundingAccuracy,
    sortContents: args.sortContents,
  });

  await writeFile(args.outFile, resultText, "utf8");
}
