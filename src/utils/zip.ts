import * as archiver from 'archiver';
import * as fs from 'fs-extra';
import * as minimatch from 'minimatch';
import { currentDirecorty } from '../statics';
import { ux } from '@oclif/core';
import unzipper from 'unzipper';

function shouldIgnore(path: string): boolean {
	const tempIgnoreFile = '.tempignore';
	const ignorePatterns = fs.readFileSync(tempIgnoreFile, 'utf-8').split('\n');
	return ignorePatterns.some((pattern) =>
		minimatch.minimatch(path, pattern.trim()),
	);
}

export async function createZipArchive(outputPath: string): Promise<void> {
	const archive = archiver.create('zip', { zlib: { level: 9 } });

	// Create a write stream to the output path
	const output = fs.createWriteStream(outputPath);

	// Create a promise to handle the archive creation completion
	const archivePromise = new Promise<void>((resolve, reject) => {
		output.on('close', () => resolve());
		archive.on('error', (err) => reject(err));
	});
	ux.action.start('Compressing your precious template');
	// Pipe the archive to the output stream
	archive.pipe(output);

	async function addFilesToArchive(
		directoryPath: string,
		relativePath: string,
	): Promise<any> {
		const files = await fs.readdir(directoryPath);
		for (const file of files) {
			const filePath = `${directoryPath}/${file}`;
			const fileRelativePath = `${relativePath}/${file}`;
			const isDirectory = (await fs.stat(filePath)).isDirectory();
			if (isDirectory && !shouldIgnore(file)) {
				await addFilesToArchive(filePath, fileRelativePath);
			} else if (!shouldIgnore(file)) {
				archive.file(filePath, { name: fileRelativePath });
			}
		}
	}

	const rootDir = currentDirecorty; // Update with the root directory of your project
	await addFilesToArchive(rootDir, '');

	// Finalize the archive
	await archive.finalize();

	// Wait for the archive to finish
	await archivePromise;
	setTimeout(() => {
		ux.action.stop("\nIt's done you can view it in the .temp directory");
	}, 1000);
}

export async function unzipArchive(
	zipPath: string,
	targetDir: string = currentDirecorty + '/direct',
): Promise<void> {
	ux.action.start('Unzipping the archive');
	await fs.ensureDir(targetDir);
	await fs
		.createReadStream(zipPath)
		.pipe(unzipper.Extract({ path: targetDir }))
		.promise();
	ux.action.stop();
}
