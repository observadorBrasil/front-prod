import { handleBlobDownload } from "./download";

export const convertToCSV = (
  objArray: string | object,
  separator = ","
): string => {
  const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (const index in array[i]) {
      if (line !== "") line += separator;

      line += array[i][index];
    }
    str += line + "\r\n";
  }

  return str;
};

export function selectProps(props: string[]) {
  return (obj: any) => {
    const newObj: any = {};
    props.forEach((propName) => {
      if (propName.includes(".")) {
        const [accessor, prop] = propName.split(".");
        newObj[`${accessor}${prop}`] = obj?.[accessor]?.[prop] || null;
      } else {
        newObj[propName] = obj[propName];
      }
    });

    return newObj;
  };
}

const universalBOM = "\uFEFF"; // https://stackoverflow.com/questions/42462764/javascript-export-csv-encoding-utf-8-issue
export const exportCSVFile = (
  headers: Record<string, string>,
  originalItems: any,
  filename = "export",
  separator = ","
) => {
  const items = originalItems.map(selectProps(Object.keys(headers)));

  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  const csv = convertToCSV(items, separator);
  const exportedFilename = filename + ".csv";
  const blob = new Blob([`${universalBOM}${csv}`], {
    type: "text/csv; charset=utf-8;",
  });
  handleBlobDownload(exportedFilename, blob);
};
