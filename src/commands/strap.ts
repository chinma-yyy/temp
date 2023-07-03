import { Args, Command, Flags } from '@oclif/core';
import { readJSON } from '../utils/file-system';
import { MissingArgumentError } from '../errors/error';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { unzipArchive } from '../utils/zip';
import { templatesDirectoryJSON } from '../dynamics';
import { currentDirectory } from '../statics';
import { exec } from 'child_process';
import figlet from 'figlet';

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
						const templateName =
							(
								await inquirer
									.prompt({
										type: 'input',
										name: 'templateName',
										message: `What should be the project name? ${chalk.grey(
											`(${templates[0].name})`,
										)}`,
									})
									.then((answer) => {
										return answer;
									})
							).templateName || templates[0].name;
						await unzipArchive(
							templates[0].location,
							currentDirectory + '/' + templateName,
						);
						console.log(figlet.textSync('unzipped'));
						console.log(chalk.magenta("Let's build the template..."));
						const templateJSON = readJSON(
							currentDirectory + '/' + templateName + '/temp.json',
						);
						const beforeScripts = templateJSON?.before;
						const afterScripts = templateJSON?.after;
						console.log(beforeScripts, afterScripts);
						await executeScripts(beforeScripts);
						await executeScripts(afterScripts);
					},
					() => {
						console.log(chalk.blue('Maybe later ?...'));
					},
				);
		} catch (error: any) {
			console.log('strap');
			console.log(error);
		}
	}
}

export function searchLocalTemplates(name: string): Array<any> {
	const templateInfo: Array<any> = readJSON(templatesDirectoryJSON).templates;
	templateInfo.filter((template) => {
		template.name === name;
	});
	return templateInfo;
}

async function executeScripts(scripts: Array<string>): Promise<void> {
	if (scripts.length === 0) {
		return;
	}
	scripts.forEach((script, ind) => {
		exec(script);
		console.log('Executed' + ind);
	});
	console.log('before done');
}
