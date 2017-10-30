var cl = cloudinary.Cloudinary.new({cloud_name: "ohad188"});

$heroDiv = $('<div class="page__hero"></div>')
$heroDiv.insertAfter(".masthead");
$heroDiv.append(cl.image("sergei-akulich-39911-cropped_navwyr", 
{ 
    width: "auto", 
    dpr: "auto", 
    responsive: "true",
    crop: "scale", 
    responsive_placeholder: "blank"
}));
$heroDiv.find("img").addClass("page__hero-image");

cl.responsive();