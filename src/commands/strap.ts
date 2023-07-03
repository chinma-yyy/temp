import { Args, Command, Flags } from '@oclif/core';
import { readJSON } from '../utils/file-system';
import { MissingArgumentError } from '../errors/error';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { unzipArchive } from '../utils/zip';
import { templatesDirectoryJSON } from '../dynamics';
import { currentDirecorty } from '../statics';

export default class Strap extends Command {
	static description =
		'Bootstrap your project template by just a simple command and get going with your project';

	static examples = [
		'temp strap temp-name',
		'temp strap proj-name -l',
		'temp strap proj -r',
	];

	static flags = {
		local: Flags.boolean({
			char: 'l',
			description: 'Search for local templates only',
		}),
		remote: Flags.boolean({
			char: 'r',
			description: 'Search for remote registry templates only',
		}),
	};

	static args = {
		name: Args.string({ description: 'Name of the template to be strapped' }),
	};

	public async run(): Promise<void> {
		try {
			const { args } = await this.parse(Strap);
			if (!args.name) {
				throw new MissingArgumentError('name');
			}
			const templates = searchLocalTemplates(args.name);
			if (templates.length === 0) {
				console.log(chalk.red("Maybe we could'nt find the right template?"));
				return;
			}
			await inquirer
				.prompt({
					type: 'confirm',
					name: 'confirm',
					message: `Should we start the strapping of ${templates[0].name}`,
				})
				.then(
					async () => {
						await unzipArchive(
							templates[0].location,
							currentDirecorty + '/' + templates[0].name,
						);
					},
					() => {
						console.log(chalk.blue('Maybe later ?...'));
					},
				);
		} catch (error: any) {
			console.log('strap');
			console.log(error.message);
		}
	}
}

function searchLocalTemplates(name: string): Array<any> {
	const templateInfo: Array<any> = readJSON(templatesDirectoryJSON).templates;
	templateInfo.filter((template) => {
		template.name === name;
	});
	return templateInfo;
}
