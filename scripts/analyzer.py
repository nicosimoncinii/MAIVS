import sys
import json
import urllib.request
import urllib.parse
import re
import os
from html.parser import HTMLParser
from dotenv import load_dotenv

# Load env variables (useful for GEMINI_API_KEY)
load_dotenv()

# Import Gemini SDK
try:
    import google.generativeai as genai
except ImportError:
    genai = None

class AdvancedHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_content = []
        self.headings = {'h1': 0, 'h2': 0, 'h3': 0}
        self.title = ""
        self.meta_description = ""
        self.has_viewport = False
        self.schema_org_data = []
        
        self.current_tag = None
        self.in_script = False
        self.script_type = ""
        self.script_content = []
        
    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attrs_dict = dict(attrs)
        
        if tag in self.headings:
            self.headings[tag] += 1
            
        if tag == "meta":
            name = attrs_dict.get("name", "").lower()
            if name == "description":
                self.meta_description = attrs_dict.get("content", "")
            elif name == "viewport":
                self.has_viewport = True
                
        if tag == "script":
            self.in_script = True
            self.script_type = attrs_dict.get("type", "").lower()
            self.script_content = []
            
    def handle_endtag(self, tag):
        if tag == "script":
            self.in_script = False
            if "application/ld+json" in self.script_type:
                content = "".join(self.script_content)
                try:
                    data = json.loads(content)
                    if isinstance(data, list):
                        self.schema_org_data.extend(data)
                    else:
                        self.schema_org_data.append(data)
                except:
                    pass
            self.script_type = ""
            
        self.current_tag = None
        
    def handle_data(self, data):
        text = data.strip()
        if not text: return
        
        if self.in_script:
            self.script_content.append(text)
        else:
            if self.current_tag == "title":
                self.title = text
            elif self.current_tag not in ["style", "noscript"]:
                self.text_content.append(text)

def get_real_competitors(query):
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    domains = []
    try:
        res = urllib.request.urlopen(req, timeout=5)
        html = res.read().decode('utf-8')
        links = re.findall(r'href="//duckduckgo\.com/l/\?uddg=([^"]+)"', html)
        
        for l in links:
            decoded = urllib.parse.unquote(l)
            if "http" in decoded:
                domain = decoded.split('/')[2]
                domain = domain.replace('www.', '')
                if domain not in domains and 'google' not in domain and 'facebook' not in domain:
                    domains.append(domain)
            if len(domains) >= 3:
                break
    except Exception:
        pass
        
    if not domains:
        domains = ["miodottore.it", "clinica-concorrente.it", "centro-medico-locale.com"]
    return domains

def extract_clinic_type(text):
    types = {
        'odontoiatri': 'odontoiatrica',
        'dentist': 'odontoiatrica',
        'estetica': 'di medicina estetica',
        'plastica': 'di chirurgia plastica',
        'ortopedi': 'ortopedica',
        'fisioterapi': 'di fisioterapia',
        'cardiologi': 'cardiologica',
        'oculisti': 'oculistica',
        'veterinari': 'veterinaria',
        'dermatologi': 'dermatologica'
    }
    for k, v in types.items():
        if k in text:
            return v
    return "medica"

def extract_city(text):
    cities = ['roma', 'milano', 'napoli', 'torino', 'palermo', 'genova', 'bologna', 'firenze', 'bari', 'catania', 'venezia', 'verona', 'messina', 'padova', 'trieste', 'brescia', 'parma', 'taranto', 'prato', 'modena', 'reggio calabria', 'reggio emilia', 'perugia', 'ravenna', 'livorno', 'cagliari', 'rimini', 'foggia', 'salerno', 'sassari', 'latina', 'giugliano', 'monza', 'bergamo', 'siracusa', 'pescara', 'trento', 'forli', 'vicenza', 'terni', 'bolzano', 'novara', 'piacenza', 'ancona', 'andria', 'udine', 'arezzo', 'cesena', 'lecce', 'pesaro', 'barletta', 'alessandria', 'la spezia', 'pistoia', 'pisa', 'lucca']
    words = re.findall(r'\b\w+\b', text)
    for w in words:
        if w in cities:
            return w.capitalize()
    return "in Italia"

def get_ai_analysis(full_text):
    """ Call Gemini API to extract rich insights """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or not genai:
        return None
        
    try:
        genai.configure(api_key=api_key)
        # Use a stable fast model
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""
Sei un esperto SEO per il settore medico e un analista web avanzato.
Analizza il testo sottostante estratto da una pagina web clinica.

RISPONDI ESATTAMENTE IN QUESTO FORMATO JSON VALIDO E NULL'ALTRO:
{{
  "clinic_type": "stringa (es. 'di chirurgia plastica', 'odontoiatrica')",
  "city": "stringa (città in cui opera, se non la trovi scrivi 'Italia')",
  "recommendations": [
    {{
      "category": "stringa (Categoria, es. 'SEO Locale' o 'Autorevolezza Scientifica')",
      "issue": "stringa breve (Qual è il problema principale di questo sito?)",
      "solution": "stringa lunga (Soluzione esecutiva ed estremamente dettagliata per un medico/sviluppatore su come risolverlo per compiacere le intelligenze artificiali. Sii specifico sui dati trovati.)"
    }},
    ... (inserisci ESATTAMENTE 3 raccomandazioni)
  ]
}}

