import { Args, Command, Flags } from '@oclif/core';
import inquirer, { QuestionCollection } from 'inquirer';
import { createFile, fileExists, writeJSON } from '../utils/file-system';
import { tempJSONFilePath } from '../statics';
import chalk from 'chalk';
import figlet from 'figlet';

export default class Init extends Command {
	static description =
		'Marks the directory as project template and creates basic config files';

	static examples = ['temp init', 'temp init -y'];

	static flags = {
		// flag with no value (-y, --yes)
		yes: Flags.boolean({ char: 'y' }),
	};

	static args = {
		name: Args.string({
			name: 'Template name',
			description: 'Name of the project template',
		}),
	};

	public async run(): Promise<void> {
		try {
			const { flags } = await this.parse(Init);
			let answers;
			if (!flags.yes) {
				const questions: QuestionCollection = [
					{
						type: 'input',
						name: 'name',
						message: 'Template name:',
					},
					{
						type: 'input',
						name: 'description',
						message: 'Description of the template:',
					},
					{
						type: 'input',
						name: 'repo',
						message: 'Repository URL:',
					},
					{
						type: 'input',
						name: 'author',
						message: 'Author of this template:',
					},
					{
						type: 'input',
						name: 'version',
						message: 'Version of this template:',
					},

					{
						type: 'list',
						name: 'type',
						message: 'What is the type of the registry used for the template?',
						choices: ['local', 'remote'],
					},
					{
						type: 'confirm',
						message: 'Are the details correct?',
						name: 'confirm',
					},
				];
				do {
					console.clear();
					answers = await inquirer.prompt(questions).then((answers) => {
						return answers;
					});
				} while (!answers.confirm);
			}
			const templateName = answers?.name || 'sagxv';
			const repo = answers?.repo || '';
			const author = answers?.author || '';
			const description = answers?.description || '';
			const version = answers?.version || '1.0.0';
			const type = answers?.type || 'local';
			const init = {
				templateName,
				description,
				author,
				repository: repo,
				version,
				type,
			};
			if (fileExists(tempJSONFilePath)) {
				console.log(
					chalk.cyan(
						'\nTemp JSON already exists. The template has been initialized already\n',
					),
				);
				return;
			}
			createFile(tempJSONFilePath);
			writeJSON(tempJSONFilePath, init);
			console.log(figlet.textSync('temp'));
			console.log(
				chalk.yellow(
					`\nYour temp project has been created.\nLet's create that project template now!!!`,
				),
			);
		} catch (error: any) {
			console.error(error.message);
		}
	}
}
