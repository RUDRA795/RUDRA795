export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'ja';

export interface LanguageDictionary {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  translations: {
    heroTagline: string;
    heroSubtitle: string;
    exploreCTA: string;
    githubCTA: string;
    aboutTitle: string;
    aboutStatement: string;
    projectsTitle: string;
    projectsSubtitle: string;
    skillsTitle: string;
    skillsSubtitle: string;
    labTitle: string;
    labSubtitle: string;
    githubTitle: string;
    contactTitle: string;
    contactCTA: string;
    mindsetIntro: string;
  };
}

export const languagesData: Record<SupportedLanguage, LanguageDictionary> = {
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    translations: {
      heroTagline: "BUILDING INTELLIGENT SYSTEMS",
      heroSubtitle: "BETWEEN CODE, DATA & AI.",
      exploreCTA: "EXPLORE MY WORLD",
      githubCTA: "VIEW GITHUB",
      aboutTitle: "WHO I AM & WHAT I BUILD",
      aboutStatement: "Turning abstract algorithms into living digital architectures.",
      projectsTitle: "FEATURED ENGINEERING DISCOVERIES",
      projectsSubtitle: "Intelligent systems forged across deep water layers.",
      skillsTitle: "TECHNOLOGY CONSTELLATION",
      skillsSubtitle: "An interconnected ecosystem of engineering nodes.",
      labTitle: "THE EXPERIMENTAL LAB",
      labSubtitle: "Unfinished research, autonomous agents & WebGL experiments.",
      githubTitle: "THE GITHUB ABYSS",
      contactTitle: "WHAT SHOULD WE BUILD NEXT?",
      contactCTA: "INITIATE TRANSMISSION",
      mindsetIntro: "ENGINEERING PHILOSOPHY"
    }
  },
  hi: {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    translations: {
      heroTagline: "बुद्धिमान सिस्टम बना रहा हूँ",
      heroSubtitle: "कोड, डेटा और एआई के संगम पर।",
      exploreCTA: "मेरी दुनिया देखें",
      githubCTA: "गिटहब देखें",
      aboutTitle: "परिचय एवं निर्माण",
      aboutStatement: "जटिल एल्गोरिदम को जीवंत डिजिटल प्रणालियों में बदलना।",
      projectsTitle: "प्रमुख इंजीनियरिंग परियोजनाएं",
      projectsSubtitle: "गहरे पानी की परतों में विकसित बुद्धिमान प्रणालियाँ।",
      skillsTitle: "तकनीकी नक्षत्र मंडल",
      skillsSubtitle: "इंजीनियरिंग नोड्स का परस्पर जुड़ा पारिस्थितिकी तंत्र।",
      labTitle: "प्रायोगिक प्रयोगशाला",
      labSubtitle: "अनुसंधान, स्वायत्त एजेंट और वेब-जीएल प्रयोग।",
      githubTitle: "गिटहब अगाध गर्त",
      contactTitle: "आगे हम क्या निर्माण करें?",
      contactCTA: "संपर्क स्थापित करें",
      mindsetIntro: "इंजीनियरिंग दर्शन"
    }
  },
  mr: {
    code: 'mr',
    label: 'Marathi',
    nativeLabel: 'मराठी',
    translations: {
      heroTagline: "बुद्धिमान प्रणाली तयार करत आहे",
      heroSubtitle: "कोड, डेटा आणि एआय यांच्या संगमातून.",
      exploreCTA: "माझे विश्व एक्सप्लोर करा",
      githubCTA: "गिटहब पहा",
      aboutTitle: "ओळख आणि निर्मिती",
      aboutStatement: "अमूर्त अल्गोरिदमचे जिवंत डिजिटल प्रणालींमध्ये रूपांतर.",
      projectsTitle: "प्रमुख अभियांत्रिकी प्रकल्प",
      projectsSubtitle: "खोल समुद्राच्या थरांमध्ये तयार केलेल्या बुद्धिमान प्रणाली.",
      skillsTitle: "तंत्रज्ञान नक्षत्र",
      skillsSubtitle: "इंजिनिअरिंग नोड्सची जोडलेली परिसंस्था.",
      labTitle: "प्रायोगिक प्रयोगशाळा",
      labSubtitle: "अपूर्ण संशोधन, स्वायत्त एजंट्स आणि वेब-जीएल प्रयोग.",
      githubTitle: "गिटहब अथांग डोह",
      contactTitle: "पुढे काय तयार करायचे?",
      contactCTA: "संवाद सुरू करा",
      mindsetIntro: "अभियांत्रिकी दृष्टिकोन"
    }
  },
  ja: {
    code: 'ja',
    label: 'Japanese',
    nativeLabel: '日本語',
    translations: {
      heroTagline: "インテリジェントなシステムを構築する",
      heroSubtitle: "コード、データ、AIの境界線で。",
      exploreCTA: "世界を探検する",
      githubCTA: "GITHUBを見る",
      aboutTitle: "アイデンティティと開発",
      aboutStatement: "抽象的なアルゴリズムを生きたデジタルシステムへ変革する。",
      projectsTitle: "主要エンジニアリング実績",
      projectsSubtitle: "深海層に広がるインテリジェント・システム。",
      skillsTitle: "技術コンステレーション",
      skillsSubtitle: "相互接続されたエンジニアリング・エコシステム。",
      labTitle: "実験ラボラトリー",
      labSubtitle: "先端研究、自律エージェント、WebGL実験場。",
      githubTitle: "GITHUB アビス",
      contactTitle: "次に何を創りましょうか？",
      contactCTA: "通信を開始",
      mindsetIntro: "エンジニアリング哲学"
    }
  }
};
