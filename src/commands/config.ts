import {Args, Command, Flags} from '@oclif/core'

export default class Config extends Command {
  static description = 'Configure the hidden configurations'

  static examples = [
    'temp config',
    'temp config author'
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = {
    file: Args.string({description: 'The attribute to configure'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Config)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /home/chinmay/Desktop/temp/src/commands/config.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
