var cl = cloudinary.Cloudinary.new({cloud_name: "ohad188"});
$('<div class="page__hero"></div>').insertAfter(".masthead");
$(".page__hero").append(cl.image("sergei-akulich-39911-cropped_navwyr", 
{ 
    width: "auto", 
    dpr: "auto", 
    responsive: "true",
    crop: "scale", 
    responsive_placeholder: "blank",
    class: "cld-responsive page__hero-image"
}));
cl.responsive();