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

function convertTagsToBooleans(tags: StaticTags[]): (number | null)[] {
  const allTags: StaticTags[] = tagNames;
  return allTags.map(tag => tags.includes(tag)? 1 : null);
}

function convertBooleansToTags(booleans: (number | null)[]): StaticTags[] {
  const allTags: StaticTags[] = tagNames;
  return allTags.filter((tag, index) => booleans[index] === 1);
}

export { combineNames, convertTagsToBooleans, convertBooleansToTags };
