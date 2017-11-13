$( document ).ready(function() {
    var cl = cloudinary.Cloudinary.new({cloud_name: "ohad188"});
    var img = cl.image("sergei-akulich-39911-cropped_navwyr", 
    { 
        width: "auto", 
        dpr: "auto", 
        responsive: "true",
        crop: "scale", 
        responsive_placeholder: "blank",
        className: "page__hero-image"
    });
    
    $heroDiv = $('<div class="page__hero"></div>');
    $heroDiv.append(img);
    $heroDiv.insertAfter(".masthead");
    
    cl.responsive();

    $(".page__footer-copyright").append(' Header photo by <a href="https://unsplash.com/photos/ZNkvxIPPVeE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sergei Akulich</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.');
});