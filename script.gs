function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate().setTitle("Banco de Provas CEFET").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function uploadFile(data) {
  let file = data.file;
  let discipline = data.discipline;
  let folder = DriveApp.getFoldersByName(discipline);

  if(folder.hasNext === false) {
    console.log("Nome Errado");
    return;
  }

  let createFile = folder.next().createFile(file);
  const responseObj = {filename: createFile.getName(), fileId: createFile.getId(), fileUrl: "https://drive.google.com/uc?export=download&id=" + createFile.getId()};

  const log = DriveApp.getFileById(" ");
  var d = new Date();
  var time = d.tolocaleDateString() + " " + d.toLocaleTimeString();
  var content = log.getBlob().getDataAsString();
  var newContent = time + "," + discipline + "," + createFile.getName() + "\n";
  var combinedContent = content + newContent;
  log.setContent(combinedContent);

  return ContentService.createTextOutput(JSON.stringify(responseObj)).setMimeType(ContentService.MimeType.JSON);
}

function listFiles(discipline) {
  const folder = DriveApp.getFoldersByName(discipline);

  if(folder.hasNext === false) {
    console.log("Nome Errado");
    return;
  }

  const files = folder.next().getFiles();
  const listicon = '<img src="https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document">';
  let fileList = [], name = [], link = [], file = [];

  if(!files.hasNext()) return("<b>Nenhuma prova encontrada<b>");
  while(files.hasNext()) {
      file = files.next();
      name = file.getName();
      link = file.getUrl();

      fileList.push(
        '<tr><td>' + listicon + '<a target="_blank" href ="' + link + '">' + name +'</td></tr>'
      );
      Logger.log(fileList);
  }

  return fileList.join(' ');
}
