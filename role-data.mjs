export const roleOrder = ["martech", "solutions", "regional", "gtm", "growth"];

const roles = {
  martech: {
    en: {
      title: "MarTech CSM",
      subtitle: "Advertiser empathy. Platform fluency. Business outcomes.",
      pitch: "I bring a senior advertiser-side view of how technology, media and data need to work together — and how customer success earns trust by turning platform capability into commercial progress.",
      evidence: ["Owned media and agency ecosystems across Google, YouTube, Amazon, Meta, TikTok, CTV and programmatic", "Built full-funnel review frameworks connecting brand, media, e-commerce and sales signals", "Aligned platforms, HQ, local commercial teams and agencies across markets"],
      skills: ["Customer strategy", "MarTech adoption", "Measurement", "Stakeholder leadership", "Business reviews"]
    },
    zh: {
      title: "MarTech 客户成功",
      subtitle: "理解广告主，熟悉平台，回到业务结果。",
      pitch: "我能从大型广告主真实经营视角出发，把营销技术、媒体与数据连接起来，并通过清晰的业务诊断与跨团队协作，推动客户采用和可衡量增长。",
      evidence: ["统筹 Google、YouTube、Amazon、Meta、TikTok、CTV 与程序化媒体及 Agency 生态", "建立连接品牌、媒体、电商和销售信号的全漏斗复盘框架", "跨市场协调平台、总部、本地商业团队与 Agency"],
      skills: ["客户策略", "MarTech 应用", "效果衡量", "利益相关方管理", "业务复盘"]
    }
  },
  solutions: {
    en: {
      title: "Marketing Solutions",
      subtitle: "Translate business challenges into actionable growth solutions.",
      pitch: "I diagnose the business objective first, then shape the right audience, channel, content and measurement system — bridging client ambition with an executable cross-platform solution.",
      evidence: ["Converted sales targets and product mix priorities into media and marketing plans", "Connected sports IP, product storytelling and commerce in one full-funnel system", "Managed investment choices and campaign optimization across major digital ecosystems"],
      skills: ["Business diagnosis", "Solution design", "Media strategy", "Full-funnel planning", "Client leadership"]
    },
    zh: {
      title: "营销解决方案",
      subtitle: "把商业问题转化为可执行的增长方案。",
      pitch: "我从业务目标出发，拆解受众、渠道、内容与衡量体系，将客户需求转化为可执行的跨平台营销解决方案。",
      evidence: ["将销售目标与产品结构转化为媒体和营销策略", "把体育 IP、产品传播与电商转化连接为全漏斗体系", "统筹主要数字媒体生态的投资选择与 Campaign 优化"],
      skills: ["业务诊断", "方案设计", "媒体策略", "全漏斗规划", "客户管理"]
    }
  },
  regional: {
    en: {
      title: "Regional Marketing",
      subtitle: "Global direction, localized for market momentum.",
      pitch: "I can own a regional marketing agenda end to end — shaping strategy, allocating resources and orchestrating local teams while keeping global brand priorities and local commercial needs aligned.",
      evidence: ["Owned the full Spain and Portugal marketing agenda and joined regional business decisions", "Delivered the strongest brand awareness growth in the region", "Managed a multicultural team and multiple specialist agencies"],
      skills: ["Annual planning", "Localization", "Budget leadership", "Agency orchestration", "Cross-cultural teams"]
    },
    zh: {
      title: "区域市场管理",
      subtitle: "承接全球方向，驱动本地市场增长。",
      pitch: "我能端到端负责区域市场工作，从策略与资源配置到团队及 Agency 管理，在全球品牌优先级与本地商业需求之间建立一致性。",
      evidence: ["全面负责西班牙与葡萄牙市场，并参与区域经营决策", "实现区域内品牌知名度增长第一", "管理多元化团队及多家专业 Agency"],
      skills: ["年度规划", "本地化", "预算管理", "Agency 统筹", "跨文化团队"]
    }
  },
  gtm: {
    en: {
      title: "Product GTM",
      subtitle: "Make product differentiation matter in market.",
      pitch: "I turn product and technology advantages into a sharp market position, then align launch phasing, creative, media, retail and e-commerce around one commercial objective.",
      evidence: ["Led GTM for flagship Mini LED and SQD-Mini LED products", "Translated technical differentiation into clear consumer value", "Improved premium product mix and contributed to breakthrough regional revenue"],
      skills: ["Positioning", "Launch strategy", "Consumer insight", "Integrated activation", "Commercial alignment"]
    },
    zh: {
      title: "产品 GTM",
      subtitle: "让产品差异化真正转化为市场价值。",
      pitch: "我将技术与产品优势转化为清晰定位，并围绕同一商业目标统筹上市节奏、创意、媒体、零售与电商。",
      evidence: ["主导 Mini LED 与 SQD-Mini LED 旗舰产品 GTM", "把技术差异转化为消费者可感知价值", "推动高端产品销售结构提升并助力区域收入突破"],
      skills: ["产品定位", "上市策略", "消费者洞察", "整合激活", "商业协同"]
    }
  },
  growth: {
    en: {
      title: "Overseas Growth",
      subtitle: "Build the operating bridge between HQ and local markets.",
      pitch: "With experience across China, New Zealand and Europe, I help international businesses enter, learn and scale — combining headquarters alignment, local market insight and hands-on growth execution.",
      evidence: ["Worked across global HQ, European regional and Iberia market contexts", "Doubled market share across key e-commerce channels", "Built experience across B2C, B2B, retail, digital and experiential environments"],
      skills: ["Market entry", "HQ-local alignment", "E-commerce growth", "Partnerships", "Cross-market execution"]
    },
    zh: {
      title: "海外增长",
      subtitle: "建立总部与本地市场之间的经营桥梁。",
      pitch: "凭借中国、新西兰与欧洲经验，我能帮助国际业务进入、理解并规模化拓展市场，兼顾总部协同、本地洞察与一线增长落地。",
      evidence: ["经历总部全球、欧洲区域与 Iberia 本地市场三种工作场景", "推动核心电商渠道市场份额翻番", "覆盖 B2C、B2B、零售、数字媒体与体验营销"],
      skills: ["市场进入", "总部与本地协同", "电商增长", "合作伙伴管理", "跨市场执行"]
    }
  }
};

export function getRole(roleId, language = "en") {
  const safeRole = roles[roleId] ?? roles.regional;
  return safeRole[language === "zh" ? "zh" : "en"];
}
