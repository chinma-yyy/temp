export class MissingArgumentError extends Error {
	public arg: string;
	/**
	 *
	 * @param arg argument missing
	 */
	constructor(arg: string) {
		const errorMessage = `The command you entered is missing the following argument: ${arg}`;
		super(errorMessage);
		this.arg = arg;
		this.name = 'MissingArgumentError';
	}
}



