export class MissingArgumentError extends Error {
	public args: string[];
	/**
	 *
	 * @param args Array of arguments missing
	 */
	constructor(args: string[]) {
		const missingArgs = args.join(', ');
		const errorMessage = `The command you entered is missing the following arguments: ${missingArgs}`;
		super(errorMessage);
		this.args = args;
		this.name = 'MissingArgumentError';
	}
}

export class InvalidFlagError extends Error {
	public flags: string[];
  /**
   * 
   * @param flags Array of flags which are invalid 
   */
	constructor(flags: string[]) {
		const invalidFlags = flags.join(', ');
		const errorMessage = `The command you entered have some invalid flags :${invalidFlags}`;
		super(errorMessage);
		this.flags = flags;
	}
}


