# Batch update CSS references in HTML files

# Get all HTML files that reference sy.css
$files = @(
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\news_past.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\news_audit.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\notice_job_fair.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\notice_teacher_award.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\news_detail.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\news_internet_plus.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\news_math_contest.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\news_media.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\news_photos.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\news_safety.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\news_videos.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\notice_holiday.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\news\notice_library_hours.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\alumni\alumni.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\campus\activities.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\campus\art_show.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\campus\clubs.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\research\journals.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\research\research_projects.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\research\teams.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\research\achievements.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\admissions\admission_guide.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\admissions\apply_guide.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\admissions\employment.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\admissions\graduates.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\departments\dept_art.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\departments\dept_engineering.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\departments\dept_literature.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\departments\dept_science.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\about\history.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\about\honors.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\about\leaders.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\contact.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\search_result.html",
"e:\Files\Study\subjects\下半学期\web前端开发设计\课设\成果\hf2\pages\login.html"
)

# Loop through each file and update CSS reference
foreach ($file in $files) {
    Write-Host "Processing $file"
    
    # Read file content
    $content = Get-Content -Path $file -Raw
    
    # Determine the relative path prefix based on file location
    $prefix = ""
    if ($file -like "*\pages\about\*" -or $file -like "*\pages\news\*" -or $file -like "*\pages\admissions\*" -or $file -like "*\pages\alumni\*" -or $file -like "*\pages\campus\*" -or $file -like "*\pages\departments\*" -or $file -like "*\pages\research\*") {
        $prefix = "../.."
    } elseif ($file -like "*\pages\*" -and $file -notlike "*\pages\*\*") {
        $prefix = ".."
    }
    
    # Update CSS reference
    $content = $content -replace 'href="sy.css"', "href=`"$prefix/assets/css/main.css`""
    
    # Update JS reference
    $content = $content -replace 'src="sy.js"', "src=`"$prefix/assets/js/main.js`""
    
    # Save updated content
    Set-Content -Path $file -Value $content -Force
    
    Write-Host "Updated $file"
}

Write-Host "All files updated successfully!"