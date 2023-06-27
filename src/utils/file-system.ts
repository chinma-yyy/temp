import fs from 'fs';
import path from 'path';

// Create a file
export function createFile(filePath: string, data: string = ''): void {
	fs.writeFileSync(filePath, data);
}

// Create a directory
export function createDirectory(directoryPath: string): void {
	fs.mkdirSync(directoryPath, { recursive: true });
}

// Read a file
export function readFile(filePath: string): string {
	return fs.readFileSync(filePath, 'utf-8');
}

// Write to a file
export function writeFile(filePath: string, data: string): void {
	fs.writeFileSync(filePath, data);
}

// Delete a file or directory
export function deleteFileOrDirectory(filePath: string): void {
	if (fs.existsSync(filePath)) {
		if (fs.lstatSync(filePath).isDirectory()) {
			fs.readdirSync(filePath).forEach((file: string) => {
				deleteFileOrDirectory(path.join(filePath, file));
			});
			fs.rmdirSync(filePath);
		} else {
			fs.unlinkSync(filePath);
		}
	}
}
