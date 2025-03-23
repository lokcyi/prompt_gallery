import os
import re

def contains_korean(text):
    # Regular expression to detect Hangul characters
    korean_pattern = re.compile(r'[\uac00-\ud7af]')
    return bool(korean_pattern.search(text))

def find_korean_in_md_files(directory, output_file):
    with open(output_file, "w", encoding="utf-8") as outfile:
        for root, _, files in os.walk(directory):
            for file in files:
                if file.endswith(".md"):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            content = f.read()
                            if contains_korean(content):
                                outfile.write(file_path + "\\n")
                                print(f"Korean characters found in: {file_path}")
                    except Exception as e:
                        print(f"Error reading {file_path}: {e}")

if __name__ == "__main__":
    current_directory = "."  # Start from the current directory
    output_file = "korean_files.txt"
    find_korean_in_md_files(current_directory, output_file)
