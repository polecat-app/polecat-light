import { tagNames } from "./Constants";

function combineNames(
  first: string | null | undefined,
  last: string | null | undefined
): string {
  let names: string[] = [];
  if (first) {
    names.push(first);
  }
  if (last) {
    names.push(last);
  }
  const aggregateLocationName = names.join(", ");
  return aggregateLocationName;
}

function convertTagsToBooleans(tags: StaticTags[]): (boolean | null)[] {
  const allTags: StaticTags[] = tagNames;
  const boolTups = allTags.map(tag => tags.includes(tag)? [tag, true] : [tag, null]);
  const obj = {};
  // add all tuples to object, using tag as key and boolean as value
  boolTups.forEach(tup => obj[tup[0]] = tup[1]);
  return obj;
}

function convertBooleansToTags(booleans: (boolean | null)[]): StaticTags[] {
  const allTags: StaticTags[] = tagNames;
  return allTags.filter((tag, index) => booleans[index] === true);
}

export { combineNames, convertTagsToBooleans, convertBooleansToTags };
