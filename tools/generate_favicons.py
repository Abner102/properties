from PIL import Image, ImageOps
import os

SRC = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'logo.jpeg')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public')

sizes = {
    'favicon-16x16.png': (16,16),
    'favicon-32x32.png': (32,32),
    'favicon-64x64.png': (64,64),
    'favicon-navbar.png': (128,128),
    'favicon-192x192.png': (192,192),
    'favicon-512x512.png': (512,512),
    'apple-touch-icon.png': (180,180),
}

os.makedirs(OUT, exist_ok=True)

im = Image.open(SRC).convert('RGBA')

# remove the black background connected to the image borders, preserving dark logo details
from PIL import ImageDraw

def remove_edge_black_background(image, threshold=40):
    image = image.convert('RGBA')
    pixels = image.load()
    width, height = image.size
    visited = [[False] * height for _ in range(width)]
    queue = []

    def is_black(px):
        r, g, b, a = px
        return a != 0 and r < threshold and g < threshold and b < threshold

    for x in range(width):
        for y in (0, height - 1):
            if not visited[x][y] and is_black(pixels[x, y]):
                queue.append((x, y))
                visited[x][y] = True
    for y in range(height):
        for x in (0, width - 1):
            if not visited[x][y] and is_black(pixels[x, y]):
                queue.append((x, y))
                visited[x][y] = True

    while queue:
        x, y = queue.pop()
        pixels[x, y] = (255, 255, 255, 0)
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny] and is_black(pixels[nx, ny]):
                visited[nx][ny] = True
                queue.append((nx, ny))
    return image

im = remove_edge_black_background(im)
transparent_logo_path = os.path.join(OUT, 'images', 'logo-transparent.png')
im.save(transparent_logo_path, format='PNG')
print('Wrote', transparent_logo_path)
navbar_logo = im.crop(im.getbbox()) if im.getbbox() else im
navbar_logo_path = os.path.join(OUT, 'images', 'logo-navbar-transparent.png')
navbar_logo.save(navbar_logo_path, format='PNG')
print('Wrote', navbar_logo_path)

def crop_to_content(image):
    bg = Image.new('RGBA', image.size, (255, 255, 255, 0))
    bbox = image.getbbox()
    if bbox:
        return image.crop(bbox)
    return image


def make_circle(image, size, clean=False):
    if clean:
        image = remove_edge_black_background(image)
    cropped = crop_to_content(image)
    image = ImageOps.fit(cropped, size, centering=(0.5,0.5))
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size[0], size[1]), fill=255)
    out = Image.new('RGBA', size, (255, 255, 255, 0))
    out.paste(image, (0, 0), mask=mask)
    return out

for name, size in sizes.items():
    clean = name == 'favicon-navbar.png'
    out_im = make_circle(im, size, clean=clean)
    out_path = os.path.join(OUT, name)
    out_im.save(out_path, format='PNG')
    print('Wrote', out_path)

# create favicon.ico from 16 and 32
ico_path = os.path.join(OUT, 'favicon.ico')
icons = []
for name in ['favicon-16x16.png','favicon-32x32.png','favicon-32x32.png']:
    icons.append(Image.open(os.path.join(OUT, name)))
icons[0].save(ico_path, format='ICO', sizes=[(16,16),(32,32)])
print('Wrote', ico_path)

# save a svg fallback by embedding PNG as data (simple approach)
svg_path = os.path.join(OUT, 'favicon.svg')
png_512 = os.path.join(OUT, 'favicon-512x512.png')
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <image href="favicon-512x512.png" height="512" width="512"/>
</svg>'''
with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)
print('Wrote', svg_path)
