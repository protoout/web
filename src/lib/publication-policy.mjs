/** Fail closed: discovering or importing a source page does not approve publication. */
export function validatePublicationPolicy(pages, policy) {
  const errors = [];
  const allowed = new Set(policy.allowedPaths);
  const excluded = new Set(policy.excludedPaths.map(entry => entry.path));
  const seen = new Set();
  for (const page of pages) {
    const route = page.path;
    if (typeof route !== 'string' || (route !== '' && !/^[a-zA-Z0-9_-]+$/.test(route))) {
      errors.push(`Invalid publication path: ${String(route)}`);
      continue;
    }
    if (seen.has(route)) errors.push(`Duplicate publication path: /${route}`);
    seen.add(route);
    if (excluded.has(route)) errors.push(`Excluded source page must not be generated: /${route}`);
    if (!allowed.has(route)) errors.push(`Publication review required: /${route}`);
  }
  return errors;
}

export function assertPublicationPolicy(pages, policy) {
  const errors = validatePublicationPolicy(pages, policy);
  if (errors.length) throw new Error(errors.join('\n'));
}
