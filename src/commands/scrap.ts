import { Args, Command, Flags } from '@oclif/core';
import { createZipArchive } from '../utils/zip';
import { tempJSONFilePath } from '../statics';
import {
	createDirectory,
	createFile,
	directoryExists,
	readJSON,
	writeJSON,
} from '../utils/file-system';
import {
	templatesDirectory,
	templatesDirectoryJSON,
	zipFileProjectDirectoryPath,
	zipFileTemplatesDirectoryPath,
} from '../dynamics';

export default class Scrap extends Command {
	static description =
		'Compress and zip all the files and store them in the .temp directory for ';

	static examples = ['temp scrap'];

	static flags = {
		local: Flags.boolean({
			char: 'l',
			description:
				'To create a local template which will be stored in device hidden',
		}),
		remote: Flags.boolean({
			char: 'r',
			description:
				'To create a remote template which will be stored in a remote registry',
		}),
	};

	static args = {
		file: Args.string({ description: 'file to read' }),
	};

	public async run(): Promise<void> {
		try {
			const { flags } = await this.parse(Scrap);
			const zipfilepath = flags.local
				? zipFileTemplatesDirectoryPath
				: zipFileProjectDirectoryPath;
			if (flags.local) {
				if (!directoryExists(templatesDirectory)) {
					createDirectory(templatesDirectory);
					createFile(templatesDirectoryJSON);
					writeJSON(templatesDirectoryJSON, {});
				}
				const templates = readJSON(templatesDirectoryJSON);
				const templatesArray: Array<any> = templates.templates || [];
				templatesArray.push({
					name: readJSON(tempJSONFilePath).templateName,
					before: readJSON(tempJSONFilePath).before,
					location: zipfilepath,
				});
				templates.templates = templatesArray;
				writeJSON(templatesDirectoryJSON, templates);
			} else if (flags.remote) {
				//
			} else {
				throw new Error();
			}
			await createZipArchive(zipfilepath);
			const tempJSONFile = readJSON(tempJSONFilePath);
			tempJSONFile.location = zipfilepath;
			writeJSON(tempJSONFilePath, tempJSONFile);
		} catch (error: any) {
			console.log('scrap');
			console.log(error.message);
		}
	}
}
