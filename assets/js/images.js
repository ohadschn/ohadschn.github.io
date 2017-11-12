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