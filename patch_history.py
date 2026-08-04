import re

with open('history.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace Headers
content = content.replace(
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Tanggal Mengerjakan</th>',
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Tanggal</th>'
)
content = content.replace(
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Arena Battle</th>',
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Kategori Test</th>'
)
content = content.replace(
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor Akhir</th>\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>',
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>'
)
content = content.replace(
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor Akhir</th>\r\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>',
    '<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Skor</th>\r\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Batas Lulus</th>\r\n<th class="px-8 py-5 font-label-caps text-primary uppercase tracking-[0.15em] text-[11px] font-black">Status Kelulusan</th>'
)

# 2. Replace time spans with icon
def replace_time(match):
    hh = match.group(1)
    mm = match.group(2)
    hour = int(hh)
    
    icon = 'light_mode'
    if 11 <= hour < 15:
        icon = 'partly_cloudy_day'
    elif 15 <= hour < 18:
        icon = 'brightness_high'
    elif hour >= 18 or hour < 4:
        icon = 'dark_mode'
        
    return f"""<div class="flex items-center gap-1 text-label-tiny text-primary mt-1 font-bold">
<span class="material-symbols-outlined text-[14px]">{icon}</span>
<span>{hh}:{mm} WIB</span>
</div>"""

content = re.sub(r'<span class="text-label-tiny text-primary mt-1 font-bold">(\d{2}):(\d{2}) WIB</span>', replace_time, content)

# 3. Add batas lulus column
def replace_row(match):
    row = match.group(0)
    
    batas_lulus = 80
    if 'TIU - Intelegensia' in row:
        batas_lulus = 80
    elif 'TWK - Kebangsaan' in row:
        batas_lulus = 65
    elif 'TKP - Karakteristik' in row:
        batas_lulus = 166
        
    batas_lulus_col = f'\\n<td class="px-8 py-6">\\n<span class="font-title-md text-on-surface font-bold">{batas_lulus}</span>\\n</td>\\n'
    # Need to remove the literal backslashes if I'm not using raw strings in Python, but wait, f-string with \n is fine:
    batas_lulus_col = f'\n<td class="px-8 py-6">\n<span class="font-title-md text-on-surface font-bold">{batas_lulus}</span>\n</td>\n'
    
    # Inject before status kelulusan 
    # Find '<td class="px-8 py-6">\n<span class="font-label-caps flex items-center gap-2 text-'
    # Or without newline
    return re.sub(r'<td class="px-8 py-6">\s*<span class="font-label-caps flex items-center gap-2 text-(green-400|error)', 
                  lambda m: batas_lulus_col + m.group(0), row)

content = re.sub(r'<tr class="hover:bg-primary/5 transition-colors group">.*?</tr>', replace_row, content, flags=re.DOTALL)

with open('history.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("done")
