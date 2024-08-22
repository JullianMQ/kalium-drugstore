const path = "./../images/";
const image_array = ["pharmacist.jpg", "pharmacist_showing.jpg", "health_drugs.jpg"];

let index = 0;

const updateImage = () => {
    const carouselImage = $("#carousel-image");
    carouselImage.removeClass("show");
    setTimeout(() => {
        carouselImage.attr("src", `${path}${image_array[index]}`);
        carouselImage.addClass("show");
        index = (index + 1) % image_array.length;
    }, 500); 
};

const startCarousel = () => {
    updateImage();
    setInterval(updateImage, 3000); 
};

startCarousel();
