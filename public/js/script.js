const button = document.querySelector('#uploadBtn');
const uploadedImgBtn = document.getElementById('uploadedImg')
const dropZone = document.querySelector('.upload-canvas')
const main = document.querySelector('main')
const text = document.getElementById('text');

button.addEventListener("click", (e) => {
    e.preventDefault();
    uploadedImgBtn.click();
    return false;
});



function uploading() {
    main.innerHTML = `<div class="uploading-loader-prompt">
        <div class="prompt-text-wrapper">
            <div class="prompt-text">
                <span>Uploading...</span>
            </div>
        </div>
        <div class="prompt-bar">
            <div class="prompt-inner-bar"></div>
        </div>
    </div>`;
}

function displayImg(url) {
    main.innerHTML = `<div class="upload-wrapper">
            <div class="upload-title-wrapper">
                <span class="upload-title">
                    <img src="./css/images/clarity_success-standard-solid.svg" />
                </span>
            </div>
            <div class="upload-subtitle-wrapper">
                <div class="upload-title">
                    Uploaded Successfully
                </div>
            </div>
            <form enctype="multipart/form-data">
                <div class="upload-canvas-wrapper">
                    <div class="upload-canvas1">
                        <img src=${url} class="uploaded-img" width="338px" height="218px" style="border-radius: 5px;" />
                    </div>
                </div>
                <div class="upload-btn-wrapper">
                    <span class="upload-or">
                        <input type="text" value=${url} id="imgUrl" disabled />
                    </span>
                    <span class="copy-btn" onclick="copyText();">
                        Share Image
                    </span>
                </div>
            </form>
        </div>`;
}

function copyText() {
    var copyText = document.getElementById("imgUrl");

    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
}

// upload functionality

const inputFileElement = document.getElementById('uploadedImg');

inputFileElement.addEventListener('change', (e) => {
    uploading();
    // console.log(e.target.files);
    const [file] = e.target.files;
    // console.log(file);
    
    const formData = new FormData();
    formData.append('image', file);
    // console.log(formData)
    fetch('/upload-image', {
        body: formData,
        method: "POST",
    }).then(d => d.json()).then(r => {
        // console.log(r)
        displayImg(r.url);
    })
})