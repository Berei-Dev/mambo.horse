#!/bin/bash

# Loop through every item in the current directory
for dir in */; do
    # Remove the trailing slash from the directory name
    dir_name="${dir%/}"
    
    # Check if it is actually a directory
    if [ -d "$dir_name" ]; then
        echo "Processing folder: $dir_name"
        
        # Create the HTML file with a basic template
        cat <<EOF > "$dir_name/$dir_name.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$dir_name</title>
    <link rel="stylesheet" href="$dir_name.css">
</head>
<body>
    <h1>Character: $dir_name</h1>
</body>
</html>
EOF

        # Create the CSS file with a basic placeholder
        cat <<EOF > "$dir_name/$dir_name.css"
/* Styles for $dir_name */
body {
    background-color: #0b0d12;
    color: white;
    font-family: sans-serif;
}
EOF

    fi
done

echo "Finished generating files!"
