
export enum ModuleCategory {
  ORANGE = 'ORANGE',
  BLUE = 'BLUE'
}

export interface ModuleInfo {
  id: string;
  title: string;
  subtitle: string;
  category: ModuleCategory;
  description: string;
  keyFeatures: string[];
  visualType: 'chart' | 'process' | 'table' | 'grid' | 'lifecycle' | 'performance-flow' | 'brand-dual';
  chartData?: any[];
}

export interface SlideProps {
  module: ModuleInfo;
  isActive: boolean;
}
