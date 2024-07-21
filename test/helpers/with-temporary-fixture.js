import fs from 'node:fs/promises';

import {temporaryDirectoryTask} from 'tempy';

export async function withTemporaryFixture(cwd, task) {
	let result;
	await temporaryDirectoryTask(async temporary => {
		await fs.cp(cwd, temporary, {recursive: true}); // eslint-disable-line n/no-unsupported-features/node-builtins
		result = await task(temporary);
	});

	return result;
}
