import { Args, Command, Flags } from '@oclif/core';
import { createZipArchive } from '../utils/zip';
import { currentDirecorty, tempJSONFilePath } from '../statics';
import { readJSON } from '../utils/file-system';

export default class Scrap extends Command {
	static description =
		'Compress and zip all the files ans store them in the .temp directory for ';

	static examples = ['temp scrap'];

	static flags = {
		// flag with a value (-n, --name=VALUE)
		name: Flags.string({ char: 'n', description: 'name to print' }),
		// flag with no value (-f, --force)
		force: Flags.boolean({ char: 'f' }),
	};

	static args = {
		file: Args.string({ description: 'file to read' }),
	};

	public async run(): Promise<void> {
		const tempConfig = readJSON(tempJSONFilePath);
		const templateName = tempConfig.templateName;
		await createZipArchive(currentDirecorty + '/' + templateName + '.zip');
	}
}
