import settings from "/js/settings.js";
import fileUpload from "/js/fileUpload.js";

function fetchPayload() {
  fetch(settings.host + ":" + settings.port + "/files", {
    mode: "cors"
  }).then(function(res) {
    res.json().then(function(json) {
      let innerHTML = "";
      for (let i = 0; i < json.length; i++) {
        const file = json[i];
        const gridTemplate = `
          <a href="` + settings.host + `:` + settings.port + `/assets/` + file.fileName + `" class="payload-grid">
            <div class="payload-title">
              ` + file.fileName + `
            </div>
            <div class="payload-content">
              <div><i class="fas fa-birthday-cake"></i> Cake day: ` + file.cakeDate + `</div>
              <div><i class="fas fa-expand"></i> Size: ` + file.size + `</div>
              <div><i class="fas fa-mouse"></i> Click to download this thing</div>
            </div>
          </a>
        `;
        innerHTML += gridTemplate;
      }
      innerHTML += `
        <div id="upload-grid" class="payload-grid">
          <div class="payload-title">
            Upload your stuff:
          </div>
          <div class="payload-content" style="text-align: center">
            <br />
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <div id="delete-grid" class="payload-grid">
          <div style="color: #fb4f4f" class="payload-title">
            <b>Or DELETE EVERYTHING:</b>
          </div>
          <div class="payload-content" style="text-align: center">
            <br />
            <i class="fas fa-minus"></i>
          </div>
        </div>
      `;
      document.getElementById("payload").innerHTML = innerHTML;
      const uploadGrid = document.querySelector("#upload-grid");
      fileUpload.setFileUploadSuccessCallback(fetchPayload);
      uploadGrid.onclick = fileUpload.fileUpload;

      const deleteGrid = document.querySelector("#delete-grid");
      deleteGrid.onclick = deleteEverything;
    });
  });
}

function deleteEverything() {
  fetch(settings.host + ":" + settings.port + "/delete-everything", {
    mode: "cors"
  }).then(function(res) {
    fetchPayload();
  });
}

window.onload = function() {
  fetchPayload();
}
