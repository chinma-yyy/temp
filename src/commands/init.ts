import { Args, Command, Flags } from '@oclif/core';
import inquirer, { QuestionCollection } from 'inquirer';
import { createFile, directoryExists, writeJSON } from '../utils/file-system';
import { currentDirecorty, tempJSONFilePath } from '../statics';

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
			if (directoryExists(currentDirecorty + '/.temp')) {
				throw new Error('Project Already initiated');
			}
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
						type: 'input',
						name: 'description',
						message: 'Description of the template:',
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
			const templateName = answers?.name || process.cwd();
			const repo = answers?.repo || '';
			const author = answers?.author || '';
			const description = answers?.description || '';
			const version = answers?.version || '1.0.0';
			const init = {
				templateName,
				description,
				author,
				repository: repo,
				version,
			};
			createFile(tempJSONFilePath);
			writeJSON(tempJSONFilePath, init);
			console.clear();
			console.log(
				`\n\nYour temp project has been created. Let's create that project template now!!!`,
			);
		} catch (error: any) {
			console.error(error.message);
		}
	}
}
