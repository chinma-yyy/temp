import { Args, Command, Flags } from '@oclif/core';
import { createZipArchive } from '../utils/zip';
import {
	zipFilePathProject,
	zipFilePathRelative,
	zipFilePathRelativeDirectory,
} from '../statics';
import { createDirectory, directoryExists } from '../utils/file-system';

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
		const { flags } = await this.parse(Scrap);
		const zipfilepath = flags.local ? zipFilePathRelative : zipFilePathProject;
		if (flags.local) {
			if (!directoryExists(zipFilePathRelativeDirectory)) {
				createDirectory(zipFilePathRelativeDirectory);
			}
		}
		await createZipArchive(zipfilepath);
	}
}