Testo del sito:
{full_text[:6000]}
"""
        
        response = model.generate_content(prompt)
        # Pulisci il markdown
        out = response.text.replace('```json', '').replace('```', '').strip()
        data = json.loads(out)
        return data
    except Exception as e:
        return None

def analyze_url(url):
    if not url.startswith("http"):
        url = "https://" + url
        
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MAIVS-Bot/2.0'}
    )
    
    try:
        response = urllib.request.urlopen(req, timeout=12)
        html_bytes = response.read()
        html_content = html_bytes.decode('utf-8', errors='ignore')
    except Exception as e:
        return {
            "error": str(e),
            "score": 0,
            "status": "failed"
        }
        
    parser = AdvancedHTMLParser()
    parser.feed(html_content)
    
    full_text = " ".join(parser.text_content)
    full_text_lower = full_text.lower()
    word_count = len(full_text.split())
    
    # NLP BASE (Fallback)
    clinic_type = extract_clinic_type(full_text_lower)
    city = extract_city(full_text_lower)
    recommendations = []
    
    # ---------------------------
    # TENTATIVO DI CHIAMATA IA 
    # ---------------------------
    ai_data = get_ai_analysis(full_text)
    if ai_data:
        clinic_type = ai_data.get("clinic_type", clinic_type)
        city = ai_data.get("city", city)
        recommendations = ai_data.get("recommendations", [])
    
    # Fetch real competitors
    query_locale = f"clinica {clinic_type} {city}"
    query_generale = f"miglior clinica {clinic_type} in italia"
    
    competitors_locali = get_real_competitors(query_locale)
    competitors_generali = get_real_competitors(query_generale)
    
    # 1. Ricerca Locale
    local_score = 0
    has_piva = bool(re.search(r'(p\.?iva|partita\s*iva|vat\s*number)\s*:?\s*\d{11}', full_text_lower))
    has_address = bool(re.search(r'\b(via|piazza|corso|viale|strada|largo)\b', full_text_lower))
    has_phone = bool(re.search(r'(\+39|0\d{1,3})[\s\-]?\d{3,8}', full_text_lower))
    
    schema_types = []
    for schema in parser.schema_org_data:
        schema_type = schema.get('@type', '')
        if isinstance(schema_type, list):
            schema_types.extend(schema_type)
        elif isinstance(schema_type, str):
            schema_types.append(schema_type)
    
    has_local_schema = any(t in schema_types for t in ['LocalBusiness', 'MedicalClinic', 'Physician', 'Dentist', 'Hospital', 'Organization'])
    
    if has_piva: local_score += 20
    if has_address: local_score += 30
    if has_phone: local_score += 20
    if has_local_schema: local_score += 30
    
    # 2. Ricerca Generale
    general_score = 0
    
    if word_count > 800: general_score += 30
    elif word_count > 400: general_score += 15
    elif word_count > 150: general_score += 5
    
    if parser.title and len(parser.title) > 10: general_score += 15
    if parser.meta_description and len(parser.meta_description) > 50: general_score += 15
    
    if parser.headings['h1'] == 1: general_score += 15
    elif parser.headings['h1'] > 1: general_score += 5
    
    if parser.headings['h2'] >= 2: general_score += 15
    
    if parser.has_viewport: general_score += 10
    
    medical_keywords = ['clinica', 'medico', 'terapia', 'pazienti', 'salute', 'trattamento', 'specialista', 'visita', 'patologia', 'diagnosi', 'cura', 'sintomi', 'intervento']
    found_keywords = [kw for kw in medical_keywords if kw in full_text_lower]
    
    total_score = int((local_score * 0.4) + (general_score * 0.6))
    
    # Fallback recommendations if AI failed or API key not set
    if not recommendations:
        if not has_local_schema:
            recommendations.append({
                "category": "SEO Locale",
                "issue": "Dati Strutturati Assenti",
                "solution": "Aggiungi uno script JSON-LD (Schema.org) di tipo 'MedicalClinic'."
            })
        if word_count < 500:
            recommendations.append({
                "category": "Testi",
                "issue": "Testo Insufficiente",
                "solution": "Aumenta la densità di testo a >800 parole per soddisfare i bot."
            })
        if parser.headings['h1'] != 1:
            recommendations.append({
                "category": "Struttura",
                "issue": "Tag H1 multipli/assenti",
                "solution": "Usa esattamente un tag H1."
            })
        if not recommendations:
             recommendations.append({
                "category": "Ottimo Lavoro",
                "issue": "Nessun errore grave",
                "solution": "Inserisci la chiave API Gemini per scoprire errori semantici profondi."
            })
            
    # Combina competitor
    top_competitors = []
    if competitors_locali: top_competitors.append(competitors_locali[0])
    if competitors_generali: top_competitors.append(competitors_generali[0])
    if len(competitors_locali) > 1: top_competitors.append(competitors_locali[1])
    
    while len(top_competitors) < 3:
        top_competitors.append("miodottore.it")
    top_competitors = list(dict.fromkeys(top_competitors))[:3]
    
    result = {
        "status": "success",
        "url": url,
        "score": total_score,
        "metrics": {
            "locale": local_score,
            "generale": general_score,
            "parole": word_count
        },
        "details": {
            "title": bool(parser.title),
            "meta_desc": bool(parser.meta_description),
            "h1_count": parser.headings['h1'],
            "h2_count": parser.headings['h2'],
            "has_piva": has_piva,
            "has_schema": has_local_schema,
            "medical_keywords_found": len(found_keywords),
            "clinic_type_detected": clinic_type,
            "city_detected": city
        },
        "competitors": [
            [top_competitors[0], f"Locale ({city})"],
            [top_competitors[1] if len(top_competitors) > 1 else top_competitors[0], "Generale"],
            [top_competitors[2] if len(top_competitors) > 2 else top_competitors[0], "Visibilità Forte"]
        ],
        "recommendations": recommendations[:3],
        "ai_powered": bool(ai_data)
    }
    
    return result

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "URL missing"}))
        sys.exit(1)
        
    target_url = sys.argv[1]
    analysis = analyze_url(target_url)
    print(json.dumps(analysis))
