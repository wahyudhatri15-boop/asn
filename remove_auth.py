import os
import glob
import re

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the login button
    content = re.sub(r'<a href="login\.html" class="auth-login-btn[^>]+>Log In</a>', '', content)
    
    # Remove the profile picture block (the div and its contents up to the closing div)
    # The profile pic div has class auth-profile-pic
    # We will use regex to find <div class="auth-profile-pic.*?</div>
    # Because there's an <img> inside, it's safer to match until the FIRST </div> after the <img>
    content = re.sub(r'<div class="auth-profile-pic[^>]+>\s*<img[^>]+>\s*</div>', '', content, flags=re.DOTALL)
    
    # Also clean up any extra JS related to updateUIState displaying the auth button
    # Actually it's harmless if left, but we can just leave it.

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done")
