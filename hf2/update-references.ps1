# Batch update resource references in HTML files

# Set root directory
$rootDir = "E:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path "$rootDir\pages" -Recurse -Filter *.html

# Loop through all HTML files
foreach ($file in $htmlFiles) {
    Write-Host "Processing file: $($file.FullName)"
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Determine file directory depth
    $depth = ($file.DirectoryName -split "\\").Count - ($rootDir -split "\\").Count
    
    # Determine relative path prefix based on depth
    $prefix = "" 
    if ($depth -eq 1) {
        $prefix = ".."
    } elseif ($depth -eq 2) {
        $prefix = "../.."
    }
    
    # Update CSS references
    $content = $content -replace 'href="sy.css"', "href=`"$prefix/assets/css/main.css`""
    
    # Update JS references
    $content = $content -replace 'src="sy.js"', "src=`"$prefix/assets/js/main.js`""
    
    # Update banner image references
    $content = $content -replace 'src="hf1.jpg"', "src=`"$prefix/assets/images/banners/hf1.jpg`""
    $content = $content -replace 'src="hf2.jpg"', "src=`"$prefix/assets/images/banners/hf2.jpg`""
    $content = $content -replace 'src="hf3.jpg"', "src=`"$prefix/assets/images/banners/hf3.jpg`""
    $content = $content -replace 'src="hf4.jpg"', "src=`"$prefix/assets/images/banners/hf4.jpg`""
    
    # Update news image references
    $content = $content -replace 'src="hy.jpg"', "src=`"$prefix/assets/images/news/hy.jpg`""
    
    # Save updated content
    Set-Content -Path $file.FullName -Value $content -Force
    
    Write-Host "File processed: $($file.FullName)"
}

Write-Host "All HTML files updated successfully!"