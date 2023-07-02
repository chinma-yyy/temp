import { Args, Command, Flags } from '@oclif/core';
import { createZipArchive } from '../utils/zip';
import {
	tempJSONFilePath,
	zipFilePathProject,
	zipFilePathRelative,
	zipFilePathRelativeDirectory,
} from '../statics';
import {
	createDirectory,
	createFile,
	directoryExists,
	readJSON,
	writeJSON,
} from '../utils/file-system';

export default class Scrap extends Command {
	static description =
		'Compress and zip all the files ans store them in the .temp directory for ';

	static examples = ['temp scrap'];

	static flags = {
		local: Flags.boolean({
			char: 'l',
			description:
				'To create a local template which will be stored in device hidden',
		}),
	};

	static args = {
		file: Args.string({ description: 'file to read' }),
	};

	public async run(): Promise<void> {
		try {
			const { flags } = await this.parse(Scrap);
			const zipfilepath = flags.local
				? zipFilePathRelative
				: zipFilePathProject;
			if (flags.local) {
				if (!directoryExists(zipFilePathRelativeDirectory)) {
					console.log('heS');
					createDirectory(zipFilePathRelativeDirectory);
					createFile(zipFilePathRelativeDirectory + '/temp.json');
					writeJSON(zipFilePathRelativeDirectory + '/temp.json', {});
				}
				console.log("here");
				const templates = readJSON(zipFilePathRelativeDirectory + '/temp.json');
				const templatesArray: Array<any> = templates.templates || [];
				templatesArray.push({
					name: readJSON(tempJSONFilePath).templateName,
					location: zipfilepath,
				});
				templates.template = templatesArray;
				writeJSON(zipFilePathRelativeDirectory + '/temp.json', templates);
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
