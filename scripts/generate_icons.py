import os
from PIL import Image, ImageDraw, ImageFont

public_dir = '/root/ca-inter-prep/public'
dist_dir = '/root/ca-inter-prep/dist'
os.makedirs(public_dir, exist_ok=True)
os.makedirs(dist_dir, exist_ok=True)

def create_app_icon(size, is_maskable=False):
    # Create image with deep navy background
    img = Image.new('RGBA', (size, size), (11, 37, 69, 255))
    draw = ImageDraw.Draw(img)

    # Gradient-like rounded rect or circle in center
    margin = int(size * 0.12) if is_maskable else int(size * 0.05)
    inner_box = [margin, margin, size - margin, size - margin]
    
    # Rounded badge background
    corner_radius = int(size * 0.22)
    draw.rounded_rectangle(inner_box, radius=corner_radius, fill=(19, 64, 116, 255), outline=(212, 175, 55, 255), width=max(2, int(size * 0.02)))
    
    # Draw decorative elements (Scales / CA monogram)
    center_x = size // 2
    center_y = int(size * 0.44)

    # Draw golden scales balance bar
    bar_width = int(size * 0.45)
    bar_thick = max(3, int(size * 0.025))
    draw.rectangle([center_x - bar_width//2, center_y - bar_thick//2, center_x + bar_width//2, center_y + bar_thick//2], fill=(212, 175, 55, 255))
    
    # Center pillar
    pillar_top = center_y - int(size * 0.08)
    pillar_bottom = center_y + int(size * 0.18)
    pillar_w = max(3, int(size * 0.025))
    draw.rectangle([center_x - pillar_w//2, pillar_top, center_x + pillar_w//2, pillar_bottom], fill=(212, 175, 55, 255))
    
    # Scale pans
    left_x = center_x - bar_width//2
    right_x = center_x + bar_width//2
    pan_y = center_y + int(size * 0.08)
    pan_w = int(size * 0.12)
    pan_h = int(size * 0.04)

    # Left pan strings and bowl
    draw.line([left_x, center_y, left_x, pan_y], fill=(212, 175, 55, 255), width=max(1, int(size * 0.012)))
    draw.arc([left_x - pan_w//2, pan_y - pan_h, left_x + pan_w//2, pan_y + pan_h], 0, 180, fill=(212, 175, 55, 255), width=max(2, int(size * 0.02)))

    # Right pan strings and bowl
    draw.line([right_x, center_y, right_x, pan_y], fill=(212, 175, 55, 255), width=max(1, int(size * 0.012)))
    draw.arc([right_x - pan_w//2, pan_y - pan_h, right_x + pan_w//2, pan_y + pan_h], 0, 180, fill=(212, 175, 55, 255), width=max(2, int(size * 0.02)))

    # Draw bottom text "CA INTER"
    # Basic shapes for CA badge
    badge_y = int(size * 0.72)
    badge_w = int(size * 0.55)
    badge_h = int(size * 0.14)
    draw.rounded_rectangle([center_x - badge_w//2, badge_y, center_x + badge_w//2, badge_y + badge_h], radius=int(size * 0.04), fill=(30, 96, 145, 255), outline=(245, 158, 11, 255), width=max(1, int(size * 0.015)))

    # Try to draw text if default font allows, or clean geometric letters
    try:
        font_size = max(12, int(size * 0.09))
        font = ImageFont.load_default()
        # Draw "CA INTER"
        draw.text((center_x, badge_y + badge_h//2), "CA INTER", fill=(255, 255, 255, 255), anchor="mm")
    except Exception:
        pass

    return img

sizes = [
    (192, 'icon-192.png', False),
    (512, 'icon-512.png', False),
    (192, 'icon-maskable-192.png', True),
    (512, 'icon-maskable-512.png', True),
    (180, 'apple-touch-icon.png', False),
    (32, 'favicon-32.png', False)
]

for s, filename, is_m in sizes:
    icon = create_app_icon(s, is_m)
    p_path = os.path.join(public_dir, filename)
    d_path = os.path.join(dist_dir, filename)
    icon.save(p_path, 'PNG')
    icon.save(d_path, 'PNG')
    print(f"Generated {filename} ({s}x{s})")

print("All PWA icons generated successfully!")
