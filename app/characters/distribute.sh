#!/bin/bash

SOURCE_DIR="tokai_teio"
SOURCE_NAME="tokai_teio" # The base name used inside the files

if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source folder '$SOURCE_DIR' not found."
    exit 1
fi

for dir in */; do
    target_name="${dir%/}"

    if [ "$target_name" == "$SOURCE_DIR" ] || [[ "$target_name" == .* ]]; then
        continue
    fi

    # 1. Copy CSS and JS normally
    cp "$SOURCE_DIR/$SOURCE_NAME.css" "$target_name/$target_name.css" 2>/dev/null
    cp "$SOURCE_DIR/$SOURCE_NAME.js" "$target_name/$target_name.js" 2>/dev/null

    # 2. Copy HTML and update references using sed
    # This searches for 'tokai_teio' and replaces it with the target folder name
    if [ -f "$SOURCE_DIR/$SOURCE_NAME.html" ]; then
        sed "s/$SOURCE_NAME/$target_name/g" "$SOURCE_DIR/$SOURCE_NAME.html" > "$target_name/$target_name.html"
    fi

    echo "✅ Processed $target_name (Files copied & HTML updated)"
done

echo "Done! All references have been updated."