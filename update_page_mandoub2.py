import os

file_path = 'mandoub2/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Phone Numbers
content = content.replace('0508348048', '0545478583')
content = content.replace('966508348048', '966545478583')

# 2. Fix Paths (Change ./ to ../ for assets)
content = content.replace('href="./', 'href="../')
content = content.replace('src="./', 'src="../')

# 3. Update SEO
# Canonical URL
content = content.replace('<link rel="canonical" href="https://mandoubzain5g.com/">', 
                         '<link rel="canonical" href="https://mandoubzain5g.com/mandoub2">')

# Title and Meta Description (Minor improvements for uniqueness)
content = content.replace('<title>مندوب زين فى الرياض | باقات 5G وفايبر بأفضل الأسعار</title>', 
                         '<title>مندوب زين الرياض - باقات 5G وفايبر منزلي 0545478583</title>')
content = content.replace('مندوب زين المعتمد في الرياض. باقات إنترنت 5G وألياف بصرية تبدأ من 239 ريال، راوتر مجاني، تركيب فوري، وتغطية شاملة لكافة أحياء الرياض. اتصل الآن!',
                         'مندوب زين معتمد في الرياض يقدم باقات إنترنت 5G والفايبر المنزلي برقم 0545478583. تركيب فوري، راوتر مجاني، وأسعار تنافسية لجميع الأحياء.')

# Update Schema.org URL
content = content.replace('"url": "https://mandoubzain5g.com/"', '"url": "https://mandoubzain5g.com/mandoub2"')

# Update Open Graph
content = content.replace('property="og:url" content="https://mandoubzain5g.com/"', 'property="og:url" content="https://mandoubzain5g.com/mandoub2"')

# 4. Add some SEO keywords specifically for this page
if '</head>' in content:
    seo_tags = '\n    <meta name="keywords" content="مندوب زين، عروض زين 5G، باقات فايبر الرياض، اشتراك إنترنت منزلي، مندوب زين 0545478583">\n'
    content = content.replace('</head>', seo_tags + '</head>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Page mandoub2 updated successfully.")
