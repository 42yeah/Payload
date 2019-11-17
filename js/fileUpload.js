import settings from "/js/settings.js";

let callback = function() {}

function fileUpload() {
  const input = document.querySelector("#upload-form-file");
  input.click();
  input.onchange = commit;
}

function commit() {
  const form = document.querySelector("#upload-form");
  const action = settings.host + ":" + settings.port + "/file-upload";
  const formData = new FormData(form);
  fetch(action, {
    method: "POST",
    body: formData
  }).then(function(res) {
    if (res.status == 200) {
      callback();
    }
  });
}

function setFileUploadSuccessCallback(cb) {
  callback = cb;
}

export default {
  fileUpload,
  setFileUploadSuccessCallback
};

