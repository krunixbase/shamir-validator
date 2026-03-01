#!/usr/bin/env bash

HEADER="This file is part of Shamir Validator.
Copyright (C) 2026 Andrzej

Shamir Validator is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License version 3 as published
by the Free Software Foundation.

Shamir Validator is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Shamir Validator. If not, see <https://www.gnu.org/licenses/>.

"

# Extensions to process
EXTENSIONS=("py" "js" "ts")

add_header() {
    local file="$1"

    # Skip if header already exists
    if grep -q "Shamir Validator is free software" "$file"; then
        return
    fi

    # Handle shebang
    if head -n 1 "$file" | grep -q "^#!"; then
        local shebang
        shebang=$(head -n 1 "$file")
        tail -n +2 "$file" > "$file.tmp"
        printf "%s\n\n%s\n%s" "$shebang" "$HEADER" "$(cat "$file.tmp")" > "$file"
        rm "$file.tmp"
    else
        printf "%s\n%s" "$HEADER" "$(cat "$file")" > "$file"
    fi
}

export -f add_header
export HEADER

# Find and process files
for ext in "${EXTENSIONS[@]}"; do
    find . -type f -name "*.${ext}" -not -path "./.git/*" -not -path "./node_modules/*" \
        -exec bash -c 'add_header "$0"' {} \;
done

echo "License headers added where missing."

