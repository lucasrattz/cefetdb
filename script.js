  document.getElementById('submitBtn').addEventListener('click',
  function(e){
    let file = document.getElementById('file');
    if(file.files.length == 0) alert('Nenhum arquivo foi selecionado');
    else{
    e.preventDefault();
    google.script.run.uploadFile(this.parentNode);
    alert('Prova enviada com sucesso!');
    }
  });

  function list(element) {
    let discipline = element.textContent;
    document.getElementById('FileList').innerHTML = "<b>Carregando...</b>";
    //let files = google.script.run.listFiles(discipline);
    //document.getElementById('FileList').innerHTML = files;
        google.script.run.withSuccessHandler(function(tblStr){
      document.getElementById('FileList').innerHTML = tblStr;
    }).listFiles(discipline);
  }

  document.getElementById('file').onchange = function(e) {
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'odf':
      break;
    default:
      alert('Favor selecionar um arquivo de formato .pdf');
      this.value = '';
  }

  if(this.files[0].size > 5242880){
      alert('O arquivo não pode ser maior que 5MB');
      this.value = '';
  }
};

  function toggleForm() {
    const toggle = document.getElementById("formToggle");
    if(toggle.innerHTML == "ENVIE UMA PROVA ▼") toggle.innerHTML = "ENVIE UMA PROVA ▲";
    else toggle.innerHTML = "ENVIE UMA PROVA ▼";

    let form = document.getElementById("form");
    if(form.style.display === "flex"){
      form.style.display = "none";
      return;
    }
    form.style.display = "flex";
  }
