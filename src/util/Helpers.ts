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

export { combineNames };
