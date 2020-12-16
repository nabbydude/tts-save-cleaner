export interface CleaningOptions {
  sortContents: string[];
  roundingAccuracy: number;
}

const defaultCleaningOptions: CleaningOptions = {
  sortContents: [],
  roundingAccuracy: 2,
}

interface TtsObject {
  GUID: string;
  Nickname: string;
  CardID?: number;
}

export function clean(
  text: string,
  {
    sortContents = [],
    roundingAccuracy = 2,
  }: Partial<CleaningOptions> = defaultCleaningOptions,
) {
  const save = JSON.parse(text);

  const shifter = 10 ** roundingAccuracy;

  function replacer(key: string, value: any) {
    if (key == "ObjectStates" && sortContents.indexOf("-1") >= 0) {
      return (value as TtsObject[]).sort((a, b) => a.GUID.localeCompare(b.GUID));
    }
    if (typeof value == "number") {
      return Math.round((value + Number.EPSILON) * shifter) / shifter;
    }
    if (key === "XmlUI" && value === "") {
      return undefined;
    }
  
    if (value?.GUID && sortContents.indexOf(value.GUID) >= 0) {
      if (value.DeckIDs) {
        value.DeckIDs = (value.DeckIDs as number[]).sort((a, b) => a - b);
      }
      if (value.ContainedObjects) {
        value.ContainedObjects = (value.ContainedObjects as TtsObject[]).sort(
          (a, b) =>
            (a.CardID && b.CardID ? a.CardID - b.CardID : 0) ||
            a.GUID.localeCompare(b.GUID) ||
            a.Nickname.localeCompare(b.Nickname)
        );
      }
      return value;
    }
    return value;
  }

  return JSON.stringify(save, replacer, 2);
}
