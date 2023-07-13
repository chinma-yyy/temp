import { Command, Flags } from '@oclif/core';
import { readJSON, writeJSON } from '../utils/file-system';
import { tempJSONFilePath } from '../statics';
import inquirer from 'inquirer';
import * as chalk from 'chalk';
import { searchLocalTemplates } from './strap';

const Chalk = chalk.default;
export default class Scripts extends Command {
	static description =
		'All the scripts/commands which will run before bootstrapping your template from the registry or local';

	static examples = ['temp scripts', 'temp scripts -b', 'temp scripts -a'];

	static flags = {
		before: Flags.boolean({
			char: 'b',
			description:
				'The scripts which will run before bootstrapping your template',
		}),
		after: Flags.boolean({
			char: 'a',
			description:
				'The scripts which will run after bootstrapping your template',
		}),
		view: Flags.boolean({
			char: 'v',
			description: 'View all the scripts connfigured for the template',
		}),
	};

	static args = {};

	public async run(): Promise<void> {
		try {
			const { flags } = await this.parse(Scripts);
			const JSON = readJSON(tempJSONFilePath);
			const beforeScripts: Array<string> = JSON?.before || [];
			const afterScripts: Array<string> = JSON?.after || [];

			if (flags.view) {
				console.log(Chalk.yellow('Before scripts'));
				if (beforeScripts.length === 0) {
					console.log(Chalk.magenta('No before scripts configured'));
				} else {
					beforeScripts.forEach((script, ind) => {
						console.log(`${ind + 1}. ${Chalk.underline(script)}`);
					});
				}
				console.log(Chalk.yellow('After scripts'));
				if (afterScripts.length === 0) {
					console.log(Chalk.magenta('No after scripts configured'));
				} else {
					afterScripts.forEach((script, ind) => {
						console.log(`${ind + 1}. ${Chalk.underline(script)}`);
					});
				}
				return;
			}
			if ((flags.before && flags.after) || (!flags.after && !flags.before)) {
				inquirer
					.prompt([
						{
							type: 'list',
							name: 'type',
							message: 'Which scripts you want to add?',
							choices: ['before', 'after'],
						},
					])
					.then(async (answers) => {
						if (answers.type === 'after') {
							await addScripts(afterScripts, JSON, 'after');
						} else {
							await addScripts(beforeScripts, JSON, 'before');
						}
					});
			} else if (flags.before) {
				await addScripts(beforeScripts, JSON, 'before');
			} else if (flags.after) {
				await addScripts(afterScripts, JSON, 'after');
			}
		} catch (error: any) {
			console.log('scripts');
			console.log(error.message);
		}
	}
}

async function addScripts(
	Scripts: Array<string>,
	JSON: any,
	type: string,
): Promise<void> {
	let answers,
		num = 0;

	console.log(
		Chalk.blue.bold(
			'These commands will be pushed to your previous scripts if already available',
		),
	);
	console.log(
		Chalk.yellow.bold(
			'To exit the process to add command enter "q" as a command',
		),
	);
	do {
		num += 1;
		answers = await inquirer
			.prompt([{ type: 'input', name: 'command', message: `${num}. ` }])
			.then((answer) => {
				return answer;
			});
		if (answers.command !== 'q') {
			Scripts.push(answers.command);
		}
	} while (answers.command !== 'q');
	JSON.before = Scripts;
	const template = searchLocalTemplates(JSON.templateName);
	type === 'after'
		? (template[0].after = Scripts)
		: (template[0].before = Scripts);
	writeJSON(tempJSONFilePath, JSON);
}
