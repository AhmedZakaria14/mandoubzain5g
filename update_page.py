import os

file_path = 'mandoub1/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Phone Numbers
content = content.replace('0572587855', '0537394981')
content = content.replace('966572587855', '966537394981')

# 2. Fix Paths (Change ./ to ../ for assets)
# We need to be careful not to break links like ./img/logo.webp
# Actually, since it's a static site, it's safer to use absolute paths from root or ../
content = content.replace('href="./', 'href="../')
content = content.replace('src="./', 'src="../')

# 3. Update SEO
# Canonical URL
content = content.replace('<link rel="canonical" href="https://mandoubzain5g.com/">', 
                         '<link rel="canonical" href="https://mandoubzain5g.com/mandoub1">')

# Title and Meta Description (Minor improvements for uniqueness)
content = content.replace('<title>مندوب زين فى الرياض | باقات 5G وفايبر بأفضل الأسعار</title>', 
                         '<title>مندوب زين الرياض - عروض باقات 5G وفايبر 0537394981</title>')
content = content.replace('مندوب زين المعتمد في الرياض. باقات إنترنت 5G وألياف بصرية تبدأ من 239 ريال، راوتر مجاني، تركيب فوري، وتغطية شاملة لكافة أحياء الرياض. اتصل الآن!',
                         'احصل على أفضل عروض زين 5G وفايبر في الرياض مع المندوب المباشر 0537394981. تركيب فوري، راوتر مجاني، وتغطية ممتازة لكافة أحياء الرياض.')

# Update Schema.org URL
content = content.replace('"url": "https://mandoubzain5g.com/"', '"url": "https://mandoubzain5g.com/mandoub1"')

# Update Open Graph
content = content.replace('property="og:url" content="https://mandoubzain5g.com/"', 'property="og:url" content="https://mandoubzain5g.com/mandoub1"')

# 4. Add some SEO keywords specifically for this page
if '</head>' in content:
    seo_tags = '\n    <meta name="keywords" content="مندوب زين الرياض، رقم مندوب زين، اشتراك زين 5G، عروض زين فايبر الرياض، مندوب زين 0537394981">\n'
    content = content.replace('</head>', seo_tags + '</head>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Page updated successfully.")
