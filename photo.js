const fs = require("fs").promises;
const readdir = fs.readdir;
const path = require('path');
//1. accept argument on the terminal
const arg = process.argv.slice(2)[0];

//2. Make 3 folders (video, captured, duplicated)
const folders = ["video", "captured", "duplicated"];
folders.forEach(folder => fs.mkdir(`./test/${folder}`))

const sortFiles = async () => {
	try {
		//3. Read files in 'test' folder.
		const files = await readdir(`./${arg}`);
		files.forEach((file) => {
			//4. if the file's extension is 'mp4', move it to a 'video' folder, the case of 'png' and 'aae', move them to a 'captured' folder,
            // if there are some files which extension are jpg and have "E" character on their names, move them to a 'duplicated' folder.
			const moveFile = async (newFolderName) => {
				const oldPath = `./${arg}/${file}`;
				const newPath = `./${arg}/${newFolderName}/${file}`;
				await fs.copyFile(oldPath, newPath);
				await fs.rm(oldPath);
			};
			if (path.extname(file) === ".mp4" || path.extname(file) === ".mov")
				moveFile(folders[0]);
			if (path.extname(file) === ".png" || path.extname(file) === ".aae")
				moveFile(folders[1]);
			if (path.extname(file) === ".jpg" && !file.includes("E"))
				moveFile(folders[2]);
		});
	} catch (err) {
		console.error(err);
	}
};
sortFiles();
