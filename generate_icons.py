#!/usr/bin/env python3
"""
Generate PWA icons for Smart Quiz
Creates 192x192 and 512x512 PNG icons
"""

from PIL import Image, ImageDraw, ImageFont
import math

def create_gradient(width, height, color1, color2):
    """Create a gradient background"""
    base = Image.new('RGB', (width, height), color1)
    top = Image.new('RGB', (width, height), color2)
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            mask_data.append(int(255 * (x + y) / (width + height)))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def draw_rounded_rectangle(draw, xy, corner_radius, fill=None, outline=None, width=1):
    """Draw a rounded rectangle"""
    x1, y1, x2, y2 = xy

    # Draw rounded rectangle using ellipses for corners
    draw.rectangle([x1 + corner_radius, y1, x2 - corner_radius, y2], fill=fill)
    draw.rectangle([x1, y1 + corner_radius, x2, y2 - corner_radius], fill=fill)

    # Corners
    draw.pieslice([x1, y1, x1 + corner_radius * 2, y1 + corner_radius * 2], 180, 270, fill=fill)
    draw.pieslice([x2 - corner_radius * 2, y1, x2, y1 + corner_radius * 2], 270, 360, fill=fill)
    draw.pieslice([x1, y2 - corner_radius * 2, x1 + corner_radius * 2, y2], 90, 180, fill=fill)
    draw.pieslice([x2 - corner_radius * 2, y2 - corner_radius * 2, x2, y2], 0, 90, fill=fill)

    if outline:
        # Draw outline
        draw.arc([x1, y1, x1 + corner_radius * 2, y1 + corner_radius * 2], 180, 270, fill=outline, width=width)
        draw.arc([x2 - corner_radius * 2, y1, x2, y1 + corner_radius * 2], 270, 360, fill=outline, width=width)
        draw.arc([x1, y2 - corner_radius * 2, x1 + corner_radius * 2, y2], 90, 180, fill=outline, width=width)
        draw.arc([x2 - corner_radius * 2, y2 - corner_radius * 2, x2, y2], 0, 90, fill=outline, width=width)

        draw.line([x1 + corner_radius, y1, x2 - corner_radius, y1], fill=outline, width=width)
        draw.line([x1 + corner_radius, y2, x2 - corner_radius, y2], fill=outline, width=width)
        draw.line([x1, y1 + corner_radius, x1, y2 - corner_radius], fill=outline, width=width)
        draw.line([x2, y1 + corner_radius, x2, y2 - corner_radius], fill=outline, width=width)

def create_icon(size):
    """Create a single icon of given size"""
    # Create gradient background
    img = create_gradient(size, size, (0, 113, 227), (88, 86, 214))  # #0071e3 to #5856d6

    # Create rounded corners for the whole image
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = int(size * 0.225)  # 22.5% radius
    mask_draw.rounded_rectangle([0, 0, size, size], corner_radius, fill=255)

    # Create output with alpha channel
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img, (0, 0), mask)

    draw = ImageDraw.Draw(output)

    # Draw book
    book_width = int(size * 0.4)
    book_height = int(size * 0.52)
    book_x = int(size * 0.3)
    book_y = int(size * 0.22)
    book_radius = int(size * 0.05)
    line_width = max(1, int(size * 0.03))

    # Book outline
    draw_rounded_rectangle(
        draw,
        [book_x, book_y, book_x + book_width, book_y + book_height],
        book_radius,
        outline='white',
        width=line_width
    )

    # Book spine (center line)
    center_x = book_x + book_width // 2
    draw.line([center_x, book_y, center_x, book_y + book_height], fill='white', width=line_width)

    # Add Japanese character あ
    try:
        # Try to use a Japanese font
        font_size = int(size * 0.25)
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc", font_size)
        except:
            try:
                font = ImageFont.truetype("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc", font_size)
            except:
                # Fallback to default
                font = ImageFont.load_default()

        text = "あ"
        # Calculate text position
        text_bbox = draw.textbbox((0, 0), text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]

        text_x = book_x + int(book_width * 0.75) - text_width // 2
        text_y = book_y + book_height // 2 - text_height // 2

        draw.text((text_x, text_y), text, fill='white', font=font)
    except Exception as e:
        print(f"Warning: Could not draw Japanese character: {e}")
        # Draw a simple placeholder instead
        draw.ellipse([book_x + int(book_width * 0.6), book_y + int(book_height * 0.35),
                     book_x + int(book_width * 0.9), book_y + int(book_height * 0.65)],
                    outline='white', width=line_width)

    # Quiz badge
    badge_radius = int(size * 0.09)
    badge_x = int(size * 0.78)
    badge_y = int(size * 0.27)

    # Green circle
    draw.ellipse(
        [badge_x - badge_radius, badge_y - badge_radius,
         badge_x + badge_radius, badge_y + badge_radius],
        fill=(52, 199, 89)  # #34c759
    )

    # Question mark
    try:
        q_font_size = int(size * 0.1)
        try:
            q_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", q_font_size)
        except:
            q_font = ImageFont.load_default()

        q_text = "?"
        q_bbox = draw.textbbox((0, 0), q_text, font=q_font)
        q_width = q_bbox[2] - q_bbox[0]
        q_height = q_bbox[3] - q_bbox[1]

        q_x = badge_x - q_width // 2
        q_y = badge_y - q_height // 2

        draw.text((q_x, q_y), q_text, fill='white', font=q_font)
    except:
        # Simple fallback
        draw.text((badge_x - 5, badge_y - 10), "?", fill='white')

    return output

# Generate both sizes
print("Generating 192x192 icon...")
icon_192 = create_icon(192)
icon_192.save('src/icon-192.png', 'PNG')
print("✅ Created src/icon-192.png")

print("Generating 512x512 icon...")
icon_512 = create_icon(512)
icon_512.save('src/icon-512.png', 'PNG')
print("✅ Created src/icon-512.png")

print("\n✨ Icons generated successfully!")
print("Next: git add src/icon-*.png && git commit && git push")
