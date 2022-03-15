import { ui } from "./ui";
import axios from "axios";

import { downloadFile, sleep } from "fzz";

async function backupAll() {
  let re = await axios.get("https://www.figma.com/api/user/state");
  let teams = re.data.meta.teams;
  console.log("Teams:", teams);

  let windowEl = ui();

  let infoMain = "";
  let infoSub1 = "";
  let infoSub2 = "";

  let allFiles = [];

  function echo() {
    let title = `🌒 备份全部 Figma 文件 v1.1`;
    windowEl.innerText = `${title}\n\n${infoMain}\n${infoSub1}\n${infoSub2}`;
  }

  infoMain = `备份 ${teams.length} 个团队的所有文件，（之后会通过浏览器自动下载每一个文件， 请留意你的下载文件夹）`;
  echo();

  for (const team of teams) {
    let re = await axios.get(
      `https://www.figma.com/api/teams/${team.id}/folders`
    );

    let folders = Object.keys(re.data.meta.folders);
    console.log("Folders:", folders);

    infoSub1 = `备份 ${team.name} 团队， 共 ${folders.length} 个项目`;
    echo();

    for (const folderId of folders) {
      let re = await axios.get(
        `https://www.figma.com/api/folders/${folderId}/files`
      );

      let files = re.data.meta.files;
      let folderName = re.data.meta.folder.name;
      console.log("Files:", files);

      await Promise.all(
        files.map(async (file) => {
          let re = await axios.get(
            `https://www.figma.com/api/file_metadata/${file.key}`
          );

          let fileInfo = {
            name: file.name,
            dlname: `${team.name}-${folderName}-${file.name}`,
            url: re.data.meta.canvas_url,
          };
          infoSub2 = `找到文件 ${file.name}, 已找到 ${allFiles.length} 个文件`;
          echo();
          allFiles.push(fileInfo);
        })
      );
    }
  }
  infoSub1 = `找到 ${allFiles.length} 个文件，开始下载...（请让浏览器允许下载多个文件；下载完毕后自行刷新页面）`;
  infoSub2 = `下载链接（如果想用下载工具下载）: \n ${allFiles
    .map((x) => `${x.name}\n${x.url}\n`)
    .join("\n")}`;
  echo();
  console.log(allFiles);

  for (const file of allFiles) {
    await sleep(500);

    fetch(file.url).then((x) =>
      x.blob().then((blob) => {
        downloadFile(blob, file.dlname + ".fig");
      })
    );
  }
}
backupAll();
