let WIDTH = 200;
let imageQuality = 0.8;
let resizedImageUrl;
let imageInput = document.getElementById("imageInput");
let setWidth = document.getElementById("imgWidthInput");
let setImageQuality = document.getElementById("imgQuality");
setWidth.addEventListener("change", (e) => {
  WIDTH = e.target.value;
});
setImageQuality.addEventListener("change", (e) => {
  imageQuality = e.target.value;
});

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
      let newImageUrl = context.canvas.toDataURL("image/jpeg", imageQuality);

      let newImage = document.createElement("img");
      newImage.src = newImageUrl;
      resizedImageUrl = newImageUrl;
      document.getElementById("imageWrapper").appendChild(newImage);
    };
  };
});

const downloadButtonFunc = async () => {
  const image = await fetch(resizedImageUrl);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "resize_image.jpeg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
