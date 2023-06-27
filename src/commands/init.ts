import { Args, Command, Flags } from '@oclif/core';

export default class Init extends Command {
	static description =
		'Marks the directory as project template and creates basic config files';

	static examples = ['temp init'];

	static flags = {
		// flag with no value (-y, --yes)
		yes: Flags.boolean({ char: 'y' }),
	};

	static args = {
		name: Args.string({ description: 'Name of the project template' }),
	};

	public async run(): Promise<void> {
		const { args, flags } = await this.parse(Init);

		const templateName = args.name;
		if (!templateName) {
			throw Error();
		}
		if (!flags.yes) {
			console.log('');
		}
	}
}
