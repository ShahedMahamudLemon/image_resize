const WIDTH = 200;
let imageInput = document.getElementById("imageInput");
imageInput.addEventListener("change", (event) => {
  let imageFile = event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(imageFile);

  reader.onload = (e) => {
    let imageUrl = e.target.result;
    let newImageEl = document.createElement("img");
    newImageEl.src = imageUrl;

    newImageEl.onload = (e) => {
      let canvas = document.createElement("canvas");
      let ratio = WIDTH / e.target.width;
      canvas.width = WIDTH;
      canvas.height = e.target.height * ratio;
      const context = canvas.getContext("2d");
      context.drawImage(newImageEl, 0, 0, canvas.width, canvas.height);
      let newImageUrl = context.canvas.toDataURL("image/jpg", 80);

      let newImage = document.createElement("img");
      newImage.src = newImageUrl;
      document.getElementById("imageWrapper").appendChild(newImage);
    };
  };
});
