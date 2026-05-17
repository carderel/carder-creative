import urllib.request
import urllib.parse
import json
import re
from html.parser import HTMLParser

class AIVisibilityHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_script = False
        self.script_type = None
        self.json_ld_blocks = []
        self.text_content = []
        self.headers = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'script' and attrs_dict.get('type') == 'application/ld+json':
            self.in_script = True
        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.headers.append(tag)

    def handle_data(self, data):
        if self.in_script:
            self.json_ld_blocks.append(data)
        self.text_content.append(data)

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_script = False

class OnPageAIWorker:
    def __init__(self, url):
        self.url = url
        self.base_url = self._get_base_url(url)
        self.report = {
            "url": url,
            "find": {},
            "understand": {},
            "recommend": {}
        }
        self.user_agent = 'Mozilla/5.0 (AI-Visibility-Audit-Bot/1.0)'

    def _get_base_url(self, url):
        parsed = urllib.parse.urlparse(url)
        return f"{parsed.scheme}://{parsed.netloc}"

    def _fetch(self, url, head=False):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': self.user_agent}, method='HEAD' if head else 'GET')
            with urllib.request.urlopen(req, timeout=10) as response:
                if head:
                    return response.status == 200
                return response.read().decode('utf-8', errors='ignore')
        except:
            return None

    def run_audit(self):
        print(f"Starting AI Visibility Audit for: {self.url}...")
        
        # 1. FIND Layer
        self.report["find"]["llms_txt"] = self.check_llms_txt()
        self.report["find"]["robots_txt"] = self.check_robots_txt()
        
        # Fetch page content
        html = self._fetch(self.url)
        if html:
            parser = AIVisibilityHTMLParser()
            parser.feed(html)
            
            # 2. UNDERSTAND Layer
            self.report["understand"]["schema_present"] = self.extract_schema(parser.json_ld_blocks)
            self.report["understand"]["factual_density"] = {
                "text_length": len(" ".join(parser.text_content)),
                "headers": list(set(parser.headers)),
                "status": "manual_review_required"
            }
            
            # 3. RECOMMEND Layer
            self.report["recommend"]["proof_points"] = self.check_proof_points(" ".join(parser.text_content))
        else:
            self.report["error"] = "Failed to fetch page content."

        return self.report

    def check_llms_txt(self):
        target = f"{self.base_url}/llms.txt"
        return self._fetch(target, head=True) is True

    def check_robots_txt(self):
        target = f"{self.base_url}/robots.txt"
        ai_agents = ["GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended"]
        results = {}
        content = self._fetch(target)
        if content:
            content_lower = content.lower()
            for agent in ai_agents:
                results[agent] = "allowed" if f"user-agent: {agent.lower()}" in content_lower else "not explicitly mentioned"
            return results
        return "robots.txt not found or inaccessible"

    def extract_schema(self, blocks):
        found_types = []
        for block in blocks:
            try:
                data = json.loads(block)
                if isinstance(data, dict):
                    found_types.append(data.get("@type"))
                elif isinstance(data, list):
                    for item in data:
                        found_types.append(item.get("@type"))
            except:
                continue
        return list(set([t for t in found_types if t]))

    def check_proof_points(self, text):
        keywords = ["case study", "testimonial", "review", "trustpilot", "clutch", "award"]
        found = []
        text_lower = text.lower()
        for kw in keywords:
            if kw in text_lower:
                found.append(kw)
        return found

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python3 on_page_checker.py <url>")
    else:
        url = sys.argv[1]
        if not url.startswith("http"):
            url = "https://" + url
        worker = OnPageAIWorker(url)
        results = worker.run_audit()
        print(json.dumps(results, indent=2))
