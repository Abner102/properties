from PIL import Image
path = r'C:\Users\HP\Desktop\properties\public\favicon-64x64.png'
im = Image.open(path).convert('RGBA')
print('mode', im.mode, 'size', im.size)
coords = [(0,0),(0,63),(63,0),(63,63),(32,32),(10,10),(50,50)]
for c in coords:
    print(c, im.getpixel(c))
RGBA = list(im.getdata())
print('transparent count', sum(1 for p in RGBA if p[3] == 0), 'of', len(RGBA))

# Check a few random pixels
for y in [0, 15, 31, 47, 63]:
    row = [im.getpixel((x, y)) for x in [0, 31, 63]]
    print('row', y, row)
