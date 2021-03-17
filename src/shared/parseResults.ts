export function parseResults(results: Array<any>) {
  return results.map(result => parseResult(result));
}

export function parseResult(result: any) {
  return { id: result.id, ...result.attributes };
}
