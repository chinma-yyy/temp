/**
 * So, the thing is the statics file had these values but when any value was
 * used from there it resolved all values and was calling the readJSON function
 * which crashed the cli since there was no temp.json so all the statics which need some 
 * loading are here.
 */

import path from 'path';
import { readJSON } from './utils/file-system';
import { tempJSONFilePath } from './statics';

export const templatesDirectory = path.resolve(__dirname, '../templates');

export const templatesDirectoryJSON = `${templatesDirectory}/temp.json`;

export const zipFileTemplatesDirectoryPath = `${templatesDirectory}/${
	readJSON(tempJSONFilePath)?.templateName
}`;

export const zipFileProjectDirectoryPath = `${process.cwd()}/${
	readJSON(tempJSONFilePath)?.templateName
}`;
