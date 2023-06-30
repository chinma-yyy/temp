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

// Check if a directory exists
export function directoryExists(directoryPath: string): boolean {
	return (
		fs.existsSync(directoryPath) && fs.lstatSync(directoryPath).isDirectory()
	);
}

// Check if a file exists
export function fileExists(filePath: string): boolean {
	return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
}

export function readJSON(filePath: string): any {
	const data = readFile(filePath);
	return JSON.parse(data);
}

// Write JSON to a file
export function writeJSON(filePath: string, json: object): void {
	const data = JSON.stringify(json, null, 2);
	writeFile(filePath, data);
}
