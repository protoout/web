import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePublicationPolicy, assertPublicationPolicy } from '../src/lib/publication-policy.mjs';
const removed = '39800000000000000000000000000000';
const policy = {allowedPaths:['','posts','example_page_top',removed],excludedPaths:[{path:removed},{path:'example_page_top'}]};
test('existing approved routes remain publishable',()=>assert.deepEqual(validatePublicationPolicy([{path:''},{path:'posts'}],policy),[]));
test('a newly discovered route is not automatically approved',()=>assert.throws(()=>assertPublicationPolicy([{path:'new-page'}],policy),/Publication review required/));
test('removed pages remain excluded even if added to the allowlist',()=>assert.throws(()=>assertPublicationPolicy([{path:removed}],policy),/Excluded source page/));
test('unconfirmed template pages remain excluded',()=>assert.throws(()=>assertPublicationPolicy([{path:'example_page_top'}],policy),/Excluded source page/));
test('duplicate paths fail before pages can overwrite each other',()=>assert.throws(()=>assertPublicationPolicy([{path:'posts'},{path:'posts'}],policy),/Duplicate publication path/));
test('unsafe and non-string routes fail',()=>{
 for(const route of ['../private','posts/new','%2e%2e',null,12]) assert.throws(()=>assertPublicationPolicy([{path:route}],policy),/Invalid publication path/);
});
