
import { ModuleInfo, ModuleCategory } from './types';

export const HCM_MODULES: ModuleInfo[] = [
  {
    id: 'intro',
    title: 'Oracle Fusion HCM',
    subtitle: '现代化人力资本管理解决方案',
    category: ModuleCategory.ORANGE,
    description: 'Oracle Fusion Cloud HCM 是一个完整的云解决方案，它将所有人力资源流程从招聘到退休连接起来。',
    keyFeatures: ['全局单一数据源', '人工智能驱动型洞察', '移动优先设计', '高度可配置的工作流'],
    visualType: 'grid'
  },
  {
    id: 'core-hr-lifecycle',
    title: '人事管理：全周期事件管理',
    subtitle: 'Core HR: Lifecycle Management',
    category: ModuleCategory.ORANGE,
    description: '根据业务需求，设计使用的人事事件：入职、重新雇佣、异动、转正等。记录员工整个工作周期内各阶段的详细信息。',
    keyFeatures: ['入职/重新雇佣', '试用期转正', '跨体系/BU调动', '辞职/辞退/退休'],
    visualType: 'lifecycle',
    chartData: [
      { label: '入职', items: ['新入职', '系统上线'] },
      { label: '重新录用', items: ['离职回流', '退休返聘'] },
      { label: '转正', items: ['试用期转正', '实习生/劳务工转正式'] },
      { label: '调动', items: ['体系/BU内调动', '跨公司借入/借出', '合并收购'] },
      { label: '离职', items: ['辞退', '辞职', '退休', '其他离职'] }
    ]
  },
  {
    id: 'employee-profile',
    title: '员工档案管理',
    subtitle: 'Core HR: Complete Record',
    category: ModuleCategory.ORANGE,
    description: '记录完整人事异动历程，基于不同场景实现相关事件的工作流审批，实现批量更新及历史留痕。',
    keyFeatures: ['全生命周期信息记录', '批量更新功能', '留痕与回溯', '支持海外各国需求'],
    visualType: 'table',
    chartData: [
      { type: '基础信息', rule: '包含人员录用、返聘、调动、晋升', balance: '动态维护' },
      { type: '工作流', rule: '基于场景自动路由审批', balance: '实时生效' },
      { type: '合规性', rule: '字段弹性支持多国法规', balance: '全球统一' }
    ]
  },
  {
    id: 'performance-loop',
    title: '人才管理：目标与绩效闭环',
    subtitle: 'Goal & Performance Management',
    category: ModuleCategory.BLUE,
    description: '跟踪管理组织与个人目标，与绩效管理无缝集成。提供管理层、经理和员工有价值的洞察信息。',
    keyFeatures: ['目标设定与分解', '持续沟通反馈', '多维度绩效考评', '结果运用于晋升激励'],
    visualType: 'performance-flow',
    chartData: [
      { stage: '目标设定', steps: ['组织战略', '目标分解', '能力目标'] },
      { stage: '过程管理', steps: ['沟通', '阶段评估', '调整目标'] },
      { stage: '绩效考评', steps: ['考评方式', '考评体系', '考评周期'] },
      { stage: '结果运用', steps: ['干部任免', '薪酬激励', '人才发展'] }
    ]
  },
  {
    id: 'my-journeys',
    title: '我的旅程',
    subtitle: 'My Journeys: Employee Experience',
    category: ModuleCategory.ORANGE,
    description: '“我的旅程”为完成各类生命周期和职业事件提供单一入口。它通过简单、上下文相关的引导式任务，帮助员工和经理轻松处理复杂流程。',
    keyFeatures: ['生命周期事件引导', '跨模块任务集成', '上下文感知的清单', '个人与团队任务管理'],
    visualType: 'process',
    chartData: [
      { step: '生命事件 (Life Events)', desc: '引导处理入职(Onboarding)、晋升、结婚或育儿等重大生活与职场节点。' },
      { step: '组织变更 (Org Changes)', desc: '支持经理处理团队调整、汇报关系变更等复杂的人事管理旅程。' },
      { step: '职业发展 (Career)', desc: '通过学习旅程和导师清单，引导员工实现技能转型和职业成长。' },
      { step: '上下文集成', desc: '直接在操作页面触发相关旅程，无需在不同模块间切换，提升效率。' }
    ]
  },
  {
    id: 'digital-assistant',
    title: '数字助理',
    subtitle: 'Oracle Digital Assistant (ODA)',
    category: ModuleCategory.ORANGE,
    description: '通过人工智能和自然语言处理技术，数字助理让员工能够通过简单的对话完成复杂的 HR 事务，提供 24/7 的即时支持。',
    keyFeatures: ['自然语言交互', '多渠道支持 (Teams/Slack)', '主动通知与提醒', '自助查询与交易处理'],
    visualType: 'grid',
    chartData: []
  },
  {
    id: 'experience-dual',
    title: '工作与生活：赋能员工体验',
    subtitle: 'Personal Brand & Volunteering',
    category: ModuleCategory.ORANGE,
    description: '将企业社会责任(CSR)与个人价值观连接，提升使命感。将员工视为企业品牌大使，赋能在线建立积极形象。',
    keyFeatures: ['个性化志愿匹配', '一体化管理平台', '社交媒体洞察', '内容策展与分享'],
    visualType: 'brand-dual',
    chartData: [
      { 
        type: '我的志愿者', 
        desc: '智能推荐匹配、跟踪贡献记录',
        items: ['系统智能推荐', '记录服务时长', '休假管理集成']
      },
      { 
        type: '个人品牌', 
        desc: '赋能员工建立专业形象，扩充影响力',
        items: ['社交媒体洞察', '技能认证同步', '品牌大使计划']
      }
    ]
  }
];
