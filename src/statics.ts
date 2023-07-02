import path from 'path';
import { readJSON } from './utils/file-system';

export const currentDirecorty = process.cwd();
export const tempDirectory = process.cwd() + '/.temp';
export const tempJSONFilePath = process.cwd() + '/temp.json';
export const zipFilePathProject =
	process.cwd() + readJSON(tempJSONFilePath).templateName + '.zip';
export const zipFilePathRelativeDirectory = path.resolve(
	__dirname,
	'../templates',
);
export const zipFilePathRelative = path.resolve(
	__dirname,
	'../templates',
	`${readJSON(tempJSONFilePath).templateName}.zip`,
);
